var et = Object.defineProperty;
var st = (s, t, e) => t in s ? et(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var g = (s, t, e) => (st(s, typeof t != "symbol" ? t + "" : t, e), e), V = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var w = (s, t, e) => (V(s, t, "read from private field"), e ? e.call(s) : t.get(s)), N = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, O = (s, t, e, r) => (V(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var I = (s, t, e) => (V(s, t, "access private method"), e);
var k, J;
const U = new (J = class {
  constructor() {
    N(this, k, void 0);
    O(this, k, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, t) {
    if (!w(this, k).get(s))
      w(this, k).set(s, t);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const t = w(this, k).get(s);
    if (t)
      return t;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    O(this, k, /* @__PURE__ */ new WeakMap());
  }
}, k = new WeakMap(), J)(), rt = (s) => !!s && typeof s.subscribe == "function", nt = (s) => !!s && typeof s.then == "function", z = (s) => {
  const t = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((e) => e.trim()) : [];
}, it = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ot = (s) => ({
  subscribe: (t) => {
    t(s);
  }
}), at = (s) => ({
  subscribe: (t) => {
    Promise.resolve(s).then((e) => {
      t(e);
    });
  }
});
let ct = () => Math.random().toString(36).substring(2);
class Y {
  constructor() {
    g(this, "_callbackCollection", {});
  }
  asObservable() {
    return {
      subscribe: (t) => this.subscribe(t)
    };
  }
  subscribe(t) {
    const e = ct();
    return this._callbackCollection[e] = t, () => this.unsubscribe(e);
  }
  unsubscribe(t) {
    delete this._callbackCollection[t];
  }
  next(t) {
    for (const e in this._callbackCollection)
      this._callbackCollection[e](t);
  }
}
class W extends Y {
  constructor(e) {
    super();
    g(this, "_initialValue");
    this._initialValue = e;
  }
  subscribe(e) {
    const r = super.subscribe(e);
    return super.next(this._initialValue), r;
  }
  next(e) {
    this._initialValue = e, super.next(e);
  }
}
class G {
  constructor() {
    g(this, "_subcribers", []);
  }
  /**
   * add subscribers to subscriptions
   * @param {Function} fn
   * @returns {void}
   */
  add(t) {
    this._subcribers.push(t);
  }
  /**
   * remove all added subcriptions
   * @returns {void}
   */
  unsubscribe() {
    for (const t of this._subcribers)
      t();
    this._subcribers = [];
  }
}
const B = (s) => rt(s) ? s : nt(s) ? at(Promise.resolve(s)) : ot(s), D = (s, t, e, r = !1) => (s.addEventListener(t, e, r), () => {
  s.removeEventListener(t, e, r);
}), lt = (s) => {
  const t = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), e = (f) => {
    const m = f.querySelectorAll("script");
    for (const R of m)
      R.remove();
  }, r = (f, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (m.includes("javascript:") || m.includes("data:")) || f.startsWith("on"))
      return !0;
  }, c = (f) => {
    const m = f.attributes;
    for (const {
      name: R,
      value: x
    } of m)
      r(R, x) && f.removeAttribute(R);
  }, l = (f) => {
    const m = f.children;
    for (const R of m)
      c(R), l(R);
  }, u = t();
  return e(u), l(u), u.innerHTML;
}, ut = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, ht = (s, t) => {
  const e = z(t), r = () => ({
    get(c, l) {
      const u = Object.prototype.toString.call(c[l]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in c[l]) ? new Proxy(c[l], r()) : c[l];
    },
    set(c, l, u) {
      return c[l] = u, ++s.renderCount, ut(s), !0;
    }
  });
  return class extends t {
    constructor(...c) {
      return super(...c), c.forEach((l, u) => {
        e[u] && e[u] !== "undefined" && (this[e[u]] = l);
      }), new Proxy(this, r());
    }
  };
}, Ct = () => {
  let s;
  return [new Promise((e) => {
    s = e;
  }), s];
}, K = (s, t, e) => {
  if (t.length > 0) {
    const r = [];
    for (const u of t)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(U.getService(u)) : r.push(e);
    const c = z(s), l = new s(...r);
    return t.forEach((u, f) => {
      l[c[f]] = r[f];
    }), l;
  } else
    return new s();
}, M = new class {
  constructor() {
    g(this, "globalStyles");
    g(this, "globalStyleTag");
    g(this, "style_registry");
    g(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(s = "") {
    let t = [];
    const e = new CSSStyleSheet();
    if (e.insertRule(":host { display: block; }"), t = [this.globalStyles, e], s) {
      const r = new CSSStyleSheet();
      r.replace(s), t.push(r);
    }
    return t;
  }
}(), {
  html: $,
  render: dt
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, e = "attr", r = /^attr([^ ]+)/, c = "insertNode", l = /^insertNode([^ ]+)/;
  let u = [], f = [];
  const m = (o) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(o);
    const a = (d) => n[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, a))(h), JSON.parse(h);
  }, R = (o, n) => {
    const h = o.options, a = Array.isArray(n) ? n : [n];
    let y, d, i = h.length;
    for (; i--; ) {
      d = h[i];
      const p = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = a.indexOf(p) > -1) && (y = !0);
    }
    y || (o.selectedIndex = -1);
  }, x = (o) => {
    const n = document.createElement("template");
    return n.innerHTML = o, n.content;
  }, L = (o, n, h) => {
    const a = () => {
      setTimeout(() => {
        if (o.isConnected) {
          const y = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          o.dispatchEvent(y);
        }
      });
    };
    o[h] = JSON.stringify(n), f.push(a);
  }, _ = (o, n) => {
    const h = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, null);
    let a = h.nextNode();
    for (; a; ) {
      if (a.hasAttributes()) {
        const y = Array.from(a.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of y) {
          const p = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const b = i.slice(2).toLowerCase();
              a.removeEventListener(b, n[p]), a.addEventListener(b, n[p]);
              break;
            }
            case /ref/.test(i): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: a,
                fn: n[p]
              });
              u.push(b);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? L(a, n[p], Symbol("input")) : a.setAttribute(i, m(n[p]));
              break;
            }
            case /class/.test(i): {
              n[p] ? a.classList.add(...n[p].split(" ")) : a.setAttribute("class", "");
              break;
            }
            case /value/.test(i): {
              a.nodeName.toLowerCase() === "select" ? R(a, n[p]) : a.value = m(n[p]);
              break;
            }
            case /disabled/.test(i):
            case /checked/.test(i): {
              n[p] ? a.setAttribute(i, n[p]) : a.removeAttribute(i);
              break;
            }
            default:
              a.setAttribute(i, m(n[p]));
          }
          a.removeAttribute(d);
        }
      }
      a = h.nextNode();
    }
  }, S = (o, n) => {
    const h = document.createTreeWalker(o, NodeFilter.SHOW_COMMENT, null);
    let a = h.nextNode(), y;
    for (; a; ) {
      if (y = l.exec(a.data)) {
        const d = Array.isArray(n[y[1]]) ? n[y[1]] : [n[y[1]]];
        a.replaceWith(...d), h.currentNode = o;
      }
      a = h.nextNode();
    }
  }, C = (o, n) => {
    if (!o || !n || o.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = o.attributes, a = n.attributes, y = n.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: i,
      value: p
    } of h)
      (!a[i] || a[i] !== p) && n.setAttribute(i, p);
    if (!d)
      for (const {
        name: i
      } of a)
        h[i] || n.removeAttribute(i);
    if (n.tagName.toLowerCase() === "input" && (n.value = o.value), n.tagName.indexOf("-") > -1 && o.tagName.indexOf("-") > -1) {
      const i = Object.getOwnPropertySymbols(o), p = Object.getOwnPropertySymbols(n), b = i.length ? o[i[0]] : "", P = p.length ? n[p[0]] : "";
      b && P && b !== P && L(n, JSON.parse(b), p[0]);
    }
  }, T = (o) => o.nodeType === 3 ? "text" : o.nodeType === 8 ? "comment" : o.tagName.toLowerCase(), E = (o) => o.childNodes && o.childNodes.length > 0 ? null : o.textContent, A = (o, n, h) => {
    const a = n ? Array.from(n.childNodes) : [], y = o ? Array.from(o.childNodes) : [];
    let d = a.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        a[a.length - d].parentNode.removeChild(a[a.length - d]);
    y.forEach(function(i, p) {
      const b = a[p];
      if (C(i, b), h && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        n && n.appendChild(i);
        return;
      }
      if (T(i) !== T(b)) {
        b.replaceWith(i);
        return;
      }
      const P = E(i);
      if (P && P !== E(b)) {
        b.textContent = P;
        return;
      }
      if (b.childNodes.length > 0 && i.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && i.childNodes.length > 0) {
        const j = document.createDocumentFragment();
        A(i, j, !1), b.appendChild(j);
        return;
      }
      if (i.childNodes.length > 0) {
        A(i, b, !0);
        return;
      }
    });
  };
  return {
    html: (o, ...n) => {
      let h = "";
      const {
        length: a
      } = o;
      for (let d = 1; d < a; d++) {
        const i = n[d - 1];
        let p = !1;
        if (h += o[d - 1], s.test(h) && t.test(h) && (h = h.replace(s, (b, P, j) => `${e}${d - 1}=${j || '"'}${P}${j ? "" : '"'}`), p = !0), !p)
          switch (!0) {
            case Array.isArray(i):
            case i instanceof DocumentFragment: {
              h += `<!--${c}${d - 1}-->`;
              break;
            }
            case (typeof i == "object" && i !== null): {
              "html" in i && (h += i.html);
              break;
            }
            default:
              h += i || "";
          }
      }
      h += o[a - 1];
      const y = x(h.trim());
      return _(y, n), S(y, n), y;
    },
    render: (o, n) => {
      o && !o.children.length ? (o.innerHTML = "", o.appendChild(n)) : A(n, o, !1), u.forEach((h) => {
        h();
      }), u = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class Q {
  constructor(t, e) {
    g(this, "_shadowRoot");
    g(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    g(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    g(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = e;
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
const ft = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, q = (s, t) => {
  const e = document.createElement("style");
  return e.innerHTML = s, t && t.appendChild(e), e;
}, pt = (s, t) => {
  var e, r, c, l, u, X, m, Z, x;
  if (s = {
    ...ft,
    ...s
  }, s.styles = s.styles.toString(), s.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, s.styles && (M.globalStyles.replace(s.styles), M.globalStyleTag = q(s.styles, document.head));
  else if (s.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (x = class extends HTMLElement {
    constructor() {
      super();
      N(this, u);
      N(this, m);
      N(this, e, void 0);
      N(this, r, void 0);
      N(this, c, void 0);
      g(this, "renderCount", 0);
      N(this, l, new G());
      if (it)
        O(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = M.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const _ = s.styles.replaceAll(":host", s.selector);
        O(this, c, q(_, document.head));
      }
      I(this, u, X).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const _ = w(this, e).render();
      typeof _ == "string" ? w(this, r).innerHTML = lt(_) : dt(w(this, r), _);
    }
    setProps(_) {
      var S, C;
      for (const [T, E] of Object.entries(_))
        t.observedProperties.find((A) => A === T) && (w(this, e)[T] = E);
      (C = (S = w(this, e)).onPropertiesChanged) == null || C.call(S);
    }
    getInstance() {
      return w(this, e);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var _, S, C, T;
      w(this, l).add(D(this, "bindprops", (E) => {
        const A = E.detail.props;
        A && this.setProps(A);
      })), w(this, l).add(D(this, "refresh_component", () => {
        var E, A;
        (A = (E = w(this, e)).mount) == null || A.call(E);
      })), (S = (_ = w(this, e)).beforeMount) == null || S.call(_), this.update(), (T = (C = w(this, e)).mount) == null || T.call(C);
    }
    attributeChangedCallback(_, S, C) {
      var T, E;
      (E = (T = w(this, e)).onAttributesChanged) == null || E.call(T, _, S, C);
    }
    disconnectedCallback() {
      var _, S, C;
      this.renderCount = 1, (S = (_ = w(this, e)).unmount) == null || S.call(_), (C = w(this, c)) == null || C.remove(), w(this, l).unsubscribe();
    }
  }, e = new WeakMap(), r = new WeakMap(), c = new WeakMap(), l = new WeakMap(), u = new WeakSet(), X = function() {
    const _ = new Q(this, w(this, r));
    _.update = () => {
      this.update();
    }, _.emitEvent = (S, C) => {
      I(this, m, Z).call(this, S, C);
    }, O(this, e, K(ht(this, t), s.deps, _));
  }, m = new WeakSet(), Z = function(_, S) {
    const C = new CustomEvent(_, {
      detail: S
    });
    this.dispatchEvent(C);
  }, x));
}, bt = {
  deps: []
}, gt = (s) => (t) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || pt(s, t);
}, tt = (s = {}) => (t) => {
  if (s = {
    ...bt,
    ...s
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const e = K(t, s.deps);
  U.register(t, e);
}, mt = (s) => {
  let t;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? t = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : t = s.value;
      break;
    }
    case "select": {
      const e = s.type === "select-one", c = [...Array.from(s.options)].filter((l) => l.selected).map((l) => l.value ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      t = e ? c[0] : c;
      break;
    }
    default: {
      t = s.value;
      break;
    }
  }
  return t;
};
class Rt {
  constructor(t) {
    /**
     * @private
     */
    g(this, "_initialValues");
    /**
     * @private
     */
    g(this, "_controls", /* @__PURE__ */ Object.create(null));
    /**
     * @private
     */
    g(this, "_errors", /* @__PURE__ */ new Map());
    this._initialValues = t;
    for (const [e, r] of Object.entries(t)) {
      const c = [...Array.isArray(r) ? r : [r]];
      this._controls[e] = {
        value: c[0],
        validators: c.length > 1 ? c[1] : []
      };
    }
    this.changeHandler = this.changeHandler.bind(this), this.getControl = this.getControl.bind(this), this.reset = this.reset.bind(this);
  }
  /**
   * @type Map
   */
  get errors() {
    return this._checkValidity(), this._errors;
  }
  /**
   * @type boolean
   */
  get valid() {
    return this._checkValidity(), !this._errors.size;
  }
  /**
   * @type Object
   */
  get value() {
    const t = {};
    for (const [e, r] of Object.entries(this._controls))
      t[e] = r.value;
    return t;
  }
  getControl(t) {
    return this._controls[t];
  }
  changeHandler(t) {
    return (e) => {
      const r = mt(e.target);
      this.getControl(t).value = r, this._isTouched = !0;
    };
  }
  reset() {
    for (const [t, e] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(e) ? e : [e]];
      this._controls[t].value = JSON.parse(JSON.stringify(r))[0];
    }
    this._errors.clear(), this._isTouched = !1;
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear(), this._isTouched = !0;
    for (const t in this._controls) {
      const e = this._controls[t].value, r = this._controls[t].validators;
      this._controls[t].errors = null;
      for (const c of r) {
        const l = c(e);
        l !== null && (this._errors.has(t) ? (this._errors.set(t, {
          ...this._errors.get(t),
          ...l
        }), this._controls[t].errors = {
          ...this._controls[t].errors,
          ...l
        }) : (this._errors.set(t, l), this._controls[t].errors = l));
      }
    }
  }
}
class Et {
  static required(t) {
    return t.length ? null : {
      required: !0
    };
  }
  static min(t) {
    return (e) => e.length >= t ? null : {
      minLength: {
        requiredLength: t
      }
    };
  }
  static max(t) {
    return (e) => e.length <= t ? null : {
      maxLength: {
        requiredLength: t
      }
    };
  }
  static pattern(t) {
    return (e) => new RegExp(t).test(e) ? null : {
      pattern: !0
    };
  }
}
const H = class {
  static checkParams(t, e) {
    let r = 0;
    const c = {}, l = e.paramCount;
    for (let u = 0; u < t.length; u++) {
      const f = e.params[u];
      f.indexOf(":") >= 0 && (c[f.split(":")[1]] = t[u].split("?")[0], r += 1);
    }
    return r === l ? c : {};
  }
  static getParamCount(t) {
    let e = 0;
    return t.forEach((r) => {
      r.indexOf(":") >= 0 && (e += 1);
    }), e;
  }
  static formatRoute(t) {
    const e = {
      params: {},
      url: "",
      template: "",
      paramCount: 0,
      isRegistered: !1,
      redirectTo: "",
      preload: t.preload,
      canActivate: () => !0
    };
    if (e.params = t.path.split("/").filter((r) => r.length > 0), e.url = t.path, e.template = "", e.redirectTo = t.redirectTo, t.template) {
      if (!t.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      e.template = t.template, e.templatePath = t.templatePath;
    }
    t.canActivate && (e.canActivate = t.canActivate), e.paramCount = H.getParamCount(e.params), H.routeList.push(e);
  }
  static preloadRoutes() {
    for (const t of H.routeList)
      t.templatePath && t.templatePath();
  }
  static preloadSelectedRoutes() {
    const t = H.routeList.filter((e) => e.preload === !0);
    for (const e of t)
      e.templatePath && e.templatePath();
  }
};
let v = H;
g(v, "routeList", []), g(v, "isHistoryBasedRouting", !0);
function _t(s, t) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(t) : !1;
}
class F {
  constructor() {
    g(this, "_currentRoute", new W({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    g(this, "_template", new W(""));
    g(this, "_navigationEndEvent", new Y());
    g(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const t = v.isHistoryBasedRouting ? "popstate" : "hashchange";
    return v.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(e, r) {
      var c = e.pushState;
      e.pushState = function(...l) {
        c.apply(e, l), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), D(window, t, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute.asObservable();
  }
  navigateTo(t = "/", e) {
    let r = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(t, e), r === t ? this._navigateTo(t, e) : v.isHistoryBasedRouting ? window.history.pushState(e, "", t) : window.location.hash = "#" + t;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const t = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), e = this._routeStateMap.get(t);
    this._navigateTo(t, e);
  }
  _navigateTo(t, e) {
    const r = {}, c = t.split("/").filter((f) => f.length > 0), l = v.routeList.filter((f) => {
      if (f.params.length === c.length && _t(f.url, t))
        return f;
      if (f.url === t)
        return f;
    }), u = l.length > 0 ? l[0] : null;
    u && (r.path = t, r.state = {
      ...e || {}
    }, B(u.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const m = v.checkParams(c, u);
      if (Object.keys(m).length > 0 || t) {
        r.routeParams = new Map(Object.entries(m));
        let R = [];
        v.isHistoryBasedRouting ? R = new URLSearchParams(window.location.search).entries() : R = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(R);
        const x = (L) => {
          L.isRegistered = !0, this._currentRoute.next(r), this._template.next(L.template), this._navigationEndEvent.next();
        };
        u.isRegistered ? x(u) : u.templatePath ? B(u.templatePath()).subscribe(() => {
          x(u);
        }) : u.redirectTo && this.navigateTo(u.redirectTo, e);
      } else
        this.navigateTo(u.redirectTo, e);
    }));
  }
}
tt()(F);
const Tt = () => {
  class s {
    constructor(e, r) {
      g(this, "_template", "");
      g(this, "_subscriptions", new G());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((e) => {
        this._template !== e && (this._template = e);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const e = v.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(e || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    render() {
      if (this._template) {
        const e = [`${this._template}`];
        return e.raw = [`${this._template}`], $(e);
      } else
        return $``;
    }
  }
  gt({
    selector: "router-outlet",
    deps: [F, Q]
  })(s);
};
class yt {
  constructor(t) {
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
  navigateTo(t, e) {
    this.internalRouter.navigateTo(t, e);
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
  registerRoutes(t, e = !1, r = !1) {
    if (r && (v.isHistoryBasedRouting = !r), Array.isArray(t)) {
      for (const c of t)
        v.formatRoute(c);
      e ? v.preloadRoutes() : v.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
tt({
  deps: [F]
})(yt);
export {
  W as BehaviourSubjectObs,
  gt as Component,
  Rt as FormBuilder,
  tt as Injectable,
  Q as Renderer,
  yt as Router,
  Y as SubjectObs,
  G as Subscriptions,
  Et as Validators,
  D as fromEvent,
  $ as html,
  Ct as promisify,
  Tt as registerRouterComponent,
  dt as render,
  B as wrapIntoObservable
};
