var ce = Object.defineProperty;
var ue = (t, e, s) => e in t ? ce(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var R = (t, e, s) => (ue(t, typeof e != "symbol" ? e + "" : e, s), s), Y = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (Y(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, w = (t, e, s, r) => (Y(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var k = (t, e, s) => (Y(t, e, "access private method"), s);
var _, te;
const se = new (te = class {
  constructor() {
    y(this, _, void 0);
    w(this, _, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!n(this, _).get(t))
      n(this, _).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = n(this, _).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    w(this, _, /* @__PURE__ */ new WeakMap());
  }
}, _ = new WeakMap(), te)(), he = (t) => typeof t == "function", de = (t) => {
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
}), re = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const b of e)
      b.__metadata__ ? r.push(s) : r.push(se.getService(b));
    const l = de(t), h = new t(...r);
    return e.forEach((b, d) => {
      h[l[d]] = r[d];
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
  render: me
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, l = "insertNode", h = /^insertNode([^ ]+)/;
  let b = [];
  const d = (o) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let u = JSON.stringify(o);
    const c = (a) => i[a] || a;
    return u = ((a) => a.replace(/[&<>\(\)]/g, c))(u), JSON.parse(u);
  }, p = (o, i) => {
    const u = o.options, c = Array.isArray(i) ? i : [i];
    let f, a, m = u.length;
    for (; m--; ) {
      a = u[m];
      const g = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = c.indexOf(g) > -1) && (f = !0);
    }
    f || (o.selectedIndex = -1);
  }, S = (o) => {
    const i = document.createElement("template");
    return i.innerHTML = o, i.content;
  }, A = (o, i) => {
    const u = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, null);
    let c = u.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const f = Array.from(c.attributes).filter((a) => r.test(a.nodeName));
        for (const {
          nodeName: a,
          nodeValue: m
        } of f) {
          const g = r.exec(a)[1];
          switch (!0) {
            case /^on+/.test(m): {
              const C = m.slice(2).toLowerCase();
              c.removeEventListener(C, i[g]), C !== "bindprops" ? c.addEventListener(C, i[g]) : c.addEventListener(C, (P) => {
                P.detail.setProps(i[g]());
              });
              break;
            }
            case /ref/.test(m): {
              const C = ((P) => {
                const I = P;
                return () => {
                  I.isConnected && i[g](I);
                };
              })(c);
              b.push(C);
              break;
            }
            case /^data-+/.test(m):
            case /^aria-+/.test(m): {
              c.setAttribute(m, d(i[g]));
              break;
            }
            case /class/.test(m): {
              i[g] ? c.classList.add(...i[g].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(m): {
              c.nodeName.toLowerCase() === "select" ? p(c, i[g]) : c.value = d(i[g]);
              break;
            }
            case /disabled/.test(m):
            case /checked/.test(m): {
              i[g] ? c.setAttribute(m, i[g]) : c.removeAttribute(m);
              break;
            }
            default:
              c.setAttribute(m, d(i[g]));
          }
          c.removeAttribute(a);
        }
      }
      c = u.nextNode();
    }
  }, E = (o, i) => {
    const u = document.createTreeWalker(o, NodeFilter.SHOW_COMMENT, null);
    let c = u.nextNode(), f;
    for (; c; ) {
      if (f = h.exec(c.data)) {
        const a = Array.isArray(i[f[1]]) ? i[f[1]] : [i[f[1]]];
        c.replaceWith(...a), u.currentNode = o;
      }
      c = u.nextNode();
    }
  }, L = (o, i) => {
    if (!o || !i || o.nodeType !== 1 || i.nodeType !== 1)
      return;
    const u = o.attributes, c = i.attributes;
    for (const {
      name: f,
      value: a
    } of u)
      /class/.test(f) ? Array.from(o.classList).every((m) => {
        i.classList.contains(m) || i.classList.add(m);
      }) : (!c[f] || c[f] !== a) && i.setAttribute(f, a);
    for (const {
      name: f
    } of c)
      /class/.test(f) ? Array.from(i.classList).every((a) => {
        o.classList.contains(a) || i.classList.remove(a);
      }) : u[f] || i.removeAttribute(f);
  }, U = (o) => o.nodeType === 3 ? "text" : o.nodeType === 8 ? "comment" : o.tagName.toLowerCase(), Q = (o) => o.childNodes && o.childNodes.length > 0 ? null : o.textContent, J = (o, i) => {
    const u = i ? Array.from(i.childNodes) : [], c = o ? Array.from(o.childNodes) : [];
    let f = u.length - c.length;
    if (f > 0)
      for (; f > 0; f--)
        u[u.length - f].parentNode.removeChild(u[u.length - f]);
    c.forEach(function(a, m) {
      const g = u[m];
      if (L(a, g), !g) {
        i && i.appendChild(a);
        return;
      }
      if (U(a) !== U(g)) {
        g.replaceWith(a);
        return;
      }
      const C = Q(a);
      if (C && C !== Q(g)) {
        g.textContent = C;
        return;
      }
      if (g.childNodes.length > 0 && a.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && a.childNodes.length > 0) {
        const P = document.createDocumentFragment();
        J(a, P), g.appendChild(P);
        return;
      }
      if (a.childNodes.length > 0) {
        J(a, g);
        return;
      }
    });
  };
  return {
    html: (o, ...i) => {
      let u = "";
      const {
        length: c
      } = o;
      for (let a = 1; a < c; a++) {
        const m = i[a - 1];
        let g = !1;
        if (u += o[a - 1], t.test(u) && e.test(u) && (u = u.replace(t, (C, P, I) => `${s}${a - 1}=${I || '"'}${P}${I ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(m):
            case m instanceof DocumentFragment: {
              u += `<!--${l}${a - 1}-->`;
              break;
            }
            case (typeof m == "object" && m !== null): {
              "html" in m && (u += m.html);
              break;
            }
            default:
              u += m;
          }
      }
      u += o[c - 1];
      const f = S(u.trim());
      return A(f, i), E(f, i), f;
    },
    render: (o, i) => {
      o && !o.children.length ? (o.innerHTML = "", o.appendChild(i)) : J(i, o), b.forEach((u) => {
        u();
      }), b = [];
    }
  };
})();
var j, W;
class ne {
  constructor(e, s) {
    y(this, j, void 0);
    y(this, W, void 0);
    /**
     * {() => void} used to update DOM with new state
     */
    R(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    R(this, "emitEvent");
    w(this, W, e), w(this, j, s);
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
const ge = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, Z = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, be = (t, e) => {
  var s, r, l, h;
  if (t = {
    ...ge,
    ...t
  }, t.styles = t.styles.toString(), t.root && !x.isRootNodeSet)
    x.isRootNodeSet = !0, t.styles && (x.globalStyles.replace(t.styles), x.globalStyleTag = Z(t.styles, document.head));
  else if (t.root && x.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (h = class extends HTMLElement {
    constructor() {
      super();
      y(this, s, void 0);
      y(this, r, void 0);
      y(this, l, void 0);
      w(this, r, this.attachShadow({
        mode: "open"
      })), G || (n(this, r).adoptedStyleSheets = x.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    emulateComponent() {
      G && t.styles && w(this, l, Z(t.styles));
    }
    update() {
      me(n(this, r), (() => n(this, s).render())()), G && (t.styles && n(this, r).insertBefore(n(this, l), n(this, r).childNodes[0]), x.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(x.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    emitEvent(d, p) {
      const S = new CustomEvent(d, {
        detail: p
      });
      this.dispatchEvent(S);
    }
    setProps(d) {
      var p, S;
      for (const [A, E] of Object.entries(d))
        e.observedProperties.find((L) => L === A) && (n(this, s)[A] = E);
      (S = (p = n(this, s)).onPropertiesChanged) == null || S.call(p), this.update();
    }
    getInstance() {
      return n(this, s);
    }
    connectedCallback() {
      var p, S, A, E;
      this.emulateComponent();
      const d = new ne(this, n(this, r));
      d.update = () => {
        this.update();
      }, d.emitEvent = (L, U) => {
        this.emitEvent(L, U);
      }, w(this, s, re(e, t.deps, d)), (S = (p = n(this, s)).beforeMount) == null || S.call(p), this.update(), (E = (A = n(this, s)).mount) == null || E.call(A), this.emitEvent("bindprops", {
        setProps: (L) => {
          this.setProps(L);
        }
      }, !1);
    }
    attributeChangedCallback(d, p, S) {
      var A, E;
      (E = (A = n(this, s)).onAttributesChanged) == null || E.call(A, d, p, S);
    }
    disconnectedCallback() {
      var d, p;
      (p = (d = n(this, s)).unmount) == null || p.call(d);
    }
  }, s = new WeakMap(), r = new WeakMap(), l = new WeakMap(), h));
}, pe = {
  deps: []
}, ye = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || be(t, e);
}, ie = (t = {}) => (e) => {
  if (t = {
    ...pe,
    ...t
  }, t.deps.some((r) => {
    var l;
    return ((l = r.__metadata__) == null ? void 0 : l.name) === "Renderer";
  }))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = re(e, t.deps);
  se.register(e, s);
}, ve = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", l = [...Array.from(t.options)].filter((h) => h.selected).map((h) => h.value ?? (h.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
var $, v, T, D, ae;
class we {
  constructor(e, s) {
    y(this, D);
    y(this, $, void 0);
    y(this, v, void 0);
    y(this, T, /* @__PURE__ */ new Map());
    w(this, $, e), w(this, v, s);
  }
  get errors() {
    return n(this, T);
  }
  get valid() {
    return k(this, D, ae).call(this), !n(this, T).size;
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
      n(this, v)[s].value = e[s] || n(this, $)[s];
    n(this, T).clear();
  }
}
$ = new WeakMap(), v = new WeakMap(), T = new WeakMap(), D = new WeakSet(), ae = function() {
  n(this, T).clear();
  for (const e in n(this, v)) {
    const s = n(this, v)[e].value, r = n(this, v)[e].validators;
    n(this, v)[e].errors = null;
    for (const l of r) {
      const h = l(s);
      h !== null && (n(this, T).has(e) ? (n(this, T).set(e, {
        ...n(this, T).get(e),
        ...h
      }), n(this, v)[e].errors = {
        ...n(this, v)[e].errors,
        ...h
      }) : (n(this, T).set(e, h), n(this, v)[e].errors = h));
    }
  }
};
const Ne = (t) => {
  const e = {}, s = {};
  for (const [b, d] of Object.entries(t)) {
    const p = Array.isArray(d) ? d : [d];
    e[b] = {
      value: p.shift(),
      validators: p
    }, s[b] = e[b].value;
  }
  const r = new we(s, e);
  return [r, (b) => (d) => {
    const p = ve(d.target);
    r.get(b).value = p;
  }, () => {
    r.reset();
  }];
}, Le = (t) => {
  let e = t;
  return [e, (r) => {
    let l;
    he(r) ? l = r(e) : l = r, Object.assign(e, l);
  }];
};
class ke {
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
const Se = (t) => !!t && typeof t.subscribe == "function", Ce = (t) => !!t && typeof t.then == "function", Te = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Ae = (t) => ({
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
const ee = (t) => Se(t) ? t : Ce(t) ? Ae(Promise.resolve(t)) : Te(t), O = class {
  static checkParams(e, s) {
    let r = 0, l = {}, h = s.ParamCount;
    for (let d = 0; d < e.length; d++) {
      var b = s.Params[d];
      b.indexOf(":") >= 0 && (l[b.split(":")[1]] = e[d].split("?")[0], r += 1);
    }
    return r === h ? l : {};
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
var N, F, V, z, oe, B, le, H, q;
class K {
  constructor() {
    y(this, z);
    y(this, B);
    y(this, H);
    y(this, N, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, F, new Ee());
    y(this, V, void 0);
  }
  startHashChange() {
    w(this, V, fe(window, "hashchange", () => {
      k(this, z, oe).call(this);
    }));
  }
  stopHashChange() {
    n(this, V).call(this);
  }
  getTemplate() {
    return n(this, F).asObservable();
  }
  getCurrentRoute() {
    return n(this, N);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && k(this, H, q).call(this, e, s), window.location.hash = "#" + e) : k(this, H, q).call(this, e, s);
  }
}
N = new WeakMap(), F = new WeakMap(), V = new WeakMap(), z = new WeakSet(), oe = function() {
  const e = window.location.hash.replace(/^#/, "");
  k(this, H, q).call(this, e, null);
}, B = new WeakSet(), le = function(e, s) {
  if (e) {
    let r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, H = new WeakSet(), q = function(e, s) {
  let r = e.split("/").filter((b) => b.length > 0), l = M.routeList.filter((b) => {
    if (b.Params.length === r.length && k(this, B, le).call(this, b.Url, e))
      return b;
    if (b.Url === e)
      return b;
  }), h = l.length > 0 ? l[0] : null;
  h && (n(this, N).path = e, n(this, N).state = {
    ...s || {}
  }, ee(h.canActivate()).subscribe((b) => {
    if (!b)
      return;
    let d = M.checkParams(r, h);
    if (Object.keys(d).length > 0 || e) {
      n(this, N).routeParams = new Map(Object.entries(d));
      const p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, N).queryParams = new Map(p), h.IsRegistered ? n(this, F).next(h.Template) : h.TemplatePath && ee(h.TemplatePath()).subscribe(() => {
        h.IsRegistered = !0, n(this, F).next(h.Template);
      });
    } else
      this.navigateTo(h.redirectTo);
  }));
};
ie()(K);
const Me = () => {
  var e, s;
  class t {
    constructor(l, h) {
      y(this, e, "");
      y(this, s, void 0);
      R(this, "update");
    }
    beforeMount() {
      w(this, s, this.internalRouterSrvc.getTemplate().subscribe((l) => {
        w(this, e, l), this.renderer.update();
      })), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let l = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(l);
    }
    unmount() {
      n(this, s).call(this), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (n(this, e)) {
        const l = [`${n(this, e)}`];
        return l.raw = [`${n(this, e)}`], X(l);
      } else
        return X``;
    }
  }
  e = new WeakMap(), s = new WeakMap(), ye({
    selector: "router-outlet",
    deps: [K, ne]
  })(t);
};
class Re {
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
})(Re);
export {
  ye as Component,
  ie as Injectable,
  ne as Renderer,
  Re as Router,
  ke as Validators,
  fe as fromEvent,
  X as html,
  Me as registerRouterComponent,
  me as render,
  Ne as useFormFields,
  Le as useState
};
