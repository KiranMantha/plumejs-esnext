// @flow
import { Injector } from './injector';
import { instantiate } from './instantiate';

const SERVICE_OPTIONS_DEFAULTS = {
  deps: [],
};

/**
 * Register a singleton service
 * @param {({ deps: Function[] } | Function)} args[0]
 * @param {Function} args[1]
 */
const Service = (...args) => {
  console.log('service args', args);
  let options = { ...SERVICE_OPTIONS_DEFAULTS };
  let klass;
  if (args[0].hasOwnProperty('deps')) {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...args[0] };
    klass = args[1];
  } else {
    klass = args[0];
  }

  if (klass) {
    const instance = instantiate(klass, options.deps);
    Injector.register(klass, instance);
  } else {
    throw new Error('error: Requires constructor to define service');
  }
};

export { Service };
