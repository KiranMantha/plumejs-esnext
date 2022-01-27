// @flow
import { Service } from '../service';
import { StaticRouter } from './staticRouter';
import { InternalRouter } from './internalRouter.service';

export class Router {
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
   * type that defines route structure
   * @typedef  Route
   */

  /**
   * register routes for routing
   * @param {{path: string, template: string, templatePath: () => Promise, redirectTo: string, canActivate: () => (boolean | Observable<boolean> | Promise<boolean>)}[]} routes
   * @param {boolean} preloadRoutes
   */
  registerRoutes(routes, preloadRoutes = false) {
    if (Array.isArray(routes)) {
      for (let route of routes) {
        StaticRouter.formatRoute(route);
      }
      preloadRoutes && StaticRouter.preloadRoutes();
    } else {
      throw Error('router.addRoutes: the parameter must be an array');
    }
  }
}

Service({ deps: [InternalRouter] }, Router);
