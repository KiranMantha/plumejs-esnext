import { Component, Renderer, Subscriptions, html } from '../index';
import { InternalRouter } from './internalRouter.service';
import { StaticRouter } from './staticRouter';

const registerRouterComponent = () => {
  class RouterComponent {
    _template = '';
    _subscriptions = new Subscriptions();

    constructor(internalRouterSrvc, renderer) {}

    beforeMount() {
      this._subscriptions.add(
        this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
          if (this._template !== tmpl) {
            this._template = tmpl;
          }
        })
      );
      this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges());
    }

    mount() {
      const path = StaticRouter.isHistoryBasedRouting
        ? window.location.pathname
        : window.location.hash.replace(/^#/, '');
      this.internalRouterSrvc.navigateTo(path || '/');
    }

    unmount() {
      this._subscriptions.unsubscribe();
    }

    render() {
      if (this._template) {
        const stringArray = [`${this._template}`];
        stringArray.raw = [`${this._template}`];
        return html(stringArray);
      } else {
        return html``;
      }
    }
  }
  Component({ selector: 'router-outlet', deps: [InternalRouter, Renderer] })(RouterComponent);
};

export { registerRouterComponent };
