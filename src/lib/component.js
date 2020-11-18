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

    connectedCallback() {
      this._klass = augmentor(wrapper(klass))(this._props);
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
