const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && typeof value === 'object';
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';

const getArgs = (func) => {
  const result = func.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  if (result.length === 3) {
    return result[1].split(',').map((a) => a.trim());
  }
  return [];
};

const CSS_SHEET_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (e) {
    return false;
  }
})();

const ofObs = (input) => ({
  subscribe: (fn) => {
    fn(input);
  }
});

const fromPromiseObs = (input) => ({
  subscribe: (fn) => {
    Promise.resolve(input).then((value) => {
      fn(value);
    });
  }
});

class SubjectObs {
  _callbacks = [];

  asObservable() {
    return {
      subscribe: (fn) => this.subscribe(fn)
    };
  }

  subscribe(fn) {
    this._callbacks.push(fn);
    return this.unsubscribe;
  }

  unsubscribe() {
    this._callbacks = [];
  }

  next(value) {
    for (const callback of this._callbacks) {
      callback(value);
    }
  }
}

/**
 *
 */
class BehaviourSubjectObs extends SubjectObs {
  _initialValue;
  constructor(initialValue) {
    super();
    this._initialValue = initialValue;
  }

  subscribe(fn) {
    const unsub = super.subscribe(fn);
    this.next(this._initialValue);
    return unsub;
  }
}

class Subscriptions {
  _subcribers = [];

  /**
   * add subscribers to subscriptions
   * @param {Function} fn
   * @returns {void}
   */
  add(fn) {
    this._subcribers.push(fn);
  }

  /**
   * remove all added subcriptions
   * @returns {void}
   */
  unsubscribe() {
    for (const fn of this._subcribers) {
      fn();
    }
    this._subcribers = [];
  }
}

const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return fromPromiseObs(Promise.resolve(value));
  }

  return ofObs(value);
};

/**
 * register event on targeted dom node
 * @param {HTMLElement} target
 * @param {string} eventName
 * @param {Function} onNext
 * @param {boolean} options
 * @return {Function} unsubscribe
 */
const fromEvent = (target, eventName, onNext, options = false) => {
  target.addEventListener(eventName, onNext, options);
  const unsubscribe = () => {
    target.removeEventListener(eventName, onNext, options);
  };
  return unsubscribe;
};

/**
 * sanitize html string to prevent XSS attacks
 * @param {string} htmlString
 * @return {string} sanitizedHTML
 */
const sanitizeHTML = (htmlString) => {
  /**
   * Convert the string to an HTML document
   * @return {Node} An HTML document
   */
  const stringToHTML = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body || document.createElement('body');
  };

  /**
   * Remove <script> elements
   * @param  {Node} html The HTML
   */
  const removeScripts = (html) => {
    const scripts = html.querySelectorAll('script');
    for (const script of scripts) {
      script.remove();
    }
  };

  /**
   * Check if the attribute is potentially dangerous
   * @param  {String}  name  The attribute name
   * @param  {String}  value The attribute value
   * @return {Boolean}       If true, the attribute is potentially dangerous
   */
  const isPossiblyDangerous = (name, value) => {
    value = value.replace(/\s+/g, '').toLowerCase();
    if (['src', 'href', 'xlink:href'].includes(name)) {
      if (value.includes('javascript:') || value.includes('data:')) return true;
    }
    if (name.startsWith('on')) return true;
  };

  /**
   * Remove potentially dangerous attributes from an element
   * @param  {Node} elem The element
   */
  const removeAttributes = (element) => {
    // Loop through each attribute
    // If it's dangerous, remove it
    const attributes = element.attributes;
    for (const { name, value } of attributes) {
      if (!isPossiblyDangerous(name, value)) continue;
      element.removeAttribute(name);
    }
  };

  /**
   * Remove dangerous stuff from the HTML document's nodes
   * @param  {Node} html The HTML document
   */
  const cleanAttributes = (html) => {
    const nodes = html.children;
    for (const node of nodes) {
      removeAttributes(node);
      cleanAttributes(node);
    }
  };

  // Convert the string to HTML
  const html = stringToHTML();

  // Sanitize it
  removeScripts(html);
  cleanAttributes(html);

  // If the user wants HTML nodes back, return them
  // Otherwise, pass a sanitized string back
  return html.innerHTML;
};

const debounceRender = function (elementInstance) {
  if (elementInstance.renderCount === 1) {
    queueMicrotask(() => {
      elementInstance.update();
      elementInstance.renderCount = 0;
    });
  }
};

const proxifiedClass = (elementInstance, target) => {
  const constructorArgs = getArgs(target);

  const handler = () => ({
    get(obj, prop) {
      const propertyType = Object.prototype.toString.call(obj[prop]);
      if (['[object Object]', '[object Array]'].indexOf(propertyType) > -1 && !('__metadata__' in obj[prop])) {
        return new Proxy(obj[prop], handler());
      }
      return obj[prop];
    },
    set(obj, prop, value) {
      obj[prop] = value;
      ++elementInstance.renderCount;
      debounceRender(elementInstance);
      return true;
    }
  });

  return class extends target {
    constructor(...args) {
      super(...args);
      args.forEach((arg, i) => {
        if (constructorArgs[i] && constructorArgs[i] !== 'undefined') {
          this[constructorArgs[i]] = arg;
        }
      });
      return new Proxy(this, handler());
    }
  };
};

const promisify = () => {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
};

export {
  BehaviourSubjectObs,
  CSS_SHEET_SUPPORTED,
  SubjectObs,
  Subscriptions,
  fromEvent,
  getArgs,
  isFunction,
  isObject,
  promisify,
  proxifiedClass,
  sanitizeHTML,
  wrapIntoObservable
};
