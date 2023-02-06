var oe = Object.defineProperty;
var le = (t, e, s) => e in t ? oe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var E = (t, e, s) => (le(t, typeof e != "symbol" ? e + "" : e, s), s), B = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (B(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, C = (t, e, s, r) => (B(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var _ = (t, e, s) => (B(t, e, "access private method"), s);
var N, Z;
const ee = new (Z = class {
  constructor() {
    y(this, N, void 0);
    C(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(t, e) {
    if (!n(this, N).get(t))
      n(this, N).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(t) {
    const e = n(this, N).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    C(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), Z)(), ce = (t) => typeof t == "function", ue = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, J = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), he = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), te = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const b of e)
      b.__metadata__ ? r.push(s) : r.push(ee.getService(b));
    const u = ue(t), d = new t(...r);
    return e.forEach((b, h) => {
      d[u[h]] = r[h];
    }), d;
  } else
    return new t();
}, x = new class {
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
  html: K,
  render: de
} = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, u = "insertNode", d = /^insertNode([^ ]+)/;
  let b = [];
  const h = (o) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let c = JSON.stringify(o);
    const l = (a) => i[a] || a;
    return c = ((a) => a.replace(/[&<>\(\)]/g, l))(c), JSON.parse(c);
  }, p = (o, i) => {
    const c = o.options, l = Array.isArray(i) ? i : [i];
    let f, a, m = c.length;
    for (; m--; ) {
      a = c[m];
      const g = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = l.indexOf(g) > -1) && (f = !0);
    }
    f || (o.selectedIndex = -1);
  }, w = (o) => {
    const i = document.createElement("template");
    return i.innerHTML = o, i.content;
  }, A = (o, i) => {
    const c = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, null);
    let l = c.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const f = Array.from(l.attributes).filter((a) => r.test(a.nodeName));
        for (const {
          nodeName: a,
          nodeValue: m
        } of f) {
          const g = r.exec(a)[1];
          switch (!0) {
            case /^on+/.test(m): {
              const S = m.slice(2).toLowerCase();
              l.removeEventListener(S, i[g]), S !== "bindprops" ? l.addEventListener(S, i[g]) : l.addEventListener(S, (P) => {
                P.detail.setProps(i[g]());
              });
              break;
            }
            case /ref/.test(m): {
              const S = ((P) => {
                const I = P;
                return () => {
                  I.isConnected && i[g](I);
                };
              })(l);
              b.push(S);
              break;
            }
            case /^data-+/.test(m):
            case /^aria-+/.test(m): {
              l.setAttribute(m, h(i[g]));
              break;
            }
            case /class/.test(m): {
              i[g] ? l.classList.add(...i[g].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(m): {
              l.nodeName.toLowerCase() === "select" ? p(l, i[g]) : l.value = h(i[g]);
              break;
            }
            case /disabled/.test(m):
            case /checked/.test(m): {
              i[g] ? l.setAttribute(m, i[g]) : l.removeAttribute(m);
              break;
            }
            default:
              l.setAttribute(m, h(i[g]));
          }
          l.removeAttribute(a);
        }
      }
      l = c.nextNode();
    }
  }, R = (o, i) => {
    const c = document.createTreeWalker(o, NodeFilter.SHOW_COMMENT, null);
    let l = c.nextNode(), f;
    for (; l; ) {
      if (f = d.exec(l.data)) {
        const a = Array.isArray(i[f[1]]) ? i[f[1]] : [i[f[1]]];
        l.replaceWith(...a), c.currentNode = o;
      }
      l = c.nextNode();
    }
  }, H = (o, i) => {
    if (!o || !i || o.nodeType !== 1 || i.nodeType !== 1)
      return;
    const c = o.attributes, l = i.attributes;
    for (const {
      name: f,
      value: a
    } of c)
      /class/.test(f) ? Array.from(o.classList).every((m) => {
        i.classList.contains(m) || i.classList.add(m);
      }) : (!l[f] || l[f] !== a) && i.setAttribute(f, a);
    for (const {
      name: f
    } of l)
      /class/.test(f) ? Array.from(i.classList).every((a) => {
        o.classList.contains(a) || i.classList.remove(a);
      }) : c[f] || i.removeAttribute(f);
  }, $ = (o) => o.nodeType === 3 ? "text" : o.nodeType === 8 ? "comment" : o.tagName.toLowerCase(), G = (o) => o.childNodes && o.childNodes.length > 0 ? null : o.textContent, z = (o, i) => {
    const c = i ? Array.from(i.childNodes) : [], l = o ? Array.from(o.childNodes) : [];
    let f = c.length - l.length;
    if (f > 0)
      for (; f > 0; f--)
        c[c.length - f].parentNode.removeChild(c[c.length - f]);
    l.forEach(function(a, m) {
      const g = c[m];
      if (H(a, g), !g) {
        i && i.appendChild(a);
        return;
      }
      if ($(a) !== $(g)) {
        g.replaceWith(a);
        return;
      }
      const S = G(a);
      if (S && S !== G(g)) {
        g.textContent = S;
        return;
      }
      if (g.childNodes.length > 0 && a.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && a.childNodes.length > 0) {
        const P = document.createDocumentFragment();
        z(a, P), g.appendChild(P);
        return;
      }
      if (a.childNodes.length > 0) {
        z(a, g);
        return;
      }
    });
  };
  return {
    html: (o, ...i) => {
      let c = "";
      const {
        length: l
      } = o;
      for (let a = 1; a < l; a++) {
        const m = i[a - 1];
        let g = !1;
        if (c += o[a - 1], t.test(c) && e.test(c) && (c = c.replace(t, (S, P, I) => `${s}${a - 1}=${I || '"'}${P}${I ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(m):
            case m instanceof DocumentFragment: {
              c += `<!--${u}${a - 1}-->`;
              break;
            }
            case (typeof m == "object" && m !== null): {
              "html" in m && (c += m.html);
              break;
            }
            default:
              c += m;
          }
      }
      c += o[l - 1];
      const f = w(c.trim());
      return A(f, i), R(f, i), f;
    },
    render: (o, i) => {
      o && !o.children.length ? (o.innerHTML = "", o.appendChild(i)) : z(i, o), b.forEach((c) => {
        c();
      }), b = [];
    }
  };
})();
class se {
  constructor() {
    /**
     * {ShadowRoot} used to traverse dom tree
     */
    E(this, "shadowRoot");
    /**
     * {() => void} used to update DOM with new state
     */
    E(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    E(this, "emitEvent");
  }
  static get __metadata__() {
    return {
      name: "Renderer"
    };
  }
}
const fe = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, Q = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, me = (t, e) => {
  var s, r, u, d;
  if (t = {
    ...fe,
    ...t
  }, t.styles = t.styles.toString(), t.root && !x.isRootNodeSet)
    x.isRootNodeSet = !0, t.styles && (x.globalStyles.replace(t.styles), x.globalStyleTag = Q(t.styles, document.head));
  else if (t.root && x.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + t.selector + " component");
  window.customElements.define(t.selector, (d = class extends HTMLElement {
    constructor() {
      super();
      y(this, s, void 0);
      y(this, r, void 0);
      y(this, u, void 0);
      C(this, r, this.attachShadow({
        mode: "open"
      })), J || (n(this, r).adoptedStyleSheets = x.getComputedCss(t.styles, t.standalone)), this.getInstance = this.getInstance.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    emulateComponent() {
      J && t.styles && C(this, u, Q(t.styles));
    }
    update() {
      de(n(this, r), (() => n(this, s).render())()), J && (t.styles && n(this, r).insertBefore(n(this, u), n(this, r).childNodes[0]), x.globalStyleTag && !t.standalone && n(this, r).insertBefore(document.importNode(x.globalStyleTag, !0), n(this, r).childNodes[0]));
    }
    emitEvent(h, p) {
      const w = new CustomEvent(h, {
        detail: p
      });
      this.dispatchEvent(w);
    }
    setProps(h) {
      var p, w;
      for (const [A, R] of Object.entries(h))
        e.observedProperties[A] && (n(this, s)[A] = R);
      (w = (p = n(this, s)).onPropertiesChanged) == null || w.call(p), this.update();
    }
    getInstance() {
      return n(this, s);
    }
    connectedCallback() {
      var p, w, A, R;
      this.emulateComponent();
      const h = new se();
      h.shadowRoot = n(this, r), h.update = () => {
        this.update();
      }, h.emitEvent = (H, $) => {
        this.emitEvent(H, $);
      }, C(this, s, te(e, t.deps, h)), (w = (p = n(this, s)).beforeMount) == null || w.call(p), this.update(), (R = (A = n(this, s)).mount) == null || R.call(A), this.emitEvent("bindprops", {
        setProps: (H) => {
          this.setProps(H);
        }
      }, !1);
    }
    attributeChangedCallback(h, p, w) {
      var A, R;
      (R = (A = n(this, s)).onAttributesChanges) == null || R.call(A, h, p, w);
    }
    disconnectedCallback() {
      var h, p;
      (p = (h = n(this, s)).unmount) == null || p.call(h);
    }
  }, s = new WeakMap(), r = new WeakMap(), u = new WeakMap(), d));
}, ge = {
  deps: []
}, be = (t) => (e) => {
  if (t.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(t.selector) || me(t, e);
}, re = (t = {}) => (e) => {
  t = {
    ...ge,
    ...t
  };
  const s = te(e, t.deps);
  ee.register(e, s);
}, pe = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", u = [...Array.from(t.options)].filter((d) => d.selected).map((d) => d.value ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = s ? u[0] : u;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
var j, v, T, U, ne;
class ye {
  constructor(e, s) {
    y(this, U);
    y(this, j, void 0);
    y(this, v, void 0);
    y(this, T, /* @__PURE__ */ new Map());
    C(this, j, e), C(this, v, s);
  }
  get errors() {
    return n(this, T);
  }
  get valid() {
    return _(this, U, ne).call(this), !n(this, T).size;
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
      n(this, v)[s].value = e[s] || n(this, j)[s];
    n(this, T).clear();
  }
}
j = new WeakMap(), v = new WeakMap(), T = new WeakMap(), U = new WeakSet(), ne = function() {
  n(this, T).clear();
  for (const e in n(this, v)) {
    const s = n(this, v)[e].value, r = n(this, v)[e].validators;
    n(this, v)[e].errors = null;
    for (const u of r) {
      const d = u(s);
      d !== null && (n(this, T).has(e) ? (n(this, T).set(e, {
        ...n(this, T).get(e),
        ...d
      }), n(this, v)[e].errors = {
        ...n(this, v)[e].errors,
        ...d
      }) : (n(this, T).set(e, d), n(this, v)[e].errors = d));
    }
  }
};
const xe = (t) => {
  const e = {}, s = {};
  for (const [b, h] of Object.entries(t)) {
    const p = Array.isArray(h) ? h : [h];
    e[b] = {
      value: p.shift(),
      validators: p
    }, s[b] = e[b].value;
  }
  const r = new ye(s, e);
  return [r, (b) => (h) => {
    const p = pe(h.target);
    r.get(b).value = p;
  }, () => {
    r.reset();
  }];
}, Ne = (t) => {
  let e = t;
  return [e, (r) => {
    let u;
    ce(r) ? u = r(e) : u = r, Object.assign(e, u);
  }];
};
class Le {
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
const ve = (t) => !!t && typeof t.subscribe == "function", we = (t) => !!t && typeof t.then == "function", Se = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Ce = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class Te {
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
const X = (t) => ve(t) ? t : we(t) ? Ce(Promise.resolve(t)) : Se(t), O = class {
  static checkParams(e, s) {
    let r = 0, u = {}, d = s.ParamCount;
    for (let h = 0; h < e.length; h++) {
      var b = s.Params[h];
      b.indexOf(":") >= 0 && (u[b.split(":")[1]] = e[h].split("?")[0], r += 1);
    }
    return r === d ? u : {};
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
let k = O;
E(k, "routeList", []);
var L, M, W, q, ie, D, ae, F, V;
class Y {
  constructor() {
    y(this, q);
    y(this, D);
    y(this, F);
    y(this, L, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, M, new Te());
    y(this, W, void 0);
  }
  startHashChange() {
    C(this, W, he(window, "hashchange", () => {
      _(this, q, ie).call(this);
    }));
  }
  stopHashChange() {
    n(this, W).call(this);
  }
  getTemplate() {
    return n(this, M).asObservable();
  }
  getCurrentRoute() {
    return n(this, L);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && _(this, F, V).call(this, e, s), window.location.hash = "#" + e) : _(this, F, V).call(this, e, s);
  }
}
L = new WeakMap(), M = new WeakMap(), W = new WeakMap(), q = new WeakSet(), ie = function() {
  const e = window.location.hash.replace(/^#/, "");
  _(this, F, V).call(this, e, null);
}, D = new WeakSet(), ae = function(e, s) {
  if (e) {
    let r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, F = new WeakSet(), V = function(e, s) {
  let r = e.split("/").filter((b) => b.length > 0), u = k.routeList.filter((b) => {
    if (b.Params.length === r.length && _(this, D, ae).call(this, b.Url, e))
      return b;
    if (b.Url === e)
      return b;
  }), d = u.length > 0 ? u[0] : null;
  d && (n(this, L).path = e, n(this, L).state = {
    ...s || {}
  }, X(d.canActivate()).subscribe((b) => {
    if (!b)
      return;
    let h = k.checkParams(r, d);
    if (Object.keys(h).length > 0 || e) {
      n(this, L).routeParams = new Map(Object.entries(h));
      const p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, L).queryParams = new Map(p), d.IsRegistered ? n(this, M).next(d.Template) : d.TemplatePath && X(d.TemplatePath()).subscribe(() => {
        d.IsRegistered = !0, n(this, M).next(d.Template);
      });
    } else
      this.navigateTo(d.redirectTo);
  }));
};
re()(Y);
const _e = () => {
  var e, s;
  class t {
    constructor(u, d) {
      y(this, e, "");
      y(this, s, void 0);
      E(this, "update");
    }
    beforeMount() {
      C(this, s, this.internalRouterSrvc.getTemplate().subscribe((u) => {
        C(this, e, u), this.renderer.update();
      })), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let u = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(u);
    }
    unmount() {
      n(this, s).call(this), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (n(this, e)) {
        const u = [`${n(this, e)}`];
        return u.raw = [`${n(this, e)}`], K(u);
      } else
        return K``;
    }
  }
  e = new WeakMap(), s = new WeakMap(), be({
    selector: "router-outlet",
    deps: [Y, se]
  })(t);
};
class Ae {
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
        k.formatRoute(r);
      s && k.preloadRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
re({
  deps: [Y]
})(Ae);
export {
  be as Component,
  re as Injectable,
  se as Renderer,
  Ae as Router,
  Le as Validators,
  he as fromNativeEvent,
  K as html,
  _e as registerRouterComponent,
  de as render,
  xe as useFormFields,
  Ne as useState
};
