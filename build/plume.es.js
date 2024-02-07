var re = Object.defineProperty;
var ne = (s, e, t) => e in s ? re(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var g = (s, e, t) => (ne(s, typeof e != "symbol" ? e + "" : e, t), t), V = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var m = (s, e, t) => (V(s, e, "read from private field"), t ? t.call(s) : e.get(s)), x = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, k = (s, e, t, r) => (V(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var D = (s, e, t) => (V(s, e, "access private method"), t);
const ie = (s) => typeof s == "function", W = /* @__PURE__ */ Object.create(null);
let M = null;
function oe() {
  return Math.random().toString(36).substring(2);
}
function ae(s, e) {
  const t = M;
  let r;
  M = oe(), W[M] = s;
  try {
    e();
  } finally {
    r = M, M = t;
  }
  return r;
}
function ce(s) {
  const e = W[M];
  let t = s;
  function r() {
    return t;
  }
  return r.set = function(o) {
    ie(o) ? t = o(t) : t = o, e();
  }, r;
}
function le(s, e) {
  const t = ae(s, e);
  return function() {
    delete W[t];
  };
}
var N, Q;
const U = new (Q = class {
  constructor() {
    x(this, N, void 0);
    k(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!m(this, N).get(s))
      m(this, N).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = m(this, N).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), Q)(), ue = (s) => !!s && typeof s.subscribe == "function", he = (s) => !!s && typeof s.then == "function", Y = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, de = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), fe = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), pe = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
}), ge = () => Math.random().toString(36).substring(2);
class G {
  constructor() {
    /**
     * @private
     */
    g(this, "_callbackCollection", {});
  }
  /**
   * @private
   */
  unsubscribe(e) {
    delete this._callbackCollection[e];
  }
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    const t = ge();
    return this._callbackCollection[t] = e, () => this.unsubscribe(t);
  }
  next(e) {
    for (const t in this._callbackCollection)
      this._callbackCollection[t](e);
  }
}
class B extends G {
  constructor(t) {
    super();
    g(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const r = super.subscribe(t);
    return super.next(this._initialValue), r;
  }
  next(t) {
    this._initialValue = t, super.next(t);
  }
}
class K {
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
const q = (s) => ue(s) ? s : he(s) ? pe(Promise.resolve(s)) : fe(s), F = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), be = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const _ = f.querySelectorAll("script");
    for (const E of _)
      E.remove();
  }, r = (f, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (_.includes("javascript:") || _.includes("data:")) || f.startsWith("on"))
      return !0;
  }, o = (f) => {
    const _ = f.attributes;
    for (const {
      name: E,
      value: T
    } of _)
      r(E, T) && f.removeAttribute(E);
  }, a = (f) => {
    const _ = f.children;
    for (const E of _)
      o(E), a(E);
  }, u = e();
  return t(u), a(u), u.innerHTML;
}, me = (s, e) => {
  const t = Y(e), r = () => ({
    get(o, a) {
      const u = Object.prototype.toString.call(o[a]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in o[a]) ? new Proxy(o[a], r()) : o[a];
    },
    set(o, a, u) {
      return o[a] = u, s(), !0;
    }
  });
  return class extends e {
    constructor(...o) {
      return super(...o), o.forEach((a, u) => {
        t[u] && t[u] !== "undefined" && (this[t[u]] = a);
      }), new Proxy(this, r());
    }
  };
}, Pe = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, X = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const u of e)
      u.prototype.__metadata__.name !== "RENDERER" ? r.push(U.getService(u)) : r.push(t);
    const o = Y(s), a = new s(...r);
    return e.forEach((u, f) => {
      a[o[f]] = r[f];
    }), a;
  } else
    return new s();
}, O = new class {
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
  html: J,
  render: _e
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, o = "insertNode", a = /^insertNode([^ ]+)/;
  let u = [], f = [];
  const _ = (c) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let h = JSON.stringify(c);
    const l = (d) => n[d] || d;
    return h = ((d) => d.replace(/[&<>\(\)]/g, l))(h), JSON.parse(h);
  }, E = (c, n) => {
    const h = c.options, l = Array.isArray(n) ? n : [n];
    let w, d, i = h.length;
    for (; i--; ) {
      d = h[i];
      const p = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = l.indexOf(p) > -1) && (w = !0);
    }
    w || (c.selectedIndex = -1);
  }, T = (c) => {
    const n = document.createElement("template");
    return n.innerHTML = c, n.content;
  }, L = (c, n, h) => {
    const l = () => {
      setTimeout(() => {
        if (c.isConnected) {
          const w = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          c.dispatchEvent(w);
        }
      });
    };
    c[h] = JSON.stringify(n), f.push(l);
  }, y = (c, n) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT, null);
    let l = h.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const w = Array.from(l.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of w) {
          const p = r.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const b = i.slice(2).toLowerCase();
              l.removeEventListener(b, n[p]), l.addEventListener(b, n[p]);
              break;
            }
            case /ref/.test(i): {
              const b = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: l,
                fn: n[p]
              });
              u.push(b);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? L(l, n[p], Symbol("input")) : l.setAttribute(i, _(n[p]));
              break;
            }
            case /class/.test(i): {
              n[p] ? l.classList.add(...n[p].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(i): {
              l.nodeName.toLowerCase() === "select" ? E(l, n[p]) : l.value = _(n[p]);
              break;
            }
            case /disabled/.test(i):
            case /checked/.test(i): {
              n[p] ? l.setAttribute(i, n[p]) : l.removeAttribute(i);
              break;
            }
            default:
              l.setAttribute(i, _(n[p]));
          }
          l.removeAttribute(d);
        }
      }
      l = h.nextNode();
    }
  }, C = (c, n) => {
    const h = document.createTreeWalker(c, NodeFilter.SHOW_COMMENT, null);
    let l = h.nextNode(), w;
    for (; l; ) {
      if (w = a.exec(l.data)) {
        const d = Array.isArray(n[w[1]]) ? n[w[1]] : [n[w[1]]];
        l.replaceWith(...d), h.currentNode = c;
      }
      l = h.nextNode();
    }
  }, v = (c, n) => {
    if (!c || !n || c.nodeType !== 1 || n.nodeType !== 1)
      return;
    const h = c.attributes, l = n.attributes, w = n.getAttribute("data-preserve-attributes"), d = w && w === "true";
    for (const {
      name: i,
      value: p
    } of h)
      (!l[i] || l[i] !== p) && n.setAttribute(i, p);
    if (!d)
      for (const {
        name: i
      } of l)
        h[i] || n.removeAttribute(i);
    if (n.tagName.toLowerCase() === "input" && (n.value = c.value), n.tagName.indexOf("-") > -1 && c.tagName.indexOf("-") > -1) {
      const i = Object.getOwnPropertySymbols(c), p = Object.getOwnPropertySymbols(n), b = i.length ? c[i[0]] : "", A = p.length ? n[p[0]] : "";
      b && A && b !== A && L(n, JSON.parse(b), p[0]);
    }
  }, R = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), P = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, I = (c, n, h) => {
    const l = n ? Array.from(n.childNodes) : [], w = c ? Array.from(c.childNodes) : [];
    let d = l.length - w.length;
    if (d > 0)
      for (; d > 0; d--)
        l[l.length - d].parentNode.removeChild(l[l.length - d]);
    w.forEach(function(i, p) {
      const b = l[p];
      if (v(i, b), h && b && b.nodeType === 1 && b.tagName.indexOf("-") > -1)
        return;
      if (!b) {
        n && n.appendChild(i);
        return;
      }
      if (R(i) !== R(b)) {
        b.replaceWith(i);
        return;
      }
      const A = P(i);
      if (A && A !== P(b)) {
        b.textContent = A;
        return;
      }
      if (b.childNodes.length > 0 && i.childNodes.length < 1) {
        b.innerHTML = "";
        return;
      }
      if (b.childNodes.length < 1 && i.childNodes.length > 0) {
        const j = document.createDocumentFragment();
        I(i, j, !1), b.appendChild(j);
        return;
      }
      if (i.childNodes.length > 0) {
        I(i, b, !0);
        return;
      }
    });
  };
  return {
    html: (c, ...n) => {
      let h = "";
      const {
        length: l
      } = c;
      for (let d = 1; d < l; d++) {
        const i = n[d - 1];
        let p = !1;
        if (h += c[d - 1], s.test(h) && e.test(h) && (h = h.replace(s, (b, A, j) => `${t}${d - 1}=${j || '"'}${A}${j ? "" : '"'}`), p = !0), !p)
          switch (!0) {
            case Array.isArray(i):
            case i instanceof DocumentFragment: {
              h += `<!--${o}${d - 1}-->`;
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
      h += c[l - 1];
      const w = T(h.trim());
      return y(w, n), C(w, n), w;
    },
    render: (c, n) => {
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(n)) : I(n, c, !1), u.forEach((h) => {
        h();
      }), u = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class Z {
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
const ye = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  encapsulation: "shadowDom"
}, z = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, we = (s, e) => {
  var t, r, o, a, u, ee, _, te, T;
  if (s = {
    ...ye,
    ...s
  }, s.styles = s.styles.toString(), s.root && !O.isRootNodeSet)
    O.isRootNodeSet = !0, s.styles && (O.globalStyles.replace(s.styles), O.globalStyleTag = z(s.styles, document.head));
  else if (s.root && O.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      x(this, u);
      x(this, _);
      x(this, t, void 0);
      x(this, r, void 0);
      x(this, o, void 0);
      g(this, "renderCount", 0);
      x(this, a, new K());
      if (de)
        k(this, r, this.attachShadow({
          mode: "open"
        })), m(this, r).adoptedStyleSheets = O.getComputedCss(s.styles, s.standalone);
      else {
        k(this, r, this);
        const y = s.styles.replaceAll(":host", s.selector);
        k(this, o, z(y, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), D(this, u, ee).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const y = m(this, t).render();
      typeof y == "string" ? m(this, r).innerHTML = be(y) : _e(m(this, r), y);
    }
    setProps(y) {
      var C, v;
      for (const [R, P] of Object.entries(y))
        e.observedProperties.find((I) => I === R) && (m(this, t)[R] = P);
      (v = (C = m(this, t)).onPropertiesChanged) == null || v.call(C);
    }
    getInstance() {
      return m(this, t);
    }
    setRenderIntoQueue() {
      ++this.renderCount, this.renderCount === 1 && queueMicrotask(() => {
        this.update(), this.renderCount = 0;
      });
    }
    /**
     * Default html element events
     */
    connectedCallback() {
      var y, C;
      m(this, a).add(F(this, "bindprops", (v) => {
        const R = v.detail.props;
        R && this.setProps(R);
      })), m(this, a).add(F(this, "refresh_component", () => {
        var v, R;
        (R = (v = m(this, t)).mount) == null || R.call(v);
      })), m(this, t).beforeMount && m(this, a).add(le(this.setRenderIntoQueue, m(this, t).beforeMount.bind(m(this, t)))), this.update(), (C = (y = m(this, t)).mount) == null || C.call(y);
    }
    attributeChangedCallback(y, C, v) {
      var R, P;
      (P = (R = m(this, t)).onAttributesChanged) == null || P.call(R, y, C, v);
    }
    disconnectedCallback() {
      var y, C, v;
      this.renderCount = 1, (C = (y = m(this, t)).unmount) == null || C.call(y), (v = m(this, o)) == null || v.remove(), m(this, a).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), o = new WeakMap(), a = new WeakMap(), u = new WeakSet(), ee = function() {
    const y = new Z(this, m(this, r));
    y.update = () => {
      this.update();
    }, y.emitEvent = (C, v) => {
      D(this, _, te).call(this, C, v);
    }, k(this, t, X(me(this.setRenderIntoQueue, e), s.deps, y));
  }, _ = new WeakSet(), te = function(y, C) {
    const v = new CustomEvent(y, {
      detail: C
    });
    this.dispatchEvent(v);
  }, T));
}, ve = {
  deps: []
}, Se = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || we(s, e);
}, se = (s = {}) => (e) => {
  if (s = {
    ...ve,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = X(e, s.deps);
  U.register(e, t);
};
function Ce(s, e) {
  return s.nodeName && s.nodeName.toLowerCase() === e.toLowerCase();
}
const Re = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", o = [...Array.from(s.options).filter((a) => !a.disabled && (!a.parentNode.disabled || !Ce(a.parentNode, "optgroup")))].filter((a) => a.selected).map((a) => a.value ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? o[0] : o;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class ke {
  constructor(e) {
    /**
     * @private
     */
    g(this, "_initialValues");
    /**
     * @private
     */
    g(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    g(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    g(this, "_errorCount");
    this._errorCount = ce(0), this._initialValues = e;
    for (const [t, r] of Object.entries(e)) {
      const o = [...Array.isArray(r) ? r : [r]];
      this._controls.set(t, {
        value: o[0],
        validators: o.length > 1 ? o[1] : []
      });
    }
  }
  get hasErrors() {
    return !!this._errorCount();
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
    const e = {};
    for (const [t, r] of this._controls)
      e[t] = r.value;
    return e;
  }
  getControl(e) {
    return this._controls.get(e);
  }
  changeHandler(e) {
    return (t) => {
      const r = Re(t.target);
      this.getControl(e).value = r, this._errorCount.set(0);
    };
  }
  reset() {
    for (const [e, t] of Object.entries(this._initialValues)) {
      const r = [...Array.isArray(t) ? t : [t]];
      this._controls.get(e).value = JSON.parse(JSON.stringify(r))[0];
    }
    this._errors.clear(), this._errorCount.set(0);
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [e, {
      value: t,
      validators: r
    }] of this._controls)
      for (const o of r) {
        const a = o(t);
        a !== null && (this._errors.has(e) ? this._errors.set(e, {
          ...this._errors.get(e),
          ...a
        }) : this._errors.set(e, a));
      }
    this._errorCount.set(this._errors.size);
  }
}
class Le {
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
    const o = {}, a = t.paramCount;
    for (let u = 0; u < e.length; u++) {
      const f = t.params[u];
      f.indexOf(":") >= 0 && (o[f.split(":")[1]] = e[u].split("?")[0], r += 1);
    }
    return r === a ? o : {};
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
let S = H;
g(S, "routeList", []), g(S, "isHistoryBasedRouting", !0);
function Ee(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class $ {
  constructor() {
    g(this, "_currentRoute", new B({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    g(this, "_template", new B(""));
    g(this, "_navigationEndEvent", new G());
    g(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var o = t.pushState;
      t.pushState = function(...a) {
        o.apply(t, a), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), F(window, e, () => {
      this._registerOnHashChange();
    });
  }
  getTemplate() {
    return this._template.asObservable();
  }
  getCurrentRoute() {
    return this._currentRoute.asObservable();
  }
  navigateTo(e = "/", t) {
    let r = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : S.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = {}, o = e.split("/").filter((f) => f.length > 0), a = S.routeList.filter((f) => {
      if (f.params.length === o.length && Ee(f.url, e))
        return f;
      if (f.url === e)
        return f;
    }), u = a.length > 0 ? a[0] : null;
    u && (r.path = e, r.state = {
      ...t || {}
    }, q(u.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const _ = S.checkParams(o, u);
      if (Object.keys(_).length > 0 || e) {
        r.routeParams = new Map(Object.entries(_));
        let E = [];
        S.isHistoryBasedRouting ? E = new URLSearchParams(window.location.search).entries() : E = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(E);
        const T = (L) => {
          L.isRegistered = !0, this._currentRoute.next(r), this._template.next(L.template), this._navigationEndEvent.next();
        };
        u.isRegistered ? T(u) : u.templatePath ? q(u.templatePath()).subscribe(() => {
          T(u);
        }) : u.redirectTo && this.navigateTo(u.redirectTo, t);
      } else
        this.navigateTo(u.redirectTo, t);
    }));
  }
}
se()($);
const Oe = () => {
  class s {
    constructor(t, r) {
      g(this, "_template", "");
      g(this, "_subscriptions", new K());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t && (this._template = t);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], J(t);
      } else
        return J``;
    }
  }
  Se({
    selector: "router-outlet",
    deps: [$, Z]
  })(s);
};
class Te {
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
    if (r && (S.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const o of e)
        S.formatRoute(o);
      t ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
se({
  deps: [$]
})(Te);
export {
  B as BehaviourSubjectObs,
  Se as Component,
  ke as FormBuilder,
  se as Injectable,
  Z as Renderer,
  Te as Router,
  G as SubjectObs,
  K as Subscriptions,
  Le as Validators,
  F as fromEvent,
  J as html,
  Pe as promisify,
  Oe as registerRouterComponent,
  _e as render,
  ce as signal,
  q as wrapIntoObservable
};
