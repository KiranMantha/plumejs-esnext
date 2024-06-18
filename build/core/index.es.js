var V = Object.defineProperty;
var ee = (e, t, s) => t in e ? V(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var A = (e, t, s) => (ee(e, typeof t != "symbol" ? t + "" : t, s), s), W = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var g = (e, t, s) => (W(e, t, "read from private field"), s ? s.call(e) : t.get(e)), T = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, R = (e, t, s, i) => (W(e, t, "write to private field"), i ? i.call(e, s) : t.set(e, s), s);
var $ = (e, t, s) => (W(e, t, "access private method"), s);
const te = (e) => !!e && typeof e.subscribe == "function", K = (e) => !!e && typeof e.then == "function", B = (e) => {
  const t = e.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((s) => s.trim()) : [];
}, se = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), re = (e) => ({
  subscribe: (t) => {
    t(e);
  }
}), ne = (e) => ({
  subscribe: (t) => {
    Promise.resolve(e).then((s) => {
      t(s);
    });
  }
}), j = () => Math.random().toString(36).substring(2);
class oe {
  constructor() {
    /**
     * @private
     */
    A(this, "_callbackCollection", {});
  }
  /**
   * @private
   */
  unsubscribe(t) {
    delete this._callbackCollection[t];
  }
  asObservable() {
    return {
      subscribe: (t) => this.subscribe(t)
    };
  }
  subscribe(t) {
    const s = j();
    return this._callbackCollection[s] = t, () => this.unsubscribe(s);
  }
  next(t) {
    for (const s in this._callbackCollection)
      this._callbackCollection[s](t);
  }
}
class _e extends oe {
  constructor(s) {
    super();
    A(this, "_initialValue");
    this._initialValue = s;
  }
  subscribe(s) {
    const i = super.subscribe(s);
    return super.next(this._initialValue), i;
  }
  next(s) {
    this._initialValue = s, super.next(s);
  }
}
class ie {
  constructor() {
    A(this, "_subcribers", []);
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
const Ee = (e) => te(e) ? e : K(e) ? ne(Promise.resolve(e)) : re(e), z = (e, t, s, i = !1) => (e.addEventListener(t, s, i), () => {
  e.removeEventListener(t, s, i);
}), ce = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), s = (b) => {
    const _ = b.querySelectorAll("script");
    for (const C of _)
      C.remove();
  }, i = (b, _) => {
    if (_ = _.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(b) && (_.includes("javascript:") || _.includes("data:")) || b.startsWith("on"))
      return !0;
  }, d = (b) => {
    const _ = b.attributes;
    for (const {
      name: C,
      value: D
    } of _)
      i(C, D) && b.removeAttribute(C);
  }, f = (b) => {
    const _ = b.children;
    for (const C of _)
      d(C), f(C);
  }, h = t();
  return s(h), f(h), h.innerHTML;
}, ae = (e, t) => {
  const s = B(t), i = () => ({
    get(d, f) {
      const h = Object.prototype.toString.call(d[f]);
      return ["[object Object]", "[object Array]"].indexOf(h) > -1 && !("__metadata__" in d[f]) ? new Proxy(d[f], i()) : d[f];
    },
    set(d, f, h) {
      return d[f] = h, e(), !0;
    }
  });
  return class extends t {
    constructor(...d) {
      return super(...d), d.forEach((f, h) => {
        s[h] && s[h] !== "undefined" && (this[s[h]] = f);
      }), new Proxy(this, i());
    }
  };
}, Ce = () => {
  let e;
  return [new Promise((s) => {
    e = s;
  }), e];
}, le = (e) => typeof e == "function", Q = /* @__PURE__ */ Object.create(null);
let L = null;
function ue(e, t) {
  const s = L;
  let i;
  L = j(), Q[L] = e;
  try {
    t();
  } finally {
    i = L, L = s;
  }
  return i;
}
function Ae(e) {
  const t = Q[L];
  let s = e;
  function i() {
    return s;
  }
  return i.set = function(d) {
    le(d) ? s = d(s) : s = d;
    try {
      t();
    } catch {
    }
  }, i;
}
function de(e, t) {
  const s = ue(e, t);
  return function() {
    delete Q[s];
  };
}
var k, q;
const Y = new (q = class {
  constructor() {
    T(this, k, void 0);
    R(this, k, /* @__PURE__ */ new WeakMap());
  }
  /**
   * register a dependency
   * @param {Function} klass
   * @param {Object} instance of the klass
   */
  register(e, t) {
    if (!g(this, k).get(e))
      g(this, k).set(e, t);
    else
      throw console.error(e), "service already exists";
  }
  /**
   * Function to return registered dependency
   * @param {Function} klass
   * @return {Object} instance of the klass
   */
  getService(e) {
    const t = g(this, k).get(e);
    if (t)
      return t;
    throw console.error(e), "service is not a registered service.";
  }
  /**
   * clears all registered dependencies
   */
  clear() {
    R(this, k, /* @__PURE__ */ new WeakMap());
  }
}, k = new WeakMap(), q)(), G = (e, t, s) => {
  if (t.length > 0) {
    const i = [];
    for (const h of t)
      h.prototype.__metadata__.name !== "RENDERER" ? i.push(Y.getService(h)) : i.push(s);
    const d = B(e), f = new e(...i);
    return t.forEach((h, b) => {
      f[d[b]] = i[b];
    }), f;
  } else
    return new e();
}, N = new class {
  constructor() {
    A(this, "globalStyles");
    A(this, "globalStyleTag");
    A(this, "style_registry");
    A(this, "isRootNodeSet");
    try {
      this.globalStyles = new CSSStyleSheet();
    } catch {
      this.globalStyles = "";
    }
    this.isRootNodeSet = !1, this.globalStyleTag = null;
  }
  getComputedCss(e = "") {
    let t = [];
    const s = new CSSStyleSheet();
    if (s.insertRule(":host { display: block; }"), t = [this.globalStyles, s], e) {
      const i = new CSSStyleSheet();
      i.replace(e), t.push(i);
    }
    return t;
  }
}(), {
  html: we,
  render: he
} = (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, s = "attr", i = /^attr([^ ]+)/, d = "insertNode", f = /^insertNode([^ ]+)/;
  let h = [], b = [];
  const _ = (r) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let o = JSON.stringify(r);
    const c = (l) => n[l] || l;
    return o = ((l) => l.replace(/[&<>\(\)]/g, c))(o), JSON.parse(o);
  }, C = (r, n) => {
    const o = r.options, c = Array.isArray(n) ? n : [n];
    let u, l, a = o.length;
    for (; a--; ) {
      l = o[a];
      const E = l.getAttribute("value") ?? (l.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (l.selected = c.indexOf(E) > -1) && (u = !0);
    }
    u || (r.selectedIndex = -1);
  }, D = (r) => {
    const n = document.createElement("template");
    return n.innerHTML = r, n.content;
  }, P = (r, n, o) => {
    const c = () => {
      setTimeout(() => {
        if (r.isConnected) {
          const u = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          r.dispatchEvent(u);
        }
      });
    };
    r[o] = JSON.stringify(n), b.push(c);
  }, I = (r, n, o) => {
    switch (!0) {
      case /attrs/.test(n): {
        const c = o.attrs;
        for (const u in c)
          I(r, u, c[u]);
        break;
      }
      case /^on+/.test(n): {
        const c = n.slice(2).toLowerCase();
        r.removeEventListener(c, o), r.addEventListener(c, o);
        break;
      }
      case /ref/.test(n): {
        const c = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: r,
          fn: o
        });
        h.push(c);
        break;
      }
      case /key/.test(n): {
        r[Symbol("key")] = o;
        break;
      }
      case /^data-+/.test(n):
      case /^aria-+/.test(n): {
        n === "data-input" ? P(r, o, Symbol("input")) : r.setAttribute(n, _(o));
        break;
      }
      case /class/.test(n): {
        o ? r.classList.add(...o.split(" ")) : r.setAttribute("class", "");
        break;
      }
      case /value/.test(n): {
        r.nodeName.toLowerCase() === "select" ? C(r, o) : r.value = _(o);
        break;
      }
      case /disabled/.test(n):
      case /checked/.test(n): {
        o ? r.setAttribute(n, o) : r.removeAttribute(n);
        break;
      }
      default:
        r.setAttribute(n, _(o));
    }
  }, p = (r, n) => {
    const o = document.createTreeWalker(r, NodeFilter.SHOW_ELEMENT, null);
    let c = o.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const u = Array.from(c.attributes).filter((l) => i.test(l.nodeName));
        for (const {
          nodeName: l,
          nodeValue: a
        } of u) {
          const E = i.exec(l)[1];
          I(c, a, n[E]), c.removeAttribute(l);
        }
      }
      c = o.nextNode();
    }
  }, m = (r, n) => {
    const o = document.createTreeWalker(r, NodeFilter.SHOW_COMMENT, null);
    let c = o.nextNode(), u;
    for (; c; ) {
      if (u = f.exec(c.data)) {
        const l = Array.isArray(n[u[1]]) ? n[u[1]] : [n[u[1]]];
        c.replaceWith(...l), o.currentNode = r;
      }
      c = o.nextNode();
    }
  }, y = (r, n) => {
    if (!r)
      return [null, ""];
    const o = Object.getOwnPropertySymbols(r).find((u) => u.description === n), c = o ? r[o] : "";
    return [o, c];
  }, v = (r, n) => {
    if (!r || !n || r.nodeType !== 1 || n.nodeType !== 1)
      return;
    const o = r.attributes, c = n.attributes, u = n.getAttribute("data-preserve-attributes"), l = u && u === "true";
    for (const {
      name: a,
      value: E
    } of o)
      (!c[a] || c[a] !== E) && n.setAttribute(a, E);
    if (!l)
      for (const {
        name: a
      } of c)
        o[a] || n.removeAttribute(a);
    if (["input", "textarea"].includes(n.tagName.toLowerCase()) && (n.value = r.value), n.tagName.indexOf("-") > -1 && r.tagName.indexOf("-") > -1) {
      const a = y(r, "input")[1], E = y(n, "input");
      a && E[1] && a !== E[1] && P(n, JSON.parse(a), E[0]);
    }
  }, w = (r) => r.nodeType === 3 ? "text" : r.nodeType === 8 ? "comment" : r.tagName.toLowerCase(), x = (r) => r.childNodes && r.childNodes.length > 0 ? null : r.textContent, F = (r, n, o) => {
    const c = n ? Array.from(n.childNodes) : [], u = r ? Array.from(r.childNodes) : [];
    let l = c.length - u.length;
    if (l > 0)
      for (; l > 0; l--)
        c[c.length - l].parentNode.removeChild(c[c.length - l]);
    u.forEach(function(a, E) {
      const S = c[E], O = y(a, "key")[1], M = y(S, "key")[1];
      if (v(a, S), o && S && S.nodeType === 1 && S.tagName.indexOf("-") > -1)
        return;
      if (!S) {
        n && n.appendChild(a);
        return;
      }
      if (O && M && O !== M || w(a) !== w(S)) {
        S.replaceWith(a);
        return;
      }
      const H = x(a);
      if (H && H !== x(S)) {
        S.textContent = H;
        return;
      }
      if (S.childNodes.length > 0 && a.childNodes.length < 1) {
        S.innerHTML = "";
        return;
      }
      if (S.childNodes.length < 1 && a.childNodes.length > 0) {
        const J = document.createDocumentFragment();
        F(a, J, !1), S.appendChild(J);
        return;
      }
      if (a.childNodes.length > 0) {
        F(a, S, !0);
        return;
      }
    });
  };
  return {
    html: (r, ...n) => {
      let o = "";
      const {
        length: c
      } = r;
      for (let l = 1; l < c; l++) {
        const a = n[l - 1];
        let E = !1;
        if (o += r[l - 1], e.test(o) && t.test(o) && (o = o.replace(e, (S, O, M) => `${s}${l - 1}=${M || '"'}${O}${M ? "" : '"'}`), E = !0), !E)
          switch (!0) {
            case Array.isArray(a):
            case a instanceof DocumentFragment: {
              o += `<!--${d}${l - 1}-->`;
              break;
            }
            case (typeof a == "object" && a !== null): {
              "attrs" in a && (o += `${s}${l - 1}="attrs"`);
              break;
            }
            default:
              o += a ?? "";
          }
      }
      o += r[c - 1];
      const u = D(o.trim());
      return p(u, n), m(u, n), u;
    },
    render: (r, n) => {
      r && !r.children.length ? (r.innerHTML = "", r.appendChild(n)) : F(n, r, !1), h.forEach((o) => {
        o();
      }), h = [], b.forEach((o) => {
        o();
      }), b = [];
    }
  };
})();
class fe {
  constructor(t, s) {
    A(this, "_shadowRoot");
    A(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    A(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    A(this, "emitEvent");
    this._hostElement = t, this._shadowRoot = s;
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
const be = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, U = (e, t) => {
  const s = document.createElement("style");
  return s.innerHTML = e, t && t.appendChild(s), s;
}, ge = async (e, t) => {
  var s, i, d, f, h, b, X, C, Z, P;
  if (e = {
    ...be,
    ...e
  }, K(e.styles)) {
    const I = await e.styles;
    e.styles = I.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !N.isRootNodeSet)
    N.isRootNodeSet = !0, e.styles && (N.globalStyles.replace(e.styles), N.globalStyleTag = U(e.styles, document.head));
  else if (e.root && N.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(e.selector, (P = class extends HTMLElement {
    constructor() {
      super();
      T(this, b);
      T(this, C);
      T(this, s, void 0);
      T(this, i, void 0);
      T(this, d, void 0);
      T(this, f, new ie());
      T(this, h, !1);
      A(this, "renderCount", 0);
      e.shadowDomEncapsulation && se ? (R(this, h, !1), R(this, i, this.attachShadow({
        mode: "open"
      })), g(this, i).adoptedStyleSheets = N.getComputedCss(e.styles, e.standalone)) : (R(this, h, !0), R(this, i, this)), this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), $(this, b, X).call(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const p = g(this, s).render();
      typeof p == "string" ? g(this, i).innerHTML = ce(p) : he(g(this, i), p);
    }
    setProps(p) {
      var m, y;
      for (const [v, w] of Object.entries(p))
        t.observedProperties.find((x) => x === v) && (g(this, s)[v] = w);
      (y = (m = g(this, s)).onPropertiesChanged) == null || y.call(m);
    }
    getInstance() {
      return g(this, s);
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
      var p, m, y, v;
      if (g(this, h)) {
        const w = j();
        this.setAttribute("data-did", w);
        const x = e.styles.replaceAll(":host", `${e.selector}[data-did='${w}']`);
        !e.root && x && R(this, d, U(x, document.head));
      }
      g(this, f).add(z(this, "bindprops", (w) => {
        const x = w.detail.props;
        x && this.setProps(x);
      })), g(this, f).add(z(this, "refresh_component", () => {
        this.update();
      })), (m = (p = g(this, s)).beforeMount) == null || m.call(p), this.update(), (v = (y = g(this, s)).mount) == null || v.call(y);
    }
    attributeChangedCallback(p, m, y) {
      var v, w;
      (w = (v = g(this, s)).onAttributesChanged) == null || w.call(v, p, m, y);
    }
    disconnectedCallback() {
      var p, m, y;
      this.renderCount = 0, (m = (p = g(this, s)).unmount) == null || m.call(p), (y = g(this, d)) == null || y.remove(), g(this, f).unsubscribe();
    }
  }, s = new WeakMap(), i = new WeakMap(), d = new WeakMap(), f = new WeakMap(), h = new WeakMap(), b = new WeakSet(), X = function() {
    const p = new fe(this, g(this, i));
    p.update = () => {
      this.update();
    }, p.emitEvent = (m, y) => {
      $(this, C, Z).call(this, m, y);
    }, g(this, f).add(de(this.setRenderIntoQueue, () => {
      R(this, s, G(ae(this.setRenderIntoQueue, t), e.deps, p));
    }));
  }, C = new WeakSet(), Z = function(p, m) {
    const y = new CustomEvent(p, {
      detail: m
    });
    this.dispatchEvent(y);
  }, P));
}, pe = {
  deps: []
}, ve = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || ge(e, t);
}, xe = (e = {}) => (t) => {
  if (e = {
    ...pe,
    ...e
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((i) => i.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = G(t, e.deps);
  Y.register(t, s);
};
export {
  _e as BehaviourSubjectObs,
  ve as Component,
  xe as Injectable,
  fe as Renderer,
  oe as SubjectObs,
  ie as Subscriptions,
  z as fromEvent,
  we as html,
  Ce as promisify,
  he as render,
  Ae as signal,
  Ee as wrapIntoObservable
};
