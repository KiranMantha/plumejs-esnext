var he = Object.defineProperty;
var de = (s, e, t) => e in s ? he(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var h = (s, e, t) => (de(s, typeof e != "symbol" ? e + "" : e, t), t), W = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var m = (s, e, t) => (W(s, e, "read from private field"), t ? t.call(s) : e.get(s)), A = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
}, k = (s, e, t, r) => (W(s, e, "write to private field"), r ? r.call(s, t) : e.set(s, t), t);
var B = (s, e, t) => (W(s, e, "access private method"), t);
const fe = (s) => !!s && typeof s.subscribe == "function", Z = (s) => !!s && typeof s.then == "function", ee = (s) => {
  const e = s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((t) => t.trim()) : [];
}, pe = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ge = (s) => ({
  subscribe: (e) => {
    e(s);
  }
}), me = (s) => ({
  subscribe: (e) => {
    Promise.resolve(s).then((t) => {
      e(t);
    });
  }
}), V = () => Math.random().toString(36).substring(2);
class te {
  constructor() {
    /**
     * @private
     */
    h(this, "_callbackCollection", {});
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
    const t = V();
    return this._callbackCollection[t] = e, () => this.unsubscribe(t);
  }
  next(e) {
    for (const t in this._callbackCollection)
      this._callbackCollection[t](e);
  }
}
class J extends te {
  constructor(t) {
    super();
    h(this, "_initialValue");
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
class se {
  constructor() {
    h(this, "_subcribers", []);
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
const K = (s) => fe(s) ? s : Z(s) ? me(Promise.resolve(s)) : ge(s), q = (s, e, t, r = !1) => (s.addEventListener(e, t, r), () => {
  s.removeEventListener(e, t, r);
}), be = (s) => {
  const e = () => new DOMParser().parseFromString(s, "text/html").body || document.createElement("body"), t = (d) => {
    const y = d.querySelectorAll("script");
    for (const v of y)
      v.remove();
  }, r = (d, y) => {
    if (y = y.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(d) && (y.includes("javascript:") || y.includes("data:")) || d.startsWith("on"))
      return !0;
  }, o = (d) => {
    const y = d.attributes;
    for (const {
      name: v,
      value: L
    } of y)
      r(v, L) && d.removeAttribute(v);
  }, c = (d) => {
    const y = d.children;
    for (const v of y)
      o(v), c(v);
  }, l = e();
  return t(l), c(l), l.innerHTML;
}, _e = (s, e) => {
  const t = ee(e), r = () => ({
    get(o, c) {
      const l = Object.prototype.toString.call(o[c]);
      return ["[object Object]", "[object Array]"].indexOf(l) > -1 && !("__metadata__" in o[c]) ? new Proxy(o[c], r()) : o[c];
    },
    set(o, c, l) {
      return o[c] = l, s(), !0;
    }
  });
  return class extends e {
    constructor(...o) {
      return super(...o), o.forEach((c, l) => {
        t[l] && t[l] !== "undefined" && (this[t[l]] = c);
      }), new Proxy(this, r());
    }
  };
}, He = () => {
  let s;
  return [new Promise((t) => {
    s = t;
  }), s];
}, ye = (s) => typeof s == "function", z = /* @__PURE__ */ Object.create(null);
let O = null;
function ve(s, e) {
  const t = O;
  let r;
  O = V(), z[O] = s;
  try {
    e();
  } finally {
    r = O, O = t;
  }
  return r;
}
function re(s) {
  const e = z[O];
  let t = s;
  function r() {
    return t;
  }
  return r.set = function(o) {
    ye(o) ? t = o(t) : t = o;
    try {
      e();
    } catch {
    }
  }, r;
}
function we(s, e) {
  const t = ve(s, e);
  return function() {
    delete z[t];
  };
}
var M, X;
const ne = new (X = class {
  constructor() {
    A(this, M, void 0);
    k(this, M, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(s, e) {
    if (!m(this, M).get(s))
      m(this, M).set(s, e);
    else
      throw console.error(s), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(s) {
    const e = m(this, M).get(s);
    if (e)
      return e;
    throw console.error(s), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    k(this, M, /* @__PURE__ */ new WeakMap());
  }
}, M = new WeakMap(), X)(), ie = (s, e, t) => {
  if (e.length > 0) {
    const r = [];
    for (const l of e)
      l.prototype.__metadata__.name !== "RENDERER" ? r.push(ne.getService(l)) : r.push(t);
    const o = ee(s), c = new s(...r);
    return e.forEach((l, d) => {
      c[o[d]] = r[d];
    }), c;
  } else
    return new s();
}, N = new class {
  constructor() {
    h(this, "globalStyles");
    h(this, "globalStyleTag");
    h(this, "style_registry");
    h(this, "isRootNodeSet");
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
  html: Fe,
  render: Se
} = (() => {
  const s = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, t = "attr", r = /^attr([^ ]+)/, o = "insertNode", c = /^insertNode([^ ]+)/;
  let l = [], d = [];
  const y = (n) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let a = JSON.stringify(n);
    const u = (p) => i[p] || p;
    return a = ((p) => p.replace(/[&<>\(\)]/g, u))(a), JSON.parse(a);
  }, v = (n, i) => {
    const a = n.options, u = Array.isArray(i) ? i : [i];
    let g, p, f = a.length;
    for (; f--; ) {
      p = a[f];
      const E = p.getAttribute("value") ?? (p.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (p.selected = u.indexOf(E) > -1) && (g = !0);
    }
    g || (n.selectedIndex = -1);
  }, L = (n) => {
    const i = document.createElement("template");
    return i.innerHTML = n, i.content;
  }, P = (n, i, a) => {
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
    n[a] = JSON.stringify(i), d.push(u);
  }, H = (n, i, a) => {
    switch (!0) {
      case /attrs/.test(i): {
        const u = a.attrs;
        for (const g in u)
          H(n, g, u[g]);
        break;
      }
      case /^on+/.test(i): {
        const u = i.slice(2).toLowerCase();
        n.removeEventListener(u, a), n.addEventListener(u, a);
        break;
      }
      case /ref/.test(i): {
        const u = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: n,
          fn: a
        });
        l.push(u);
        break;
      }
      case /key/.test(i): {
        n[Symbol("key")] = a;
        break;
      }
      case /^data-+/.test(i):
      case /^aria-+/.test(i): {
        i === "data-input" ? P(n, a, Symbol("input")) : n.setAttribute(i, y(a));
        break;
      }
      case /class/.test(i): {
        a ? n.classList.add(...a.split(" ")) : n.setAttribute("class", "");
        break;
      }
      case /value/.test(i): {
        n.nodeName.toLowerCase() === "select" ? v(n, a) : n.value = y(a);
        break;
      }
      case /disabled/.test(i):
      case /checked/.test(i): {
        a ? n.setAttribute(i, a) : n.removeAttribute(i);
        break;
      }
      default:
        n.setAttribute(i, y(a));
    }
  }, b = (n, i) => {
    const a = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, null);
    let u = a.nextNode();
    for (; u; ) {
      if (u.hasAttributes()) {
        const g = Array.from(u.attributes).filter((p) => r.test(p.nodeName));
        for (const {
          nodeName: p,
          nodeValue: f
        } of g) {
          const E = r.exec(p)[1];
          H(u, f, i[E]), u.removeAttribute(p);
        }
      }
      u = a.nextNode();
    }
  }, S = (n, i) => {
    const a = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT, null);
    let u = a.nextNode(), g;
    for (; u; ) {
      if (g = c.exec(u.data)) {
        const p = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        u.replaceWith(...p), a.currentNode = n;
      }
      u = a.nextNode();
    }
  }, _ = (n, i) => {
    if (!n)
      return [null, ""];
    const a = Object.getOwnPropertySymbols(n).find((g) => g.description === i), u = a ? n[a] : "";
    return [a, u];
  }, T = (n, i) => {
    if (!n || !i || n.nodeType !== 1 || i.nodeType !== 1)
      return;
    const a = n.attributes, u = i.attributes, g = i.getAttribute("data-preserve-attributes"), p = g && g === "true";
    for (const {
      name: f,
      value: E
    } of a)
      (!u[f] || u[f] !== E) && i.setAttribute(f, E);
    if (!p)
      for (const {
        name: f
      } of u)
        a[f] || i.removeAttribute(f);
    if (["input", "textarea"].includes(i.tagName.toLowerCase()) && (i.value = n.value), i.tagName.indexOf("-") > -1 && n.tagName.indexOf("-") > -1) {
      const f = _(n, "input")[1], E = _(i, "input");
      f && E[1] && f !== E[1] && P(i, JSON.parse(f), E[0]);
    }
  }, R = (n) => n.nodeType === 3 ? "text" : n.nodeType === 8 ? "comment" : n.tagName.toLowerCase(), x = (n) => n.childNodes && n.childNodes.length > 0 ? null : n.textContent, j = (n, i, a) => {
    const u = i ? Array.from(i.childNodes) : [], g = n ? Array.from(n.childNodes) : [];
    let p = u.length - g.length;
    if (p > 0)
      for (; p > 0; p--)
        u[u.length - p].parentNode.removeChild(u[u.length - p]);
    g.forEach(function(f, E) {
      const C = u[E], $ = _(f, "key")[1], F = _(C, "key")[1];
      if (T(f, C), a && C && C.nodeType === 1 && C.tagName.indexOf("-") > -1)
        return;
      if (!C) {
        i && i.appendChild(f);
        return;
      }
      if ($ && F && $ !== F || R(f) !== R(C)) {
        C.replaceWith(f);
        return;
      }
      const D = x(f);
      if (D && D !== x(C)) {
        C.textContent = D;
        return;
      }
      if (C.childNodes.length > 0 && f.childNodes.length < 1) {
        C.innerHTML = "";
        return;
      }
      if (C.childNodes.length < 1 && f.childNodes.length > 0) {
        const U = document.createDocumentFragment();
        j(f, U, !1), C.appendChild(U);
        return;
      }
      if (f.childNodes.length > 0) {
        j(f, C, !0);
        return;
      }
    });
  };
  return {
    html: (n, ...i) => {
      let a = "";
      const {
        length: u
      } = n;
      for (let p = 1; p < u; p++) {
        const f = i[p - 1];
        let E = !1;
        if (a += n[p - 1], s.test(a) && e.test(a) && (a = a.replace(s, (C, $, F) => `${t}${p - 1}=${F || '"'}${$}${F ? "" : '"'}`), E = !0), !E)
          switch (!0) {
            case Array.isArray(f):
            case f instanceof DocumentFragment: {
              a += `<!--${o}${p - 1}-->`;
              break;
            }
            case (typeof f == "object" && f !== null): {
              "attrs" in f && (a += `${t}${p - 1}="attrs"`);
              break;
            }
            default:
              a += f || "";
          }
      }
      a += n[u - 1];
      const g = L(a.trim());
      return b(g, i), S(g, i), g;
    },
    render: (n, i) => {
      n && !n.children.length ? (n.innerHTML = "", n.appendChild(i)) : j(i, n, !1), l.forEach((a) => {
        a();
      }), l = [], d.forEach((a) => {
        a();
      }), d = [];
    }
  };
})();
class oe {
  constructor(e, t) {
    h(this, "_shadowRoot");
    h(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    h(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    h(this, "emitEvent");
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
const Ce = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, Y = (s, e) => {
  const t = document.createElement("style");
  return t.innerHTML = s, e && e.appendChild(t), t;
}, Ee = async (s, e) => {
  var t, r, o, c, l, d, ae, v, le, P;
  if (s = {
    ...Ce,
    ...s
  }, Z(s.styles)) {
    const H = await s.styles;
    s.styles = H.default.toString();
  }
  if (s.styles = s.styles.toString(), s.root && !N.isRootNodeSet)
    N.isRootNodeSet = !0, s.styles && (N.globalStyles.replace(s.styles), N.globalStyleTag = Y(s.styles, document.head));
  else if (s.root && N.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + s.selector + " component");
  window.customElements.define(s.selector, (P = class extends HTMLElement {
    constructor() {
      super();
      A(this, d);
      A(this, v);
      A(this, t, void 0);
      A(this, r, void 0);
      A(this, o, void 0);
      A(this, c, new se());
      A(this, l, !1);
      h(this, "renderCount", 0);
      s.shadowDomEncapsulation && pe ? (k(this, l, !1), k(this, r, this.attachShadow({
        mode: "open"
      })), m(this, r).adoptedStyleSheets = N.getComputedCss(s.styles, s.standalone)) : (k(this, l, !0), k(this, r, this)), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), B(this, d, ae).call(this);
    }
    static get observedAttributes() {
      return e.observedAttributes || [];
    }
    update() {
      const b = m(this, t).render();
      typeof b == "string" ? m(this, r).innerHTML = be(b) : Se(m(this, r), b);
    }
    setProps(b) {
      var S, _;
      for (const [T, R] of Object.entries(b))
        e.observedProperties.find((x) => x === T) && (m(this, t)[T] = R);
      (_ = (S = m(this, t)).onPropertiesChanged) == null || _.call(S);
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
      var b, S, _, T;
      if (m(this, l)) {
        const R = V();
        this.setAttribute("data-did", R);
        const x = s.styles.replaceAll(":host", `${s.selector}[data-did='${R}']`);
        !s.root && x && k(this, o, Y(x, document.head));
      }
      m(this, c).add(q(this, "bindprops", (R) => {
        const x = R.detail.props;
        x && this.setProps(x);
      })), m(this, c).add(q(this, "refresh_component", () => {
        this.update();
      })), (S = (b = m(this, t)).beforeMount) == null || S.call(b), this.update(), (T = (_ = m(this, t)).mount) == null || T.call(_);
    }
    attributeChangedCallback(b, S, _) {
      var T, R;
      (R = (T = m(this, t)).onAttributesChanged) == null || R.call(T, b, S, _);
    }
    disconnectedCallback() {
      var b, S, _;
      this.renderCount = 0, (S = (b = m(this, t)).unmount) == null || S.call(b), (_ = m(this, o)) == null || _.remove(), m(this, c).unsubscribe();
    }
  }, t = new WeakMap(), r = new WeakMap(), o = new WeakMap(), c = new WeakMap(), l = new WeakMap(), d = new WeakSet(), ae = function() {
    const b = new oe(this, m(this, r));
    b.update = () => {
      this.update();
    }, b.emitEvent = (S, _) => {
      B(this, v, le).call(this, S, _);
    }, m(this, c).add(we(this.setRenderIntoQueue, () => {
      k(this, t, ie(_e(this.setRenderIntoQueue, e), s.deps, b));
    }));
  }, v = new WeakSet(), le = function(b, S) {
    const _ = new CustomEvent(b, {
      detail: S
    });
    this.dispatchEvent(_);
  }, P));
}, Re = {
  deps: []
}, Te = (s) => (e) => {
  if (s.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(s.selector) || Ee(s, e);
}, ce = (s = {}) => (e) => {
  if (s = {
    ...Re,
    ...s
  }, e.prototype.__metadata__ = {
    name: "SERVICE"
  }, s.deps.some((r) => r.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const t = ie(e, s.deps);
  ne.register(e, t);
}, G = (s) => typeof s == "function", xe = (s, e) => s.nodeName && s.nodeName.toLowerCase() === e.toLowerCase(), Ae = (s) => {
  let e;
  switch (s.nodeName && s.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(s.type) ? e = s.checked ? s.value !== null && s.value !== "on" ? s.value : !0 : !1 : e = s.value;
      break;
    }
    case "select": {
      const t = s.type === "select-one", o = [...Array.from(s.options).filter((c) => !c.disabled && (!c.parentNode.disabled || !xe(c.parentNode, "optgroup")))].filter((c) => c.selected).map((c) => c.value ?? (c.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
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
class ue {
  constructor(e, t, r) {
    h(this, "name");
    h(this, "validators");
    h(this, "isTouched", !1);
    h(this, "validity", null);
    /**
     * @private */
    h(this, "_initialValue");
    /**
     * @private */
    h(this, "_value");
    /**
     * @private
     */
    h(this, "_errorMessage", re(""));
    /**
     * @private
     */
    h(this, "_parent");
    const o = [...Array.isArray(t) ? t : [t]];
    this.name = e, this._initialValue = o[0], this._value = o[0], this.validators = o.length > 1 ? o[1] : [], this._parent = r;
  }
  get value() {
    return this._value;
  }
  get errorMessage() {
    return this._errorMessage();
  }
  register() {
    return {
      attrs: {
        name: this.name,
        value: this.value,
        onchange: (e) => {
          this._value = Ae(e.target);
        },
        onblur: () => {
          this.isTouched = !0, this.validate();
        }
      }
    };
  }
  validate() {
    var t;
    let e = "";
    for (const r of this.validators)
      if (this.validity = G(r) ? r(this.value) : r.rule(this.value), this.validity !== null) {
        e = G(r) ? "error" : r.message, (t = this._parent) == null || t.setError(this.name, this.validity);
        break;
      }
    this._errorMessage.set(e);
  }
  reset() {
    this._value = this._initialValue, this.isTouched = !1, this.validity = null, this._errorMessage.set("");
  }
}
const ke = () => Math.random().toString(36).substring(2);
class Pe {
  constructor(e) {
    /**
     * @private
     */
    h(this, "_controls", re([]));
    /**
     * @private
     */
    h(this, "_initialCollection", []);
    h(this, "validity", null);
    this._initialCollection = e;
    const t = this._generateControls(e);
    this._controls.set(t);
  }
  get value() {
    return this.controls.map((t) => {
      const r = {};
      for (const o of t)
        r[o.name] = o.control.value;
      return r;
    });
  }
  get controls() {
    return this._controls();
  }
  validate() {
    const e = this.controls.flatMap((t) => {
      const r = t.filter(({
        control: o
      }) => {
        if (o.validate(), o.errorMessage)
          return o.errorMessage;
      });
      if (r.length)
        return r;
    }).filter(Boolean);
    this.validity = e.length ? {
      invalid: !0
    } : null;
  }
  append(e) {
    this._controls.set((t) => [...t, this._generateItemControls(e)]);
  }
  remove(e) {
    const t = [...this.controls];
    t.splice(e, 1), this._controls.set(t);
  }
  reset() {
    const e = this._generateControls(this._initialCollection);
    this.validity = null, this._controls.set(e);
  }
  /**
   * @private
   */
  _generateControls(e) {
    return e.map((t) => this._generateItemControls(t));
  }
  /**
   * @private
   */
  _generateItemControls(e) {
    const t = [], r = ke();
    for (const [o, c] of Object.entries(e)) {
      const l = {
        name: o,
        control: new ue(`${o}-${r}`, c),
        indexedName: `${o}-${r}`
      };
      t.push(l);
    }
    return t;
  }
}
class $e {
  constructor(e) {
    /**
     * @private
     */
    h(this, "_initialValues");
    /**
     * @private
     */
    h(this, "_controls", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    h(this, "_errors", /* @__PURE__ */ new Map());
    /**
     * @private
     */
    h(this, "_errorCount", 0);
    /**
     * @private
     */
    h(this, "_isSubmitted", !1);
    this._initialValues = e;
    for (const [t, r] of Object.entries(e))
      r instanceof Pe ? this._controls.set(t, r) : this._controls.set(t, new ue(t, r, {
        setError: this._setError.bind(this)
      }));
  }
  get hasErrors() {
    return !!this._errorCount;
  }
  /**
   * @type Map
   */
  get errors() {
    return this._errors;
  }
  /**
   * @type boolean
   */
  get valid() {
    return !this._errors.size;
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
  /**
   * @type boolean
   */
  get submitted() {
    return this._isSubmitted;
  }
  /**
   *
   * @param {string} controlName
   * @returns {value: string; validators: []; isTouched: boolean; errorMessage: string}
   */
  getControl(e) {
    return this._controls.get(e);
  }
  /**
   *
   * @param {string} key
   * @returns {{ attrs: { name: string; value: string; onchange: (e: Event) => void; onblur: (e: Event) => void }}
   */
  register(e) {
    return this.getControl(e).register();
  }
  /**
   *
   * @param {Event} e
   * @param {(values: Object) => void} fn
   */
  handleSubmit(e, t) {
    e.preventDefault(), this._isSubmitted = !0, this._checkValidity(), t(this.value);
  }
  reset() {
    this._controls.forEach((e) => {
      e.reset();
    }), this._isSubmitted = !1, this._errors.clear(), this._errorCount = 0;
  }
  /**
   * @private
   */
  _setError(e, t) {
    t ? this._errors.set(e, t) : this._errors.delete(e), this._errorCount = this._errors.size;
  }
  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [e] of this._controls)
      this._executeValidators(e);
    this._errorCount = this._errors.size;
  }
  /**
   * @private
   */
  _executeValidators(e) {
    const t = this.getControl(e);
    t.validate(), t.validity !== null ? this._errors.set(e, {
      ...this._errors.get(e) || {},
      ...t.validity
    }) : this._errors.delete(e);
  }
}
class je {
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
const I = class {
  static checkParams(e, t) {
    let r = 0;
    const o = {}, c = t.paramCount;
    for (let l = 0; l < e.length; l++) {
      const d = t.params[l];
      d.indexOf(":") >= 0 && (o[d.split(":")[1]] = e[l].split("?")[0], r += 1);
    }
    return r === c ? o : {};
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
    e.canActivate && (t.canActivate = e.canActivate), t.paramCount = I.getParamCount(t.params), I.routeList.push(t);
  }
  static preloadRoutes() {
    for (const e of I.routeList)
      e.templatePath && e.templatePath();
  }
  static preloadSelectedRoutes() {
    const e = I.routeList.filter((t) => t.preload === !0);
    for (const t of e)
      t.templatePath && t.templatePath();
  }
};
let w = I;
h(w, "routeList", []), h(w, "isHistoryBasedRouting", !0);
function Me(s, e) {
  return s ? new RegExp(s.replace(/:[^\s/]+/g, "(.+)")).test(e) : !1;
}
class Q {
  constructor() {
    h(this, "_currentRoute", new J({
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    }));
    h(this, "_template", new J(""));
    h(this, "_navigationEndEvent", new te());
    h(this, "_routeStateMap", /* @__PURE__ */ new Map());
  }
  listenRouteChanges() {
    const e = w.isHistoryBasedRouting ? "popstate" : "hashchange";
    return w.isHistoryBasedRouting && (window.history.replaceState({}, null, ""), function(t, r) {
      var o = t.pushState;
      t.pushState = function(...c) {
        o.apply(t, c), r();
      };
    }(window.history, this._registerOnHashChange.bind(this))), q(window, e, () => {
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
    const r = {}, o = e.split("/").filter((d) => d.length > 0), c = w.routeList.filter((d) => {
      if (d.params.length === o.length && Me(d.url, e))
        return d;
      if (d.url === e)
        return d;
    }), l = c.length > 0 ? c[0] : null;
    l && (r.path = e, r.state = {
      ...t || {}
    }, K(l.canActivate()).subscribe((d) => {
      if (!d)
        return;
      const y = w.checkParams(o, l);
      if (Object.keys(y).length > 0 || e) {
        r.routeParams = new Map(Object.entries(y));
        let v = [];
        w.isHistoryBasedRouting ? v = new URLSearchParams(window.location.search).entries() : v = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [], r.queryParams = new Map(v);
        const L = (P) => {
          P.isRegistered = !0, this._currentRoute.next(r), this._template.next(P.template), this._navigationEndEvent.next();
        };
        l.isRegistered ? L(l) : l.templatePath ? K(l.templatePath()).subscribe(() => {
          L(l);
        }) : l.redirectTo && this.navigateTo(l.redirectTo, t);
      } else
        this.navigateTo(l.redirectTo, t);
    }));
  }
}
ce()(Q);
const De = () => {
  class s {
    constructor(t, r) {
      h(this, "_template", "");
      h(this, "_subscriptions", new se());
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
  Te({
    selector: "router-outlet",
    deps: [Q, oe]
  })(s);
};
class Le {
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
      for (const o of e)
        w.formatRoute(o);
      t ? w.preloadRoutes() : w.preloadSelectedRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ce({
  deps: [Q]
})(Le);
export {
  J as BehaviourSubjectObs,
  Te as Component,
  $e as FormBuilder,
  ce as Injectable,
  oe as Renderer,
  Le as Router,
  te as SubjectObs,
  se as Subscriptions,
  je as Validators,
  q as fromEvent,
  Fe as html,
  He as promisify,
  De as registerRouterComponent,
  Se as render,
  re as signal,
  K as wrapIntoObservable
};
