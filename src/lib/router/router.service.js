import { Injectable } from '../decorators';
import { InternalRouter } from './internalRouter.service';
import { StaticRouter } from './staticRouter';

class Router {
  constructor(internalRouter) {}

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
  navigateTo(path, state) {
    this.internalRouter.navigateTo(path, state);
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
  registerRoutes(routes, preloadAllRoutes = false, isHashBasedRouting = false) {
    if (isHashBasedRouting) {
      StaticRouter.isHistoryBasedRouting = !isHashBasedRouting;
    }

    if (Array.isArray(routes)) {
      for (const route of routes) {
        StaticRouter.formatRoute(route);
      }
      if (preloadAllRoutes) {
        StaticRouter.preloadRoutes();
      } else {
        StaticRouter.preloadSelectedRoutes();
      }
    } else {
      throw Error('router.addRoutes: the parameter must be an array');
    }
  }
}

Injectable({ deps: [InternalRouter] })(Router);
export { Router };
