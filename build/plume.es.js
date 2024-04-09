var it = Object.defineProperty;
var ot = (s, t, e) => t in s ? it(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var b = (s, t, e) => (ot(s, typeof t != "symbol" ? t + "" : t, e), e), V = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var w = (s, t, e) => (V(s, t, "read from private field"), e ? e.call(s) : t.get(s)), L = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, O = (s, t, e, r) => (V(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var D = (s, t, e) => (V(s, t, "access private method"), e);
const at = (s) => !!s && typeof s.subscribe == "function", Y = (s) => !!s && typeof s.then == "function", G = (s) => {
  const t = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, ct = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), lt = (s) => ({
  subscribe: (t) => {
    t(s);
  }
}), ut = (s) => ({
  subscribe: (t) => {
    Promise.resolve(s).then((e) => {
      t(e);
    });
  }
}), W = () => Math.random().toString(36).substring(2);
class K {
  constructor() {
    /**
     * @private
     */
    b(this, "_callbackCollection", {});
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
    const e = W();
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
    b(this, "_initialValue");
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
class X {
  constructor() {
    b(this, "_subcribers", []);
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
const J = (s) => at(s) ? s : Y(s) ? ut(Promise.resolve(s)) : lt(s), F = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), ht = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (f) => {
    const y = f.querySelectorAll("script");
    for (const R of y)
      R.remove();
  }, r = (f, y) => {
    if (y = y.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (y.includes("javascript:") || y.includes("data:")) || f.startsWith("on"))
      return !0;
  }, o = (f) => {
    const y = f.attributes;
    for (const {
      name: R,
      value: A
    } of y)
      r(R, A) && f.removeAttribute(R);
  }, a = (f) => {
    const y = f.children;
    for (const R of y)
      o(R), a(R);
  }, u = t();
  return e(u), a(u), u.innerHTML;
}, dt = (s, t) => {
  const e = G(t), r = () => ({
    get(o, a) {
      const u = Object.prototype.toString.call(o[a]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in o[a]) ? new Proxy(o[a], r()) : o[a];
    },
    set(o, a, u) {
      return o[a] = u, s(), !0;
    }
  });
  return class extends t {
    constructor(...o) {
      return super(...o), o.forEach((a, u) => {
        e[u] && e[u] !== "undefined" && (this[e[u]] = a);
      }), new Proxy(this, r());
    }
  };
}, Nt = () => {
  let s;
  return [new Promise((e) => {
    s = e;
  }), s];
}, ft = (s) => typeof s == "function", $ = /* @__PURE__ */ Object.create(null);
let H = null;
function pt(s, t) {
  const e = H;
  let r;
  H = W(), $[H] = s;
  try {
    t();
  } finally {
    r = H, H = e;
  }
  return r;
}
function bt(s) {
  const t = $[H];
  let e = s;
  function r() {
    return e;
  }
  return r.set = function(o) {
    ft(o) ? e = o(e) : e = o, t();
  }, r;
}
function gt(s, t) {
  const e = pt(s, t);
  return function() {
    delete $[e];
  };
}
var M, U;
const Z = new (U = class {
  constructor() {
    L(this, M, void 0);
    O(this, M, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, t) {
    if (!w(this, M).get(s))
      w(this, M).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = w(this, M).get(s);
    if (t)
      return t;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    O(this, M, /* @__PURE__ */ new WeakMap());
  }
}, M = new WeakMap(), U)(), tt = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const u of t)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(Z.getService(u)) : r.push(e);
    const o = G(s), a = new s(...r);
    return t.forEach((u, f) => {
      a[o[f]] = r[f];
    }), a;
  } else
    return new s();
}, I = new class {
  constructor() {
    b(this, "globalStyles");
    b(this, "globalStyleTag");
    b(this, "style_registry");
    b(this, "isRootNodeSet");
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
  html: z,
  render: mt
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, o = "insertNode", a = /^insertNode([^ ]+)/;
  let u = [], f = [];
  const y = (c) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(c);
    const l = (d) => n[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, l))(h), JSON.parse(h);
  }, R = (c, n) => {
    const h = c.options, l = Array.isArray(n) ? n : [n];
    let _, d, i = h.length;
    for (; i--; ) {
      d = h[i];
      const p = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = l.indexOf(p) > -1) && (_ = !0);
    }
    _ || (c.selectedIndex = -1);
  }, A = (c) => {
    const n = document.createElement("template");
    return n.innerHTML = c, n.content;
  }, N = (c, n, h) => {
    const l = () => {
      setTimeout(() => {
        if (c.isConnected) {
          const _ = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          c.dispatchEvent(_);
        }
      });
    };
    c[h] = JSON.stringify(n), f.push(l);
  }, g = (c, n) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let l = h.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const _ = Array.from(l.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of _) {
          const p = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const m = i.slice(2).toLowerCase();
              l.removeEventListener(m, n[p]), l.addEventListener(m, n[p]);
              break;
            }
            case /ref/.test(i): {
              const m = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: l,
                fn: n[p]
              });
              u.push(m);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? N(l, n[p], Symbol("input")) : l.setAttribute(i, y(n[p]));
              break;
            }
            case /class/.test(i): {
              n[p] ? l.classList.add(...n[p].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(i): {
              l.nodeName.toLowerCase() === "select" ? R(l, n[p]) : l.value = y(n[p]);
              break;
            }
            case /disabled/.test(i):
            case /checked/.test(i): {
              n[p] ? l.setAttribute(i, n[p]) : l.removeAttribute(i);
              break;
            }
            default:
              l.setAttribute(i, y(n[p]));
          }
          l.removeAttribute(d);
        }
      }
      l = h.nextNode();
    }
  }, v = (c, n) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), _;
    for (; l; ) {
      if (_ = a.exec(l.data)) {
        const d = Array.isArray(n[_[1]]) ? n[_[1]] : [n[_[1]]];
        l.replaceWith(...d), h.currentNode = c;
      }
      l = h.nextNode();
    }
  }, C = (c, n) => {
    if (!c || !n || c.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = c.attributes, l = n.attributes, _ = n.getAttribute("data-preserve-attributes"), d = _ && _ === "true";
    for (const {
      name: i,
      value: p
    } of h)
      (!l[i] || l[i] !== p) && n.setAttribute(i, p);
    if (!d)
      for (const {
        name: i
      } of l)
        h[i] || n.removeAttribute(i);
    if (n.tagName.toLowerCase() === "input" && (n.value = c.value), n.tagName.indexOf("-") > -1 && c.tagName.indexOf("-") > -1) {
      const i = Object.getOwnPropertySymbols(c).find((x) => x.description === "input"), p = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), m = i ? c[i] : "", k = p ? n[p] : "";
      m && k && m !== k && N(n, JSON.parse(m), p);
    }
  }, E = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), T = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, P = (c, n, h) => {
    const l = n ? Array.from(n.childNodes) : [], _ = c ? Array.from(c.childNodes) : [];
    let d = l.length - _.length;
    if (d > 0)
      for (; d > 0; d--)
        l[l.length - d].parentNode.removeChild(l[l.length - d]);
    _.forEach(function(i, p) {
      const m = l[p];
      if (C(i, m), h && m && m.nodeType === 1 && m.tagName.indexOf("-") > -1)
        return;
      if (!m) {
        n && n.appendChild(i);
        return;
      }
      if (E(i) !== E(m)) {
        m.replaceWith(i);
        return;
      }
      const k = T(i);
      if (k && k !== T(m)) {
        m.textContent = k;
        return;
      }
      if (m.childNodes.length > 0 && i.childNodes.length < 1) {
        m.innerHTML = "";
        return;
      }
      if (m.childNodes.length < 1 && i.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        P(i, x, !1), m.appendChild(x);
        return;
      }
      if (i.childNodes.length > 0) {
        P(i, m, !0);
        return;
      }
    });
  };
  return {
    html: (c, ...n) => {
      let h = "";
      const {
        length: l
      } = c;
      for (let d = 1; d < l; d++) {
        const i = n[d - 1];
        let p = !1;
        if (h += c[d - 1], s.test(h) && t.test(h) && (h = h.replace(s, (m, k, x) => `${e}${d - 1}=${x || '"'}${k}${x ? "" : '"'}`), p = !0), !p)
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
      h += c[l - 1];
      const _ = A(h.trim());
      return g(_, n), v(_, n), _;
    },
    render: (c, n) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(n)) : P(n, c, !1), u.forEach((h) => {
        h();
      }), u = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class et {
  constructor(t, e) {
    b(this, "_shadowRoot");
    b(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    b(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    b(this, "emitEvent");
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
  shadowDomEncapsulation: !0
}, Q = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, _t = async (s, t) => {
  var e, r, o, a, u, st, y, rt, A;
  if (s = {
    ...yt,
    ...s
  }, Y(s.styles)) {
    const N = await s.styles;
    s.styles = N.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !I.isRootNodeSet)
    I.isRootNodeSet = !0, s.styles && (I.globalStyles.replace(s.styles), I.globalStyleTag = Q(s.styles, document.head));
  else if (s.root && I.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (A = class extends HTMLElement {
    constructor() {
      super();
      L(this, u);
      L(this, y);
      L(this, e, void 0);
      L(this, r, void 0);
      L(this, o, void 0);
      L(this, a, new X());
      b(this, "renderCount", 0);
      if (s.shadowDomEncapsulation && ct)
        O(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = I.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const g = W();
        this.setAttribute("data-did", g);
        const v = s.styles.replaceAll(":host", `${s.selector}[data-did='${g}']`);
        !s.root && v && O(this, o, Q(v, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), D(this, u, st).call(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const g = w(this, e).render();
      typeof g == "string" ? w(this, r).innerHTML = ht(g) : mt(w(this, r), g);
    }
    setProps(g) {
      var v, C;
      for (const [E, T] of Object.entries(g))
        t.observedProperties.find((P) => P === E) && (w(this, e)[E] = T);
      (C = (v = w(this, e)).onPropertiesChanged) == null || C.call(v);
    }
    getInstance() {
      return w(this, e);
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
      var g, v, C, E;
      w(this, a).add(F(this, "bindprops", (T) => {
        const P = T.detail.props;
        P && this.setProps(P);
      })), w(this, a).add(F(this, "refresh_component", () => {
        this.update();
      })), (v = (g = w(this, e)).beforeMount) == null || v.call(g), this.update(), (E = (C = w(this, e)).mount) == null || E.call(C);
    }
    attributeChangedCallback(g, v, C) {
      var E, T;
      (T = (E = w(this, e)).onAttributesChanged) == null || T.call(E, g, v, C);
    }
    disconnectedCallback() {
      var g, v, C;
      this.renderCount = 0, (v = (g = w(this, e)).unmount) == null || v.call(g), (C = w(this, o)) == null || C.remove(), w(this, a).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), o = new WeakMap(), a = new WeakMap(), u = new WeakSet(), st = function() {
    const g = new et(this, w(this, r));
    g.update = () => {
      this.update();
    }, g.emitEvent = (v, C) => {
      D(this, y, rt).call(this, v, C);
    }, w(this, a).add(gt(this.setRenderIntoQueue, () => {
      O(this, e, tt(dt(this.setRenderIntoQueue, t), s.deps, g));
    }));
  }, y = new WeakSet(), rt = function(g, v) {
    const C = new CustomEvent(g, {
      detail: v
    });
    this.dispatchEvent(C);
  }, A));
}, wt = {
  deps: []
}, vt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || _t(s, t);
}, nt = (s = {}) => (t) => {
  if (s = {
    ...wt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = tt(t, s.deps);
  Z.register(t, e);
};
function St(s, t) {
  return s.nodeName && s.nodeName.toLowerCase() === t.toLowerCase();
}
const Ct = (s) => {
  let t;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? t = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : t = s.value;
      break;
    }
    case "select": {
      const e = s.type === "select-one", o = [...Array.from(s.options).filter((a) => !a.disabled && (!a.parentNode.disabled || !St(a.parentNode, "optgroup")))].filter((a) => a.selected).map((a) => a.value ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
class Pt {
  constructor(t) {
    /**
     * @private
     */
    b(this, "_initialValues");
    /**
     * @private
     */
    b(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    b(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    b(this, "_errorCount");
    this._errorCount = bt(0), this._initialValues = t;
    for (const [e, r] of Object.entries(t)) {
      const o = [...Array.isArray(r) ? r : [r]];
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
    for (const [e, r] of this._controls)
      t[e] = r.value;
    return t;
  }
  getControl(t) {
    return this._controls.get(t);
  }
  changeHandler(t) {
    return (e) => {
      const r = Ct(e.target);
      this.getControl(t).value = r, this._errorCount.set(0);
    };
  }
  reset() {
    for (const [t, e] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(e) ? e : [e]];
      this._controls.get(t).value = JSON.parse(JSON.stringify(r))[0];
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
      validators: r
    }] of this._controls)
      for (const o of r) {
        const a = o(e);
        a !== null && (this._errors.has(t) ? this._errors.set(t, {
          ...this._errors.get(t),
          ...a
        }) : this._errors.set(t, a));
      }
    this._errorCount.set(this._errors.size);
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
const j = class {
  static checkParams(t, e) {
    let r = 0;
    const o = {}, a = e.paramCount;
    for (let u = 0; u < t.length; u++) {
      const f = e.params[u];
      f.indexOf(":") >= 0 && (o[f.split(":")[1]] = t[u].split("?")[0], r += 1);
    }
    return r === a ? o : {};
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
    t.canActivate && (e.canActivate = t.canActivate), e.paramCount = j.getParamCount(e.params), j.routeList.push(e);
  }
  static preloadRoutes() {
    for (const t of j.routeList)
      t.templatePath && t.templatePath();
  }
  static preloadSelectedRoutes() {
    const t = j.routeList.filter((e) => e.preload === !0);
    for (const e of t)
      e.templatePath && e.templatePath();
  }
};
let S = j;
b(S, "routeList", []), b(S, "isHistoryBasedRouting", !0);
function Rt(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class B {
  constructor() {
    b(this, "_currentRoute", new q({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    b(this, "_template", new q(""));
    b(this, "_navigationEndEvent", new K());
    b(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var o = e.pushState;
      e.pushState = function(...a) {
        o.apply(e, a), r();
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
    const r = {}, o = t.split("/").filter((f) => f.length > 0), a = S.routeList.filter((f) => {
      if (f.params.length === o.length && Rt(f.url, t))
        return f;
      if (f.url === t)
        return f;
    }), u = a.length > 0 ? a[0] : null;
    u && (r.path = t, r.state = {
      ...e || {}
    }, J(u.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const y = S.checkParams(o, u);
      if (Object.keys(y).length > 0 || t) {
        r.routeParams = new Map(Object.entries(y));
        let R = [];
        S.isHistoryBasedRouting ? R = new URLSearchParams(window.location.search).entries() : R = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(R);
        const A = (N) => {
          N.isRegistered = !0, this._currentRoute.next(r), this._template.next(N.template), this._navigationEndEvent.next();
        };
        u.isRegistered ? A(u) : u.templatePath ? J(u.templatePath()).subscribe(() => {
          A(u);
        }) : u.redirectTo && this.navigateTo(u.redirectTo, e);
      } else
        this.navigateTo(u.redirectTo, e);
    }));
  }
}
nt()(B);
const Lt = () => {
  class s {
    constructor(e, r) {
      b(this, "_template", "");
      b(this, "_subscriptions", new X());
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
        return e.raw = [`${this._template}`], z(e);
      } else
        return z``;
    }
  }
  vt({
    selector: "router-outlet",
    deps: [B, et]
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
nt({
  deps: [B]
})(Et);
export {
  q as BehaviourSubjectObs,
  vt as Component,
  Pt as FormBuilder,
  nt as Injectable,
  et as Renderer,
  Et as Router,
  K as SubjectObs,
  X as Subscriptions,
  kt as Validators,
  F as fromEvent,
  z as html,
  Nt as promisify,
  Lt as registerRouterComponent,
  mt as render,
  bt as signal,
  J as wrapIntoObservable
};
