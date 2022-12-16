import { Service } from '../service';
import { fromNativeEvent } from '../utils';
import { SubjectObs, wrapIntoObservable } from './observable-util';
import { StaticRouter } from './staticRouter';

export class InternalRouter {
  #currentRoute = {
    path: '',
    routeParams: new Map(),
    queryParams: new Map(),
    state: {}
  };
  #template = new SubjectObs();
  #unSubscribeHashEvent;

  startHashChange() {
    this.#unSubscribeHashEvent = fromNativeEvent(window, 'hashchange', () => {
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
      let windowHash = window.location.hash.replace(/^#/, '');
      if (windowHash === path) {
        this.#navigateTo(path, state);
      }
      window.location.hash = '#' + path;
    } else {
      this.#navigateTo(path, state);
    }
  }

  #registerOnHashChange() {
    const path = window.location.hash.replace(/^#/, '');
    this.#navigateTo(path, null);
  }

  #routeMatcher(route, path) {
    if (route) {
      let _matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
      return path.match(_matcher);
    } else {
      return route === path;
    }
  }

  #navigateTo(path, state) {
    let uParams = path.split('/').filter((h) => {
      return h.length > 0;
    });
    let routeArr = StaticRouter.routeList.filter((route) => {
      if (route.Params.length === uParams.length && this.#routeMatcher(route.Url, path)) {
        return route;
      } else if (route.Url === path) {
        return route;
      }
    });
    let routeItem = routeArr.length > 0 ? routeArr[0] : null;
    if (routeItem) {
      this.#currentRoute.path = path;
      this.#currentRoute.state = { ...(state || {}) };
      wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
        if (!val) return;
        let _params = StaticRouter.checkParams(uParams, routeItem);
        if (Object.keys(_params).length > 0 || path) {
          this.#currentRoute.routeParams = new Map(Object.entries(_params));
          const entries = window.location.hash.split('?')[1]
            ? new URLSearchParams(window.location.hash.split('?')[1]).entries()
            : [];
          this.#currentRoute.queryParams = new Map(entries);

          if (!routeItem.IsRegistered) {
            if (routeItem.TemplatePath) {
              wrapIntoObservable(routeItem.TemplatePath()).subscribe(() => {
                routeItem.IsRegistered = true;
                this.#template.next(routeItem.Template);
              });
            }
          } else {
            this.#template.next(routeItem.Template);
          }
        } else {
          this.navigateTo(routeItem.redirectTo);
        }
      });
    }
  }
}

Service(InternalRouter);
