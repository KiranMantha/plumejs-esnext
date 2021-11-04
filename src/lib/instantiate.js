import { Injector } from './injector';
import { getArgs } from './utils';

const instantiate = (fn, rendererInstance) => {
  const controller = fn[fn.length - 1];
  const serviceNames = fn.slice(0, -1);
  const services = [];
  for (const name of serviceNames) {
    if (name !== 'Renderer') {
      services.push(Injector.getService(name));
    } else {
      services.push(rendererInstance);
    }
  }
  if (services.length > 0) {
    const constructorArgs = getArgs(controller);
    const instance = new controller(...services);
    constructorArgs.forEach((arg, i) => {
      instance[arg] = services[i];
    });
    return instance;
  } else {
    return new controller();
  }
};

export { instantiate };
