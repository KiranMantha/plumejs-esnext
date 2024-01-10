var rt = Object.defineProperty;
var nt = (s, t, e) => t in s ? rt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var m = (s, t, e) => (nt(s, typeof t != "symbol" ? t + "" : t, e), e), I = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var _ = (s, t, e) => (I(s, t, "read from private field"), e ? e.call(s) : t.get(s)), x = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, k = (s, t, e, r) => (I(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var D = (s, t, e) => (I(s, t, "access private method"), e);
const it = (s) => typeof s == "function", F = /* @__PURE__ */ Object.create(null);
let L = null;
const ot = ((s) => {
  function t() {
    return Math.random().toString(36).substring(2);
  }
  function e(i, o) {
    const h = L;
    let p;
    L = t(), F[L] = i;
    try {
      o();
    } finally {
      p = L, L = h;
    }
    return p;
  }
  function r(i) {
    const o = F[L];
    let h = i;
    function p() {
      return h;
    }
    return p.set = function(S) {
      it(S) ? h = S(h) : h = S, queueMicrotask(() => {
        o();
      });
    }, p;
  }
  function l(i, o) {
    const h = e(i, o);
    return function() {
      delete F[h];
    };
  }
  return s.augmentor = l, s.signal = r, s;
})({}), {
  augmentor: at,
  signal: xt
} = ot;
var P, z;
const Y = new (z = class {
  constructor() {
    x(this, P, void 0);
    k(this, P, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, t) {
    if (!_(this, P).get(s))
      _(this, P).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = _(this, P).get(s);
    if (t)
      return t;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, P, /* @__PURE__ */ new WeakMap());
  }
}, P = new WeakMap(), z)(), ct = (s) => !!s && typeof s.subscribe == "function", lt = (s) => !!s && typeof s.then == "function", G = (s) => {
  const t = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, ut = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ht = (s) => ({
  subscribe: (t) => {
    t(s);
  }
}), dt = (s) => ({
  subscribe: (t) => {
    Promise.resolve(s).then((e) => {
      t(e);
    });
  }
}), ft = () => Math.random().toString(36).substring(2);
class K {
  constructor() {
    /**
     * @private
     */
    m(this, "_callbackCollection", {});
  }
  /**
   * @private
   */
  unsubscribe(t) {
    delete this._callbackCollection[t];
  }
  asObservable() {
    return {
      subscribe: (t) => this.subscribe(t)
    };
  }
  subscribe(t) {
    const e = ft();
    return this._callbackCollection[e] = t, () => this.unsubscribe(e);
  }
  next(t) {
    for (const e in this._callbackCollection)
      this._callbackCollection[e](t);
  }
}
class B extends K {
  constructor(e) {
    super();
    m(this, "_initialValue");
    this._initialValue = e;
  }
  subscribe(e) {
    const r = super.subscribe(e);
    return super.next(this._initialValue), r;
  }
  next(e) {
    this._initialValue = e, super.next(e);
  }
}
class Q {
  constructor() {
    m(this, "_subcribers", []);
  }
  /**
   * add subscribers to subscriptions
   * @param {Function} fn
   * @returns {void}
   */
  add(t) {
    this._subcribers.push(t);
  }
  /**
   * remove all added subcriptions
   * @returns {void}
   */
  unsubscribe() {
    for (const t of this._subcribers)
      t();
    this._subcribers = [];
  }
}
const $ = (s) => ct(s) ? s : lt(s) ? dt(Promise.resolve(s)) : ht(s), W = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), pt = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (h) => {
    const p = h.querySelectorAll("script");
    for (const S of p)
      S.remove();
  }, r = (h, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(h) && (p.includes("javascript:") || p.includes("data:")) || h.startsWith("on"))
      return !0;
  }, l = (h) => {
    const p = h.attributes;
    for (const {
      name: S,
      value: T
    } of p)
      r(S, T) && h.removeAttribute(S);
  }, i = (h) => {
    const p = h.children;
    for (const S of p)
      l(S), i(S);
  }, o = t();
  return e(o), i(o), o.innerHTML;
}, gt = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, bt = (s, t) => {
  const e = G(t), r = () => ({
    get(l, i) {
      const o = Object.prototype.toString.call(l[i]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in l[i]) ? new Proxy(l[i], r()) : l[i];
    },
    set(l, i, o) {
      return l[i] = o, ++s.renderCount, gt(s), !0;
    }
  });
  return class extends t {
    constructor(...l) {
      return super(...l), l.forEach((i, o) => {
        e[o] && e[o] !== "undefined" && (this[e[o]] = i);
      }), new Proxy(this, r());
    }
  };
}, Pt = () => {
  let s;
  return [new Promise((e) => {
    s = e;
  }), s];
}, X = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const o of t)
      o.prototype.__metadata__.name !== "RENDERER" ? r.push(Y.getService(o)) : r.push(e);
    const l = G(s), i = new s(...r);
    return t.forEach((o, h) => {
      i[l[h]] = r[h];
    }), i;
  } else
    return new s();
}, M = new class {
  constructor() {
    m(this, "globalStyles");
    m(this, "globalStyleTag");
    m(this, "style_registry");
    m(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(s = "") {
    let t = [];
    const e = new CSSStyleSheet();
    if (e.insertRule(":host { display: block; }"), t = [this.globalStyles, e], s) {
      const r = new CSSStyleSheet();
      r.replace(s), t.push(r);
    }
    return t;
  }
}(), {
  html: J,
  render: mt
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, l = "insertNode", i = /^insertNode([^ ]+)/;
  let o = [], h = [];
  const p = (c) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let d = JSON.stringify(c);
    const u = (f) => n[f] || f;
    return d = ((f) => f.replace(/[&<>\(\)]/g, u))(d), JSON.parse(d);
  }, S = (c, n) => {
    const d = c.options, u = Array.isArray(n) ? n : [n];
    let w, f, a = d.length;
    for (; a--; ) {
      f = d[a];
      const g = f.getAttribute("value") ?? (f.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (f.selected = u.indexOf(g) > -1) && (w = !0);
    }
    w || (c.selectedIndex = -1);
  }, T = (c) => {
    const n = document.createElement("template");
    return n.innerHTML = c, n.content;
  }, O = (c, n, d) => {
    const u = () => {
      setTimeout(() => {
        if (c.isConnected) {
          const w = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          c.dispatchEvent(w);
        }
      });
    };
    c[d] = JSON.stringify(n), h.push(u);
  }, y = (c, n) => {
    const d = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let u = d.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const w = Array.from(u.attributes).filter((f) => r.test(f.nodeName));
        for (const {
          nodeName: f,
          nodeValue: a
        } of w) {
          const g = r.exec(f)[1];
          switch (!0) {
            case /^on+/.test(a): {
              const b = a.slice(2).toLowerCase();
              u.removeEventListener(b, n[g]), u.addEventListener(b, n[g]);
              break;
            }
            case /ref/.test(a): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: u,
                fn: n[g]
              });
              o.push(b);
              break;
            }
            case /^data-+/.test(a):
            case /^aria-+/.test(a): {
              a === "data-input" ? O(u, n[g], Symbol("input")) : u.setAttribute(a, p(n[g]));
              break;
            }
            case /class/.test(a): {
              n[g] ? u.classList.add(...n[g].split(" ")) : u.setAttribute("class", "");
              break;
            }
            case /value/.test(a): {
              u.nodeName.toLowerCase() === "select" ? S(u, n[g]) : u.value = p(n[g]);
              break;
            }
            case /disabled/.test(a):
            case /checked/.test(a): {
              n[g] ? u.setAttribute(a, n[g]) : u.removeAttribute(a);
              break;
            }
            default:
              u.setAttribute(a, p(n[g]));
          }
          u.removeAttribute(f);
        }
      }
      u = d.nextNode();
    }
  }, R = (c, n) => {
    const d = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let u = d.nextNode(), w;
    for (; u; ) {
      if (w = i.exec(u.data)) {
        const f = Array.isArray(n[w[1]]) ? n[w[1]] : [n[w[1]]];
        u.replaceWith(...f), d.currentNode = c;
      }
      u = d.nextNode();
    }
  }, v = (c, n) => {
    if (!c || !n || c.nodeType !== 1 || n.nodeType !== 1)
      return;
    const d = c.attributes, u = n.attributes, w = n.getAttribute("data-preserve-attributes"), f = w && w === "true";
    for (const {
      name: a,
      value: g
    } of d)
      (!u[a] || u[a] !== g) && n.setAttribute(a, g);
    if (!f)
      for (const {
        name: a
      } of u)
        d[a] || n.removeAttribute(a);
    if (n.tagName.toLowerCase() === "input" && (n.value = c.value), n.tagName.indexOf("-") > -1 && c.tagName.indexOf("-") > -1) {
      const a = Object.getOwnPropertySymbols(c), g = Object.getOwnPropertySymbols(n), b = a.length ? c[a[0]] : "", A = g.length ? n[g[0]] : "";
      b && A && b !== A && O(n, JSON.parse(b), g[0]);
    }
  }, E = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), N = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, j = (c, n, d) => {
    const u = n ? Array.from(n.childNodes) : [], w = c ? Array.from(c.childNodes) : [];
    let f = u.length - w.length;
    if (f > 0)
      for (; f > 0; f--)
        u[u.length - f].parentNode.removeChild(u[u.length - f]);
    w.forEach(function(a, g) {
      const b = u[g];
      if (v(a, b), d && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        n && n.appendChild(a);
        return;
      }
      if (E(a) !== E(b)) {
        b.replaceWith(a);
        return;
      }
      const A = N(a);
      if (A && A !== N(b)) {
        b.textContent = A;
        return;
      }
      if (b.childNodes.length > 0 && a.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && a.childNodes.length > 0) {
        const V = document.createDocumentFragment();
        j(a, V, !1), b.appendChild(V);
        return;
      }
      if (a.childNodes.length > 0) {
        j(a, b, !0);
        return;
      }
    });
  };
  return {
    html: (c, ...n) => {
      let d = "";
      const {
        length: u
      } = c;
      for (let f = 1; f < u; f++) {
        const a = n[f - 1];
        let g = !1;
        if (d += c[f - 1], s.test(d) && t.test(d) && (d = d.replace(s, (b, A, V) => `${e}${f - 1}=${V || '"'}${A}${V ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(a):
            case a instanceof DocumentFragment: {
              d += `<!--${l}${f - 1}-->`;
              break;
            }
            case (typeof a == "object" && a !== null): {
              "html" in a && (d += a.html);
              break;
            }
            default:
              d += a || "";
          }
      }
      d += c[u - 1];
      const w = T(d.trim());
      return y(w, n), R(w, n), w;
    },
    render: (c, n) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(n)) : j(n, c, !1), o.forEach((d) => {
        d();
      }), o = [], h.forEach((d) => {
        d();
      }), h = [];
    }
  };
})();
class Z {
  constructor(t, e) {
    m(this, "_shadowRoot");
    m(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    m(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    m(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = e;
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
const _t = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, U = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, yt = (s, t) => {
  var e, r, l, i, o, tt, p, et, T;
  if (s = {
    ..._t,
    ...s
  }, s.styles = s.styles.toString(), s.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, s.styles && (M.globalStyles.replace(s.styles), M.globalStyleTag = U(s.styles, document.head));
  else if (s.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      x(this, o);
      x(this, p);
      x(this, e, void 0);
      x(this, r, void 0);
      x(this, l, void 0);
      m(this, "renderCount", 0);
      x(this, i, new Q());
      if (ut)
        k(this, r, this.attachShadow({
          mode: "open"
        })), _(this, r).adoptedStyleSheets = M.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const y = s.styles.replaceAll(":host", s.selector);
        k(this, l, U(y, document.head));
      }
      D(this, o, tt).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const y = _(this, e).render();
      typeof y == "string" ? _(this, r).innerHTML = pt(y) : mt(_(this, r), y);
    }
    setProps(y) {
      var R, v;
      for (const [E, N] of Object.entries(y))
        t.observedProperties.find((j) => j === E) && (_(this, e)[E] = N);
      (v = (R = _(this, e)).onPropertiesChanged) == null || v.call(R);
    }
    getInstance() {
      return _(this, e);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var y, R;
      _(this, i).add(W(this, "bindprops", (v) => {
        const E = v.detail.props;
        E && this.setProps(E);
      })), _(this, i).add(W(this, "refresh_component", () => {
        var v, E;
        (E = (v = _(this, e)).mount) == null || E.call(v);
      })), _(this, e).beforeMount && _(this, i).add(at(this.update, _(this, e).beforeMount.bind(_(this, e)))), this.update(), (R = (y = _(this, e)).mount) == null || R.call(y);
    }
    attributeChangedCallback(y, R, v) {
      var E, N;
      (N = (E = _(this, e)).onAttributesChanged) == null || N.call(E, y, R, v);
    }
    disconnectedCallback() {
      var y, R, v;
      this.renderCount = 1, (R = (y = _(this, e)).unmount) == null || R.call(y), (v = _(this, l)) == null || v.remove(), _(this, i).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), l = new WeakMap(), i = new WeakMap(), o = new WeakSet(), tt = function() {
    const y = new Z(this, _(this, r));
    y.update = () => {
      this.update();
    }, y.emitEvent = (R, v) => {
      D(this, p, et).call(this, R, v);
    }, k(this, e, X(bt(this, t), s.deps, y));
  }, p = new WeakSet(), et = function(y, R) {
    const v = new CustomEvent(y, {
      detail: R
    });
    this.dispatchEvent(v);
  }, T));
}, wt = {
  deps: []
}, vt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || yt(s, t);
}, st = (s = {}) => (t) => {
  if (s = {
    ...wt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = X(t, s.deps);
  Y.register(t, e);
}, St = (s) => {
  let t;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? t = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : t = s.value;
      break;
    }
    case "select": {
      const e = s.type === "select-one", l = [...Array.from(s.options)].filter((i) => i.selected).map((i) => i.value ?? (i.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      t = e ? l[0] : l;
      break;
    }
    default: {
      t = s.value;
      break;
    }
  }
  return t;
};
class Nt {
  constructor(t) {
    /**
     * @private
     */
    m(this, "_initialValues");
    /**
     * @private
     */
    m(this, "_controls", /* @__PURE__ */ Object.create(null));
    /**
     * @private
     */
    m(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = t;
    for (const [e, r] of Object.entries(t)) {
      const l = [...Array.isArray(r) ? r : [r]];
      this._controls[e] = {
        value: l[0],
        validators: l.length > 1 ? l[1] : []
      };
    }
    this.changeHandler = this.changeHandler.bind(this), this.getControl = this.getControl.bind(this), this.reset = this.reset.bind(this);
  }
  /**
   * @type Map
   */
  get errors() {
    return this._checkValidity(), this._errors;
  }
  /**
   * @type boolean
   */
  get valid() {
    return this._checkValidity(), !this._errors.size;
  }
  /**
   * @type Object
   */
  get value() {
    const t = {};
    for (const [e, r] of Object.entries(this._controls))
      t[e] = r.value;
    return t;
  }
  getControl(t) {
    return this._controls[t];
  }
  changeHandler(t) {
    return (e) => {
      const r = St(e.target);
      this.getControl(t).value = r, this._isTouched = !0;
    };
  }
  reset() {
    for (const [t, e] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(e) ? e : [e]];
      this._controls[t].value = JSON.parse(JSON.stringify(r))[0];
    }
    this._errors.clear(), this._isTouched = !1;
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear(), this._isTouched = !0;
    for (const t in this._controls) {
      const e = this._controls[t].value, r = this._controls[t].validators;
      this._controls[t].errors = null;
      for (const l of r) {
        const i = l(e);
        i !== null && (this._errors.has(t) ? (this._errors.set(t, {
          ...this._errors.get(t),
          ...i
        }), this._controls[t].errors = {
          ...this._controls[t].errors,
          ...i
        }) : (this._errors.set(t, i), this._controls[t].errors = i));
      }
    }
  }
}
class kt {
  static required(t) {
    return t.length ? null : {
      required: !0
    };
  }
  static min(t) {
    return (e) => e.length >= t ? null : {
      minLength: {
        requiredLength: t
      }
    };
  }
  static max(t) {
    return (e) => e.length <= t ? null : {
      maxLength: {
        requiredLength: t
      }
    };
  }
  static pattern(t) {
    return (e) => new RegExp(t).test(e) ? null : {
      pattern: !0
    };
  }
}
const H = class {
  static checkParams(t, e) {
    let r = 0;
    const l = {}, i = e.paramCount;
    for (let o = 0; o < t.length; o++) {
      const h = e.params[o];
      h.indexOf(":") >= 0 && (l[h.split(":")[1]] = t[o].split("?")[0], r += 1);
    }
    return r === i ? l : {};
  }
  static getParamCount(t) {
    let e = 0;
    return t.forEach((r) => {
      r.indexOf(":") >= 0 && (e += 1);
    }), e;
  }
  static formatRoute(t) {
    const e = {
      params: {},
      url: "",
      template: "",
      paramCount: 0,
      isRegistered: !1,
      redirectTo: "",
      preload: t.preload,
      canActivate: () => !0
    };
    if (e.params = t.path.split("/").filter((r) => r.length > 0), e.url = t.path, e.template = "", e.redirectTo = t.redirectTo, t.template) {
      if (!t.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      e.template = t.template, e.templatePath = t.templatePath;
    }
    t.canActivate && (e.canActivate = t.canActivate), e.paramCount = H.getParamCount(e.params), H.routeList.push(e);
  }
  static preloadRoutes() {
    for (const t of H.routeList)
      t.templatePath && t.templatePath();
  }
  static preloadSelectedRoutes() {
    const t = H.routeList.filter((e) => e.preload === !0);
    for (const e of t)
      e.templatePath && e.templatePath();
  }
};
let C = H;
m(C, "routeList", []), m(C, "isHistoryBasedRouting", !0);
function Ct(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class q {
  constructor() {
    m(this, "_currentRoute", new B({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    m(this, "_template", new B(""));
    m(this, "_navigationEndEvent", new K());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = C.isHistoryBasedRouting ? "popstate" : "hashchange";
    return C.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var l = e.pushState;
      e.pushState = function(...i) {
        l.apply(e, i), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), W(window, t, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute.asObservable();
  }
  navigateTo(t = "/", e) {
    let r = C.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), r === t ? this._navigateTo(t, e) : C.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = C.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const r = {}, l = t.split("/").filter((h) => h.length > 0), i = C.routeList.filter((h) => {
      if (h.params.length === l.length && Ct(h.url, t))
        return h;
      if (h.url === t)
        return h;
    }), o = i.length > 0 ? i[0] : null;
    o && (r.path = t, r.state = {
      ...e || {}
    }, $(o.canActivate()).subscribe((h) => {
      if (!h)
        return;
      const p = C.checkParams(l, o);
      if (Object.keys(p).length > 0 || t) {
        r.routeParams = new Map(Object.entries(p));
        let S = [];
        C.isHistoryBasedRouting ? S = new URLSearchParams(window.location.search).entries() : S = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(S);
        const T = (O) => {
          O.isRegistered = !0, this._currentRoute.next(r), this._template.next(O.template), this._navigationEndEvent.next();
        };
        o.isRegistered ? T(o) : o.templatePath ? $(o.templatePath()).subscribe(() => {
          T(o);
        }) : o.redirectTo && this.navigateTo(o.redirectTo, e);
      } else
        this.navigateTo(o.redirectTo, e);
    }));
  }
}
st()(q);
const Ot = () => {
  class s {
    constructor(e, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new Q());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((e) => {
        this._template !== e && (this._template = e);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const e = C.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(e || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    render() {
      if (this._template) {
        const e = [`${this._template}`];
        return e.raw = [`${this._template}`], J(e);
      } else
        return J``;
    }
  }
  vt({
    selector: "router-outlet",
    deps: [q, Z]
  })(s);
};
class Rt {
  constructor(t) {
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
  navigateTo(t, e) {
    this.internalRouter.navigateTo(t, e);
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
  registerRoutes(t, e = !1, r = !1) {
    if (r && (C.isHistoryBasedRouting = !r), Array.isArray(t)) {
      for (const l of t)
        C.formatRoute(l);
      e ? C.preloadRoutes() : C.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
st({
  deps: [q]
})(Rt);
export {
  B as BehaviourSubjectObs,
  vt as Component,
  Nt as FormBuilder,
  st as Injectable,
  Z as Renderer,
  Rt as Router,
  K as SubjectObs,
  Q as Subscriptions,
  kt as Validators,
  W as fromEvent,
  J as html,
  Pt as promisify,
  Ot as registerRouterComponent,
  mt as render,
  xt as signal,
  $ as wrapIntoObservable
};
