var K = Object.defineProperty;
var X = (e, t, s) => t in e ? K(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var C = (e, t, s) => (X(e, typeof t != "symbol" ? t + "" : t, s), s), F = (e, t, s) => {
  if (!t.has(e))
    throw TypeError("Cannot " + s);
};
var g = (e, t, s) => (F(e, t, "read from private field"), s ? s.call(e) : t.get(e)), R = (e, t, s) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, s);
}, P = (e, t, s, o) => (F(e, t, "write to private field"), o ? o.call(e, s) : t.set(e, s), s);
var H = (e, t, s) => (F(e, t, "access private method"), s);
const Z = (e) => !!e && typeof e.subscribe == "function", z = (e) => !!e && typeof e.then == "function", U = (e) => {
  const t = e.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return t.length === 3 ? t[1].split(",").map((s) => s.trim()) : [];
}, V = (() => {
  try {
    return new CSSStyleSheet(), !0;
  } catch {
    return !1;
  }
})(), ee = (e) => ({
  subscribe: (t) => {
    t(e);
  }
}), te = (e) => ({
  subscribe: (t) => {
    Promise.resolve(e).then((s) => {
      t(s);
    });
  }
}), W = () => Math.random().toString(36).substring(2);
class se {
  constructor() {
    /**
     * @private
     */
    C(this, "_callbackCollection", {});
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
    const s = W();
    return this._callbackCollection[s] = t, () => this.unsubscribe(s);
  }
  next(t) {
    for (const s in this._callbackCollection)
      this._callbackCollection[s](t);
  }
}
class ye extends se {
  constructor(s) {
    super();
    C(this, "_initialValue");
    this._initialValue = s;
  }
  subscribe(s) {
    const o = super.subscribe(s);
    return super.next(this._initialValue), o;
  }
  next(s) {
    this._initialValue = s, super.next(s);
  }
}
class re {
  constructor() {
    C(this, "_subcribers", []);
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
const me = (e) => Z(e) ? e : z(e) ? te(Promise.resolve(e)) : ee(e), j = (e, t, s, o = !1) => (e.addEventListener(t, s, o), () => {
  e.removeEventListener(t, s, o);
}), ne = (e) => {
  const t = () => new DOMParser().parseFromString(e, "text/html").body || document.createElement("body"), s = (S) => {
    const p = S.querySelectorAll("script");
    for (const A of p)
      A.remove();
  }, o = (S, p) => {
    if (p = p.replace(/\s+/g, "").toLowerCase(), ["src", "href", "xlink:href"].includes(S) && (p.includes("javascript:") || p.includes("data:")) || S.startsWith("on"))
      return !0;
  }, u = (S) => {
    const p = S.attributes;
    for (const {
      name: A,
      value: L
    } of p)
      o(A, L) && S.removeAttribute(A);
  }, f = (S) => {
    const p = S.children;
    for (const A of p)
      u(A), f(A);
  }, b = t();
  return s(b), f(b), b.innerHTML;
}, ie = (e, t) => {
  const s = U(t), o = () => ({
    get(u, f) {
      const b = Object.prototype.toString.call(u[f]);
      return ["[object Object]", "[object Array]"].indexOf(b) > -1 && !("__metadata__" in u[f]) ? new Proxy(u[f], o()) : u[f];
    },
    set(u, f, b) {
      return u[f] = b, e(), !0;
    }
  });
  return class extends t {
    constructor(...u) {
      return super(...u), u.forEach((f, b) => {
        s[b] && s[b] !== "undefined" && (this[s[b]] = f);
      }), new Proxy(this, o());
    }
  };
}, Se = () => {
  let e;
  return [new Promise((s) => {
    e = s;
  }), e];
}, oe = (e) => typeof e == "function", $ = /* @__PURE__ */ Object.create(null);
let M = null;
function ce(e, t) {
  const s = M;
  let o;
  M = W(), $[M] = e;
  try {
    t();
  } finally {
    o = M, M = s;
  }
  return o;
}
function _e(e) {
  const t = $[M];
  let s = e;
  function o() {
    return s;
  }
  return o.set = function(u) {
    oe(u) ? s = u(s) : s = u, t();
  }, o;
}
function ae(e, t) {
  const s = ce(e, t);
  return function() {
    delete $[s];
  };
}
var k, J;
const q = new (J = class {
  constructor() {
    R(this, k, void 0);
    P(this, k, /* @__PURE__ */ new WeakMap());
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
    P(this, k, /* @__PURE__ */ new WeakMap());
  }
}, k = new WeakMap(), J)(), B = (e, t, s) => {
  if (t.length > 0) {
    const o = [];
    for (const b of t)
      b.prototype.__metadata__.name !== "RENDERER" ? o.push(q.getService(b)) : o.push(s);
    const u = U(e), f = new e(...o);
    return t.forEach((b, S) => {
      f[u[S]] = o[S];
    }), f;
  } else
    return new e();
}, N = new class {
  constructor() {
    C(this, "globalStyles");
    C(this, "globalStyleTag");
    C(this, "style_registry");
    C(this, "isRootNodeSet");
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
      const o = new CSSStyleSheet();
      o.replace(e), t.push(o);
    }
    return t;
  }
}(), {
  html: Ee,
  render: le
} = (() => {
  const e = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, t = /<[a-z][^>]+$/i, s = "attr", o = /^attr([^ ]+)/, u = "insertNode", f = /^insertNode([^ ]+)/;
  let b = [], S = [];
  const p = (r) => {
    const n = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let i = JSON.stringify(r);
    const c = (a) => n[a] || a;
    return i = ((a) => a.replace(/[&<>\(\)]/g, c))(i), JSON.parse(i);
  }, A = (r, n) => {
    const i = r.options, c = Array.isArray(n) ? n : [n];
    let h, a, l = i.length;
    for (; l--; ) {
      a = i[l];
      const E = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = c.indexOf(E) > -1) && (h = !0);
    }
    h || (r.selectedIndex = -1);
  }, L = (r) => {
    const n = document.createElement("template");
    return n.innerHTML = r, n.content;
  }, O = (r, n, i) => {
    const c = () => {
      setTimeout(() => {
        if (r.isConnected) {
          const h = new CustomEvent("bindprops", {
            detail: {
              props: n
            },
            bubbles: !1
          });
          r.dispatchEvent(h);
        }
      });
    };
    r[i] = JSON.stringify(n), S.push(c);
  }, d = (r, n, i) => {
    switch (!0) {
      case /attrs/.test(n): {
        const c = i.attrs;
        for (const h in c)
          d(r, h, c[h]);
        break;
      }
      case /^on+/.test(n): {
        const c = n.slice(2).toLowerCase();
        r.removeEventListener(c, i), r.addEventListener(c, i);
        break;
      }
      case /ref/.test(n): {
        const c = function() {
          this.node.isConnected && this.fn(this.node);
        }.bind({
          node: r,
          fn: i
        });
        b.push(c);
        break;
      }
      case /^data-+/.test(n):
      case /^aria-+/.test(n): {
        n === "data-input" ? O(r, i, Symbol("input")) : r.setAttribute(n, p(i));
        break;
      }
      case /class/.test(n): {
        i ? r.classList.add(...i.split(" ")) : r.setAttribute("class", "");
        break;
      }
      case /value/.test(n): {
        r.nodeName.toLowerCase() === "select" ? A(r, i) : r.value = p(i);
        break;
      }
      case /disabled/.test(n):
      case /checked/.test(n): {
        i ? r.setAttribute(n, i) : r.removeAttribute(n);
        break;
      }
      default:
        r.setAttribute(n, p(i));
    }
  }, y = (r, n) => {
    const i = document.createTreeWalker(r, NodeFilter.SHOW_ELEMENT, null);
    let c = i.nextNode();
    for (; c; ) {
      if (c.hasAttributes()) {
        const h = Array.from(c.attributes).filter((a) => o.test(a.nodeName));
        for (const {
          nodeName: a,
          nodeValue: l
        } of h) {
          const E = o.exec(a)[1];
          d(c, l, n[E]), c.removeAttribute(a);
        }
      }
      c = i.nextNode();
    }
  }, _ = (r, n) => {
    const i = document.createTreeWalker(r, NodeFilter.SHOW_COMMENT, null);
    let c = i.nextNode(), h;
    for (; c; ) {
      if (h = f.exec(c.data)) {
        const a = Array.isArray(n[h[1]]) ? n[h[1]] : [n[h[1]]];
        c.replaceWith(...a), i.currentNode = r;
      }
      c = i.nextNode();
    }
  }, w = (r, n) => {
    if (!r || !n || r.nodeType !== 1 || n.nodeType !== 1)
      return;
    const i = r.attributes, c = n.attributes, h = n.getAttribute("data-preserve-attributes"), a = h && h === "true";
    for (const {
      name: l,
      value: E
    } of i)
      (!c[l] || c[l] !== E) && n.setAttribute(l, E);
    if (!a)
      for (const {
        name: l
      } of c)
        i[l] || n.removeAttribute(l);
    if (["input", "textarea"].includes(n.tagName.toLowerCase()) && (n.value = r.value), n.tagName.indexOf("-") > -1 && r.tagName.indexOf("-") > -1) {
      const l = Object.getOwnPropertySymbols(r).find((x) => x.description === "input"), E = Object.getOwnPropertySymbols(n).find((x) => x.description === "input"), m = l ? r[l] : "", T = E ? n[E] : "";
      m && T && m !== T && O(n, JSON.parse(m), E);
    }
  }, v = (r) => r.nodeType === 3 ? "text" : r.nodeType === 8 ? "comment" : r.tagName.toLowerCase(), I = (r) => r.childNodes && r.childNodes.length > 0 ? null : r.textContent, D = (r, n, i) => {
    const c = n ? Array.from(n.childNodes) : [], h = r ? Array.from(r.childNodes) : [];
    let a = c.length - h.length;
    if (a > 0)
      for (; a > 0; a--)
        c[c.length - a].parentNode.removeChild(c[c.length - a]);
    h.forEach(function(l, E) {
      const m = c[E];
      if (w(l, m), i && m && m.nodeType === 1 && m.tagName.indexOf("-") > -1)
        return;
      if (!m) {
        n && n.appendChild(l);
        return;
      }
      if (v(l) !== v(m)) {
        m.replaceWith(l);
        return;
      }
      const T = I(l);
      if (T && T !== I(m)) {
        m.textContent = T;
        return;
      }
      if (m.childNodes.length > 0 && l.childNodes.length < 1) {
        m.innerHTML = "";
        return;
      }
      if (m.childNodes.length < 1 && l.childNodes.length > 0) {
        const x = document.createDocumentFragment();
        D(l, x, !1), m.appendChild(x);
        return;
      }
      if (l.childNodes.length > 0) {
        D(l, m, !0);
        return;
      }
    });
  };
  return {
    html: (r, ...n) => {
      let i = "";
      const {
        length: c
      } = r;
      for (let a = 1; a < c; a++) {
        const l = n[a - 1];
        let E = !1;
        if (i += r[a - 1], e.test(i) && t.test(i) && (i = i.replace(e, (m, T, x) => `${s}${a - 1}=${x || '"'}${T}${x ? "" : '"'}`), E = !0), !E)
          switch (!0) {
            case Array.isArray(l):
            case l instanceof DocumentFragment: {
              i += `<!--${u}${a - 1}-->`;
              break;
            }
            case (typeof l == "object" && l !== null): {
              "attrs" in l && (i += `${s}${a - 1}="attrs"`);
              break;
            }
            default:
              i += l || "";
          }
      }
      i += r[c - 1];
      const h = L(i.trim());
      return y(h, n), _(h, n), h;
    },
    render: (r, n) => {
      r && !r.children.length ? (r.innerHTML = "", r.appendChild(n)) : D(n, r, !1), b.forEach((i) => {
        i();
      }), b = [], S.forEach((i) => {
        i();
      }), S = [];
    }
  };
})();
class ue {
  constructor(t, s) {
    C(this, "_shadowRoot");
    C(this, "_hostElement");
    /**
     * {() => void} used to update DOM with new state
     */
    C(this, "update");
    /**
     * @param {string} eventName
     * @param {Object} data to pass
     */
    C(this, "emitEvent");
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
const de = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1,
  shadowDomEncapsulation: !0
}, Q = (e, t) => {
  const s = document.createElement("style");
  return s.innerHTML = e, t && t.appendChild(s), s;
}, he = async (e, t) => {
  var s, o, u, f, b, Y, p, G, L;
  if (e = {
    ...de,
    ...e
  }, z(e.styles)) {
    const O = await e.styles;
    e.styles = O.default.toString();
  }
  if (e.styles = e.styles.toString(), e.root && !N.isRootNodeSet)
    N.isRootNodeSet = !0, e.styles && (N.globalStyles.replace(e.styles), N.globalStyleTag = Q(e.styles, document.head));
  else if (e.root && N.isRootNodeSet)
    throw Error("Cannot register duplicate root component in " + e.selector + " component");
  window.customElements.define(e.selector, (L = class extends HTMLElement {
    constructor() {
      super();
      R(this, b);
      R(this, p);
      R(this, s, void 0);
      R(this, o, void 0);
      R(this, u, void 0);
      R(this, f, new re());
      C(this, "renderCount", 0);
      if (e.shadowDomEncapsulation && V)
        P(this, o, this.attachShadow({
          mode: "open"
        })), g(this, o).adoptedStyleSheets = N.getComputedCss(e.styles, e.standalone);
      else {
        P(this, o, this);
        const d = W();
        this.setAttribute("data-did", d);
        const y = e.styles.replaceAll(":host", `${e.selector}[data-did='${d}']`);
        !e.root && y && P(this, u, Q(y, document.head));
      }
      this.getInstance = this.getInstance.bind(this), this.update = this.update.bind(this), this.setRenderIntoQueue = this.setRenderIntoQueue.bind(this), H(this, b, Y).call(this);
    }
    static get observedAttributes() {
      return t.observedAttributes || [];
    }
    update() {
      const d = g(this, s).render();
      typeof d == "string" ? g(this, o).innerHTML = ne(d) : le(g(this, o), d);
    }
    setProps(d) {
      var y, _;
      for (const [w, v] of Object.entries(d))
        t.observedProperties.find((I) => I === w) && (g(this, s)[w] = v);
      (_ = (y = g(this, s)).onPropertiesChanged) == null || _.call(y);
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
      var d, y, _, w;
      g(this, f).add(j(this, "bindprops", (v) => {
        const I = v.detail.props;
        I && this.setProps(I);
      })), g(this, f).add(j(this, "refresh_component", () => {
        this.update();
      })), (y = (d = g(this, s)).beforeMount) == null || y.call(d), this.update(), (w = (_ = g(this, s)).mount) == null || w.call(_);
    }
    attributeChangedCallback(d, y, _) {
      var w, v;
      (v = (w = g(this, s)).onAttributesChanged) == null || v.call(w, d, y, _);
    }
    disconnectedCallback() {
      var d, y, _;
      this.renderCount = 0, (y = (d = g(this, s)).unmount) == null || y.call(d), (_ = g(this, u)) == null || _.remove(), g(this, f).unsubscribe();
    }
  }, s = new WeakMap(), o = new WeakMap(), u = new WeakMap(), f = new WeakMap(), b = new WeakSet(), Y = function() {
    const d = new ue(this, g(this, o));
    d.update = () => {
      this.update();
    }, d.emitEvent = (y, _) => {
      H(this, p, G).call(this, y, _);
    }, g(this, f).add(ae(this.setRenderIntoQueue, () => {
      P(this, s, B(ie(this.setRenderIntoQueue, t), e.deps, d));
    }));
  }, p = new WeakSet(), G = function(d, y) {
    const _ = new CustomEvent(d, {
      detail: y
    });
    this.dispatchEvent(_);
  }, L));
}, fe = {
  deps: []
}, Ce = (e) => (t) => {
  if (e.selector.indexOf("-") <= 0)
    throw new Error("You need at least 1 dash in the custom element name!");
  window.customElements.get(e.selector) || he(e, t);
}, we = (e = {}) => (t) => {
  if (e = {
    ...fe,
    ...e
  }, t.prototype.__metadata__ = {
    name: "SERVICE"
  }, e.deps.some((o) => o.prototype.__metadata__.name === "RENDERER"))
    throw Error("Renderer cannot be a dependency for a service. It should be used with component");
  const s = B(t, e.deps);
  q.register(t, s);
};
export {
  ye as BehaviourSubjectObs,
  Ce as Component,
  we as Injectable,
  ue as Renderer,
  se as SubjectObs,
  re as Subscriptions,
  j as fromEvent,
  Ee as html,
  Se as promisify,
  le as render,
  _e as signal,
  me as wrapIntoObservable
};
