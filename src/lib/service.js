import { Injector } from './injector';
import { instantiate } from './instantiate';

const SERVICE_OPTIONS_DEFAULTS = {
  name: '',
  deps: []
};

const Service = (options = {}, klass) => {
  options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
  if (options.name && klass) {
    const instance = instantiate(klass, options.deps);
    Injector.register(options.name, instance);
  } else {
    throw new Error('error: Requires name in service options object and constructor to define service');
  }
};

export { Service };
