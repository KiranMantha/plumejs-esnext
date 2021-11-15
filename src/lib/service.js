import { Injector } from './injector';
import { instantiate } from './instantiate';

const Service = (options = {}, klass) => {
  options.deps = options.deps || [];
  if (options.name && klass) {
    const instance = instantiate(klass, options.deps);
    Injector.register(options.name, instance);
  } else {
    throw 'error: Requires name in service options object and constructor to define service';
  }
};

export { Service };
