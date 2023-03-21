var le = Object.defineProperty;
var ue = (t, e, s) => e in t ? le(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var T = (t, e, s) => (ue(t, typeof e != "symbol" ? e + "" : e, s), s), Y = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (Y(t, e, "read from private field"), s ? s.call(t) : e.get(t)), w = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, A = (t, e, s, r) => (Y(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var M = (t, e, s) => (Y(t, e, "access private method"), s);
var L, te;
const se = new (te = class {
  constructor() {
    w(this, L, void 0);
    A(this, L, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!n(this, L).get(t))
      n(this, L).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = n(this, L).get(t);
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
}, L = new WeakMap(), te)(), he = (t) => typeof t == "function", re = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, G = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), de = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), fe = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), s = (i) => {
    const m = i.querySelectorAll("script");
    for (const y of m)
      y.remove();
  }, r = (i, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(i) && (m.includes("javascript:") || m.includes("data:")) || i.startsWith("on"))
      return !0;
  }, c = (i) => {
    const m = i.attributes;
    for (const {
      name: y,
      value: S
    } of m)
      r(y, S) && i.removeAttribute(y);
  }, o = (i) => {
    const m = i.children;
    for (const y of m)
      c(y), o(y);
  }, u = e();
  return s(u), o(u), u.innerHTML;
}, me = function(t) {
  t.debounce && window.cancelAnimationFrame(t.debounce), t.debounce = window.requestAnimationFrame(function() {
    t.update();
  });
}, ge = (t, e) => {
  const s = re(e);
  return t.debounce = null, class extends e {
    constructor(...r) {
      return super(...r), r.forEach((c, o) => {
        this[s[o]] = c;
      }), new Proxy(this, {
        get(c, o, u) {
          window.debug && console.log("proxiedklass getter", c, o);
          try {
            return Reflect.get(c, o, u);
          } catch {
            return this[o];
          }
        },
        set(c, o, u, i) {
          window.debug && console.log("proxiedklass setter", c, o);
          try {
            Reflect.set(c, o, u, i);
          } catch {
            this[o] = u;
          }
          return me(t), !0;
        },
        deleteProperty(c, o) {
          window.debug && console.log("proxiedklass deleteprop"), Reflect.deleteProperty(c, o);
        }
      });
    }
  };
}, ne = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const u of e)
      u.__metadata__ ? r.push(s) : r.push(se.getService(u));
    const c = re(t), o = new t(...r);
    return e.forEach((u, i) => {
      o[c[i]] = r[i];
    }), o;
  } else
    return new t();
}, P = new class {
  constructor() {
    T(this, "globalStyles");
    T(this, "globalStyleTag");
    T(this, "style_registry");
    T(this, "isRootNodeSet");
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
  html: X,
  render: pe
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, c = "insertNode", o = /^insertNode([^ ]+)/;
  let u = [];
  const i = (h) => {
    const a = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let f = JSON.stringify(h);
    const d = (l) => a[l] || l;
    return f = ((l) => l.replace(/[&<>\(\)]/g, d))(f), JSON.parse(f);
  }, m = (h, a) => {
    const f = h.options, d = Array.isArray(a) ? a : [a];
    let g, l, p = f.length;
    for (; p--; ) {
      l = f[p];
      const b = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = d.indexOf(b) > -1) && (g = !0);
    }
    g || (h.selectedIndex = -1);
  }, y = (h) => {
    const a = document.createElement("template");
    return a.innerHTML = h, a.content;
  }, S = (h, a) => {
    const f = document.createTreeWalker(h, NodeFilter.SHOW_ELEMENT, null);
    let d = f.nextNode();
    for (; d; ) {
      if (d.hasAttributes()) {
        const g = Array.from(d.attributes).filter((l) => r.test(l.nodeName));
        for (const {
          nodeName: l,
          nodeValue: p
        } of g) {
          const b = r.exec(l)[1];
          switch (!0) {
            case /^on+/.test(p): {
              const C = p.slice(2).toLowerCase();
              d.removeEventListener(C, a[b]), C !== "bindprops" ? d.addEventListener(C, a[b]) : d.addEventListener(C, (x) => {
                x.detail.setProps(a[b]());
              });
              break;
            }
            case /ref/.test(p): {
              const C = ((x) => {
                const I = x;
                return () => {
                  I.isConnected && a[b](I);
                };
              })(d);
              u.push(C);
              break;
            }
            case /^data-+/.test(p):
            case /^aria-+/.test(p): {
              d.setAttribute(p, i(a[b]));
              break;
            }
            case /class/.test(p): {
              a[b] ? d.classList.add(...a[b].split(" ")) : d.setAttribute("class", "");
              break;
            }
            case /value/.test(p): {
              d.nodeName.toLowerCase() === "select" ? m(d, a[b]) : d.value = i(a[b]);
              break;
            }
            case /disabled/.test(p):
            case /checked/.test(p): {
              a[b] ? d.setAttribute(p, a[b]) : d.removeAttribute(p);
              break;
            }
            default:
              d.setAttribute(p, i(a[b]));
          }
          d.removeAttribute(l);
        }
      }
      d = f.nextNode();
    }
  }, E = (h, a) => {
    const f = document.createTreeWalker(h, NodeFilter.SHOW_COMMENT, null);
    let d = f.nextNode(), g;
    for (; d; ) {
      if (g = o.exec(d.data)) {
        const l = Array.isArray(a[g[1]]) ? a[g[1]] : [a[g[1]]];
        d.replaceWith(...l), f.currentNode = h;
      }
      d = f.nextNode();
    }
  }, k = (h, a) => {
    if (!h || !a || h.nodeType !== 1 || a.nodeType !== 1)
      return;
    const f = h.attributes, d = a.attributes;
    for (const {
      name: g,
      value: l
    } of f)
      /class/.test(g) ? Array.from(h.classList).every((p) => {
        a.classList.contains(p) || a.classList.add(p);
      }) : (!d[g] || d[g] !== l) && a.setAttribute(g, l);
    for (const {
      name: g
    } of d)
      /class/.test(g) ? Array.from(a.classList).every((l) => {
        h.classList.contains(l) || a.classList.remove(l);
      }) : f[g] || a.removeAttribute(g);
  }, q = (h) => h.nodeType === 3 ? "text" : h.nodeType === 8 ? "comment" : h.tagName.toLowerCase(), Q = (h) => h.childNodes && h.childNodes.length > 0 ? null : h.textContent, J = (h, a) => {
    const f = a ? Array.from(a.childNodes) : [], d = h ? Array.from(h.childNodes) : [];
    let g = f.length - d.length;
    if (g > 0)
      for (; g > 0; g--)
        f[f.length - g].parentNode.removeChild(f[f.length - g]);
    d.forEach(function(l, p) {
      const b = f[p];
      if (k(l, b), !b) {
        a && a.appendChild(l);
        return;
      }
      if (q(l) !== q(b)) {
        b.replaceWith(l);
        return;
      }
      const C = Q(l);
      if (C && C !== Q(b)) {
        b.textContent = C;
        return;
      }
      if (b.childNodes.length > 0 && l.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && l.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        J(l, x), b.appendChild(x);
        return;
      }
      if (l.childNodes.length > 0) {
        J(l, b);
        return;
      }
    });
  };
  return {
    html: (h, ...a) => {
      let f = "";
      const {
        length: d
      } = h;
      for (let l = 1; l < d; l++) {
        const p = a[l - 1];
        let b = !1;
        if (f += h[l - 1], t.test(f) && e.test(f) && (f = f.replace(t, (C, x, I) => `${s}${l - 1}=${I || '"'}${x}${I ? "" : '"'}`), b = !0), !b)
          switch (!0) {
            case Array.isArray(p):
            case p instanceof DocumentFragment: {
              f += `<!--${c}${l - 1}-->`;
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
      f += h[d - 1];
      const g = y(f.trim());
      return S(g, a), E(g, a), g;
    },
    render: (h, a) => {
      h && !h.children.length ? (h.innerHTML = "", h.appendChild(a)) : J(a, h), u.forEach((f) => {
        f();
      }), u = [];
    }
  };
})();
var W, j;
class be {
  constructor(e, s) {
    w(this, W, void 0);
    w(this, j, void 0);
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    T(this, "emitEvent");
    A(this, j, e), A(this, W, s);
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
    return n(this, W);
  }
  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return n(this, j);
  }
}
W = new WeakMap(), j = new WeakMap();
const ye = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, Z = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, we = (t, e) => {
  var s, r, c, o;
  if (t = {
    ...ye,
    ...t
  }, t.styles = t.styles.toString(), t.root && !P.isRootNodeSet)
    P.isRootNodeSet = !0, t.styles && (P.globalStyles.replace(t.styles), P.globalStyleTag = Z(t.styles, document.head));
  else if (t.root && P.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (o = class extends HTMLElement {
    constructor() {
      super();
      w(this, s, void 0);
      w(this, r, void 0);
      w(this, c, void 0);
      A(this, r, this.attachShadow({
        mode: "open"
      })), G || (n(this, r).adoptedStyleSheets = P.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    emulateComponent() {
      G && t.styles && A(this, c, Z(t.styles));
    }
    update() {
      const i = n(this, s).render();
      typeof i == "string" ? n(this, r).innerHTML = fe(i) : pe(n(this, r), i), G && (t.styles && n(this, r).insertBefore(n(this, c), n(this, r).childNodes[0]), P.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(P.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    emitEvent(i, m) {
      const y = new CustomEvent(i, {
        detail: m
      });
      this.dispatchEvent(y);
    }
    setProps(i) {
      var m, y;
      for (const [S, E] of Object.entries(i))
        e.observedProperties.find((k) => k === S) && (n(this, s)[S] = E);
      (y = (m = n(this, s)).onPropertiesChanged) == null || y.call(m);
    }
    getInstance() {
      return n(this, s);
    }
    connectedCallback() {
      var m, y, S, E;
      this.emulateComponent();
      const i = new be(this, n(this, r));
      i.emitEvent = (k, q) => {
        this.emitEvent(k, q);
      }, A(this, s, ne(ge(this, e), t.deps, i)), (y = (m = n(this, s)).beforeMount) == null || y.call(m), (E = (S = n(this, s)).mount) == null || E.call(S), this.emitEvent("bindprops", {
        setProps: (k) => {
          this.setProps(k);
        }
      }, !1);
    }
    attributeChangedCallback(i, m, y) {
      var S, E;
      (E = (S = n(this, s)).onAttributesChanged) == null || E.call(S, i, m, y);
    }
    disconnectedCallback() {
      var i, m;
      (m = (i = n(this, s)).unmount) == null || m.call(i);
    }
  }, s = new WeakMap(), r = new WeakMap(), c = new WeakMap(), o));
}, ve = {
  deps: []
}, Se = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || we(t, e);
}, ie = (t = {}) => (e) => {
  if (t = {
    ...ve,
    ...t
  }, t.deps.some((r) => {
    var c;
    return ((c = r.__metadata__) == null ? void 0 : c.name) === "Renderer";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = ne(e, t.deps);
  se.register(e, s);
}, Ce = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", c = [...Array.from(t.options)].filter((o) => o.selected).map((o) => o.value ?? (o.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = s ? c[0] : c;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
var V, v, R, z, oe;
class Ae {
  constructor(e, s) {
    w(this, z);
    w(this, V, void 0);
    w(this, v, void 0);
    w(this, R, /* @__PURE__ */ new Map());
    A(this, V, e), A(this, v, s);
  }
  get errors() {
    return n(this, R);
  }
  get valid() {
    return M(this, z, oe).call(this), !n(this, R).size;
  }
  get value() {
    const e = {};
    for (const [s, r] of Object.entries(n(this, v)))
      e[s] = r.value;
    return e;
  }
  get(e) {
    return n(this, v)[e];
  }
  reset(e = {}) {
    for (const s in n(this, v))
      n(this, v)[s].value = e[s] || n(this, V)[s];
    n(this, R).clear();
  }
}
V = new WeakMap(), v = new WeakMap(), R = new WeakMap(), z = new WeakSet(), oe = function() {
  n(this, R).clear();
  for (const e in n(this, v)) {
    const s = n(this, v)[e].value, r = n(this, v)[e].validators;
    n(this, v)[e].errors = null;
    for (const c of r) {
      const o = c(s);
      o !== null && (n(this, R).has(e) ? (n(this, R).set(e, {
        ...n(this, R).get(e),
        ...o
      }), n(this, v)[e].errors = {
        ...n(this, v)[e].errors,
        ...o
      }) : (n(this, R).set(e, o), n(this, v)[e].errors = o));
    }
  }
};
const Me = (t) => {
  const e = {}, s = {};
  for (const [u, i] of Object.entries(t)) {
    const m = Array.isArray(i) ? i : [i];
    e[u] = {
      value: m.shift(),
      validators: m
    }, s[u] = e[u].value;
  }
  const r = new Ae(s, e);
  return [r, (u) => (i) => {
    const m = Ce(i.target);
    r.get(u).value = m;
  }, () => {
    r.reset();
  }];
}, Fe = (t) => {
  let e = t;
  return [e, (r) => {
    let c;
    he(r) ? c = r(e) : c = r, Object.assign(e, c);
  }];
};
class He {
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
const Re = (t) => !!t && typeof t.subscribe == "function", Te = (t) => !!t && typeof t.then == "function", Ee = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), xe = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class Pe {
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
const ee = (t) => Re(t) ? t : Te(t) ? xe(Promise.resolve(t)) : Ee(t), F = class {
  static checkParams(e, s) {
    let r = 0;
    const c = {}, o = s.paramCount;
    for (let u = 0; u < e.length; u++) {
      const i = s.params[u];
      i.indexOf(":") >= 0 && (c[i.split(":")[1]] = e[u].split("?")[0], r += 1);
    }
    return r === o ? c : {};
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
    e.canActivate && (s.canActivate = e.canActivate), s.paramCount = F.getParamCount(s.params), F.routeList.push(s);
  }
  static preloadRoutes() {
    for (const e of F.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = F.routeList.filter((s) => s.preload === !0);
    for (const s of e)
      s.templatePath && s.templatePath();
  }
};
let _ = F;
T(_, "routeList", []);
var N, H, $, U, ae, B, ce, O, D;
class K {
  constructor() {
    w(this, U);
    w(this, B);
    w(this, O);
    w(this, N, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    w(this, H, new Pe());
    w(this, $, void 0);
  }
  startHashChange() {
    A(this, $, de(window, "hashchange", () => {
      M(this, U, ae).call(this);
    }));
  }
  stopHashChange() {
    n(this, $).call(this);
  }
  getTemplate() {
    return n(this, H).asObservable();
  }
  getCurrentRoute() {
    return n(this, N);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && M(this, O, D).call(this, e, s), window.location.hash = "#" + e) : M(this, O, D).call(this, e, s);
  }
}
N = new WeakMap(), H = new WeakMap(), $ = new WeakMap(), U = new WeakSet(), ae = function() {
  const e = window.location.hash.replace(/^#/, "");
  M(this, O, D).call(this, e, null);
}, B = new WeakSet(), ce = function(e, s) {
  if (e) {
    const r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, O = new WeakSet(), D = function(e, s) {
  const r = e.split("/").filter((u) => u.length > 0), c = _.routeList.filter((u) => {
    if (u.params.length === r.length && M(this, B, ce).call(this, u.url, e))
      return u;
    if (u.url === e)
      return u;
  }), o = c.length > 0 ? c[0] : null;
  o && (n(this, N).path = e, n(this, N).state = {
    ...s || {}
  }, ee(o.canActivate()).subscribe((u) => {
    if (!u)
      return;
    const i = _.checkParams(r, o);
    if (Object.keys(i).length > 0 || e) {
      n(this, N).routeParams = new Map(Object.entries(i));
      const m = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, N).queryParams = new Map(m), o.isRegistered ? n(this, H).next(o.template) : o.templatePath && ee(o.templatePath()).subscribe(() => {
        o.isRegistered = !0, n(this, H).next(o.template);
      });
    } else
      this.navigateTo(o.redirectTo, s);
  }));
};
ie()(K);
const Oe = () => {
  class t {
    constructor(s) {
      T(this, "template", "");
      T(this, "subscriptions");
      T(this, "update");
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
        return s.raw = [`${this.template}`], X(s);
      } else
        return X``;
    }
  }
  Se({
    selector: "router-outlet",
    deps: [K]
  })(t);
};
class Le {
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
        _.formatRoute(r);
      s ? _.preloadRoutes() : _.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ie({
  deps: [K]
})(Le);
export {
  Se as Component,
  ie as Injectable,
  be as Renderer,
  Le as Router,
  He as Validators,
  de as fromEvent,
  X as html,
  Oe as registerRouterComponent,
  pe as render,
  Me as useFormFields,
  Fe as useState
};
