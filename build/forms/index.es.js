var h = Object.defineProperty;
var d = (r, e, t) => e in r ? h(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var o = (r, e, t) => (d(r, typeof e != "symbol" ? e + "" : e, t), t);
(() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})();
const _ = (r) => typeof r == "function", g = /* @__PURE__ */ Object.create(null);
let v = null;
function a(r) {
  const e = g[v];
  let t = r;
  function s() {
    return t;
  }
  return s.set = function(n) {
    _(n) ? t = n(t) : t = n;
    try {
      e();
    } catch {
    }
  }, s;
}
new class {
  constructor() {
    o(this, "globalStyles");
    o(this, "globalStyleTag");
    o(this, "style_registry");
    o(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(r = "") {
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], r) {
      const s = new CSSStyleSheet();
      s.replace(r), e.push(s);
    }
    return e;
  }
}();
const l = (r) => typeof r == "function", f = (r, e) => r.nodeName && r.nodeName.toLowerCase() === e.toLowerCase(), y = (r) => {
  let e;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? e = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : e = r.value;
      break;
    }
    case "select": {
      const t = r.type === "select-one", n = [...Array.from(r.options).filter((i) => !i.disabled && (!i.parentNode.disabled || !f(i.parentNode, "optgroup")))].filter((i) => i.selected).map((i) => i.value ?? (i.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? n[0] : n;
      break;
    }
    default: {
      e = r.value;
      break;
    }
  }
  return e;
};
class u {
  constructor(e, t, s) {
    o(this, "name");
    o(this, "validators");
    o(this, "isTouched", !1);
    o(this, "validity", null);
    /**
     * @private */
    o(this, "_initialValue");
    /**
     * @private */
    o(this, "_value");
    /**
     * @private
     */
    o(this, "_errorMessage", a(""));
    /**
     * @private
     */
    o(this, "_parent");
    const n = [...Array.isArray(t) ? t : [t]];
    this.name = e, this._initialValue = n[0], this._value = n[0], this.validators = n.length > 1 ? n[1] : [], this._parent = s;
  }
  get value() {
    return this._value;
  }
  get errorMessage() {
    return this._errorMessage();
  }
  register() {
    return {
      attrs: {
        name: this.name,
        value: this.value,
        onchange: (e) => {
          this._value = y(e.target);
        },
        onblur: () => {
          this.isTouched = !0, this.validate();
        }
      }
    };
  }
  validate() {
    var t;
    let e = "";
    for (const s of this.validators)
      if (this.validity = l(s) ? s(this.value) : s.rule(this.value), this.validity !== null) {
        e = l(s) ? "error" : s.message, (t = this._parent) == null || t.setError(this.name, this.validity);
        break;
      }
    this._errorMessage.set(e);
  }
  reset() {
    this._value = this._initialValue, this.isTouched = !1, this.validity = null, this._errorMessage.set("");
  }
}
const m = () => Math.random().toString(36).substring(2);
class p {
  constructor(e) {
    /**
     * @private
     */
    o(this, "_controls", a([]));
    /**
     * @private
     */
    o(this, "_initialCollection", []);
    o(this, "validity", null);
    this._initialCollection = e;
    const t = this._generateControls(e);
    this._controls.set(t);
  }
  get value() {
    return this.controls.map((t) => {
      const s = {};
      for (const n of t)
        s[n.name] = n.control.value;
      return s;
    });
  }
  get controls() {
    return this._controls();
  }
  validate() {
    const e = this.controls.flatMap((t) => {
      const s = t.filter(({
        control: n
      }) => {
        if (n.validate(), n.errorMessage)
          return n.errorMessage;
      });
      if (s.length)
        return s;
    }).filter(Boolean);
    this.validity = e.length ? {
      invalid: !0
    } : null;
  }
  append(e) {
    this._controls.set((t) => [...t, this._generateItemControls(e)]);
  }
  remove(e) {
    const t = [...this.controls];
    t.splice(e, 1), this._controls.set(t);
  }
  reset() {
    const e = this._generateControls(this._initialCollection);
    this.validity = null, this._controls.set(e);
  }
  /**
   * @private
   */
  _generateControls(e) {
    return e.map((t) => this._generateItemControls(t));
  }
  /**
   * @private
   */
  _generateItemControls(e) {
    const t = [], s = m();
    for (const [n, i] of Object.entries(e)) {
      const c = {
        name: n,
        control: new u(`${n}-${s}`, i),
        indexedName: `${n}-${s}`
      };
      t.push(c);
    }
    return t;
  }
}
class b {
  constructor(e) {
    /**
     * @private
     */
    o(this, "_initialValues");
    /**
     * @private
     */
    o(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    o(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    o(this, "_errorCount", 0);
    /**
     * @private
     */
    o(this, "_isSubmitted", !1);
    this._initialValues = e;
    for (const [t, s] of Object.entries(e))
      s instanceof p ? this._controls.set(t, s) : this._controls.set(t, new u(t, s, {
        setError: this._setError.bind(this)
      }));
  }
  get hasErrors() {
    return !!this._errorCount;
  }
  /**
   * @type Map
   */
  get errors() {
    return this._errors;
  }
  /**
   * @type boolean
   */
  get valid() {
    return !this._errors.size;
  }
  /**
   * @type Object
   */
  get value() {
    const e = {};
    for (const [t, s] of this._controls)
      e[t] = s.value;
    return e;
  }
  /**
   * @type boolean
   */
  get submitted() {
    return this._isSubmitted;
  }
  /**
   *
   * @param {string} controlName
   * @returns {value: string; validators: []; isTouched: boolean; errorMessage: string}
   */
  getControl(e) {
    return this._controls.get(e);
  }
  /**
   *
   * @param {string} key
   * @returns {{ attrs: { name: string; value: string; onchange: (e: Event) => void; onblur: (e: Event) => void }}
   */
  register(e) {
    return this.getControl(e).register();
  }
  /**
   *
   * @param {Event} e
   * @param {(values: Object) => void} fn
   */
  handleSubmit(e, t) {
    e.preventDefault(), this._isSubmitted = !0, this._checkValidity(), t(this.value);
  }
  reset() {
    this._controls.forEach((e) => {
      e.reset();
    }), this._isSubmitted = !1, this._errors.clear(), this._errorCount = 0;
  }
  /**
   * @private
   */
  _setError(e, t) {
    t ? this._errors.set(e, t) : this._errors.delete(e), this._errorCount = this._errors.size;
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [e] of this._controls)
      this._executeValidators(e);
    this._errorCount = this._errors.size;
  }
  /**
   * @private
   */
  _executeValidators(e) {
    const t = this.getControl(e);
    t.validate(), t.validity !== null ? this._errors.set(e, {
      ...this._errors.get(e) || {},
      ...t.validity
    }) : this._errors.delete(e);
  }
}
class C {
  static required(e) {
    return e.length ? null : {
      required: !0
    };
  }
  static min(e) {
    return (t) => t.length >= e ? null : {
      minLength: {
        requiredLength: e
      }
    };
  }
  static max(e) {
    return (t) => t.length <= e ? null : {
      maxLength: {
        requiredLength: e
      }
    };
  }
  static pattern(e) {
    return (t) => new RegExp(e).test(t) ? null : {
      pattern: !0
    };
  }
}
export {
  p as FieldArray,
  b as FormBuilder,
  C as Validators
};
