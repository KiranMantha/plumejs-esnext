import instantiate from "./instance";
import { augmentor } from "augmentor";
import { render } from "./plume";

const customElements = window.customElements;

const wrapper = fn => props => instantiate(fn, props);

const Component = (sel, klass) => {
  class __dummy extends HTMLElement {
    _klass;
    _shadow;
    _props;
    _isConnected;
    __properties;

    constructor(props) {
      super();
      //this._shadow = this.attachShadow({ mode: "open" }) : this;
      this._shadow = this;
      this._props = props;
    }

    _init() {
      const _returnfn = this._klass.render.bind(this._klass);
      render(this._shadow, _returnfn());
    }

    _update = () => {
      this._init();
    };

    /**
     * __bindProperties()
     * Internal method to bind properties and create a onPropertyChanged callback, also exposing an event of the same name
     * use this callback or watch the event to be notified of property changes that are subscribed too
	  */
    _bindProperties() {
      if (!klass.constructor.observedProperties || !klass.constructor.observedProperties.length) return;
  
      this.__properties = {};
  
      for (const idx in klass.constructor.observedProperties) {
        Object.defineProperty(this, klass.constructor.observedProperties[idx], {
          get: function () { return this.__properties[klass.constructor.observedProperties[idx]]; },
          set: function (value) {
            let oldValue = this.__properties[klass.constructor.observedProperties[idx]];
            this.__properties[klass.constructor.observedProperties[idx]] = value;
            if (this._isConnected && typeof this._klass.onPropertyChanged === 'function') if (oldValue !== value) this._klass.onPropertyChanged(klass.constructor.observedProperties[idx], oldValue, value);
          }
        });
      }
    }

    connectedCallback() {
      this._isConnected = true;
      this._klass = augmentor(wrapper(klass))(this._props);
      this._bindProperties();
      this._klass["update"] = this._update.bind(this);
      this._klass.beforeMount && this._klass.beforeMount();

      this._update();
      this._klass.mount && this._klass.mount();
    }

    disconnectedCallback() {
      this._klass.unmount && this._klass.unmount();
    }
  }
  customElements.define(sel, __dummy);
  return __dummy;
};

export { Component };
