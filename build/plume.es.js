var X = Object.defineProperty;
var Z = (r, e, t) => e in r ? X(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var _ = (r, e, t) => (Z(r, typeof e != "symbol" ? e + "" : e, t), t), j = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var y = (r, e, t) => (j(r, e, "read from private field"), t ? t.call(r) : e.get(r)), P = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, x = (r, e, t, s) => (j(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
var F = (r, e, t) => (j(r, e, "access private method"), t);
var N, B;
const U = new (B = class {
  constructor() {
    P(this, N, void 0);
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
  const e = () => new DOMParser().parseFromString(r, "text/html").body || document.createElement("body"), t = (p) => {
    const m = p.querySelectorAll("script");
    for (const A of m)
      A.remove();
  }, s = (p, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(p) && (m.includes("javascript:") || m.includes("data:")) || p.startsWith("on"))
      return !0;
  }, a = (p) => {
    const m = p.attributes;
    for (const {
      name: A,
      value: L
    } of m)
      s(A, L) && p.removeAttribute(A);
  }, n = (p) => {
    const m = p.children;
    for (const A of m)
      a(A), n(A);
  }, o = e();
  return t(o), n(o), o.innerHTML;
}, se = function(r) {
  r.renderCount === 1 && queueMicrotask(() => {
    r.update(), r.renderCount = 0;
  });
}, ne = (r, e) => {
  const t = z(e), s = () => ({
    get(a, n) {
      const o = Object.prototype.toString.call(a[n]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in a[n]) ? new Proxy(a[n], s()) : a[n];
    },
    set(a, n, o) {
      return a[n] = o, ++r.renderCount, se(r), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((n, o) => {
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
    const a = z(r), n = new r(...s);
    return e.forEach((o, p) => {
      n[a[p]] = s[p];
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
  const r = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", s = /^attr([^ ]+)/, a = "insertNode", n = /^insertNode([^ ]+)/;
  let o = [];
  const p = (l) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let u = JSON.stringify(l);
    const c = (h) => i[h] || h;
    return u = ((h) => h.replace(/[&<>\(\)]/g, c))(u), JSON.parse(u);
  }, m = (l, i) => {
    const u = l.options, c = Array.isArray(i) ? i : [i];
    let b, h, d = u.length;
    for (; d--; ) {
      h = u[d];
      const f = h.getAttribute("value") ?? (h.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (h.selected = c.indexOf(f) > -1) && (b = !0);
    }
    b || (l.selectedIndex = -1);
  }, A = (l) => {
    const i = document.createElement("template");
    return i.innerHTML = l, i.content;
  }, L = (l, i) => {
    const u = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT, null);
    let c = u.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const b = Array.from(c.attributes).filter((h) => s.test(h.nodeName));
        for (const {
          nodeName: h,
          nodeValue: d
        } of b) {
          const f = s.exec(h)[1];
          switch (!0) {
            case /^on+/.test(d): {
              const C = d.slice(2).toLowerCase();
              c.removeEventListener(C, i[f]), C !== "bindprops" ? c.addEventListener(C, i[f]) : c.addEventListener(C, (T) => {
                T.detail.setProps(i[f]());
              });
              break;
            }
            case /ref/.test(d): {
              const C = ((T) => {
                const O = T;
                return () => {
                  O.isConnected && i[f](O);
                };
              })(c);
              o.push(C);
              break;
            }
            case /^data-+/.test(d):
            case /^aria-+/.test(d): {
              c.setAttribute(d, p(i[f]));
              break;
            }
            case /class/.test(d): {
              i[f] ? c.classList.add(...i[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(d): {
              c.nodeName.toLowerCase() === "select" ? m(c, i[f]) : c.value = p(i[f]);
              break;
            }
            case /disabled/.test(d):
            case /checked/.test(d): {
              i[f] ? c.setAttribute(d, i[f]) : c.removeAttribute(d);
              break;
            }
            default:
              c.setAttribute(d, p(i[f]));
          }
          c.removeAttribute(h);
        }
      }
      c = u.nextNode();
    }
  }, D = (l, i) => {
    const u = document.createTreeWalker(l, NodeFilter.SHOW_COMMENT, null);
    let c = u.nextNode(), b;
    for (; c; ) {
      if (b = n.exec(c.data)) {
        const h = Array.isArray(i[b[1]]) ? i[b[1]] : [i[b[1]]];
        c.replaceWith(...h), u.currentNode = l;
      }
      c = u.nextNode();
    }
  }, g = (l, i) => {
    if (!l || !i || l.nodeType !== 1 || i.nodeType !== 1)
      return;
    const u = l.attributes, c = i.attributes, b = i.getAttribute("data-preserve-attributes"), h = b && b === "true";
    for (const {
      name: d,
      value: f
    } of u)
      (!c[d] || c[d] !== f) && i.setAttribute(d, f);
    if (!h)
      for (const {
        name: d
      } of c)
        u[d] || i.removeAttribute(d);
  }, w = (l) => l.nodeType === 3 ? "text" : l.nodeType === 8 ? "comment" : l.tagName.toLowerCase(), S = (l) => l.childNodes && l.childNodes.length > 0 ? null : l.textContent, R = (l, i) => {
    const u = i ? Array.from(i.childNodes) : [], c = l ? Array.from(l.childNodes) : [];
    let b = u.length - c.length;
    if (b > 0)
      for (; b > 0; b--)
        u[u.length - b].parentNode.removeChild(u[u.length - b]);
    c.forEach(function(h, d) {
      const f = u[d];
      if (g(h, f), !f) {
        i && i.appendChild(h);
        return;
      }
      if (w(h) !== w(f)) {
        f.replaceWith(h);
        return;
      }
      const C = S(h);
      if (C && C !== S(f)) {
        f.textContent = C;
        return;
      }
      if (f.childNodes.length > 0 && h.childNodes.length < 1) {
        f.innerHTML = "";
        return;
      }
      if (f.childNodes.length < 1 && h.childNodes.length > 0) {
        const T = document.createDocumentFragment();
        R(h, T), f.appendChild(T);
        return;
      }
      if (h.childNodes.length > 0) {
        R(h, f);
        return;
      }
    });
  };
  return {
    html: (l, ...i) => {
      let u = "";
      const {
        length: c
      } = l;
      for (let h = 1; h < c; h++) {
        const d = i[h - 1];
        let f = !1;
        if (u += l[h - 1], r.test(u) && e.test(u) && (u = u.replace(r, (C, T, O) => `${t}${h - 1}=${O || '"'}${T}${O ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(d):
            case d instanceof DocumentFragment: {
              u += `<!--${a}${h - 1}-->`;
              break;
            }
            case (typeof d == "object" && d !== null): {
              "html" in d && (u += d.html);
              break;
            }
            default:
              u += d;
          }
      }
      u += l[c - 1];
      const b = A(u.trim());
      return L(b, i), D(b, i), b;
    },
    render: (l, i) => {
      l && !l.children.length ? (l.innerHTML = "", l.appendChild(i)) : R(i, l), o.forEach((u) => {
        u();
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
  var t, s, a, n, o, K, m, V, L;
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
      P(this, o);
      P(this, m);
      P(this, t, void 0);
      P(this, s, void 0);
      P(this, a, void 0);
      _(this, "renderCount", 0);
      P(this, n, void 0);
      if (te)
        x(this, s, this.attachShadow({
          mode: "open"
        })), y(this, s).adoptedStyleSheets = H.getComputedCss(r.styles, r.standalone);
      else {
        x(this, s, this);
        const g = r.styles.replaceAll(":host", r.selector);
        x(this, a, W(g, document.head));
      }
      F(this, o, K).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const g = y(this, t).render();
      typeof g == "string" ? y(this, s).innerHTML = re(g) : oe(y(this, s), g);
    }
    setProps(g) {
      var w, S;
      for (const [R, E] of Object.entries(g))
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
      var g, w, S, R;
      (w = (g = y(this, t)).beforeMount) == null || w.call(g), this.update(), (R = (S = y(this, t)).mount) == null || R.call(S), F(this, m, V).call(this, "bindprops", {
        setProps: (E) => {
          this.setProps(E);
        }
      }, !1), x(this, n, J(this, "refresh_component", () => {
        var E, M;
        (M = (E = y(this, t)).mount) == null || M.call(E);
      }));
    }
    attributeChangedCallback(g, w, S) {
      var R, E;
      (E = (R = y(this, t)).onAttributesChanged) == null || E.call(R, g, w, S);
    }
    disconnectedCallback() {
      var g, w, S;
      this.renderCount = 1, (w = (g = y(this, t)).unmount) == null || w.call(g), (S = y(this, a)) == null || S.remove(), y(this, n).call(this);
    }
  }, t = new WeakMap(), s = new WeakMap(), a = new WeakMap(), n = new WeakMap(), o = new WeakSet(), K = function() {
    const g = new G(this, y(this, s));
    g.update = () => {
      this.update();
    }, g.emitEvent = (w, S) => {
      F(this, m, V).call(this, w, S);
    }, x(this, t, Y(ne(this, e), r.deps, g));
  }, m = new WeakSet(), V = function(g, w) {
    const S = new CustomEvent(g, {
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
const ve = (r) => {
  const e = {}, t = {};
  for (const [o, p] of Object.entries(r)) {
    const m = Array.isArray(p) ? p : [p];
    e[o] = {
      value: m.shift(),
      validators: m
    }, t[o] = e[o].value;
  }
  const s = new he(t, e);
  return [s, (o) => (p) => {
    const m = ue(p.target);
    s.get(o).value = m;
  }, () => s.reset()];
}, de = (r) => {
  let e = r;
  return [e, (s) => {
    let a;
    ee(s) ? a = s(e) : a = s, Object.assign(e, a);
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
    const a = {}, n = t.paramCount;
    for (let o = 0; o < e.length; o++) {
      const p = t.params[o];
      p.indexOf(":") >= 0 && (a[p.split(":")[1]] = e[o].split("?")[0], s += 1);
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
        var a = s.pushState;
        s.pushState = function() {
          a.apply(s, arguments), t._registerOnHashChange();
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
    const s = e.split("/").filter((o) => o.length > 0), a = v.routeList.filter((o) => {
      if (o.params.length === s.length && _e(o.url, e))
        return o;
      if (o.url === e)
        return o;
    }), n = a.length > 0 ? a[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, q(n.canActivate()).subscribe((o) => {
      if (!o)
        return;
      const p = v.checkParams(s, n);
      if (Object.keys(p).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(p));
        let m = [];
        v.isHistoryBasedRouting ? m = new URLSearchParams(window.location.search).entries() : m = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(m), n.isRegistered ? this._template.next(n.template) : n.templatePath ? q(n.templatePath()).subscribe(() => {
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
      for (const a of e)
        v.formatRoute(a);
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
