var rt = Object.defineProperty;
var nt = (s, t, e) => t in s ? rt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var g = (s, t, e) => (nt(s, typeof t != "symbol" ? t + "" : t, e), e), I = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var m = (s, t, e) => (I(s, t, "read from private field"), e ? e.call(s) : t.get(s)), x = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, k = (s, t, e, r) => (I(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var D = (s, t, e) => (I(s, t, "access private method"), e);
const it = (s) => typeof s == "function", W = /* @__PURE__ */ Object.create(null);
let M = null;
function ot() {
  return Math.random().toString(36).substring(2);
}
function at(s, t) {
  const e = M;
  let r;
  M = ot(), W[M] = s;
  try {
    t();
  } finally {
    r = M, M = e;
  }
  return r;
}
function Pt(s) {
  const t = W[M];
  let e = s;
  function r() {
    return e;
  }
  return r.set = function(o) {
    it(o) ? e = o(e) : e = o, queueMicrotask(() => {
      t();
    });
  }, r;
}
function ct(s, t) {
  const e = at(s, t);
  return function() {
    delete W[e];
  };
}
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
    if (!m(this, P).get(s))
      m(this, P).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = m(this, P).get(s);
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
}, P = new WeakMap(), z)(), lt = (s) => !!s && typeof s.subscribe == "function", ut = (s) => !!s && typeof s.then == "function", G = (s) => {
  const t = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, ht = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), dt = (s) => ({
  subscribe: (t) => {
    t(s);
  }
}), ft = (s) => ({
  subscribe: (t) => {
    Promise.resolve(s).then((e) => {
      t(e);
    });
  }
}), pt = () => Math.random().toString(36).substring(2);
class K {
  constructor() {
    /**
     * @private
     */
    g(this, "_callbackCollection", {});
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
    const e = pt();
    return this._callbackCollection[e] = t, () => this.unsubscribe(e);
  }
  next(t) {
    for (const e in this._callbackCollection)
      this._callbackCollection[e](t);
  }
}
class q extends K {
  constructor(e) {
    super();
    g(this, "_initialValue");
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
    g(this, "_subcribers", []);
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
const B = (s) => lt(s) ? s : ut(s) ? ft(Promise.resolve(s)) : dt(s), F = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), bt = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (f) => {
    const _ = f.querySelectorAll("script");
    for (const E of _)
      E.remove();
  }, r = (f, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (_.includes("javascript:") || _.includes("data:")) || f.startsWith("on"))
      return !0;
  }, o = (f) => {
    const _ = f.attributes;
    for (const {
      name: E,
      value: T
    } of _)
      r(E, T) && f.removeAttribute(E);
  }, l = (f) => {
    const _ = f.children;
    for (const E of _)
      o(E), l(E);
  }, u = t();
  return e(u), l(u), u.innerHTML;
}, gt = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, mt = (s, t) => {
  const e = G(t), r = () => ({
    get(o, l) {
      const u = Object.prototype.toString.call(o[l]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in o[l]) ? new Proxy(o[l], r()) : o[l];
    },
    set(o, l, u) {
      return o[l] = u, ++s.renderCount, gt(s), !0;
    }
  });
  return class extends t {
    constructor(...o) {
      return super(...o), o.forEach((l, u) => {
        e[u] && e[u] !== "undefined" && (this[e[u]] = l);
      }), new Proxy(this, r());
    }
  };
}, Nt = () => {
  let s;
  return [new Promise((e) => {
    s = e;
  }), s];
}, X = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const u of t)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(Y.getService(u)) : r.push(e);
    const o = G(s), l = new s(...r);
    return t.forEach((u, f) => {
      l[o[f]] = r[f];
    }), l;
  } else
    return new s();
}, L = new class {
  constructor() {
    g(this, "globalStyles");
    g(this, "globalStyleTag");
    g(this, "style_registry");
    g(this, "isRootNodeSet");
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
  render: _t
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, o = "insertNode", l = /^insertNode([^ ]+)/;
  let u = [], f = [];
  const _ = (a) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(a);
    const c = (d) => n[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, E = (a, n) => {
    const h = a.options, c = Array.isArray(n) ? n : [n];
    let w, d, i = h.length;
    for (; i--; ) {
      d = h[i];
      const p = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(p) > -1) && (w = !0);
    }
    w || (a.selectedIndex = -1);
  }, T = (a) => {
    const n = document.createElement("template");
    return n.innerHTML = a, n.content;
  }, O = (a, n, h) => {
    const c = () => {
      setTimeout(() => {
        if (a.isConnected) {
          const w = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          a.dispatchEvent(w);
        }
      });
    };
    a[h] = JSON.stringify(n), f.push(c);
  }, y = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const w = Array.from(c.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of w) {
          const p = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const b = i.slice(2).toLowerCase();
              c.removeEventListener(b, n[p]), c.addEventListener(b, n[p]);
              break;
            }
            case /ref/.test(i): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: c,
                fn: n[p]
              });
              u.push(b);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? O(c, n[p], Symbol("input")) : c.setAttribute(i, _(n[p]));
              break;
            }
            case /class/.test(i): {
              n[p] ? c.classList.add(...n[p].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(i): {
              c.nodeName.toLowerCase() === "select" ? E(c, n[p]) : c.value = _(n[p]);
              break;
            }
            case /disabled/.test(i):
            case /checked/.test(i): {
              n[p] ? c.setAttribute(i, n[p]) : c.removeAttribute(i);
              break;
            }
            default:
              c.setAttribute(i, _(n[p]));
          }
          c.removeAttribute(d);
        }
      }
      c = h.nextNode();
    }
  }, C = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), w;
    for (; c; ) {
      if (w = l.exec(c.data)) {
        const d = Array.isArray(n[w[1]]) ? n[w[1]] : [n[w[1]]];
        c.replaceWith(...d), h.currentNode = a;
      }
      c = h.nextNode();
    }
  }, v = (a, n) => {
    if (!a || !n || a.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = a.attributes, c = n.attributes, w = n.getAttribute("data-preserve-attributes"), d = w && w === "true";
    for (const {
      name: i,
      value: p
    } of h)
      (!c[i] || c[i] !== p) && n.setAttribute(i, p);
    if (!d)
      for (const {
        name: i
      } of c)
        h[i] || n.removeAttribute(i);
    if (n.tagName.toLowerCase() === "input" && (n.value = a.value), n.tagName.indexOf("-") > -1 && a.tagName.indexOf("-") > -1) {
      const i = Object.getOwnPropertySymbols(a), p = Object.getOwnPropertySymbols(n), b = i.length ? a[i[0]] : "", A = p.length ? n[p[0]] : "";
      b && A && b !== A && O(n, JSON.parse(b), p[0]);
    }
  }, R = (a) => a.nodeType === 3 ? "text" : a.nodeType === 8 ? "comment" : a.tagName.toLowerCase(), N = (a) => a.childNodes && a.childNodes.length > 0 ? null : a.textContent, j = (a, n, h) => {
    const c = n ? Array.from(n.childNodes) : [], w = a ? Array.from(a.childNodes) : [];
    let d = c.length - w.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    w.forEach(function(i, p) {
      const b = c[p];
      if (v(i, b), h && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        n && n.appendChild(i);
        return;
      }
      if (R(i) !== R(b)) {
        b.replaceWith(i);
        return;
      }
      const A = N(i);
      if (A && A !== N(b)) {
        b.textContent = A;
        return;
      }
      if (b.childNodes.length > 0 && i.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && i.childNodes.length > 0) {
        const V = document.createDocumentFragment();
        j(i, V, !1), b.appendChild(V);
        return;
      }
      if (i.childNodes.length > 0) {
        j(i, b, !0);
        return;
      }
    });
  };
  return {
    html: (a, ...n) => {
      let h = "";
      const {
        length: c
      } = a;
      for (let d = 1; d < c; d++) {
        const i = n[d - 1];
        let p = !1;
        if (h += a[d - 1], s.test(h) && t.test(h) && (h = h.replace(s, (b, A, V) => `${e}${d - 1}=${V || '"'}${A}${V ? "" : '"'}`), p = !0), !p)
          switch (!0) {
            case Array.isArray(i):
            case i instanceof DocumentFragment: {
              h += `<!--${o}${d - 1}-->`;
              break;
            }
            case (typeof i == "object" && i !== null): {
              "html" in i && (h += i.html);
              break;
            }
            default:
              h += i || "";
          }
      }
      h += a[c - 1];
      const w = T(h.trim());
      return y(w, n), C(w, n), w;
    },
    render: (a, n) => {
      a && !a.children.length ? (a.innerHTML = "", a.appendChild(n)) : j(n, a, !1), u.forEach((h) => {
        h();
      }), u = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class Z {
  constructor(t, e) {
    g(this, "_shadowRoot");
    g(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    g(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    g(this, "emitEvent");
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
const yt = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, U = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, wt = (s, t) => {
  var e, r, o, l, u, tt, _, et, T;
  if (s = {
    ...yt,
    ...s
  }, s.styles = s.styles.toString(), s.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, s.styles && (L.globalStyles.replace(s.styles), L.globalStyleTag = U(s.styles, document.head));
  else if (s.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      x(this, u);
      x(this, _);
      x(this, e, void 0);
      x(this, r, void 0);
      x(this, o, void 0);
      g(this, "renderCount", 0);
      x(this, l, new Q());
      if (ht)
        k(this, r, this.attachShadow({
          mode: "open"
        })), m(this, r).adoptedStyleSheets = L.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const y = s.styles.replaceAll(":host", s.selector);
        k(this, o, U(y, document.head));
      }
      D(this, u, tt).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const y = m(this, e).render();
      typeof y == "string" ? m(this, r).innerHTML = bt(y) : _t(m(this, r), y);
    }
    setProps(y) {
      var C, v;
      for (const [R, N] of Object.entries(y))
        t.observedProperties.find((j) => j === R) && (m(this, e)[R] = N);
      (v = (C = m(this, e)).onPropertiesChanged) == null || v.call(C);
    }
    getInstance() {
      return m(this, e);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var y, C;
      m(this, l).add(F(this, "bindprops", (v) => {
        const R = v.detail.props;
        R && this.setProps(R);
      })), m(this, l).add(F(this, "refresh_component", () => {
        var v, R;
        (R = (v = m(this, e)).mount) == null || R.call(v);
      })), m(this, e).beforeMount && m(this, l).add(ct(this.update, m(this, e).beforeMount.bind(m(this, e)))), this.update(), (C = (y = m(this, e)).mount) == null || C.call(y);
    }
    attributeChangedCallback(y, C, v) {
      var R, N;
      (N = (R = m(this, e)).onAttributesChanged) == null || N.call(R, y, C, v);
    }
    disconnectedCallback() {
      var y, C, v;
      this.renderCount = 1, (C = (y = m(this, e)).unmount) == null || C.call(y), (v = m(this, o)) == null || v.remove(), m(this, l).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), o = new WeakMap(), l = new WeakMap(), u = new WeakSet(), tt = function() {
    const y = new Z(this, m(this, r));
    y.update = () => {
      this.update();
    }, y.emitEvent = (C, v) => {
      D(this, _, et).call(this, C, v);
    }, k(this, e, X(mt(this, t), s.deps, y));
  }, _ = new WeakSet(), et = function(y, C) {
    const v = new CustomEvent(y, {
      detail: C
    });
    this.dispatchEvent(v);
  }, T));
}, vt = {
  deps: []
}, St = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || wt(s, t);
}, st = (s = {}) => (t) => {
  if (s = {
    ...vt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = X(t, s.deps);
  Y.register(t, e);
}, Ct = (s) => {
  let t;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? t = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : t = s.value;
      break;
    }
    case "select": {
      const e = s.type === "select-one", o = [...Array.from(s.options)].filter((l) => l.selected).map((l) => l.value ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      t = e ? o[0] : o;
      break;
    }
    default: {
      t = s.value;
      break;
    }
  }
  return t;
};
class kt {
  constructor(t) {
    /**
     * @private
     */
    g(this, "_initialValues");
    /**
     * @private
     */
    g(this, "_controls", /* @__PURE__ */ Object.create(null));
    /**
     * @private
     */
    g(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = t;
    for (const [e, r] of Object.entries(t)) {
      const o = [...Array.isArray(r) ? r : [r]];
      this._controls[e] = {
        value: o[0],
        validators: o.length > 1 ? o[1] : []
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
      const r = Ct(e.target);
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
      for (const o of r) {
        const l = o(e);
        l !== null && (this._errors.has(t) ? (this._errors.set(t, {
          ...this._errors.get(t),
          ...l
        }), this._controls[t].errors = {
          ...this._controls[t].errors,
          ...l
        }) : (this._errors.set(t, l), this._controls[t].errors = l));
      }
    }
  }
}
class Ot {
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
    const o = {}, l = e.paramCount;
    for (let u = 0; u < t.length; u++) {
      const f = e.params[u];
      f.indexOf(":") >= 0 && (o[f.split(":")[1]] = t[u].split("?")[0], r += 1);
    }
    return r === l ? o : {};
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
let S = H;
g(S, "routeList", []), g(S, "isHistoryBasedRouting", !0);
function Rt(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class $ {
  constructor() {
    g(this, "_currentRoute", new q({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    g(this, "_template", new q(""));
    g(this, "_navigationEndEvent", new K());
    g(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var o = e.pushState;
      e.pushState = function(...l) {
        o.apply(e, l), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), F(window, t, () => {
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
    let r = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), r === t ? this._navigateTo(t, e) : S.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const r = {}, o = t.split("/").filter((f) => f.length > 0), l = S.routeList.filter((f) => {
      if (f.params.length === o.length && Rt(f.url, t))
        return f;
      if (f.url === t)
        return f;
    }), u = l.length > 0 ? l[0] : null;
    u && (r.path = t, r.state = {
      ...e || {}
    }, B(u.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const _ = S.checkParams(o, u);
      if (Object.keys(_).length > 0 || t) {
        r.routeParams = new Map(Object.entries(_));
        let E = [];
        S.isHistoryBasedRouting ? E = new URLSearchParams(window.location.search).entries() : E = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(E);
        const T = (O) => {
          O.isRegistered = !0, this._currentRoute.next(r), this._template.next(O.template), this._navigationEndEvent.next();
        };
        u.isRegistered ? T(u) : u.templatePath ? B(u.templatePath()).subscribe(() => {
          T(u);
        }) : u.redirectTo && this.navigateTo(u.redirectTo, e);
      } else
        this.navigateTo(u.redirectTo, e);
    }));
  }
}
st()($);
const Lt = () => {
  class s {
    constructor(e, r) {
      g(this, "_template", "");
      g(this, "_subscriptions", new Q());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((e) => {
        this._template !== e && (this._template = e);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const e = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
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
  St({
    selector: "router-outlet",
    deps: [$, Z]
  })(s);
};
class Et {
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
    if (r && (S.isHistoryBasedRouting = !r), Array.isArray(t)) {
      for (const o of t)
        S.formatRoute(o);
      e ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
st({
  deps: [$]
})(Et);
export {
  q as BehaviourSubjectObs,
  St as Component,
  kt as FormBuilder,
  st as Injectable,
  Z as Renderer,
  Et as Router,
  K as SubjectObs,
  Q as Subscriptions,
  Ot as Validators,
  F as fromEvent,
  J as html,
  Nt as promisify,
  Lt as registerRouterComponent,
  _t as render,
  Pt as signal,
  B as wrapIntoObservable
};
