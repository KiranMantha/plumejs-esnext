var ct = Object.defineProperty;
var lt = (s, t, e) => t in s ? ct(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var m = (s, t, e) => (lt(s, typeof t != "symbol" ? t + "" : t, e), e), $ = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var g = (s, t, e) => ($(s, t, "read from private field"), e ? e.call(s) : t.get(s)), x = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, P = (s, t, e, n) => ($(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
var B = (s, t, e) => ($(s, t, "access private method"), e);
const ut = (s) => !!s && typeof s.subscribe == "function", X = (s) => !!s && typeof s.then == "function", Z = (s) => {
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
}), Q = () => Math.random().toString(36).substring(2);
class V {
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
    const e = Q();
    return this._callbackCollection[e] = t, () => this.unsubscribe(e);
  }
  next(t) {
    for (const e in this._callbackCollection)
      this._callbackCollection[e](t);
  }
}
class z extends V {
  constructor(e) {
    super();
    m(this, "_initialValue");
    this._initialValue = e;
  }
  subscribe(e) {
    const n = super.subscribe(e);
    return super.next(this._initialValue), n;
  }
  next(e) {
    this._initialValue = e, super.next(e);
  }
}
class tt {
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
const K = (s) => ut(s) ? s : X(s) ? ft(Promise.resolve(s)) : dt(s), q = (s, t, e, n = !1) => (s.addEventListener(t, e, n), () => {
  s.removeEventListener(t, e, n);
}), pt = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (l) => {
    const _ = l.querySelectorAll("script");
    for (const w of _)
      w.remove();
  }, n = (l, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(l) && (_.includes("javascript:") || _.includes("data:")) || l.startsWith("on"))
      return !0;
  }, h = (l) => {
    const _ = l.attributes;
    for (const {
      name: w,
      value: L
    } of _)
      n(w, L) && l.removeAttribute(w);
  }, f = (l) => {
    const _ = l.children;
    for (const w of _)
      h(w), f(w);
  }, a = t();
  return e(a), f(a), a.innerHTML;
}, gt = (s, t) => {
  const e = Z(t), n = () => ({
    get(h, f) {
      const a = Object.prototype.toString.call(h[f]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in h[f]) ? new Proxy(h[f], n()) : h[f];
    },
    set(h, f, a) {
      return h[f] = a, s(), !0;
    }
  });
  return class extends t {
    constructor(...h) {
      return super(...h), h.forEach((f, a) => {
        e[a] && e[a] !== "undefined" && (this[e[a]] = f);
      }), new Proxy(this, n());
    }
  };
}, et = /* @__PURE__ */ Object.create(null);
let D = null;
function bt(s, t) {
  const e = D;
  let n;
  D = Q(), et[D] = s;
  try {
    t();
  } finally {
    n = D, D = e;
  }
  return n;
}
function mt(s, t) {
  const e = bt(s, t);
  return function() {
    delete et[e];
  };
}
var N, G;
const st = new (G = class {
  constructor() {
    x(this, N, void 0);
    P(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, t) {
    if (!g(this, N).get(s))
      g(this, N).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = g(this, N).get(s);
    if (t)
      return t;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    P(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), G)(), rt = (s, t, e) => {
  if (t.length > 0) {
    const n = [];
    for (const a of t)
      a.prototype.__metadata__.name !== "RENDERER" ? n.push(st.getService(a)) : n.push(e);
    const h = Z(s), f = new s(...n);
    return t.forEach((a, l) => {
      f[h[l]] = n[l];
    }), f;
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
      const n = new CSSStyleSheet();
      n.replace(s), t.push(n);
    }
    return t;
  }
}(), {
  html: xt,
  render: yt
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", n = /^attr([^ ]+)/, h = "insertNode", f = /^insertNode([^ ]+)/;
  let a = [], l = [];
  const _ = (r) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(r);
    const c = (d) => i[d] || d;
    return o = ((d) => d.replace(/[&<>\(\)]/g, c))(o), JSON.parse(o);
  }, w = (r, i) => {
    const o = r.options, c = Array.isArray(i) ? i : [i];
    let p, d, u = o.length;
    for (; u--; ) {
      d = o[u];
      const E = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(E) > -1) && (p = !0);
    }
    p || (r.selectedIndex = -1);
  }, L = (r) => {
    const i = document.createElement("template");
    return i.innerHTML = r, i.content;
  }, k = (r, i, o) => {
    const c = () => {
      setTimeout(() => {
        if (r.isConnected) {
          const p = new CustomEvent("bindprops", {
            detail: {
              props: i
            },
            bubbles: !1
          });
          r.dispatchEvent(p);
        }
      });
    };
    r[o] = JSON.stringify(i), l.push(c);
  }, H = (r, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const c = o.attrs;
        for (const p in c)
          H(r, p, c[p]);
        break;
      }
      case /^on+/.test(i): {
        const c = i.slice(2).toLowerCase();
        r.removeEventListener(c, o), r.addEventListener(c, o);
        break;
      }
      case /ref/.test(i): {
        const c = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: r,
          fn: o
        });
        a.push(c);
        break;
      }
      case /key/.test(i): {
        r[Symbol("key")] = o;
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? k(r, o, Symbol("input")) : r.setAttribute(i, _(o));
        break;
      }
      case /class/.test(i): {
        o ? r.classList.add(...o.split(" ")) : r.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        r.nodeName.toLowerCase() === "select" ? w(r, o) : r.value = _(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? r.setAttribute(i, o) : r.removeAttribute(i);
        break;
      }
      default:
        r.setAttribute(i, _(o));
    }
  }, b = (r, i) => {
    const o = document.createTreeWalker(r, NodeFilter.SHOW_ELEMENT, null);
    let c = o.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const p = Array.from(c.attributes).filter((d) => n.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: u
        } of p) {
          const E = n.exec(d)[1];
          H(c, u, i[E]), c.removeAttribute(d);
        }
      }
      c = o.nextNode();
    }
  }, R = (r, i) => {
    const o = document.createTreeWalker(r, NodeFilter.SHOW_COMMENT, null);
    let c = o.nextNode(), p;
    for (; c; ) {
      if (p = f.exec(c.data)) {
        const d = Array.isArray(i[p[1]]) ? i[p[1]] : [i[p[1]]];
        c.replaceWith(...d), o.currentNode = r;
      }
      c = o.nextNode();
    }
  }, y = (r, i) => {
    if (!r)
      return [null, ""];
    const o = Object.getOwnPropertySymbols(r).find((p) => p.description === i), c = o ? r[o] : "";
    return [o, c];
  }, T = (r, i) => {
    if (!r || !i || r.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = r.attributes, c = i.attributes, p = i.getAttribute("data-preserve-attributes"), d = p && p === "true";
    for (const {
      name: u,
      value: E
    } of o)
      (!c[u] || c[u] !== E) && i.setAttribute(u, E);
    if (!d)
      for (const {
        name: u
      } of c)
        o[u] || i.removeAttribute(u);
    if (["input", "textarea"].includes(i.tagName.toLowerCase()) && (i.value = r.value), i.tagName.indexOf("-") > -1 && r.tagName.indexOf("-") > -1) {
      const u = y(r, "input")[1], E = y(i, "input");
      u && E[1] && u !== E[1] && k(i, JSON.parse(u), E[0]);
    }
  }, C = (r) => r.nodeType === 3 ? "text" : r.nodeType === 8 ? "comment" : r.tagName.toLowerCase(), A = (r) => r.childNodes && r.childNodes.length > 0 ? null : r.textContent, F = (r, i, o) => {
    const c = i ? Array.from(i.childNodes) : [], p = r ? Array.from(r.childNodes) : [];
    let d = c.length - p.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    p.forEach(function(u, E) {
      const v = c[E], j = y(u, "key")[1], I = y(v, "key")[1];
      if (T(u, v), o && v && v.nodeType === 1 && v.tagName.indexOf("-") > -1)
        return;
      if (!v) {
        i && i.appendChild(u);
        return;
      }
      if (j && I && j !== I || C(u) !== C(v)) {
        v.replaceWith(u);
        return;
      }
      const W = A(u);
      if (W && W !== A(v)) {
        v.textContent = W;
        return;
      }
      if (v.childNodes.length > 0 && u.childNodes.length < 1) {
        v.innerHTML = "";
        return;
      }
      if (v.childNodes.length < 1 && u.childNodes.length > 0) {
        const J = document.createDocumentFragment();
        F(u, J, !1), v.appendChild(J);
        return;
      }
      if (u.childNodes.length > 0) {
        F(u, v, !0);
        return;
      }
    });
  };
  return {
    html: (r, ...i) => {
      let o = "";
      const {
        length: c
      } = r;
      for (let d = 1; d < c; d++) {
        const u = i[d - 1];
        let E = !1;
        if (o += r[d - 1], s.test(o) && t.test(o) && (o = o.replace(s, (v, j, I) => `${e}${d - 1}=${I || '"'}${j}${I ? "" : '"'}`), E = !0), !E)
          switch (!0) {
            case Array.isArray(u):
            case u instanceof DocumentFragment: {
              o += `<!--${h}${d - 1}-->`;
              break;
            }
            case (typeof u == "object" && u !== null): {
              "attrs" in u && (o += `${e}${d - 1}="attrs"`);
              break;
            }
            default:
              o += u || "";
          }
      }
      o += r[c - 1];
      const p = L(o.trim());
      return b(p, i), R(p, i), p;
    },
    render: (r, i) => {
      r && !r.children.length ? (r.innerHTML = "", r.appendChild(i)) : F(i, r, !1), a.forEach((o) => {
        o();
      }), a = [], l.forEach((o) => {
        o();
      }), l = [];
    }
  };
})();
class nt {
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
  shadowDomEncapsulation: !0
}, Y = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, wt = async (s, t) => {
  var e, n, h, f, a, l, it, w, ot, k;
  if (s = {
    ..._t,
    ...s
  }, X(s.styles)) {
    const H = await s.styles;
    s.styles = H.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, s.styles && (M.globalStyles.replace(s.styles), M.globalStyleTag = Y(s.styles, document.head));
  else if (s.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (k = class extends HTMLElement {
    constructor() {
      super();
      x(this, l);
      x(this, w);
      x(this, e, void 0);
      x(this, n, void 0);
      x(this, h, void 0);
      x(this, f, new tt());
      x(this, a, !1);
      m(this, "renderCount", 0);
      s.shadowDomEncapsulation && ht ? (P(this, a, !1), P(this, n, this.attachShadow({
        mode: "open"
      })), g(this, n).adoptedStyleSheets = M.getComputedCss(s.styles, s.standalone)) : (P(this, a, !0), P(this, n, this)), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), B(this, l, it).call(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const b = g(this, e).render();
      typeof b == "string" ? g(this, n).innerHTML = pt(b) : yt(g(this, n), b);
    }
    setProps(b) {
      var R, y;
      for (const [T, C] of Object.entries(b))
        t.observedProperties.find((A) => A === T) && (g(this, e)[T] = C);
      (y = (R = g(this, e)).onPropertiesChanged) == null || y.call(R);
    }
    getInstance() {
      return g(this, e);
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
      var b, R, y, T;
      if (g(this, a)) {
        const C = Q();
        this.setAttribute("data-did", C);
        const A = s.styles.replaceAll(":host", `${s.selector}[data-did='${C}']`);
        !s.root && A && P(this, h, Y(A, document.head));
      }
      g(this, f).add(q(this, "bindprops", (C) => {
        const A = C.detail.props;
        A && this.setProps(A);
      })), g(this, f).add(q(this, "refresh_component", () => {
        this.update();
      })), (R = (b = g(this, e)).beforeMount) == null || R.call(b), this.update(), (T = (y = g(this, e)).mount) == null || T.call(y);
    }
    attributeChangedCallback(b, R, y) {
      var T, C;
      (C = (T = g(this, e)).onAttributesChanged) == null || C.call(T, b, R, y);
    }
    disconnectedCallback() {
      var b, R, y;
      this.renderCount = 0, (R = (b = g(this, e)).unmount) == null || R.call(b), (y = g(this, h)) == null || y.remove(), g(this, f).unsubscribe();
    }
  }, e = new WeakMap(), n = new WeakMap(), h = new WeakMap(), f = new WeakMap(), a = new WeakMap(), l = new WeakSet(), it = function() {
    const b = new nt(this, g(this, n));
    b.update = () => {
      this.update();
    }, b.emitEvent = (R, y) => {
      B(this, w, ot).call(this, R, y);
    }, g(this, f).add(mt(this.setRenderIntoQueue, () => {
      P(this, e, rt(gt(this.setRenderIntoQueue, t), s.deps, b));
    }));
  }, w = new WeakSet(), ot = function(b, R) {
    const y = new CustomEvent(b, {
      detail: R
    });
    this.dispatchEvent(y);
  }, k));
}, St = {
  deps: []
}, Rt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || wt(s, t);
}, at = (s = {}) => (t) => {
  if (s = {
    ...St,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((n) => n.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = rt(t, s.deps);
  st.register(t, e);
}, O = class {
  static checkParams(t, e) {
    let n = 0;
    const h = {}, f = e.paramCount;
    for (let a = 0; a < t.length; a++) {
      const l = e.params[a];
      l.indexOf(":") >= 0 && (h[l.split(":")[1]] = t[a].split("?")[0], n += 1);
    }
    return n === f ? h : {};
  }
  static getParamCount(t) {
    let e = 0;
    return t.forEach((n) => {
      n.indexOf(":") >= 0 && (e += 1);
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
    if (e.params = t.path.split("/").filter((n) => n.length > 0), e.url = t.path, e.template = "", e.redirectTo = t.redirectTo, t.template) {
      if (!t.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      e.template = t.template, e.templatePath = t.templatePath;
    }
    t.canActivate && (e.canActivate = t.canActivate), e.paramCount = O.getParamCount(e.params), O.routeList.push(e);
  }
  static preloadRoutes() {
    for (const t of O.routeList)
      t.templatePath && t.templatePath();
  }
  static preloadSelectedRoutes() {
    const t = O.routeList.filter((e) => e.preload === !0);
    for (const e of t)
      e.templatePath && e.templatePath();
  }
};
let S = O;
m(S, "routeList", []), m(S, "isHistoryBasedRouting", !0);
function vt(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class U {
  constructor() {
    m(this, "_currentRoute", new z({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    m(this, "_template", new z(""));
    m(this, "_navigationEndEvent", new V());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, n) {
      var h = e.pushState;
      e.pushState = function(...f) {
        h.apply(e, f), n();
      };
    }(window.history, this._registerOnHashChange.bind(this))), q(window, t, () => {
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
    let n = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    n = n || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), n === t ? this._navigateTo(t, e) : S.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const n = {}, h = t.split("/").filter((l) => l.length > 0), f = S.routeList.filter((l) => {
      if (l.params.length === h.length && vt(l.url, t))
        return l;
      if (l.url === t)
        return l;
    }), a = f.length > 0 ? f[0] : null;
    a && (n.path = t, n.state = {
      ...e || {}
    }, K(a.canActivate()).subscribe((l) => {
      if (!l)
        return;
      const _ = S.checkParams(h, a);
      if (Object.keys(_).length > 0 || t) {
        n.routeParams = new Map(Object.entries(_));
        let w = [];
        S.isHistoryBasedRouting ? w = new URLSearchParams(window.location.search).entries() : w = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], n.queryParams = new Map(w);
        const L = (k) => {
          k.isRegistered = !0, this._currentRoute.next(n), this._template.next(k.template), this._navigationEndEvent.next();
        };
        a.isRegistered ? L(a) : a.templatePath ? K(a.templatePath()).subscribe(() => {
          L(a);
        }) : a.redirectTo && this.navigateTo(a.redirectTo, e);
      } else
        this.navigateTo(a.redirectTo, e);
    }));
  }
}
at()(U);
const Pt = () => {
  class s {
    constructor(e, n) {
      m(this, "_template", "");
      m(this, "_subscriptions", new tt());
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
  Rt({
    selector: "router-outlet",
    deps: [U, nt]
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
  registerRoutes(t, e = !1, n = !1) {
    if (n && (S.isHistoryBasedRouting = !n), Array.isArray(t)) {
      for (const h of t)
        S.formatRoute(h);
      e ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
at({
  deps: [U]
})(Et);
export {
  Et as Router,
  vt as matchPath,
  Pt as registerRouterComponent
};
