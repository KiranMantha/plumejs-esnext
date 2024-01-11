var st = Object.defineProperty;
var nt = (r, t, e) => t in r ? st(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var g = (r, t, e) => (nt(r, typeof t != "symbol" ? t + "" : t, e), e), I = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var m = (r, t, e) => (I(r, t, "read from private field"), e ? e.call(r) : t.get(r)), x = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
}, k = (r, t, e, s) => (I(r, t, "write to private field"), s ? s.call(r, e) : t.set(r, e), e);
var D = (r, t, e) => (I(r, t, "access private method"), e);
const it = (r) => typeof r == "function", W = /* @__PURE__ */ Object.create(null);
let L = null;
function ot() {
  return Math.random().toString(36).substring(2);
}
function at(r, t) {
  const e = L;
  let s;
  L = ot(), W[L] = {
    updateFn: r,
    updates: 0
  };
  try {
    t();
  } finally {
    s = L, L = e;
  }
  return s;
}
function ct(r) {
  const t = W[L];
  let e = r;
  function s() {
    return e;
  }
  return s.set = function(o) {
    it(o) ? e = o(e) : e = o, ++t.updates, t.updates === 1 && queueMicrotask(() => {
      t.updateFn(), t.updates = 0;
    });
  }, s;
}
function lt(r, t) {
  const e = at(r, t);
  return function() {
    delete W[e];
  };
}
var P, U;
const Y = new (U = class {
  constructor() {
    x(this, P, void 0);
    k(this, P, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(r, t) {
    if (!m(this, P).get(r))
      m(this, P).set(r, t);
    else
      throw console.error(r), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(r) {
    const t = m(this, P).get(r);
    if (t)
      return t;
    throw console.error(r), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, P, /* @__PURE__ */ new WeakMap());
  }
}, P = new WeakMap(), U)(), ut = (r) => !!r && typeof r.subscribe == "function", ht = (r) => !!r && typeof r.then == "function", G = (r) => {
  const t = r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, dt = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ft = (r) => ({
  subscribe: (t) => {
    t(r);
  }
}), pt = (r) => ({
  subscribe: (t) => {
    Promise.resolve(r).then((e) => {
      t(e);
    });
  }
}), gt = () => Math.random().toString(36).substring(2);
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
    const e = gt();
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
    const s = super.subscribe(e);
    return super.next(this._initialValue), s;
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
const B = (r) => ut(r) ? r : ht(r) ? pt(Promise.resolve(r)) : ft(r), F = (r, t, e, s = !1) => (r.addEventListener(t, e, s), () => {
  r.removeEventListener(t, e, s);
}), bt = (r) => {
  const t = () => new DOMParser().parseFromString(r, "text/html").body || document.createElement("body"), e = (f) => {
    const _ = f.querySelectorAll("script");
    for (const E of _)
      E.remove();
  }, s = (f, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (_.includes("javascript:") || _.includes("data:")) || f.startsWith("on"))
      return !0;
  }, o = (f) => {
    const _ = f.attributes;
    for (const {
      name: E,
      value: T
    } of _)
      s(E, T) && f.removeAttribute(E);
  }, u = (f) => {
    const _ = f.children;
    for (const E of _)
      o(E), u(E);
  }, l = t();
  return e(l), u(l), l.innerHTML;
}, mt = function(r) {
  r.renderCount === 1 && queueMicrotask(() => {
    r.update(), r.renderCount = 0;
  });
}, _t = (r, t) => {
  const e = G(t), s = () => ({
    get(o, u) {
      const l = Object.prototype.toString.call(o[u]);
      return ["[object Object]", "[object Array]"].indexOf(l) > -1 && !("__metadata__" in o[u]) ? new Proxy(o[u], s()) : o[u];
    },
    set(o, u, l) {
      return o[u] = l, ++r.renderCount, mt(r), !0;
    }
  });
  return class extends t {
    constructor(...o) {
      return super(...o), o.forEach((u, l) => {
        e[l] && e[l] !== "undefined" && (this[e[l]] = u);
      }), new Proxy(this, s());
    }
  };
}, Nt = () => {
  let r;
  return [new Promise((e) => {
    r = e;
  }), r];
}, X = (r, t, e) => {
  if (t.length > 0) {
    const s = [];
    for (const l of t)
      l.prototype.__metadata__.name !== "RENDERER" ? s.push(Y.getService(l)) : s.push(e);
    const o = G(r), u = new r(...s);
    return t.forEach((l, f) => {
      u[o[f]] = s[f];
    }), u;
  } else
    return new r();
}, M = new class {
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
  getComputedCss(r = "") {
    let t = [];
    const e = new CSSStyleSheet();
    if (e.insertRule(":host { display: block; }"), t = [this.globalStyles, e], r) {
      const s = new CSSStyleSheet();
      s.replace(r), t.push(s);
    }
    return t;
  }
}(), {
  html: J,
  render: yt
} = (() => {
  const r = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", s = /^attr([^ ]+)/, o = "insertNode", u = /^insertNode([^ ]+)/;
  let l = [], f = [];
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
        const w = Array.from(c.attributes).filter((d) => s.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of w) {
          const p = s.exec(d)[1];
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
              l.push(b);
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
      if (w = u.exec(c.data)) {
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
        if (h += a[d - 1], r.test(h) && t.test(h) && (h = h.replace(r, (b, A, V) => `${e}${d - 1}=${V || '"'}${A}${V ? "" : '"'}`), p = !0), !p)
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
      a && !a.children.length ? (a.innerHTML = "", a.appendChild(n)) : j(n, a, !1), l.forEach((h) => {
        h();
      }), l = [], f.forEach((h) => {
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
const wt = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, z = (r, t) => {
  const e = document.createElement("style");
  return e.innerHTML = r, t && t.appendChild(e), e;
}, vt = (r, t) => {
  var e, s, o, u, l, tt, _, et, T;
  if (r = {
    ...wt,
    ...r
  }, r.styles = r.styles.toString(), r.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, r.styles && (M.globalStyles.replace(r.styles), M.globalStyleTag = z(r.styles, document.head));
  else if (r.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + r.selector + " component");
  window.customElements.define(r.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      x(this, l);
      x(this, _);
      x(this, e, void 0);
      x(this, s, void 0);
      x(this, o, void 0);
      g(this, "renderCount", 0);
      x(this, u, new Q());
      if (dt)
        k(this, s, this.attachShadow({
          mode: "open"
        })), m(this, s).adoptedStyleSheets = M.getComputedCss(r.styles, r.standalone);
      else {
        k(this, s, this);
        const y = r.styles.replaceAll(":host", r.selector);
        k(this, o, z(y, document.head));
      }
      D(this, l, tt).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const y = m(this, e).render();
      typeof y == "string" ? m(this, s).innerHTML = bt(y) : yt(m(this, s), y);
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
      m(this, u).add(F(this, "bindprops", (v) => {
        const R = v.detail.props;
        R && this.setProps(R);
      })), m(this, u).add(F(this, "refresh_component", () => {
        var v, R;
        (R = (v = m(this, e)).mount) == null || R.call(v);
      })), m(this, e).beforeMount && m(this, u).add(lt(this.update, m(this, e).beforeMount.bind(m(this, e)))), this.update(), (C = (y = m(this, e)).mount) == null || C.call(y);
    }
    attributeChangedCallback(y, C, v) {
      var R, N;
      (N = (R = m(this, e)).onAttributesChanged) == null || N.call(R, y, C, v);
    }
    disconnectedCallback() {
      var y, C, v;
      this.renderCount = 1, (C = (y = m(this, e)).unmount) == null || C.call(y), (v = m(this, o)) == null || v.remove(), m(this, u).unsubscribe();
    }
  }, e = new WeakMap(), s = new WeakMap(), o = new WeakMap(), u = new WeakMap(), l = new WeakSet(), tt = function() {
    const y = new Z(this, m(this, s));
    y.update = () => {
      this.update();
    }, y.emitEvent = (C, v) => {
      D(this, _, et).call(this, C, v);
    }, k(this, e, X(_t(this, t), r.deps, y));
  }, _ = new WeakSet(), et = function(y, C) {
    const v = new CustomEvent(y, {
      detail: C
    });
    this.dispatchEvent(v);
  }, T));
}, St = {
  deps: []
}, Ct = (r) => (t) => {
  if (r.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(r.selector) || vt(r, t);
}, rt = (r = {}) => (t) => {
  if (r = {
    ...St,
    ...r
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, r.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = X(t, r.deps);
  Y.register(t, e);
}, Rt = (r) => {
  let t;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? t = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : t = r.value;
      break;
    }
    case "select": {
      const e = r.type === "select-one", o = [...Array.from(r.options)].filter((u) => u.selected).map((u) => u.value ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      t = e ? o[0] : o;
      break;
    }
    default: {
      t = r.value;
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
    g(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    g(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    g(this, "_errorCount");
    this._errorCount = ct(0), this._initialValues = t;
    for (const [e, s] of Object.entries(t)) {
      const o = [...Array.isArray(s) ? s : [s]];
      this._controls.set(e, {
        value: o[0],
        validators: o.length > 1 ? o[1] : []
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
    for (const [e, s] of this._controls)
      t[e] = s.value;
    return t;
  }
  getControl(t) {
    return this._controls.get(t);
  }
  changeHandler(t) {
    return (e) => {
      const s = Rt(e.target);
      this.getControl(t).value = s, this._errorCount.set(0);
    };
  }
  reset() {
    for (const [t, e] of Object.entries(this._initialValues)) {
      const s = [...Array.isArray(e) ? e : [e]];
      this._controls.get(t).value = JSON.parse(JSON.stringify(s))[0];
    }
    this._errors.clear(), this._errorCount.set(0);
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [t, {
      value: e,
      validators: s
    }] of this._controls)
      for (const o of s) {
        const u = o(e);
        u !== null && (this._errors.has(t) ? this._errors.set(t, {
          ...this._errors.get(t),
          ...u
        }) : this._errors.set(t, u));
      }
    this._errorCount.set(this._errors.size);
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
    let s = 0;
    const o = {}, u = e.paramCount;
    for (let l = 0; l < t.length; l++) {
      const f = e.params[l];
      f.indexOf(":") >= 0 && (o[f.split(":")[1]] = t[l].split("?")[0], s += 1);
    }
    return s === u ? o : {};
  }
  static getParamCount(t) {
    let e = 0;
    return t.forEach((s) => {
      s.indexOf(":") >= 0 && (e += 1);
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
    if (e.params = t.path.split("/").filter((s) => s.length > 0), e.url = t.path, e.template = "", e.redirectTo = t.redirectTo, t.template) {
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
function Et(r, t) {
  return r ? new RegExp(r.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
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
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, s) {
      var o = e.pushState;
      e.pushState = function(...u) {
        o.apply(e, u), s();
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
    let s = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    s = s || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), s === t ? this._navigateTo(t, e) : S.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const s = {}, o = t.split("/").filter((f) => f.length > 0), u = S.routeList.filter((f) => {
      if (f.params.length === o.length && Et(f.url, t))
        return f;
      if (f.url === t)
        return f;
    }), l = u.length > 0 ? u[0] : null;
    l && (s.path = t, s.state = {
      ...e || {}
    }, B(l.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const _ = S.checkParams(o, l);
      if (Object.keys(_).length > 0 || t) {
        s.routeParams = new Map(Object.entries(_));
        let E = [];
        S.isHistoryBasedRouting ? E = new URLSearchParams(window.location.search).entries() : E = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], s.queryParams = new Map(E);
        const T = (O) => {
          O.isRegistered = !0, this._currentRoute.next(s), this._template.next(O.template), this._navigationEndEvent.next();
        };
        l.isRegistered ? T(l) : l.templatePath ? B(l.templatePath()).subscribe(() => {
          T(l);
        }) : l.redirectTo && this.navigateTo(l.redirectTo, e);
      } else
        this.navigateTo(l.redirectTo, e);
    }));
  }
}
rt()($);
const Mt = () => {
  class r {
    constructor(e, s) {
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
  Ct({
    selector: "router-outlet",
    deps: [$, Z]
  })(r);
};
class Tt {
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
  registerRoutes(t, e = !1, s = !1) {
    if (s && (S.isHistoryBasedRouting = !s), Array.isArray(t)) {
      for (const o of t)
        S.formatRoute(o);
      e ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
rt({
  deps: [$]
})(Tt);
export {
  q as BehaviourSubjectObs,
  Ct as Component,
  kt as FormBuilder,
  rt as Injectable,
  Z as Renderer,
  Tt as Router,
  K as SubjectObs,
  Q as Subscriptions,
  Ot as Validators,
  F as fromEvent,
  J as html,
  Nt as promisify,
  Mt as registerRouterComponent,
  yt as render,
  ct as signal,
  B as wrapIntoObservable
};
