var ee = Object.defineProperty;
var te = (t, e, r) => e in t ? ee(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var y = (t, e, r) => (te(t, typeof e != "symbol" ? e + "" : e, r), r), j = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var g = (t, e, r) => (j(t, e, "read from private field"), r ? r.call(t) : e.get(t)), R = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, A = (t, e, r, s) => (j(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
var H = (t, e, r) => (j(t, e, "access private method"), r);
var N, J;
const Y = new (J = class {
  constructor() {
    R(this, N, void 0);
    A(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!g(this, N).get(t))
      g(this, N).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = g(this, N).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    A(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), J)(), re = (t) => typeof t == "function", G = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((r) => r.trim()) : [];
}, D = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), se = (t, e, r, s = !1) => (t.addEventListener(e, r, s), () => {
  t.removeEventListener(e, r, s);
}), ne = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), r = (d) => {
    const _ = d.querySelectorAll("script");
    for (const v of _)
      v.remove();
  }, s = (d, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (_.includes("javascript:") || _.includes("data:")) || d.startsWith("on"))
      return !0;
  }, i = (d) => {
    const _ = d.attributes;
    for (const {
      name: v,
      value: V
    } of _)
      s(v, V) && d.removeAttribute(v);
  }, n = (d) => {
    const _ = d.children;
    for (const v of _)
      i(v), n(v);
  }, a = e();
  return r(a), n(a), a.innerHTML;
}, oe = function(t) {
  t.renderCount === 1 && queueMicrotask(() => {
    t.update(), t.renderCount = 0;
  });
}, ie = (t, e) => {
  const r = G(e), s = () => ({
    get(i, n) {
      const a = Object.prototype.toString.call(i[n]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in i[n]) ? new Proxy(i[n], s()) : i[n];
    },
    set(i, n, a) {
      return i[n] = a, ++t.renderCount, oe(t), !0;
    }
  });
  return class extends e {
    constructor(...i) {
      return super(...i), i.forEach((n, a) => {
        this[r[a]] = n;
      }), new Proxy(this, s());
    }
  };
}, K = (t, e, r) => {
  if (e.length > 0) {
    const s = [];
    for (const a of e)
      a.prototype.__metadata__.name !== "RENDERER" ? s.push(Y.getService(a)) : s.push(r);
    const i = G(t), n = new t(...s);
    return e.forEach((a, d) => {
      n[i[d]] = s[d];
    }), n;
  } else
    return new t();
}, x = new class {
  constructor() {
    y(this, "globalStyles");
    y(this, "globalStyleTag");
    y(this, "style_registry");
    y(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(t = "") {
    let e = [];
    const r = new CSSStyleSheet();
    if (r.insertRule(":host { display: block; }"), e = [this.globalStyles, r], t) {
      const s = new CSSStyleSheet();
      s.replace(t), e.push(s);
    }
    return e;
  }
}(), {
  html: z,
  render: ae
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, r = "attr", s = /^attr([^ ]+)/, i = "insertNode", n = /^insertNode([^ ]+)/;
  let a = [];
  const d = (c) => {
    const o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(c);
    const l = (u) => o[u] || u;
    return h = ((u) => u.replace(/[&<>\(\)]/g, l))(h), JSON.parse(h);
  }, _ = (c, o) => {
    const h = c.options, l = Array.isArray(o) ? o : [o];
    let m, u, p = h.length;
    for (; p--; ) {
      u = h[p];
      const f = u.getAttribute("value") ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (u.selected = l.indexOf(f) > -1) && (m = !0);
    }
    m || (c.selectedIndex = -1);
  }, v = (c) => {
    const o = document.createElement("template");
    return o.innerHTML = c, o.content;
  }, V = (c, o) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let l = h.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const m = Array.from(l.attributes).filter((u) => s.test(u.nodeName));
        for (const {
          nodeName: u,
          nodeValue: p
        } of m) {
          const f = s.exec(u)[1];
          switch (!0) {
            case /^on+/.test(p): {
              const C = p.slice(2).toLowerCase();
              l.removeEventListener(C, o[f]), C !== "bindprops" ? l.addEventListener(C, o[f]) : l.addEventListener(C, (T) => {
                T.detail.setProps(o[f]());
              });
              break;
            }
            case /ref/.test(p): {
              const C = ((T) => {
                const k = T;
                return () => {
                  k.isConnected && o[f](k);
                };
              })(l);
              a.push(C);
              break;
            }
            case /^data-+/.test(p):
            case /^aria-+/.test(p): {
              l.setAttribute(p, d(o[f]));
              break;
            }
            case /class/.test(p): {
              o[f] ? l.classList.add(...o[f].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(p): {
              l.nodeName.toLowerCase() === "select" ? _(l, o[f]) : l.value = d(o[f]);
              break;
            }
            case /disabled/.test(p):
            case /checked/.test(p): {
              o[f] ? l.setAttribute(p, o[f]) : l.removeAttribute(p);
              break;
            }
            default:
              l.setAttribute(p, d(o[f]));
          }
          l.removeAttribute(u);
        }
      }
      l = h.nextNode();
    }
  }, I = (c, o) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), m;
    for (; l; ) {
      if (m = n.exec(l.data)) {
        const u = Array.isArray(o[m[1]]) ? o[m[1]] : [o[m[1]]];
        l.replaceWith(...u), h.currentNode = c;
      }
      l = h.nextNode();
    }
  }, q = (c, o) => {
    if (!c || !o || c.nodeType !== 1 || o.nodeType !== 1)
      return;
    const h = c.attributes, l = o.attributes;
    for (const {
      name: m,
      value: u
    } of h)
      (!l[m] || l[m] !== u) && o.setAttribute(m, u);
    for (const {
      name: m
    } of l)
      h[m] || o.removeAttribute(m);
  }, b = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), S = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, w = (c, o) => {
    const h = o ? Array.from(o.childNodes) : [], l = c ? Array.from(c.childNodes) : [];
    let m = h.length - l.length;
    if (m > 0)
      for (; m > 0; m--)
        h[h.length - m].parentNode.removeChild(h[h.length - m]);
    l.forEach(function(u, p) {
      const f = h[p];
      if (q(u, f), !f) {
        o && o.appendChild(u);
        return;
      }
      if (b(u) !== b(f)) {
        f.replaceWith(u);
        return;
      }
      const C = S(u);
      if (C && C !== S(f)) {
        f.textContent = C;
        return;
      }
      if (f.childNodes.length > 0 && u.childNodes.length < 1) {
        f.innerHTML = "";
        return;
      }
      if (f.childNodes.length < 1 && u.childNodes.length > 0) {
        const T = document.createDocumentFragment();
        w(u, T), f.appendChild(T);
        return;
      }
      if (u.childNodes.length > 0) {
        w(u, f);
        return;
      }
    });
  };
  return {
    html: (c, ...o) => {
      let h = "";
      const {
        length: l
      } = c;
      for (let u = 1; u < l; u++) {
        const p = o[u - 1];
        let f = !1;
        if (h += c[u - 1], t.test(h) && e.test(h) && (h = h.replace(t, (C, T, k) => `${r}${u - 1}=${k || '"'}${T}${k ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(p):
            case p instanceof DocumentFragment: {
              h += `<!--${i}${u - 1}-->`;
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
      h += c[l - 1];
      const m = v(h.trim());
      return V(m, o), I(m, o), m;
    },
    render: (c, o) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(o)) : w(o, c), a.forEach((h) => {
        h();
      }), a = [];
    }
  };
})();
var F, O;
class ce {
  constructor(e, r) {
    R(this, F, void 0);
    R(this, O, void 0);
    /**
     * {() => void} used to update DOM with new state
     */
    y(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    y(this, "emitEvent");
    A(this, O, e), A(this, F, r);
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
    return g(this, F);
  }
  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return g(this, O);
  }
}
F = new WeakMap(), O = new WeakMap();
const le = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, U = (t, e) => {
  const r = document.createElement("style");
  return r.innerHTML = t, e && e.appendChild(r), r;
}, ue = (t, e) => {
  var r, s, i, n, Q, d, X, v, W, I;
  if (t = {
    ...le,
    ...t
  }, t.styles = t.styles.toString(), t.root && !x.isRootNodeSet)
    x.isRootNodeSet = !0, t.styles && (x.globalStyles.replace(t.styles), x.globalStyleTag = U(t.styles, document.head));
  else if (t.root && x.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (I = class extends HTMLElement {
    constructor() {
      super();
      R(this, n);
      /**
       * user defined functions
       */
      R(this, d);
      R(this, v);
      R(this, r, void 0);
      R(this, s, void 0);
      R(this, i, void 0);
      y(this, "renderCount", 0);
      A(this, s, this.attachShadow({
        mode: "open"
      })), D || (g(this, s).adoptedStyleSheets = x.getComputedCss(t.styles, t.standalone)), H(this, n, Q).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = g(this, r).render();
      typeof b == "string" ? g(this, s).innerHTML = ne(b) : ae(g(this, s), b), D && (t.styles && g(this, s).insertBefore(g(this, i), g(this, s).childNodes[0]), x.globalStyleTag && !t.standalone && g(this, s).insertBefore(document.importNode(x.globalStyleTag, !0), g(this, s).childNodes[0]));
    }
    setProps(b) {
      var S, w;
      for (const [E, L] of Object.entries(b))
        e.observedProperties.find((c) => c === E) && (g(this, r)[E] = L);
      (w = (S = g(this, r)).onPropertiesChanged) == null || w.call(S);
    }
    getInstance() {
      return g(this, r);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, S, w, E;
      H(this, d, X).call(this), (S = (b = g(this, r)).beforeMount) == null || S.call(b), this.update(), (E = (w = g(this, r)).mount) == null || E.call(w), H(this, v, W).call(this, "bindprops", {
        setProps: (L) => {
          this.setProps(L);
        }
      }, !1);
    }
    attributeChangedCallback(b, S, w) {
      var E, L;
      (L = (E = g(this, r)).onAttributesChanged) == null || L.call(E, b, S, w);
    }
    disconnectedCallback() {
      var b, S;
      this.renderCount = 1, (S = (b = g(this, r)).unmount) == null || S.call(b);
    }
  }, r = new WeakMap(), s = new WeakMap(), i = new WeakMap(), n = new WeakSet(), Q = function() {
    const b = new ce(this, g(this, s));
    b.update = () => {
      this.update();
    }, b.emitEvent = (S, w) => {
      H(this, v, W).call(this, S, w);
    }, A(this, r, K(ie(this, e), t.deps, b));
  }, d = new WeakSet(), X = function() {
    D && t.styles && A(this, i, U(t.styles));
  }, v = new WeakSet(), W = function(b, S) {
    const w = new CustomEvent(b, {
      detail: S
    });
    this.dispatchEvent(w);
  }, I));
}, he = {
  deps: []
}, de = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || ue(t, e);
}, Z = (t = {}) => (e) => {
  if (t = {
    ...he,
    ...t
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, t.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const r = K(e, t.deps);
  Y.register(e, r);
}, fe = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const r = t.type === "select-one", i = [...Array.from(t.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = r ? i[0] : i;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
class me {
  constructor(e, r) {
    y(this, "_initialValues");
    y(this, "_controls");
    y(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = e, this._controls = r;
  }
  get errors() {
    return this._errors;
  }
  get valid() {
    return this._checkValidity(), !this._errors.size;
  }
  get value() {
    const e = {};
    for (const [r, s] of Object.entries(this._controls))
      e[r] = s.value;
    return e;
  }
  get(e) {
    return this._controls[e];
  }
  reset(e = {}) {
    for (const r in this._controls)
      this._controls[r].value = e[r] || this._initialValues[r];
    this._errors.clear();
  }
  _checkValidity() {
    this._errors.clear();
    for (const e in this._controls) {
      const r = this._controls[e].value, s = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const i of s) {
        const n = i(r);
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
const we = (t) => {
  const e = {}, r = {};
  for (const [a, d] of Object.entries(t)) {
    const _ = Array.isArray(d) ? d : [d];
    e[a] = {
      value: _.shift(),
      validators: _
    }, r[a] = e[a].value;
  }
  const s = new me(r, e);
  return [s, (a) => (d) => {
    const _ = fe(d.target);
    s.get(a).value = _;
  }, () => {
    s.reset();
  }];
}, Ce = (t) => {
  let e = t;
  return [e, (s) => {
    let i;
    re(s) ? i = s(e) : i = s, Object.assign(e, i);
  }];
};
class Re {
  static required(e) {
    return e.length ? null : {
      required: !0
    };
  }
  static min(e) {
    return (r) => r.length >= e ? null : {
      minLength: {
        requiredLength: e
      }
    };
  }
  static max(e) {
    return (r) => r.length <= e ? null : {
      maxLength: {
        requiredLength: e
      }
    };
  }
  static pattern(e) {
    return (r) => new RegExp(e).test(r) ? null : {
      pattern: !0
    };
  }
}
const pe = (t) => !!t && typeof t.subscribe == "function", ge = (t) => !!t && typeof t.then == "function", be = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), _e = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((r) => {
      e(r);
    });
  }
});
class ye {
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
const B = (t) => pe(t) ? t : ge(t) ? _e(Promise.resolve(t)) : be(t), M = class {
  static checkParams(e, r) {
    let s = 0;
    const i = {}, n = r.paramCount;
    for (let a = 0; a < e.length; a++) {
      const d = r.params[a];
      d.indexOf(":") >= 0 && (i[d.split(":")[1]] = e[a].split("?")[0], s += 1);
    }
    return s === n ? i : {};
  }
  static getParamCount(e) {
    let r = 0;
    return e.forEach((s) => {
      s.indexOf(":") >= 0 && (r += 1);
    }), r;
  }
  static formatRoute(e) {
    const r = {
      params: {},
      url: "",
      template: "",
      paramCount: 0,
      isRegistered: !1,
      redirectTo: "",
      preload: e.preload,
      canActivate: () => !0
    };
    if (r.params = e.path.split("/").filter((s) => s.length > 0), r.url = e.path, r.template = "", r.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      r.template = e.template, r.templatePath = e.templatePath;
    }
    e.canActivate && (r.canActivate = e.canActivate), r.paramCount = M.getParamCount(r.params), M.routeList.push(r);
  }
  static preloadRoutes() {
    for (const e of M.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = M.routeList.filter((r) => r.preload === !0);
    for (const r of e)
      r.templatePath && r.templatePath();
  }
};
let P = M;
y(P, "routeList", []);
class $ {
  constructor() {
    y(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, "_template", new ye());
    y(this, "_unSubscribeHashEvent");
    y(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  startHashChange() {
    this._unSubscribeHashEvent = se(window, "hashchange", () => {
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
  navigateTo(e = "", r) {
    this._routeStateMap.clear(), e ? (window.location.hash.replace(/^#/, "") === e && this._navigateTo(e, r), this._routeStateMap.set(e, r), window.location.hash = "#" + e) : this._navigateTo(e, r);
  }
  _registerOnHashChange() {
    const e = window.location.hash.replace(/^#/, ""), r = this._routeStateMap.get(e);
    this._navigateTo(e, r);
  }
  _routeMatcher(e, r) {
    if (e) {
      const s = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
      return r.match(s);
    } else
      return e === r;
  }
  _navigateTo(e, r) {
    const s = e.split("/").filter((a) => a.length > 0), i = P.routeList.filter((a) => {
      if (a.params.length === s.length && this._routeMatcher(a.url, e))
        return a;
      if (a.url === e)
        return a;
    }), n = i.length > 0 ? i[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...r || {}
    }, B(n.canActivate()).subscribe((a) => {
      if (!a)
        return;
      const d = P.checkParams(s, n);
      if (Object.keys(d).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(d));
        const _ = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
        this._currentRoute.queryParams = new Map(_), n.isRegistered ? this._template.next(n.template) : n.templatePath && B(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        });
      } else
        this.navigateTo(n.redirectTo, r);
    }));
  }
}
Z()($);
const Ee = () => {
  class t {
    constructor(r) {
      y(this, "_template", "");
      y(this, "_subscriptions");
    }
    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((r) => {
        this._template = r;
      }), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let r = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(r);
    }
    unmount() {
      this._subscriptions(), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (this._template) {
        const r = [`${this._template}`];
        return r.raw = [`${this._template}`], z(r);
      } else
        return z``;
    }
  }
  de({
    selector: "router-outlet",
    deps: [$]
  })(t);
};
class Se {
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
  navigateTo(e, r) {
    this.internalRouter.navigateTo(e, r);
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
  registerRoutes(e, r = !1) {
    if (Array.isArray(e)) {
      for (const s of e)
        P.formatRoute(s);
      r ? P.preloadRoutes() : P.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [$]
})(Se);
export {
  de as Component,
  Z as Injectable,
  ce as Renderer,
  Se as Router,
  Re as Validators,
  se as fromEvent,
  z as html,
  Ee as registerRouterComponent,
  ae as render,
  we as useFormFields,
  Ce as useState
};
