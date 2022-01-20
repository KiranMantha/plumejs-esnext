import { instantiate } from './instantiate.js';
import { componentRegistry } from './componentRegistry';
import { render } from './html.js';
import { CSS_SHEET_NOT_SUPPORTED } from './utils';

class Renderer {
  shadowRoot;
  update;
  emitEvent;
}

const COMPONENT_DATA_ATTR = 'data-compid';
const DEFAULT_COMPONENT_OPTIONS = {
  selector: '',
  root: false,
  styles: '',
  useShadow: true,
  deps: []
};

const transformCSS = (styles, selector) => {
  if (styles) {
    styles = selector + ' ' + styles.replace('}', ` } ${selector} `);
  }
  return styles;
};

const createStyleTag = (content, where) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};

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
          const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
          const compiledCSS = transformCSS(componentOptions.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
          this.#componentStyleTag = createStyleTag(compiledCSS);
          this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
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
      }

      update() {
        render(this.#shadow, this.#klass.render.bind(this.#klass)());
        if (CSS_SHEET_NOT_SUPPORTED) {
          componentOptions.styles && this.#shadow.insertBefore(this.#componentStyleTag, this.#shadow.childNodes[0]);
          componentRegistry.globalStyleTag &&
            this.#shadow.insertBefore(
              document.importNode(componentRegistry.globalStyleTag, true),
              this.#shadow.childNodes[0]
            );
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
        if (this.eventListenersMap) {
          for (const [key, value] of Object.entries(this.eventListenersMap)) {
            this.removeEventListener(key, value);
          }
        }
        this.eventListenersMap = null;
      }
    }
  );
};

export { Component };
