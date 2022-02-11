var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var _weakMap, _a, _currentRoute, _template, _unSubscribeHashEvent, _registerOnHashChange, registerOnHashChange_fn, _routeMatcher, routeMatcher_fn, _navigateTo, navigateTo_fn;
const { html, render } = (() => {
  const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  const isNodeRegex = /<[a-z][^>]+$/i;
  const attributePrefix = "attr";
  const attributeRegex = /^attr([^ ]+)/;
  const insertNodePrefix = "insertNode";
  const insertNodeRegex = /^insertNode([^ ]+)/;
  const _sanitize = (data) => {
    const tagsToReplace = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "(": "%28",
      ")": "%29"
    };
    let str = JSON.stringify(data);
    const replaceTag = (tag) => tagsToReplace[tag] || tag;
    const safe_tags_replace = (str2) => str2.replace(/[&<>\(\)]/g, replaceTag);
    str = safe_tags_replace(str);
    return JSON.parse(str);
  };
  const _setValuesForDropdown = (node, value) => {
    var _a2;
    const options = node.options, values = Array.isArray(value) ? value : [value];
    let optionSet, option, i = options.length;
    while (i--) {
      option = options[i];
      const value2 = (_a2 = option.getAttribute("value")) != null ? _a2 : (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      if (option.selected = values.indexOf(value2) > -1) {
        optionSet = true;
      }
    }
    if (!optionSet) {
      node.selectedIndex = -1;
    }
  };
  const _createFragment = (markup) => {
    const temp = document.createElement("template");
    temp.innerHTML = markup;
    return temp.content;
  };
  const _bindFragments = (fragment, values) => {
    const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
    let node = elementsWalker.nextNode();
    while (node) {
      if (node.hasAttributes()) {
        const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
        for (const { nodeName, nodeValue } of customAttributes) {
          const i = attributeRegex.exec(nodeName)[1];
          switch (true) {
            case /^on+/.test(nodeValue): {
              const eventName = nodeValue.slice(2).toLowerCase();
              node.removeEventListener(eventName, values[i]);
              if (eventName !== "bindprops") {
                node.addEventListener(eventName, values[i]);
              } else {
                node.addEventListener(eventName, (event) => {
                  event.detail.setProps(values[i]());
                });
              }
              break;
            }
            case /ref/.test(nodeValue): {
              values[i](node);
              break;
            }
            case /^data-+/.test(nodeValue): {
              node.setAttribute(`data-${nodeValue}`, _sanitize(values[i]));
              break;
            }
            case /^aria-+/.test(nodeValue): {
              node.setAttribute(`aria-${nodeValue}`, _sanitize(values[i]));
              break;
            }
            case /class/.test(nodeValue): {
              if (values[i]) {
                node.classList.add(...values[i].split(" "));
              } else {
                node.setAttribute("class", "");
              }
              break;
            }
            case /value/.test(nodeValue): {
              if (node.nodeName.toLowerCase() === "select") {
                _setValuesForDropdown(node, values[i]);
              } else {
                node.value = _sanitize(values[i]);
              }
              break;
            }
            case /disabled/.test(nodeValue):
            case /checked/.test(nodeValue): {
              if (values[i]) {
                node.setAttribute(nodeValue, values[i]);
              } else {
                node.removeAttribute(nodeValue);
              }
              break;
            }
            default: {
              node.setAttribute(nodeValue, _sanitize(values[i]));
            }
          }
          node.removeAttribute(nodeName);
        }
      }
      node = elementsWalker.nextNode();
    }
  };
  const _replaceInsertNodeComments = (fragment, values) => {
    const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
    let node = commentsWalker.nextNode(), match;
    while (node) {
      if (match = insertNodeRegex.exec(node.data)) {
        const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
        node.replaceWith(...nodesList);
        commentsWalker.currentNode = fragment;
      }
      node = commentsWalker.nextNode();
    }
  };
  const html2 = (templates, ...values) => {
    let result = "";
    const { length } = templates;
    for (let i = 1; i < length; i++) {
      const variable = values[i - 1];
      let isAttributePart = false;
      result += templates[i - 1];
      if (isAttributeRegex.test(result) && isNodeRegex.test(result)) {
        result = result.replace(isAttributeRegex, (_, $1, $2) => `${attributePrefix}${i - 1}=${$2 || '"'}${$1}${$2 ? "" : '"'}`);
        isAttributePart = true;
      }
      if (!isAttributePart) {
        switch (true) {
          case Array.isArray(variable):
          case variable instanceof DocumentFragment: {
            result += `<!--${insertNodePrefix}${i - 1}-->`;
            break;
          }
          case (typeof variable === "object" && variable !== null): {
            if ("html" in variable) {
              result += variable["html"];
            }
            break;
          }
          default: {
            result += variable;
          }
        }
      }
    }
    result += templates[length - 1];
    const fragment = _createFragment(result.trim());
    _bindFragments(fragment, values);
    _replaceInsertNodeComments(fragment, values);
    return fragment;
  };
  const render2 = (where, what) => {
    where.innerHTML = "";
    where.appendChild(what);
  };
  return { html: html2, render: render2 };
})();
const Injector = new (_a = class {
  constructor() {
    __privateAdd(this, _weakMap, void 0);
    __privateSet(this, _weakMap, new WeakMap());
  }
  register(klass, instance) {
    if (!__privateGet(this, _weakMap).get(klass)) {
      __privateGet(this, _weakMap).set(klass, instance);
    } else {
      console.error(klass);
      throw "service already exists";
    }
  }
  getService(klass) {
    const instance = __privateGet(this, _weakMap).get(klass);
    if (instance) {
      return instance;
    } else {
      console.error(klass);
      throw "service is not a registered service.";
    }
  }
  clear() {
    __privateSet(this, _weakMap, new WeakMap());
  }
}, _weakMap = new WeakMap(), _a)();
const isFunction = (value) => typeof value === "function";
const getArgs = (func) => {
  const result = func.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
  if (result.length === 3) {
    return result[1].split(",").map((a) => a.trim());
  }
  return [];
};
const CSS_SHEET_NOT_SUPPORTED = (() => {
  try {
    new CSSStyleSheet();
    return false;
  } catch (e) {
    return true;
  }
})();
const fromNativeEvent = (target, eventName, onNext, options = false) => {
  target.addEventListener(eventName, onNext, options);
  const unsubscribe = () => {
    target.removeEventListener(eventName, onNext, options);
  };
  return unsubscribe;
};
const instantiate = (klass, deps, rendererInstance) => {
  if (deps.length > 0) {
    const services = [];
    for (const dependency of deps) {
      if (!dependency.__metadata__) {
        services.push(Injector.getService(dependency));
      } else {
        services.push(rendererInstance);
      }
    }
    const constructorArgs = getArgs(klass);
    const instance = new klass(...services);
    deps.forEach((arg, i) => {
      instance[constructorArgs[i]] = services[i];
    });
    return instance;
  } else {
    return new klass();
  }
};
const componentRegistry = new class {
  constructor() {
    __publicField(this, "globalStyles");
    __publicField(this, "globalStyleTag");
    __publicField(this, "style_registry");
    __publicField(this, "isRootNodeSet");
    this.globalStyles = new CSSStyleSheet();
    this.isRootNodeSet = false;
  }
  getComputedCss(styles = "") {
    let csoArray = [];
    const defaultStyles = new CSSStyleSheet();
    defaultStyles.insertRule(":host { display: block; }");
    csoArray = [this.globalStyles, defaultStyles];
    if (styles) {
      const sheet = new CSSStyleSheet();
      sheet.replace(styles);
      csoArray.push(sheet);
    }
    return csoArray;
  }
}();
class Renderer {
  constructor() {
    __publicField(this, "shadowRoot");
    __publicField(this, "update");
    __publicField(this, "emitEvent");
  }
  static get __metadata__() {
    return { name: "Renderer" };
  }
}
const COMPONENT_DATA_ATTR = "data-compid";
const DEFAULT_COMPONENT_OPTIONS = {
  selector: "",
  root: false,
  styles: "",
  useShadow: true,
  deps: []
};
const transformCSS = (styles, selector) => {
  if (styles) {
    styles = selector + " " + styles.replace("}", ` } ${selector} `);
  }
  return styles;
};
const createStyleTag = (content, where) => {
  const tag = document.createElement("style");
  tag.innerHTML = content;
  where && where.appendChild(tag);
  return tag;
};
const Component = (componentOptions, klass) => {
  var _klass, _shadow, _componentStyleTag, _a2;
  if (window.customElements.get(componentOptions.selector)) {
    return;
  }
  componentOptions = __spreadValues(__spreadValues({}, DEFAULT_COMPONENT_OPTIONS), componentOptions);
  componentOptions.styles = componentOptions.styles.toString();
  if (componentOptions.root && !componentRegistry.isRootNodeSet) {
    componentRegistry.isRootNodeSet = true;
    if (componentOptions.styles) {
      componentRegistry.globalStyles.replace(componentOptions.styles);
      componentRegistry.globalStyleTag = createStyleTag(componentOptions.styles, document.head);
    }
  } else if (componentOptions.root && componentRegistry.isRootNodeSet) {
    throw Error("Cannot register duplicate root component in " + componentOptions.selector + " component");
  }
  window.customElements.define(componentOptions.selector, (_a2 = class extends HTMLElement {
    constructor() {
      super();
      __privateAdd(this, _klass, void 0);
      __privateAdd(this, _shadow, void 0);
      __privateAdd(this, _componentStyleTag, void 0);
      __privateSet(this, _shadow, this.attachShadow({ mode: "open" }));
      if (!CSS_SHEET_NOT_SUPPORTED) {
        __privateGet(this, _shadow).adoptedStyleSheets = componentRegistry.getComputedCss(componentOptions.styles);
      }
      this.update = this.update.bind(this);
      this.emitEvent = this.emitEvent.bind(this);
      this.setProps = this.setProps.bind(this);
      this.getInstance = this.getInstance.bind(this);
    }
    emulateComponent() {
      if (CSS_SHEET_NOT_SUPPORTED && componentOptions.styles) {
        const id = new Date().getTime() + Math.floor(Math.random() * 1e3 + 1);
        const compiledCSS = transformCSS(componentOptions.styles, `[${COMPONENT_DATA_ATTR}="${id.toString()}"]`);
        __privateSet(this, _componentStyleTag, createStyleTag(compiledCSS));
        this.setAttribute(COMPONENT_DATA_ATTR, id.toString());
      }
    }
    connectedCallback() {
      this.emulateComponent();
      const rendererInstance = new Renderer();
      rendererInstance.shadowRoot = __privateGet(this, _shadow);
      rendererInstance.update = this.update;
      rendererInstance.emitEvent = this.emitEvent;
      __privateSet(this, _klass, instantiate(klass, componentOptions.deps, rendererInstance));
      __privateGet(this, _klass).beforeMount && __privateGet(this, _klass).beforeMount();
      this.update();
      __privateGet(this, _klass).mount && __privateGet(this, _klass).mount();
      this.emitEvent("bindprops", { setProps: this.setProps }, false);
    }
    update() {
      render(__privateGet(this, _shadow), __privateGet(this, _klass).render.bind(__privateGet(this, _klass))());
      if (CSS_SHEET_NOT_SUPPORTED) {
        componentOptions.styles && __privateGet(this, _shadow).insertBefore(__privateGet(this, _componentStyleTag), __privateGet(this, _shadow).childNodes[0]);
        componentRegistry.globalStyleTag && __privateGet(this, _shadow).insertBefore(document.importNode(componentRegistry.globalStyleTag, true), __privateGet(this, _shadow).childNodes[0]);
      }
    }
    emitEvent(eventName, data) {
      const event = new CustomEvent(eventName, {
        detail: data
      });
      this.dispatchEvent(event);
    }
    setProps(propsObj) {
      for (const [key, value] of Object.entries(propsObj)) {
        __privateGet(this, _klass)[key] = value;
      }
      __privateGet(this, _klass).onPropsChanged && __privateGet(this, _klass).onPropsChanged();
      this.update();
    }
    getInstance() {
      return __privateGet(this, _klass);
    }
    disconnectedCallback() {
      __privateGet(this, _klass).unmount && __privateGet(this, _klass).unmount();
    }
  }, _klass = new WeakMap(), _shadow = new WeakMap(), _componentStyleTag = new WeakMap(), _a2));
};
const SERVICE_OPTIONS_DEFAULTS = {
  deps: []
};
const Service = (...args) => {
  let options = __spreadValues({}, SERVICE_OPTIONS_DEFAULTS);
  let klass;
  if (args[0].hasOwnProperty("deps")) {
    options = __spreadValues(__spreadValues({}, SERVICE_OPTIONS_DEFAULTS), args[0]);
    klass = args[1];
  } else {
    klass = args[0];
  }
  if (klass) {
    const instance = instantiate(klass, options.deps);
    Injector.register(klass, instance);
  } else {
    throw new Error("error: Requires constructor to define service");
  }
};
const _StaticRouter = class {
  static checkParams(up, r) {
    let pmc = 0, po = {}, pc = r.ParamCount;
    for (let i = 0; i < up.length; i++) {
      var rtParam = r.Params[i];
      if (rtParam.indexOf(":") >= 0) {
        po[rtParam.split(":")[1]] = up[i];
        pmc += 1;
      }
    }
    if (pmc === pc) {
      return po;
    }
    return {};
  }
  static getParamCount(p) {
    let pc = 0;
    p.forEach((k) => {
      if (k.indexOf(":") >= 0) {
        pc += 1;
      }
    });
    return pc;
  }
  static formatRoute(r) {
    let obj = {
      Params: {},
      Url: "",
      Template: "",
      ParamCount: 0,
      IsRegistered: false,
      redirectTo: "",
      canActivate: () => true
    };
    obj.Params = r.path.split("/").filter((h) => {
      return h.length > 0;
    });
    obj.Url = r.path;
    obj.Template = "";
    obj.redirectTo = r.redirectTo;
    if (r.template) {
      if (!r.templatePath)
        throw Error("templatePath is required in route if template is mentioned.");
      obj.Template = r.template;
      obj.TemplatePath = r.templatePath;
    }
    if (r.canActivate)
      obj.canActivate = r.canActivate;
    obj.ParamCount = _StaticRouter.getParamCount(obj.Params);
    _StaticRouter.routeList.push(obj);
  }
  static preloadRoutes() {
    for (const route of _StaticRouter.routeList) {
      route.TemplatePath && route.TemplatePath();
    }
  }
};
let StaticRouter = _StaticRouter;
__publicField(StaticRouter, "routeList", []);
const isObservable = (obj) => !!obj && typeof obj.subscribe === "function";
const isPromise = (obj) => !!obj && typeof obj.then === "function";
const ofObs = (input) => ({
  subscribe: (fn) => {
    fn(input);
  }
});
const fromPromiseObs = (input) => ({
  subscribe: (fn) => {
    Promise.resolve(input).then((value) => {
      fn(value);
    });
  }
});
class SubjectObs {
  asObservable() {
    return {
      subscribe: (fn) => this.subscribe(fn)
    };
  }
  subscribe(fn) {
    this.internalFn = fn;
    return this.unsubscribe;
  }
  unsubscribe() {
    this._internalFn = null;
  }
  next(value) {
    this.internalFn(value);
  }
}
const wrapIntoObservable = (value) => {
  if (isObservable(value)) {
    return value;
  }
  if (isPromise(value)) {
    return fromPromiseObs(Promise.resolve(value));
  }
  return ofObs(value);
};
class InternalRouter {
  constructor() {
    __privateAdd(this, _registerOnHashChange);
    __privateAdd(this, _routeMatcher);
    __privateAdd(this, _navigateTo);
    __privateAdd(this, _currentRoute, {
      path: "",
      routeParams: new Map(),
      queryParams: new Map(),
      state: {}
    });
    __privateAdd(this, _template, new SubjectObs());
    __privateAdd(this, _unSubscribeHashEvent, void 0);
  }
  startHashChange() {
    __privateSet(this, _unSubscribeHashEvent, fromNativeEvent(window, "hashchange", () => {
      __privateMethod(this, _registerOnHashChange, registerOnHashChange_fn).call(this);
    }));
  }
  stopHashChange() {
    __privateGet(this, _unSubscribeHashEvent).call(this);
  }
  getTemplate() {
    return __privateGet(this, _template).asObservable();
  }
  getCurrentRoute() {
    return __privateGet(this, _currentRoute);
  }
  navigateTo(path = "", state) {
    if (path) {
      let windowHash = window.location.hash.replace(/^#/, "");
      if (windowHash === path) {
        __privateMethod(this, _navigateTo, navigateTo_fn).call(this, path, state);
      }
      window.location.hash = "#" + path;
    } else {
      __privateMethod(this, _navigateTo, navigateTo_fn).call(this, path, state);
    }
  }
}
_currentRoute = new WeakMap();
_template = new WeakMap();
_unSubscribeHashEvent = new WeakMap();
_registerOnHashChange = new WeakSet();
registerOnHashChange_fn = function() {
  const path = window.location.hash.replace(/^#/, "");
  __privateMethod(this, _navigateTo, navigateTo_fn).call(this, path, null);
};
_routeMatcher = new WeakSet();
routeMatcher_fn = function(route, path) {
  if (route) {
    let _matcher = new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)"));
    return path.match(_matcher);
  } else {
    return route === path;
  }
};
_navigateTo = new WeakSet();
navigateTo_fn = function(path, state) {
  let uParams = path.split("/").filter((h) => {
    return h.length > 0;
  });
  let routeArr = StaticRouter.routeList.filter((route) => {
    if (route.Params.length === uParams.length && __privateMethod(this, _routeMatcher, routeMatcher_fn).call(this, route.Url, path)) {
      return route;
    } else if (route.Url === path) {
      return route;
    }
  });
  let routeItem = routeArr.length > 0 ? routeArr[0] : null;
  if (routeItem) {
    __privateGet(this, _currentRoute).path = path;
    __privateGet(this, _currentRoute).state = __spreadValues({}, state || {});
    wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
      if (!val)
        return;
      let _params = StaticRouter.checkParams(uParams, routeItem);
      if (Object.keys(_params).length > 0 || path) {
        __privateGet(this, _currentRoute).routeParams = new Map(Object.entries(_params));
        const entries = window.location.hash.split("?")[1] ? new URLSearchParams(window.location.hash.split("?")[1]).entries() : [];
        __privateGet(this, _currentRoute).queryParams = new Map(entries);
        if (!routeItem.IsRegistered) {
          if (routeItem.TemplatePath) {
            wrapIntoObservable(routeItem.TemplatePath()).subscribe((res) => {
              routeItem.IsRegistered = true;
              __privateGet(this, _template).next(routeItem.Template);
            });
          }
        } else {
          __privateGet(this, _template).next(routeItem.Template);
        }
      } else {
        this.navigateTo(routeItem.redirectTo);
      }
    });
  }
};
Service(InternalRouter);
class Router {
  constructor(internalRouter) {
  }
  getCurrentRoute() {
    return this.internalRouter.getCurrentRoute();
  }
  navigateTo(path, state) {
    this.internalRouter.navigateTo(path, state);
  }
  registerRoutes(routes, preloadRoutes = false) {
    if (Array.isArray(routes)) {
      for (let route of routes) {
        StaticRouter.formatRoute(route);
      }
      preloadRoutes && StaticRouter.preloadRoutes();
    } else {
      throw Error("router.addRoutes: the parameter must be an array");
    }
  }
}
Service({ deps: [InternalRouter] }, Router);
const registerRouterComponent = () => {
  var _template2, _subscriptions;
  class RouterComponent {
    constructor(internalRouterSrvc, renderer) {
      __privateAdd(this, _template2, "");
      __privateAdd(this, _subscriptions, void 0);
      __publicField(this, "update");
    }
    beforeMount() {
      __privateSet(this, _subscriptions, this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
        __privateSet(this, _template2, tmpl);
        this.renderer.update();
      }));
      this.internalRouterSrvc.startHashChange();
    }
    mount() {
      let path = window.location.hash.replace(/^#/, "");
      this.internalRouterSrvc.navigateTo(path);
    }
    unmount() {
      __privateGet(this, _subscriptions).call(this);
      this.internalRouterSrvc.stopHashChange();
    }
    render() {
      if (__privateGet(this, _template2)) {
        const stringArray = [`${__privateGet(this, _template2)}`];
        stringArray.raw = [`${__privateGet(this, _template2)}`];
        return html(stringArray);
      } else {
        return html``;
      }
    }
  }
  _template2 = new WeakMap();
  _subscriptions = new WeakMap();
  Component({ selector: "router-outlet", deps: [InternalRouter, Renderer] }, RouterComponent);
};
const useState = (obj) => {
  let initialState = obj;
  const reducer = (fn) => {
    let newState;
    if (isFunction(fn)) {
      newState = fn(initialState);
    } else {
      newState = fn;
    }
    Object.assign(initialState, newState);
  };
  return [initialState, reducer];
};
const _getTargetValue = (target) => {
  let targetValue;
  switch (target.nodeName && target.nodeName.toLowerCase()) {
    case "input":
    case "textarea": {
      let nonTextElements = ["radio", "checkbox"];
      if (nonTextElements.includes(target.type)) {
        targetValue = target.checked ? target.value !== null && target.value !== "on" ? target.value : true : false;
      } else {
        targetValue = target.value;
      }
      break;
    }
    case "select": {
      const one = target.type === "select-one";
      const options = Array.from(target.options);
      const value = [...options].filter((option) => option.selected).map((option) => {
        var _a2;
        return (_a2 = option.value) != null ? _a2 : (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
      });
      targetValue = one ? value[0] : value;
      break;
    }
    default: {
      targetValue = target.value;
      break;
    }
  }
  return targetValue;
};
const useFormFields = (initialValues) => {
  let [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    let target = e.target;
    const value = _getTargetValue(target);
    setFormFields(() => {
      formFields[key] = value;
      return formFields;
    });
  };
  const resetFormFields = () => {
    for (const key of Object.keys(formFields)) {
      formFields[key] = "";
    }
  };
  return [formFields, createChangeHandler, resetFormFields];
};
export { Component, Renderer, Service, fromNativeEvent, html, registerRouterComponent, render, useFormFields, useState };
