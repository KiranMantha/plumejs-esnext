var X = Object.defineProperty;
var Z = (r, e, t) => e in r ? X(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var _ = (r, e, t) => (Z(r, typeof e != "symbol" ? e + "" : e, t), t), j = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var y = (r, e, t) => (j(r, e, "read from private field"), t ? t.call(r) : e.get(r)), A = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, x = (r, e, t, s) => (j(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
var F = (r, e, t) => (j(r, e, "access private method"), t);
var N, B;
const U = new (B = class {
  constructor() {
    A(this, N, void 0);
    x(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(r, e) {
    if (!y(this, N).get(r))
      y(this, N).set(r, e);
    else
      throw console.error(r), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(r) {
    const e = y(this, N).get(r);
    if (e)
      return e;
    throw console.error(r), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    x(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), B)(), ee = (r) => typeof r == "function", z = (r) => {
  const e = r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, te = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), J = (r, e, t, s = !1) => (r.addEventListener(e, t, s), () => {
  r.removeEventListener(e, t, s);
}), re = (r) => {
  const e = () => new DOMParser().parseFromString(r, "text/html").body || document.createElement("body"), t = (d) => {
    const p = d.querySelectorAll("script");
    for (const T of p)
      T.remove();
  }, s = (d, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (p.includes("javascript:") || p.includes("data:")) || d.startsWith("on"))
      return !0;
  }, i = (d) => {
    const p = d.attributes;
    for (const {
      name: T,
      value: L
    } of p)
      s(T, L) && d.removeAttribute(T);
  }, n = (d) => {
    const p = d.children;
    for (const T of p)
      i(T), n(T);
  }, o = e();
  return t(o), n(o), o.innerHTML;
}, se = function(r) {
  r.renderCount === 1 && queueMicrotask(() => {
    r.update(), r.renderCount = 0;
  });
}, ne = (r, e) => {
  const t = z(e), s = () => ({
    get(i, n) {
      const o = Object.prototype.toString.call(i[n]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in i[n]) ? new Proxy(i[n], s()) : i[n];
    },
    set(i, n, o) {
      return i[n] = o, ++r.renderCount, se(r), !0;
    }
  });
  return class extends e {
    constructor(...i) {
      return super(...i), i.forEach((n, o) => {
        this[t[o]] = n;
      }), new Proxy(this, s());
    }
  };
}, Se = () => {
  let r;
  return [new Promise((t) => {
    r = t;
  }), r];
}, Y = (r, e, t) => {
  if (e.length > 0) {
    const s = [];
    for (const o of e)
      o.prototype.__metadata__.name !== "RENDERER" ? s.push(U.getService(o)) : s.push(t);
    const i = z(r), n = new r(...s);
    return e.forEach((o, d) => {
      n[i[d]] = s[d];
    }), n;
  } else
    return new r();
}, H = new class {
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
  html: $,
  render: oe
} = (() => {
  const r = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", s = /^attr([^ ]+)/, i = "insertNode", n = /^insertNode([^ ]+)/;
  let o = [];
  const d = (u) => {
    const a = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(u);
    const c = (l) => a[l] || l;
    return h = ((l) => l.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, p = (u, a) => {
    const h = u.options, c = Array.isArray(a) ? a : [a];
    let m, l, g = h.length;
    for (; g--; ) {
      l = h[g];
      const f = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = c.indexOf(f) > -1) && (m = !0);
    }
    m || (u.selectedIndex = -1);
  }, T = (u) => {
    const a = document.createElement("template");
    return a.innerHTML = u, a.content;
  }, L = (u, a) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const m = Array.from(c.attributes).filter((l) => s.test(l.nodeName));
        for (const {
          nodeName: l,
          nodeValue: g
        } of m) {
          const f = s.exec(l)[1];
          switch (!0) {
            case /^on+/.test(g): {
              const C = g.slice(2).toLowerCase();
              c.removeEventListener(C, a[f]), C !== "bindprops" ? c.addEventListener(C, a[f]) : c.addEventListener(C, (P) => {
                P.detail.setProps(a[f]());
              });
              break;
            }
            case /ref/.test(g): {
              const C = ((P) => {
                const O = P;
                return () => {
                  O.isConnected && a[f](O);
                };
              })(c);
              o.push(C);
              break;
            }
            case /^data-+/.test(g):
            case /^aria-+/.test(g): {
              c.setAttribute(g, d(a[f]));
              break;
            }
            case /class/.test(g): {
              a[f] ? c.classList.add(...a[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(g): {
              c.nodeName.toLowerCase() === "select" ? p(c, a[f]) : c.value = d(a[f]);
              break;
            }
            case /disabled/.test(g):
            case /checked/.test(g): {
              a[f] ? c.setAttribute(g, a[f]) : c.removeAttribute(g);
              break;
            }
            default:
              c.setAttribute(g, d(a[f]));
          }
          c.removeAttribute(l);
        }
      }
      c = h.nextNode();
    }
  }, D = (u, a) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), m;
    for (; c; ) {
      if (m = n.exec(c.data)) {
        const l = Array.isArray(a[m[1]]) ? a[m[1]] : [a[m[1]]];
        c.replaceWith(...l), h.currentNode = u;
      }
      c = h.nextNode();
    }
  }, b = (u, a) => {
    if (!u || !a || u.nodeType !== 1 || a.nodeType !== 1)
      return;
    const h = u.attributes, c = a.attributes;
    for (const {
      name: m,
      value: l
    } of h)
      (!c[m] || c[m] !== l) && a.setAttribute(m, l);
    for (const {
      name: m
    } of c)
      h[m] || a.removeAttribute(m);
  }, w = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), S = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, R = (u, a) => {
    const h = a ? Array.from(a.childNodes) : [], c = u ? Array.from(u.childNodes) : [];
    let m = h.length - c.length;
    if (m > 0)
      for (; m > 0; m--)
        h[h.length - m].parentNode.removeChild(h[h.length - m]);
    c.forEach(function(l, g) {
      const f = h[g];
      if (b(l, f), !f) {
        a && a.appendChild(l);
        return;
      }
      if (w(l) !== w(f)) {
        f.replaceWith(l);
        return;
      }
      const C = S(l);
      if (C && C !== S(f)) {
        f.textContent = C;
        return;
      }
      if (f.childNodes.length > 0 && l.childNodes.length < 1) {
        f.innerHTML = "";
        return;
      }
      if (f.childNodes.length < 1 && l.childNodes.length > 0) {
        const P = document.createDocumentFragment();
        R(l, P), f.appendChild(P);
        return;
      }
      if (l.childNodes.length > 0) {
        R(l, f);
        return;
      }
    });
  };
  return {
    html: (u, ...a) => {
      let h = "";
      const {
        length: c
      } = u;
      for (let l = 1; l < c; l++) {
        const g = a[l - 1];
        let f = !1;
        if (h += u[l - 1], r.test(h) && e.test(h) && (h = h.replace(r, (C, P, O) => `${t}${l - 1}=${O || '"'}${P}${O ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(g):
            case g instanceof DocumentFragment: {
              h += `<!--${i}${l - 1}-->`;
              break;
            }
            case (typeof g == "object" && g !== null): {
              "html" in g && (h += g.html);
              break;
            }
            default:
              h += g;
          }
      }
      h += u[c - 1];
      const m = T(h.trim());
      return L(m, a), D(m, a), m;
    },
    render: (u, a) => {
      u && !u.children.length ? (u.innerHTML = "", u.appendChild(a)) : R(a, u), o.forEach((h) => {
        h();
      }), o = [];
    }
  };
})();
class G {
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
const ie = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, W = (r, e) => {
  const t = document.createElement("style");
  return t.innerHTML = r, e && e.appendChild(t), t;
}, ae = (r, e) => {
  var t, s, i, n, o, K, p, V, L;
  if (r = {
    ...ie,
    ...r
  }, r.styles = r.styles.toString(), r.root && !H.isRootNodeSet)
    H.isRootNodeSet = !0, r.styles && (H.globalStyles.replace(r.styles), H.globalStyleTag = W(r.styles, document.head));
  else if (r.root && H.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + r.selector + " component");
  window.customElements.define(r.selector, (L = class extends HTMLElement {
    constructor() {
      super();
      A(this, o);
      A(this, p);
      A(this, t, void 0);
      A(this, s, void 0);
      A(this, i, void 0);
      _(this, "renderCount", 0);
      A(this, n, void 0);
      if (te)
        x(this, s, this.attachShadow({
          mode: "open"
        })), y(this, s).adoptedStyleSheets = H.getComputedCss(r.styles, r.standalone);
      else {
        x(this, s, this);
        const b = r.styles.replaceAll(":host", r.selector);
        x(this, i, W(b, document.head));
      }
      F(this, o, K).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = y(this, t).render();
      typeof b == "string" ? y(this, s).innerHTML = re(b) : oe(y(this, s), b);
    }
    setProps(b) {
      var w, S;
      for (const [R, E] of Object.entries(b))
        e.observedProperties.find((M) => M === R) && (y(this, t)[R] = E);
      (S = (w = y(this, t)).onPropertiesChanged) == null || S.call(w);
    }
    getInstance() {
      return y(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, w, S, R;
      (w = (b = y(this, t)).beforeMount) == null || w.call(b), this.update(), (R = (S = y(this, t)).mount) == null || R.call(S), F(this, p, V).call(this, "bindprops", {
        setProps: (E) => {
          this.setProps(E);
        }
      }, !1), x(this, n, J(this, "refresh_component", () => {
        var E, M;
        (M = (E = y(this, t)).mount) == null || M.call(E);
      }));
    }
    attributeChangedCallback(b, w, S) {
      var R, E;
      (E = (R = y(this, t)).onAttributesChanged) == null || E.call(R, b, w, S);
    }
    disconnectedCallback() {
      var b, w, S;
      this.renderCount = 1, (w = (b = y(this, t)).unmount) == null || w.call(b), (S = y(this, i)) == null || S.remove(), y(this, n).call(this);
    }
  }, t = new WeakMap(), s = new WeakMap(), i = new WeakMap(), n = new WeakMap(), o = new WeakSet(), K = function() {
    const b = new G(this, y(this, s));
    b.update = () => {
      this.update();
    }, b.emitEvent = (w, S) => {
      F(this, p, V).call(this, w, S);
    }, x(this, t, Y(ne(this, e), r.deps, b));
  }, p = new WeakSet(), V = function(b, w) {
    const S = new CustomEvent(b, {
      detail: w
    });
    this.dispatchEvent(S);
  }, L));
}, ce = {
  deps: []
}, le = (r) => (e) => {
  if (r.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(r.selector) || ae(r, e);
}, Q = (r = {}) => (e) => {
  if (r = {
    ...ce,
    ...r
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, r.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = Y(e, r.deps);
  U.register(e, t);
}, ue = (r) => {
  let e;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? e = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : e = r.value;
      break;
    }
    case "select": {
      const t = r.type === "select-one", i = [...Array.from(r.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? i[0] : i;
      break;
    }
    default: {
      e = r.value;
      break;
    }
  }
  return e;
};
class he {
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
      for (const i of s) {
        const n = i(t);
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
const ve = (r) => {
  const e = {}, t = {};
  for (const [o, d] of Object.entries(r)) {
    const p = Array.isArray(d) ? d : [d];
    e[o] = {
      value: p.shift(),
      validators: p
    }, t[o] = e[o].value;
  }
  const s = new he(t, e);
  return [s, (o) => (d) => {
    const p = ue(d.target);
    s.get(o).value = p;
  }, () => s.reset()];
}, de = (r) => {
  let e = r;
  return [e, (s) => {
    let i;
    ee(s) ? i = s(e) : i = s, Object.assign(e, i);
  }];
}, Re = () => {
  const r = window.location.search, e = Object.fromEntries(new URLSearchParams(r).entries()), [t, s] = de(e);
  return [t, (n) => {
    const o = Object.fromEntries(n.entries());
    delete o["[object Object]"], s(o), window.history.pushState(null, "", `${location.pathname}?${new URLSearchParams(o).toString()}`);
  }];
};
class Ce {
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
const fe = (r) => !!r && typeof r.subscribe == "function", pe = (r) => !!r && typeof r.then == "function", me = (r) => ({
  subscribe: (e) => {
    e(r);
  }
}), ge = (r) => ({
  subscribe: (e) => {
    Promise.resolve(r).then((t) => {
      e(t);
    });
  }
});
class be {
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
const q = (r) => fe(r) ? r : pe(r) ? ge(Promise.resolve(r)) : me(r), k = class {
  static checkParams(e, t) {
    let s = 0;
    const i = {}, n = t.paramCount;
    for (let o = 0; o < e.length; o++) {
      const d = t.params[o];
      d.indexOf(":") >= 0 && (i[d.split(":")[1]] = e[o].split("?")[0], s += 1);
    }
    return s === n ? i : {};
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
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = k.getParamCount(t.params), k.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of k.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = k.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let v = k;
_(v, "routeList", []), _(v, "isHistoryBasedRouting", !0);
function _e(r, e) {
  return r ? new RegExp(r.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class I {
  constructor() {
    _(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    _(this, "_template", new be());
    _(this, "_unSubscribeHashEvent");
    _(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  startHashChange() {
    const e = v.isHistoryBasedRouting ? "popstate" : "hashchange";
    if (v.isHistoryBasedRouting) {
      window.history.replaceState({}, null, "");
      const t = this;
      (function(s) {
        var i = s.pushState;
        s.pushState = function() {
          i.apply(s, arguments), t._registerOnHashChange();
        };
      })(window.history);
    }
    this._unSubscribeHashEvent = J(window, e, () => {
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
  navigateTo(e = "/", t) {
    let s = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    s = s || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), s === e ? this._navigateTo(e, t) : v.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  _registerOnHashChange() {
    const e = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const s = e.split("/").filter((o) => o.length > 0), i = v.routeList.filter((o) => {
      if (o.params.length === s.length && _e(o.url, e))
        return o;
      if (o.url === e)
        return o;
    }), n = i.length > 0 ? i[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, q(n.canActivate()).subscribe((o) => {
      if (!o)
        return;
      const d = v.checkParams(s, n);
      if (Object.keys(d).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(d));
        let p = [];
        v.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p), n.isRegistered ? this._template.next(n.template) : n.templatePath ? q(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        }) : n.redirectTo && this.navigateTo(n.redirectTo, t);
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
Q()(I);
const Ee = () => {
  class r {
    constructor(t, s) {
      _(this, "_template", "");
      _(this, "_subscriptions");
    }
    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t ? this._template = t : this.refreshRouterOutletComponent();
      }), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      const t = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions(), this.internalRouterSrvc.stopHashChange();
    }
    refreshRouterOutletComponent() {
      const t = new CustomEvent("refresh_component", {
        detail: {},
        bubbles: !1,
        cancelable: !1,
        composed: !1
      });
      this.renderer.shadowRoot.children[0].dispatchEvent(t);
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], $(t);
      } else
        return $``;
    }
  }
  le({
    selector: "router-outlet",
    deps: [I, G]
  })(r);
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
   * type that defines route structure
   * @typedef  Route
   */
  /**
   * register routes for routing
   * @param {{path: string, template: string, templatePath: () => Promise, redirectTo: string, canActivate: () => (boolean | Observable<boolean> | Promise<boolean>)}[]} routes
   * @param {boolean} preloadRoutes
   * @param {boolean} isHashBasedRouting
   */
  registerRoutes(e, t = !1, s = !1) {
    if (s && (v.isHistoryBasedRouting = !s), Array.isArray(e)) {
      for (const i of e)
        v.formatRoute(i);
      t ? v.preloadRoutes() : v.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Q({
  deps: [I]
})(ye);
export {
  le as Component,
  Q as Injectable,
  G as Renderer,
  ye as Router,
  Ce as Validators,
  J as fromEvent,
  $ as html,
  Se as promisify,
  Ee as registerRouterComponent,
  oe as render,
  ve as useFormFields,
  Re as useSearchParams,
  de as useState
};
