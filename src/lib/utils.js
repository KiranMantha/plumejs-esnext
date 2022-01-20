import { from, of } from 'rxjs';

const isFunction = (value) => typeof value === 'function';
const isObject = (value) => value !== null && typeof value === 'object';
const isObservable = (obj) => !!obj && typeof obj.subscribe === 'function';
const isPromise = (obj) => !!obj && typeof obj.then === 'function';

const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value);
};

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

export {
  isFunction,
  isObject,
  wrapIntoObservable,
  getArgs,
  CSS_SHEET_NOT_SUPPORTED,
};
