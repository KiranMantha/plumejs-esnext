import instantiate from "./instance";

class ServiceResolver {
  _services = new Map();

  constructor() {
    return {
      register: this.register.bind(this),
      get: this.getService.bind(this)
    }
  }

  register(name, func) {
    if (name && func) {
      if (!this._services.get(name)) {
        this._services.set(name, func);
      }
    } else {
      throw "error: Requires name and constructor to define service";
    }
  }

  getService(name) {
    return this._services.get(name);
  }
}

const Injector = new ServiceResolver();

export default Injector;
