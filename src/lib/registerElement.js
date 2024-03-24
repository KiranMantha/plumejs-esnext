import { augmentor } from './augment';
import { componentRegistry } from './componentRegistry';
import { render } from './html.js';
import { instantiate } from './instantiate.js';
import { Renderer } from './renderer';
import {
  CSS_SHEET_SUPPORTED,
  Subscriptions,
  createToken,
  fromEvent,
  isPromise,
  proxifiedClass,
  sanitizeHTML
} from './utils';

const DEFAULT_COMPONENT_OPTIONS = {
  selector: '',
  root: false,
  styles: '',
  deps: [],
  standalone: false,
  encapsulation: 'shadowDom'
};

const createStyleTag = (content, where) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

/**
 * Register a webcomponent with supplied tag and ES6 class
 * @param {{ selector: string, root: boolean, styles: string | import(), deps: Function[], standalone: boolean, encapsulation: string }} componentOptions
 * @param { Function } klass ES6 class defining the behavior of webcomponent
 */
const registerElement = async (componentOptions, klass) => {
  // mapping with defaults
  componentOptions = { ...DEFAULT_COMPONENT_OPTIONS, ...componentOptions };
  if (isPromise(componentOptions.styles)) {
    const styles = await componentOptions.styles;
    componentOptions.styles = styles.default.toString();
  }
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
      #internalSubscriptions = new Subscriptions();
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
          const id = createToken();
          this.setAttribute('data-did', id);
          const styles = componentOptions.styles.replaceAll(':host', `${componentOptions.selector}[data-did='${id}']`);
          if (!componentOptions.root && styles) {
            this.#componentStyleTag = createStyleTag(styles, document.head);
          }
        }
        this.getInstance = this.getInstance.bind(this);
        this.update = this.update.bind(this);
        this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this);
        this.#createProxyInstance();
      }

      #createProxyInstance() {
        const rendererInstance = new Renderer(this, this.#shadow);
        rendererInstance.update = () => {
          this.update();
        };
        rendererInstance.emitEvent = (eventName, data) => {
          this.#emitEvent(eventName, data);
        };
        this.#klass = instantiate(
          proxifiedClass(this.setRenderIntoQueue, klass),
          componentOptions.deps,
          rendererInstance
        );
      }

      update() {
        const renderValue = this.#klass.render();
        if (typeof renderValue === 'string') {
          this.#shadow.innerHTML = sanitizeHTML(renderValue);
        } else {
          render(this.#shadow, renderValue);
        }
      }

      #emitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
          detail: data
        });
        this.dispatchEvent(event);
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

      setRenderIntoQueue() {
        ++this.renderCount;
        if (this.renderCount === 1) {
          queueMicrotask(() => {
            this.update();
            this.renderCount = 0;
          });
        }
      }

      /**
       * Default html element events
       */
      connectedCallback() {
        this.#internalSubscriptions.add(
          fromEvent(this, 'bindprops', (e) => {
            const propsObj = e.detail.props;
            propsObj && this.setProps(propsObj);
          })
        );
        this.#internalSubscriptions.add(
          fromEvent(this, 'refresh_component', () => {
            this.update();
          })
        );
        if (this.#klass.beforeMount) {
          this.#internalSubscriptions.add(
            augmentor(this.setRenderIntoQueue, this.#klass.beforeMount.bind(this.#klass))
          );
        }
        //this update is needed so that when we use refs in mount hook they won't break
        this.update();
        this.#klass.mount?.();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.#klass.onAttributesChanged?.(name, oldValue, newValue);
      }

      disconnectedCallback() {
        this.renderCount = 0;
        this.#klass.unmount?.();
        this.#componentStyleTag?.remove();
        this.#internalSubscriptions.unsubscribe();
      }
    }
  );
};

export { registerElement };
