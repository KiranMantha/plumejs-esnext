import { Component, html } from '../index';
import { InternalRouter } from './internalRouter.service';
import { StaticRouter } from './staticRouter';

const registerRouterComponent = () => {
  class RouterComponent {
    _template = '';
    _subscriptions;

    constructor(internalRouterSrvc) {}

    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
        this._template = tmpl;
      });
      this.internalRouterSrvc.startHashChange();
    }

    mount() {
      const path = StaticRouter.isHistoryBasedRouting
        ? window.location.pathname
        : window.location.hash.replace(/^#/, '');
      this.internalRouterSrvc.navigateTo(path);
    }

    unmount() {
      this._subscriptions();
      this.internalRouterSrvc.stopHashChange();
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
  Component({ selector: 'router-outlet', deps: [InternalRouter] })(RouterComponent);
};

export { registerRouterComponent };
