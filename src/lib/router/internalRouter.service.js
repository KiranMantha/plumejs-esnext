import { Injectable } from '../decorators';
import { fromEvent } from '../utils';
import { SubjectObs, wrapIntoObservable } from './observable-util';
import { StaticRouter } from './staticRouter';

class InternalRouter {
  #currentRoute = {
    path: '',
    routeParams: new Map(),
    queryParams: new Map(),
    state: {}
  };
  #template = new SubjectObs();
  #unSubscribeHashEvent;
  #routeStateMap = new Map();

  startHashChange() {
    this.#unSubscribeHashEvent = fromEvent(window, 'hashchange', () => {
      this.#registerOnHashChange();
    });
  }

  stopHashChange() {
    this.#unSubscribeHashEvent();
  }

  getTemplate() {
    return this.#template.asObservable();
  }

  getCurrentRoute() {
    return this.#currentRoute;
  }

  navigateTo(path = '', state) {
    if (path) {
      const windowHash = window.location.hash.replace(/^#/, '');
      if (windowHash === path) {
        this.#navigateTo(path, state);
      }
      window.location.hash = '#' + path;
      this.#routeStateMap.clear();
      this.#routeStateMap.set(path, state);
    } else {
      this.#navigateTo(path, state);
    }
  }

  #registerOnHashChange() {
    const path = window.location.hash.replace(/^#/, '');
    const state = this.#routeStateMap.get(path);
    this.#navigateTo(path, state);
  }

  #routeMatcher(route, path) {
    if (route) {
      const _matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
      return path.match(_matcher);
    } else {
      return route === path;
    }
  }

  #navigateTo(path, state) {
    const uParams = path.split('/').filter((h) => {
      return h.length > 0;
    });
    const routeArr = StaticRouter.routeList.filter((route) => {
      if (route.params.length === uParams.length && this.#routeMatcher(route.url, path)) {
        return route;
      } else if (route.url === path) {
        return route;
      }
    });
    const routeItem = routeArr.length > 0 ? routeArr[0] : null;
    if (routeItem) {
      this.#currentRoute.path = path;
      this.#currentRoute.state = { ...(state || {}) };
      wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
        if (!val) return;
        const _params = StaticRouter.checkParams(uParams, routeItem);
        if (Object.keys(_params).length > 0 || path) {
          this.#currentRoute.routeParams = new Map(Object.entries(_params));
          const entries = window.location.hash.split('?')[1]
            ? new URLSearchParams(window.location.hash.split('?')[1]).entries()
            : [];
          this.#currentRoute.queryParams = new Map(entries);
          if (!routeItem.isRegistered) {
            if (routeItem.templatePath) {
              wrapIntoObservable(routeItem.templatePath()).subscribe(() => {
                routeItem.isRegistered = true;
                this.#template.next(routeItem.template);
              });
            }
          } else {
            this.#template.next(routeItem.template);
          }
        } else {
          this.navigateTo(routeItem.redirectTo, state);
        }
      });
    }
  }
}

Injectable()(InternalRouter);
export { InternalRouter };
