var oe = Object.defineProperty;
var ie = (t, e, r) => e in t ? oe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var w = (t, e, r) => (ie(t, typeof e != "symbol" ? e + "" : e, r), r), q = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var i = (t, e, r) => (q(t, e, "read from private field"), r ? r.call(t) : e.get(t)), R = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, A = (t, e, r, s) => (q(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
var H = (t, e, r) => (q(t, e, "access private method"), r);
var L, Q;
const X = new (Q = class {
  constructor() {
    R(this, L, void 0);
    A(this, L, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!i(this, L).get(t))
      i(this, L).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = i(this, L).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    A(this, L, /* @__PURE__ */ new WeakMap());
  }
}, L = new WeakMap(), Q)(), ae = (t) => typeof t == "function", Z = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((r) => r.trim()) : [];
}, z = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), ce = (t, e, r, s = !1) => (t.addEventListener(e, r, s), () => {
  t.removeEventListener(e, r, s);
}), le = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), r = (f) => {
    const y = f.querySelectorAll("script");
    for (const S of y)
      S.remove();
  }, s = (f, y) => {
    if (y = y.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (y.includes("javascript:") || y.includes("data:")) || f.startsWith("on"))
      return !0;
  }, a = (f) => {
    const y = f.attributes;
    for (const {
      name: S,
      value: $
    } of y)
      s(S, $) && f.removeAttribute(S);
  }, n = (f) => {
    const y = f.children;
    for (const S of y)
      a(S), n(S);
  }, h = e();
  return r(h), n(h), h.innerHTML;
}, ue = function(t) {
  t.renderCount === 1 && queueMicrotask(() => {
    t.update(), t.renderCount = 0;
  });
}, he = (t, e) => {
  const r = Z(e), s = () => ({
    get(a, n) {
      return ["[object Object]", "[object Array]"].indexOf(Object.prototype.toString.call(a[n])) > -1 && !("__metadata__" in a[n]) ? new Proxy(a[n], s()) : a[n];
    },
    set(a, n, h) {
      return a[n] = h, ++t.renderCount, ue(t), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((n, h) => {
        this[r[h]] = n;
      }), new Proxy(this, s());
    }
  };
}, ee = (t, e, r) => {
  if (e.length > 0) {
    const s = [];
    for (const h of e)
      h.prototype.__metadata__.name !== "RENDERER" ? s.push(X.getService(h)) : s.push(r);
    const a = Z(t), n = new t(...s);
    return e.forEach((h, f) => {
      n[a[f]] = s[f];
    }), n;
  } else
    return new t();
}, P = new class {
  constructor() {
    w(this, "globalStyles");
    w(this, "globalStyleTag");
    w(this, "style_registry");
    w(this, "isRootNodeSet");
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
  html: Y,
  render: de
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, r = "attr", s = /^attr([^ ]+)/, a = "insertNode", n = /^insertNode([^ ]+)/;
  let h = [];
  const f = (c) => {
    const o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let d = JSON.stringify(c);
    const l = (u) => o[u] || u;
    return d = ((u) => u.replace(/[&<>\(\)]/g, l))(d), JSON.parse(d);
  }, y = (c, o) => {
    const d = c.options, l = Array.isArray(o) ? o : [o];
    let p, u, g = d.length;
    for (; g--; ) {
      u = d[g];
      const m = u.getAttribute("value") ?? (u.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (u.selected = l.indexOf(m) > -1) && (p = !0);
    }
    p || (c.selectedIndex = -1);
  }, S = (c) => {
    const o = document.createElement("template");
    return o.innerHTML = c, o.content;
  }, $ = (c, o) => {
    const d = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let l = d.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const p = Array.from(l.attributes).filter((u) => s.test(u.nodeName));
        for (const {
          nodeName: u,
          nodeValue: g
        } of p) {
          const m = s.exec(u)[1];
          switch (!0) {
            case /^on+/.test(g): {
              const E = g.slice(2).toLowerCase();
              l.removeEventListener(E, o[m]), E !== "bindprops" ? l.addEventListener(E, o[m]) : l.addEventListener(E, (N) => {
                N.detail.setProps(o[m]());
              });
              break;
            }
            case /ref/.test(g): {
              const E = ((N) => {
                const O = N;
                return () => {
                  O.isConnected && o[m](O);
                };
              })(l);
              h.push(E);
              break;
            }
            case /^data-+/.test(g):
            case /^aria-+/.test(g): {
              l.setAttribute(g, f(o[m]));
              break;
            }
            case /class/.test(g): {
              o[m] ? l.classList.add(...o[m].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(g): {
              l.nodeName.toLowerCase() === "select" ? y(l, o[m]) : l.value = f(o[m]);
              break;
            }
            case /disabled/.test(g):
            case /checked/.test(g): {
              o[m] ? l.setAttribute(g, o[m]) : l.removeAttribute(g);
              break;
            }
            default:
              l.setAttribute(g, f(o[m]));
          }
          l.removeAttribute(u);
        }
      }
      l = d.nextNode();
    }
  }, V = (c, o) => {
    const d = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = d.nextNode(), p;
    for (; l; ) {
      if (p = n.exec(l.data)) {
        const u = Array.isArray(o[p[1]]) ? o[p[1]] : [o[p[1]]];
        l.replaceWith(...u), d.currentNode = c;
      }
      l = d.nextNode();
    }
  }, J = (c, o) => {
    if (!c || !o || c.nodeType !== 1 || o.nodeType !== 1)
      return;
    const d = c.attributes, l = o.attributes;
    for (const {
      name: p,
      value: u
    } of d)
      (!l[p] || l[p] !== u) && o.setAttribute(p, u);
    for (const {
      name: p
    } of l)
      d[p] || o.removeAttribute(p);
  }, b = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), _ = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, v = (c, o) => {
    const d = o ? Array.from(o.childNodes) : [], l = c ? Array.from(c.childNodes) : [];
    let p = d.length - l.length;
    if (p > 0)
      for (; p > 0; p--)
        d[d.length - p].parentNode.removeChild(d[d.length - p]);
    l.forEach(function(u, g) {
      const m = d[g];
      if (J(u, m), !m) {
        o && o.appendChild(u);
        return;
      }
      if (b(u) !== b(m)) {
        m.replaceWith(u);
        return;
      }
      const E = _(u);
      if (E && E !== _(m)) {
        m.textContent = E;
        return;
      }
      if (m.childNodes.length > 0 && u.childNodes.length < 1) {
        m.innerHTML = "";
        return;
      }
      if (m.childNodes.length < 1 && u.childNodes.length > 0) {
        const N = document.createDocumentFragment();
        v(u, N), m.appendChild(N);
        return;
      }
      if (u.childNodes.length > 0) {
        v(u, m);
        return;
      }
    });
  };
  return {
    html: (c, ...o) => {
      let d = "";
      const {
        length: l
      } = c;
      for (let u = 1; u < l; u++) {
        const g = o[u - 1];
        let m = !1;
        if (d += c[u - 1], t.test(d) && e.test(d) && (d = d.replace(t, (E, N, O) => `${r}${u - 1}=${O || '"'}${N}${O ? "" : '"'}`), m = !0), !m)
          switch (!0) {
            case Array.isArray(g):
            case g instanceof DocumentFragment: {
              d += `<!--${a}${u - 1}-->`;
              break;
            }
            case (typeof g == "object" && g !== null): {
              "html" in g && (d += g.html);
              break;
            }
            default:
              d += g;
          }
      }
      d += c[l - 1];
      const p = S(d.trim());
      return $(p, o), V(p, o), p;
    },
    render: (c, o) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(o)) : v(o, c), h.forEach((d) => {
        d();
      }), h = [];
    }
  };
})();
var I, j;
class fe {
  constructor(e, r) {
    R(this, I, void 0);
    R(this, j, void 0);
    /**
     * {() => void} used to update DOM with new state
     */
    w(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    w(this, "emitEvent");
    A(this, j, e), A(this, I, r);
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
    return i(this, I);
  }
  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return i(this, j);
  }
}
I = new WeakMap(), j = new WeakMap();
const me = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, G = (t, e) => {
  const r = document.createElement("style");
  return r.innerHTML = t, e && e.appendChild(r), r;
}, pe = (t, e) => {
  var r, s, a, n, te, f, re, S, U, V;
  if (t = {
    ...me,
    ...t
  }, t.styles = t.styles.toString(), t.root && !P.isRootNodeSet)
    P.isRootNodeSet = !0, t.styles && (P.globalStyles.replace(t.styles), P.globalStyleTag = G(t.styles, document.head));
  else if (t.root && P.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (V = class extends HTMLElement {
    constructor() {
      super();
      R(this, n);
      /**
       * user defined functions
       */
      R(this, f);
      R(this, S);
      R(this, r, void 0);
      R(this, s, void 0);
      R(this, a, void 0);
      w(this, "renderCount", 0);
      A(this, s, this.attachShadow({
        mode: "open"
      })), z || (i(this, s).adoptedStyleSheets = P.getComputedCss(t.styles, t.standalone)), H(this, n, te).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = i(this, r).render();
      typeof b == "string" ? i(this, s).innerHTML = le(b) : de(i(this, s), b), z && (t.styles && i(this, s).insertBefore(i(this, a), i(this, s).childNodes[0]), P.globalStyleTag && !t.standalone && i(this, s).insertBefore(document.importNode(P.globalStyleTag, !0), i(this, s).childNodes[0]));
    }
    setProps(b) {
      var _, v;
      for (const [x, k] of Object.entries(b))
        e.observedProperties.find((c) => c === x) && (i(this, r)[x] = k);
      (v = (_ = i(this, r)).onPropertiesChanged) == null || v.call(_);
    }
    getInstance() {
      return i(this, r);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, _, v, x;
      H(this, f, re).call(this), (_ = (b = i(this, r)).beforeMount) == null || _.call(b), this.update(), (x = (v = i(this, r)).mount) == null || x.call(v), H(this, S, U).call(this, "bindprops", {
        setProps: (k) => {
          this.setProps(k);
        }
      }, !1);
    }
    attributeChangedCallback(b, _, v) {
      var x, k;
      (k = (x = i(this, r)).onAttributesChanged) == null || k.call(x, b, _, v);
    }
    disconnectedCallback() {
      var b, _;
      this.renderCount = 1, (_ = (b = i(this, r)).unmount) == null || _.call(b);
    }
  }, r = new WeakMap(), s = new WeakMap(), a = new WeakMap(), n = new WeakSet(), te = function() {
    const b = new fe(this, i(this, s));
    b.update = () => {
      this.update();
    }, b.emitEvent = (_, v) => {
      H(this, S, U).call(this, _, v);
    }, A(this, r, ee(he(this, e), t.deps, b));
  }, f = new WeakSet(), re = function() {
    z && t.styles && A(this, a, G(t.styles));
  }, S = new WeakSet(), U = function(b, _) {
    const v = new CustomEvent(b, {
      detail: _
    });
    this.dispatchEvent(v);
  }, V));
}, ge = {
  deps: []
}, be = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || pe(t, e);
}, se = (t = {}) => (e) => {
  if (t = {
    ...ge,
    ...t
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, t.deps.some((s) => s.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const r = ee(e, t.deps);
  X.register(e, r);
}, ye = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const r = t.type === "select-one", a = [...Array.from(t.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = r ? a[0] : a;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
var D, C, T, W, ne;
class _e {
  constructor(e, r) {
    R(this, W);
    R(this, D, void 0);
    R(this, C, void 0);
    R(this, T, /* @__PURE__ */ new Map());
    A(this, D, e), A(this, C, r);
  }
  get errors() {
    return i(this, T);
  }
  get valid() {
    return H(this, W, ne).call(this), !i(this, T).size;
  }
  get value() {
    const e = {};
    for (const [r, s] of Object.entries(i(this, C)))
      e[r] = s.value;
    return e;
  }
  get(e) {
    return i(this, C)[e];
  }
  reset(e = {}) {
    for (const r in i(this, C))
      i(this, C)[r].value = e[r] || i(this, D)[r];
    i(this, T).clear();
  }
}
D = new WeakMap(), C = new WeakMap(), T = new WeakMap(), W = new WeakSet(), ne = function() {
  i(this, T).clear();
  for (const e in i(this, C)) {
    const r = i(this, C)[e].value, s = i(this, C)[e].validators;
    i(this, C)[e].errors = null;
    for (const a of s) {
      const n = a(r);
      n !== null && (i(this, T).has(e) ? (i(this, T).set(e, {
        ...i(this, T).get(e),
        ...n
      }), i(this, C)[e].errors = {
        ...i(this, C)[e].errors,
        ...n
      }) : (i(this, T).set(e, n), i(this, C)[e].errors = n));
    }
  }
};
const Ae = (t) => {
  const e = {}, r = {};
  for (const [h, f] of Object.entries(t)) {
    const y = Array.isArray(f) ? f : [f];
    e[h] = {
      value: y.shift(),
      validators: y
    }, r[h] = e[h].value;
  }
  const s = new _e(r, e);
  return [s, (h) => (f) => {
    const y = ye(f.target);
    s.get(h).value = y;
  }, () => {
    s.reset();
  }];
}, xe = (t) => {
  let e = t;
  return [e, (s) => {
    let a;
    ae(s) ? a = s(e) : a = s, Object.assign(e, a);
  }];
};
class Ne {
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
const Se = (t) => !!t && typeof t.subscribe == "function", ve = (t) => !!t && typeof t.then == "function", we = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Ce = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((r) => {
      e(r);
    });
  }
});
class Re {
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
const K = (t) => Se(t) ? t : ve(t) ? Ce(Promise.resolve(t)) : we(t), F = class {
  static checkParams(e, r) {
    let s = 0;
    const a = {}, n = r.paramCount;
    for (let h = 0; h < e.length; h++) {
      const f = r.params[h];
      f.indexOf(":") >= 0 && (a[f.split(":")[1]] = e[h].split("?")[0], s += 1);
    }
    return s === n ? a : {};
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
    e.canActivate && (r.canActivate = e.canActivate), r.paramCount = F.getParamCount(r.params), F.routeList.push(r);
  }
  static preloadRoutes() {
    for (const e of F.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = F.routeList.filter((r) => r.preload === !0);
    for (const r of e)
      r.templatePath && r.templatePath();
  }
};
let M = F;
w(M, "routeList", []);
class B {
  constructor() {
    w(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    w(this, "_template", new Re());
    w(this, "_unSubscribeHashEvent");
    w(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  startHashChange() {
    this._unSubscribeHashEvent = ce(window, "hashchange", () => {
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
    const s = e.split("/").filter((h) => h.length > 0), a = M.routeList.filter((h) => {
      if (h.params.length === s.length && this._routeMatcher(h.url, e))
        return h;
      if (h.url === e)
        return h;
    }), n = a.length > 0 ? a[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...r || {}
    }, K(n.canActivate()).subscribe((h) => {
      if (!h)
        return;
      const f = M.checkParams(s, n);
      if (Object.keys(f).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(f));
        const y = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
        this._currentRoute.queryParams = new Map(y), n.isRegistered ? this._template.next(n.template) : n.templatePath && K(n.templatePath()).subscribe(() => {
          n.isRegistered = !0, this._template.next(n.template);
        });
      } else
        this.navigateTo(n.redirectTo, r);
    }));
  }
}
se()(B);
const Pe = () => {
  class t {
    constructor(r) {
      w(this, "_template", "");
      w(this, "_subscriptions");
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
        return r.raw = [`${this._template}`], Y(r);
      } else
        return Y``;
    }
  }
  be({
    selector: "router-outlet",
    deps: [B]
  })(t);
};
class Ee {
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
        M.formatRoute(s);
      r ? M.preloadRoutes() : M.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
se({
  deps: [B]
})(Ee);
export {
  be as Component,
  se as Injectable,
  fe as Renderer,
  Ee as Router,
  Ne as Validators,
  ce as fromEvent,
  Y as html,
  Pe as registerRouterComponent,
  de as render,
  Ae as useFormFields,
  xe as useState
};
