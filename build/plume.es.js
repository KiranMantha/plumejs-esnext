var ee = Object.defineProperty;
var te = (s, e, t) => e in s ? ee(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var m = (s, e, t) => (te(s, typeof e != "symbol" ? e + "" : e, t), t), V = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var w = (s, e, t) => (V(s, e, "read from private field"), t ? t.call(s) : e.get(s)), P = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, L = (s, e, t, r) => (V(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var F = (s, e, t) => (V(s, e, "access private method"), t);
var k, B;
const U = new (B = class {
  constructor() {
    P(this, k, void 0);
    L(this, k, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!w(this, k).get(s))
      w(this, k).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = w(this, k).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    L(this, k, /* @__PURE__ */ new WeakMap());
  }
}, k = new WeakMap(), B)(), se = (s) => !!s && typeof s.subscribe == "function", re = (s) => !!s && typeof s.then == "function", z = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ne = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), oe = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), ie = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
});
class J {
  constructor() {
    m(this, "_callbacks", []);
  }
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    return this._callbacks.push(e), this.unsubscribe;
  }
  unsubscribe() {
    this._callbacks = [];
  }
  next(e) {
    for (const t of this._callbacks)
      t(e);
  }
}
class ae extends J {
  constructor(t) {
    super();
    m(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
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
const W = (s) => se(s) ? s : re(s) ? ie(Promise.resolve(s)) : oe(s), G = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), ce = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const p = f.querySelectorAll("script");
    for (const E of p)
      E.remove();
  }, r = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, l = (f) => {
    const p = f.attributes;
    for (const {
      name: E,
      value: T
    } of p)
      r(E, T) && f.removeAttribute(E);
  }, n = (f) => {
    const p = f.children;
    for (const E of p)
      l(E), n(E);
  }, o = e();
  return t(o), n(o), o.innerHTML;
}, le = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, ue = (s, e) => {
  const t = z(e), r = () => ({
    get(l, n) {
      const o = Object.prototype.toString.call(l[n]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in l[n]) ? new Proxy(l[n], r()) : l[n];
    },
    set(l, n, o) {
      return l[n] = o, ++s.renderCount, le(s), !0;
    }
  });
  return class extends e {
    constructor(...l) {
      return super(...l), l.forEach((n, o) => {
        t[o] && t[o] !== "undefined" && (this[t[o]] = n);
      }), new Proxy(this, r());
    }
  };
}, ve = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, K = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const o of e)
      o.prototype.__metadata__.name !== "RENDERER" ? r.push(U.getService(o)) : r.push(t);
    const l = z(s), n = new s(...r);
    return e.forEach((o, f) => {
      n[l[f]] = r[f];
    }), n;
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
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], s) {
      const r = new CSSStyleSheet();
      r.replace(s), e.push(r);
    }
    return e;
  }
}(), {
  html: $,
  render: he
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, l = "insertNode", n = /^insertNode([^ ]+)/;
  let o = [];
  const f = (u) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(u);
    const c = (d) => i[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, p = (u, i) => {
    const h = u.options, c = Array.isArray(i) ? i : [i];
    let y, d, a = h.length;
    for (; a--; ) {
      d = h[a];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(g) > -1) && (y = !0);
    }
    y || (u.selectedIndex = -1);
  }, E = (u) => {
    const i = document.createElement("template");
    return i.innerHTML = u, i.content;
  }, T = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const y = Array.from(c.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: a
        } of y) {
          const g = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(a): {
              const _ = a.slice(2).toLowerCase();
              c.removeEventListener(_, i[g]), _ !== "bindprops" ? c.addEventListener(_, i[g]) : c.addEventListener(_, (x) => {
                x.detail.setProps(i[g]());
              });
              break;
            }
            case /ref/.test(a): {
              const _ = ((x) => {
                const N = x;
                return () => {
                  N.isConnected && i[g](N);
                };
              })(c);
              o.push(_);
              break;
            }
            case /^data-+/.test(a):
            case /^aria-+/.test(a): {
              c.setAttribute(a, f(i[g]));
              break;
            }
            case /class/.test(a): {
              i[g] ? c.classList.add(...i[g].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(a): {
              c.nodeName.toLowerCase() === "select" ? p(c, i[g]) : c.value = f(i[g]);
              break;
            }
            case /disabled/.test(a):
            case /checked/.test(a): {
              i[g] ? c.setAttribute(a, i[g]) : c.removeAttribute(a);
              break;
            }
            default:
              c.setAttribute(a, f(i[g]));
          }
          c.removeAttribute(d);
        }
      }
      c = h.nextNode();
    }
  }, D = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), y;
    for (; c; ) {
      if (y = n.exec(c.data)) {
        const d = Array.isArray(i[y[1]]) ? i[y[1]] : [i[y[1]]];
        c.replaceWith(...d), h.currentNode = u;
      }
      c = h.nextNode();
    }
  }, b = (u, i) => {
    if (!u || !i || u.nodeType !== 1 || i.nodeType !== 1)
      return;
    const h = u.attributes, c = i.attributes, y = i.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: a,
      value: g
    } of h)
      (!c[a] || c[a] !== g) && i.setAttribute(a, g);
    if (!d)
      for (const {
        name: a
      } of c)
        h[a] || i.removeAttribute(a);
  }, v = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), R = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, C = (u, i, h) => {
    const c = i ? Array.from(i.childNodes) : [], y = u ? Array.from(u.childNodes) : [];
    let d = c.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    y.forEach(function(a, g) {
      const _ = c[g];
      if (h && _ && _.nodeType === 1 && _.tagName.indexOf("-") > -1)
        return;
      if (b(a, _), !_) {
        i && i.appendChild(a);
        return;
      }
      if (v(a) !== v(_)) {
        _.replaceWith(a);
        return;
      }
      const x = R(a);
      if (x && x !== R(_)) {
        _.textContent = x;
        return;
      }
      if (_.childNodes.length > 0 && a.childNodes.length < 1) {
        _.innerHTML = "";
        return;
      }
      if (_.childNodes.length < 1 && a.childNodes.length > 0) {
        const N = document.createDocumentFragment();
        C(a, N, !1), _.appendChild(N);
        return;
      }
      if (a.childNodes.length > 0) {
        C(a, _, !0);
        return;
      }
    });
  };
  return {
    html: (u, ...i) => {
      let h = "";
      const {
        length: c
      } = u;
      for (let d = 1; d < c; d++) {
        const a = i[d - 1];
        let g = !1;
        if (h += u[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (_, x, N) => `${t}${d - 1}=${N || '"'}${x}${N ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(a):
            case a instanceof DocumentFragment: {
              h += `<!--${l}${d - 1}-->`;
              break;
            }
            case (typeof a == "object" && a !== null): {
              "html" in a && (h += a.html);
              break;
            }
            default:
              h += a;
          }
      }
      h += u[c - 1];
      const y = E(h.trim());
      return T(y, i), D(y, i), y;
    },
    render: (u, i) => {
      u && !u.children.length ? (u.innerHTML = "", u.appendChild(i)) : C(i, u, !1), o.forEach((h) => {
        h();
      }), o = [];
    }
  };
})();
class Q {
  constructor(e, t) {
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
const de = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, q = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, fe = (s, e) => {
  var t, r, l, n, o, X, p, j, T;
  if (s = {
    ...de,
    ...s
  }, s.styles = s.styles.toString(), s.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, s.styles && (M.globalStyles.replace(s.styles), M.globalStyleTag = q(s.styles, document.head));
  else if (s.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      P(this, o);
      P(this, p);
      P(this, t, void 0);
      P(this, r, void 0);
      P(this, l, void 0);
      m(this, "renderCount", 0);
      P(this, n, new Y());
      if (ne)
        L(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = M.getComputedCss(s.styles, s.standalone);
      else {
        L(this, r, this);
        const b = s.styles.replaceAll(":host", s.selector);
        L(this, l, q(b, document.head));
      }
      F(this, o, X).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = w(this, t).render();
      typeof b == "string" ? w(this, r).innerHTML = ce(b) : he(w(this, r), b);
    }
    setProps(b) {
      var v, R;
      for (const [C, A] of Object.entries(b))
        e.observedProperties.find((H) => H === C) && (w(this, t)[C] = A);
      (R = (v = w(this, t)).onPropertiesChanged) == null || R.call(v);
    }
    getInstance() {
      return w(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, v, R, C;
      (v = (b = w(this, t)).beforeMount) == null || v.call(b), this.update(), (C = (R = w(this, t)).mount) == null || C.call(R), F(this, p, j).call(this, "bindprops", {
        setProps: (A) => {
          this.setProps(A);
        }
      }, !1), w(this, n).add(G(this, "refresh_component", () => {
        var A, H;
        (H = (A = w(this, t)).mount) == null || H.call(A);
      }));
    }
    attributeChangedCallback(b, v, R) {
      var C, A;
      (A = (C = w(this, t)).onAttributesChanged) == null || A.call(C, b, v, R);
    }
    disconnectedCallback() {
      var b, v, R;
      this.renderCount = 1, (v = (b = w(this, t)).unmount) == null || v.call(b), (R = w(this, l)) == null || R.remove(), w(this, n).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), l = new WeakMap(), n = new WeakMap(), o = new WeakSet(), X = function() {
    const b = new Q(this, w(this, r));
    b.update = () => {
      this.update();
    }, b.emitEvent = (v, R) => {
      F(this, p, j).call(this, v, R);
    }, L(this, t, K(ue(this, e), s.deps, b));
  }, p = new WeakSet(), j = function(b, v) {
    const R = new CustomEvent(b, {
      detail: v
    });
    this.dispatchEvent(R);
  }, T));
}, pe = {
  deps: []
}, me = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || fe(s, e);
}, Z = (s = {}) => (e) => {
  if (s = {
    ...pe,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = K(e, s.deps);
  U.register(e, t);
}, be = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", l = [...Array.from(s.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? l[0] : l;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class ge {
  constructor(e, t) {
    m(this, "_initialValues");
    m(this, "_controls");
    m(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = e, this._controls = t;
  }
  get errors() {
    return this._errors;
  }
  get valid() {
    return this._checkValidity(), !this._errors.size;
  }
  get value() {
    const e = {};
    for (const [t, r] of Object.entries(this._controls))
      e[t] = r.value;
    return e;
  }
  get(e) {
    return this._controls[e];
  }
  reset(e = {}) {
    for (const t in this._controls)
      this._controls[t].value = e[t] || this._initialValues[t];
    return this._errors.clear(), this;
  }
  _checkValidity() {
    this._errors.clear();
    for (const e in this._controls) {
      const t = this._controls[e].value, r = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const l of r) {
        const n = l(t);
        n !== null && (this._errors.has(e) ? (this._errors.set(e, {
          ...this._errors.get(e),
          ...n
        }), this._controls[e].errors = {
          ...this._controls[e].errors,
          ...n
        }) : (this._errors.set(e, n), this._controls[e].errors = n));
      }
    }
  }
}
const Re = (s) => {
  const e = {}, t = {};
  for (const [o, f] of Object.entries(s)) {
    const p = Array.isArray(f) ? f : [f];
    e[o] = {
      value: p.shift(),
      validators: p
    }, t[o] = e[o].value;
  }
  const r = new ge(t, e);
  return [r, (o) => (f) => {
    const p = be(f.target);
    r.get(o).value = p;
  }, () => r.reset()];
};
class Se {
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
const O = class {
  static checkParams(e, t) {
    let r = 0;
    const l = {}, n = t.paramCount;
    for (let o = 0; o < e.length; o++) {
      const f = t.params[o];
      f.indexOf(":") >= 0 && (l[f.split(":")[1]] = e[o].split("?")[0], r += 1);
    }
    return r === n ? l : {};
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
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = O.getParamCount(t.params), O.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of O.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = O.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let S = O;
m(S, "routeList", []), m(S, "isHistoryBasedRouting", !0);
function _e(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class I {
  constructor() {
    m(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    m(this, "_template", new ae(""));
    m(this, "_navigationEndEvent", new J());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var l = t.pushState;
      t.pushState = function(...n) {
        l.apply(t, n), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), G(window, e, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute;
  }
  navigateTo(e = "/", t) {
    let r = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : S.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = e.split("/").filter((o) => o.length > 0), l = S.routeList.filter((o) => {
      if (o.params.length === r.length && _e(o.url, e))
        return o;
      if (o.url === e)
        return o;
    }), n = l.length > 0 ? l[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, W(n.canActivate()).subscribe((o) => {
      if (!o)
        return;
      const f = S.checkParams(r, n);
      if (Object.keys(f).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(f));
        let p = [];
        S.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p);
        const E = (T) => {
          T.isRegistered = !0, this._template.next(T.template), this._navigationEndEvent.next();
        };
        n.isRegistered ? E(n) : n.templatePath ? W(n.templatePath()).subscribe(() => {
          E(n);
        }) : n.redirectTo && this.navigateTo(n.redirectTo, t);
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
Z()(I);
const Ee = () => {
  class s {
    constructor(t, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new Y());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t ? this._template = t : this.refreshRouterOutletComponent();
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    refreshRouterOutletComponent() {
      if (this.renderer.shadowRoot.children.length) {
        const t = new CustomEvent("refresh_component", {
          detail: {},
          bubbles: !1,
          cancelable: !1,
          composed: !1
        });
        this.renderer.shadowRoot.children[0].dispatchEvent(t);
      }
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], $(t);
      } else
        return $``;
    }
  }
  me({
    selector: "router-outlet",
    deps: [I, Q]
  })(s);
};
class ye {
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
    if (r && (S.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const l of e)
        S.formatRoute(l);
      t ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [I]
})(ye);
export {
  ae as BehaviourSubjectObs,
  me as Component,
  Z as Injectable,
  Q as Renderer,
  ye as Router,
  J as SubjectObs,
  Y as Subscriptions,
  Se as Validators,
  G as fromEvent,
  $ as html,
  ve as promisify,
  Ee as registerRouterComponent,
  he as render,
  Re as useFormFields,
  W as wrapIntoObservable
};
