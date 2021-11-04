import { Injector } from './injector';
import { instantiate } from './instantiate';
import { isFunction, isObject } from './utils';

const Service = (name, func) => {
  if (name && func) {
    if (isFunction(func) || Array.isArray(func)) {
      const fn = Array.isArray(func) ? func : [func];
      const instance = instantiate(fn);
      Injector.register(name, instance);
    } else if(isObject(func)) {
      Injector.register(name, func);
    }
  } else {
    throw 'error: Requires name and (constructor or service names with constructor) to define service';
  }
};

export { Service };
