import { html } from '../html';
import { Component } from '../component';
import { Subscription } from 'rxjs';

const registerRouterComponent = () => {
  class RouterComponent {
    #template = '';
    #subscriptions = new Subscription();
    update;

    constructor(internalRouterSrvc, renderer) {}

    beforeMount() {
      this.#subscriptions.add(
        this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
          this.#template = tmpl;
          this.renderer.update();
        })
      );
    }

    mount() {
      let path = window.location.hash.replace(/^#/, '');
      this.internalRouterSrvc.navigateTo(path);
    }

    unmount() {
      this.#subscriptions.unsubscribe();
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
  Component({ selector: 'router-outlet', deps: ['InternalRouter', 'Renderer'] }, RouterComponent);
};

export { registerRouterComponent };
