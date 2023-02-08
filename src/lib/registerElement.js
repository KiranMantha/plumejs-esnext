import { componentRegistry } from './componentRegistry';
import { render } from './html.js';
import { instantiate } from './instantiate.js';
import { CSS_SHEET_NOT_SUPPORTED } from './utils';

/**
 * a renderer instance which provides additional functions for DOM tree navigation, DOM updation & emitEvent function to pass data to parent elements
 */
class Renderer {
  #shadowRoot;
  #hostElement;

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

  /**
   * {ShadowRoot} used to traverse dom tree
   */
  get shadowRoot() {
    return this.#shadowRoot;
  }

  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return this.#hostElement;
  }

  constructor(_hostELement, _shadowRoot) {
    this.#hostElement = _hostELement;
    this.#shadowRoot = _shadowRoot;
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

      static get observedAttributes() {
        return klass.observedAttributes || [];
      }

      constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        if (!CSS_SHEET_NOT_SUPPORTED) {
          this.#shadow.adoptedStyleSheets = componentRegistry.getComputedCss(
            componentOptions.styles,
            componentOptions.standalone
          );
        }
        this.getInstance = this.getInstance.bind(this);
      }

      emulateComponent() {
        if (CSS_SHEET_NOT_SUPPORTED && componentOptions.styles) {
          this.#componentStyleTag = createStyleTag(componentOptions.styles);
        }
      }

      update() {
        render(this.#shadow, (() => this.#klass.render())());
        if (CSS_SHEET_NOT_SUPPORTED) {
          componentOptions.styles && this.#shadow.insertBefore(this.#componentStyleTag, this.#shadow.childNodes[0]);
          if (componentRegistry.globalStyleTag && !componentOptions.standalone) {
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
          if (klass.observedProperties[key]) {
            this.#klass[key] = value;
          }
        }
        this.#klass.onPropertiesChanged?.();
        this.update();
      }

      getInstance() {
        return this.#klass;
      }

      connectedCallback() {
        this.emulateComponent();
        const rendererInstance = new Renderer(this, this.#shadow);
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.emitEvent = (eventName, data) => {
          this.emitEvent(eventName, data);
        };
        this.#klass = instantiate(klass, componentOptions.deps, rendererInstance);
        this.#klass.beforeMount?.();
        this.update();
        this.#klass.mount?.();
        this.emitEvent(
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
        this.#klass.onAttributesChanges?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.#klass.unmount?.();
      }
    }
  );
};

export { registerElement, Renderer };