var ee = Object.defineProperty;
var te = (s, e, t) => e in s ? ee(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var m = (s, e, t) => (te(s, typeof e != "symbol" ? e + "" : e, t), t), F = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var w = (s, e, t) => (F(s, e, "read from private field"), t ? t.call(s) : e.get(s)), N = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, k = (s, e, t, r) => (F(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var j = (s, e, t) => (F(s, e, "access private method"), t);
var L, B;
const U = new (B = class {
  constructor() {
    N(this, L, void 0);
    k(this, L, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!w(this, L).get(s))
      w(this, L).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = w(this, L).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, L, /* @__PURE__ */ new WeakMap());
  }
}, L = new WeakMap(), B)(), se = (s) => typeof s == "function", re = (s) => !!s && typeof s.subscribe == "function", ne = (s) => !!s && typeof s.then == "function", z = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, oe = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ie = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), ae = (s) => ({
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
class ce extends J {
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
const $ = (s) => re(s) ? s : ne(s) ? ae(Promise.resolve(s)) : ie(s), G = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), le = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const p = f.querySelectorAll("script");
    for (const E of p)
      E.remove();
  }, r = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, a = (f) => {
    const p = f.attributes;
    for (const {
      name: E,
      value: T
    } of p)
      r(E, T) && f.removeAttribute(E);
  }, n = (f) => {
    const p = f.children;
    for (const E of p)
      a(E), n(E);
  }, o = e();
  return t(o), n(o), o.innerHTML;
}, ue = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, he = (s, e) => {
  const t = z(e), r = () => ({
    get(a, n) {
      const o = Object.prototype.toString.call(a[n]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in a[n]) ? new Proxy(a[n], r()) : a[n];
    },
    set(a, n, o) {
      return a[n] = o, ++s.renderCount, ue(s), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((n, o) => {
        t[o] && t[o] !== "undefined" && (this[t[o]] = n);
      }), new Proxy(this, r());
    }
  };
}, Re = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, K = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const o of e)
      o.prototype.__metadata__.name !== "RENDERER" ? r.push(U.getService(o)) : r.push(t);
    const a = z(s), n = new s(...r);
    return e.forEach((o, f) => {
      n[a[f]] = r[f];
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
  html: W,
  render: de
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, a = "insertNode", n = /^insertNode([^ ]+)/;
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
    const l = (d) => i[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, l))(h), JSON.parse(h);
  }, p = (u, i) => {
    const h = u.options, l = Array.isArray(i) ? i : [i];
    let y, d, c = h.length;
    for (; c--; ) {
      d = h[c];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = l.indexOf(g) > -1) && (y = !0);
    }
    y || (u.selectedIndex = -1);
  }, E = (u) => {
    const i = document.createElement("template");
    return i.innerHTML = u, i.content;
  }, T = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let l = h.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const y = Array.from(l.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: c
        } of y) {
          const g = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(c): {
              const _ = c.slice(2).toLowerCase();
              l.removeEventListener(_, i[g]), _ !== "bindprops" ? l.addEventListener(_, i[g]) : l.addEventListener(_, (P) => {
                P.detail.setProps(i[g]());
              });
              break;
            }
            case /ref/.test(c): {
              const _ = ((P) => {
                const x = P;
                return () => {
                  x.isConnected && i[g](x);
                };
              })(l);
              o.push(_);
              break;
            }
            case /^data-+/.test(c):
            case /^aria-+/.test(c): {
              l.setAttribute(c, f(i[g]));
              break;
            }
            case /class/.test(c): {
              i[g] ? l.classList.add(...i[g].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(c): {
              l.nodeName.toLowerCase() === "select" ? p(l, i[g]) : l.value = f(i[g]);
              break;
            }
            case /disabled/.test(c):
            case /checked/.test(c): {
              i[g] ? l.setAttribute(c, i[g]) : l.removeAttribute(c);
              break;
            }
            default:
              l.setAttribute(c, f(i[g]));
          }
          l.removeAttribute(d);
        }
      }
      l = h.nextNode();
    }
  }, D = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), y;
    for (; l; ) {
      if (y = n.exec(l.data)) {
        const d = Array.isArray(i[y[1]]) ? i[y[1]] : [i[y[1]]];
        l.replaceWith(...d), h.currentNode = u;
      }
      l = h.nextNode();
    }
  }, b = (u, i) => {
    if (!u || !i || u.nodeType !== 1 || i.nodeType !== 1)
      return;
    const h = u.attributes, l = i.attributes, y = i.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: c,
      value: g
    } of h)
      (!l[c] || l[c] !== g) && i.setAttribute(c, g);
    if (!d)
      for (const {
        name: c
      } of l)
        h[c] || i.removeAttribute(c);
  }, v = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), S = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, C = (u, i, h) => {
    const l = i ? Array.from(i.childNodes) : [], y = u ? Array.from(u.childNodes) : [];
    let d = l.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        l[l.length - d].parentNode.removeChild(l[l.length - d]);
    y.forEach(function(c, g) {
      const _ = l[g];
      if (h && _ && _.nodeType === 1 && _.tagName.indexOf("-") > -1)
        return;
      if (b(c, _), !_) {
        i && i.appendChild(c);
        return;
      }
      if (v(c) !== v(_)) {
        _.replaceWith(c);
        return;
      }
      const P = S(c);
      if (P && P !== S(_)) {
        _.textContent = P;
        return;
      }
      if (_.childNodes.length > 0 && c.childNodes.length < 1) {
        _.innerHTML = "";
        return;
      }
      if (_.childNodes.length < 1 && c.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        C(c, x, !1), _.appendChild(x);
        return;
      }
      if (c.childNodes.length > 0) {
        C(c, _, !0);
        return;
      }
    });
  };
  return {
    html: (u, ...i) => {
      let h = "";
      const {
        length: l
      } = u;
      for (let d = 1; d < l; d++) {
        const c = i[d - 1];
        let g = !1;
        if (h += u[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (_, P, x) => `${t}${d - 1}=${x || '"'}${P}${x ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(c):
            case c instanceof DocumentFragment: {
              h += `<!--${a}${d - 1}-->`;
              break;
            }
            case (typeof c == "object" && c !== null): {
              "html" in c && (h += c.html);
              break;
            }
            default:
              h += c;
          }
      }
      h += u[l - 1];
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
const fe = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, q = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, pe = (s, e) => {
  var t, r, a, n, o, X, p, V, T;
  if (s = {
    ...fe,
    ...s
  }, s.styles = s.styles.toString(), s.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, s.styles && (M.globalStyles.replace(s.styles), M.globalStyleTag = q(s.styles, document.head));
  else if (s.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      N(this, o);
      N(this, p);
      N(this, t, void 0);
      N(this, r, void 0);
      N(this, a, void 0);
      m(this, "renderCount", 0);
      N(this, n, new Y());
      if (oe)
        k(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = M.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const b = s.styles.replaceAll(":host", s.selector);
        k(this, a, q(b, document.head));
      }
      j(this, o, X).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = w(this, t).render();
      typeof b == "string" ? w(this, r).innerHTML = le(b) : de(w(this, r), b);
    }
    setProps(b) {
      var v, S;
      for (const [C, A] of Object.entries(b))
        e.observedProperties.find((H) => H === C) && (w(this, t)[C] = A);
      (S = (v = w(this, t)).onPropertiesChanged) == null || S.call(v);
    }
    getInstance() {
      return w(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, v, S, C;
      (v = (b = w(this, t)).beforeMount) == null || v.call(b), this.update(), (C = (S = w(this, t)).mount) == null || C.call(S), j(this, p, V).call(this, "bindprops", {
        setProps: (A) => {
          this.setProps(A);
        }
      }, !1), w(this, n).add(G(this, "refresh_component", () => {
        var A, H;
        (H = (A = w(this, t)).mount) == null || H.call(A);
      }));
    }
    attributeChangedCallback(b, v, S) {
      var C, A;
      (A = (C = w(this, t)).onAttributesChanged) == null || A.call(C, b, v, S);
    }
    disconnectedCallback() {
      var b, v, S;
      this.renderCount = 1, (v = (b = w(this, t)).unmount) == null || v.call(b), (S = w(this, a)) == null || S.remove(), w(this, n).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), a = new WeakMap(), n = new WeakMap(), o = new WeakSet(), X = function() {
    const b = new Q(this, w(this, r));
    b.update = () => {
      this.update();
    }, b.emitEvent = (v, S) => {
      j(this, p, V).call(this, v, S);
    }, k(this, t, K(he(this, e), s.deps, b));
  }, p = new WeakSet(), V = function(b, v) {
    const S = new CustomEvent(b, {
      detail: v
    });
    this.dispatchEvent(S);
  }, T));
}, me = {
  deps: []
}, be = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || pe(s, e);
}, Z = (s = {}) => (e) => {
  if (s = {
    ...me,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = K(e, s.deps);
  U.register(e, t);
}, ge = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", a = [...Array.from(s.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
class _e {
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
      for (const a of r) {
        const n = a(t);
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
const Ee = (s) => {
  const e = {}, t = {};
  for (const [o, f] of Object.entries(s)) {
    const p = Array.isArray(f) ? f : [f];
    e[o] = {
      value: p.shift(),
      validators: p
    }, t[o] = e[o].value;
  }
  const r = new _e(t, e);
  return [r, (o) => (f) => {
    const p = ge(f.target);
    r.get(o).value = p;
  }, () => r.reset()];
}, ye = (s) => {
  let e = s;
  return [e, (r) => {
    let a;
    se(r) ? a = r(e) : a = r, Object.assign(e, a);
  }];
}, Ce = () => {
  const s = window.location.search, e = Object.fromEntries(new URLSearchParams(s).entries()), [t, r] = ye(e);
  return [t, (n) => {
    const o = Object.fromEntries(n.entries());
    delete o["[object Object]"], r(o), window.history.pushState(null, "", `${location.pathname}?${new URLSearchParams(o).toString()}`);
  }];
};
class Ae {
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
    const a = {}, n = t.paramCount;
    for (let o = 0; o < e.length; o++) {
      const f = t.params[o];
      f.indexOf(":") >= 0 && (a[f.split(":")[1]] = e[o].split("?")[0], r += 1);
    }
    return r === n ? a : {};
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
let R = O;
m(R, "routeList", []), m(R, "isHistoryBasedRouting", !0);
function we(s, e) {
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
    m(this, "_template", new ce(""));
    m(this, "_navigationEndEvent", new J());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = R.isHistoryBasedRouting ? "popstate" : "hashchange";
    return R.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var a = t.pushState;
      t.pushState = function(...n) {
        a.apply(t, n), r();
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
    let r = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : R.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = e.split("/").filter((o) => o.length > 0), a = R.routeList.filter((o) => {
      if (o.params.length === r.length && we(o.url, e))
        return o;
      if (o.url === e)
        return o;
    }), n = a.length > 0 ? a[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, $(n.canActivate()).subscribe((o) => {
      if (!o)
        return;
      const f = R.checkParams(r, n);
      if (Object.keys(f).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(f));
        let p = [];
        R.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p);
        const E = (T) => {
          T.isRegistered = !0, this._template.next(T.template), this._navigationEndEvent.next();
        };
        n.isRegistered ? E(n) : n.templatePath ? $(n.templatePath()).subscribe(() => {
          E(n);
        }) : n.redirectTo && this.navigateTo(n.redirectTo, t);
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
Z()(I);
const Te = () => {
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
      const t = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
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
        return t.raw = [`${this._template}`], W(t);
      } else
        return W``;
    }
  }
  be({
    selector: "router-outlet",
    deps: [I, Q]
  })(s);
};
class ve {
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
    if (r && (R.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const a of e)
        R.formatRoute(a);
      t ? R.preloadRoutes() : R.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [I]
})(ve);
export {
  ce as BehaviourSubjectObs,
  be as Component,
  Z as Injectable,
  Q as Renderer,
  ve as Router,
  J as SubjectObs,
  Y as Subscriptions,
  Ae as Validators,
  G as fromEvent,
  W as html,
  Re as promisify,
  Te as registerRouterComponent,
  de as render,
  Ee as useFormFields,
  Ce as useSearchParams,
  ye as useState,
  $ as wrapIntoObservable
};
