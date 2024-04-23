var u = Object.defineProperty;
var c = (r, e, t) => e in r ? u(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var i = (r, e, t) => (c(r, typeof e != "symbol" ? e + "" : e, t), t);
(() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})();
const h = (r) => typeof r == "function", d = /* @__PURE__ */ Object.create(null);
let _ = null;
function f(r) {
  const e = d[_];
  let t = r;
  function s() {
    return t;
  }
  return s.set = function(n) {
    h(n) ? t = n(t) : t = n, e();
  }, s;
}
const l = (r) => typeof r == "function";
function g(r, e) {
  return r.nodeName && r.nodeName.toLowerCase() === e.toLowerCase();
}
const v = (r) => {
  let e;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? e = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : e = r.value;
      break;
    }
    case "select": {
      const t = r.type === "select-one", n = [...Array.from(r.options).filter((o) => !o.disabled && (!o.parentNode.disabled || !g(o.parentNode, "optgroup")))].filter((o) => o.selected).map((o) => o.value ?? (o.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
class b {
  constructor(e) {
    /**
     * @private
     */
    i(this, "_initialValues");
    /**
     * @private
     */
    i(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    i(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    i(this, "_errorCount");
    /**
     * @private
     */
    i(this, "_isSubmitted", !1);
    this._errorCount = f(0), this._initialValues = e;
    for (const [t, s] of Object.entries(e)) {
      const n = [...Array.isArray(s) ? s : [s]];
      this._controls.set(t, {
        value: n[0],
        validators: n.length > 1 ? n[1] : [],
        isTouched: !1,
        errorMessage: ""
      });
    }
  }
  get hasErrors() {
    return !!this._errorCount();
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
    return {
      attrs: {
        name: e,
        value: this.getControl(e).value,
        onchange: (t) => {
          const s = v(t.target);
          this.getControl(e).value = s;
        },
        onblur: () => {
          this.getControl(e).isTouched = !0, this._checkValidity(e);
        }
      }
    };
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
    for (const [e, t] of Object.entries(this._initialValues)) {
      const s = [...Array.isArray(t) ? t : [t]], {
        validators: n
      } = this._controls.get(e);
      this._controls.set(e, {
        value: JSON.parse(JSON.stringify(s))[0],
        validators: n,
        isTouched: !1,
        errorMessage: ""
      });
    }
    this._isSubmitted = !1, this._errors.clear(), this._errorCount.set(0);
  }
  /**
   * @private
   */
  _checkValidity(e) {
    if (e)
      this._executeValidators(e);
    else {
      this._errors.clear();
      for (const [t] of this._controls)
        this._executeValidators(t);
    }
    this._errorCount.set(this._errors.size);
  }
  /**
   * @private
   */
  _executeValidators(e) {
    const {
      value: t,
      validators: s
    } = this._controls.get(e);
    let n = "";
    for (const o of s) {
      const a = l(o) ? o(t) : o.rule(t);
      if (a !== null) {
        this._errors.has(e) ? this._errors.set(e, {
          ...this._errors.get(e),
          ...a
        }) : this._errors.set(e, a), n = l(o) ? "error" : o.message;
        break;
      } else
        this._errors.delete(e);
    }
    this._controls.get(e).errorMessage = n;
  }
}
class y {
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
  b as FormBuilder,
  y as Validators
};
