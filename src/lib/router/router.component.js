import { Component, Renderer, html } from '../index';
import { InternalRouter } from './internalRouter.service';
import { StaticRouter } from './staticRouter';

const registerRouterComponent = () => {
  class RouterComponent {
    _template = '';
    _subscriptions;

    constructor(internalRouterSrvc, renderer) {}

    beforeMount() {
      this._subscriptions = this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
        if (this._template !== tmpl) {
          this._template = tmpl;
        } else {
          this.refreshRouterOutletComponent();
        }
      });
      this.internalRouterSrvc.startHashChange();
    }

    mount() {
      const path = StaticRouter.isHistoryBasedRouting
        ? window.location.pathname
        : window.location.hash.replace(/^#/, '');
      this.internalRouterSrvc.navigateTo(path || '/');
    }

    unmount() {
      this._subscriptions();
      this.internalRouterSrvc.stopHashChange();
    }

    refreshRouterOutletComponent() {
      const event = new CustomEvent('refresh_component', {
        detail: {},
        bubbles: false,
        cancelable: false,
        composed: false
      });
      this.renderer.shadowRoot.children[0].dispatchEvent(event);
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
