import { instantiate } from './instantiate.js';
import { componentRegistry } from './componentRegistry';
import { render } from './html.js';

class Renderer {
  shadowRoot;
  update;
  emitEvent;
}

const COMPONENT_DATA_ATTR = 'data-compid';

const transformCSS = (styles, selector) => {
  if (styles) {
    styles = selector + ' ' + styles.replace('}', ` } ${selector} `);
  }
  return styles;
};

const createStyleTag = (content, where) => {
  const tag = document.createElement('style');
  tag.innerHTML = content;
  return tag;
};

const Component = (componentOptions, klass) => {
  if (window.customElements.get(componentOptions.selector)) {
    return;
  }

  // setting defaults
  componentOptions.root = componentOptions.root || false;
  componentOptions.styles = (componentOptions.styles || '').toString();
  componentOptions.useShadow = componentOptions.useShadow || true;

  if (componentOptions.root && !componentRegistry.isRootNodeSet) {
    componentRegistry.isRootNodeSet = true;
    componentRegistry.globalStyles.replace(componentOptions.styles);
    componentRegistry.globalStyleTag = createStyleTag(componentOptions.styles);
    document.head.appendChild(componentRegistry.globalStyleTag);
  } else if (componentOptions.root && componentRegistry.isRootNodeSet) {
    throw Error(
      'Cannot register duplicate root component in ' +
        componentOptions.selector +
        ' component'
    );
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
        this.#shadow.adoptedStyleSheets = componentRegistry.getComputedCss(
          componentOptions.styles
        );
        this.update = this.update.bind(this);
        this.emitEvent = this.emitEvent.bind(this);
        this.setProps = this.setProps.bind(this);
        this.getInstance = this.getInstance.bind(this);
      }

      update() {
        render(this.#shadow, this.#klass.render.bind(this.#klass)());
        // this.#shadow.insertBefore(
        //   this.#componentStyleTag,
        //   this.#shadow.childNodes[0]
        // );
        // this.#shadow.insertBefore(
        //   componentRegistry.globalStyleTag,
        //   this.#shadow.childNodes[0]
        // );
      }

      emitEvent(eventName, data) {
        const event = new CustomEvent(eventName, {
          detail: data,
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

      emulateComponent() {
        //if (CSS_SHEET_NOT_SUPPORTED && componentOptions.styles) {
        const id = new Date().getTime() + Math.floor(Math.random() * 1000 + 1);
        const compiledCSS = transformCSS(
          componentOptions.styles,
          `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`
        );
        this.#componentStyleTag = createStyleTag(compiledCSS);
        this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
        //}
      }

      connectedCallback() {
        //this.emulateComponent();
        const fn = Array.isArray(klass) ? klass : [klass];
        const rendererInstance = new Renderer();
        rendererInstance.shadowRoot = this.#shadow;
        rendererInstance.update = this.update;
        rendererInstance.emitEvent = this.emitEvent;
        this.#klass = instantiate(fn, rendererInstance);
        this.#klass.beforeMount && this.#klass.beforeMount();
        this.update();
        this.#klass.mount && this.#klass.mount();
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
