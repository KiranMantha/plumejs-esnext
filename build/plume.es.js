var re = Object.defineProperty;
var ne = (s, e, t) => e in s ? re(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var m = (s, e, t) => (ne(s, typeof e != "symbol" ? e + "" : e, t), t), j = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var y = (s, e, t) => (j(s, e, "read from private field"), t ? t.call(s) : e.get(s)), k = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, M = (s, e, t, r) => (j(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var I = (s, e, t) => (j(s, e, "access private method"), t);
var L, z;
const J = new (z = class {
  constructor() {
    k(this, L, void 0);
    M(this, L, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!y(this, L).get(s))
      y(this, L).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = y(this, L).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    M(this, L, /* @__PURE__ */ new WeakMap());
  }
}, L = new WeakMap(), z)(), oe = (s) => !!s && typeof s.subscribe == "function", ie = (s) => !!s && typeof s.then == "function", Y = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ae = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ce = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), le = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
});
class G {
  constructor() {
    m(this, "_callbacks", []);
  }
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    return this._callbacks.push(e), this.unsubscribe;
  }
  unsubscribe() {
    this._callbacks = [];
  }
  next(e) {
    for (const t of this._callbacks)
      t(e);
  }
}
class ue extends G {
  constructor(t) {
    super();
    m(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
    return this.next(this._initialValue), r;
  }
}
class K {
  constructor() {
    m(this, "_subcribers", []);
  }
  /**
   * add subscribers to subscriptions
   * @param {Function} fn
   * @returns {void}
   */
  add(e) {
    this._subcribers.push(e);
  }
  /**
   * remove all added subcriptions
   * @returns {void}
   */
  unsubscribe() {
    for (const e of this._subcribers)
      e();
    this._subcribers = [];
  }
}
const q = (s) => oe(s) ? s : ie(s) ? le(Promise.resolve(s)) : ce(s), D = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), he = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const p = f.querySelectorAll("script");
    for (const C of p)
      C.remove();
  }, r = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, l = (f) => {
    const p = f.attributes;
    for (const {
      name: C,
      value: T
    } of p)
      r(C, T) && f.removeAttribute(C);
  }, n = (f) => {
    const p = f.children;
    for (const C of p)
      l(C), n(C);
  }, o = e();
  return t(o), n(o), o.innerHTML;
}, de = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, fe = (s, e) => {
  const t = Y(e), r = () => ({
    get(l, n) {
      const o = Object.prototype.toString.call(l[n]);
      return ["[object Object]", "[object Array]"].indexOf(o) > -1 && !("__metadata__" in l[n]) ? new Proxy(l[n], r()) : l[n];
    },
    set(l, n, o) {
      return l[n] = o, ++s.renderCount, de(s), !0;
    }
  });
  return class extends e {
    constructor(...l) {
      return super(...l), l.forEach((n, o) => {
        t[o] && t[o] !== "undefined" && (this[t[o]] = n);
      }), new Proxy(this, r());
    }
  };
}, Ce = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, Q = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const o of e)
      o.prototype.__metadata__.name !== "RENDERER" ? r.push(J.getService(o)) : r.push(t);
    const l = Y(s), n = new s(...r);
    return e.forEach((o, f) => {
      n[l[f]] = r[f];
    }), n;
  } else
    return new s();
}, O = new class {
  constructor() {
    m(this, "globalStyles");
    m(this, "globalStyleTag");
    m(this, "style_registry");
    m(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(s = "") {
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], s) {
      const r = new CSSStyleSheet();
      r.replace(s), e.push(r);
    }
    return e;
  }
}(), {
  html: B,
  render: pe
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, l = "insertNode", n = /^insertNode([^ ]+)/;
  let o = [], f = [];
  const p = (u) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(u);
    const c = (d) => i[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, C = (u, i) => {
    const h = u.options, c = Array.isArray(i) ? i : [i];
    let w, d, a = h.length;
    for (; a--; ) {
      d = h[a];
      const g = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(g) > -1) && (w = !0);
    }
    w || (u.selectedIndex = -1);
  }, T = (u) => {
    const i = document.createElement("template");
    return i.innerHTML = u, i.content;
  }, $ = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const w = Array.from(c.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: a
        } of w) {
          const g = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(a): {
              const _ = a.slice(2).toLowerCase();
              c.removeEventListener(_, i[g]), c.addEventListener(_, i[g]);
              break;
            }
            case /ref/.test(a): {
              const _ = ((x, N) => {
                const F = x, V = N;
                return () => {
                  F.isConnected && V(F);
                };
              })(c, i[g]);
              o.push(_);
              break;
            }
            case /^data-+/.test(a):
            case /^aria-+/.test(a): {
              if (a === "data-input") {
                const _ = ((x, N) => {
                  const F = x, V = N;
                  return () => {
                    if (F.isConnected) {
                      const se = new CustomEvent("bindprops", {
                        detail: {
                          props: V
                        },
                        bubbles: !1
                      });
                      F.dispatchEvent(se);
                    }
                  };
                })(c, i[g]);
                f.push(_);
              } else
                c.setAttribute(a, p(i[g]));
              break;
            }
            case /class/.test(a): {
              i[g] ? c.classList.add(...i[g].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(a): {
              c.nodeName.toLowerCase() === "select" ? C(c, i[g]) : c.value = p(i[g]);
              break;
            }
            case /disabled/.test(a):
            case /checked/.test(a): {
              i[g] ? c.setAttribute(a, i[g]) : c.removeAttribute(a);
              break;
            }
            default:
              c.setAttribute(a, p(i[g]));
          }
          c.removeAttribute(d);
        }
      }
      c = h.nextNode();
    }
  }, b = (u, i) => {
    const h = document.createTreeWalker(u, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), w;
    for (; c; ) {
      if (w = n.exec(c.data)) {
        const d = Array.isArray(i[w[1]]) ? i[w[1]] : [i[w[1]]];
        c.replaceWith(...d), h.currentNode = u;
      }
      c = h.nextNode();
    }
  }, S = (u, i) => {
    if (!u || !i || u.nodeType !== 1 || i.nodeType !== 1)
      return;
    const h = u.attributes, c = i.attributes, w = i.getAttribute("data-preserve-attributes"), d = w && w === "true";
    for (const {
      name: a,
      value: g
    } of h)
      (!c[a] || c[a] !== g) && i.setAttribute(a, g);
    if (!d)
      for (const {
        name: a
      } of c)
        h[a] || i.removeAttribute(a);
  }, v = (u) => u.nodeType === 3 ? "text" : u.nodeType === 8 ? "comment" : u.tagName.toLowerCase(), A = (u) => u.childNodes && u.childNodes.length > 0 ? null : u.textContent, E = (u, i, h) => {
    const c = i ? Array.from(i.childNodes) : [], w = u ? Array.from(u.childNodes) : [];
    let d = c.length - w.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    w.forEach(function(a, g) {
      const _ = c[g];
      if (h && _ && _.nodeType === 1 && _.tagName.indexOf("-") > -1)
        return;
      if (S(a, _), !_) {
        i && i.appendChild(a);
        return;
      }
      if (v(a) !== v(_)) {
        _.replaceWith(a);
        return;
      }
      const x = A(a);
      if (x && x !== A(_)) {
        _.textContent = x;
        return;
      }
      if (_.childNodes.length > 0 && a.childNodes.length < 1) {
        _.innerHTML = "";
        return;
      }
      if (_.childNodes.length < 1 && a.childNodes.length > 0) {
        const N = document.createDocumentFragment();
        E(a, N, !1), _.appendChild(N);
        return;
      }
      if (a.childNodes.length > 0) {
        E(a, _, !0);
        return;
      }
    });
  };
  return {
    html: (u, ...i) => {
      let h = "";
      const {
        length: c
      } = u;
      for (let d = 1; d < c; d++) {
        const a = i[d - 1];
        let g = !1;
        if (h += u[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (_, x, N) => `${t}${d - 1}=${N || '"'}${x}${N ? "" : '"'}`), g = !0), !g)
          switch (!0) {
            case Array.isArray(a):
            case a instanceof DocumentFragment: {
              h += `<!--${l}${d - 1}-->`;
              break;
            }
            case (typeof a == "object" && a !== null): {
              "html" in a && (h += a.html);
              break;
            }
            default:
              h += a;
          }
      }
      h += u[c - 1];
      const w = T(h.trim());
      return $(w, i), b(w, i), w;
    },
    render: (u, i) => {
      u && !u.children.length ? (u.innerHTML = "", u.appendChild(i)) : E(i, u, !1), o.forEach((h) => {
        h();
      }), o = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class X {
  constructor(e, t) {
    m(this, "_shadowRoot");
    m(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    m(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    m(this, "emitEvent");
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
const me = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, U = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, be = (s, e) => {
  var t, r, l, n, o, Z, p, ee, T;
  if (s = {
    ...me,
    ...s
  }, s.styles = s.styles.toString(), s.root && !O.isRootNodeSet)
    O.isRootNodeSet = !0, s.styles && (O.globalStyles.replace(s.styles), O.globalStyleTag = U(s.styles, document.head));
  else if (s.root && O.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      k(this, o);
      k(this, p);
      k(this, t, void 0);
      k(this, r, void 0);
      k(this, l, void 0);
      m(this, "renderCount", 0);
      k(this, n, new K());
      if (ae)
        M(this, r, this.attachShadow({
          mode: "open"
        })), y(this, r).adoptedStyleSheets = O.getComputedCss(s.styles, s.standalone);
      else {
        M(this, r, this);
        const b = s.styles.replaceAll(":host", s.selector);
        M(this, l, U(b, document.head));
      }
      I(this, o, Z).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = y(this, t).render();
      typeof b == "string" ? y(this, r).innerHTML = he(b) : pe(y(this, r), b);
    }
    setProps(b) {
      var S, v;
      for (const [A, E] of Object.entries(b))
        e.observedProperties.find((P) => P === A) && (y(this, t)[A] = E);
      (v = (S = y(this, t)).onPropertiesChanged) == null || v.call(S);
    }
    getInstance() {
      return y(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var b, S, v, A;
      y(this, n).add(D(this, "bindprops", (E) => {
        const P = E.detail.props;
        P && this.setProps(P);
      })), y(this, n).add(D(this, "refresh_component", () => {
        var E, P;
        (P = (E = y(this, t)).mount) == null || P.call(E);
      })), (S = (b = y(this, t)).beforeMount) == null || S.call(b), this.update(), (A = (v = y(this, t)).mount) == null || A.call(v);
    }
    attributeChangedCallback(b, S, v) {
      var A, E;
      (E = (A = y(this, t)).onAttributesChanged) == null || E.call(A, b, S, v);
    }
    disconnectedCallback() {
      var b, S, v;
      this.renderCount = 1, (S = (b = y(this, t)).unmount) == null || S.call(b), (v = y(this, l)) == null || v.remove(), y(this, n).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), l = new WeakMap(), n = new WeakMap(), o = new WeakSet(), Z = function() {
    const b = new X(this, y(this, r));
    b.update = () => {
      this.update();
    }, b.emitEvent = (S, v) => {
      I(this, p, ee).call(this, S, v);
    }, M(this, t, Q(fe(this, e), s.deps, b));
  }, p = new WeakSet(), ee = function(b, S) {
    const v = new CustomEvent(b, {
      detail: S
    });
    this.dispatchEvent(v);
  }, T));
}, ge = {
  deps: []
}, _e = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || be(s, e);
}, te = (s = {}) => (e) => {
  if (s = {
    ...ge,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = Q(e, s.deps);
  J.register(e, t);
}, ye = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", l = [...Array.from(s.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? l[0] : l;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class we {
  constructor(e, t) {
    m(this, "_initialValues");
    m(this, "_controls");
    m(this, "_errors", /* @__PURE__ */ new Map());
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
    for (const [t, r] of Object.entries(this._controls))
      e[t] = r.value;
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
      const t = this._controls[e].value, r = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const l of r) {
        const n = l(t);
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
const Ae = (s) => {
  const e = {}, t = {};
  for (const [o, f] of Object.entries(s)) {
    const p = Array.isArray(f) ? f : [f];
    e[o] = {
      value: p.shift(),
      validators: p
    }, t[o] = e[o].value;
  }
  const r = new we(t, e);
  return [r, (o) => (f) => {
    const p = ye(f.target);
    r.get(o).value = p;
  }, () => r.reset()];
};
class Te {
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
const H = class {
  static checkParams(e, t) {
    let r = 0;
    const l = {}, n = t.paramCount;
    for (let o = 0; o < e.length; o++) {
      const f = t.params[o];
      f.indexOf(":") >= 0 && (l[f.split(":")[1]] = e[o].split("?")[0], r += 1);
    }
    return r === n ? l : {};
  }
  static getParamCount(e) {
    let t = 0;
    return e.forEach((r) => {
      r.indexOf(":") >= 0 && (t += 1);
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
    if (t.params = e.path.split("/").filter((r) => r.length > 0), t.url = e.path, t.template = "", t.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      t.template = e.template, t.templatePath = e.templatePath;
    }
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = H.getParamCount(t.params), H.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of H.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = H.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let R = H;
m(R, "routeList", []), m(R, "isHistoryBasedRouting", !0);
function ve(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class W {
  constructor() {
    m(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    m(this, "_template", new ue(""));
    m(this, "_navigationEndEvent", new G());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = R.isHistoryBasedRouting ? "popstate" : "hashchange";
    return R.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var l = t.pushState;
      t.pushState = function(...n) {
        l.apply(t, n), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), D(window, e, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute;
  }
  navigateTo(e = "/", t) {
    let r = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : R.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = e.split("/").filter((o) => o.length > 0), l = R.routeList.filter((o) => {
      if (o.params.length === r.length && ve(o.url, e))
        return o;
      if (o.url === e)
        return o;
    }), n = l.length > 0 ? l[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, q(n.canActivate()).subscribe((o) => {
      if (!o)
        return;
      const f = R.checkParams(r, n);
      if (Object.keys(f).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(f));
        let p = [];
        R.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p);
        const C = (T) => {
          T.isRegistered = !0, this._template.next(T.template), this._navigationEndEvent.next();
        };
        n.isRegistered ? C(n) : n.templatePath ? q(n.templatePath()).subscribe(() => {
          C(n);
        }) : n.redirectTo && this.navigateTo(n.redirectTo, t);
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
te()(W);
const xe = () => {
  class s {
    constructor(t, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new K());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t ? this._template = t : this.refreshRouterOutletComponent();
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = R.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    refreshRouterOutletComponent() {
      if (this.renderer.shadowRoot.children.length) {
        const t = new CustomEvent("refresh_component", {
          detail: {},
          bubbles: !1,
          cancelable: !1,
          composed: !1
        });
        this.renderer.shadowRoot.children[0].dispatchEvent(t);
      }
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], B(t);
      } else
        return B``;
    }
  }
  _e({
    selector: "router-outlet",
    deps: [W, X]
  })(s);
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
  navigateTo(e, t) {
    this.internalRouter.navigateTo(e, t);
  }
  /**
   * triggers on navigation end
   * @return {Observable<void>}
   */
  onNavigationEnd() {
    return this.internalRouter.onNavigationEnd();
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
  registerRoutes(e, t = !1, r = !1) {
    if (r && (R.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const l of e)
        R.formatRoute(l);
      t ? R.preloadRoutes() : R.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
te({
  deps: [W]
})(Re);
export {
  ue as BehaviourSubjectObs,
  _e as Component,
  te as Injectable,
  X as Renderer,
  Re as Router,
  G as SubjectObs,
  K as Subscriptions,
  Te as Validators,
  D as fromEvent,
  B as html,
  Ce as promisify,
  xe as registerRouterComponent,
  pe as render,
  Ae as useFormFields,
  q as wrapIntoObservable
};
