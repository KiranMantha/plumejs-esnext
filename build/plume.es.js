var ee = Object.defineProperty;
var te = (s, e, t) => e in s ? ee(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var g = (s, e, t) => (te(s, typeof e != "symbol" ? e + "" : e, t), t), V = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var w = (s, e, t) => (V(s, e, "read from private field"), t ? t.call(s) : e.get(s)), N = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, O = (s, e, t, r) => (V(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var j = (s, e, t) => (V(s, e, "access private method"), t);
var k, B;
const U = new (B = class {
  constructor() {
    N(this, k, void 0);
    O(this, k, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!w(this, k).get(s))
      w(this, k).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = w(this, k).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    O(this, k, /* @__PURE__ */ new WeakMap());
  }
}, k = new WeakMap(), B)(), se = (s) => !!s && typeof s.subscribe == "function", re = (s) => !!s && typeof s.then == "function", z = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ne = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), oe = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), ie = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
});
class J {
  constructor() {
    g(this, "_callbacks", []);
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
class ae extends J {
  constructor(t) {
    super();
    g(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
    return this.next(this._initialValue), r;
  }
}
class Y {
  constructor() {
    g(this, "_subcribers", []);
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
const W = (s) => se(s) ? s : re(s) ? ie(Promise.resolve(s)) : oe(s), I = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), ce = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const p = f.querySelectorAll("script");
    for (const E of p)
      E.remove();
  }, r = (f, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (p.includes("javascript:") || p.includes("data:")) || f.startsWith("on"))
      return !0;
  }, u = (f) => {
    const p = f.attributes;
    for (const {
      name: E,
      value: x
    } of p)
      r(E, x) && f.removeAttribute(E);
  }, n = (f) => {
    const p = f.children;
    for (const E of p)
      u(E), n(E);
  }, a = e();
  return t(a), n(a), a.innerHTML;
}, le = function(s) {
  s.renderCount === 1 && queueMicrotask(() => {
    s.update(), s.renderCount = 0;
  });
}, ue = (s, e) => {
  const t = z(e), r = () => ({
    get(u, n) {
      const a = Object.prototype.toString.call(u[n]);
      return ["[object Object]", "[object Array]"].indexOf(a) > -1 && !("__metadata__" in u[n]) ? new Proxy(u[n], r()) : u[n];
    },
    set(u, n, a) {
      return u[n] = a, ++s.renderCount, le(s), !0;
    }
  });
  return class extends e {
    constructor(...u) {
      return super(...u), u.forEach((n, a) => {
        t[a] && t[a] !== "undefined" && (this[t[a]] = n);
      }), new Proxy(this, r());
    }
  };
}, Re = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, G = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const a of e)
      a.prototype.__metadata__.name !== "RENDERER" ? r.push(U.getService(a)) : r.push(t);
    const u = z(s), n = new s(...r);
    return e.forEach((a, f) => {
      n[u[f]] = r[f];
    }), n;
  } else
    return new s();
}, L = new class {
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
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], s) {
      const r = new CSSStyleSheet();
      r.replace(s), e.push(r);
    }
    return e;
  }
}(), {
  html: $,
  render: he
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, u = "insertNode", n = /^insertNode([^ ]+)/;
  let a = [], f = [];
  const p = (c) => {
    const o = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(c);
    const l = (d) => o[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, l))(h), JSON.parse(h);
  }, E = (c, o) => {
    const h = c.options, l = Array.isArray(o) ? o : [o];
    let y, d, i = h.length;
    for (; i--; ) {
      d = h[i];
      const m = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = l.indexOf(m) > -1) && (y = !0);
    }
    y || (c.selectedIndex = -1);
  }, x = (c) => {
    const o = document.createElement("template");
    return o.innerHTML = c, o.content;
  }, F = (c, o, h) => {
    const l = () => {
      if (c.isConnected) {
        const y = new CustomEvent("bindprops", {
          detail: {
            props: o
          },
          bubbles: !1
        });
        c.dispatchEvent(y);
      }
    };
    c[h] = JSON.stringify(o), f.push(l);
  }, _ = (c, o) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let l = h.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const y = Array.from(l.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of y) {
          const m = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const b = i.slice(2).toLowerCase();
              l.removeEventListener(b, o[m]), l.addEventListener(b, o[m]);
              break;
            }
            case /ref/.test(i): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: l,
                fn: o[m]
              });
              a.push(b);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? F(l, o[m], Symbol("input")) : l.setAttribute(i, p(o[m]));
              break;
            }
            case /class/.test(i): {
              o[m] ? l.classList.add(...o[m].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(i): {
              l.nodeName.toLowerCase() === "select" ? E(l, o[m]) : l.value = p(o[m]);
              break;
            }
            case /disabled/.test(i):
            case /checked/.test(i): {
              o[m] ? l.setAttribute(i, o[m]) : l.removeAttribute(i);
              break;
            }
            default:
              l.setAttribute(i, p(o[m]));
          }
          l.removeAttribute(d);
        }
      }
      l = h.nextNode();
    }
  }, S = (c, o) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), y;
    for (; l; ) {
      if (y = n.exec(l.data)) {
        const d = Array.isArray(o[y[1]]) ? o[y[1]] : [o[y[1]]];
        l.replaceWith(...d), h.currentNode = c;
      }
      l = h.nextNode();
    }
  }, R = (c, o) => {
    if (!c || !o || c.nodeType !== 1 || o.nodeType !== 1)
      return;
    const h = c.attributes, l = o.attributes, y = o.getAttribute("data-preserve-attributes"), d = y && y === "true";
    for (const {
      name: i,
      value: m
    } of h)
      (!l[i] || l[i] !== m) && o.setAttribute(i, m);
    if (!d)
      for (const {
        name: i
      } of l)
        h[i] || o.removeAttribute(i);
    if (o.tagName.indexOf("-") > -1 && c.tagName.indexOf("-") > -1) {
      const i = Object.getOwnPropertySymbols(c), m = Object.getOwnPropertySymbols(o), b = i.length ? c[i[0]] : "", P = m.length ? o[m[0]] : "";
      b && P && b !== P && F(o, JSON.parse(b), m[0]);
    }
  }, A = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), C = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, T = (c, o, h) => {
    const l = o ? Array.from(o.childNodes) : [], y = c ? Array.from(c.childNodes) : [];
    let d = l.length - y.length;
    if (d > 0)
      for (; d > 0; d--)
        l[l.length - d].parentNode.removeChild(l[l.length - d]);
    y.forEach(function(i, m) {
      const b = l[m];
      if (R(i, b), h && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        o && o.appendChild(i);
        return;
      }
      if (A(i) !== A(b)) {
        b.replaceWith(i);
        return;
      }
      const P = C(i);
      if (P && P !== C(b)) {
        b.textContent = P;
        return;
      }
      if (b.childNodes.length > 0 && i.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && i.childNodes.length > 0) {
        const H = document.createDocumentFragment();
        T(i, H, !1), b.appendChild(H);
        return;
      }
      if (i.childNodes.length > 0) {
        T(i, b, !0);
        return;
      }
    });
  };
  return {
    html: (c, ...o) => {
      let h = "";
      const {
        length: l
      } = c;
      for (let d = 1; d < l; d++) {
        const i = o[d - 1];
        let m = !1;
        if (h += c[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (b, P, H) => `${t}${d - 1}=${H || '"'}${P}${H ? "" : '"'}`), m = !0), !m)
          switch (!0) {
            case Array.isArray(i):
            case i instanceof DocumentFragment: {
              h += `<!--${u}${d - 1}-->`;
              break;
            }
            case (typeof i == "object" && i !== null): {
              "html" in i && (h += i.html);
              break;
            }
            default:
              h += i;
          }
      }
      h += c[l - 1];
      const y = x(h.trim());
      return _(y, o), S(y, o), y;
    },
    render: (c, o) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(o)) : T(o, c, !1), a.forEach((h) => {
        h();
      }), a = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class K {
  constructor(e, t) {
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
}, q = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, fe = (s, e) => {
  var t, r, u, n, a, Q, p, X, x;
  if (s = {
    ...de,
    ...s
  }, s.styles = s.styles.toString(), s.root && !L.isRootNodeSet)
    L.isRootNodeSet = !0, s.styles && (L.globalStyles.replace(s.styles), L.globalStyleTag = q(s.styles, document.head));
  else if (s.root && L.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (x = class extends HTMLElement {
    constructor() {
      super();
      N(this, a);
      N(this, p);
      N(this, t, void 0);
      N(this, r, void 0);
      N(this, u, void 0);
      g(this, "renderCount", 0);
      N(this, n, new Y());
      if (ne)
        O(this, r, this.attachShadow({
          mode: "open"
        })), w(this, r).adoptedStyleSheets = L.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const _ = s.styles.replaceAll(":host", s.selector);
        O(this, u, q(_, document.head));
      }
      j(this, a, Q).call(this), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this);
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
      for (const [A, C] of Object.entries(_))
        e.observedProperties.find((T) => T === A) && (w(this, t)[A] = C);
      (R = (S = w(this, t)).onPropertiesChanged) == null || R.call(S);
    }
    getInstance() {
      return w(this, t);
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var _, S, R, A;
      w(this, n).add(I(this, "bindprops", (C) => {
        const T = C.detail.props;
        T && this.setProps(T);
      })), w(this, n).add(I(this, "refresh_component", () => {
        var C, T;
        (T = (C = w(this, t)).mount) == null || T.call(C);
      })), (S = (_ = w(this, t)).beforeMount) == null || S.call(_), this.update(), (A = (R = w(this, t)).mount) == null || A.call(R);
    }
    attributeChangedCallback(_, S, R) {
      var A, C;
      (C = (A = w(this, t)).onAttributesChanged) == null || C.call(A, _, S, R);
    }
    disconnectedCallback() {
      var _, S, R;
      this.renderCount = 1, (S = (_ = w(this, t)).unmount) == null || S.call(_), (R = w(this, u)) == null || R.remove(), w(this, n).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), u = new WeakMap(), n = new WeakMap(), a = new WeakSet(), Q = function() {
    const _ = new K(this, w(this, r));
    _.update = () => {
      this.update();
    }, _.emitEvent = (S, R) => {
      j(this, p, X).call(this, S, R);
    }, O(this, t, G(ue(this, e), s.deps, _));
  }, p = new WeakSet(), X = function(_, S) {
    const R = new CustomEvent(_, {
      detail: S
    });
    this.dispatchEvent(R);
  }, x));
}, pe = {
  deps: []
}, me = (s) => (e) => {
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
  U.register(e, t);
}, be = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", u = [...Array.from(s.options)].filter((n) => n.selected).map((n) => n.value ?? (n.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? u[0] : u;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class ge {
  constructor(e, t) {
    g(this, "_initialValues");
    g(this, "_controls");
    g(this, "_errors", /* @__PURE__ */ new Map());
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
      for (const u of r) {
        const n = u(t);
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
const Ee = (s) => {
  const e = {}, t = {};
  for (const [a, f] of Object.entries(s)) {
    const p = Array.isArray(f) ? f : [f];
    e[a] = {
      value: p.shift(),
      validators: p
    }, t[a] = e[a].value;
  }
  const r = new ge(t, e);
  return [r, (a) => (f) => {
    const p = be(f.target);
    r.get(a).value = p;
  }, () => r.reset()];
};
class Ce {
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
    const u = {}, n = t.paramCount;
    for (let a = 0; a < e.length; a++) {
      const f = t.params[a];
      f.indexOf(":") >= 0 && (u[f.split(":")[1]] = e[a].split("?")[0], r += 1);
    }
    return r === n ? u : {};
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
g(v, "routeList", []), g(v, "isHistoryBasedRouting", !0);
function _e(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class D {
  constructor() {
    g(this, "_currentRoute", {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    g(this, "_template", new ae(""));
    g(this, "_navigationEndEvent", new J());
    g(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = v.isHistoryBasedRouting ? "popstate" : "hashchange";
    return v.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var u = t.pushState;
      t.pushState = function(...n) {
        u.apply(t, n), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), I(window, e, () => {
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
    const r = e.split("/").filter((a) => a.length > 0), u = v.routeList.filter((a) => {
      if (a.params.length === r.length && _e(a.url, e))
        return a;
      if (a.url === e)
        return a;
    }), n = u.length > 0 ? u[0] : null;
    n && (this._currentRoute.path = e, this._currentRoute.state = {
      ...t || {}
    }, W(n.canActivate()).subscribe((a) => {
      if (!a)
        return;
      const f = v.checkParams(r, n);
      if (Object.keys(f).length > 0 || e) {
        this._currentRoute.routeParams = new Map(Object.entries(f));
        let p = [];
        v.isHistoryBasedRouting ? p = new URLSearchParams(window.location.search).entries() : p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], this._currentRoute.queryParams = new Map(p);
        const E = (x) => {
          x.isRegistered = !0, this._template.next(x.template), this._navigationEndEvent.next();
        };
        n.isRegistered ? E(n) : n.templatePath ? W(n.templatePath()).subscribe(() => {
          E(n);
        }) : n.redirectTo && this.navigateTo(n.redirectTo, t);
      } else
        this.navigateTo(n.redirectTo, t);
    }));
  }
}
Z()(D);
const Ae = () => {
  class s {
    constructor(t, r) {
      g(this, "_template", "");
      g(this, "_subscriptions", new Y());
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
        return t.raw = [`${this._template}`], $(t);
      } else
        return $``;
    }
  }
  me({
    selector: "router-outlet",
    deps: [D, K]
  })(s);
};
class ye {
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
      for (const u of e)
        v.formatRoute(u);
      t ? v.preloadRoutes() : v.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
Z({
  deps: [D]
})(ye);
export {
  ae as BehaviourSubjectObs,
  me as Component,
  Z as Injectable,
  K as Renderer,
  ye as Router,
  J as SubjectObs,
  Y as Subscriptions,
  Ce as Validators,
  I as fromEvent,
  $ as html,
  Re as promisify,
  Ae as registerRouterComponent,
  he as render,
  Ee as useFormFields,
  W as wrapIntoObservable
};
