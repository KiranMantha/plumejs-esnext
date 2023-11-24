var ee = Object.defineProperty;
var te = (s, e, t) => e in s ? ee(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var p = (s, e, t) => (te(s, typeof e != "symbol" ? e + "" : e, t), t), I = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var w = (s, e, t) => (I(s, e, "read from private field"), t ? t.call(s) : e.get(s)), N = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, k = (s, e, t, r) => (I(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var V = (s, e, t) => (I(s, e, "access private method"), t);
var O, q;
const J = new (q = class {
  constructor() {
    N(this, O, void 0);
    k(this, O, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!w(this, O).get(s))
      w(this, O).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = w(this, O).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, O, /* @__PURE__ */ new WeakMap());
  }
}, O = new WeakMap(), q)(), se = (s) => !!s && typeof s.subscribe == "function", re = (s) => !!s && typeof s.then == "function", U = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ne = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ie = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), oe = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
});
class z {
  constructor() {
    p(this, "_callbacks", []);
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
class ae extends z {
  constructor(t) {
    super();
    p(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
    return this.next(this._initialValue), r;
  }
}
class Y {
  constructor() {
    p(this, "_subcribers", []);
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
const W = (s) => se(s) ? s : re(s) ? oe(Promise.resolve(s)) : ie(s), D = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), ce = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (g) => {
    const b = g.querySelectorAll("script");
    for (const E of b)
      E.remove();
  }, r = (g, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(g) && (b.includes("javascript:") || b.includes("data:")) || g.startsWith("on"))
      return !0;
  }, l = (g) => {
    const b = g.attributes;
    for (const {
      name: E,
      value: x
    } of b)
      r(E, x) && g.removeAttribute(E);
  }, i = (g) => {
    const b = g.children;
    for (const E of b)
      l(E), i(E);
  }, u = e();
  return t(u), i(u), u.innerHTML;
}, le = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, ue = (s, e) => {
  const t = U(e), r = () => ({
    get(l, i) {
      const u = Object.prototype.toString.call(l[i]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in l[i]) ? new Proxy(l[i], r()) : l[i];
    },
    set(l, i, u) {
      return l[i] = u, ++s.renderCount, le(s), !0;
    }
  });
  return class extends e {
    constructor(...l) {
      return super(...l), l.forEach((i, u) => {
        t[u] && t[u] !== "undefined" && (this[t[u]] = i);
      }), new Proxy(this, r());
    }
  };
}, Se = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, G = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const u of e)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(J.getService(u)) : r.push(t);
    const l = U(s), i = new s(...r);
    return e.forEach((u, g) => {
      i[l[g]] = r[g];
    }), i;
  } else
    return new s();
}, L = new class {
  constructor() {
    p(this, "globalStyles");
    p(this, "globalStyleTag");
    p(this, "style_registry");
    p(this, "isRootNodeSet");
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
  render: he
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, l = "insertNode", i = /^insertNode([^ ]+)/;
  let u = [], g = [];
  const b = (a) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(a);
    const c = (d) => n[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, c))(h), JSON.parse(h);
  }, E = (a, n) => {
    const h = a.options, c = Array.isArray(n) ? n : [n];
    let y, d, o = h.length;
    for (; o--; ) {
      d = h[o];
      const f = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = c.indexOf(f) > -1) && (y = !0);
    }
    y || (a.selectedIndex = -1);
  }, x = (a) => {
    const n = document.createElement("template");
    return n.innerHTML = a, n.content;
  }, j = (a, n, h) => {
    const c = () => {
      setTimeout(() => {
        if (a.isConnected) {
          const y = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          a.dispatchEvent(y);
        }
      });
    };
    a[h] = JSON.stringify(n), g.push(c);
  }, _ = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, null);
    let c = h.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const y = Array.from(c.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: o
        } of y) {
          const f = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(o): {
              const m = o.slice(2).toLowerCase();
              c.removeEventListener(m, n[f]), c.addEventListener(m, n[f]);
              break;
            }
            case /ref/.test(o): {
              const m = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: c,
                fn: n[f]
              });
              u.push(m);
              break;
            }
            case /^data-+/.test(o):
            case /^aria-+/.test(o): {
              o === "data-input" ? j(c, n[f], Symbol("input")) : c.setAttribute(o, b(n[f]));
              break;
            }
            case /class/.test(o): {
              n[f] ? c.classList.add(...n[f].split(" ")) : c.setAttribute("class", "");
              break;
            }
            case /value/.test(o): {
              c.nodeName.toLowerCase() === "select" ? E(c, n[f]) : c.value = b(n[f]);
              break;
            }
            case /disabled/.test(o):
            case /checked/.test(o): {
              n[f] ? c.setAttribute(o, n[f]) : c.removeAttribute(o);
              break;
            }
            default:
              c.setAttribute(o, b(n[f]));
          }
          c.removeAttribute(d);
        }
      }
      c = h.nextNode();
    }
  }, S = (a, n) => {
    const h = document.createTreeWalker(a, NodeFilter.SHOW_COMMENT, null);
    let c = h.nextNode(), y;
    for (; c; ) {
      if (y = i.exec(c.data)) {
        const d = Array.isArray(n[y[1]]) ? n[y[1]] : [n[y[1]]];
        c.replaceWith(...d), h.currentNode = a;
      }
      c = h.nextNode();
    }
  }, R = (a, n) => {
    if (!a || !n || a.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = a.attributes, c = n.attributes, y = n.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: o,
      value: f
    } of h)
      (!c[o] || c[o] !== f) && n.setAttribute(o, f);
    if (!d)
      for (const {
        name: o
      } of c)
        h[o] || n.removeAttribute(o);
    if (n.tagName.toLowerCase() === "input" && (n.value = a.value), n.tagName.indexOf("-") > -1 && a.tagName.indexOf("-") > -1) {
      const o = Object.getOwnPropertySymbols(a), f = Object.getOwnPropertySymbols(n), m = o.length ? a[o[0]] : "", P = f.length ? n[f[0]] : "";
      m && P && m !== P && j(n, JSON.parse(m), f[0]);
    }
  }, T = (a) => a.nodeType === 3 ? "text" : a.nodeType === 8 ? "comment" : a.tagName.toLowerCase(), C = (a) => a.childNodes && a.childNodes.length > 0 ? null : a.textContent, A = (a, n, h) => {
    const c = n ? Array.from(n.childNodes) : [], y = a ? Array.from(a.childNodes) : [];
    let d = c.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        c[c.length - d].parentNode.removeChild(c[c.length - d]);
    y.forEach(function(o, f) {
      const m = c[f];
      if (R(o, m), h && m && m.nodeType === 1 && m.tagName.indexOf("-") > -1)
        return;
      if (!m) {
        n && n.appendChild(o);
        return;
      }
      if (T(o) !== T(m)) {
        m.replaceWith(o);
        return;
      }
      const P = C(o);
      if (P && P !== C(m)) {
        m.textContent = P;
        return;
      }
      if (m.childNodes.length > 0 && o.childNodes.length < 1) {
        m.innerHTML = "";
        return;
      }
      if (m.childNodes.length < 1 && o.childNodes.length > 0) {
        const H = document.createDocumentFragment();
        A(o, H, !1), m.appendChild(H);
        return;
      }
      if (o.childNodes.length > 0) {
        A(o, m, !0);
        return;
      }
    });
  };
  return {
    html: (a, ...n) => {
      let h = "";
      const {
        length: c
      } = a;
      for (let d = 1; d < c; d++) {
        const o = n[d - 1];
        let f = !1;
        if (h += a[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (m, P, H) => `${t}${d - 1}=${H || '"'}${P}${H ? "" : '"'}`), f = !0), !f)
          switch (!0) {
            case Array.isArray(o):
            case o instanceof DocumentFragment: {
              h += `<!--${l}${d - 1}-->`;
              break;
            }
            case (typeof o == "object" && o !== null): {
              "html" in o && (h += o.html);
              break;
            }
            default:
              h += o || "";
          }
      }
      h += a[c - 1];
      const y = x(h.trim());
      return _(y, n), S(y, n), y;
    },
    render: (a, n) => {
      a && !a.children.length ? (a.innerHTML = "", a.appendChild(n)) : A(n, a, !1), u.forEach((h) => {
        h();
      }), u = [], g.forEach((h) => {
        h();
      }), g = [];
    }
  };
})();
class K {
  constructor(e, t) {
    p(this, "_shadowRoot");
    p(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    p(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    p(this, "emitEvent");
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
const de = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, $ = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, fe = (s, e) => {
  var t, r, l, i, u, Q, b, X, x;
  if (s = {
    ...de,
    ...s
  }, s.styles = s.styles.toString(), s.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, s.styles && (L.globalStyles.replace(s.styles), L.globalStyleTag = $(s.styles, document.head));
  else if (s.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (x = class extends HTMLElement {
    constructor() {
      super();
      N(this, u);
      N(this, b);
      N(this, t, void 0);
      N(this, r, void 0);
      N(this, l, void 0);
      p(this, "renderCount", 0);
      N(this, i, new Y());
      if (ne)
        k(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = L.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const _ = s.styles.replaceAll(":host", s.selector);
        k(this, l, $(_, document.head));
      }
      V(this, u, Q).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const _ = w(this, t).render();
      typeof _ == "string" ? w(this, r).innerHTML = ce(_) : he(w(this, r), _);
    }
    setProps(_) {
      var S, R;
      for (const [T, C] of Object.entries(_))
        e.observedProperties.find((A) => A === T) && (w(this, t)[T] = C);
      (R = (S = w(this, t)).onPropertiesChanged) == null || R.call(S);
    }
    getInstance() {
      return w(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var _, S, R, T;
      w(this, i).add(D(this, "bindprops", (C) => {
        const A = C.detail.props;
        A && this.setProps(A);
      })), w(this, i).add(D(this, "refresh_component", () => {
        var C, A;
        (A = (C = w(this, t)).mount) == null || A.call(C);
      })), (S = (_ = w(this, t)).beforeMount) == null || S.call(_), this.update(), (T = (R = w(this, t)).mount) == null || T.call(R);
    }
    attributeChangedCallback(_, S, R) {
      var T, C;
      (C = (T = w(this, t)).onAttributesChanged) == null || C.call(T, _, S, R);
    }
    disconnectedCallback() {
      var _, S, R;
      this.renderCount = 1, (S = (_ = w(this, t)).unmount) == null || S.call(_), (R = w(this, l)) == null || R.remove(), w(this, i).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), l = new WeakMap(), i = new WeakMap(), u = new WeakSet(), Q = function() {
    const _ = new K(this, w(this, r));
    _.update = () => {
      this.update();
    }, _.emitEvent = (S, R) => {
      V(this, b, X).call(this, S, R);
    }, k(this, t, G(ue(this, e), s.deps, _));
  }, b = new WeakSet(), X = function(_, S) {
    const R = new CustomEvent(_, {
      detail: S
    });
    this.dispatchEvent(R);
  }, x));
}, pe = {
  deps: []
}, be = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || fe(s, e);
}, Z = (s = {}) => (e) => {
  if (s = {
    ...pe,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = G(e, s.deps);
  J.register(e, t);
}, me = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", l = [...Array.from(s.options)].filter((i) => i.selected).map((i) => i.value ?? (i.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
class Re {
  constructor(e) {
    p(this, "_initialValues");
    p(this, "_controls", /* @__PURE__ */ Object.create(null));
    p(this, "_errors", /* @__PURE__ */ new Map());
    p(this, "_isTouched", !1);
    this._initialValues = e;
    for (const [t, r] of Object.entries(e)) {
      const l = [...Array.isArray(r) ? r : [r]];
      this._controls[t] = {
        value: l[0],
        validators: l.length > 1 ? l[1] : []
      };
    }
  }
  get errors() {
    return this._checkValidity(), this._errors;
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
  getControl(e) {
    return this._controls[e];
  }
  changeHandler(e) {
    return (t) => {
      const r = me(t.target);
      this.getControl(e).value = r, this._isTouched = !0;
    };
  }
  reset() {
    for (const [e, t] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(t) ? t : [t]];
      this._controls[e].value = JSON.parse(JSON.stringify(r))[0];
    }
    this._errors.clear(), this._isTouched = !1;
  }
  _checkValidity() {
    this._errors.clear(), this._isTouched = !0;
    for (const e in this._controls) {
      const t = this._controls[e].value, r = this._controls[e].validators;
      this._controls[e].errors = null;
      for (const l of r) {
        const i = l(t);
        i !== null && (this._errors.has(e) ? (this._errors.set(e, {
          ...this._errors.get(e),
          ...i
        }), this._controls[e].errors = {
          ...this._controls[e].errors,
          ...i
        }) : (this._errors.set(e, i), this._controls[e].errors = i));
      }
    }
  }
}
class Ee {
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
const M = class {
  static checkParams(e, t) {
    let r = 0;
    const l = {}, i = t.paramCount;
    for (let u = 0; u < e.length; u++) {
      const g = t.params[u];
      g.indexOf(":") >= 0 && (l[g.split(":")[1]] = e[u].split("?")[0], r += 1);
    }
    return r === i ? l : {};
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
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = M.getParamCount(t.params), M.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of M.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = M.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let v = M;
p(v, "routeList", []), p(v, "isHistoryBasedRouting", !0);
function ge(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class F {
  constructor() {
    p(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    p(this, "_template", new ae(""));
    p(this, "_navigationEndEvent", new z());
    p(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = v.isHistoryBasedRouting ? "popstate" : "hashchange";
    return v.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var l = t.pushState;
      t.pushState = function(...i) {
        l.apply(t, i), r();
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
    let r = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : v.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = e.split("/").filter((u) => u.length > 0), l = v.routeList.filter((u) => {
      if (u.params.length === r.length && ge(u.url, e))
        return u;
      if (u.url === e)
        return u;
    }), i = l.length > 0 ? l[0] : null;
    i && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, W(i.canActivate()).subscribe((u) => {
      if (!u)
        return;
      const g = v.checkParams(r, i);
      if (Object.keys(g).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(g));
        let b = [];
        v.isHistoryBasedRouting ? b = new URLSearchParams(window.location.search).entries() : b = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(b);
        const E = (x) => {
          x.isRegistered = !0, this._template.next(x.template), this._navigationEndEvent.next();
        };
        i.isRegistered ? E(i) : i.templatePath ? W(i.templatePath()).subscribe(() => {
          E(i);
        }) : i.redirectTo && this.navigateTo(i.redirectTo, t);
      } else
        this.navigateTo(i.redirectTo, t);
    }));
  }
}
Z()(F);
const Ce = () => {
  class s {
    constructor(t, r) {
      p(this, "_template", "");
      p(this, "_subscriptions", new Y());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t ? this._template = t : this.refreshRouterOutletComponent();
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
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
  be({
    selector: "router-outlet",
    deps: [F, K]
  })(s);
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
    if (r && (v.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const l of e)
        v.formatRoute(l);
      t ? v.preloadRoutes() : v.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [F]
})(_e);
export {
  ae as BehaviourSubjectObs,
  be as Component,
  Re as FormBuilder,
  Z as Injectable,
  K as Renderer,
  _e as Router,
  z as SubjectObs,
  Y as Subscriptions,
  Ee as Validators,
  D as fromEvent,
  B as html,
  Se as promisify,
  Ce as registerRouterComponent,
  he as render,
  W as wrapIntoObservable
};
