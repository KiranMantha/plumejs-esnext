import { componentRegistry } from './componentRegistry';
import { render } from './html.js';
import { instantiate } from './instantiate.js';
import { CSS_SHEET_SUPPORTED, proxifiedClass, sanitizeHTML } from './utils';

/**
 * a renderer instance which provides additional functions for DOM tree navigation, DOM updation & emitEvent function to pass data to parent elements
 */
class Renderer {
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
 * @param {{ selector: string, root: boolean, styles: string, deps: Function[], standalone: boolean }} componentOptions
 * @param { Function } klass ES6 class defining the behavior of webcomponent
 */
const registerElement = (componentOptions, klass) => {
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
      renderCount = 0;

      static get observedAttributes() {
        return klass.observedAttributes || [];
      }

      constructor() {
        super();
        if (CSS_SHEET_SUPPORTED) {
          this.#shadow = this.attachShadow({ mode: 'open' });
          this.#shadow.adoptedStyleSheets = componentRegistry.getComputedCss(
            componentOptions.styles,
            componentOptions.standalone
          );
        } else {
          this.#shadow = this;
          const styles = componentOptions.styles.replaceAll(':host', componentOptions.selector);
          this.#componentStyleTag = createStyleTag(styles, document.head);
        }
        this.#createProxyInstance();
        this.getInstance = this.getInstance.bind(this);
        this.update = this.update.bind(this);
      }

      #createProxyInstance() {
        const rendererInstance = new Renderer(this, this.#shadow);
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.emitEvent = (eventName, data) => {
          this.#emitEvent(eventName, data);
        };
        this.#klass = instantiate(proxifiedClass(this, klass), componentOptions.deps, rendererInstance);
      }

      #emitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
      }

      update() {
        const renderValue = this.#klass.render();
        if (typeof renderValue === 'string') {
          this.#shadow.innerHTML = sanitizeHTML(renderValue);
        } else {
          render(this.#shadow, renderValue);
        }
      }

      setProps(propsObj) {
        for (const [key, value] of Object.entries(propsObj)) {
          if (klass.observedProperties.find((property) => property === key)) {
            this.#klass[key] = value;
          }
        }
        this.#klass.onPropertiesChanged?.();
      }

      getInstance() {
        return this.#klass;
      }

      /**
       * Default html element events
       */
      connectedCallback() {
        this.#klass.beforeMount?.();
        //this update is needed so that when we use refs in mount hook they won't break
        this.update();
        this.#klass.mount?.();
        this.#emitEvent(
          'bindprops',
          {
            setProps: (propsObj) => {
              this.setProps(propsObj);
            }
          },
          false
        );
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.#klass.onAttributesChanged?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.renderCount = 1;
        this.#klass.unmount?.();
        this.#componentStyleTag?.remove();
      }
    }
  );
};

export { Renderer, registerElement };
