import { Service } from "./service";
import { toObservable } from "./utils";
import { Subject } from "rxjs";

const getParamCount = p => {
  let pc = 0;
  p.forEach(function(k, i) {
    if (k.indexOf(":") >= 0) {
      pc += 1;
    }
  });
  return pc;
};

class Route {
  constructor(r) {
    this.Params = r.path.split("/").filter(function(h) {
      return h.length > 0;
    });
    this.Url = r.path;
    this.template = "";
    if (r.template && r.templatePath) {
      this.template = r.template;
      this.templatePath = r.templatePath;
    } else {
      throw Error("template and templatPath for route are required");
    }
    this.ParamCount = getParamCount(this.Params);
    this.IsRegistered = false;
    if (r.canActivate) {
      this.canActivate = r.canActivate;
    } else {
      this.canActivate = () => true;
    }
  }
}

class Router {
  currentRoute = {};
  routeList = [];
  templateSubscriber = new Subject();

  constructor() {
    window.addEventListener(
      "hashchange",
      () => {
        this._registerOnHashChange();
      },
      false
    );

    return {
      internalRouterService: Object.freeze({
        templateSubscriber: this.templateSubscriber
      }),
      serviceApi: Object.freeze({
        addRoutes: this.addRoutes.bind(this),
        currentRoute: this._getCurrentRoute.bind(this),
        navigateTo: this.navigateTo.bind(this)
      })
    };
  }

  _registerOnHashChange() {
    const path = window.location.hash.replace(/^#/, "");
    this._navigateTo(path);
  }

  _checkParams(up, r) {
    let pmc = 0,
      po = {},
      pc = r.ParamCount;

    for (const i = 0; i < up.length; i++) {
      const rtParam = r.Params[i];
      if (rtParam.indexOf(":") >= 0) {
        po[rtParam.split(":")[1]] = up[i];
        pmc += 1;
      }
    }
    if (pmc === pc) {
      return po;
    }
    return false;
  }

  _routeMatcher(route, path) {
    if (route) {
      let _matcher = new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)"));
      return path.match(_matcher);
    } else {
      return route === path;
    }
  }

  _navigateTo(path) {
    const uParams = path.split("/").filter(function(h) {
      return h.length > 0;
    });
    const routeArr = this.routeList.filter(route => {
      if (
        route.Params.length === uParams.length &&
        this._routeMatcher(route.Url, path)
      ) {
        return route;
      } else if (route.Url === path) {
        return route;
      }
    });
    let route = routeArr.length > 0 ? routeArr[0] : null;
    if (route) {
      toObservable(route.canActivate()).subscribe(val => {
        if (!val) return;
        const _params = this._checkParams(uParams, route);
        if (
          _params &&
          (Object.keys(_params).length > 0 || path === route.Url)
        ) {
          this.currentRoute.params = _params;
          if (!route.IsRegistered) {
            toObservable(route.templatePath()).subscribe(() => {
              route.IsRegistered = true;
              this.templateSubscriber.next(route.template);
            });
          } else {
            this.templateSubscriber.next(route.template);
          }
        }
      });
    }
  }

  _getCurrentRoute() {
    return this.currentRoute;
  }

  addRoutes(routes) {
    if (typeof routes && routes instanceof Array) {
      for (const r of routes) {
        this.routeList.push(new Route(r));
      }
    } else {
      throw Error("router.addRoutes: the parameter must be an array");
    }
  }

  navigateTo(path) {
    if (path) {
      let windowHash = window.location.hash.replace(/^#/, "");
      if (windowHash === path) {
        this._navigateTo(path);
      }
      window.location.hash = "#" + path;
    } else {
      this._navigateTo(path);
    }
  }
}

const { serviceApi, internalRouterService } = new Router();
Service("RouterService", serviceApi);
Service("InternalRouterService", internalRouterService);
