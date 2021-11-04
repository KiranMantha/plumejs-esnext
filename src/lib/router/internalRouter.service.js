import { Subject } from 'rxjs';
import { wrapIntoObservable } from '../utils';
import { Service } from '../service';
import { StaticRouter } from './staticRouter';
import { fromEvent } from 'rxjs';

Service(
  'InternalRouter',
  class {
    _currentRoute = {
      params: {},
    };
    _template = new Subject();

    constructor() {
      fromEvent(window, 'hashchange').subscribe(() => {
        this._registerOnHashChange();
      });
    }

    getTemplate() {
      return this._template.asObservable();
    }

    getCurrentRoute() {
      return this._currentRoute;
    }

    navigateTo(path = '') {
      if (path) {
        let windowHash = window.location.hash.replace(/^#/, '');
        if (windowHash === path) {
          this._navigateTo(path);
        }
        window.location.hash = '#' + path;
      } else {
        this._navigateTo(path);
      }
    }

    _registerOnHashChange() {
      const path = window.location.hash.replace(/^#/, '');
      this._navigateTo(path);
    }

    _routeMatcher(route, path) {
      if (route) {
        let _matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
        return path.match(_matcher);
      } else {
        return route === path;
      }
    }

    _navigateTo(path) {
      let uParams = path.split('/').filter((h) => {
        return h.length > 0;
      });
      let routeArr = StaticRouter.routList.filter((route) => {
        if (
          route.Params.length === uParams.length &&
          this._routeMatcher(route.Url, path)
        ) {
          return route;
        } else if (route.Url === path) {
          return route;
        }
      });
      let routeItem = routeArr.length > 0 ? routeArr[0] : null;
      if (routeItem) {
        wrapIntoObservable(routeItem.canActivate()).subscribe((val) => {
          if (!val) return;
          let _params = StaticRouter.checkParams(uParams, routeItem);
          if (Object.keys(_params).length > 0 || path) {
            this._currentRoute.params = _params;
            if (!routeItem.IsRegistered) {
              if (routeItem.TemplatePath) {
                wrapIntoObservable(routeItem.TemplatePath()).subscribe(
                  (res) => {
                    routeItem.IsRegistered = true;
                    this._template.next(routeItem.Template);
                  }
                );
              }
            } else {
              this._template.next(routeItem.Template);
            }
          } else {
            this.navigateTo(routeItem.redirectTo);
          }
        });
      }
    }
  }
);
