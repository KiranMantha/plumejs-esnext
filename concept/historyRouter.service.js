import { Injectable } from '../decorators';
import { fromEvent } from '../utils';
import { SubjectObs, wrapIntoObservable } from './observable-util';
import { StaticRouter } from './staticRouter';
import { matchPath } from './utils';

class HistoryRouterService {
  _currentRoute = {
    path: '',
    routeParams: new Map(),
    queryParams: new Map(),
    state: {}
  };
  _template = new SubjectObs();
  _unSubscribeHashEvent;
  _routeStateMap = new Map();

  startHashChange() {
    window.history.replaceState({}, null, '');
    const self = this;
    (function (history) {
      var pushState = history.pushState;
      history.pushState = function () {
        pushState.apply(history, arguments);
        self._registerOnHashChange();
      };
    })(window.history);

    this._unSubscribeHashEvent = fromEvent(window, 'popstate', () => {
      this._registerOnHashChange();
    });
  }

  stopHashChange() {
    this._unSubscribeHashEvent();
  }

  getTemplate() {
    return this._template.asObservable();
  }

  getCurrentRoute() {
    return this._currentRoute;
  }

  navigateTo(path = '', state) {
    this._routeStateMap.clear();
    if (path) {
      const windowHash = window.location.pathname;
      this._routeStateMap.set(path, state);
      if (windowHash === path) {
        this._template.next('');
        setTimeout(() => {
          this._navigateTo(path, state);
        });
      } else {
        window.history.pushState(state, '', path);
      }
    } else {
      this._navigateTo(path, state);
    }
  }

  _registerOnHashChange() {
    const path = window.location.pathname;
    const state = this._routeStateMap.get(path);
    this._navigateTo(path, state);
  }

  _navigateTo(path, state) {
    const uParams = path.split('/').filter((h) => {
      return h.length > 0;
    });
    const routeArr = StaticRouter.routeList.filter((route) => {
      if (route.params.length === uParams.length && matchPath(route.url, path)) {
        return route;
      } else if (route.url === path) {
        return route;
      }
    });
    const routeItem = routeArr.length > 0 ? routeArr[0] : null;
    if (routeItem) {
      this._currentRoute.path = path;
      this._currentRoute.state = { ...(state || {}) };
      wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
        if (!val) return;
        const _params = StaticRouter.checkParams(uParams, routeItem);
        if (Object.keys(_params).length > 0 || (path && path !== '/')) {
          this._currentRoute.routeParams = new Map(Object.entries(_params));
          const entries = new URLSearchParams(window.location.search).entries();
          this._currentRoute.queryParams = new Map(entries);
          if (!routeItem.isRegistered) {
            if (routeItem.templatePath) {
              wrapIntoObservable(routeItem.templatePath()).subscribe(() => {
                routeItem.isRegistered = true;
                this._template.next(routeItem.template);
              });
            }
          } else {
            this._template.next(routeItem.template);
          }
        } else {
          this.navigateTo(routeItem.redirectTo, state);
        }
      });
    }
  }
}

Injectable()(HistoryRouterService);

export { HistoryRouterService };
