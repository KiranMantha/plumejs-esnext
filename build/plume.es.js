var X = Object.defineProperty;
var Z = (t, e, r) => e in t ? X(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var y = (t, e, r) => (Z(t, typeof e != "symbol" ? e + "" : e, r), r), I = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var b = (t, e, r) => (I(t, e, "read from private field"), r ? r.call(t) : e.get(t)), T = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, L = (t, e, r, s) => (I(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
var H = (t, e, r) => (I(t, e, "access private method"), r);
var N, U;
const B = new (U = class {
  constructor() {
    T(this, N, void 0);
    L(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!b(this, N).get(t))
      b(this, N).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = b(this, N).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    L(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), U)(), ee = (t) => typeof t == "function", J = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((r) => r.trim()) : [];
}, V = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), te = (t, e, r, s = !1) => (t.addEventListener(e, r, s), () => {
  t.removeEventListener(e, r, s);
}), re = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), r = (d) => {
    const _ = d.querySelectorAll("script");
    for (const w of _)
      w.remove();
  }, s = (d, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (_.includes("javascript:") || _.includes("data:")) || d.startsWith("on"))
      return !0;
  }, i = (d) => {
    const _ = d.attributes;
    for (const {
      name: w,
      value: O
    } of _)
      s(w, O) && d.removeAttribute(w);
  }, n = (d) => {
    const _ = d.children;
    for (const w of _)
      i(w), n(w);
  }, a = e();
  return r(a), n(a), a.innerHTML;
}, se = function(t) {
  t.renderCount === 1 && queueMicrotask(() => {
    t.update(), t.renderCount = 0;
  });
}, ne = (t, e) => {
  const r = J(e), s = () => ({
    get(i, n) {
      const a = Object.prototype.toString.call(i[n]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in i[n]) ? new Proxy(i[n], s()) : i[n];
    },
    set(i, n, a) {
      return i[n] = a, ++t.renderCount, se(t), !0;
    }
  });
  return class extends e {
    constructor(...i) {
      return super(...i), i.forEach((n, a) => {
        this[r[a]] = n;
      }), new Proxy(this, s());
    }
  };
}, Se = () => {
  let t;
  return [new Promise((r) => {
    t = r;
  }), t];
}, Y = (t, e, r) => {
  if (e.length > 0) {
    const s = [];
    for (const a of e)
      a.prototype.__metadata__.name !== "RENDERER" ? s.push(B.getService(a)) : s.push(r);
    const i = J(t), n = new t(...s);
    return e.forEach((a, d) => {
      n[i[d]] = s[d];
    }), n;
  } else
    return new t();
}, A = new class {
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
  html: $,
  render: oe
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
  }, w = (c) => {
    const o = document.createElement("template");
    return o.innerHTML = c, o.content;
  }, O = (c, o) => {
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
              l.removeEventListener(C, o[f]), C !== "bindprops" ? l.addEventListener(C, o[f]) : l.addEventListener(C, (E) => {
                E.detail.setProps(o[f]());
              });
              break;
            }
            case /ref/.test(p): {
              const C = ((E) => {
                const k = E;
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
  }, F = (c, o) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), m;
    for (; l; ) {
      if (m = n.exec(l.data)) {
        const u = Array.isArray(o[m[1]]) ? o[m[1]] : [o[m[1]]];
        l.replaceWith(...u), h.currentNode = c;
      }
      l = h.nextNode();
    }
  }, W = (c, o) => {
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
  }, g = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), S = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, v = (c, o) => {
    const h = o ? Array.from(o.childNodes) : [], l = c ? Array.from(c.childNodes) : [];
    let m = h.length - l.length;
    if (m > 0)
      for (; m > 0; m--)
        h[h.length - m].parentNode.removeChild(h[h.length - m]);
    l.forEach(function(u, p) {
      const f = h[p];
      if (W(u, f), !f) {
        o && o.appendChild(u);
        return;
      }
      if (g(u) !== g(f)) {
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
        const E = document.createDocumentFragment();
        v(u, E), f.appendChild(E);
        return;
      }
      if (u.childNodes.length > 0) {
        v(u, f);
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
        if (h += c[u - 1], t.test(h) && e.test(h) && (h = h.replace(t, (C, E, k) => `${r}${u - 1}=${k || '"'}${E}${k ? "" : '"'}`), f = !0), !f)
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
      const m = w(h.trim());
      return O(m, o), F(m, o), m;
    },
    render: (c, o) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(o)) : v(o, c), a.forEach((h) => {
        h();
      }), a = [];
    }
  };
})();
class ie {
  constructor(e, r) {
    y(this, "_shadowRoot");
    y(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    y(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    y(this, "emitEvent");
    this._hostElement = e, this._shadowRoot = r;
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
const ae = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, q = (t, e) => {
  const r = document.createElement("style");
  return r.innerHTML = t, e && e.appendChild(r), r;
}, ce = (t, e) => {
  var r, s, i, n, G, d, K, w, j, F;
  if (t = {
    ...ae,
    ...t
  }, t.styles = t.styles.toString(), t.root && !A.isRootNodeSet)
    A.isRootNodeSet = !0, t.styles && (A.globalStyles.replace(t.styles), A.globalStyleTag = q(t.styles, document.head));
  else if (t.root && A.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (F = class extends HTMLElement {
    constructor() {
      super();
      T(this, n);
      /**
       * user defined functions
       */
      T(this, d);
      T(this, w);
      T(this, r, void 0);
      T(this, s, void 0);
      T(this, i, void 0);
      y(this, "renderCount", 0);
      L(this, s, this.attachShadow({
        mode: "open"
      })), V || (b(this, s).adoptedStyleSheets = A.getComputedCss(t.styles, t.standalone)), H(this, n, G).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const g = b(this, r).render();
      typeof g == "string" ? b(this, s).innerHTML = re(g) : oe(b(this, s), g), V && (t.styles && b(this, s).insertBefore(b(this, i), b(this, s).childNodes[0]), A.globalStyleTag && !t.standalone && b(this, s).insertBefore(document.importNode(A.globalStyleTag, !0), b(this, s).childNodes[0]));
    }
    setProps(g) {
      var S, v;
      for (const [R, P] of Object.entries(g))
        e.observedProperties.find((c) => c === R) && (b(this, r)[R] = P);
      (v = (S = b(this, r)).onPropertiesChanged) == null || v.call(S);
    }
    getInstance() {
      return b(this, r);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var g, S, v, R;
      H(this, d, K).call(this), (S = (g = b(this, r)).beforeMount) == null || S.call(g), this.update(), (R = (v = b(this, r)).mount) == null || R.call(v), H(this, w, j).call(this, "bindprops", {
        setProps: (P) => {
          this.setProps(P);
        }
      }, !1);
    }
    attributeChangedCallback(g, S, v) {
      var R, P;
      (P = (R = b(this, r)).onAttributesChanged) == null || P.call(R, g, S, v);
    }
    disconnectedCallback() {
      var g, S;
      this.renderCount = 1, (S = (g = b(this, r)).unmount) == null || S.call(g);
    }
  }, r = new WeakMap(), s = new WeakMap(), i = new WeakMap(), n = new WeakSet(), G = function() {
    const g = new ie(this, b(this, s));
    g.update = () => {
      this.update();
    }, g.emitEvent = (S, v) => {
      H(this, w, j).call(this, S, v);
    }, L(this, r, Y(ne(this, e), t.deps, g));
  }, d = new WeakSet(), K = function() {
    V && t.styles && L(this, i, q(t.styles));
  }, w = new WeakSet(), j = function(g, S) {
    const v = new CustomEvent(g, {
      detail: S
    });
    this.dispatchEvent(v);
  }, F));
}, le = {
  deps: []
}, ue = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || ce(t, e);
}, Q = (t = {}) => (e) => {
  if (t = {
    ...le,
    ...t
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, t.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const r = Y(e, t.deps);
  B.register(e, r);
}, he = (t) => {
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
class de {
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
    return this._errors.clear(), this;
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
  const s = new de(r, e);
  return [s, (a) => (d) => {
    const _ = he(d.target);
    s.get(a).value = _;
  }, () => s.reset()];
}, ve = (t) => {
  let e = t;
  return [e, (s) => {
    let i;
    ee(s) ? i = s(e) : i = s, Object.assign(e, i);
  }];
};
class Ce {
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
const fe = (t) => !!t && typeof t.subscribe == "function", me = (t) => !!t && typeof t.then == "function", pe = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), ge = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((r) => {
      e(r);
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
const z = (t) => fe(t) ? t : me(t) ? ge(Promise.resolve(t)) : pe(t), M = class {
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
let x = M;
y(x, "routeList", []);
class D {
  constructor() {
    y(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, "_template", new be());
    y(this, "_unSubscribeHashEvent");
    y(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  startHashChange() {
    this._unSubscribeHashEvent = te(window, "hashchange", () => {
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
    const s = e.split("/").filter((a) => a.length > 0), i = x.routeList.filter((a) => {
      if (a.params.length === s.length && this._routeMatcher(a.url, e))
        return a;
      if (a.url === e)
        return a;
    }), n = i.length > 0 ? i[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...r || {}
    }, z(n.canActivate()).subscribe((a) => {
      if (!a)
        return;
      const d = x.checkParams(s, n);
      if (Object.keys(d).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(d));
        const _ = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
        this._currentRoute.queryParams = new Map(_), n.isRegistered ? this._template.next(n.template) : n.templatePath && z(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        });
      } else
        this.navigateTo(n.redirectTo, r);
    }));
  }
}
Q()(D);
const Re = () => {
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
        return r.raw = [`${this._template}`], $(r);
      } else
        return $``;
    }
  }
  ue({
    selector: "router-outlet",
    deps: [D]
  })(t);
};
class _e {
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
        x.formatRoute(s);
      r ? x.preloadRoutes() : x.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Q({
  deps: [D]
})(_e);
export {
  ue as Component,
  Q as Injectable,
  ie as Renderer,
  _e as Router,
  Ce as Validators,
  te as fromEvent,
  $ as html,
  Se as promisify,
  Re as registerRouterComponent,
  oe as render,
  we as useFormFields,
  ve as useState
};
