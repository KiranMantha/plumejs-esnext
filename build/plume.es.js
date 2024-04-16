var ie = Object.defineProperty;
var oe = (s, e, t) => e in s ? ie(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var p = (s, e, t) => (oe(s, typeof e != "symbol" ? e + "" : e, t), t), F = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var _ = (s, e, t) => (F(s, e, "read from private field"), t ? t.call(s) : e.get(s)), L = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, O = (s, e, t, r) => (F(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var W = (s, e, t) => (F(s, e, "access private method"), t);
const ae = (s) => !!s && typeof s.subscribe == "function", Y = (s) => !!s && typeof s.then == "function", G = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ce = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), le = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), ue = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
}), B = () => Math.random().toString(36).substring(2);
class K {
  constructor() {
    /**
     * @private
     */
    p(this, "_callbackCollection", {});
  }
  /**
   * @private
   */
  unsubscribe(e) {
    delete this._callbackCollection[e];
  }
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    const t = B();
    return this._callbackCollection[t] = e, () => this.unsubscribe(t);
  }
  next(e) {
    for (const t in this._callbackCollection)
      this._callbackCollection[t](e);
  }
}
class z extends K {
  constructor(t) {
    super();
    p(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
    return super.next(this._initialValue), r;
  }
  next(t) {
    this._initialValue = t, super.next(t);
  }
}
class X {
  constructor() {
    p(this, "_subcribers", []);
  }
  /**
   * add subscribers to subscriptions
   * @param {Function} fn
   * @returns {void}
   */
  add(e) {
    this._subcribers.push(e);
  }
  /**
   * remove all added subcriptions
   * @returns {void}
   */
  unsubscribe() {
    for (const e of this._subcribers)
      e();
    this._subcribers = [];
  }
}
const Q = (s) => ae(s) ? s : Y(s) ? ue(Promise.resolve(s)) : le(s), $ = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), he = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (h) => {
    const m = h.querySelectorAll("script");
    for (const R of m)
      R.remove();
  }, r = (h, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(h) && (m.includes("javascript:") || m.includes("data:")) || h.startsWith("on"))
      return !0;
  }, a = (h) => {
    const m = h.attributes;
    for (const {
      name: R,
      value: T
    } of m)
      r(R, T) && h.removeAttribute(R);
  }, l = (h) => {
    const m = h.children;
    for (const R of m)
      a(R), l(R);
  }, c = e();
  return t(c), l(c), c.innerHTML;
}, de = (s, e) => {
  const t = G(e), r = () => ({
    get(a, l) {
      const c = Object.prototype.toString.call(a[l]);
      return ["[object Object]", "[object Array]"].indexOf(c) > -1 && !("__metadata__" in a[l]) ? new Proxy(a[l], r()) : a[l];
    },
    set(a, l, c) {
      return a[l] = c, s(), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((l, c) => {
        t[c] && t[c] !== "undefined" && (this[t[c]] = l);
      }), new Proxy(this, r());
    }
  };
}, Pe = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, fe = (s) => typeof s == "function", q = /* @__PURE__ */ Object.create(null);
let H = null;
function pe(s, e) {
  const t = H;
  let r;
  H = B(), q[H] = s;
  try {
    e();
  } finally {
    r = H, H = t;
  }
  return r;
}
function ge(s) {
  const e = q[H];
  let t = s;
  function r() {
    return t;
  }
  return r.set = function(a) {
    fe(a) ? t = a(t) : t = a, e();
  }, r;
}
function be(s, e) {
  const t = pe(s, e);
  return function() {
    delete q[t];
  };
}
var N, V;
const Z = new (V = class {
  constructor() {
    L(this, N, void 0);
    O(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!_(this, N).get(s))
      _(this, N).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = _(this, N).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    O(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), V)(), ee = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const c of e)
      c.prototype.__metadata__.name !== "RENDERER" ? r.push(Z.getService(c)) : r.push(t);
    const a = G(s), l = new s(...r);
    return e.forEach((c, h) => {
      l[a[h]] = r[h];
    }), l;
  } else
    return new s();
}, I = new class {
  constructor() {
    p(this, "globalStyles");
    p(this, "globalStyleTag");
    p(this, "style_registry");
    p(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(s = "") {
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], s) {
      const r = new CSSStyleSheet();
      r.replace(s), e.push(r);
    }
    return e;
  }
}(), {
  html: ke,
  render: me
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, a = "insertNode", l = /^insertNode([^ ]+)/;
  let c = [], h = [];
  const m = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const u = (d) => i[d] || d;
    return o = ((d) => d.replace(/[&<>\(\)]/g, u))(o), JSON.parse(o);
  }, R = (n, i) => {
    const o = n.options, u = Array.isArray(i) ? i : [i];
    let b, d, f = o.length;
    for (; f--; ) {
      d = o[f];
      const C = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = u.indexOf(C) > -1) && (b = !0);
    }
    b || (n.selectedIndex = -1);
  }, T = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, P = (n, i, o) => {
    const u = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const b = new CustomEvent("bindprops", {
            detail: {
              props: i
            },
            bubbles: !1
          });
          n.dispatchEvent(b);
        }
      });
    };
    n[o] = JSON.stringify(i), h.push(u);
  }, g = (n, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const u = o.attrs;
        for (const b in u)
          g(n, b, u[b]);
        break;
      }
      case /^on+/.test(i): {
        const u = i.slice(2).toLowerCase();
        n.removeEventListener(u, o), n.addEventListener(u, o);
        break;
      }
      case /ref/.test(i): {
        const u = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: n,
          fn: o
        });
        c.push(u);
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(i, m(o));
        break;
      }
      case /class/.test(i): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? R(n, o) : n.value = m(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? n.setAttribute(i, o) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, m(o));
    }
  }, y = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let u = o.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const b = Array.from(u.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: f
        } of b) {
          const C = r.exec(d)[1];
          g(u, f, i[C]), u.removeAttribute(d);
        }
      }
      u = o.nextNode();
    }
  }, S = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let u = o.nextNode(), b;
    for (; u; ) {
      if (b = l.exec(u.data)) {
        const d = Array.isArray(i[b[1]]) ? i[b[1]] : [i[b[1]]];
        u.replaceWith(...d), o.currentNode = n;
      }
      u = o.nextNode();
    }
  }, E = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = n.attributes, u = i.attributes, b = i.getAttribute("data-preserve-attributes"), d = b && b === "true";
    for (const {
      name: f,
      value: C
    } of o)
      (!u[f] || u[f] !== C) && i.setAttribute(f, C);
    if (!d)
      for (const {
        name: f
      } of u)
        o[f] || i.removeAttribute(f);
    if (i.tagName.toLowerCase() === "input" && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const f = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), C = Object.getOwnPropertySymbols(i).find((x) => x.description === "input"), v = f ? n[f] : "", k = C ? i[C] : "";
      v && k && v !== k && P(i, JSON.parse(v), C);
    }
  }, A = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, D = (n, i, o) => {
    const u = i ? Array.from(i.childNodes) : [], b = n ? Array.from(n.childNodes) : [];
    let d = u.length - b.length;
    if (d > 0)
      for (; d > 0; d--)
        u[u.length - d].parentNode.removeChild(u[u.length - d]);
    b.forEach(function(f, C) {
      const v = u[C];
      if (E(f, v), o && v && v.nodeType === 1 && v.tagName.indexOf("-") > -1)
        return;
      if (!v) {
        i && i.appendChild(f);
        return;
      }
      if (A(f) !== A(v)) {
        v.replaceWith(f);
        return;
      }
      const k = M(f);
      if (k && k !== M(v)) {
        v.textContent = k;
        return;
      }
      if (v.childNodes.length > 0 && f.childNodes.length < 1) {
        v.innerHTML = "";
        return;
      }
      if (v.childNodes.length < 1 && f.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        D(f, x, !1), v.appendChild(x);
        return;
      }
      if (f.childNodes.length > 0) {
        D(f, v, !0);
        return;
      }
    });
  };
  return {
    html: (n, ...i) => {
      let o = "";
      const {
        length: u
      } = n;
      for (let d = 1; d < u; d++) {
        const f = i[d - 1];
        let C = !1;
        if (o += n[d - 1], s.test(o) && e.test(o) && (o = o.replace(s, (v, k, x) => `${t}${d - 1}=${x || '"'}${k}${x ? "" : '"'}`), C = !0), !C)
          switch (!0) {
            case Array.isArray(f):
            case f instanceof DocumentFragment: {
              o += `<!--${a}${d - 1}-->`;
              break;
            }
            case (typeof f == "object" && f !== null): {
              "attrs" in f && (o += `${t}${d - 1}="attrs"`);
              break;
            }
            default:
              o += f || "";
          }
      }
      o += n[u - 1];
      const b = T(o.trim());
      return y(b, i), S(b, i), b;
    },
    render: (n, i) => {
      n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : D(i, n, !1), c.forEach((o) => {
        o();
      }), c = [], h.forEach((o) => {
        o();
      }), h = [];
    }
  };
})();
class te {
  constructor(e, t) {
    p(this, "_shadowRoot");
    p(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    p(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    p(this, "emitEvent");
    this._hostElement = e, this._shadowRoot = t;
  }
  get __metadata__() {
    return {
      name: "RENDERER"
    };
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
}
const _e = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, U = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, ye = async (s, e) => {
  var t, r, a, l, c, se, m, re, T;
  if (s = {
    ..._e,
    ...s
  }, Y(s.styles)) {
    const P = await s.styles;
    s.styles = P.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !I.isRootNodeSet)
    I.isRootNodeSet = !0, s.styles && (I.globalStyles.replace(s.styles), I.globalStyleTag = U(s.styles, document.head));
  else if (s.root && I.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      L(this, c);
      L(this, m);
      L(this, t, void 0);
      L(this, r, void 0);
      L(this, a, void 0);
      L(this, l, new X());
      p(this, "renderCount", 0);
      if (s.shadowDomEncapsulation && ce)
        O(this, r, this.attachShadow({
          mode: "open"
        })), _(this, r).adoptedStyleSheets = I.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const g = B();
        this.setAttribute("data-did", g);
        const y = s.styles.replaceAll(":host", `${s.selector}[data-did='${g}']`);
        !s.root && y && O(this, a, U(y, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), W(this, c, se).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const g = _(this, t).render();
      typeof g == "string" ? _(this, r).innerHTML = he(g) : me(_(this, r), g);
    }
    setProps(g) {
      var y, S;
      for (const [E, A] of Object.entries(g))
        e.observedProperties.find((M) => M === E) && (_(this, t)[E] = A);
      (S = (y = _(this, t)).onPropertiesChanged) == null || S.call(y);
    }
    getInstance() {
      return _(this, t);
    }
    setRenderIntoQueue() {
      ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
        this.update(), this.renderCount = 0;
      });
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var g, y, S, E;
      _(this, l).add($(this, "bindprops", (A) => {
        const M = A.detail.props;
        M && this.setProps(M);
      })), _(this, l).add($(this, "refresh_component", () => {
        this.update();
      })), (y = (g = _(this, t)).beforeMount) == null || y.call(g), this.update(), (E = (S = _(this, t)).mount) == null || E.call(S);
    }
    attributeChangedCallback(g, y, S) {
      var E, A;
      (A = (E = _(this, t)).onAttributesChanged) == null || A.call(E, g, y, S);
    }
    disconnectedCallback() {
      var g, y, S;
      this.renderCount = 0, (y = (g = _(this, t)).unmount) == null || y.call(g), (S = _(this, a)) == null || S.remove(), _(this, l).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), a = new WeakMap(), l = new WeakMap(), c = new WeakSet(), se = function() {
    const g = new te(this, _(this, r));
    g.update = () => {
      this.update();
    }, g.emitEvent = (y, S) => {
      W(this, m, re).call(this, y, S);
    }, _(this, l).add(be(this.setRenderIntoQueue, () => {
      O(this, t, ee(de(this.setRenderIntoQueue, e), s.deps, g));
    }));
  }, m = new WeakSet(), re = function(g, y) {
    const S = new CustomEvent(g, {
      detail: y
    });
    this.dispatchEvent(S);
  }, T));
}, ve = {
  deps: []
}, we = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || ye(s, e);
}, ne = (s = {}) => (e) => {
  if (s = {
    ...ve,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = ee(e, s.deps);
  Z.register(e, t);
};
function Se(s, e) {
  return s.nodeName && s.nodeName.toLowerCase() === e.toLowerCase();
}
const Ce = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", a = [...Array.from(s.options).filter((l) => !l.disabled && (!l.parentNode.disabled || !Se(l.parentNode, "optgroup")))].filter((l) => l.selected).map((l) => l.value ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? a[0] : a;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class Le {
  constructor(e) {
    /**
     * @private
     */
    p(this, "_initialValues");
    /**
     * @private
     */
    p(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    p(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    p(this, "_errorCount");
    /**
     * @private
     */
    p(this, "_isSubmitted", !1);
    this._errorCount = ge(0), this._initialValues = e;
    for (const [t, r] of Object.entries(e)) {
      const a = [...Array.isArray(r) ? r : [r]];
      this._controls.set(t, {
        value: a[0],
        validators: a.length > 1 ? a[1] : [],
        isTouched: !1
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
    for (const [t, r] of this._controls)
      e[t] = r.value;
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
   * @returns {value: string; validators: []; isTouched: boolean}
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
          const r = Ce(t.target);
          this.getControl(e).value = r;
        },
        onblur: () => {
          this.getControl(e).isTouched = !0, this._checkValidity(!0);
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
    e.preventDefault(), this._isSubmitted = !0, this._checkValidity(!1), t(this.value);
  }
  reset() {
    for (const [e, t] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(t) ? t : [t]];
      this._controls.get(e).value = JSON.parse(JSON.stringify(r))[0], this._controls.get(e).isTouched = !1;
    }
    this._isSubmitted = !1, this._errors.clear(), this._errorCount.set(0);
  }
  /**
   * @private
   */
  _checkValidity(e) {
    this._errors.clear();
    for (const [t, {
      value: r,
      validators: a,
      isTouched: l
    }] of this._controls)
      if (e && l || !e && this._isSubmitted)
        for (const c of a) {
          const h = c(r);
          h !== null && (this._errors.has(t) ? this._errors.set(t, {
            ...this._errors.get(t),
            ...h
          }) : this._errors.set(t, h));
        }
    this._errorCount.set(this._errors.size);
  }
}
class Ne {
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
const j = class {
  static checkParams(e, t) {
    let r = 0;
    const a = {}, l = t.paramCount;
    for (let c = 0; c < e.length; c++) {
      const h = t.params[c];
      h.indexOf(":") >= 0 && (a[h.split(":")[1]] = e[c].split("?")[0], r += 1);
    }
    return r === l ? a : {};
  }
  static getParamCount(e) {
    let t = 0;
    return e.forEach((r) => {
      r.indexOf(":") >= 0 && (t += 1);
    }), t;
  }
  static formatRoute(e) {
    const t = {
      params: {},
      url: "",
      template: "",
      paramCount: 0,
      isRegistered: !1,
      redirectTo: "",
      preload: e.preload,
      canActivate: () => !0
    };
    if (t.params = e.path.split("/").filter((r) => r.length > 0), t.url = e.path, t.template = "", t.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      t.template = e.template, t.templatePath = e.templatePath;
    }
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = j.getParamCount(t.params), j.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of j.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = j.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let w = j;
p(w, "routeList", []), p(w, "isHistoryBasedRouting", !0);
function Re(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class J {
  constructor() {
    p(this, "_currentRoute", new z({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    p(this, "_template", new z(""));
    p(this, "_navigationEndEvent", new K());
    p(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = w.isHistoryBasedRouting ? "popstate" : "hashchange";
    return w.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var a = t.pushState;
      t.pushState = function(...l) {
        a.apply(t, l), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), $(window, e, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute.asObservable();
  }
  navigateTo(e = "/", t) {
    let r = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : w.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = {}, a = e.split("/").filter((h) => h.length > 0), l = w.routeList.filter((h) => {
      if (h.params.length === a.length && Re(h.url, e))
        return h;
      if (h.url === e)
        return h;
    }), c = l.length > 0 ? l[0] : null;
    c && (r.path = e, r.state = {
      ...t || {}
    }, Q(c.canActivate()).subscribe((h) => {
      if (!h)
        return;
      const m = w.checkParams(a, c);
      if (Object.keys(m).length > 0 || e) {
        r.routeParams = new Map(Object.entries(m));
        let R = [];
        w.isHistoryBasedRouting ? R = new URLSearchParams(window.location.search).entries() : R = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(R);
        const T = (P) => {
          P.isRegistered = !0, this._currentRoute.next(r), this._template.next(P.template), this._navigationEndEvent.next();
        };
        c.isRegistered ? T(c) : c.templatePath ? Q(c.templatePath()).subscribe(() => {
          T(c);
        }) : c.redirectTo && this.navigateTo(c.redirectTo, t);
      } else
        this.navigateTo(c.redirectTo, t);
    }));
  }
}
ne()(J);
const Me = () => {
  class s {
    constructor(t, r) {
      p(this, "_template", "");
      p(this, "_subscriptions", new X());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t && (this._template = t);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    render() {
      return this._template;
    }
  }
  we({
    selector: "router-outlet",
    deps: [J, te]
  })(s);
};
class Ee {
  constructor(e) {
  }
  /**
   * @returns {{ path: string, routeParams: Map<string, string>, queryParams: Map<string, string>, state: Object }} CurrentRoute
   */
  getCurrentRoute() {
    return this.internalRouter.getCurrentRoute();
  }
  /**
   * navigates to predefined route
   * @param {string} path
   * @param {Object} state
   */
  navigateTo(e, t) {
    this.internalRouter.navigateTo(e, t);
  }
  /**
   * triggers on navigation end
   * @return {Observable<void>}
   */
  onNavigationEnd() {
    return this.internalRouter.onNavigationEnd();
  }
  /**
   * type that defines route structure
   * @typedef  Route
   */
  /**
   * register routes for routing
   * @param {{path: string, template: string, templatePath: () => Promise, redirectTo: string, canActivate: () => (boolean | Observable<boolean> | Promise<boolean>)}[]} routes
   * @param {boolean} preloadRoutes
   * @param {boolean} isHashBasedRouting
   */
  registerRoutes(e, t = !1, r = !1) {
    if (r && (w.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const a of e)
        w.formatRoute(a);
      t ? w.preloadRoutes() : w.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ne({
  deps: [J]
})(Ee);
export {
  z as BehaviourSubjectObs,
  we as Component,
  Le as FormBuilder,
  ne as Injectable,
  te as Renderer,
  Ee as Router,
  K as SubjectObs,
  X as Subscriptions,
  Ne as Validators,
  $ as fromEvent,
  ke as html,
  Pe as promisify,
  Me as registerRouterComponent,
  me as render,
  ge as signal,
  Q as wrapIntoObservable
};
