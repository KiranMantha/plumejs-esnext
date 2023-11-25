var tt = Object.defineProperty;
var et = (s, t, e) => t in s ? tt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var m = (s, t, e) => (et(s, typeof t != "symbol" ? t + "" : t, e), e), I = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var w = (s, t, e) => (I(s, t, "read from private field"), e ? e.call(s) : t.get(s)), N = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, k = (s, t, e, r) => (I(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var V = (s, t, e) => (I(s, t, "access private method"), e);
var O, q;
const J = new (q = class {
  constructor() {
    N(this, O, void 0);
    k(this, O, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, t) {
    if (!w(this, O).get(s))
      w(this, O).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = w(this, O).get(s);
    if (t)
      return t;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, O, /* @__PURE__ */ new WeakMap());
  }
}, O = new WeakMap(), q)(), st = (s) => !!s && typeof s.subscribe == "function", rt = (s) => !!s && typeof s.then == "function", U = (s) => {
  const t = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, nt = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), it = (s) => ({
  subscribe: (t) => {
    t(s);
  }
}), ot = (s) => ({
  subscribe: (t) => {
    Promise.resolve(s).then((e) => {
      t(e);
    });
  }
});
class z {
  constructor() {
    m(this, "_callbacks", []);
  }
  asObservable() {
    return {
      subscribe: (t) => this.subscribe(t)
    };
  }
  subscribe(t) {
    return this._callbacks.push(t), this.unsubscribe;
  }
  unsubscribe() {
    this._callbacks = [];
  }
  next(t) {
    for (const e of this._callbacks)
      e(t);
  }
}
class at extends z {
  constructor(e) {
    super();
    m(this, "_initialValue");
    this._initialValue = e;
  }
  subscribe(e) {
    const r = super.subscribe(e);
    return this.next(this._initialValue), r;
  }
}
class Y {
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
const W = (s) => st(s) ? s : rt(s) ? ot(Promise.resolve(s)) : it(s), D = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), ct = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (g) => {
    const p = g.querySelectorAll("script");
    for (const C of p)
      C.remove();
  }, r = (g, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(g) && (p.includes("javascript:") || p.includes("data:")) || g.startsWith("on"))
      return !0;
  }, l = (g) => {
    const p = g.attributes;
    for (const {
      name: C,
      value: x
    } of p)
      r(C, x) && g.removeAttribute(C);
  }, i = (g) => {
    const p = g.children;
    for (const C of p)
      l(C), i(C);
  }, u = t();
  return e(u), i(u), u.innerHTML;
}, lt = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, ut = (s, t) => {
  const e = U(t), r = () => ({
    get(l, i) {
      const u = Object.prototype.toString.call(l[i]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in l[i]) ? new Proxy(l[i], r()) : l[i];
    },
    set(l, i, u) {
      return l[i] = u, ++s.renderCount, lt(s), !0;
    }
  });
  return class extends t {
    constructor(...l) {
      return super(...l), l.forEach((i, u) => {
        e[u] && e[u] !== "undefined" && (this[e[u]] = i);
      }), new Proxy(this, r());
    }
  };
}, St = () => {
  let s;
  return [new Promise((e) => {
    s = e;
  }), s];
}, G = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const u of t)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(J.getService(u)) : r.push(e);
    const l = U(s), i = new s(...r);
    return t.forEach((u, g) => {
      i[l[g]] = r[g];
    }), i;
  } else
    return new s();
}, L = new class {
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
  html: B,
  render: ht
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, l = "insertNode", i = /^insertNode([^ ]+)/;
  let u = [], g = [];
  const p = (a) => {
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
  }, C = (a, n) => {
    const h = a.options, c = Array.isArray(n) ? n : [n];
    let y, d, o = h.length;
    for (; o--; ) {
      d = h[o];
      const f = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(f) > -1) && (y = !0);
    }
    y || (a.selectedIndex = -1);
  }, x = (a) => {
    const n = document.createElement("template");
    return n.innerHTML = a, n.content;
  }, j = (a, n, h) => {
    const c = () => {
      setTimeout(() => {
        if (a.isConnected) {
          const y = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          a.dispatchEvent(y);
        }
      });
    };
    a[h] = JSON.stringify(n), g.push(c);
  }, _ = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const y = Array.from(c.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: o
        } of y) {
          const f = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(o): {
              const b = o.slice(2).toLowerCase();
              c.removeEventListener(b, n[f]), c.addEventListener(b, n[f]);
              break;
            }
            case /ref/.test(o): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: c,
                fn: n[f]
              });
              u.push(b);
              break;
            }
            case /^data-+/.test(o):
            case /^aria-+/.test(o): {
              o === "data-input" ? j(c, n[f], Symbol("input")) : c.setAttribute(o, p(n[f]));
              break;
            }
            case /class/.test(o): {
              n[f] ? c.classList.add(...n[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(o): {
              c.nodeName.toLowerCase() === "select" ? C(c, n[f]) : c.value = p(n[f]);
              break;
            }
            case /disabled/.test(o):
            case /checked/.test(o): {
              n[f] ? c.setAttribute(o, n[f]) : c.removeAttribute(o);
              break;
            }
            default:
              c.setAttribute(o, p(n[f]));
          }
          c.removeAttribute(d);
        }
      }
      c = h.nextNode();
    }
  }, S = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), y;
    for (; c; ) {
      if (y = i.exec(c.data)) {
        const d = Array.isArray(n[y[1]]) ? n[y[1]] : [n[y[1]]];
        c.replaceWith(...d), h.currentNode = a;
      }
      c = h.nextNode();
    }
  }, R = (a, n) => {
    if (!a || !n || a.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = a.attributes, c = n.attributes, y = n.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: o,
      value: f
    } of h)
      (!c[o] || c[o] !== f) && n.setAttribute(o, f);
    if (!d)
      for (const {
        name: o
      } of c)
        h[o] || n.removeAttribute(o);
    if (n.tagName.toLowerCase() === "input" && (n.value = a.value), n.tagName.indexOf("-") > -1 && a.tagName.indexOf("-") > -1) {
      const o = Object.getOwnPropertySymbols(a), f = Object.getOwnPropertySymbols(n), b = o.length ? a[o[0]] : "", P = f.length ? n[f[0]] : "";
      b && P && b !== P && j(n, JSON.parse(b), f[0]);
    }
  }, T = (a) => a.nodeType === 3 ? "text" : a.nodeType === 8 ? "comment" : a.tagName.toLowerCase(), E = (a) => a.childNodes && a.childNodes.length > 0 ? null : a.textContent, A = (a, n, h) => {
    const c = n ? Array.from(n.childNodes) : [], y = a ? Array.from(a.childNodes) : [];
    let d = c.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    y.forEach(function(o, f) {
      const b = c[f];
      if (R(o, b), h && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        n && n.appendChild(o);
        return;
      }
      if (T(o) !== T(b)) {
        b.replaceWith(o);
        return;
      }
      const P = E(o);
      if (P && P !== E(b)) {
        b.textContent = P;
        return;
      }
      if (b.childNodes.length > 0 && o.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && o.childNodes.length > 0) {
        const H = document.createDocumentFragment();
        A(o, H, !1), b.appendChild(H);
        return;
      }
      if (o.childNodes.length > 0) {
        A(o, b, !0);
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
        const o = n[d - 1];
        let f = !1;
        if (h += a[d - 1], s.test(h) && t.test(h) && (h = h.replace(s, (b, P, H) => `${e}${d - 1}=${H || '"'}${P}${H ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(o):
            case o instanceof DocumentFragment: {
              h += `<!--${l}${d - 1}-->`;
              break;
            }
            case (typeof o == "object" && o !== null): {
              "html" in o && (h += o.html);
              break;
            }
            default:
              h += o || "";
          }
      }
      h += a[c - 1];
      const y = x(h.trim());
      return _(y, n), S(y, n), y;
    },
    render: (a, n) => {
      a && !a.children.length ? (a.innerHTML = "", a.appendChild(n)) : A(n, a, !1), u.forEach((h) => {
        h();
      }), u = [], g.forEach((h) => {
        h();
      }), g = [];
    }
  };
})();
class K {
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
const dt = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, $ = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, ft = (s, t) => {
  var e, r, l, i, u, Q, p, X, x;
  if (s = {
    ...dt,
    ...s
  }, s.styles = s.styles.toString(), s.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, s.styles && (L.globalStyles.replace(s.styles), L.globalStyleTag = $(s.styles, document.head));
  else if (s.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (x = class extends HTMLElement {
    constructor() {
      super();
      N(this, u);
      N(this, p);
      N(this, e, void 0);
      N(this, r, void 0);
      N(this, l, void 0);
      m(this, "renderCount", 0);
      N(this, i, new Y());
      if (nt)
        k(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = L.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const _ = s.styles.replaceAll(":host", s.selector);
        k(this, l, $(_, document.head));
      }
      V(this, u, Q).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const _ = w(this, e).render();
      typeof _ == "string" ? w(this, r).innerHTML = ct(_) : ht(w(this, r), _);
    }
    setProps(_) {
      var S, R;
      for (const [T, E] of Object.entries(_))
        t.observedProperties.find((A) => A === T) && (w(this, e)[T] = E);
      (R = (S = w(this, e)).onPropertiesChanged) == null || R.call(S);
    }
    getInstance() {
      return w(this, e);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var _, S, R, T;
      w(this, i).add(D(this, "bindprops", (E) => {
        const A = E.detail.props;
        A && this.setProps(A);
      })), w(this, i).add(D(this, "refresh_component", () => {
        var E, A;
        (A = (E = w(this, e)).mount) == null || A.call(E);
      })), (S = (_ = w(this, e)).beforeMount) == null || S.call(_), this.update(), (T = (R = w(this, e)).mount) == null || T.call(R);
    }
    attributeChangedCallback(_, S, R) {
      var T, E;
      (E = (T = w(this, e)).onAttributesChanged) == null || E.call(T, _, S, R);
    }
    disconnectedCallback() {
      var _, S, R;
      this.renderCount = 1, (S = (_ = w(this, e)).unmount) == null || S.call(_), (R = w(this, l)) == null || R.remove(), w(this, i).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), l = new WeakMap(), i = new WeakMap(), u = new WeakSet(), Q = function() {
    const _ = new K(this, w(this, r));
    _.update = () => {
      this.update();
    }, _.emitEvent = (S, R) => {
      V(this, p, X).call(this, S, R);
    }, k(this, e, G(ut(this, t), s.deps, _));
  }, p = new WeakSet(), X = function(_, S) {
    const R = new CustomEvent(_, {
      detail: S
    });
    this.dispatchEvent(R);
  }, x));
}, pt = {
  deps: []
}, bt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || ft(s, t);
}, Z = (s = {}) => (t) => {
  if (s = {
    ...pt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = G(t, s.deps);
  J.register(t, e);
}, mt = (s) => {
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
class Rt {
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
      const r = mt(e.target);
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
class Ct {
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
const M = class {
  static checkParams(t, e) {
    let r = 0;
    const l = {}, i = e.paramCount;
    for (let u = 0; u < t.length; u++) {
      const g = e.params[u];
      g.indexOf(":") >= 0 && (l[g.split(":")[1]] = t[u].split("?")[0], r += 1);
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
    t.canActivate && (e.canActivate = t.canActivate), e.paramCount = M.getParamCount(e.params), M.routeList.push(e);
  }
  static preloadRoutes() {
    for (const t of M.routeList)
      t.templatePath && t.templatePath();
  }
  static preloadSelectedRoutes() {
    const t = M.routeList.filter((e) => e.preload === !0);
    for (const e of t)
      e.templatePath && e.templatePath();
  }
};
let v = M;
m(v, "routeList", []), m(v, "isHistoryBasedRouting", !0);
function gt(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class F {
  constructor() {
    m(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    m(this, "_template", new at(""));
    m(this, "_navigationEndEvent", new z());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = v.isHistoryBasedRouting ? "popstate" : "hashchange";
    return v.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var l = e.pushState;
      e.pushState = function(...i) {
        l.apply(e, i), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), D(window, t, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute;
  }
  navigateTo(t = "/", e) {
    let r = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), r === t ? this._navigateTo(t, e) : v.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const r = t.split("/").filter((u) => u.length > 0), l = v.routeList.filter((u) => {
      if (u.params.length === r.length && gt(u.url, t))
        return u;
      if (u.url === t)
        return u;
    }), i = l.length > 0 ? l[0] : null;
    i && (this._currentRoute.path = t, this._currentRoute.state = {
      ...e || {}
    }, W(i.canActivate()).subscribe((u) => {
      if (!u)
        return;
      const g = v.checkParams(r, i);
      if (Object.keys(g).length > 0 || t) {
        this._currentRoute.routeParams = new Map(Object.entries(g));
        let p = [];
        v.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p);
        const C = (x) => {
          x.isRegistered = !0, this._template.next(x.template), this._navigationEndEvent.next();
        };
        i.isRegistered ? C(i) : i.templatePath ? W(i.templatePath()).subscribe(() => {
          C(i);
        }) : i.redirectTo && this.navigateTo(i.redirectTo, e);
      } else
        this.navigateTo(i.redirectTo, e);
    }));
  }
}
Z()(F);
const Et = () => {
  class s {
    constructor(e, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new Y());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((e) => {
        this._template !== e ? this._template = e : this.refreshRouterOutletComponent();
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const e = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(e || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    refreshRouterOutletComponent() {
      if (this.renderer.shadowRoot.children.length) {
        const e = new CustomEvent("refresh_component", {
          detail: {},
          bubbles: !1,
          cancelable: !1,
          composed: !1
        });
        this.renderer.shadowRoot.children[0].dispatchEvent(e);
      }
    }
    render() {
      if (this._template) {
        const e = [`${this._template}`];
        return e.raw = [`${this._template}`], B(e);
      } else
        return B``;
    }
  }
  bt({
    selector: "router-outlet",
    deps: [F, K]
  })(s);
};
class _t {
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
    if (r && (v.isHistoryBasedRouting = !r), Array.isArray(t)) {
      for (const l of t)
        v.formatRoute(l);
      e ? v.preloadRoutes() : v.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [F]
})(_t);
export {
  at as BehaviourSubjectObs,
  bt as Component,
  Rt as FormBuilder,
  Z as Injectable,
  K as Renderer,
  _t as Router,
  z as SubjectObs,
  Y as Subscriptions,
  Ct as Validators,
  D as fromEvent,
  B as html,
  St as promisify,
  Et as registerRouterComponent,
  ht as render,
  W as wrapIntoObservable
};
