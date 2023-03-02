var le = Object.defineProperty;
var ue = (t, e, s) => e in t ? le(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var E = (t, e, s) => (ue(t, typeof e != "symbol" ? e + "" : e, s), s), Y = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (Y(t, e, "read from private field"), s ? s.call(t) : e.get(t)), v = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, S = (t, e, s, r) => (Y(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var M = (t, e, s) => (Y(t, e, "access private method"), s);
var P, te;
const se = new (te = class {
  constructor() {
    v(this, P, void 0);
    S(this, P, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!n(this, P).get(t))
      n(this, P).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = n(this, P).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    S(this, P, /* @__PURE__ */ new WeakMap());
  }
}, P = new WeakMap(), te)(), he = (t) => typeof t == "function", de = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, G = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), fe = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), me = (t) => {
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), s = (a) => {
    const m = a.querySelectorAll("script");
    for (const y of m)
      y.remove();
  }, r = (a, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(a) && (m.includes("javascript:") || m.includes("data:")) || a.startsWith("on"))
      return !0;
  }, c = (a) => {
    const m = a.attributes;
    for (const {
      name: y,
      value: C
    } of m)
      r(y, C) && a.removeAttribute(y);
  }, h = (a) => {
    const m = a.children;
    for (const y of m)
      c(y), h(y);
  }, f = e();
  return s(f), h(f), f.innerHTML;
}, re = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const f of e)
      f.__metadata__ ? r.push(s) : r.push(se.getService(f));
    const c = de(t), h = new t(...r);
    return e.forEach((f, a) => {
      h[c[a]] = r[a];
    }), h;
  } else
    return new t();
}, L = new class {
  constructor() {
    E(this, "globalStyles");
    E(this, "globalStyleTag");
    E(this, "style_registry");
    E(this, "isRootNodeSet");
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
  render: ge
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, c = "insertNode", h = /^insertNode([^ ]+)/;
  let f = [];
  const a = (l) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let d = JSON.stringify(l);
    const u = (o) => i[o] || o;
    return d = ((o) => o.replace(/[&<>\(\)]/g, u))(d), JSON.parse(d);
  }, m = (l, i) => {
    const d = l.options, u = Array.isArray(i) ? i : [i];
    let g, o, p = d.length;
    for (; p--; ) {
      o = d[p];
      const b = o.getAttribute("value") ?? (o.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (o.selected = u.indexOf(b) > -1) && (g = !0);
    }
    g || (l.selectedIndex = -1);
  }, y = (l) => {
    const i = document.createElement("template");
    return i.innerHTML = l, i.content;
  }, C = (l, i) => {
    const d = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT, null);
    let u = d.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const g = Array.from(u.attributes).filter((o) => r.test(o.nodeName));
        for (const {
          nodeName: o,
          nodeValue: p
        } of g) {
          const b = r.exec(o)[1];
          switch (!0) {
            case /^on+/.test(p): {
              const A = p.slice(2).toLowerCase();
              u.removeEventListener(A, i[b]), A !== "bindprops" ? u.addEventListener(A, i[b]) : u.addEventListener(A, (x) => {
                x.detail.setProps(i[b]());
              });
              break;
            }
            case /ref/.test(p): {
              const A = ((x) => {
                const I = x;
                return () => {
                  I.isConnected && i[b](I);
                };
              })(u);
              f.push(A);
              break;
            }
            case /^data-+/.test(p):
            case /^aria-+/.test(p): {
              u.setAttribute(p, a(i[b]));
              break;
            }
            case /class/.test(p): {
              i[b] ? u.classList.add(...i[b].split(" ")) : u.setAttribute("class", "");
              break;
            }
            case /value/.test(p): {
              u.nodeName.toLowerCase() === "select" ? m(u, i[b]) : u.value = a(i[b]);
              break;
            }
            case /disabled/.test(p):
            case /checked/.test(p): {
              i[b] ? u.setAttribute(p, i[b]) : u.removeAttribute(p);
              break;
            }
            default:
              u.setAttribute(p, a(i[b]));
          }
          u.removeAttribute(o);
        }
      }
      u = d.nextNode();
    }
  }, R = (l, i) => {
    const d = document.createTreeWalker(l, NodeFilter.SHOW_COMMENT, null);
    let u = d.nextNode(), g;
    for (; u; ) {
      if (g = h.exec(u.data)) {
        const o = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        u.replaceWith(...o), d.currentNode = l;
      }
      u = d.nextNode();
    }
  }, k = (l, i) => {
    if (!l || !i || l.nodeType !== 1 || i.nodeType !== 1)
      return;
    const d = l.attributes, u = i.attributes;
    for (const {
      name: g,
      value: o
    } of d)
      /class/.test(g) ? Array.from(l.classList).every((p) => {
        i.classList.contains(p) || i.classList.add(p);
      }) : (!u[g] || u[g] !== o) && i.setAttribute(g, o);
    for (const {
      name: g
    } of u)
      /class/.test(g) ? Array.from(i.classList).every((o) => {
        l.classList.contains(o) || i.classList.remove(o);
      }) : d[g] || i.removeAttribute(g);
  }, q = (l) => l.nodeType === 3 ? "text" : l.nodeType === 8 ? "comment" : l.tagName.toLowerCase(), Q = (l) => l.childNodes && l.childNodes.length > 0 ? null : l.textContent, J = (l, i) => {
    const d = i ? Array.from(i.childNodes) : [], u = l ? Array.from(l.childNodes) : [];
    let g = d.length - u.length;
    if (g > 0)
      for (; g > 0; g--)
        d[d.length - g].parentNode.removeChild(d[d.length - g]);
    u.forEach(function(o, p) {
      const b = d[p];
      if (k(o, b), !b) {
        i && i.appendChild(o);
        return;
      }
      if (q(o) !== q(b)) {
        b.replaceWith(o);
        return;
      }
      const A = Q(o);
      if (A && A !== Q(b)) {
        b.textContent = A;
        return;
      }
      if (b.childNodes.length > 0 && o.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && o.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        J(o, x), b.appendChild(x);
        return;
      }
      if (o.childNodes.length > 0) {
        J(o, b);
        return;
      }
    });
  };
  return {
    html: (l, ...i) => {
      let d = "";
      const {
        length: u
      } = l;
      for (let o = 1; o < u; o++) {
        const p = i[o - 1];
        let b = !1;
        if (d += l[o - 1], t.test(d) && e.test(d) && (d = d.replace(t, (A, x, I) => `${s}${o - 1}=${I || '"'}${x}${I ? "" : '"'}`), b = !0), !b)
          switch (!0) {
            case Array.isArray(p):
            case p instanceof DocumentFragment: {
              d += `<!--${c}${o - 1}-->`;
              break;
            }
            case (typeof p == "object" && p !== null): {
              "html" in p && (d += p.html);
              break;
            }
            default:
              d += p;
          }
      }
      d += l[u - 1];
      const g = y(d.trim());
      return C(g, i), R(g, i), g;
    },
    render: (l, i) => {
      l && !l.children.length ? (l.innerHTML = "", l.appendChild(i)) : J(i, l), f.forEach((d) => {
        d();
      }), f = [];
    }
  };
})();
var j, W;
class ne {
  constructor(e, s) {
    v(this, j, void 0);
    v(this, W, void 0);
    /**
     * {() => void} used to update DOM with new state
     */
    E(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    E(this, "emitEvent");
    S(this, W, e), S(this, j, s);
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
    return n(this, j);
  }
  /**
   * {HostElement} used to do read native properties on host element
   */
  get hostElement() {
    return n(this, W);
  }
}
j = new WeakMap(), W = new WeakMap();
const pe = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, Z = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, be = (t, e) => {
  var s, r, c, h;
  if (t = {
    ...pe,
    ...t
  }, t.styles = t.styles.toString(), t.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, t.styles && (L.globalStyles.replace(t.styles), L.globalStyleTag = Z(t.styles, document.head));
  else if (t.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (h = class extends HTMLElement {
    constructor() {
      super();
      v(this, s, void 0);
      v(this, r, void 0);
      v(this, c, void 0);
      S(this, r, this.attachShadow({
        mode: "open"
      })), G || (n(this, r).adoptedStyleSheets = L.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    emulateComponent() {
      G && t.styles && S(this, c, Z(t.styles));
    }
    update() {
      const a = n(this, s).render();
      typeof a == "string" ? n(this, r).innerHTML = me(a) : ge(n(this, r), a), G && (t.styles && n(this, r).insertBefore(n(this, c), n(this, r).childNodes[0]), L.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(L.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    emitEvent(a, m) {
      const y = new CustomEvent(a, {
        detail: m
      });
      this.dispatchEvent(y);
    }
    setProps(a) {
      var m, y;
      for (const [C, R] of Object.entries(a))
        e.observedProperties.find((k) => k === C) && (n(this, s)[C] = R);
      (y = (m = n(this, s)).onPropertiesChanged) == null || y.call(m), this.update();
    }
    getInstance() {
      return n(this, s);
    }
    connectedCallback() {
      var m, y, C, R;
      this.emulateComponent();
      const a = new ne(this, n(this, r));
      a.update = () => {
        this.update();
      }, a.emitEvent = (k, q) => {
        this.emitEvent(k, q);
      }, S(this, s, re(e, t.deps, a)), (y = (m = n(this, s)).beforeMount) == null || y.call(m), this.update(), (R = (C = n(this, s)).mount) == null || R.call(C), this.emitEvent("bindprops", {
        setProps: (k) => {
          this.setProps(k);
        }
      }, !1);
    }
    attributeChangedCallback(a, m, y) {
      var C, R;
      (R = (C = n(this, s)).onAttributesChanged) == null || R.call(C, a, m, y);
    }
    disconnectedCallback() {
      var a, m;
      (m = (a = n(this, s)).unmount) == null || m.call(a);
    }
  }, s = new WeakMap(), r = new WeakMap(), c = new WeakMap(), h));
}, ye = {
  deps: []
}, ve = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || be(t, e);
}, ie = (t = {}) => (e) => {
  if (t = {
    ...ye,
    ...t
  }, t.deps.some((r) => {
    var c;
    return ((c = r.__metadata__) == null ? void 0 : c.name) === "Renderer";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = re(e, t.deps);
  se.register(e, s);
}, we = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", c = [...Array.from(t.options)].filter((h) => h.selected).map((h) => h.value ?? (h.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
var V, w, T, z, ae;
class Se {
  constructor(e, s) {
    v(this, z);
    v(this, V, void 0);
    v(this, w, void 0);
    v(this, T, /* @__PURE__ */ new Map());
    S(this, V, e), S(this, w, s);
  }
  get errors() {
    return n(this, T);
  }
  get valid() {
    return M(this, z, ae).call(this), !n(this, T).size;
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
      n(this, w)[s].value = e[s] || n(this, V)[s];
    n(this, T).clear();
  }
}
V = new WeakMap(), w = new WeakMap(), T = new WeakMap(), z = new WeakSet(), ae = function() {
  n(this, T).clear();
  for (const e in n(this, w)) {
    const s = n(this, w)[e].value, r = n(this, w)[e].validators;
    n(this, w)[e].errors = null;
    for (const c of r) {
      const h = c(s);
      h !== null && (n(this, T).has(e) ? (n(this, T).set(e, {
        ...n(this, T).get(e),
        ...h
      }), n(this, w)[e].errors = {
        ...n(this, w)[e].errors,
        ...h
      }) : (n(this, T).set(e, h), n(this, w)[e].errors = h));
    }
  }
};
const _e = (t) => {
  const e = {}, s = {};
  for (const [f, a] of Object.entries(t)) {
    const m = Array.isArray(a) ? a : [a];
    e[f] = {
      value: m.shift(),
      validators: m
    }, s[f] = e[f].value;
  }
  const r = new Se(s, e);
  return [r, (f) => (a) => {
    const m = we(a.target);
    r.get(f).value = m;
  }, () => {
    r.reset();
  }];
}, ke = (t) => {
  let e = t;
  return [e, (r) => {
    let c;
    he(r) ? c = r(e) : c = r, Object.assign(e, c);
  }];
};
class Me {
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
const Ce = (t) => !!t && typeof t.subscribe == "function", Ae = (t) => !!t && typeof t.then == "function", Te = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Re = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class Ee {
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
const ee = (t) => Ce(t) ? t : Ae(t) ? Re(Promise.resolve(t)) : Te(t), H = class {
  static checkParams(e, s) {
    let r = 0;
    const c = {}, h = s.paramCount;
    for (let f = 0; f < e.length; f++) {
      const a = s.params[f];
      a.indexOf(":") >= 0 && (c[a.split(":")[1]] = e[f].split("?")[0], r += 1);
    }
    return r === h ? c : {};
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
let _ = H;
E(_, "routeList", []);
var N, F, $, U, oe, B, ce, O, D;
class K {
  constructor() {
    v(this, U);
    v(this, B);
    v(this, O);
    v(this, N, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    v(this, F, new Ee());
    v(this, $, void 0);
  }
  startHashChange() {
    S(this, $, fe(window, "hashchange", () => {
      M(this, U, oe).call(this);
    }));
  }
  stopHashChange() {
    n(this, $).call(this);
  }
  getTemplate() {
    return n(this, F).asObservable();
  }
  getCurrentRoute() {
    return n(this, N);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && M(this, O, D).call(this, e, s), window.location.hash = "#" + e) : M(this, O, D).call(this, e, s);
  }
}
N = new WeakMap(), F = new WeakMap(), $ = new WeakMap(), U = new WeakSet(), oe = function() {
  const e = window.location.hash.replace(/^#/, "");
  M(this, O, D).call(this, e, null);
}, B = new WeakSet(), ce = function(e, s) {
  if (e) {
    const r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, O = new WeakSet(), D = function(e, s) {
  const r = e.split("/").filter((f) => f.length > 0), c = _.routeList.filter((f) => {
    if (f.params.length === r.length && M(this, B, ce).call(this, f.url, e))
      return f;
    if (f.url === e)
      return f;
  }), h = c.length > 0 ? c[0] : null;
  h && (n(this, N).path = e, n(this, N).state = {
    ...s || {}
  }, ee(h.canActivate()).subscribe((f) => {
    if (!f)
      return;
    const a = _.checkParams(r, h);
    if (Object.keys(a).length > 0 || e) {
      n(this, N).routeParams = new Map(Object.entries(a));
      const m = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, N).queryParams = new Map(m), h.isRegistered ? n(this, F).next(h.template) : h.templatePath && ee(h.templatePath()).subscribe(() => {
        h.isRegistered = !0, n(this, F).next(h.template);
      });
    } else
      this.navigateTo(h.redirectTo, s);
  }));
};
ie()(K);
const He = () => {
  var e, s;
  class t {
    constructor(c, h) {
      v(this, e, "");
      v(this, s, void 0);
      E(this, "update");
    }
    beforeMount() {
      S(this, s, this.internalRouterSrvc.getTemplate().subscribe((c) => {
        S(this, e, c), this.renderer.update();
      })), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let c = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(c);
    }
    unmount() {
      n(this, s).call(this), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (n(this, e)) {
        const c = [`${n(this, e)}`];
        return c.raw = [`${n(this, e)}`], X(c);
      } else
        return X``;
    }
  }
  e = new WeakMap(), s = new WeakMap(), ve({
    selector: "router-outlet",
    deps: [K, ne]
  })(t);
};
class xe {
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
})(xe);
export {
  ve as Component,
  ie as Injectable,
  ne as Renderer,
  xe as Router,
  Me as Validators,
  fe as fromEvent,
  X as html,
  He as registerRouterComponent,
  ge as render,
  _e as useFormFields,
  ke as useState
};
