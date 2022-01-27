// @flow
import { Injector } from './injector';
import { getArgs } from './utils';

const instantiate = (klass, deps, rendererInstance) => {
  if (deps.length > 0) {
    const services = [];
    for (const dependency of deps) {
      if (!dependency.__metadata__) {
        services.push(Injector.getService(dependency));
      } else {
        services.push(rendererInstance);
      }
    }
    const constructorArgs = getArgs(klass);
    const instance = new klass(...services);
    deps.forEach((arg, i) => {
      instance[constructorArgs[i]] = services[i];
    });
    return instance;
  } else {
    return new klass();
  }
};

export { instantiate };
