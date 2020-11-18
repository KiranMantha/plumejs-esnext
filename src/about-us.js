import { component, html } from "./lib/plume";

component("app-about", [
  "RouterService",
  class {
    constructor(routerSrvc) {
      console.log(routerSrvc.currentRoute());
    }
    render() {
      return html`
        <div>about us</div>
      `;
    }
  }
]);
