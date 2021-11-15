import { Injector } from './injector';
import { getArgs } from './utils';

const instantiate = (klass, deps, rendererInstance) => {
  if (deps.length > 0) {
    const services = [];
    for (const name of deps) {
      if (name !== 'Renderer') {
        services.push(Injector.getService(name));
      } else {
        services.push(rendererInstance);
      }
    }
    const constructorArgs = getArgs(klass);
    const instance = new klass(...services);
    constructorArgs.forEach((arg, i) => {
      instance[arg] = services[i];
    });
    return instance;
  } else {
    return new klass();
  }
};

export { instantiate };
