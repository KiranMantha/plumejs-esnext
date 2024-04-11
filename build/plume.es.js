var oe = Object.defineProperty;
var ae = (s, e, t) => e in s ? oe(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var m = (s, e, t) => (ae(s, typeof e != "symbol" ? e + "" : e, t), t), F = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var y = (s, e, t) => (F(s, e, "read from private field"), t ? t.call(s) : e.get(s)), L = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, O = (s, e, t, r) => (F(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var $ = (s, e, t) => (F(s, e, "access private method"), t);
const ce = (s) => !!s && typeof s.subscribe == "function", G = (s) => !!s && typeof s.then == "function", K = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, le = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ue = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), he = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
}), B = () => Math.random().toString(36).substring(2);
class X {
  constructor() {
    /**
     * @private
     */
    m(this, "_callbackCollection", {});
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
    const t = B();
    return this._callbackCollection[t] = e, () => this.unsubscribe(t);
  }
  next(e) {
    for (const t in this._callbackCollection)
      this._callbackCollection[t](e);
  }
}
class V extends X {
  constructor(t) {
    super();
    m(this, "_initialValue");
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
class Z {
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
const z = (s) => ce(s) ? s : G(s) ? he(Promise.resolve(s)) : ue(s), W = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), de = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const b = f.querySelectorAll("script");
    for (const R of b)
      R.remove();
  }, r = (f, b) => {
    if (b = b.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (b.includes("javascript:") || b.includes("data:")) || f.startsWith("on"))
      return !0;
  }, a = (f) => {
    const b = f.attributes;
    for (const {
      name: R,
      value: A
    } of b)
      r(R, A) && f.removeAttribute(R);
  }, c = (f) => {
    const b = f.children;
    for (const R of b)
      a(R), c(R);
  }, l = e();
  return t(l), c(l), l.innerHTML;
}, fe = (s, e) => {
  const t = K(e), r = () => ({
    get(a, c) {
      const l = Object.prototype.toString.call(a[c]);
      return ["[object Object]", "[object Array]"].indexOf(l) > -1 && !("__metadata__" in a[c]) ? new Proxy(a[c], r()) : a[c];
    },
    set(a, c, l) {
      return a[c] = l, s(), !0;
    }
  });
  return class extends e {
    constructor(...a) {
      return super(...a), a.forEach((c, l) => {
        t[l] && t[l] !== "undefined" && (this[t[l]] = c);
      }), new Proxy(this, r());
    }
  };
}, ke = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, pe = (s) => typeof s == "function", q = /* @__PURE__ */ Object.create(null);
let H = null;
function ge(s, e) {
  const t = H;
  let r;
  H = B(), q[H] = s;
  try {
    e();
  } finally {
    r = H, H = t;
  }
  return r;
}
function me(s) {
  const e = q[H];
  let t = s;
  function r() {
    return t;
  }
  return r.set = function(a) {
    pe(a) ? t = a(t) : t = a, e();
  }, r;
}
function be(s, e) {
  const t = ge(s, e);
  return function() {
    delete q[t];
  };
}
var N, Y;
const ee = new (Y = class {
  constructor() {
    L(this, N, void 0);
    O(this, N, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!y(this, N).get(s))
      y(this, N).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = y(this, N).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    O(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), Y)(), te = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const l of e)
      l.prototype.__metadata__.name !== "RENDERER" ? r.push(ee.getService(l)) : r.push(t);
    const a = K(s), c = new s(...r);
    return e.forEach((l, f) => {
      c[a[f]] = r[f];
    }), c;
  } else
    return new s();
}, I = new class {
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
  html: Q,
  render: ye
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, a = "insertNode", c = /^insertNode([^ ]+)/;
  let l = [], f = [];
  const b = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const u = (d) => i[d] || d;
    return o = ((d) => d.replace(/[&<>\(\)]/g, u))(o), JSON.parse(o);
  }, R = (n, i) => {
    const o = n.options, u = Array.isArray(i) ? i : [i];
    let g, d, h = o.length;
    for (; h--; ) {
      d = o[h];
      const C = d.getAttribute("value") ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (d.selected = u.indexOf(C) > -1) && (g = !0);
    }
    g || (n.selectedIndex = -1);
  }, A = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, P = (n, i, o) => {
    const u = () => {
      setTimeout(() => {
        if (n.isConnected) {
          const g = new CustomEvent("bindprops", {
            detail: {
              props: i
            },
            bubbles: !1
          });
          n.dispatchEvent(g);
        }
      });
    };
    n[o] = JSON.stringify(i), f.push(u);
  }, p = (n, i, o) => {
    switch (!0) {
      case /attrs/.test(i): {
        const u = o.attrs;
        for (const g in u)
          p(n, g, u[g]);
        break;
      }
      case /^on+/.test(i): {
        const u = i.slice(2).toLowerCase();
        n.removeEventListener(u, o), n.addEventListener(u, o);
        break;
      }
      case /ref/.test(i): {
        const u = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: n,
          fn: o
        });
        l.push(u);
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(i, b(o));
        break;
      }
      case /class/.test(i): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? R(n, o) : n.value = b(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? n.setAttribute(i, o) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, b(o));
    }
  }, _ = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let u = o.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const g = Array.from(u.attributes).filter((d) => r.test(d.nodeName));
        for (const {
          nodeName: d,
          nodeValue: h
        } of g) {
          const C = r.exec(d)[1];
          p(u, h, i[C]), u.removeAttribute(d);
        }
      }
      u = o.nextNode();
    }
  }, S = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let u = o.nextNode(), g;
    for (; u; ) {
      if (g = c.exec(u.data)) {
        const d = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        u.replaceWith(...d), o.currentNode = n;
      }
      u = o.nextNode();
    }
  }, E = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = n.attributes, u = i.attributes, g = i.getAttribute("data-preserve-attributes"), d = g && g === "true";
    for (const {
      name: h,
      value: C
    } of o)
      (!u[h] || u[h] !== C) && i.setAttribute(h, C);
    if (!d)
      for (const {
        name: h
      } of u)
        o[h] || i.removeAttribute(h);
    if (i.tagName.toLowerCase() === "input" && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const h = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), C = Object.getOwnPropertySymbols(i).find((x) => x.description === "input"), v = h ? n[h] : "", k = C ? i[C] : "";
      v && k && v !== k && P(i, JSON.parse(v), C);
    }
  }, T = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, D = (n, i, o) => {
    const u = i ? Array.from(i.childNodes) : [], g = n ? Array.from(n.childNodes) : [];
    let d = u.length - g.length;
    if (d > 0)
      for (; d > 0; d--)
        u[u.length - d].parentNode.removeChild(u[u.length - d]);
    g.forEach(function(h, C) {
      const v = u[C];
      if (E(h, v), o && v && v.nodeType === 1 && v.tagName.indexOf("-") > -1)
        return;
      if (!v) {
        i && i.appendChild(h);
        return;
      }
      if (T(h) !== T(v)) {
        v.replaceWith(h);
        return;
      }
      const k = M(h);
      if (k && k !== M(v)) {
        v.textContent = k;
        return;
      }
      if (v.childNodes.length > 0 && h.childNodes.length < 1) {
        v.innerHTML = "";
        return;
      }
      if (v.childNodes.length < 1 && h.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        D(h, x, !1), v.appendChild(x);
        return;
      }
      if (h.childNodes.length > 0) {
        D(h, v, !0);
        return;
      }
    });
  };
  return {
    html: (n, ...i) => {
      let o = "";
      const {
        length: u
      } = n;
      for (let d = 1; d < u; d++) {
        const h = i[d - 1];
        let C = !1;
        if (o += n[d - 1], s.test(o) && e.test(o) && (o = o.replace(s, (v, k, x) => `${t}${d - 1}=${x || '"'}${k}${x ? "" : '"'}`), C = !0), !C)
          switch (!0) {
            case Array.isArray(h):
            case h instanceof DocumentFragment: {
              o += `<!--${a}${d - 1}-->`;
              break;
            }
            case (typeof h == "object" && h !== null): {
              "html" in h && (o += h.html), "attrs" in h && (o += `${t}${d - 1}="attrs"`);
              break;
            }
            default:
              o += h || "";
          }
      }
      o += n[u - 1];
      const g = A(o.trim());
      return _(g, i), S(g, i), g;
    },
    render: (n, i) => {
      n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : D(i, n, !1), l.forEach((o) => {
        o();
      }), l = [], f.forEach((o) => {
        o();
      }), f = [];
    }
  };
})();
class se {
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
const _e = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, U = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, ve = async (s, e) => {
  var t, r, a, c, l, re, b, ne, A;
  if (s = {
    ..._e,
    ...s
  }, G(s.styles)) {
    const P = await s.styles;
    s.styles = P.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !I.isRootNodeSet)
    I.isRootNodeSet = !0, s.styles && (I.globalStyles.replace(s.styles), I.globalStyleTag = U(s.styles, document.head));
  else if (s.root && I.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (A = class extends HTMLElement {
    constructor() {
      super();
      L(this, l);
      L(this, b);
      L(this, t, void 0);
      L(this, r, void 0);
      L(this, a, void 0);
      L(this, c, new Z());
      m(this, "renderCount", 0);
      if (s.shadowDomEncapsulation && le)
        O(this, r, this.attachShadow({
          mode: "open"
        })), y(this, r).adoptedStyleSheets = I.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const p = B();
        this.setAttribute("data-did", p);
        const _ = s.styles.replaceAll(":host", `${s.selector}[data-did='${p}']`);
        !s.root && _ && O(this, a, U(_, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), $(this, l, re).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const p = y(this, t).render();
      typeof p == "string" ? y(this, r).innerHTML = de(p) : ye(y(this, r), p);
    }
    setProps(p) {
      var _, S;
      for (const [E, T] of Object.entries(p))
        e.observedProperties.find((M) => M === E) && (y(this, t)[E] = T);
      (S = (_ = y(this, t)).onPropertiesChanged) == null || S.call(_);
    }
    getInstance() {
      return y(this, t);
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
      var p, _, S, E;
      y(this, c).add(W(this, "bindprops", (T) => {
        const M = T.detail.props;
        M && this.setProps(M);
      })), y(this, c).add(W(this, "refresh_component", () => {
        this.update();
      })), (_ = (p = y(this, t)).beforeMount) == null || _.call(p), this.update(), (E = (S = y(this, t)).mount) == null || E.call(S);
    }
    attributeChangedCallback(p, _, S) {
      var E, T;
      (T = (E = y(this, t)).onAttributesChanged) == null || T.call(E, p, _, S);
    }
    disconnectedCallback() {
      var p, _, S;
      this.renderCount = 0, (_ = (p = y(this, t)).unmount) == null || _.call(p), (S = y(this, a)) == null || S.remove(), y(this, c).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), a = new WeakMap(), c = new WeakMap(), l = new WeakSet(), re = function() {
    const p = new se(this, y(this, r));
    p.update = () => {
      this.update();
    }, p.emitEvent = (_, S) => {
      $(this, b, ne).call(this, _, S);
    }, y(this, c).add(be(this.setRenderIntoQueue, () => {
      O(this, t, te(fe(this.setRenderIntoQueue, e), s.deps, p));
    }));
  }, b = new WeakSet(), ne = function(p, _) {
    const S = new CustomEvent(p, {
      detail: _
    });
    this.dispatchEvent(S);
  }, A));
}, we = {
  deps: []
}, Se = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || ve(s, e);
}, ie = (s = {}) => (e) => {
  if (s = {
    ...we,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = te(e, s.deps);
  ee.register(e, t);
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
      const t = s.type === "select-one", a = [...Array.from(s.options).filter((c) => !c.disabled && (!c.parentNode.disabled || !Ce(c.parentNode, "optgroup")))].filter((c) => c.selected).map((c) => c.value ?? (c.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = t ? a[0] : a;
      break;
    }
    default: {
      e = s.value;
      break;
    }
  }
  return e;
};
class Le {
  constructor(e) {
    /**
     * @private
     */
    m(this, "_initialValues");
    /**
     * @private
     */
    m(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    m(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    m(this, "_errorCount");
    this._errorCount = me(0), this._initialValues = e;
    for (const [t, r] of Object.entries(e)) {
      const a = [...Array.isArray(r) ? r : [r]];
      this._controls.set(t, {
        value: a[0],
        validators: a.length > 1 ? a[1] : []
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
  register(e) {
    return {
      attrs: {
        onchange: (t) => {
          const r = Re(t.target);
          this.getControl(e).value = r;
        },
        onblur: () => {
          this._checkValidity();
        },
        name: e,
        value: this.getControl(e).value
      }
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
      for (const a of r) {
        const c = a(t);
        c !== null && (this._errors.has(e) ? this._errors.set(e, {
          ...this._errors.get(e),
          ...c
        }) : this._errors.set(e, c));
      }
    this._errorCount.set(this._errors.size);
  }
}
class Ne {
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
const j = class {
  static checkParams(e, t) {
    let r = 0;
    const a = {}, c = t.paramCount;
    for (let l = 0; l < e.length; l++) {
      const f = t.params[l];
      f.indexOf(":") >= 0 && (a[f.split(":")[1]] = e[l].split("?")[0], r += 1);
    }
    return r === c ? a : {};
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
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = j.getParamCount(t.params), j.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of j.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = j.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let w = j;
m(w, "routeList", []), m(w, "isHistoryBasedRouting", !0);
function Ee(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class J {
  constructor() {
    m(this, "_currentRoute", new V({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    m(this, "_template", new V(""));
    m(this, "_navigationEndEvent", new X());
    m(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = w.isHistoryBasedRouting ? "popstate" : "hashchange";
    return w.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var a = t.pushState;
      t.pushState = function(...c) {
        a.apply(t, c), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), W(window, e, () => {
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
    let r = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
    r = r || "/", this._routeStateMap.clear(), this._routeStateMap.set(e, t), r === e ? this._navigateTo(e, t) : w.isHistoryBasedRouting ? window.history.pushState(t, "", e) : window.location.hash = "#" + e;
  }
  onNavigationEnd() {
    return this._navigationEndEvent.asObservable();
  }
  _registerOnHashChange() {
    const e = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, ""), t = this._routeStateMap.get(e);
    this._navigateTo(e, t);
  }
  _navigateTo(e, t) {
    const r = {}, a = e.split("/").filter((f) => f.length > 0), c = w.routeList.filter((f) => {
      if (f.params.length === a.length && Ee(f.url, e))
        return f;
      if (f.url === e)
        return f;
    }), l = c.length > 0 ? c[0] : null;
    l && (r.path = e, r.state = {
      ...t || {}
    }, z(l.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const b = w.checkParams(a, l);
      if (Object.keys(b).length > 0 || e) {
        r.routeParams = new Map(Object.entries(b));
        let R = [];
        w.isHistoryBasedRouting ? R = new URLSearchParams(window.location.search).entries() : R = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(R);
        const A = (P) => {
          P.isRegistered = !0, this._currentRoute.next(r), this._template.next(P.template), this._navigationEndEvent.next();
        };
        l.isRegistered ? A(l) : l.templatePath ? z(l.templatePath()).subscribe(() => {
          A(l);
        }) : l.redirectTo && this.navigateTo(l.redirectTo, t);
      } else
        this.navigateTo(l.redirectTo, t);
    }));
  }
}
ie()(J);
const Me = () => {
  class s {
    constructor(t, r) {
      m(this, "_template", "");
      m(this, "_subscriptions", new Z());
    }
    beforeMount() {
      this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe((t) => {
        this._template !== t && (this._template = t);
      })), this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }
    mount() {
      const t = w.isHistoryBasedRouting ? window.location.pathname : window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(t || "/");
    }
    unmount() {
      this._subscriptions.unsubscribe();
    }
    render() {
      if (this._template) {
        const t = [`${this._template}`];
        return t.raw = [`${this._template}`], Q(t);
      } else
        return Q``;
    }
  }
  Se({
    selector: "router-outlet",
    deps: [J, se]
  })(s);
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
    if (r && (w.isHistoryBasedRouting = !r), Array.isArray(e)) {
      for (const a of e)
        w.formatRoute(a);
      t ? w.preloadRoutes() : w.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ie({
  deps: [J]
})(Ae);
export {
  V as BehaviourSubjectObs,
  Se as Component,
  Le as FormBuilder,
  ie as Injectable,
  se as Renderer,
  Ae as Router,
  X as SubjectObs,
  Z as Subscriptions,
  Ne as Validators,
  W as fromEvent,
  Q as html,
  ke as promisify,
  Me as registerRouterComponent,
  ye as render,
  me as signal,
  z as wrapIntoObservable
};
