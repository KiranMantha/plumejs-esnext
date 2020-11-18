import { Component } from "./component";
import { Subject } from "rxjs";
const { render, html } = window.uhtml;

Component("router-outlet", [
  "InternalRouterService", "RouterService",
  class {
    _internalRouterSrvc;
    _routerSrvc
    _template;
    update;
    constructor(_InternalRouterService, _RouterService) {
      this._internalRouterSrvc = _InternalRouterService;
      this._routerSrvc = _RouterService;
    }

    beforeMount() {
      this._internalRouterSrvc.templateSubscriber.subscribe(tmpl => {
        this._template = tmpl;
        this.update();
      });
    }

    mount() {
      let path = window.location.hash.replace(/^#/, "");
      this._routerSrvc.navigateTo(path);
    }

    unmount() {
      this._internalRouterSrvc.templateSubscriber.unsubscribe();
    }

    render() {
      if (!this._template) {
        return html`
          <div></div>
        `;
      } else {
        const stringArray = [`${this._template}`];
        stringArray.raw = [`${this._template}`];
        return html(stringArray);
      }
    }
  }
]);
