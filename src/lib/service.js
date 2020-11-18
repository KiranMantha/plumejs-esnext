import instantiate from "./instance";
import Injector from "./injector";

const Service = (name, klass) => {
  if (!name || !klass) return;
  if (!Injector.get(name)) {
    const serviceInstance = instantiate(klass);
    Injector.register(name, serviceInstance);
  }
};

export { Service };
