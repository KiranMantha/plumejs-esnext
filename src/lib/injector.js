// @flow
/**
 * a dependency manager
 */
const Injector = new (class {
  #weakMap;
  constructor() {
    this.#weakMap = new WeakMap();
  }

  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(klass, instance) {
    if (!this.#weakMap.get(klass)) {
      this.#weakMap.set(klass, instance);
    } else {
      console.error(klass);
      throw 'service already exists';
    }
  }

  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(klass) {
    const instance = this.#weakMap.get(klass);
    if (instance) {
      return instance;
    } else {
      console.error(klass);
      throw 'service is not a registered service.';
    }
  }

  /**
   * clears all registered dependencies
   */
  clear() {
    this.#weakMap = new WeakMap();
  }
})();

export { Injector };
