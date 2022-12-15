var le = Object.defineProperty;
var ce = (t, e, s) => e in t ? le(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var A = (t, e, s) => (ce(t, typeof e != "symbol" ? e + "" : e, s), s), B = (t, e, s) => {
  if (!e.has(t))
    throw TypeError("Cannot " + s);
};
var n = (t, e, s) => (B(t, e, "read from private field"), s ? s.call(t) : e.get(t)), y = (t, e, s) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, s);
}, C = (t, e, s, r) => (B(t, e, "write to private field"), r ? r.call(t, s) : e.set(t, s), s);
var _ = (t, e, s) => (B(t, e, "access private method"), s);
const x = new class {
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
  getComputedCss(t = "") {
    let e = [];
    const s = new CSSStyleSheet();
    if (s.insertRule(":host { display: block; }"), e = [this.globalStyles, s], t) {
      const r = new CSSStyleSheet();
      r.replace(t), e.push(r);
    }
    return e;
  }
}(), { html: Q, render: ue } = (() => {
  const t = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/, e = /<[a-z][^>]+$/i, s = "attr", r = /^attr([^ ]+)/, h = "insertNode", d = /^insertNode([^ ]+)/;
  let b = [];
  const u = (o) => {
    const i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let c = JSON.stringify(o);
    const l = (a) => i[a] || a;
    return c = ((a) => a.replace(/[&<>\(\)]/g, l))(c), JSON.parse(c);
  }, p = (o, i) => {
    const c = o.options, l = Array.isArray(i) ? i : [i];
    let g, a, f = c.length;
    for (; f--; ) {
      a = c[f];
      const m = a.getAttribute("value") ?? (a.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      (a.selected = l.indexOf(m) > -1) && (g = !0);
    }
    g || (o.selectedIndex = -1);
  }, w = (o) => {
    const i = document.createElement("template");
    return i.innerHTML = o, i.content;
  }, R = (o, i) => {
    const c = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, null);
    let l = c.nextNode();
    for (; l; ) {
      if (l.hasAttributes()) {
        const g = Array.from(l.attributes).filter((a) => r.test(a.nodeName));
        for (const { nodeName: a, nodeValue: f } of g) {
          const m = r.exec(a)[1];
          switch (!0) {
            case /^on+/.test(f): {
              const S = f.slice(2).toLowerCase();
              l.removeEventListener(S, i[m]), S !== "bindprops" ? l.addEventListener(S, i[m]) : l.addEventListener(S, (P) => {
                P.detail.setProps(i[m]());
              });
              break;
            }
            case /ref/.test(f): {
              const S = ((P) => {
                const I = P;
                return () => {
                  I.isConnected && i[m](I);
                };
              })(l);
              b.push(S);
              break;
            }
            case /^data-+/.test(f): {
              l.setAttribute(`data-${f}`, u(i[m]));
              break;
            }
            case /^aria-+/.test(f): {
              l.setAttribute(`aria-${f}`, u(i[m]));
              break;
            }
            case /class/.test(f): {
              i[m] ? l.classList.add(...i[m].split(" ")) : l.setAttribute("class", "");
              break;
            }
            case /value/.test(f): {
              l.nodeName.toLowerCase() === "select" ? p(l, i[m]) : l.value = u(i[m]);
              break;
            }
            case /disabled/.test(f):
            case /checked/.test(f): {
              i[m] ? l.setAttribute(f, i[m]) : l.removeAttribute(f);
              break;
            }
            default:
              l.setAttribute(f, u(i[m]));
          }
          l.removeAttribute(a);
        }
      }
      l = c.nextNode();
    }
  }, E = (o, i) => {
    const c = document.createTreeWalker(o, NodeFilter.SHOW_COMMENT, null);
    let l = c.nextNode(), g;
    for (; l; ) {
      if (g = d.exec(l.data)) {
        const a = Array.isArray(i[g[1]]) ? i[g[1]] : [i[g[1]]];
        l.replaceWith(...a), c.currentNode = o;
      }
      l = c.nextNode();
    }
  }, H = (o, i) => {
    if (!o || !i || o.nodeType !== 1 || i.nodeType !== 1)
      return;
    const c = o.attributes, l = i.attributes;
    for (const { name: g, value: a } of c)
      /class/.test(g) ? Array.from(o.classList).every((f) => {
        i.classList.contains(f) || i.classList.add(f);
      }) : (!l[g] || l[g] !== a) && i.setAttribute(g, a);
    for (const { name: g } of l)
      /class/.test(g) ? Array.from(i.classList).every((a) => {
        o.classList.contains(a) || i.classList.remove(a);
      }) : c[g] || i.removeAttribute(g);
  }, W = (o) => o.nodeType === 3 ? "text" : o.nodeType === 8 ? "comment" : o.tagName.toLowerCase(), K = (o) => o.childNodes && o.childNodes.length > 0 ? null : o.textContent, z = (o, i) => {
    const c = i ? Array.from(i.childNodes) : [], l = o ? Array.from(o.childNodes) : [];
    let g = c.length - l.length;
    if (g > 0)
      for (; g > 0; g--)
        c[c.length - g].parentNode.removeChild(c[c.length - g]);
    l.forEach(function(a, f) {
      const m = c[f];
      if (H(a, m), !m) {
        i && i.appendChild(a);
        return;
      }
      if (W(a) !== W(m)) {
        m.replaceWith(a);
        return;
      }
      const S = K(a);
      if (S && S !== K(m)) {
        m.textContent = S;
        return;
      }
      if (m.childNodes.length > 0 && a.childNodes.length < 1) {
        m.innerHTML = "";
        return;
      }
      if (m.childNodes.length < 1 && a.childNodes.length > 0) {
        const P = document.createDocumentFragment();
        z(a, P), m.appendChild(P);
        return;
      }
      if (a.childNodes.length > 0) {
        z(a, m);
        return;
      }
    });
  };
  return { html: (o, ...i) => {
    let c = "";
    const { length: l } = o;
    for (let a = 1; a < l; a++) {
      const f = i[a - 1];
      let m = !1;
      if (c += o[a - 1], t.test(c) && e.test(c) && (c = c.replace(
        t,
        (S, P, I) => `${s}${a - 1}=${I || '"'}${P}${I ? "" : '"'}`
      ), m = !0), !m)
        switch (!0) {
          case Array.isArray(f):
          case f instanceof DocumentFragment: {
            c += `<!--${h}${a - 1}-->`;
            break;
          }
          case (typeof f == "object" && f !== null): {
            "html" in f && (c += f.html);
            break;
          }
          default:
            c += f;
        }
    }
    c += o[l - 1];
    const g = w(c.trim());
    return R(g, i), E(g, i), g;
  }, render: (o, i) => {
    o && !o.children.length ? (o.innerHTML = "", o.appendChild(i)) : z(i, o), b.forEach((c) => {
      c();
    }), b = [];
  } };
})();
var N, ee;
const te = new (ee = class {
  constructor() {
    y(this, N, void 0);
    C(this, N, /* @__PURE__ */ new WeakMap());
  }
  register(t, e) {
    if (!n(this, N).get(t))
      n(this, N).set(t, e);
    else
      throw console.error(t), "service already exists";
  }
  getService(t) {
    const e = n(this, N).get(t);
    if (e)
      return e;
    throw console.error(t), "service is not a registered service.";
  }
  clear() {
    C(this, N, /* @__PURE__ */ new WeakMap());
  }
}, N = new WeakMap(), ee)(), he = (t) => typeof t == "function", de = (t) => {
  const e = t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  return e.length === 3 ? e[1].split(",").map((s) => s.trim()) : [];
}, J = (() => {
  try {
    return new CSSStyleSheet(), !1;
  } catch {
    return !0;
  }
})(), fe = (t, e, s, r = !1) => (t.addEventListener(e, s, r), () => {
  t.removeEventListener(e, s, r);
}), se = (t, e, s) => {
  if (e.length > 0) {
    const r = [];
    for (const b of e)
      b.__metadata__ ? r.push(s) : r.push(te.getService(b));
    const h = de(t), d = new t(...r);
    return e.forEach((b, u) => {
      d[h[u]] = r[u];
    }), d;
  } else
    return new t();
};
class re {
  constructor() {
    A(this, "shadowRoot");
    A(this, "update");
    A(this, "emitEvent");
  }
  static get __metadata__() {
    return { name: "Renderer" };
  }
}
const me = {
  selector: "",
  root: !1,
  styles: "",
  deps: [],
  standalone: !1
}, X = (t, e) => {
  const s = document.createElement("style");
  return s.innerHTML = t, e && e.appendChild(s), s;
}, ge = (t, e) => {
  var s, r, h, d;
  if (!window.customElements.get(t.selector)) {
    if (t = { ...me, ...t }, t.styles = t.styles.toString(), t.root && !x.isRootNodeSet)
      x.isRootNodeSet = !0, t.styles && (x.globalStyles.replace(t.styles), x.globalStyleTag = X(t.styles, document.head));
    else if (t.root && x.isRootNodeSet)
      throw Error("Cannot register duplicate root component in " + t.selector + " component");
    window.customElements.define(
      t.selector,
      (d = class extends HTMLElement {
        constructor() {
          super();
          y(this, s, void 0);
          y(this, r, void 0);
          y(this, h, void 0);
          C(this, r, this.attachShadow({ mode: "open" })), J || (n(this, r).adoptedStyleSheets = x.getComputedCss(
            t.styles,
            t.standalone
          )), this.getInstance = this.getInstance.bind(this);
        }
        static get observedAttributes() {
          return e.observedAttributes || [];
        }
        emulateComponent() {
          J && t.styles && C(this, h, X(t.styles));
        }
        update() {
          ue(n(this, r), (() => n(this, s).render())()), J && (t.styles && n(this, r).insertBefore(n(this, h), n(this, r).childNodes[0]), x.globalStyleTag && !t.standalone && n(this, r).insertBefore(
            document.importNode(x.globalStyleTag, !0),
            n(this, r).childNodes[0]
          ));
        }
        emitEvent(u, p) {
          const w = new CustomEvent(u, {
            detail: p
          });
          this.dispatchEvent(w);
        }
        setProps(u) {
          var p, w;
          for (const [R, E] of Object.entries(u))
            n(this, s)[R] = E;
          (w = (p = n(this, s)).onPropsChanged) == null || w.call(p), this.update();
        }
        getInstance() {
          return n(this, s);
        }
        connectedCallback() {
          var p, w, R, E;
          this.emulateComponent();
          const u = new re();
          u.shadowRoot = n(this, r), u.update = () => {
            this.update();
          }, u.emitEvent = (H, W) => {
            this.emitEvent(H, W);
          }, C(this, s, se(e, t.deps, u)), (w = (p = n(this, s)).beforeMount) == null || w.call(p), this.update(), (E = (R = n(this, s)).mount) == null || E.call(R), this.emitEvent(
            "bindprops",
            {
              setProps: (H) => {
                this.setProps(H);
              }
            },
            !1
          );
        }
        attributeChangedCallback(u, p, w) {
          var R, E;
          (E = (R = n(this, s)).onNativeAttributeChanges) == null || E.call(R, u, p, w);
        }
        disconnectedCallback() {
          var u, p;
          (p = (u = n(this, s)).unmount) == null || p.call(u);
        }
      }, s = new WeakMap(), r = new WeakMap(), h = new WeakMap(), d)
    );
  }
}, be = (t) => {
  let e;
  switch (t.nodeName && t.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      ["radio", "checkbox"].includes(t.type) ? e = t.checked ? t.value !== null && t.value !== "on" ? t.value : !0 : !1 : e = t.value;
      break;
    }
    case "select": {
      const s = t.type === "select-one", h = [...Array.from(t.options)].filter((d) => d.selected).map((d) => d.value ?? (d.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" "));
      e = s ? h[0] : h;
      break;
    }
    default: {
      e = t.value;
      break;
    }
  }
  return e;
};
var $, v, T, q, ne;
class pe {
  constructor(e, s) {
    y(this, q);
    y(this, $, void 0);
    y(this, v, void 0);
    y(this, T, /* @__PURE__ */ new Map());
    C(this, $, e), C(this, v, s);
  }
  get errors() {
    return n(this, T);
  }
  get valid() {
    return _(this, q, ne).call(this), !n(this, T).size;
  }
  get value() {
    const e = {};
    for (const [s, r] of Object.entries(n(this, v)))
      e[s] = r.value;
    return e;
  }
  get(e) {
    return n(this, v)[e];
  }
  reset(e = {}) {
    for (const s in n(this, v))
      n(this, v)[s].value = e[s] || n(this, $)[s];
    n(this, T).clear();
  }
}
$ = new WeakMap(), v = new WeakMap(), T = new WeakMap(), q = new WeakSet(), ne = function() {
  n(this, T).clear();
  for (const e in n(this, v)) {
    const s = n(this, v)[e].value, r = n(this, v)[e].validators;
    n(this, v)[e].errors = null;
    for (const h of r) {
      const d = h(s);
      d !== null && (n(this, T).has(e) ? (n(this, T).set(e, { ...n(this, T).get(e), ...d }), n(this, v)[e].errors = {
        ...n(this, v)[e].errors,
        ...d
      }) : (n(this, T).set(e, d), n(this, v)[e].errors = d));
    }
  }
};
const Pe = (t) => {
  const e = {}, s = {};
  for (const [b, u] of Object.entries(t)) {
    const p = Array.isArray(u) ? u : [u];
    e[b] = {
      value: p.shift(),
      validators: p
    }, s[b] = e[b].value;
  }
  const r = new pe(s, e);
  return [r, (b) => (u) => {
    const p = be(u.target);
    r.get(b).value = p;
  }, () => {
    r.reset();
  }];
}, xe = (t) => {
  let e = t;
  return [e, (r) => {
    let h;
    he(r) ? h = r(e) : h = r, Object.assign(e, h);
  }];
};
class Ne {
  static required(e) {
    return e.length ? null : { required: !0 };
  }
  static min(e) {
    return (s) => s.length >= e ? null : { minLength: { requiredLength: e } };
  }
  static max(e) {
    return (s) => s.length <= e ? null : { maxLength: { requiredLength: e } };
  }
  static pattern(e) {
    return (s) => new RegExp(e).test(s) ? null : { pattern: !0 };
  }
}
const Y = {
  deps: []
}, ie = (...t) => {
  let e = { ...Y }, s;
  if (t[0].hasOwnProperty("deps") ? (e = { ...Y, ...t[0] }, s = t[1]) : s = t[0], s) {
    const r = se(s, e.deps);
    te.register(s, r);
  } else
    throw new Error("error: Requires constructor to define service");
}, ye = (t) => !!t && typeof t.subscribe == "function", ve = (t) => !!t && typeof t.then == "function", we = (t) => ({
  subscribe: (e) => {
    e(t);
  }
}), Se = (t) => ({
  subscribe: (e) => {
    Promise.resolve(t).then((s) => {
      e(s);
    });
  }
});
class Ce {
  asObservable() {
    return {
      subscribe: (e) => this.subscribe(e)
    };
  }
  subscribe(e) {
    return this.internalFn = e, this.unsubscribe;
  }
  unsubscribe() {
    this._internalFn = null;
  }
  next(e) {
    this.internalFn(e);
  }
}
const Z = (t) => ye(t) ? t : ve(t) ? Se(Promise.resolve(t)) : we(t), O = class {
  static checkParams(e, s) {
    let r = 0, h = {}, d = s.ParamCount;
    for (let u = 0; u < e.length; u++) {
      var b = s.Params[u];
      b.indexOf(":") >= 0 && (h[b.split(":")[1]] = e[u].split("?")[0], r += 1);
    }
    return r === d ? h : {};
  }
  static getParamCount(e) {
    let s = 0;
    return e.forEach((r) => {
      r.indexOf(":") >= 0 && (s += 1);
    }), s;
  }
  static formatRoute(e) {
    let s = {
      Params: {},
      Url: "",
      Template: "",
      ParamCount: 0,
      IsRegistered: !1,
      redirectTo: "",
      canActivate: () => !0
    };
    if (s.Params = e.path.split("/").filter((r) => r.length > 0), s.Url = e.path, s.Template = "", s.redirectTo = e.redirectTo, e.template) {
      if (!e.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      s.Template = e.template, s.TemplatePath = e.templatePath;
    }
    e.canActivate && (s.canActivate = e.canActivate), s.ParamCount = O.getParamCount(s.Params), O.routeList.push(s);
  }
  static preloadRoutes() {
    for (const e of O.routeList)
      e.TemplatePath && e.TemplatePath();
  }
};
let k = O;
A(k, "routeList", []);
var L, M, j, U, ae, D, oe, F, V;
class G {
  constructor() {
    y(this, U);
    y(this, D);
    y(this, F);
    y(this, L, {
      path: "",
      routeParams: /* @__PURE__ */ new Map(),
      queryParams: /* @__PURE__ */ new Map(),
      state: {}
    });
    y(this, M, new Ce());
    y(this, j, void 0);
  }
  startHashChange() {
    C(this, j, fe(window, "hashchange", () => {
      _(this, U, ae).call(this);
    }));
  }
  stopHashChange() {
    n(this, j).call(this);
  }
  getTemplate() {
    return n(this, M).asObservable();
  }
  getCurrentRoute() {
    return n(this, L);
  }
  navigateTo(e = "", s) {
    e ? (window.location.hash.replace(/^#/, "") === e && _(this, F, V).call(this, e, s), window.location.hash = "#" + e) : _(this, F, V).call(this, e, s);
  }
}
L = new WeakMap(), M = new WeakMap(), j = new WeakMap(), U = new WeakSet(), ae = function() {
  const e = window.location.hash.replace(/^#/, "");
  _(this, F, V).call(this, e, null);
}, D = new WeakSet(), oe = function(e, s) {
  if (e) {
    let r = new RegExp(e.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return s.match(r);
  } else
    return e === s;
}, F = new WeakSet(), V = function(e, s) {
  let r = e.split("/").filter((b) => b.length > 0), h = k.routeList.filter((b) => {
    if (b.Params.length === r.length && _(this, D, oe).call(this, b.Url, e))
      return b;
    if (b.Url === e)
      return b;
  }), d = h.length > 0 ? h[0] : null;
  d && (n(this, L).path = e, n(this, L).state = { ...s || {} }, Z(d.canActivate()).subscribe((b) => {
    if (!b)
      return;
    let u = k.checkParams(r, d);
    if (Object.keys(u).length > 0 || e) {
      n(this, L).routeParams = new Map(Object.entries(u));
      const p = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
      n(this, L).queryParams = new Map(p), d.IsRegistered ? n(this, M).next(d.Template) : d.TemplatePath && Z(d.TemplatePath()).subscribe(() => {
        d.IsRegistered = !0, n(this, M).next(d.Template);
      });
    } else
      this.navigateTo(d.redirectTo);
  }));
};
ie(G);
const Le = () => {
  var e, s;
  class t {
    constructor(h, d) {
      y(this, e, "");
      y(this, s, void 0);
      A(this, "update");
    }
    beforeMount() {
      C(this, s, this.internalRouterSrvc.getTemplate().subscribe((h) => {
        C(this, e, h), this.renderer.update();
      })), this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let h = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(h);
    }
    unmount() {
      n(this, s).call(this), this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (n(this, e)) {
        const h = [`${n(this, e)}`];
        return h.raw = [`${n(this, e)}`], Q(h);
      } else
        return Q``;
    }
  }
  e = new WeakMap(), s = new WeakMap(), ge({ selector: "router-outlet", deps: [G, re] }, t);
};
class Te {
  constructor(e) {
  }
  getCurrentRoute() {
    return this.internalRouter.getCurrentRoute();
  }
  navigateTo(e, s) {
    this.internalRouter.navigateTo(e, s);
  }
  registerRoutes(e, s = !1) {
    if (Array.isArray(e)) {
      for (let r of e)
        k.formatRoute(r);
      s && k.preloadRoutes();
    } else
      throw Error("router.addRoutes: the parameter must be an array");
  }
}
ie({ deps: [G] }, Te);
export {
  ge as Component,
  re as Renderer,
  Te as Router,
  ie as Service,
  Ne as Validators,
  fe as fromNativeEvent,
  Q as html,
  Le as registerRouterComponent,
  ue as render,
  Pe as useFormFields,
  xe as useState
};
