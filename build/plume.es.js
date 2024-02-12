var se = Object.defineProperty;
var ne = (r, e, t) => e in r ? se(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var b = (r, e, t) => (ne(r, typeof e != "symbol" ? e + "" : e, t), t), V = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var m = (r, e, t) => (V(r, e, "read from private field"), t ? t.call(r) : e.get(r)), N = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, L = (r, e, t, s) => (V(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
var D = (r, e, t) => (V(r, e, "access private method"), t);
const ie = (r) => typeof r == "function", W = /* @__PURE__ */ Object.create(null);
let I = null;
function oe() {
  return Math.random().toString(36).substring(2);
}
function ae(r, e) {
  const t = I;
  let s;
  I = oe(), W[I] = r;
  try {
    e();
  } finally {
    s = I, I = t;
  }
  return s;
}
function ce(r) {
  const e = W[I];
  let t = r;
  function s() {
    return t;
  }
  return s.set = function(o) {
    ie(o) ? t = o(t) : t = o, e();
  }, s;
}
function le(r, e) {
  const t = ae(r, e);
  return function() {
    delete W[t];
  };
}
var P, Q;
const U = new (Q = class {
  constructor() {
    N(this, P, void 0);
    L(this, P, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(r, e) {
    if (!m(this, P).get(r))
      m(this, P).set(r, e);
    else
      throw console.error(r), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(r) {
    const e = m(this, P).get(r);
    if (e)
      return e;
    throw console.error(r), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    L(this, P, /* @__PURE__ */ new WeakMap());
  }
}, P = new WeakMap(), Q)(), ue = (r) => !!r && typeof r.subscribe == "function", he = (r) => !!r && typeof r.then == "function", Y = (r) => {
  const e = r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, de = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), fe = (r) => ({
  subscribe: (e) => {
    e(r);
  }
}), pe = (r) => ({
  subscribe: (e) => {
    Promise.resolve(r).then((t) => {
      e(t);
    });
  }
}), be = () => Math.random().toString(36).substring(2);
class G {
  constructor() {
    /**
     * @private
     */
    b(this, "_callbackCollection", {});
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
    const t = be();
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
    b(this, "_initialValue");
    this._initialValue = t;
  }
  subscribe(t) {
    const s = super.subscribe(t);
    return super.next(this._initialValue), s;
  }
  next(t) {
    this._initialValue = t, super.next(t);
  }
}
class K {
  constructor() {
    b(this, "_subcribers", []);
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
const q = (r) => ue(r) ? r : he(r) ? pe(Promise.resolve(r)) : fe(r), F = (r, e, t, s = !1) => (r.addEventListener(e, t, s), () => {
  r.removeEventListener(e, t, s);
}), ge = (r) => {
  const e = () => new DOMParser().parseFromString(r, "text/html").body || document.createElement("body"), t = (f) => {
    const _ = f.querySelectorAll("script");
    for (const E of _)
      E.remove();
  }, s = (f, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (_.includes("javascript:") || _.includes("data:")) || f.startsWith("on"))
      return !0;
  }, o = (f) => {
    const _ = f.attributes;
    for (const {
      name: E,
      value: T
    } of _)
      s(E, T) && f.removeAttribute(E);
  }, a = (f) => {
    const _ = f.children;
    for (const E of _)
      o(E), a(E);
  }, u = e();
  return t(u), a(u), u.innerHTML;
}, me = (r, e) => {
  const t = Y(e), s = () => ({
    get(o, a) {
      const u = Object.prototype.toString.call(o[a]);
      return ["[object Object]", "[object Array]"].indexOf(u) > -1 && !("__metadata__" in o[a]) ? new Proxy(o[a], s()) : o[a];
    },
    set(o, a, u) {
      return o[a] = u, r(), !0;
    }
  });
  return class extends e {
    constructor(...o) {
      return super(...o), o.forEach((a, u) => {
        t[u] && t[u] !== "undefined" && (this[t[u]] = a);
      }), new Proxy(this, s());
    }
  };
}, Pe = () => {
  let r;
  return [new Promise((t) => {
    r = t;
  }), r];
}, X = (r, e, t) => {
  if (e.length > 0) {
    const s = [];
    for (const u of e)
      u.prototype.__metadata__.name !== "RENDERER" ? s.push(U.getService(u)) : s.push(t);
    const o = Y(r), a = new r(...s);
    return e.forEach((u, f) => {
      a[o[f]] = s[f];
    }), a;
  } else
    return new r();
}, M = new class {
  constructor() {
    b(this, "globalStyles");
    b(this, "globalStyleTag");
    b(this, "style_registry");
    b(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(r = "") {
    let e = [];
    const t = new CSSStyleSheet();
    if (t.insertRule(":host { display: block; }"), e = [this.globalStyles, t], r) {
      const s = new CSSStyleSheet();
      s.replace(r), e.push(s);
    }
    return e;
  }
}(), {
  html: J,
  render: _e
} = (() => {
  const r = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", s = /^attr([^ ]+)/, o = "insertNode", a = /^insertNode([^ ]+)/;
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
  }, O = (c, n, h) => {
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
        const w = Array.from(l.attributes).filter((d) => s.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: i
        } of w) {
          const p = s.exec(d)[1];
          switch (!0) {
            case /^on+/.test(i): {
              const g = i.slice(2).toLowerCase();
              l.removeEventListener(g, n[p]), l.addEventListener(g, n[p]);
              break;
            }
            case /ref/.test(i): {
              const g = function() {
                this.node.isConnected && this.fn(this.node);
              }.bind({
                node: l,
                fn: n[p]
              });
              u.push(g);
              break;
            }
            case /^data-+/.test(i):
            case /^aria-+/.test(i): {
              i === "data-input" ? O(l, n[p], Symbol("input")) : l.setAttribute(i, _(n[p]));
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
      const i = Object.getOwnPropertySymbols(c).find((A) => A.description === "input"), p = Object.getOwnPropertySymbols(n).find((A) => A.description === "input"), g = i ? c[i] : "", x = p ? n[p] : "";
      g && x && g !== x && O(n, JSON.parse(g), p);
    }
  }, R = (c) => c.nodeType === 3 ? "text" : c.nodeType === 8 ? "comment" : c.tagName.toLowerCase(), k = (c) => c.childNodes && c.childNodes.length > 0 ? null : c.textContent, j = (c, n, h) => {
    const l = n ? Array.from(n.childNodes) : [], w = c ? Array.from(c.childNodes) : [];
    let d = l.length - w.length;
    if (d > 0)
      for (; d > 0; d--)
        l[l.length - d].parentNode.removeChild(l[l.length - d]);
    w.forEach(function(i, p) {
      const g = l[p];
      if (v(i, g), h && g && g.nodeType === 1 && g.tagName.indexOf("-") > -1)
        return;
      if (!g) {
        n && n.appendChild(i);
        return;
      }
      if (R(i) !== R(g)) {
        g.replaceWith(i);
        return;
      }
      const x = k(i);
      if (x && x !== k(g)) {
        g.textContent = x;
        return;
      }
      if (g.childNodes.length > 0 && i.childNodes.length < 1) {
        g.innerHTML = "";
        return;
      }
      if (g.childNodes.length < 1 && i.childNodes.length > 0) {
        const A = document.createDocumentFragment();
        j(i, A, !1), g.appendChild(A);
        return;
      }
      if (i.childNodes.length > 0) {
        j(i, g, !0);
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
        if (h += c[d - 1], r.test(h) && e.test(h) && (h = h.replace(r, (g, x, A) => `${t}${d - 1}=${A || '"'}${x}${A ? "" : '"'}`), p = !0), !p)
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
      c && !c.children.length ? (c.innerHTML = "", c.appendChild(n)) : j(n, c, !1), u.forEach((h) => {
        h();
      }), u = [], f.forEach((h) => {
        h();
      }), f = [];
    }
  };
})();
class Z {
  constructor(e, t) {
    b(this, "_shadowRoot");
    b(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    b(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    b(this, "emitEvent");
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
}, z = (r, e) => {
  const t = document.createElement("style");
  return t.innerHTML = r, e && e.appendChild(t), t;
}, we = (r, e) => {
  var t, s, o, a, u, ee, _, te, T;
  if (r = {
    ...ye,
    ...r
  }, r.styles = r.styles.toString(), r.root && !M.isRootNodeSet)
    M.isRootNodeSet = !0, r.styles && (M.globalStyles.replace(r.styles), M.globalStyleTag = z(r.styles, document.head));
  else if (r.root && M.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + r.selector + " component");
  window.customElements.define(r.selector, (T = class extends HTMLElement {
    constructor() {
      super();
      N(this, u);
      N(this, _);
      N(this, t, void 0);
      N(this, s, void 0);
      N(this, o, void 0);
      b(this, "renderCount", 0);
      N(this, a, new K());
      if (de)
        L(this, s, this.attachShadow({
          mode: "open"
        })), m(this, s).adoptedStyleSheets = M.getComputedCss(r.styles, r.standalone);
      else {
        L(this, s, this);
        const y = r.styles.replaceAll(":host", r.selector);
        L(this, o, z(y, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), D(this, u, ee).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const y = m(this, t).render();
      typeof y == "string" ? m(this, s).innerHTML = ge(y) : _e(m(this, s), y);
    }
    setProps(y) {
      var C, v;
      for (const [R, k] of Object.entries(y))
        e.observedProperties.find((j) => j === R) && (m(this, t)[R] = k);
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
      var R, k;
      (k = (R = m(this, t)).onAttributesChanged) == null || k.call(R, y, C, v);
    }
    disconnectedCallback() {
      var y, C, v;
      this.renderCount = 1, (C = (y = m(this, t)).unmount) == null || C.call(y), (v = m(this, o)) == null || v.remove(), m(this, a).unsubscribe();
    }
  }, t = new WeakMap(), s = new WeakMap(), o = new WeakMap(), a = new WeakMap(), u = new WeakSet(), ee = function() {
    const y = new Z(this, m(this, s));
    y.update = () => {
      this.update();
    }, y.emitEvent = (C, v) => {
      D(this, _, te).call(this, C, v);
    }, L(this, t, X(me(this.setRenderIntoQueue, e), r.deps, y));
  }, _ = new WeakSet(), te = function(y, C) {
    const v = new CustomEvent(y, {
      detail: C
    });
    this.dispatchEvent(v);
  }, T));
}, ve = {
  deps: []
}, Se = (r) => (e) => {
  if (r.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(r.selector) || we(r, e);
}, re = (r = {}) => (e) => {
  if (r = {
    ...ve,
    ...r
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, r.deps.some((s) => s.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = X(e, r.deps);
  U.register(e, t);
};
function Ce(r, e) {
  return r.nodeName && r.nodeName.toLowerCase() === e.toLowerCase();
}
const Re = (r) => {
  let e;
  switch (r.nodeName && r.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(r.type) ? e = r.checked ? r.value !== null && r.value !== "on" ? r.value : !0 : !1 : e = r.value;
      break;
    }
    case "select": {
      const t = r.type === "select-one", o = [...Array.from(r.options).filter((a) => !a.disabled && (!a.parentNode.disabled || !Ce(a.parentNode, "optgroup")))].filter((a) => a.selected).map((a) => a.value ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? o[0] : o;
      break;
    }
    default: {
      e = r.value;
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
    b(this, "_initialValues");
    /**
     * @private
     */
    b(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    b(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    b(this, "_errorCount");
    this._errorCount = ce(0), this._initialValues = e;
    for (const [t, s] of Object.entries(e)) {
      const o = [...Array.isArray(s) ? s : [s]];
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
    for (const [t, s] of this._controls)
      e[t] = s.value;
    return e;
  }
  getControl(e) {
    return this._controls.get(e);
  }
  changeHandler(e) {
    return (t) => {
      const s = Re(t.target);
      this.getControl(e).value = s, this._errorCount.set(0);
    };
  }
  reset() {
    for (const [e, t] of Object.entries(this._initialValues)) {
      const s = [...Array.isArray(t) ? t : [t]];
      this._controls.get(e).value = JSON.parse(JSON.stringify(s))[0];
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
      validators: s
    }] of this._controls)
      for (const o of s) {
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
    let s = 0;
    const o = {}, a = t.paramCount;
    for (let u = 0; u < e.length; u++) {
      const f = t.params[u];
      f.indexOf(":") >= 0 && (o[f.split(":")[1]] = e[u].split("?")[0], s += 1);
    }
    return s === a ? o : {};
  }
  static getParamCount(e) {
    let t = 0;
    return e.forEach((s) => {
      s.indexOf(":") >= 0 && (t += 1);
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
    if (t.params = e.path.split("/").filter((s) => s.length > 0), t.url = e.path, t.template = "", t.redirectTo = e.redirectTo, e.template) {
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
b(S, "routeList", []), b(S, "isHistoryBasedRouting", !0);
function Ee(r, e) {
  return r ? new RegExp(r.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class $ {
  constructor() {
    b(this, "_currentRoute", new B({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    b(this, "_template", new B(""));
    b(this, "_navigationEndEvent", new G());
    b(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = S.isHistoryBasedRouting ? "popstate" : "hashchange";
    return S.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, s) {
      var o = t.pushState;
      t.pushState = function(...a) {
        o.apply(t, a), s();
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
    let s = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    s = s || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), s === e ? this._navigateTo(e, t) : S.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = S.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const s = {}, o = e.split("/").filter((f) => f.length > 0), a = S.routeList.filter((f) => {
      if (f.params.length === o.length && Ee(f.url, e))
        return f;
      if (f.url === e)
        return f;
    }), u = a.length > 0 ? a[0] : null;
    u && (s.path = e, s.state = {
      ...t || {}
    }, q(u.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const _ = S.checkParams(o, u);
      if (Object.keys(_).length > 0 || e) {
        s.routeParams = new Map(Object.entries(_));
        let E = [];
        S.isHistoryBasedRouting ? E = new URLSearchParams(window.location.search).entries() : E = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], s.queryParams = new Map(E);
        const T = (O) => {
          O.isRegistered = !0, this._currentRoute.next(s), this._template.next(O.template), this._navigationEndEvent.next();
        };
        u.isRegistered ? T(u) : u.templatePath ? q(u.templatePath()).subscribe(() => {
          T(u);
        }) : u.redirectTo && this.navigateTo(u.redirectTo, t);
      } else
        this.navigateTo(u.redirectTo, t);
    }));
  }
}
re()($);
const Oe = () => {
  class r {
    constructor(t, s) {
      b(this, "_template", "");
      b(this, "_subscriptions", new K());
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
  })(r);
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
  registerRoutes(e, t = !1, s = !1) {
    if (s && (S.isHistoryBasedRouting = !s), Array.isArray(e)) {
      for (const o of e)
        S.formatRoute(o);
      t ? S.preloadRoutes() : S.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
re({
  deps: [$]
})(Te);
export {
  B as BehaviourSubjectObs,
  Se as Component,
  ke as FormBuilder,
  re as Injectable,
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
