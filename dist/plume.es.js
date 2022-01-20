var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _currentRoute, _template;
const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
const isNodeRegex = /<[a-z][^>]+$/i;
const attributePrefix = "attr";
const attributeRegex = /^attr([^ ]+)/;
const insertNodePrefix = "insertNode";
const insertNodeRegex = /^insertNode([^ ]+)/;
const _sanitize = (data) => {
  const tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "(": "%28",
    ")": "%29"
  };
  let str = JSON.stringify(data);
  const replaceTag = (tag) => tagsToReplace[tag] || tag;
  const safe_tags_replace = (str2) => str2.replace(/[&<>\(\)]/g, replaceTag);
  str = safe_tags_replace(str);
  return JSON.parse(str);
};
const _createFragment = (markup) => {
  const temp = document.createElement("template");
  temp.innerHTML = markup;
  return temp.content;
};
const _bindFragments = (fragment, values) => {
  const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
  let node = elementsWalker.nextNode();
  while (node) {
    if (node.hasAttributes()) {
      const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
      for (const { nodeName, nodeValue } of customAttributes) {
        const i = attributeRegex.exec(nodeName)[1];
        switch (true) {
          case /^on+/.test(nodeValue): {
            const eventName = nodeValue.slice(2).toLowerCase();
            node.removeEventListener(eventName, values[i]);
            node.addEventListener(eventName, values[i]);
            (node.eventListenersMap || (node.eventListenersMap = {}))[eventName] = values[i];
            break;
          }
          case /ref/.test(nodeValue): {
            values[i](node);
            break;
          }
          case /dataset/.test(nodeValue): {
            const dataset = node.dataset;
            const obj = values[i];
            for (const [key, value] of Object.entries(obj)) {
              dataset[key] = value;
            }
            break;
          }
          case /^data-+/.test(nodeValue): {
            node.setAttribute(`data-${nodeValue}`, _sanitize(values[i]));
            break;
          }
          case /^attr-+/.test(nodeValue): {
            node.setAttribute(`aria-${nodeValue}`, _sanitize(values[i]));
            break;
          }
          case /class/.test(nodeValue): {
            if (values[i]) {
              node.classList.add(...values[i].split(" "));
            } else {
              node.setAttribute("class", "");
            }
            break;
          }
          case /value/.test(nodeValue): {
            node.value = _sanitize(values[i]);
            break;
          }
          case /disabled/.test(nodeValue):
          case /checked/.test(nodeValue): {
            if (values[i]) {
              node.setAttribute(nodeValue, values[i]);
            } else {
              node.removeAttribute(nodeValue);
            }
            break;
          }
          default: {
            node.setAttribute(nodeValue, _sanitize(values[i]));
          }
        }
        node.removeAttribute(nodeName);
      }
    }
    node = elementsWalker.nextNode();
  }
};
const _replaceInsertNodeComments = (fragment, values) => {
  const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
  let node = commentsWalker.nextNode();
  let match;
  while (node) {
    if (match = insertNodeRegex.exec(node.data)) {
      const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
      node.replaceWith(...nodesList);
      commentsWalker.currentNode = fragment;
    }
    node = commentsWalker.nextNode();
  }
};
const html = (templates, ...values) => {
  let result = "";
  const { length } = templates;
  for (let i = 1; i < length; i++) {
    const variable = values[i - 1];
    let isAttributePart = false;
    result += templates[i - 1];
    if (isAttributeRegex.test(result) && isNodeRegex.test(result)) {
      result = result.replace(isAttributeRegex, (_, $1, $2) => `${attributePrefix}${i - 1}=${$2 || '"'}${$1}${$2 ? "" : '"'}`);
      isAttributePart = true;
    }
    if (!isAttributePart) {
      if (Array.isArray(variable) || variable instanceof DocumentFragment) {
        result += `<!--${insertNodePrefix}${i - 1}-->`;
      } else {
        result += variable;
      }
    }
  }
  result += templates[length - 1];
  const fragment = _createFragment(result.trim());
  _bindFragments(fragment, values);
  _replaceInsertNodeComments(fragment, values);
  return fragment;
};
const render = (where, what) => {
  where.textContent = "";
  where.appendChild(what);
};
const Injector = new class {
  constructor() {
    __publicField(this, "_services", new Map());
  }
  register(name, obj) {
    if (!this._services.get(name)) {
      this._services.set(name, obj);
    } else {
      throw `${name} service already exists`;
    }
  }
  getService(name) {
    const instance = this._services.get(name);
    if (instance) {
      return instance;
    } else {
      throw Error(`${name} is not a registered service.`);
    }
  }
}();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function isFunction$1(x) {
  return typeof x === "function";
}
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
  Promise: void 0,
  set useDeprecatedSynchronousErrorHandling(value) {
    if (value) {
      var error = /* @__PURE__ */ new Error();
      /* @__PURE__ */ console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + error.stack);
    }
    _enable_super_gross_mode_that_will_cause_bad_things = value;
  },
  get useDeprecatedSynchronousErrorHandling() {
    return _enable_super_gross_mode_that_will_cause_bad_things;
  }
};
function hostReportError(err) {
  setTimeout(function() {
    throw err;
  }, 0);
}
var empty = {
  closed: true,
  next: function(value) {
  },
  error: function(err) {
    if (config.useDeprecatedSynchronousErrorHandling) {
      throw err;
    } else {
      hostReportError(err);
    }
  },
  complete: function() {
  }
};
var isArray = /* @__PURE__ */ function() {
  return Array.isArray || function(x) {
    return x && typeof x.length === "number";
  };
}();
function isObject(x) {
  return x !== null && typeof x === "object";
}
var UnsubscriptionErrorImpl = /* @__PURE__ */ function() {
  function UnsubscriptionErrorImpl2(errors) {
    Error.call(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
    return this;
  }
  UnsubscriptionErrorImpl2.prototype = /* @__PURE__ */ Object.create(Error.prototype);
  return UnsubscriptionErrorImpl2;
}();
var UnsubscriptionError = UnsubscriptionErrorImpl;
var Subscription = /* @__PURE__ */ function() {
  function Subscription2(unsubscribe) {
    this.closed = false;
    this._parentOrParents = null;
    this._subscriptions = null;
    if (unsubscribe) {
      this._ctorUnsubscribe = true;
      this._unsubscribe = unsubscribe;
    }
  }
  Subscription2.prototype.unsubscribe = function() {
    var errors;
    if (this.closed) {
      return;
    }
    var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
    this.closed = true;
    this._parentOrParents = null;
    this._subscriptions = null;
    if (_parentOrParents instanceof Subscription2) {
      _parentOrParents.remove(this);
    } else if (_parentOrParents !== null) {
      for (var index = 0; index < _parentOrParents.length; ++index) {
        var parent_1 = _parentOrParents[index];
        parent_1.remove(this);
      }
    }
    if (isFunction$1(_unsubscribe)) {
      if (_ctorUnsubscribe) {
        this._unsubscribe = void 0;
      }
      try {
        _unsubscribe.call(this);
      } catch (e) {
        errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
      }
    }
    if (isArray(_subscriptions)) {
      var index = -1;
      var len = _subscriptions.length;
      while (++index < len) {
        var sub = _subscriptions[index];
        if (isObject(sub)) {
          try {
            sub.unsubscribe();
          } catch (e) {
            errors = errors || [];
            if (e instanceof UnsubscriptionError) {
              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
            } else {
              errors.push(e);
            }
          }
        }
      }
    }
    if (errors) {
      throw new UnsubscriptionError(errors);
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var subscription = teardown;
    if (!teardown) {
      return Subscription2.EMPTY;
    }
    switch (typeof teardown) {
      case "function":
        subscription = new Subscription2(teardown);
      case "object":
        if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== "function") {
          return subscription;
        } else if (this.closed) {
          subscription.unsubscribe();
          return subscription;
        } else if (!(subscription instanceof Subscription2)) {
          var tmp = subscription;
          subscription = new Subscription2();
          subscription._subscriptions = [tmp];
        }
        break;
      default: {
        throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
      }
    }
    var _parentOrParents = subscription._parentOrParents;
    if (_parentOrParents === null) {
      subscription._parentOrParents = this;
    } else if (_parentOrParents instanceof Subscription2) {
      if (_parentOrParents === this) {
        return subscription;
      }
      subscription._parentOrParents = [_parentOrParents, this];
    } else if (_parentOrParents.indexOf(this) === -1) {
      _parentOrParents.push(this);
    } else {
      return subscription;
    }
    var subscriptions = this._subscriptions;
    if (subscriptions === null) {
      this._subscriptions = [subscription];
    } else {
      subscriptions.push(subscription);
    }
    return subscription;
  };
  Subscription2.prototype.remove = function(subscription) {
    var subscriptions = this._subscriptions;
    if (subscriptions) {
      var subscriptionIndex = subscriptions.indexOf(subscription);
      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  };
  Subscription2.EMPTY = function(empty2) {
    empty2.closed = true;
    return empty2;
  }(new Subscription2());
  return Subscription2;
}();
function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function(errs, err) {
    return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
  }, []);
}
var rxSubscriber = /* @__PURE__ */ function() {
  return typeof Symbol === "function" ? /* @__PURE__ */ Symbol("rxSubscriber") : "@@rxSubscriber_" + /* @__PURE__ */ Math.random();
}();
var Subscriber = /* @__PURE__ */ function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destinationOrNext, error, complete) {
    var _this = _super.call(this) || this;
    _this.syncErrorValue = null;
    _this.syncErrorThrown = false;
    _this.syncErrorThrowable = false;
    _this.isStopped = false;
    switch (arguments.length) {
      case 0:
        _this.destination = empty;
        break;
      case 1:
        if (!destinationOrNext) {
          _this.destination = empty;
          break;
        }
        if (typeof destinationOrNext === "object") {
          if (destinationOrNext instanceof Subscriber2) {
            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            _this.destination = destinationOrNext;
            destinationOrNext.add(_this);
          } else {
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext);
          }
          break;
        }
      default:
        _this.syncErrorThrowable = true;
        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
        break;
    }
    return _this;
  }
  Subscriber2.prototype[rxSubscriber] = function() {
    return this;
  };
  Subscriber2.create = function(next, error, complete) {
    var subscriber = new Subscriber2(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };
  Subscriber2.prototype.next = function(value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (!this.isStopped) {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (!this.isStopped) {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (this.closed) {
      return;
    }
    this.isStopped = true;
    _super.prototype.unsubscribe.call(this);
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    this.destination.error(err);
    this.unsubscribe();
  };
  Subscriber2.prototype._complete = function() {
    this.destination.complete();
    this.unsubscribe();
  };
  Subscriber2.prototype._unsubscribeAndRecycle = function() {
    var _parentOrParents = this._parentOrParents;
    this._parentOrParents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parentOrParents = _parentOrParents;
    return this;
  };
  return Subscriber2;
}(Subscription);
var SafeSubscriber = /* @__PURE__ */ function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(_parentSubscriber, observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    _this._parentSubscriber = _parentSubscriber;
    var next;
    var context = _this;
    if (isFunction$1(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;
      if (observerOrNext !== empty) {
        context = Object.create(observerOrNext);
        if (isFunction$1(context.unsubscribe)) {
          _this.add(context.unsubscribe.bind(context));
        }
        context.unsubscribe = _this.unsubscribe.bind(_this);
      }
    }
    _this._context = context;
    _this._next = next;
    _this._error = error;
    _this._complete = complete;
    return _this;
  }
  SafeSubscriber2.prototype.next = function(value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;
      if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber2.prototype.error = function(err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
      if (this._error) {
        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);
          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);
          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();
        if (useDeprecatedSynchronousErrorHandling) {
          throw err;
        }
        hostReportError(err);
      } else {
        if (useDeprecatedSynchronousErrorHandling) {
          _parentSubscriber.syncErrorValue = err;
          _parentSubscriber.syncErrorThrown = true;
        } else {
          hostReportError(err);
        }
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber2.prototype.complete = function() {
    var _this = this;
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      if (this._complete) {
        var wrappedComplete = function() {
          return _this._complete.call(_this._context);
        };
        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);
          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);
          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };
  SafeSubscriber2.prototype.__tryOrUnsub = function(fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    }
  };
  SafeSubscriber2.prototype.__tryOrSetError = function(parent, fn, value) {
    if (!config.useDeprecatedSynchronousErrorHandling) {
      throw new Error("bad call");
    }
    try {
      fn.call(this._context, value);
    } catch (err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      } else {
        hostReportError(err);
        return true;
      }
    }
    return false;
  };
  SafeSubscriber2.prototype._unsubscribe = function() {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;
    _parentSubscriber.unsubscribe();
  };
  return SafeSubscriber2;
}(Subscriber);
function canReportError(observer) {
  while (observer) {
    var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
    if (closed_1 || isStopped) {
      return false;
    } else if (destination && destination instanceof Subscriber) {
      observer = destination;
    } else {
      observer = null;
    }
  }
  return true;
}
function toSubscriber(nextOrObserver, error, complete) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber) {
      return nextOrObserver;
    }
    if (nextOrObserver[rxSubscriber]) {
      return nextOrObserver[rxSubscriber]();
    }
  }
  if (!nextOrObserver && !error && !complete) {
    return new Subscriber(empty);
  }
  return new Subscriber(nextOrObserver, error, complete);
}
var observable = /* @__PURE__ */ function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x) {
  return x;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = /* @__PURE__ */ function() {
  function Observable2(subscribe) {
    this._isScalar = false;
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = toSubscriber(observerOrNext, error, complete);
    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }
    if (config.useDeprecatedSynchronousErrorHandling) {
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;
        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
    }
    return sink;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        sink.syncErrorThrown = true;
        sink.syncErrorValue = err;
      }
      if (canReportError(sink)) {
        sink.error(err);
      } else {
        console.warn(err);
      }
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function(value) {
        try {
          next(value);
        } catch (err) {
          reject(err);
          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }, reject, resolve);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var source = this.source;
    return source && source.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    if (operations.length === 0) {
      return this;
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  if (!promiseCtor) {
    promiseCtor = config.Promise || Promise;
  }
  if (!promiseCtor) {
    throw new Error("no Promise impl found");
  }
  return promiseCtor;
}
var ObjectUnsubscribedErrorImpl = /* @__PURE__ */ function() {
  function ObjectUnsubscribedErrorImpl2() {
    Error.call(this);
    this.message = "object unsubscribed";
    this.name = "ObjectUnsubscribedError";
    return this;
  }
  ObjectUnsubscribedErrorImpl2.prototype = /* @__PURE__ */ Object.create(Error.prototype);
  return ObjectUnsubscribedErrorImpl2;
}();
var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
var SubjectSubscription = /* @__PURE__ */ function(_super) {
  __extends(SubjectSubscription2, _super);
  function SubjectSubscription2(subject, subscriber) {
    var _this = _super.call(this) || this;
    _this.subject = subject;
    _this.subscriber = subscriber;
    _this.closed = false;
    return _this;
  }
  SubjectSubscription2.prototype.unsubscribe = function() {
    if (this.closed) {
      return;
    }
    this.closed = true;
    var subject = this.subject;
    var observers = subject.observers;
    this.subject = null;
    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
      return;
    }
    var subscriberIndex = observers.indexOf(this.subscriber);
    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  };
  return SubjectSubscription2;
}(Subscription);
var SubjectSubscriber = /* @__PURE__ */ function(_super) {
  __extends(SubjectSubscriber2, _super);
  function SubjectSubscriber2(destination) {
    var _this = _super.call(this, destination) || this;
    _this.destination = destination;
    return _this;
  }
  return SubjectSubscriber2;
}(Subscriber);
var Subject = /* @__PURE__ */ function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.observers = [];
    _this.closed = false;
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype[rxSubscriber] = function() {
    return new SubjectSubscriber(this);
  };
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype.next = function(value) {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    if (!this.isStopped) {
      var observers = this.observers;
      var len = observers.length;
      var copy = observers.slice();
      for (var i = 0; i < len; i++) {
        copy[i].next(value);
      }
    }
  };
  Subject2.prototype.error = function(err) {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    this.hasError = true;
    this.thrownError = err;
    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();
    for (var i = 0; i < len; i++) {
      copy[i].error(err);
    }
    this.observers.length = 0;
  };
  Subject2.prototype.complete = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
    this.isStopped = true;
    var observers = this.observers;
    var len = observers.length;
    var copy = observers.slice();
    for (var i = 0; i < len; i++) {
      copy[i].complete();
    }
    this.observers.length = 0;
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = true;
    this.closed = true;
    this.observers = null;
  };
  Subject2.prototype._trySubscribe = function(subscriber) {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    } else {
      return _super.prototype._trySubscribe.call(this, subscriber);
    }
  };
  Subject2.prototype._subscribe = function(subscriber) {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    } else if (this.hasError) {
      subscriber.error(this.thrownError);
      return Subscription.EMPTY;
    } else if (this.isStopped) {
      subscriber.complete();
      return Subscription.EMPTY;
    } else {
      this.observers.push(subscriber);
      return new SubjectSubscription(this, subscriber);
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = /* @__PURE__ */ function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var destination = this.destination;
    if (destination && destination.next) {
      destination.next(value);
    }
  };
  AnonymousSubject2.prototype.error = function(err) {
    var destination = this.destination;
    if (destination && destination.error) {
      this.destination.error(err);
    }
  };
  AnonymousSubject2.prototype.complete = function() {
    var destination = this.destination;
    if (destination && destination.complete) {
      this.destination.complete();
    }
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var source = this.source;
    if (source) {
      return this.source.subscribe(subscriber);
    } else {
      return Subscription.EMPTY;
    }
  };
  return AnonymousSubject2;
}(Subject);
function isScheduler(value) {
  return value && typeof value.schedule === "function";
}
var subscribeToArray = function(array) {
  return function(subscriber) {
    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  };
};
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var sub = new Subscription();
    var i = 0;
    sub.add(scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
        return;
      }
      subscriber.next(input[i++]);
      if (!subscriber.closed) {
        sub.add(this.schedule());
      }
    }));
    return sub;
  });
}
function fromArray(input, scheduler) {
  if (!scheduler) {
    return new Observable(subscribeToArray(input));
  } else {
    return scheduleArray(input, scheduler);
  }
}
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = args[args.length - 1];
  if (isScheduler(scheduler)) {
    args.pop();
    return scheduleArray(args, scheduler);
  } else {
    return fromArray(args);
  }
}
function map(project, thisArg) {
  return function mapOperation(source) {
    if (typeof project !== "function") {
      throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
    }
    return source.lift(new MapOperator(project, thisArg));
  };
}
var MapOperator = /* @__PURE__ */ function() {
  function MapOperator2(project, thisArg) {
    this.project = project;
    this.thisArg = thisArg;
  }
  MapOperator2.prototype.call = function(subscriber, source) {
    return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
  };
  return MapOperator2;
}();
var MapSubscriber = /* @__PURE__ */ function(_super) {
  __extends(MapSubscriber2, _super);
  function MapSubscriber2(destination, project, thisArg) {
    var _this = _super.call(this, destination) || this;
    _this.project = project;
    _this.count = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }
  MapSubscriber2.prototype._next = function(value) {
    var result;
    try {
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result);
  };
  return MapSubscriber2;
}(Subscriber);
var subscribeToPromise = function(promise) {
  return function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, hostReportError);
    return subscriber;
  };
};
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = /* @__PURE__ */ getSymbolIterator();
var subscribeToIterable = function(iterable) {
  return function(subscriber) {
    var iterator$1 = iterable[iterator]();
    do {
      var item = void 0;
      try {
        item = iterator$1.next();
      } catch (err) {
        subscriber.error(err);
        return subscriber;
      }
      if (item.done) {
        subscriber.complete();
        break;
      }
      subscriber.next(item.value);
      if (subscriber.closed) {
        break;
      }
    } while (true);
    if (typeof iterator$1.return === "function") {
      subscriber.add(function() {
        if (iterator$1.return) {
          iterator$1.return();
        }
      });
    }
    return subscriber;
  };
};
var subscribeToObservable = function(obj) {
  return function(subscriber) {
    var obs = obj[observable]();
    if (typeof obs.subscribe !== "function") {
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    } else {
      return obs.subscribe(subscriber);
    }
  };
};
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise$1(value) {
  return !!value && typeof value.subscribe !== "function" && typeof value.then === "function";
}
var subscribeTo = function(result) {
  if (!!result && typeof result[observable] === "function") {
    return subscribeToObservable(result);
  } else if (isArrayLike(result)) {
    return subscribeToArray(result);
  } else if (isPromise$1(result)) {
    return subscribeToPromise(result);
  } else if (!!result && typeof result[iterator] === "function") {
    return subscribeToIterable(result);
  } else {
    var value = isObject(result) ? "an invalid object" : "'" + result + "'";
    var msg = "You provided " + value + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";
    throw new TypeError(msg);
  }
};
function scheduleObservable(input, scheduler) {
  return new Observable(function(subscriber) {
    var sub = new Subscription();
    sub.add(scheduler.schedule(function() {
      var observable$1 = input[observable]();
      sub.add(observable$1.subscribe({
        next: function(value) {
          sub.add(scheduler.schedule(function() {
            return subscriber.next(value);
          }));
        },
        error: function(err) {
          sub.add(scheduler.schedule(function() {
            return subscriber.error(err);
          }));
        },
        complete: function() {
          sub.add(scheduler.schedule(function() {
            return subscriber.complete();
          }));
        }
      }));
    }));
    return sub;
  });
}
function schedulePromise(input, scheduler) {
  return new Observable(function(subscriber) {
    var sub = new Subscription();
    sub.add(scheduler.schedule(function() {
      return input.then(function(value) {
        sub.add(scheduler.schedule(function() {
          subscriber.next(value);
          sub.add(scheduler.schedule(function() {
            return subscriber.complete();
          }));
        }));
      }, function(err) {
        sub.add(scheduler.schedule(function() {
          return subscriber.error(err);
        }));
      });
    }));
    return sub;
  });
}
function scheduleIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    var sub = new Subscription();
    var iterator$1;
    sub.add(function() {
      if (iterator$1 && typeof iterator$1.return === "function") {
        iterator$1.return();
      }
    });
    sub.add(scheduler.schedule(function() {
      iterator$1 = input[iterator]();
      sub.add(scheduler.schedule(function() {
        if (subscriber.closed) {
          return;
        }
        var value;
        var done;
        try {
          var result = iterator$1.next();
          value = result.value;
          done = result.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
          this.schedule();
        }
      }));
    }));
    return sub;
  });
}
function isInteropObservable(input) {
  return input && typeof input[observable] === "function";
}
function isIterable(input) {
  return input && typeof input[iterator] === "function";
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    } else if (isPromise$1(input)) {
      return schedulePromise(input, scheduler);
    } else if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    } else if (isIterable(input) || typeof input === "string") {
      return scheduleIterable(input, scheduler);
    }
  }
  throw new TypeError((input !== null && typeof input || input) + " is not observable");
}
function from(input, scheduler) {
  if (!scheduler) {
    if (input instanceof Observable) {
      return input;
    }
    return new Observable(subscribeTo(input));
  } else {
    return scheduled(input, scheduler);
  }
}
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction$1(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(map(function(args) {
      return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }
  return new Observable(function(subscriber) {
    function handler(e) {
      if (arguments.length > 1) {
        subscriber.next(Array.prototype.slice.call(arguments));
      } else {
        subscriber.next(e);
      }
    }
    setupSubscription(target, eventName, handler, subscriber, options);
  });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
  var unsubscribe;
  if (isEventTarget(sourceObj)) {
    var source_1 = sourceObj;
    sourceObj.addEventListener(eventName, handler, options);
    unsubscribe = function() {
      return source_1.removeEventListener(eventName, handler, options);
    };
  } else if (isJQueryStyleEventEmitter(sourceObj)) {
    var source_2 = sourceObj;
    sourceObj.on(eventName, handler);
    unsubscribe = function() {
      return source_2.off(eventName, handler);
    };
  } else if (isNodeStyleEventEmitter(sourceObj)) {
    var source_3 = sourceObj;
    sourceObj.addListener(eventName, handler);
    unsubscribe = function() {
      return source_3.removeListener(eventName, handler);
    };
  } else if (sourceObj && sourceObj.length) {
    for (var i = 0, len = sourceObj.length; i < len; i++) {
      setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
    }
  } else {
    throw new TypeError("Invalid event target");
  }
  subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.addListener === "function" && typeof sourceObj.removeListener === "function";
}
function isJQueryStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.on === "function" && typeof sourceObj.off === "function";
}
function isEventTarget(sourceObj) {
  return sourceObj && typeof sourceObj.addEventListener === "function" && typeof sourceObj.removeEventListener === "function";
}
const isFunction = (value) => typeof value === "function";
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
const isPromise = (obj) => !!obj && typeof obj.then === "function";
const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }
  return of(value);
};
const getArgs = (func) => {
  const result = func.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  if (result.length === 3) {
    return result[1].split(",").map((a) => a.trim());
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
const instantiate = (klass, deps, rendererInstance) => {
  if (deps.length > 0) {
    const services = [];
    for (const name of deps) {
      if (name !== "Renderer") {
        services.push(Injector.getService(name));
      } else {
        services.push(rendererInstance);
      }
    }
    const constructorArgs = getArgs(klass);
    const instance = new klass(...services);
    constructorArgs.forEach((arg, i) => {
      instance[arg] = services[i];
    });
    return instance;
  } else {
    return new klass();
  }
};
const componentRegistry = new class {
  constructor() {
    __publicField(this, "globalStyles");
    __publicField(this, "globalStyleTag");
    __publicField(this, "style_registry");
    __publicField(this, "isRootNodeSet");
    this.globalStyles = new CSSStyleSheet();
    this.isRootNodeSet = false;
  }
  getComputedCss(styles = "") {
    let csoArray = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(":host { display: block; }");
    csoArray = [this.globalStyles, defaultStyles];
    if (styles) {
      const sheet = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  }
}();
class Renderer {
  constructor() {
    __publicField(this, "shadowRoot");
    __publicField(this, "update");
    __publicField(this, "emitEvent");
  }
}
const COMPONENT_DATA_ATTR = "data-compid";
const DEFAULT_COMPONENT_OPTIONS = {
  selector: "",
  root: false,
  styles: "",
  useShadow: true,
  deps: []
};
const transformCSS = (styles, selector) => {
  if (styles) {
    styles = selector + " " + styles.replace("}", ` } ${selector} `);
  }
  return styles;
};
const createStyleTag = (content, where) => {
  const tag = document.createElement("style");
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};
const Component = (componentOptions, klass) => {
  var _klass, _shadow, _componentStyleTag, _a;
  if (window.customElements.get(componentOptions.selector)) {
    return;
  }
  componentOptions = __spreadValues(__spreadValues({}, DEFAULT_COMPONENT_OPTIONS), componentOptions);
  componentOptions.styles = componentOptions.styles.toString();
  if (componentOptions.root && !componentRegistry.isRootNodeSet) {
    componentRegistry.isRootNodeSet = true;
    if (componentOptions.styles) {
      componentRegistry.globalStyles.replace(componentOptions.styles);
      componentRegistry.globalStyleTag = createStyleTag(componentOptions.styles, document.head);
    }
  } else if (componentOptions.root && componentRegistry.isRootNodeSet) {
    throw Error("Cannot register duplicate root component in " + componentOptions.selector + " component");
  }
  window.customElements.define(componentOptions.selector, (_a = class extends HTMLElement {
    constructor() {
      super();
      __privateAdd(this, _klass, void 0);
      __privateAdd(this, _shadow, void 0);
      __privateAdd(this, _componentStyleTag, void 0);
      __privateSet(this, _shadow, this.attachShadow({ mode: "open" }));
      if (!CSS_SHEET_NOT_SUPPORTED) {
        __privateGet(this, _shadow).adoptedStyleSheets = componentRegistry.getComputedCss(componentOptions.styles);
      }
      this.update = this.update.bind(this);
      this.emitEvent = this.emitEvent.bind(this);
      this.setProps = this.setProps.bind(this);
      this.getInstance = this.getInstance.bind(this);
    }
    emulateComponent() {
      if (CSS_SHEET_NOT_SUPPORTED && componentOptions.styles) {
        const id = new Date().getTime() + Math.floor(Math.random() * 1e3 + 1);
        const compiledCSS = transformCSS(componentOptions.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
        __privateSet(this, _componentStyleTag, createStyleTag(compiledCSS));
        this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
      }
    }
    connectedCallback() {
      this.emulateComponent();
      const rendererInstance = new Renderer();
      rendererInstance.shadowRoot = __privateGet(this, _shadow);
      rendererInstance.update = this.update;
      rendererInstance.emitEvent = this.emitEvent;
      __privateSet(this, _klass, instantiate(klass, componentOptions.deps, rendererInstance));
      __privateGet(this, _klass).beforeMount && __privateGet(this, _klass).beforeMount();
      this.update();
      __privateGet(this, _klass).mount && __privateGet(this, _klass).mount();
    }
    update() {
      render(__privateGet(this, _shadow), __privateGet(this, _klass).render.bind(__privateGet(this, _klass))());
      if (CSS_SHEET_NOT_SUPPORTED) {
        componentOptions.styles && __privateGet(this, _shadow).insertBefore(__privateGet(this, _componentStyleTag), __privateGet(this, _shadow).childNodes[0]);
        componentRegistry.globalStyleTag && __privateGet(this, _shadow).insertBefore(document.importNode(componentRegistry.globalStyleTag, true), __privateGet(this, _shadow).childNodes[0]);
      }
    }
    emitEvent(eventName, data) {
      const event = new CustomEvent(eventName, {
        detail: data
      });
      this.dispatchEvent(event);
    }
    setProps(propsObj) {
      for (const [key, value] of Object.entries(propsObj)) {
        __privateGet(this, _klass)[key] = value;
      }
      __privateGet(this, _klass).onPropsChanged && __privateGet(this, _klass).onPropsChanged();
      this.update();
    }
    getInstance() {
      return __privateGet(this, _klass);
    }
    disconnectedCallback() {
      __privateGet(this, _klass).unmount && __privateGet(this, _klass).unmount();
      if (this.eventListenersMap) {
        for (const [key, value] of Object.entries(this.eventListenersMap)) {
          this.removeEventListener(key, value);
        }
      }
      this.eventListenersMap = null;
    }
  }, _klass = new WeakMap(), _shadow = new WeakMap(), _componentStyleTag = new WeakMap(), _a));
};
const SERVICE_OPTIONS_DEFAULTS = {
  name: "",
  deps: []
};
const Service = (options = {}, klass) => {
  options = __spreadValues(__spreadValues({}, SERVICE_OPTIONS_DEFAULTS), options);
  if (options.name && klass) {
    const instance = instantiate(klass, options.deps);
    Injector.register(options.name, instance);
  } else {
    throw new Error("error: Requires name in service options object and constructor to define service");
  }
};
const _StaticRouter = class {
  static checkParams(up, r) {
    let pmc = 0, po = {}, pc = r.ParamCount;
    for (let i = 0; i < up.length; i++) {
      var rtParam = r.Params[i];
      if (rtParam.indexOf(":") >= 0) {
        po[rtParam.split(":")[1]] = up[i];
        pmc += 1;
      }
    }
    if (pmc === pc) {
      return po;
    }
    return {};
  }
  static getParamCount(p) {
    let pc = 0;
    p.forEach((k) => {
      if (k.indexOf(":") >= 0) {
        pc += 1;
      }
    });
    return pc;
  }
  static formatRoute(r) {
    let obj = {
      Params: {},
      Url: "",
      Template: "",
      ParamCount: 0,
      IsRegistered: false,
      redirectTo: "",
      canActivate: () => true
    };
    obj.Params = r.path.split("/").filter((h) => {
      return h.length > 0;
    });
    obj.Url = r.path;
    obj.Template = "";
    obj.redirectTo = r.redirectTo;
    if (r.template) {
      if (!r.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      obj.Template = r.template;
      obj.TemplatePath = r.templatePath;
    }
    if (r.canActivate)
      obj.canActivate = r.canActivate;
    obj.ParamCount = _StaticRouter.getParamCount(obj.Params);
    _StaticRouter.routList.push(obj);
  }
};
let StaticRouter = _StaticRouter;
__publicField(StaticRouter, "routList", []);
class InternalRouter {
  constructor() {
    __privateAdd(this, _currentRoute, {
      path: "",
      params: {}
    });
    __privateAdd(this, _template, new Subject());
    fromEvent(window, "hashchange").subscribe(() => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return __privateGet(this, _template).asObservable();
  }
  getCurrentRoute() {
    return __privateGet(this, _currentRoute);
  }
  navigateTo(path = "") {
    if (path) {
      let windowHash = window.location.hash.replace(/^#/, "");
      if (windowHash === path) {
        this._navigateTo(path);
      }
      window.location.hash = "#" + path;
    } else {
      this._navigateTo(path);
    }
  }
  _registerOnHashChange() {
    const path = window.location.hash.replace(/^#/, "");
    this._navigateTo(path);
  }
  _routeMatcher(route, path) {
    if (route) {
      let _matcher = new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)"));
      return path.match(_matcher);
    } else {
      return route === path;
    }
  }
  _navigateTo(path) {
    let uParams = path.split("/").filter((h) => {
      return h.length > 0;
    });
    let routeArr = StaticRouter.routList.filter((route) => {
      if (route.Params.length === uParams.length && this._routeMatcher(route.Url, path)) {
        return route;
      } else if (route.Url === path) {
        return route;
      }
    });
    let routeItem = routeArr.length > 0 ? routeArr[0] : null;
    if (routeItem) {
      __privateGet(this, _currentRoute).path = path;
      wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
        if (!val)
          return;
        let _params = StaticRouter.checkParams(uParams, routeItem);
        if (Object.keys(_params).length > 0 || path) {
          __privateGet(this, _currentRoute).params = _params;
          if (!routeItem.IsRegistered) {
            if (routeItem.TemplatePath) {
              wrapIntoObservable(routeItem.TemplatePath()).subscribe((res) => {
                routeItem.IsRegistered = true;
                __privateGet(this, _template).next(routeItem.Template);
              });
            }
          } else {
            __privateGet(this, _template).next(routeItem.Template);
          }
        } else {
          this.navigateTo(routeItem.redirectTo);
        }
      });
    }
  }
}
_currentRoute = new WeakMap();
_template = new WeakMap();
Service({ name: "InternalRouter" }, InternalRouter);
class Router {
  constructor(internalRouter) {
    __publicField(this, "getCurrentRoute");
    __publicField(this, "navigateTo");
    this.getCurrentRoute = internalRouter.getCurrentRoute.bind(internalRouter);
    this.navigateTo = internalRouter.navigateTo.bind(internalRouter);
  }
  registerRoutes(routes) {
    if (Array.isArray(routes)) {
      for (let route of routes) {
        StaticRouter.formatRoute(route);
      }
    } else {
      throw Error("router.addRoutes: the parameter must be an array");
    }
  }
}
Service({ name: "Router", deps: ["InternalRouter"] }, Router);
const registerRouterComponent = () => {
  var _template2, _subscriptions;
  class RouterComponent {
    constructor(internalRouterSrvc, renderer) {
      __privateAdd(this, _template2, "");
      __privateAdd(this, _subscriptions, new Subscription());
      __publicField(this, "update");
    }
    beforeMount() {
      __privateGet(this, _subscriptions).add(this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
        __privateSet(this, _template2, tmpl);
        this.renderer.update();
      }));
    }
    mount() {
      let path = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(path);
    }
    unmount() {
      __privateGet(this, _subscriptions).unsubscribe();
    }
    render() {
      if (__privateGet(this, _template2)) {
        const stringArray = [`${__privateGet(this, _template2)}`];
        stringArray.raw = [`${__privateGet(this, _template2)}`];
        return html(stringArray);
      } else {
        return html``;
      }
    }
  }
  _template2 = new WeakMap();
  _subscriptions = new WeakMap();
  Component({ selector: "router-outlet", deps: ["InternalRouter", "Renderer"] }, RouterComponent);
};
const useState = (obj) => {
  let initialState = obj;
  const reducer = (fn) => {
    let newState;
    if (isFunction(fn)) {
      newState = fn(initialState);
    } else {
      newState = fn;
    }
    Object.assign(initialState, newState);
  };
  return [initialState, reducer];
};
const _getTargetValue = (target) => {
  let targetValue;
  switch (target.nodeName && target.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      let nonTextElements = ["radio", "checkbox"];
      if (nonTextElements.includes(target.type)) {
        targetValue = target.checked ? target.value !== null && target.value !== "on" ? target.value : true : false;
      } else {
        targetValue = target.value;
      }
      break;
    }
    case "select": {
      let one = target.type === "select-one";
      if (one) {
        targetValue = target.value;
      } else {
        let options = Array.from(target.options);
        targetValue = [...options].filter((option) => option.selected).map((option) => option.value);
      }
      break;
    }
    default: {
      targetValue = target.value;
      break;
    }
  }
  return targetValue;
};
const useFormFields = (initialValues) => {
  let [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    let target = e.target;
    const value = _getTargetValue(target);
    setFormFields(() => {
      formFields[key] = value;
      return formFields;
    });
  };
  const resetFormFields = () => {
    for (const key of Object.keys(formFields)) {
      formFields[key] = "";
    }
  };
  return [formFields, createChangeHandler, resetFormFields];
};
export { Component, Service, html, registerRouterComponent, render, useFormFields, useState };
