var le = Object.defineProperty;
var ue = (t, e, s) => e in t ? le(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var R = (t, e, s) => (ue(t, typeof e != "symbol" ? e + "" : e, s), s), Y = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (Y(t, e, "read from private field"), s ? s.call(t) : e.get(t)), v = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, S = (t, e, s, r) => (Y(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var k = (t, e, s) => (Y(t, e, "access private method"), s);
var L, te;
const se = new (te = class {
  constructor() {
    v(this, L, void 0);
    S(this, L, /* @__PURE__ */ new WeakMap());
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
    S(this, L, /* @__PURE__ */ new WeakMap());
  }
}, L = new WeakMap(), te)(), he = (t) => typeof t == "function", de = (t) => {
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
  const e = () => new DOMParser().parseFromString(t, "text/html").body || document.createElement("body"), s = (i) => {
    const f = i.querySelectorAll("script");
    for (const y of f)
      y.remove();
  }, r = (i, f) => {
    if (f = f.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(i) && (f.includes("javascript:") || f.includes("data:")) || i.startsWith("on"))
      return !0;
  }, c = (i) => {
    const f = i.attributes;
    for (const {
      name: y,
      value: C
    } of f)
      r(y, C) && i.removeAttribute(y);
  }, h = (i) => {
    const f = i.children;
    for (const y of f)
      c(y), h(y);
  }, m = e();
  return s(m), h(m), m.innerHTML;
}, re = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const m of e)
      m.__metadata__ ? r.push(s) : r.push(se.getService(m));
    const c = de(t), h = new t(...r);
    return e.forEach((m, i) => {
      h[c[i]] = r[i];
    }), h;
  } else
    return new t();
}, x = new class {
  constructor() {
    R(this, "globalStyles");
    R(this, "globalStyleTag");
    R(this, "style_registry");
    R(this, "isRootNodeSet");
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
  let m = [];
  const i = (l) => {
    const a = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let d = JSON.stringify(l);
    const u = (o) => a[o] || o;
    return d = ((o) => o.replace(/[&<>\(\)]/g, u))(d), JSON.parse(d);
  }, f = (l, a) => {
    const d = l.options, u = Array.isArray(a) ? a : [a];
    let g, o, b = d.length;
    for (; b--; ) {
      o = d[b];
      const p = o.getAttribute("value") ?? (o.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (o.selected = u.indexOf(p) > -1) && (g = !0);
    }
    g || (l.selectedIndex = -1);
  }, y = (l) => {
    const a = document.createElement("template");
    return a.innerHTML = l, a.content;
  }, C = (l, a) => {
    const d = document.createTreeWalker(l, NodeFilter.SHOW_ELEMENT, null);
    let u = d.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const g = Array.from(u.attributes).filter((o) => r.test(o.nodeName));
        for (const {
          nodeName: o,
          nodeValue: b
        } of g) {
          const p = r.exec(o)[1];
          switch (!0) {
            case /^on+/.test(b): {
              const T = b.slice(2).toLowerCase();
              u.removeEventListener(T, a[p]), T !== "bindprops" ? u.addEventListener(T, a[p]) : u.addEventListener(T, (P) => {
                P.detail.setProps(a[p]());
              });
              break;
            }
            case /ref/.test(b): {
              const T = ((P) => {
                const I = P;
                return () => {
                  I.isConnected && a[p](I);
                };
              })(u);
              m.push(T);
              break;
            }
            case /^data-+/.test(b):
            case /^aria-+/.test(b): {
              u.setAttribute(b, i(a[p]));
              break;
            }
            case /class/.test(b): {
              a[p] ? u.classList.add(...a[p].split(" ")) : u.setAttribute("class", "");
              break;
            }
            case /value/.test(b): {
              u.nodeName.toLowerCase() === "select" ? f(u, a[p]) : u.value = i(a[p]);
              break;
            }
            case /disabled/.test(b):
            case /checked/.test(b): {
              a[p] ? u.setAttribute(b, a[p]) : u.removeAttribute(b);
              break;
            }
            default:
              u.setAttribute(b, i(a[p]));
          }
          u.removeAttribute(o);
        }
      }
      u = d.nextNode();
    }
  }, E = (l, a) => {
    const d = document.createTreeWalker(l, NodeFilter.SHOW_COMMENT, null);
    let u = d.nextNode(), g;
    for (; u; ) {
      if (g = h.exec(u.data)) {
        const o = Array.isArray(a[g[1]]) ? a[g[1]] : [a[g[1]]];
        u.replaceWith(...o), d.currentNode = l;
      }
      u = d.nextNode();
    }
  }, N = (l, a) => {
    if (!l || !a || l.nodeType !== 1 || a.nodeType !== 1)
      return;
    const d = l.attributes, u = a.attributes;
    for (const {
      name: g,
      value: o
    } of d)
      /class/.test(g) ? Array.from(l.classList).every((b) => {
        a.classList.contains(b) || a.classList.add(b);
      }) : (!u[g] || u[g] !== o) && a.setAttribute(g, o);
    for (const {
      name: g
    } of u)
      /class/.test(g) ? Array.from(a.classList).every((o) => {
        l.classList.contains(o) || a.classList.remove(o);
      }) : d[g] || a.removeAttribute(g);
  }, q = (l) => l.nodeType === 3 ? "text" : l.nodeType === 8 ? "comment" : l.tagName.toLowerCase(), Q = (l) => l.childNodes && l.childNodes.length > 0 ? null : l.textContent, J = (l, a) => {
    const d = a ? Array.from(a.childNodes) : [], u = l ? Array.from(l.childNodes) : [];
    let g = d.length - u.length;
    if (g > 0)
      for (; g > 0; g--)
        d[d.length - g].parentNode.removeChild(d[d.length - g]);
    u.forEach(function(o, b) {
      const p = d[b];
      if (N(o, p), !p) {
        a && a.appendChild(o);
        return;
      }
      if (q(o) !== q(p)) {
        p.replaceWith(o);
        return;
      }
      const T = Q(o);
      if (T && T !== Q(p)) {
        p.textContent = T;
        return;
      }
      if (p.childNodes.length > 0 && o.childNodes.length < 1) {
        p.innerHTML = "";
        return;
      }
      if (p.childNodes.length < 1 && o.childNodes.length > 0) {
        const P = document.createDocumentFragment();
        J(o, P), p.appendChild(P);
        return;
      }
      if (o.childNodes.length > 0) {
        J(o, p);
        return;
      }
    });
  };
  return {
    html: (l, ...a) => {
      let d = "";
      const {
        length: u
      } = l;
      for (let o = 1; o < u; o++) {
        const b = a[o - 1];
        let p = !1;
        if (d += l[o - 1], t.test(d) && e.test(d) && (d = d.replace(t, (T, P, I) => `${s}${o - 1}=${I || '"'}${P}${I ? "" : '"'}`), p = !0), !p)
          switch (!0) {
            case Array.isArray(b):
            case b instanceof DocumentFragment: {
              d += `<!--${c}${o - 1}-->`;
              break;
            }
            case (typeof b == "object" && b !== null): {
              "html" in b && (d += b.html);
              break;
            }
            default:
              d += b;
          }
      }
      d += l[u - 1];
      const g = y(d.trim());
      return C(g, a), E(g, a), g;
    },
    render: (l, a) => {
      l && !l.children.length ? (l.innerHTML = "", l.appendChild(a)) : J(a, l), m.forEach((d) => {
        d();
      }), m = [];
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
    R(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    R(this, "emitEvent");
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
const be = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, Z = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, pe = (t, e) => {
  var s, r, c, h;
  if (t = {
    ...be,
    ...t
  }, t.styles = t.styles.toString(), t.root && !x.isRootNodeSet)
    x.isRootNodeSet = !0, t.styles && (x.globalStyles.replace(t.styles), x.globalStyleTag = Z(t.styles, document.head));
  else if (t.root && x.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (h = class extends HTMLElement {
    constructor() {
      super();
      v(this, s, void 0);
      v(this, r, void 0);
      v(this, c, void 0);
      S(this, r, this.attachShadow({
        mode: "open"
      })), G || (n(this, r).adoptedStyleSheets = x.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    emulateComponent() {
      G && t.styles && S(this, c, Z(t.styles));
    }
    update() {
      const i = n(this, s).render();
      typeof i == "string" ? n(this, r).innerHTML = me(i) : ge(n(this, r), i), G && (t.styles && n(this, r).insertBefore(n(this, c), n(this, r).childNodes[0]), x.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(x.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    emitEvent(i, f) {
      const y = new CustomEvent(i, {
        detail: f
      });
      this.dispatchEvent(y);
    }
    setProps(i) {
      var f, y;
      for (const [C, E] of Object.entries(i))
        e.observedProperties.find((N) => N === C) && (n(this, s)[C] = E);
      (y = (f = n(this, s)).onPropertiesChanged) == null || y.call(f), this.update();
    }
    getInstance() {
      return n(this, s);
    }
    connectedCallback() {
      var f, y, C, E;
      this.emulateComponent();
      const i = new ne(this, n(this, r));
      i.update = () => {
        this.update();
      }, i.emitEvent = (N, q) => {
        this.emitEvent(N, q);
      }, S(this, s, re(e, t.deps, i)), (y = (f = n(this, s)).beforeMount) == null || y.call(f), this.update(), (E = (C = n(this, s)).mount) == null || E.call(C), this.emitEvent("bindprops", {
        setProps: (N) => {
          this.setProps(N);
        }
      }, !1);
    }
    attributeChangedCallback(i, f, y) {
      var C, E;
      (E = (C = n(this, s)).onAttributesChanged) == null || E.call(C, i, f, y);
    }
    disconnectedCallback() {
      var i, f;
      (f = (i = n(this, s)).unmount) == null || f.call(i);
    }
  }, s = new WeakMap(), r = new WeakMap(), c = new WeakMap(), h));
}, ye = {
  deps: []
}, ve = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || pe(t, e);
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
var V, w, A, U, ae;
class Se {
  constructor(e, s) {
    v(this, U);
    v(this, V, void 0);
    v(this, w, void 0);
    v(this, A, /* @__PURE__ */ new Map());
    S(this, V, e), S(this, w, s);
  }
  get errors() {
    return n(this, A);
  }
  get valid() {
    return k(this, U, ae).call(this), !n(this, A).size;
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
    n(this, A).clear();
  }
}
V = new WeakMap(), w = new WeakMap(), A = new WeakMap(), U = new WeakSet(), ae = function() {
  n(this, A).clear();
  for (const e in n(this, w)) {
    const s = n(this, w)[e].value, r = n(this, w)[e].validators;
    n(this, w)[e].errors = null;
    for (const c of r) {
      const h = c(s);
      h !== null && (n(this, A).has(e) ? (n(this, A).set(e, {
        ...n(this, A).get(e),
        ...h
      }), n(this, w)[e].errors = {
        ...n(this, w)[e].errors,
        ...h
      }) : (n(this, A).set(e, h), n(this, w)[e].errors = h));
    }
  }
};
const Ne = (t) => {
  const e = {}, s = {};
  for (const [m, i] of Object.entries(t)) {
    const f = Array.isArray(i) ? i : [i];
    e[m] = {
      value: f.shift(),
      validators: f
    }, s[m] = e[m].value;
  }
  const r = new Se(s, e);
  return [r, (m) => (i) => {
    const f = we(i.target);
    r.get(m).value = f;
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
const Ce = (t) => !!t && typeof t.subscribe == "function", Te = (t) => !!t && typeof t.then == "function", Ae = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Ee = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
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
const ee = (t) => Ce(t) ? t : Te(t) ? Ee(Promise.resolve(t)) : Ae(t), O = class {
  static checkParams(e, s) {
    let r = 0, c = {}, h = s.ParamCount;
    for (let i = 0; i < e.length; i++) {
      var m = s.Params[i];
      m.indexOf(":") >= 0 && (c[m.split(":")[1]] = e[i].split("?")[0], r += 1);
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
    let s = {
      Params: {},
      Url: "",
      Template: "",
      ParamCount: 0,
      IsRegistered: !1,
      redirectTo: "",
      canActivate: () => !0
    };
    if (s.Params = e.path.split("/").filter((r) => r.length > 0), s.Url = e.path, s.Template = "", s.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      s.Template = e.template, s.TemplatePath = e.templatePath;
    }
    e.canActivate && (s.canActivate = e.canActivate), s.ParamCount = O.getParamCount(s.Params), O.routeList.push(s);
  }
  static preloadRoutes() {
    for (const e of O.routeList)
      e.TemplatePath && e.TemplatePath();
  }
};
let M = O;
R(M, "routeList", []);
var _, H, $, z, oe, B, ce, F, D;
class K {
  constructor() {
    v(this, z);
    v(this, B);
    v(this, F);
    v(this, _, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    v(this, H, new Re());
    v(this, $, void 0);
  }
  startHashChange() {
    S(this, $, fe(window, "hashchange", () => {
      k(this, z, oe).call(this);
    }));
  }
  stopHashChange() {
    n(this, $).call(this);
  }
  getTemplate() {
    return n(this, H).asObservable();
  }
  getCurrentRoute() {
    return n(this, _);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && k(this, F, D).call(this, e, s), window.location.hash = "#" + e) : k(this, F, D).call(this, e, s);
  }
}
_ = new WeakMap(), H = new WeakMap(), $ = new WeakMap(), z = new WeakSet(), oe = function() {
  const e = window.location.hash.replace(/^#/, "");
  k(this, F, D).call(this, e, null);
}, B = new WeakSet(), ce = function(e, s) {
  if (e) {
    let r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, F = new WeakSet(), D = function(e, s) {
  let r = e.split("/").filter((m) => m.length > 0), c = M.routeList.filter((m) => {
    if (m.Params.length === r.length && k(this, B, ce).call(this, m.Url, e))
      return m;
    if (m.Url === e)
      return m;
  }), h = c.length > 0 ? c[0] : null;
  h && (n(this, _).path = e, n(this, _).state = {
    ...s || {}
  }, ee(h.canActivate()).subscribe((m) => {
    if (!m)
      return;
    let i = M.checkParams(r, h);
    if (Object.keys(i).length > 0 || e) {
      n(this, _).routeParams = new Map(Object.entries(i));
      const f = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, _).queryParams = new Map(f), h.IsRegistered ? n(this, H).next(h.Template) : h.TemplatePath && ee(h.TemplatePath()).subscribe(() => {
        h.IsRegistered = !0, n(this, H).next(h.Template);
      });
    } else
      this.navigateTo(h.redirectTo);
  }));
};
ie()(K);
const He = () => {
  var e, s;
  class t {
    constructor(c, h) {
      v(this, e, "");
      v(this, s, void 0);
      R(this, "update");
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
class Pe {
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
      for (let r of e)
        M.formatRoute(r);
      s && M.preloadRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ie({
  deps: [K]
})(Pe);
export {
  ve as Component,
  ie as Injectable,
  ne as Renderer,
  Pe as Router,
  Me as Validators,
  fe as fromEvent,
  X as html,
  He as registerRouterComponent,
  ge as render,
  Ne as useFormFields,
  ke as useState
};
