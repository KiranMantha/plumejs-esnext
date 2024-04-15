var ie = Object.defineProperty;
var oe = (s, e, t) => e in s ? ie(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var b = (s, e, t) => (oe(s, typeof e != "symbol" ? e + "" : e, t), t), F = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var y = (s, e, t) => (F(s, e, "read from private field"), t ? t.call(s) : e.get(s)), L = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, O = (s, e, t, r) => (F(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var W = (s, e, t) => (F(s, e, "access private method"), t);
const ae = (s) => !!s && typeof s.subscribe == "function", Y = (s) => !!s && typeof s.then == "function", G = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, ce = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), le = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), ue = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
}), B = () => Math.random().toString(36).substring(2);
class K {
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
    const t = B();
    return this._callbackCollection[t] = e, () => this.unsubscribe(t);
  }
  next(e) {
    for (const t in this._callbackCollection)
      this._callbackCollection[t](e);
  }
}
class V extends K {
  constructor(t) {
    super();
    b(this, "_initialValue");
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
class X {
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
const z = (s) => ae(s) ? s : Y(s) ? ue(Promise.resolve(s)) : le(s), $ = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), he = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (f) => {
    const m = f.querySelectorAll("script");
    for (const R of m)
      R.remove();
  }, r = (f, m) => {
    if (m = m.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(f) && (m.includes("javascript:") || m.includes("data:")) || f.startsWith("on"))
      return !0;
  }, a = (f) => {
    const m = f.attributes;
    for (const {
      name: R,
      value: A
    } of m)
      r(R, A) && f.removeAttribute(R);
  }, c = (f) => {
    const m = f.children;
    for (const R of m)
      a(R), c(R);
  }, l = e();
  return t(l), c(l), l.innerHTML;
}, de = (s, e) => {
  const t = G(e), r = () => ({
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
}, Pe = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, fe = (s) => typeof s == "function", q = /* @__PURE__ */ Object.create(null);
let H = null;
function pe(s, e) {
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
function ge(s) {
  const e = q[H];
  let t = s;
  function r() {
    return t;
  }
  return r.set = function(a) {
    fe(a) ? t = a(t) : t = a, e();
  }, r;
}
function be(s, e) {
  const t = pe(s, e);
  return function() {
    delete q[t];
  };
}
var N, U;
const Z = new (U = class {
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
}, N = new WeakMap(), U)(), ee = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const l of e)
      l.prototype.__metadata__.name !== "RENDERER" ? r.push(Z.getService(l)) : r.push(t);
    const a = G(s), c = new s(...r);
    return e.forEach((l, f) => {
      c[a[f]] = r[f];
    }), c;
  } else
    return new s();
}, I = new class {
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
  html: ke,
  render: me
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, a = "insertNode", c = /^insertNode([^ ]+)/;
  let l = [], f = [];
  const m = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(n);
    const u = (h) => i[h] || h;
    return o = ((h) => h.replace(/[&<>\(\)]/g, u))(o), JSON.parse(o);
  }, R = (n, i) => {
    const o = n.options, u = Array.isArray(i) ? i : [i];
    let g, h, d = o.length;
    for (; d--; ) {
      h = o[d];
      const C = h.getAttribute("value") ?? (h.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (h.selected = u.indexOf(C) > -1) && (g = !0);
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
        i === "data-input" ? P(n, o, Symbol("input")) : n.setAttribute(i, m(o));
        break;
      }
      case /class/.test(i): {
        o ? n.classList.add(...o.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? R(n, o) : n.value = m(o);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        o ? n.setAttribute(i, o) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, m(o));
    }
  }, _ = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let u = o.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const g = Array.from(u.attributes).filter((h) => r.test(h.nodeName));
        for (const {
          nodeName: h,
          nodeValue: d
        } of g) {
          const C = r.exec(h)[1];
          p(u, d, i[C]), u.removeAttribute(h);
        }
      }
      u = o.nextNode();
    }
  }, S = (n, i) => {
    const o = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let u = o.nextNode(), g;
    for (; u; ) {
      if (g = c.exec(u.data)) {
        const h = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        u.replaceWith(...h), o.currentNode = n;
      }
      u = o.nextNode();
    }
  }, E = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const o = n.attributes, u = i.attributes, g = i.getAttribute("data-preserve-attributes"), h = g && g === "true";
    for (const {
      name: d,
      value: C
    } of o)
      (!u[d] || u[d] !== C) && i.setAttribute(d, C);
    if (!h)
      for (const {
        name: d
      } of u)
        o[d] || i.removeAttribute(d);
    if (i.tagName.toLowerCase() === "input" && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const d = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), C = Object.getOwnPropertySymbols(i).find((x) => x.description === "input"), v = d ? n[d] : "", k = C ? i[C] : "";
      v && k && v !== k && P(i, JSON.parse(v), C);
    }
  }, T = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), M = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, D = (n, i, o) => {
    const u = i ? Array.from(i.childNodes) : [], g = n ? Array.from(n.childNodes) : [];
    let h = u.length - g.length;
    if (h > 0)
      for (; h > 0; h--)
        u[u.length - h].parentNode.removeChild(u[u.length - h]);
    g.forEach(function(d, C) {
      const v = u[C];
      if (E(d, v), o && v && v.nodeType === 1 && v.tagName.indexOf("-") > -1)
        return;
      if (!v) {
        i && i.appendChild(d);
        return;
      }
      if (T(d) !== T(v)) {
        v.replaceWith(d);
        return;
      }
      const k = M(d);
      if (k && k !== M(v)) {
        v.textContent = k;
        return;
      }
      if (v.childNodes.length > 0 && d.childNodes.length < 1) {
        v.innerHTML = "";
        return;
      }
      if (v.childNodes.length < 1 && d.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        D(d, x, !1), v.appendChild(x);
        return;
      }
      if (d.childNodes.length > 0) {
        D(d, v, !0);
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
      for (let h = 1; h < u; h++) {
        const d = i[h - 1];
        let C = !1;
        if (o += n[h - 1], s.test(o) && e.test(o) && (o = o.replace(s, (v, k, x) => `${t}${h - 1}=${x || '"'}${k}${x ? "" : '"'}`), C = !0), !C)
          switch (!0) {
            case Array.isArray(d):
            case d instanceof DocumentFragment: {
              o += `<!--${a}${h - 1}-->`;
              break;
            }
            case (typeof d == "object" && d !== null): {
              "attrs" in d && (o += `${t}${h - 1}="attrs"`);
              break;
            }
            default:
              o += d || "";
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
class te {
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
  shadowDomEncapsulation: !0
}, Q = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, _e = async (s, e) => {
  var t, r, a, c, l, se, m, re, A;
  if (s = {
    ...ye,
    ...s
  }, Y(s.styles)) {
    const P = await s.styles;
    s.styles = P.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !I.isRootNodeSet)
    I.isRootNodeSet = !0, s.styles && (I.globalStyles.replace(s.styles), I.globalStyleTag = Q(s.styles, document.head));
  else if (s.root && I.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (A = class extends HTMLElement {
    constructor() {
      super();
      L(this, l);
      L(this, m);
      L(this, t, void 0);
      L(this, r, void 0);
      L(this, a, void 0);
      L(this, c, new X());
      b(this, "renderCount", 0);
      if (s.shadowDomEncapsulation && ce)
        O(this, r, this.attachShadow({
          mode: "open"
        })), y(this, r).adoptedStyleSheets = I.getComputedCss(s.styles, s.standalone);
      else {
        O(this, r, this);
        const p = B();
        this.setAttribute("data-did", p);
        const _ = s.styles.replaceAll(":host", `${s.selector}[data-did='${p}']`);
        !s.root && _ && O(this, a, Q(_, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), W(this, l, se).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const p = y(this, t).render();
      typeof p == "string" ? y(this, r).innerHTML = he(p) : me(y(this, r), p);
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
      y(this, c).add($(this, "bindprops", (T) => {
        const M = T.detail.props;
        M && this.setProps(M);
      })), y(this, c).add($(this, "refresh_component", () => {
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
  }, t = new WeakMap(), r = new WeakMap(), a = new WeakMap(), c = new WeakMap(), l = new WeakSet(), se = function() {
    const p = new te(this, y(this, r));
    p.update = () => {
      this.update();
    }, p.emitEvent = (_, S) => {
      W(this, m, re).call(this, _, S);
    }, y(this, c).add(be(this.setRenderIntoQueue, () => {
      O(this, t, ee(de(this.setRenderIntoQueue, e), s.deps, p));
    }));
  }, m = new WeakSet(), re = function(p, _) {
    const S = new CustomEvent(p, {
      detail: _
    });
    this.dispatchEvent(S);
  }, A));
}, ve = {
  deps: []
}, we = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || _e(s, e);
}, ne = (s = {}) => (e) => {
  if (s = {
    ...ve,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = ee(e, s.deps);
  Z.register(e, t);
};
function Se(s, e) {
  return s.nodeName && s.nodeName.toLowerCase() === e.toLowerCase();
}
const Ce = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", a = [...Array.from(s.options).filter((c) => !c.disabled && (!c.parentNode.disabled || !Se(c.parentNode, "optgroup")))].filter((c) => c.selected).map((c) => c.value ?? (c.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
    this._errorCount = ge(0), this._initialValues = e;
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
        name: e,
        value: this.getControl(e).value,
        onchange: (t) => {
          const r = Ce(t.target);
          this.getControl(e).value = r;
        },
        onblur: () => {
          this._checkValidity();
        }
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
b(w, "routeList", []), b(w, "isHistoryBasedRouting", !0);
function Re(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class J {
  constructor() {
    b(this, "_currentRoute", new V({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    b(this, "_template", new V(""));
    b(this, "_navigationEndEvent", new K());
    b(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = w.isHistoryBasedRouting ? "popstate" : "hashchange";
    return w.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var a = t.pushState;
      t.pushState = function(...c) {
        a.apply(t, c), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), $(window, e, () => {
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
      if (f.params.length === a.length && Re(f.url, e))
        return f;
      if (f.url === e)
        return f;
    }), l = c.length > 0 ? c[0] : null;
    l && (r.path = e, r.state = {
      ...t || {}
    }, z(l.canActivate()).subscribe((f) => {
      if (!f)
        return;
      const m = w.checkParams(a, l);
      if (Object.keys(m).length > 0 || e) {
        r.routeParams = new Map(Object.entries(m));
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
ne()(J);
const Me = () => {
  class s {
    constructor(t, r) {
      b(this, "_template", "");
      b(this, "_subscriptions", new X());
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
      return this._template;
    }
  }
  we({
    selector: "router-outlet",
    deps: [J, te]
  })(s);
};
class Ee {
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
ne({
  deps: [J]
})(Ee);
export {
  V as BehaviourSubjectObs,
  we as Component,
  Le as FormBuilder,
  ne as Injectable,
  te as Renderer,
  Ee as Router,
  K as SubjectObs,
  X as Subscriptions,
  Ne as Validators,
  $ as fromEvent,
  ke as html,
  Pe as promisify,
  Me as registerRouterComponent,
  me as render,
  ge as signal,
  z as wrapIntoObservable
};
