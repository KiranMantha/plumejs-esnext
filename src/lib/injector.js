const Injector = new class {
  _services = new Map();

  register(name, obj) {
    if (!this._services.get(name)) {
      this._services.set(name, obj);
    } else {
      throw `${name} service already exists`;
    }
  }

  getService(name) {
    const instance = this._services.get(name);
    if (instance) {
      return instance;
    } else {
      throw Error(`${name} is not a registered service.`);
    }
  }
}();

export { Injector };
