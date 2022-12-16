import { Component, html, Renderer } from '../index';
import { InternalRouter } from './internalRouter.service';

const registerRouterComponent = () => {
  class RouterComponent {
    #template = '';
    #subscriptions;
    update;

    constructor(internalRouterSrvc, renderer) {}

    beforeMount() {
      this.#subscriptions = this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
        this.#template = tmpl;
        this.renderer.update();
      });
      this.internalRouterSrvc.startHashChange();
    }

    mount() {
      let path = window.location.hash.replace(/^#/, '');
      this.internalRouterSrvc.navigateTo(path);
    }

    unmount() {
      this.#subscriptions();
      this.internalRouterSrvc.stopHashChange();
    }

    render() {
      if (this.#template) {
        const stringArray = [`${this.#template}`];
        stringArray.raw = [`${this.#template}`];
        return html(stringArray);
      } else {
        return html``;
      }
    }
  }
  Component({ selector: 'router-outlet', deps: [InternalRouter, Renderer] }, RouterComponent);
};

export { registerRouterComponent };
