// @flow
import { instantiate } from './instantiate.js';
import { componentRegistry } from './componentRegistry';
import { render } from './html.js';
import { CSS_SHEET_NOT_SUPPORTED } from './utils';

/**
 * a renderer instance which provides additional functions for DOM tree navigation, DOM updation & emitEvent function to pass data to parent elements
 */
class Renderer {
  /**
   * {ShadowRoot} used to traverse dom tree
   */
  shadowRoot;

  /**
   * {() => void} used to update DOM with new state
   */
  update;

  /**
   * @param {string} eventName
   * @param {Object} data to pass
   */
  emitEvent;

  static get __metadata__() {
    return { name: 'Renderer' };
  }
}

const DEFAULT_COMPONENT_OPTIONS = {
  selector: '',
  root: false,
  styles: '',
  deps: [],
  standalone: false
};

const createStyleTag = (content, where) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

/**
 * Register a webcomponent with supplied tag and ES6 class
 * @param {{ selector: string, root: boolean, styles: string, deps: Function[] }} componentOptions
 * @param { Function } klass ES6 class defining the behavior of webcomponent
 */
const Component = (componentOptions, klass) => {
  if (window.customElements.get(componentOptions.selector)) {
    return;
  }

  // mapping with defaults
  componentOptions = { ...DEFAULT_COMPONENT_OPTIONS, ...componentOptions };
  componentOptions.styles = componentOptions.styles.toString();

  if (componentOptions.root && !componentRegistry.isRootNodeSet) {
    componentRegistry.isRootNodeSet = true;
    if (componentOptions.styles) {
      componentRegistry.globalStyles.replace(componentOptions.styles);
      componentRegistry.globalStyleTag = createStyleTag(componentOptions.styles, document.head);
    }
  } else if (componentOptions.root && componentRegistry.isRootNodeSet) {
    throw Error('Cannot register duplicate root component in ' + componentOptions.selector + ' component');
  }

  window.customElements.define(
    componentOptions.selector,
    class extends HTMLElement {
      #klass;
      #shadow;
      #componentStyleTag;

      constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        if (!CSS_SHEET_NOT_SUPPORTED) {
          this.#shadow.adoptedStyleSheets = componentRegistry.getComputedCss(componentOptions.styles);
        }
        this.update = this.update.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
        this.setProps = this.setProps.bind(this);
        this.getInstance = this.getInstance.bind(this);
      }

      emulateComponent() {
        if (CSS_SHEET_NOT_SUPPORTED && componentOptions.styles) {
          this.#componentStyleTag = createStyleTag(compiledCSS);
        }
      }

      connectedCallback() {
        this.emulateComponent();
        const rendererInstance = new Renderer();
        rendererInstance.shadowRoot = this.#shadow;
        rendererInstance.update = this.update;
        rendererInstance.emitEvent = this.emitEvent;
        this.#klass = instantiate(klass, componentOptions.deps, rendererInstance);
        this.#klass.beforeMount && this.#klass.beforeMount();
        this.update();
        this.#klass.mount && this.#klass.mount();
        this.emitEvent('bindprops', { setProps: this.setProps }, false);
      }

      update() {
        render(this.#shadow, this.#klass.render.bind(this.#klass)());
        if (CSS_SHEET_NOT_SUPPORTED) {
          componentOptions.styles && this.#shadow.insertBefore(this.#componentStyleTag, this.#shadow.childNodes[0]);
          if(componentRegistry.globalStyleTag && !componentOptions.standalone) {
            this.#shadow.insertBefore(
              document.importNode(componentRegistry.globalStyleTag, true),
              this.#shadow.childNodes[0]
            );
          }
        }
      }

      emitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
      }

      setProps(propsObj) {
        for (const [key, value] of Object.entries(propsObj)) {
          this.#klass[key] = value;
        }
        this.#klass.onPropsChanged && this.#klass.onPropsChanged();
        this.update();
      }

      getInstance() {
        return this.#klass;
      }

      disconnectedCallback() {
        this.#klass.unmount && this.#klass.unmount();
      }
    }
  );
};

export { Component, Renderer };
