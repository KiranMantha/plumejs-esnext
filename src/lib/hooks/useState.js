import { isFunction } from '../utils';

const useState = (obj) => {
  let initialState = obj;
  const reducer = (fn) => {
    let newState;
    if (isFunction(fn)) {
      newState = fn(initialState);
    } else {
      newState = fn;
    }
    for (const key in newState) {
      initialState[key] = newState[key];
    }
  };
  return [initialState, reducer];
};

export { useState };
