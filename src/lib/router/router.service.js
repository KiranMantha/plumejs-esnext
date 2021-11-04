import { Service } from '../service';
import { StaticRouter } from './staticRouter';

Service('Router', ['InternalRouter', class {
  getCurrentRoute;
  navigateTo;
  constructor(internalRouter) {
    this.getCurrentRoute = internalRouter.getCurrentRoute.bind(internalRouter);
    this.navigateTo = internalRouter.navigateTo.bind(internalRouter);
  }
  registerRoutes(routes) {
    if (Array.isArray(routes)) {
      for (let route of routes) {
        StaticRouter.formatRoute(route);
      }
    } else {
      throw Error('router.addRoutes: the parameter must be an array');
    }
  }
}]);
