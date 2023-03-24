var fe = Object.defineProperty;
var me = (t, e, s) => e in t ? fe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var A = (t, e, s) => (me(t, typeof e != "symbol" ? e + "" : e, s), s), K = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (K(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, P = (t, e, s, r) => (K(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var N = (t, e, s) => (K(t, e, "access private method"), s);
var M, ne;
const ie = new (ne = class {
  constructor() {
    y(this, M, void 0);
    P(this, M, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!n(this, M).get(t))
      n(this, M).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = n(this, M).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    P(this, M, /* @__PURE__ */ new WeakMap());
  }
}, M = new WeakMap(), ne)(), pe = (t) => typeof t == "function", oe = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, Q = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), ge = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), be = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), s = (u) => {
    const b = u.querySelectorAll("script");
    for (const C of b)
      C.remove();
  }, r = (u, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(u) && (b.includes("javascript:") || b.includes("data:")) || u.startsWith("on"))
      return !0;
  }, l = (u) => {
    const b = u.attributes;
    for (const {
      name: C,
      value: U
    } of b)
      r(C, U) && u.removeAttribute(C);
  }, o = (u) => {
    const b = u.children;
    for (const C of b)
      l(C), o(C);
  }, d = e();
  return s(d), o(d), d.innerHTML;
}, ye = function(t) {
  t.renderCount === 1 && queueMicrotask(() => {
    t.update(), t.renderCount = 0;
  });
}, ve = (t, e) => {
  const s = oe(e);
  return class extends e {
    constructor(...r) {
      return super(...r), r.forEach((l, o) => {
        this[s[o]] = l;
      }), new Proxy(this, {
        get(l, o, d) {
          return Reflect.get(l, o, d);
        },
        set(l, o, d, u) {
          return Reflect.set(l, o, d, u), ++t.renderCount, ye(t), !0;
        }
      });
    }
  };
}, ae = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const d of e)
      d.__metadata__ ? r.push(s) : r.push(ie.getService(d));
    const l = oe(t), o = new t(...r);
    return e.forEach((d, u) => {
      o[l[u]] = r[u];
    }), o;
  } else
    return new t();
}, k = new class {
  constructor() {
    A(this, "globalStyles");
    A(this, "globalStyleTag");
    A(this, "style_registry");
    A(this, "isRootNodeSet");
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
  html: te,
  render: we
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, l = "insertNode", o = /^insertNode([^ ]+)/;
  let d = [];
  const u = (c) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let f = JSON.stringify(c);
    const h = (a) => i[a] || a;
    return f = ((a) => a.replace(/[&<>\(\)]/g, h))(f), JSON.parse(f);
  }, b = (c, i) => {
    const f = c.options, h = Array.isArray(i) ? i : [i];
    let m, a, p = f.length;
    for (; p--; ) {
      a = f[p];
      const g = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = h.indexOf(g) > -1) && (m = !0);
    }
    m || (c.selectedIndex = -1);
  }, C = (c) => {
    const i = document.createElement("template");
    return i.innerHTML = c, i.content;
  }, U = (c, i) => {
    const f = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let h = f.nextNode();
    for (; h; ) {
      if (h.hasAttributes()) {
        const m = Array.from(h.attributes).filter((a) => r.test(a.nodeName));
        for (const {
          nodeName: a,
          nodeValue: p
        } of m) {
          const g = r.exec(a)[1];
          switch (!0) {
            case /^on+/.test(p): {
              const x = p.slice(2).toLowerCase();
              h.removeEventListener(x, i[g]), x !== "bindprops" ? h.addEventListener(x, i[g]) : h.addEventListener(x, (_) => {
                _.detail.setProps(i[g]());
              });
              break;
            }
            case /ref/.test(p): {
              const x = ((_) => {
                const V = _;
                return () => {
                  V.isConnected && i[g](V);
                };
              })(h);
              d.push(x);
              break;
            }
            case /^data-+/.test(p):
            case /^aria-+/.test(p): {
              h.setAttribute(p, u(i[g]));
              break;
            }
            case /class/.test(p): {
              i[g] ? h.classList.add(...i[g].split(" ")) : h.setAttribute("class", "");
              break;
            }
            case /value/.test(p): {
              h.nodeName.toLowerCase() === "select" ? b(h, i[g]) : h.value = u(i[g]);
              break;
            }
            case /disabled/.test(p):
            case /checked/.test(p): {
              i[g] ? h.setAttribute(p, i[g]) : h.removeAttribute(p);
              break;
            }
            default:
              h.setAttribute(p, u(i[g]));
          }
          h.removeAttribute(a);
        }
      }
      h = f.nextNode();
    }
  }, v = (c, i) => {
    const f = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let h = f.nextNode(), m;
    for (; h; ) {
      if (m = o.exec(h.data)) {
        const a = Array.isArray(i[m[1]]) ? i[m[1]] : [i[m[1]]];
        h.replaceWith(...a), f.currentNode = c;
      }
      h = f.nextNode();
    }
  }, S = (c, i) => {
    if (!c || !i || c.nodeType !== 1 || i.nodeType !== 1)
      return;
    const f = c.attributes, h = i.attributes;
    for (const {
      name: m,
      value: a
    } of f)
      /class/.test(m) ? Array.from(c.classList).every((p) => {
        i.classList.contains(p) || i.classList.add(p);
      }) : (!h[m] || h[m] !== a) && i.setAttribute(m, a);
    for (const {
      name: m
    } of h)
      /class/.test(m) ? Array.from(i.classList).every((a) => {
        c.classList.contains(a) || i.classList.remove(a);
      }) : f[m] || i.removeAttribute(m);
  }, R = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), T = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, E = (c, i) => {
    const f = i ? Array.from(i.childNodes) : [], h = c ? Array.from(c.childNodes) : [];
    let m = f.length - h.length;
    if (m > 0)
      for (; m > 0; m--)
        f[f.length - m].parentNode.removeChild(f[f.length - m]);
    h.forEach(function(a, p) {
      const g = f[p];
      if (S(a, g), !g) {
        i && i.appendChild(a);
        return;
      }
      if (R(a) !== R(g)) {
        g.replaceWith(a);
        return;
      }
      const x = T(a);
      if (x && x !== T(g)) {
        g.textContent = x;
        return;
      }
      if (g.childNodes.length > 0 && a.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && a.childNodes.length > 0) {
        const _ = document.createDocumentFragment();
        E(a, _), g.appendChild(_);
        return;
      }
      if (a.childNodes.length > 0) {
        E(a, g);
        return;
      }
    });
  };
  return {
    html: (c, ...i) => {
      let f = "";
      const {
        length: h
      } = c;
      for (let a = 1; a < h; a++) {
        const p = i[a - 1];
        let g = !1;
        if (f += c[a - 1], t.test(f) && e.test(f) && (f = f.replace(t, (x, _, V) => `${s}${a - 1}=${V || '"'}${_}${V ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(p):
            case p instanceof DocumentFragment: {
              f += `<!--${l}${a - 1}-->`;
              break;
            }
            case (typeof p == "object" && p !== null): {
              "html" in p && (f += p.html);
              break;
            }
            default:
              f += p;
          }
      }
      f += c[h - 1];
      const m = C(f.trim());
      return U(m, i), v(m, i), m;
    },
    render: (c, i) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(i)) : E(i, c), d.forEach((f) => {
        f();
      }), d = [];
    }
  };
})();
var $, q;
class Se {
  constructor(e, s) {
    y(this, $, void 0);
    y(this, q, void 0);
    /**
     * {() => void} used to update DOM with new state
     */
    A(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    A(this, "emitEvent");
    P(this, q, e), P(this, $, s);
  }
  static get __metadata__() {
    return {
      name: "Renderer"
    };
  }
  /**
   * {ShadowRoot} used to traverse dom tree
   */
  get shadowRoot() {
    return n(this, $);
  }
  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return n(this, q);
  }
}
$ = new WeakMap(), q = new WeakMap();
const Ce = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, se = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, Re = (t, e) => {
  var s, r, l, o, ce, u, X, C;
  if (t = {
    ...Ce,
    ...t
  }, t.styles = t.styles.toString(), t.root && !k.isRootNodeSet)
    k.isRootNodeSet = !0, t.styles && (k.globalStyles.replace(t.styles), k.globalStyleTag = se(t.styles, document.head));
  else if (t.root && k.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (C = class extends HTMLElement {
    constructor() {
      super();
      /**
       * user defined functions
       */
      y(this, o);
      y(this, u);
      y(this, s, void 0);
      y(this, r, void 0);
      y(this, l, void 0);
      A(this, "renderCount", 0);
      P(this, r, this.attachShadow({
        mode: "open"
      })), Q || (n(this, r).adoptedStyleSheets = k.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const v = n(this, s).render();
      typeof v == "string" ? n(this, r).innerHTML = be(v) : we(n(this, r), v), Q && (t.styles && n(this, r).insertBefore(n(this, l), n(this, r).childNodes[0]), k.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(k.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    setProps(v) {
      var S, R;
      for (const [T, E] of Object.entries(v))
        e.observedProperties.find((O) => O === T) && (n(this, s)[T] = E);
      (R = (S = n(this, s)).onPropertiesChanged) == null || R.call(S);
    }
    getInstance() {
      return n(this, s);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var S, R, T, E;
      N(this, o, ce).call(this);
      const v = new Se(this, n(this, r));
      v.update = () => {
        this.update();
      }, v.emitEvent = (O, ee) => {
        N(this, u, X).call(this, O, ee);
      }, P(this, s, ae(ve(this, e), t.deps, v)), (R = (S = n(this, s)).beforeMount) == null || R.call(S), this.update(), (E = (T = n(this, s)).mount) == null || E.call(T), N(this, u, X).call(this, "bindprops", {
        setProps: (O) => {
          this.setProps(O);
        }
      }, !1);
    }
    attributeChangedCallback(v, S, R) {
      var T, E;
      (E = (T = n(this, s)).onAttributesChanged) == null || E.call(T, v, S, R);
    }
    disconnectedCallback() {
      var v, S;
      this.renderCount = 1, (S = (v = n(this, s)).unmount) == null || S.call(v);
    }
  }, s = new WeakMap(), r = new WeakMap(), l = new WeakMap(), o = new WeakSet(), ce = function() {
    Q && t.styles && P(this, l, se(t.styles));
  }, u = new WeakSet(), X = function(v, S) {
    const R = new CustomEvent(v, {
      detail: S
    });
    this.dispatchEvent(R);
  }, C));
}, Ae = {
  deps: []
}, Te = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || Re(t, e);
}, le = (t = {}) => (e) => {
  if (t = {
    ...Ae,
    ...t
  }, t.deps.some((r) => {
    var l;
    return ((l = r.__metadata__) == null ? void 0 : l.name) === "Renderer";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = ae(e, t.deps);
  ie.register(e, s);
}, Ee = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", l = [...Array.from(t.options)].filter((o) => o.selected).map((o) => o.value ?? (o.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = s ? l[0] : l;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
var D, w, L, J, ue;
class xe {
  constructor(e, s) {
    y(this, J);
    y(this, D, void 0);
    y(this, w, void 0);
    y(this, L, /* @__PURE__ */ new Map());
    P(this, D, e), P(this, w, s);
  }
  get errors() {
    return n(this, L);
  }
  get valid() {
    return N(this, J, ue).call(this), !n(this, L).size;
  }
  get value() {
    const e = {};
    for (const [s, r] of Object.entries(n(this, w)))
      e[s] = r.value;
    return e;
  }
  get(e) {
    return n(this, w)[e];
  }
  reset(e = {}) {
    for (const s in n(this, w))
      n(this, w)[s].value = e[s] || n(this, D)[s];
    n(this, L).clear();
  }
}
D = new WeakMap(), w = new WeakMap(), L = new WeakMap(), J = new WeakSet(), ue = function() {
  n(this, L).clear();
  for (const e in n(this, w)) {
    const s = n(this, w)[e].value, r = n(this, w)[e].validators;
    n(this, w)[e].errors = null;
    for (const l of r) {
      const o = l(s);
      o !== null && (n(this, L).has(e) ? (n(this, L).set(e, {
        ...n(this, L).get(e),
        ...o
      }), n(this, w)[e].errors = {
        ...n(this, w)[e].errors,
        ...o
      }) : (n(this, L).set(e, o), n(this, w)[e].errors = o));
    }
  }
};
const Fe = (t) => {
  const e = {}, s = {};
  for (const [d, u] of Object.entries(t)) {
    const b = Array.isArray(u) ? u : [u];
    e[d] = {
      value: b.shift(),
      validators: b
    }, s[d] = e[d].value;
  }
  const r = new xe(s, e);
  return [r, (d) => (u) => {
    const b = Ee(u.target);
    r.get(d).value = b;
  }, () => {
    r.reset();
  }];
}, Oe = (t) => {
  let e = t;
  return [e, (r) => {
    let l;
    pe(r) ? l = r(e) : l = r, Object.assign(e, l);
  }];
};
class je {
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
const Pe = (t) => !!t && typeof t.subscribe == "function", Le = (t) => !!t && typeof t.then == "function", Ne = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), _e = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class ke {
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
const re = (t) => Pe(t) ? t : Le(t) ? _e(Promise.resolve(t)) : Ne(t), j = class {
  static checkParams(e, s) {
    let r = 0;
    const l = {}, o = s.paramCount;
    for (let d = 0; d < e.length; d++) {
      const u = s.params[d];
      u.indexOf(":") >= 0 && (l[u.split(":")[1]] = e[d].split("?")[0], r += 1);
    }
    return r === o ? l : {};
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
    e.canActivate && (s.canActivate = e.canActivate), s.paramCount = j.getParamCount(s.params), j.routeList.push(s);
  }
  static preloadRoutes() {
    for (const e of j.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = j.routeList.filter((s) => s.preload === !0);
    for (const s of e)
      s.templatePath && s.templatePath();
  }
};
let F = j;
A(F, "routeList", []);
var H, I, z, Y, he, G, de, W, B;
class Z {
  constructor() {
    y(this, Y);
    y(this, G);
    y(this, W);
    y(this, H, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, I, new ke());
    y(this, z, void 0);
  }
  startHashChange() {
    P(this, z, ge(window, "hashchange", () => {
      N(this, Y, he).call(this);
    }));
  }
  stopHashChange() {
    n(this, z).call(this);
  }
  getTemplate() {
    return n(this, I).asObservable();
  }
  getCurrentRoute() {
    return n(this, H);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && N(this, W, B).call(this, e, s), window.location.hash = "#" + e) : N(this, W, B).call(this, e, s);
  }
}
H = new WeakMap(), I = new WeakMap(), z = new WeakMap(), Y = new WeakSet(), he = function() {
  const e = window.location.hash.replace(/^#/, "");
  N(this, W, B).call(this, e, null);
}, G = new WeakSet(), de = function(e, s) {
  if (e) {
    const r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, W = new WeakSet(), B = function(e, s) {
  const r = e.split("/").filter((d) => d.length > 0), l = F.routeList.filter((d) => {
    if (d.params.length === r.length && N(this, G, de).call(this, d.url, e))
      return d;
    if (d.url === e)
      return d;
  }), o = l.length > 0 ? l[0] : null;
  o && (n(this, H).path = e, n(this, H).state = {
    ...s || {}
  }, re(o.canActivate()).subscribe((d) => {
    if (!d)
      return;
    const u = F.checkParams(r, o);
    if (Object.keys(u).length > 0 || e) {
      n(this, H).routeParams = new Map(Object.entries(u));
      const b = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, H).queryParams = new Map(b), o.isRegistered ? n(this, I).next(o.template) : o.templatePath && re(o.templatePath()).subscribe(() => {
        o.isRegistered = !0, n(this, I).next(o.template);
      });
    } else
      this.navigateTo(o.redirectTo, s);
  }));
};
le()(Z);
const Ie = () => {
  class t {
    constructor(s) {
      A(this, "template", "");
      A(this, "subscriptions");
      A(this, "update");
    }
    beforeMount() {
      this.subscriptions = this.internalRouterSrvc.getTemplate().subscribe((s) => {
        this.template = s;
      }), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let s = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(s);
    }
    unmount() {
      this.subscriptions(), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (this.template) {
        const s = [`${this.template}`];
        return s.raw = [`${this.template}`], te(s);
      } else
        return te``;
    }
  }
  Te({
    selector: "router-outlet",
    deps: [Z]
  })(t);
};
class Me {
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
   */
  registerRoutes(e, s = !1) {
    if (Array.isArray(e)) {
      for (const r of e)
        F.formatRoute(r);
      s ? F.preloadRoutes() : F.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
le({
  deps: [Z]
})(Me);
export {
  Te as Component,
  le as Injectable,
  Se as Renderer,
  Me as Router,
  je as Validators,
  ge as fromEvent,
  te as html,
  Ie as registerRouterComponent,
  we as render,
  Fe as useFormFields,
  Oe as useState
};
