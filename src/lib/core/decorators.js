import { Injector } from './injector';
import { instantiate } from './instantiate';
import { registerElement } from './registerElement';

const SERVICE_OPTIONS_DEFAULTS = {
  deps: []
};

/**
 * Component decorator
 * @param {{selector: string; styles?: string; root?: boolean; deps?: Injectable[]; standalone?: boolean; shadowDomEncapsulation?: boolean;}} options
 */
const Component = (options) => (target) => {
  if (options.selector.indexOf('-') <= 0) {
    throw new Error('You need at least 1 dash in the custom element name!');
  }

  if (!window.customElements.get(options.selector)) {
    registerElement(options, target);
  }
};

/**
 * Injectable decorator
 * @param {{deps?: Injectable[];}} options
 */
const Injectable =
  (options = {}) =>
  (target) => {
    options = { ...SERVICE_OPTIONS_DEFAULTS, ...options };
    target.prototype.__metadata__ = {
      name: 'SERVICE'
    };
    if (options.deps.some((dep) => dep.prototype.__metadata__.name === 'RENDERER')) {
      throw Error('Renderer cannot be a dependency for a service. It should be used with component');
    }
    const instance = instantiate(target, options.deps);
    Injector.register(target, instance);
  };

export { Component, Injectable };
