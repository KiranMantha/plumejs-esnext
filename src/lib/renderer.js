/**
 * a renderer instance which provides additional functions for DOM tree navigation, DOM updation & emitEvent function to pass data to parent elements
 */
export class Renderer {
  _shadowRoot;
  _hostElement;

  /**
   * {() => void} used to update DOM with new state
   */
  update;

  /**
   * @param {string} eventName
   * @param {Object} data to pass
   */
  emitEvent;

  get __metadata__() {
    return { name: 'RENDERER' };
  }

  /**
   * {ShadowRoot} used to traverse dom tree
   */
  get shadowRoot() {
    return this._shadowRoot;
  }

  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return this._hostElement;
  }

  constructor(hostELement, shadowRoot) {
    this._hostElement = hostELement;
    this._shadowRoot = shadowRoot;
  }
}
