import { html } from '../html';
import { Component } from '../component';
import { Subscription } from 'rxjs';

const registerRouterComponent = () => {
  let RouterComponent = [
    'InternalRouter',
    'Renderer',
    class {
      _template = '';
      _subscriptions = new Subscription();
      update;

      constructor(internalRouterSrvc, renderer) {}

      beforeMount() {
        this._subscriptions.add(
          this.internalRouterSrvc.getTemplate().subscribe((tmpl) => {
            this._template = tmpl;
            this.renderer.update();
          })
        );
      }

      mount() {
        let path = window.location.hash.replace(/^#/, '');
        this.internalRouterSrvc.navigateTo(path);
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
    },
  ];
  Component({ selector: 'router-outlet' }, RouterComponent);
};

export { registerRouterComponent };
