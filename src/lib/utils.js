const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && typeof value === 'object';

// will work for es5 functions transpiled by webpack
// function getArgs(func) {
//   return Function.toString
//     .call(func)
//     .replace(/[/][/].*$/gm, '') // strip single-line comments
//     .replace(/\s+/g, '') // strip white space
//     .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
//     .split('){', 1)[0]
//     .replace(/^[^(]*[(]/, '') // extract the parameters
//     .replace(/=[^,]+/g, '') // strip any ES6 defaults
//     .split(',')
//     .filter(Boolean); // split & filter [""]
// }

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
const fromNativeEvent = (target, eventName, onNext, options = false) => {
  target.addEventListener(eventName, onNext, options);
  const unsubscribe = () => {
    target.removeEventListener(eventName, onNext, options);
  };
  return unsubscribe;
};

export { isFunction, isObject, getArgs, CSS_SHEET_NOT_SUPPORTED, fromNativeEvent };
