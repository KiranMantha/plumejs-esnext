import { from, of } from "rxjs";

var $object = "object",
  $array = "array",
  $string = "string",
  $function = "function",
  $undefined = "undefined",
  $number = "number";

//deep copy utility
function copy(o) {
  // var output, v, key;
  // output = isArray(o) ? [] : {};
  // for (key in o) {
  //   v = o[key];
  //   output[key] = isObject(v) ? copy(v) : v;
  // }
  // return output;
  return JSON.parse(JSON.stringify(o));
}

function isNumber(value) {
  return typeof value === $number;
}
function isArray(value) {
  return value instanceof Array;
}
function isObject(value) {
  return value !== null && typeof value === $object;
}
function isString(value) {
  return typeof value === $string;
}
function isFunction(value) {
  return typeof value === $function;
}
function isUndefined(value) {
  return typeof value == $undefined;
}
function isDefined(value) {
  return typeof value != $undefined;
}

function valueFn(value) {
  return function() {
    return value;
  };
}

function $args(func) {
  return Function.toString
    .call(func)
    .replace(/[/][/].*$/gm, "") // strip single-line comments
    .replace(/\s+/g, "") // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, "") // strip multi-line comments
    .split("){", 1)[0]
    .replace(/^[^(]*[(]/, "") // extract the parameters
    .replace(/=[^,]+/g, "") // strip any ES6 defaults
    .split(",")
    .filter(Boolean); // split & filter [""]
}

function merge(first, second) {
  var len = +second.length,
    j = 0,
    i = first.length;
  for (; j < len; j++) {
    first[i++] = second[j];
  }
  first.length = i;
  return first;
}

const isObservable = obj => !!obj && typeof obj.subscribe === "function";
const isPromise = obj => !!obj && typeof obj.then === "function";

function toObservable(value) {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    // Use `Promise.resolve()` to wrap promise-like instances.
    // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
    // change detection.
    return from(Promise.resolve(value));
  }

  return of(value);
}

export {
  copy,
  isNumber,
  isArray,
  isObject,
  isString,
  isFunction,
  isDefined,
  isUndefined,
  valueFn,
  $args,
  merge,
  toObservable
};
