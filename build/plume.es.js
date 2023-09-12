var G = Object.defineProperty;
var K = (r, e, t) => e in r ? G(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var _ = (r, e, t) => (K(r, typeof e != "symbol" ? e + "" : e, t), t), F = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var w = (r, e, t) => (F(r, e, "read from private field"), t ? t.call(r) : e.get(r)), N = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, P = (r, e, t, s) => (F(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
var O = (r, e, t) => (F(r, e, "access private method"), t);
var A, q;
const z = new (q = class {
  constructor() {
    N(this, A, void 0);
    P(this, A, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(r, e) {
    if (!w(this, A).get(r))
      w(this, A).set(r, e);
    else
      throw console.error(r), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(r) {
    const e = w(this, A).get(r);
    if (e)
      return e;
    throw console.error(r), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    P(this, A, /* @__PURE__ */ new WeakMap());
  }
}, A = new WeakMap(), q)(), Q = (r) => typeof r == "function", U = (r) => {
  const e = r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, X = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), Z = (r, e, t, s = !1) => (r.addEventListener(e, t, s), () => {
  r.removeEventListener(e, t, s);
}), ee = (r) => {
  const e = () => new DOMParser().parseFromString(r, "text/html").body || document.createElement("body"), t = (d) => {
    const b = d.querySelectorAll("script");
    for (const v of b)
      v.remove();
  }, s = (d, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (b.includes("javascript:") || b.includes("data:")) || d.startsWith("on"))
      return !0;
  }, a = (d) => {
    const b = d.attributes;
    for (const {
      name: v,
      value: H
    } of b)
      s(v, H) && d.removeAttribute(v);
  }, n = (d) => {
    const b = d.children;
    for (const v of b)
      a(v), n(v);
  }, i = e();
  return t(i), n(i), i.innerHTML;
}, te = function(r) {
  r.renderCount === 1 && queueMicrotask(() => {
    r.update(), r.renderCount = 0;
  });
}, re = (r, e) => {
  const t = U(e), s = () => ({
    get(a, n) {
      const i = Object.prototype.toString.call(a[n]);
      return ["[object Object]", "[object Array]"].indexOf(i) > -1 && !("__metadata__" in a[n]) ? new Proxy(a[n], s()) : a[n];
    },
    set(a, n, i) {
      return a[n] = i, ++r.renderCount, te(r), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((n, i) => {
        this[t[i]] = n;
      }), new Proxy(this, s());
    }
  };
}, ye = () => {
  let r;
  return [new Promise((t) => {
    r = t;
  }), r];
}, J = (r, e, t) => {
  if (e.length > 0) {
    const s = [];
    for (const i of e)
      i.prototype.__metadata__.name !== "RENDERER" ? s.push(z.getService(i)) : s.push(t);
    const a = U(r), n = new r(...s);
    return e.forEach((i, d) => {
      n[a[d]] = s[d];
    }), n;
  } else
    return new r();
}, L = new class {
  constructor() {
    _(this, "globalStyles");
    _(this, "globalStyleTag");
    _(this, "style_registry");
    _(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(r = "") {
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], r) {
      const s = new CSSStyleSheet();
      s.replace(r), e.push(s);
    }
    return e;
  }
}(), {
  html: D,
  render: se
} = (() => {
  const r = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", s = /^attr([^ ]+)/, a = "insertNode", n = /^insertNode([^ ]+)/;
  let i = [];
  const d = (u) => {
    const o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(u);
    const c = (l) => o[l] || l;
    return h = ((l) => l.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, b = (u, o) => {
    const h = u.options, c = Array.isArray(o) ? o : [o];
    let m, l, p = h.length;
    for (; p--; ) {
      l = h[p];
      const f = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = c.indexOf(f) > -1) && (m = !0);
    }
    m || (u.selectedIndex = -1);
  }, v = (u) => {
    const o = document.createElement("template");
    return o.innerHTML = u, o.content;
  }, H = (u, o) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const m = Array.from(c.attributes).filter((l) => s.test(l.nodeName));
        for (const {
          nodeName: l,
          nodeValue: p
        } of m) {
          const f = s.exec(l)[1];
          switch (!0) {
            case /^on+/.test(p): {
              const R = p.slice(2).toLowerCase();
              c.removeEventListener(R, o[f]), R !== "bindprops" ? c.addEventListener(R, o[f]) : c.addEventListener(R, (T) => {
                T.detail.setProps(o[f]());
              });
              break;
            }
            case /ref/.test(p): {
              const R = ((T) => {
                const k = T;
                return () => {
                  k.isConnected && o[f](k);
                };
              })(c);
              i.push(R);
              break;
            }
            case /^data-+/.test(p):
            case /^aria-+/.test(p): {
              c.setAttribute(p, d(o[f]));
              break;
            }
            case /class/.test(p): {
              o[f] ? c.classList.add(...o[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(p): {
              c.nodeName.toLowerCase() === "select" ? b(c, o[f]) : c.value = d(o[f]);
              break;
            }
            case /disabled/.test(p):
            case /checked/.test(p): {
              o[f] ? c.setAttribute(p, o[f]) : c.removeAttribute(p);
              break;
            }
            default:
              c.setAttribute(p, d(o[f]));
          }
          c.removeAttribute(l);
        }
      }
      c = h.nextNode();
    }
  }, g = (u, o) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), m;
    for (; c; ) {
      if (m = n.exec(c.data)) {
        const l = Array.isArray(o[m[1]]) ? o[m[1]] : [o[m[1]]];
        c.replaceWith(...l), h.currentNode = u;
      }
      c = h.nextNode();
    }
  }, y = (u, o) => {
    if (!u || !o || u.nodeType !== 1 || o.nodeType !== 1)
      return;
    const h = u.attributes, c = o.attributes;
    for (const {
      name: m,
      value: l
    } of h)
      (!c[m] || c[m] !== l) && o.setAttribute(m, l);
    for (const {
      name: m
    } of c)
      h[m] || o.removeAttribute(m);
  }, S = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), C = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, E = (u, o) => {
    const h = o ? Array.from(o.childNodes) : [], c = u ? Array.from(u.childNodes) : [];
    let m = h.length - c.length;
    if (m > 0)
      for (; m > 0; m--)
        h[h.length - m].parentNode.removeChild(h[h.length - m]);
    c.forEach(function(l, p) {
      const f = h[p];
      if (y(l, f), !f) {
        o && o.appendChild(l);
        return;
      }
      if (S(l) !== S(f)) {
        f.replaceWith(l);
        return;
      }
      const R = C(l);
      if (R && R !== C(f)) {
        f.textContent = R;
        return;
      }
      if (f.childNodes.length > 0 && l.childNodes.length < 1) {
        f.innerHTML = "";
        return;
      }
      if (f.childNodes.length < 1 && l.childNodes.length > 0) {
        const T = document.createDocumentFragment();
        E(l, T), f.appendChild(T);
        return;
      }
      if (l.childNodes.length > 0) {
        E(l, f);
        return;
      }
    });
  };
  return {
    html: (u, ...o) => {
      let h = "";
      const {
        length: c
      } = u;
      for (let l = 1; l < c; l++) {
        const p = o[l - 1];
        let f = !1;
        if (h += u[l - 1], r.test(h) && e.test(h) && (h = h.replace(r, (R, T, k) => `${t}${l - 1}=${k || '"'}${T}${k ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(p):
            case p instanceof DocumentFragment: {
              h += `<!--${a}${l - 1}-->`;
              break;
            }
            case (typeof p == "object" && p !== null): {
              "html" in p && (h += p.html);
              break;
            }
            default:
              h += p;
          }
      }
      h += u[c - 1];
      const m = v(h.trim());
      return H(m, o), g(m, o), m;
    },
    render: (u, o) => {
      u && !u.children.length ? (u.innerHTML = "", u.appendChild(o)) : E(o, u), i.forEach((h) => {
        h();
      }), i = [];
    }
  };
})();
class ne {
  constructor(e, t) {
    _(this, "_shadowRoot");
    _(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    _(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    _(this, "emitEvent");
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
const oe = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, W = (r, e) => {
  const t = document.createElement("style");
  return t.innerHTML = r, e && e.appendChild(t), t;
}, ie = (r, e) => {
  var t, s, a, n, Y, d, I, v;
  if (r = {
    ...oe,
    ...r
  }, r.styles = r.styles.toString(), r.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, r.styles && (L.globalStyles.replace(r.styles), L.globalStyleTag = W(r.styles, document.head));
  else if (r.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + r.selector + " component");
  window.customElements.define(r.selector, (v = class extends HTMLElement {
    constructor() {
      super();
      N(this, n);
      N(this, d);
      N(this, t, void 0);
      N(this, s, void 0);
      N(this, a, void 0);
      _(this, "renderCount", 0);
      X ? (P(this, s, this.attachShadow({
        mode: "open"
      })), w(this, s).adoptedStyleSheets = L.getComputedCss(r.styles, r.standalone)) : (P(this, s, this), P(this, a, W(r.styles || "", document.head))), O(this, n, Y).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const g = w(this, t).render();
      typeof g == "string" ? w(this, s).innerHTML = ee(g) : se(w(this, s), g);
    }
    setProps(g) {
      var y, S;
      for (const [C, E] of Object.entries(g))
        e.observedProperties.find((j) => j === C) && (w(this, t)[C] = E);
      (S = (y = w(this, t)).onPropertiesChanged) == null || S.call(y);
    }
    getInstance() {
      return w(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var g, y, S, C;
      (y = (g = w(this, t)).beforeMount) == null || y.call(g), this.update(), (C = (S = w(this, t)).mount) == null || C.call(S), O(this, d, I).call(this, "bindprops", {
        setProps: (E) => {
          this.setProps(E);
        }
      }, !1);
    }
    attributeChangedCallback(g, y, S) {
      var C, E;
      (E = (C = w(this, t)).onAttributesChanged) == null || E.call(C, g, y, S);
    }
    disconnectedCallback() {
      var g, y;
      this.renderCount = 1, (y = (g = w(this, t)).unmount) == null || y.call(g);
    }
  }, t = new WeakMap(), s = new WeakMap(), a = new WeakMap(), n = new WeakSet(), Y = function() {
    const g = new ne(this, w(this, s));
    g.update = () => {
      this.update();
    }, g.emitEvent = (y, S) => {
      O(this, d, I).call(this, y, S);
    }, P(this, t, J(re(this, e), r.deps, g));
  }, d = new WeakSet(), I = function(g, y) {
    const S = new CustomEvent(g, {
      detail: y
    });
    this.dispatchEvent(S);
  }, v));
}, ae = {
  deps: []
}, ce = (r) => (e) => {
  if (r.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(r.selector) || ie(r, e);
}, B = (r = {}) => (e) => {
  if (r = {
    ...ae,
    ...r
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, r.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = J(e, r.deps);
  z.register(e, t);
}, le = (r) => {
  let e;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? e = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : e = r.value;
      break;
    }
    case "select": {
      const t = r.type === "select-one", a = [...Array.from(r.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? a[0] : a;
      break;
    }
    default: {
      e = r.value;
      break;
    }
  }
  return e;
};
class ue {
  constructor(e, t) {
    _(this, "_initialValues");
    _(this, "_controls");
    _(this, "_errors", /* @__PURE__ */ new Map());
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
    for (const [t, s] of Object.entries(this._controls))
      e[t] = s.value;
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
      const t = this._controls[e].value, s = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const a of s) {
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
const we = (r) => {
  const e = {}, t = {};
  for (const [i, d] of Object.entries(r)) {
    const b = Array.isArray(d) ? d : [d];
    e[i] = {
      value: b.shift(),
      validators: b
    }, t[i] = e[i].value;
  }
  const s = new ue(t, e);
  return [s, (i) => (d) => {
    const b = le(d.target);
    s.get(i).value = b;
  }, () => s.reset()];
}, Se = (r) => {
  let e = r;
  return [e, (s) => {
    let a;
    Q(s) ? a = s(e) : a = s, Object.assign(e, a);
  }];
};
class ve {
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
const he = (r) => !!r && typeof r.subscribe == "function", de = (r) => !!r && typeof r.then == "function", fe = (r) => ({
  subscribe: (e) => {
    e(r);
  }
}), me = (r) => ({
  subscribe: (e) => {
    Promise.resolve(r).then((t) => {
      e(t);
    });
  }
});
class pe {
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    return this.internalFn = e, this.unsubscribe;
  }
  unsubscribe() {
    this._internalFn = null;
  }
  next(e) {
    this.internalFn(e);
  }
}
const $ = (r) => he(r) ? r : de(r) ? me(Promise.resolve(r)) : fe(r), M = class {
  static checkParams(e, t) {
    let s = 0;
    const a = {}, n = t.paramCount;
    for (let i = 0; i < e.length; i++) {
      const d = t.params[i];
      d.indexOf(":") >= 0 && (a[d.split(":")[1]] = e[i].split("?")[0], s += 1);
    }
    return s === n ? a : {};
  }
  static getParamCount(e) {
    let t = 0;
    return e.forEach((s) => {
      s.indexOf(":") >= 0 && (t += 1);
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
    if (t.params = e.path.split("/").filter((s) => s.length > 0), t.url = e.path, t.template = "", t.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      t.template = e.template, t.templatePath = e.templatePath;
    }
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = M.getParamCount(t.params), M.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of M.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = M.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let x = M;
_(x, "routeList", []);
class V {
  constructor() {
    _(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    _(this, "_template", new pe());
    _(this, "_unSubscribeHashEvent");
    _(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  startHashChange() {
    this._unSubscribeHashEvent = Z(window, "hashchange", () => {
      this._registerOnHashChange();
    });
  }
  stopHashChange() {
    this._unSubscribeHashEvent();
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute;
  }
  navigateTo(e = "", t) {
    this._routeStateMap.clear(), e ? (window.location.hash.replace(/^#/, "") === e && this._navigateTo(e, t), this._routeStateMap.set(e, t), window.location.hash = "#" + e) : this._navigateTo(e, t);
  }
  _registerOnHashChange() {
    const e = window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _routeMatcher(e, t) {
    if (e) {
      const s = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
      return t.match(s);
    } else
      return e === t;
  }
  _navigateTo(e, t) {
    const s = e.split("/").filter((i) => i.length > 0), a = x.routeList.filter((i) => {
      if (i.params.length === s.length && this._routeMatcher(i.url, e))
        return i;
      if (i.url === e)
        return i;
    }), n = a.length > 0 ? a[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, $(n.canActivate()).subscribe((i) => {
      if (!i)
        return;
      const d = x.checkParams(s, n);
      if (Object.keys(d).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(d));
        const b = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
        this._currentRoute.queryParams = new Map(b), n.isRegistered ? this._template.next(n.template) : n.templatePath && $(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        });
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
B()(V);
const Ce = () => {
  class r {
    constructor(t) {
      _(this, "_template", "");
      _(this, "_subscriptions");
    }
    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template = t;
      }), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let t = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t);
    }
    unmount() {
      this._subscriptions(), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], D(t);
      } else
        return D``;
    }
  }
  ce({
    selector: "router-outlet",
    deps: [V]
  })(r);
};
class ge {
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
   * type that defines route structure
   * @typedef  Route
   */
  /**
   * register routes for routing
   * @param {{path: string, template: string, templatePath: () => Promise, redirectTo: string, canActivate: () => (boolean | Observable<boolean> | Promise<boolean>)}[]} routes
   * @param {boolean} preloadRoutes
   */
  registerRoutes(e, t = !1) {
    if (Array.isArray(e)) {
      for (const s of e)
        x.formatRoute(s);
      t ? x.preloadRoutes() : x.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
B({
  deps: [V]
})(ge);
export {
  ce as Component,
  B as Injectable,
  ne as Renderer,
  ge as Router,
  ve as Validators,
  Z as fromEvent,
  D as html,
  ye as promisify,
  Ce as registerRouterComponent,
  se as render,
  we as useFormFields,
  Se as useState
};
