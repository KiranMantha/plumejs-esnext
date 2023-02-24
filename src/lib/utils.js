const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && typeof value === 'object';

const getArgs = (func) => {
  const result = func.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  if (result.length === 3) {
    return result[1].split(',').map((a) => a.trim());
  }
  return [];
};

const CSS_SHEET_NOT_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return false;
  } catch (e) {
    return true;
  }
})();

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

export { isFunction, isObject, getArgs, CSS_SHEET_NOT_SUPPORTED, fromEvent };
