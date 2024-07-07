import { createToken } from './utils';

const isFunction = (value) => typeof value === 'function';
const updateFnRegistry = Object.create(null);
let token = null;

function signalWrapper(updateFn, fn) {
  const prev = token;
  let generatedToken;
  token = createToken();
  updateFnRegistry[token] = updateFn;
  try {
    fn();
  } finally {
    generatedToken = token;
    token = prev;
  }
  return generatedToken;
}

/**
 * @param {any} initialValue
 * @param {(previousState, newState) => finalState} callback - callback that provides previous state, new state as arguments and should return final state;
 * @returns Function
 */
function signal(initialValue, callback) {
  const updateFn = updateFnRegistry[token];
  let value = initialValue;
  function boundSignal() {
    return value;
  }
  boundSignal.set = function (v) {
    if (callback && isFunction(callback)) {
      value = callback(value, v);
    } else {
      value = isFunction(v) ? v(value) : v;
    }
    try {
      updateFn();
    } catch (e) {
      console.log(e);
    }
  };
  return boundSignal;
}

function augmentor(updateFn, fn) {
  const generatedToken = signalWrapper(updateFn, fn);
  return function () {
    delete updateFnRegistry[generatedToken];
  };
}

export { augmentor, signal };
