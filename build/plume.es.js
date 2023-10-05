var G = Object.defineProperty;
var K = (t, e, s) => e in t ? G(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var _ = (t, e, s) => (K(t, typeof e != "symbol" ? e + "" : e, s), s), F = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var w = (t, e, s) => (F(t, e, "read from private field"), s ? s.call(t) : e.get(t)), P = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, N = (t, e, s, r) => (F(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var O = (t, e, s) => (F(t, e, "access private method"), s);
var T, q;
const B = new (q = class {
  constructor() {
    P(this, T, void 0);
    N(this, T, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!w(this, T).get(t))
      w(this, T).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = w(this, T).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    N(this, T, /* @__PURE__ */ new WeakMap());
  }
}, T = new WeakMap(), q)(), Q = (t) => typeof t == "function", U = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, X = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), Z = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), ee = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), s = (d) => {
    const b = d.querySelectorAll("script");
    for (const R of b)
      R.remove();
  }, r = (d, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (b.includes("javascript:") || b.includes("data:")) || d.startsWith("on"))
      return !0;
  }, i = (d) => {
    const b = d.attributes;
    for (const {
      name: R,
      value: M
    } of b)
      r(R, M) && d.removeAttribute(R);
  }, n = (d) => {
    const b = d.children;
    for (const R of b)
      i(R), n(R);
  }, a = e();
  return s(a), n(a), a.innerHTML;
}, te = function(t) {
  t.renderCount === 1 && queueMicrotask(() => {
    t.update(), t.renderCount = 0;
  });
}, se = (t, e) => {
  const s = U(e), r = () => ({
    get(i, n) {
      const a = Object.prototype.toString.call(i[n]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in i[n]) ? new Proxy(i[n], r()) : i[n];
    },
    set(i, n, a) {
      return i[n] = a, ++t.renderCount, te(t), !0;
    }
  });
  return class extends e {
    constructor(...i) {
      return super(...i), i.forEach((n, a) => {
        this[s[a]] = n;
      }), new Proxy(this, r());
    }
  };
}, we = () => {
  let t;
  return [new Promise((s) => {
    t = s;
  }), t];
}, z = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const a of e)
      a.prototype.__metadata__.name !== "RENDERER" ? r.push(B.getService(a)) : r.push(s);
    const i = U(t), n = new t(...r);
    return e.forEach((a, d) => {
      n[i[d]] = r[d];
    }), n;
  } else
    return new t();
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
  getComputedCss(t = "") {
    let e = [];
    const s = new CSSStyleSheet();
    if (s.insertRule(":host { display: block; }"), e = [this.globalStyles, s], t) {
      const r = new CSSStyleSheet();
      r.replace(t), e.push(r);
    }
    return e;
  }
}(), {
  html: D,
  render: re
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, i = "insertNode", n = /^insertNode([^ ]+)/;
  let a = [];
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
    let p, l, m = h.length;
    for (; m--; ) {
      l = h[m];
      const f = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = c.indexOf(f) > -1) && (p = !0);
    }
    p || (u.selectedIndex = -1);
  }, R = (u) => {
    const o = document.createElement("template");
    return o.innerHTML = u, o.content;
  }, M = (u, o) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const p = Array.from(c.attributes).filter((l) => r.test(l.nodeName));
        for (const {
          nodeName: l,
          nodeValue: m
        } of p) {
          const f = r.exec(l)[1];
          switch (!0) {
            case /^on+/.test(m): {
              const C = m.slice(2).toLowerCase();
              c.removeEventListener(C, o[f]), C !== "bindprops" ? c.addEventListener(C, o[f]) : c.addEventListener(C, (A) => {
                A.detail.setProps(o[f]());
              });
              break;
            }
            case /ref/.test(m): {
              const C = ((A) => {
                const k = A;
                return () => {
                  k.isConnected && o[f](k);
                };
              })(c);
              a.push(C);
              break;
            }
            case /^data-+/.test(m):
            case /^aria-+/.test(m): {
              c.setAttribute(m, d(o[f]));
              break;
            }
            case /class/.test(m): {
              o[f] ? c.classList.add(...o[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(m): {
              c.nodeName.toLowerCase() === "select" ? b(c, o[f]) : c.value = d(o[f]);
              break;
            }
            case /disabled/.test(m):
            case /checked/.test(m): {
              o[f] ? c.setAttribute(m, o[f]) : c.removeAttribute(m);
              break;
            }
            default:
              c.setAttribute(m, d(o[f]));
          }
          c.removeAttribute(l);
        }
      }
      c = h.nextNode();
    }
  }, g = (u, o) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), p;
    for (; c; ) {
      if (p = n.exec(c.data)) {
        const l = Array.isArray(o[p[1]]) ? o[p[1]] : [o[p[1]]];
        c.replaceWith(...l), h.currentNode = u;
      }
      c = h.nextNode();
    }
  }, S = (u, o) => {
    if (!u || !o || u.nodeType !== 1 || o.nodeType !== 1)
      return;
    const h = u.attributes, c = o.attributes;
    for (const {
      name: p,
      value: l
    } of h)
      (!c[p] || c[p] !== l) && o.setAttribute(p, l);
    for (const {
      name: p
    } of c)
      h[p] || o.removeAttribute(p);
  }, y = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), v = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, E = (u, o) => {
    const h = o ? Array.from(o.childNodes) : [], c = u ? Array.from(u.childNodes) : [];
    let p = h.length - c.length;
    if (p > 0)
      for (; p > 0; p--)
        h[h.length - p].parentNode.removeChild(h[h.length - p]);
    c.forEach(function(l, m) {
      const f = h[m];
      if (S(l, f), !f) {
        o && o.appendChild(l);
        return;
      }
      if (y(l) !== y(f)) {
        f.replaceWith(l);
        return;
      }
      const C = v(l);
      if (C && C !== v(f)) {
        f.textContent = C;
        return;
      }
      if (f.childNodes.length > 0 && l.childNodes.length < 1) {
        f.innerHTML = "";
        return;
      }
      if (f.childNodes.length < 1 && l.childNodes.length > 0) {
        const A = document.createDocumentFragment();
        E(l, A), f.appendChild(A);
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
        const m = o[l - 1];
        let f = !1;
        if (h += u[l - 1], t.test(h) && e.test(h) && (h = h.replace(t, (C, A, k) => `${s}${l - 1}=${k || '"'}${A}${k ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(m):
            case m instanceof DocumentFragment: {
              h += `<!--${i}${l - 1}-->`;
              break;
            }
            case (typeof m == "object" && m !== null): {
              "html" in m && (h += m.html);
              break;
            }
            default:
              h += m;
          }
      }
      h += u[c - 1];
      const p = R(h.trim());
      return M(p, o), g(p, o), p;
    },
    render: (u, o) => {
      u && !u.children.length ? (u.innerHTML = "", u.appendChild(o)) : E(o, u), a.forEach((h) => {
        h();
      }), a = [];
    }
  };
})();
class ne {
  constructor(e, s) {
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
    this._hostElement = e, this._shadowRoot = s;
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
}, W = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, ie = (t, e) => {
  var s, r, i, n, J, d, I, R;
  if (t = {
    ...oe,
    ...t
  }, t.styles = t.styles.toString(), t.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, t.styles && (L.globalStyles.replace(t.styles), L.globalStyleTag = W(t.styles, document.head));
  else if (t.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (R = class extends HTMLElement {
    constructor() {
      super();
      P(this, n);
      P(this, d);
      P(this, s, void 0);
      P(this, r, void 0);
      P(this, i, void 0);
      _(this, "renderCount", 0);
      if (X)
        N(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = L.getComputedCss(t.styles, t.standalone);
      else {
        N(this, r, this);
        const g = t.styles.replaceAll(":host", t.selector);
        N(this, i, W(g, document.head));
      }
      O(this, n, J).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const g = w(this, s).render();
      typeof g == "string" ? w(this, r).innerHTML = ee(g) : re(w(this, r), g);
    }
    setProps(g) {
      var S, y;
      for (const [v, E] of Object.entries(g))
        e.observedProperties.find((j) => j === v) && (w(this, s)[v] = E);
      (y = (S = w(this, s)).onPropertiesChanged) == null || y.call(S);
    }
    getInstance() {
      return w(this, s);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var g, S, y, v;
      (S = (g = w(this, s)).beforeMount) == null || S.call(g), this.update(), (v = (y = w(this, s)).mount) == null || v.call(y), O(this, d, I).call(this, "bindprops", {
        setProps: (E) => {
          this.setProps(E);
        }
      }, !1);
    }
    attributeChangedCallback(g, S, y) {
      var v, E;
      (E = (v = w(this, s)).onAttributesChanged) == null || E.call(v, g, S, y);
    }
    disconnectedCallback() {
      var g, S, y;
      this.renderCount = 1, (S = (g = w(this, s)).unmount) == null || S.call(g), (y = w(this, i)) == null || y.remove();
    }
  }, s = new WeakMap(), r = new WeakMap(), i = new WeakMap(), n = new WeakSet(), J = function() {
    const g = new ne(this, w(this, r));
    g.update = () => {
      this.update();
    }, g.emitEvent = (S, y) => {
      O(this, d, I).call(this, S, y);
    }, N(this, s, z(se(this, e), t.deps, g));
  }, d = new WeakSet(), I = function(g, S) {
    const y = new CustomEvent(g, {
      detail: S
    });
    this.dispatchEvent(y);
  }, R));
}, ae = {
  deps: []
}, ce = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || ie(t, e);
}, Y = (t = {}) => (e) => {
  if (t = {
    ...ae,
    ...t
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, t.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = z(e, t.deps);
  B.register(e, s);
}, le = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", i = [...Array.from(t.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = s ? i[0] : i;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
class ue {
  constructor(e, s) {
    _(this, "_initialValues");
    _(this, "_controls");
    _(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = e, this._controls = s;
  }
  get errors() {
    return this._errors;
  }
  get valid() {
    return this._checkValidity(), !this._errors.size;
  }
  get value() {
    const e = {};
    for (const [s, r] of Object.entries(this._controls))
      e[s] = r.value;
    return e;
  }
  get(e) {
    return this._controls[e];
  }
  reset(e = {}) {
    for (const s in this._controls)
      this._controls[s].value = e[s] || this._initialValues[s];
    return this._errors.clear(), this;
  }
  _checkValidity() {
    this._errors.clear();
    for (const e in this._controls) {
      const s = this._controls[e].value, r = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const i of r) {
        const n = i(s);
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
const Se = (t) => {
  const e = {}, s = {};
  for (const [a, d] of Object.entries(t)) {
    const b = Array.isArray(d) ? d : [d];
    e[a] = {
      value: b.shift(),
      validators: b
    }, s[a] = e[a].value;
  }
  const r = new ue(s, e);
  return [r, (a) => (d) => {
    const b = le(d.target);
    r.get(a).value = b;
  }, () => r.reset()];
}, Re = (t) => {
  let e = t;
  return [e, (r) => {
    let i;
    Q(r) ? i = r(e) : i = r, Object.assign(e, i);
  }];
};
class ve {
  static required(e) {
    return e.length ? null : {
      required: !0
    };
  }
  static min(e) {
    return (s) => s.length >= e ? null : {
      minLength: {
        requiredLength: e
      }
    };
  }
  static max(e) {
    return (s) => s.length <= e ? null : {
      maxLength: {
        requiredLength: e
      }
    };
  }
  static pattern(e) {
    return (s) => new RegExp(e).test(s) ? null : {
      pattern: !0
    };
  }
}
const he = (t) => !!t && typeof t.subscribe == "function", de = (t) => !!t && typeof t.then == "function", fe = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), pe = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class me {
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
const $ = (t) => he(t) ? t : de(t) ? pe(Promise.resolve(t)) : fe(t), H = class {
  static checkParams(e, s) {
    let r = 0;
    const i = {}, n = s.paramCount;
    for (let a = 0; a < e.length; a++) {
      const d = s.params[a];
      d.indexOf(":") >= 0 && (i[d.split(":")[1]] = e[a].split("?")[0], r += 1);
    }
    return r === n ? i : {};
  }
  static getParamCount(e) {
    let s = 0;
    return e.forEach((r) => {
      r.indexOf(":") >= 0 && (s += 1);
    }), s;
  }
  static formatRoute(e) {
    const s = {
      params: {},
      url: "",
      template: "",
      paramCount: 0,
      isRegistered: !1,
      redirectTo: "",
      preload: e.preload,
      canActivate: () => !0
    };
    if (s.params = e.path.split("/").filter((r) => r.length > 0), s.url = e.path, s.template = "", s.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      s.template = e.template, s.templatePath = e.templatePath;
    }
    e.canActivate && (s.canActivate = e.canActivate), s.paramCount = H.getParamCount(s.params), H.routeList.push(s);
  }
  static preloadRoutes() {
    for (const e of H.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = H.routeList.filter((s) => s.preload === !0);
    for (const s of e)
      s.templatePath && s.templatePath();
  }
};
let x = H;
_(x, "routeList", []);
function ge(t, e) {
  return t ? new RegExp(t.replace(/:[^\s/]+/g, "([\\w-]+)")).test(e) : !1;
}
class V {
  constructor() {
    _(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    _(this, "_template", new me());
    _(this, "_unSubscribeHashEvent");
    _(this, "_routeStateMap", /* @__PURE__ */ new Map());
    _(this, "isHistoryBasedRouting", !0);
  }
  startHashChange() {
    const e = this.isHistoryBasedRouting ? "popstate" : "hashchange";
    if (this.isHistoryBasedRouting) {
      window.history.replaceState({}, null, "");
      const s = this;
      (function(r) {
        var i = r.pushState;
        r.pushState = function() {
          i.apply(r, arguments), s._registerOnHashChange();
        };
      })(window.history);
    } else
      this._unSubscribeHashEvent = Z(window, e, () => {
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
  navigateTo(e = "/", s) {
    let r = this.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, s), r === e ? (this._template.next(""), setTimeout(() => {
      this._navigateTo(e, s);
    })) : this.isHistoryBasedRouting ? window.history.pushState(s, "", e) : window.location.hash = "#" + e;
  }
  _registerOnHashChange() {
    const e = this.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), s = this._routeStateMap.get(e);
    this._navigateTo(e, s);
  }
  _navigateTo(e, s) {
    const r = e.split("/").filter((a) => a.length > 0), i = x.routeList.filter((a) => {
      if (a.params.length === r.length && ge(a.url, e))
        return a;
      if (a.url === e)
        return a;
    }), n = i.length > 0 ? i[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...s || {}
    }, $(n.canActivate()).subscribe((a) => {
      if (!a)
        return;
      const d = x.checkParams(r, n);
      if (Object.keys(d).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(d));
        let b = [];
        this.isHistoryBasedRouting ? b = new URLSearchParams(window.location.search).entries() : b = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(b), n.isRegistered ? this._template.next(n.template) : n.templatePath && $(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        });
      } else
        this.navigateTo(n.redirectTo, s);
    }));
  }
}
Y()(V);
const Ce = () => {
  class t {
    constructor(s) {
      _(this, "_template", "");
      _(this, "_subscriptions");
    }
    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((s) => {
        this._template = s;
      }), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      const s = this.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(s);
    }
    unmount() {
      this._subscriptions(), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (this._template) {
        const s = [`${this._template}`];
        return s.raw = [`${this._template}`], D(s);
      } else
        return D``;
    }
  }
  ce({
    selector: "router-outlet",
    deps: [V]
  })(t);
};
class be {
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
  navigateTo(e, s) {
    this.internalRouter.navigateTo(e, s);
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
  registerRoutes(e, s = !1, r = !1) {
    if (r && (this.internalRouter.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const i of e)
        x.formatRoute(i);
      s ? x.preloadRoutes() : x.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Y({
  deps: [V]
})(be);
export {
  ce as Component,
  Y as Injectable,
  ne as Renderer,
  be as Router,
  ve as Validators,
  Z as fromEvent,
  D as html,
  we as promisify,
  Ce as registerRouterComponent,
  re as render,
  Se as useFormFields,
  Re as useState
};
