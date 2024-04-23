var it = Object.defineProperty;
var ot = (s, t, e) => t in s ? it(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var m = (s, t, e) => (ot(s, typeof t != "symbol" ? t + "" : t, e), e), W = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var y = (s, t, e) => (W(s, t, "read from private field"), e ? e.call(s) : t.get(s)), L = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, O = (s, t, e, r) => (W(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var $ = (s, t, e) => (W(s, t, "access private method"), e);
var M, z;
const Y = new (z = class {
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
    if (!y(this, M).get(s))
      y(this, M).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = y(this, M).get(s);
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
}, M = new WeakMap(), z)(), at = (s) => !!s && typeof s.subscribe == "function", G = (s) => !!s && typeof s.then == "function", K = (s) => {
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
}), B = () => Math.random().toString(36).substring(2);
class X {
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
    const e = B();
    return this._callbackCollection[e] = t, () => this.unsubscribe(e);
  }
  next(t) {
    for (const e in this._callbackCollection)
      this._callbackCollection[e](t);
  }
}
class Q extends X {
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
class Z {
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
const U = (s) => at(s) ? s : G(s) ? ut(Promise.resolve(s)) : lt(s), F = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), ht = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (f) => {
    const b = f.querySelectorAll("script");
    for (const C of b)
      C.remove();
  }, r = (f, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (b.includes("javascript:") || b.includes("data:")) || f.startsWith("on"))
      return !0;
  }, l = (f) => {
    const b = f.attributes;
    for (const {
      name: C,
      value: T
    } of b)
      r(C, T) && f.removeAttribute(C);
  }, d = (f) => {
    const b = f.children;
    for (const C of b)
      l(C), d(C);
  }, a = t();
  return e(a), d(a), a.innerHTML;
}, dt = (s, t) => {
  const e = K(t), r = () => ({
    get(l, d) {
      const a = Object.prototype.toString.call(l[d]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in l[d]) ? new Proxy(l[d], r()) : l[d];
    },
    set(l, d, a) {
      return l[d] = a, s(), !0;
    }
  });
  return class extends t {
    constructor(...l) {
      return super(...l), l.forEach((d, a) => {
        e[a] && e[a] !== "undefined" && (this[e[a]] = d);
      }), new Proxy(this, r());
    }
  };
}, V = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const a of t)
      a.prototype.__metadata__.name !== "RENDERER" ? r.push(Y.getService(a)) : r.push(e);
    const l = K(s), d = new s(...r);
    return t.forEach((a, f) => {
      d[l[f]] = r[f];
    }), d;
  } else
    return new s();
}, tt = /* @__PURE__ */ Object.create(null);
let D = null;
function ft(s, t) {
  const e = D;
  let r;
  D = B(), tt[D] = s;
  try {
    t();
  } finally {
    r = D, D = e;
  }
  return r;
}
function pt(s, t) {
  const e = ft(s, t);
  return function() {
    delete tt[e];
  };
}
const I = new class {
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
  html: Et,
  render: gt
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, l = "insertNode", d = /^insertNode([^ ]+)/;
  let a = [], f = [];
  const b = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const c = (u) => i[u] || u;
    return o = ((u) => u.replace(/[&<>\(\)]/g, c))(o), JSON.parse(o);
  }, C = (n, i) => {
    const o = n.options, c = Array.isArray(i) ? i : [i];
    let g, u, h = o.length;
    for (; h--; ) {
      u = o[h];
      const v = u.getAttribute("value") ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (u.selected = c.indexOf(v) > -1) && (g = !0);
    }
    g || (n.selectedIndex = -1);
  }, T = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, P = (n, i, o) => {
    const c = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const g = new CustomEvent("bindprops", {
            detail: {
              props: i
            },
            bubbles: !1
          });
          n.dispatchEvent(g);
        }
      });
    };
    n[o] = JSON.stringify(i), f.push(c);
  }, p = (n, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const c = o.attrs;
        for (const g in c)
          p(n, g, c[g]);
        break;
      }
      case /^on+/.test(i): {
        const c = i.slice(2).toLowerCase();
        n.removeEventListener(c, o), n.addEventListener(c, o);
        break;
      }
      case /ref/.test(i): {
        const c = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: n,
          fn: o
        });
        a.push(c);
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(i, b(o));
        break;
      }
      case /class/.test(i): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? C(n, o) : n.value = b(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? n.setAttribute(i, o) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, b(o));
    }
  }, w = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let c = o.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const g = Array.from(c.attributes).filter((u) => r.test(u.nodeName));
        for (const {
          nodeName: u,
          nodeValue: h
        } of g) {
          const v = r.exec(u)[1];
          p(c, h, i[v]), c.removeAttribute(u);
        }
      }
      c = o.nextNode();
    }
  }, R = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let c = o.nextNode(), g;
    for (; c; ) {
      if (g = d.exec(c.data)) {
        const u = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        c.replaceWith(...u), o.currentNode = n;
      }
      c = o.nextNode();
    }
  }, E = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = n.attributes, c = i.attributes, g = i.getAttribute("data-preserve-attributes"), u = g && g === "true";
    for (const {
      name: h,
      value: v
    } of o)
      (!c[h] || c[h] !== v) && i.setAttribute(h, v);
    if (!u)
      for (const {
        name: h
      } of c)
        o[h] || i.removeAttribute(h);
    if (["input", "textarea"].includes(i.tagName.toLowerCase()) && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const h = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), v = Object.getOwnPropertySymbols(i).find((x) => x.description === "input"), _ = h ? n[h] : "", k = v ? i[v] : "";
      _ && k && _ !== k && P(i, JSON.parse(_), v);
    }
  }, A = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), N = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, j = (n, i, o) => {
    const c = i ? Array.from(i.childNodes) : [], g = n ? Array.from(n.childNodes) : [];
    let u = c.length - g.length;
    if (u > 0)
      for (; u > 0; u--)
        c[c.length - u].parentNode.removeChild(c[c.length - u]);
    g.forEach(function(h, v) {
      const _ = c[v];
      if (E(h, _), o && _ && _.nodeType === 1 && _.tagName.indexOf("-") > -1)
        return;
      if (!_) {
        i && i.appendChild(h);
        return;
      }
      if (A(h) !== A(_)) {
        _.replaceWith(h);
        return;
      }
      const k = N(h);
      if (k && k !== N(_)) {
        _.textContent = k;
        return;
      }
      if (_.childNodes.length > 0 && h.childNodes.length < 1) {
        _.innerHTML = "";
        return;
      }
      if (_.childNodes.length < 1 && h.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        j(h, x, !1), _.appendChild(x);
        return;
      }
      if (h.childNodes.length > 0) {
        j(h, _, !0);
        return;
      }
    });
  };
  return {
    html: (n, ...i) => {
      let o = "";
      const {
        length: c
      } = n;
      for (let u = 1; u < c; u++) {
        const h = i[u - 1];
        let v = !1;
        if (o += n[u - 1], s.test(o) && t.test(o) && (o = o.replace(s, (_, k, x) => `${e}${u - 1}=${x || '"'}${k}${x ? "" : '"'}`), v = !0), !v)
          switch (!0) {
            case Array.isArray(h):
            case h instanceof DocumentFragment: {
              o += `<!--${l}${u - 1}-->`;
              break;
            }
            case (typeof h == "object" && h !== null): {
              "attrs" in h && (o += `${e}${u - 1}="attrs"`);
              break;
            }
            default:
              o += h || "";
          }
      }
      o += n[c - 1];
      const g = T(o.trim());
      return w(g, i), R(g, i), g;
    },
    render: (n, i) => {
      n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : j(i, n, !1), a.forEach((o) => {
        o();
      }), a = [], f.forEach((o) => {
        o();
      }), f = [];
    }
  };
})();
class et {
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
const bt = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, J = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, mt = async (s, t) => {
  var e, r, l, d, a, st, b, rt, T;
  if (s = {
    ...bt,
    ...s
  }, G(s.styles)) {
    const P = await s.styles;
    s.styles = P.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !I.isRootNodeSet)
    I.isRootNodeSet = !0, s.styles && (I.globalStyles.replace(s.styles), I.globalStyleTag = J(s.styles, document.head));
  else if (s.root && I.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      L(this, a);
      L(this, b);
      L(this, e, void 0);
      L(this, r, void 0);
      L(this, l, void 0);
      L(this, d, new Z());
      m(this, "renderCount", 0);
      if (s.shadowDomEncapsulation && ct)
        O(this, r, this.attachShadow({
          mode: "open"
        })), y(this, r).adoptedStyleSheets = I.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const p = B();
        this.setAttribute("data-did", p);
        const w = s.styles.replaceAll(":host", `${s.selector}[data-did='${p}']`);
        !s.root && w && O(this, l, J(w, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), $(this, a, st).call(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const p = y(this, e).render();
      typeof p == "string" ? y(this, r).innerHTML = ht(p) : gt(y(this, r), p);
    }
    setProps(p) {
      var w, R;
      for (const [E, A] of Object.entries(p))
        t.observedProperties.find((N) => N === E) && (y(this, e)[E] = A);
      (R = (w = y(this, e)).onPropertiesChanged) == null || R.call(w);
    }
    getInstance() {
      return y(this, e);
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
      var p, w, R, E;
      y(this, d).add(F(this, "bindprops", (A) => {
        const N = A.detail.props;
        N && this.setProps(N);
      })), y(this, d).add(F(this, "refresh_component", () => {
        this.update();
      })), (w = (p = y(this, e)).beforeMount) == null || w.call(p), this.update(), (E = (R = y(this, e)).mount) == null || E.call(R);
    }
    attributeChangedCallback(p, w, R) {
      var E, A;
      (A = (E = y(this, e)).onAttributesChanged) == null || A.call(E, p, w, R);
    }
    disconnectedCallback() {
      var p, w, R;
      this.renderCount = 0, (w = (p = y(this, e)).unmount) == null || w.call(p), (R = y(this, l)) == null || R.remove(), y(this, d).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), l = new WeakMap(), d = new WeakMap(), a = new WeakSet(), st = function() {
    const p = new et(this, y(this, r));
    p.update = () => {
      this.update();
    }, p.emitEvent = (w, R) => {
      $(this, b, rt).call(this, w, R);
    }, y(this, d).add(pt(this.setRenderIntoQueue, () => {
      O(this, e, V(dt(this.setRenderIntoQueue, t), s.deps, p));
    }));
  }, b = new WeakSet(), rt = function(p, w) {
    const R = new CustomEvent(p, {
      detail: w
    });
    this.dispatchEvent(R);
  }, T));
}, yt = {
  deps: []
}, wt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || mt(s, t);
}, nt = (s = {}) => (t) => {
  if (s = {
    ...yt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = V(t, s.deps);
  Y.register(t, e);
}, H = class {
  static checkParams(t, e) {
    let r = 0;
    const l = {}, d = e.paramCount;
    for (let a = 0; a < t.length; a++) {
      const f = e.params[a];
      f.indexOf(":") >= 0 && (l[f.split(":")[1]] = t[a].split("?")[0], r += 1);
    }
    return r === d ? l : {};
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
m(S, "routeList", []), m(S, "isHistoryBasedRouting", !0);
function _t(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class q {
  constructor() {
    m(this, "_currentRoute", new Q({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    m(this, "_template", new Q(""));
    m(this, "_navigationEndEvent", new X());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var l = e.pushState;
      e.pushState = function(...d) {
        l.apply(e, d), r();
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
    const r = {}, l = t.split("/").filter((f) => f.length > 0), d = S.routeList.filter((f) => {
      if (f.params.length === l.length && _t(f.url, t))
        return f;
      if (f.url === t)
        return f;
    }), a = d.length > 0 ? d[0] : null;
    a && (r.path = t, r.state = {
      ...e || {}
    }, U(a.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const b = S.checkParams(l, a);
      if (Object.keys(b).length > 0 || t) {
        r.routeParams = new Map(Object.entries(b));
        let C = [];
        S.isHistoryBasedRouting ? C = new URLSearchParams(window.location.search).entries() : C = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(C);
        const T = (P) => {
          P.isRegistered = !0, this._currentRoute.next(r), this._template.next(P.template), this._navigationEndEvent.next();
        };
        a.isRegistered ? T(a) : a.templatePath ? U(a.templatePath()).subscribe(() => {
          T(a);
        }) : a.redirectTo && this.navigateTo(a.redirectTo, e);
      } else
        this.navigateTo(a.redirectTo, e);
    }));
  }
}
nt()(q);
const Tt = () => {
  class s {
    constructor(e, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new Z());
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
      return this._template;
    }
  }
  wt({
    selector: "router-outlet",
    deps: [q, et]
  })(s);
};
class St {
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
      for (const l of t)
        S.formatRoute(l);
      e ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
nt({
  deps: [q]
})(St);
export {
  St as Router,
  _t as matchPath,
  Tt as registerRouterComponent
};
