import{Component,Service,html,render,registerRouterComponent,Renderer}from"./lib";import{Router}from"./lib/router";import styles from"./base.scss";import{Observable}from"rxjs";registerRouterComponent();class TestService{getGreeting(){return"hello world"}}class TestComponent{constructor(e){}emitDataToParent(){this.renderer.emitEvent("customoutput",{greet:"greetings from child"})}render(){var e=this;return html`
        <fieldset class="fieldset">
          <legend>I'm child component</legend>
          <button class="button  is-info is-light"
            onclick="${function(){e.emitDataToParent()}}"
          >
            emit data from child to parent
          </button>
        </fieldset>
      `}}class AppComponent{constructor(e,t){var o=this;this.greet=void 0,this.divRef=void 0,this.setClass=!0,this.tabsContainer=void 0,this.routePath="",this.routes=[{path:"",redirectTo:"/home"},{path:"/home",template:"<app-items></app-items>",templatePath:function(){return import("./app/items")}},{path:"/persons",template:"<app-persons></app-persons>",templatePath:function(){return import("./app/persons")},canActivate:function(){return new Observable((function(e){setTimeout((function(){localStorage.getItem("@plumejs/core")?e.next(!0):(o.routerSrvc.navigateTo("/home"),e.next(!1)),e.complete()}),10)}))}},{path:"/form",template:"<app-sample-form></app-sample-form>",templatePath:function(){return import("./app/form")}},{path:"/calculator/:id",template:"<app-calculator></app-calculator>",templatePath:function(){return import("./app/calculator")}},{path:"/controls",template:"<app-controls></app-controls>",templatePath:function(){return import("./app/controls")}},{path:"/nested-table",template:"<app-nested-table></app-nested-table>",templatePath:function(){return import("./app/nested-table")}},{path:"/editor",template:"<app-editor></app-editor>",templatePath:function(){return import("./app/editor")}}],t.registerRoutes(this.routes,!1),this.greet=e.getGreeting()}beforeMount(){this.routePath=this.routerSrvc.getCurrentRoute().path,console.log("routePath",this.routePath)}toggleActiveTab(){var e;null==(e=this.tabsContainer.querySelectorAll(".is-active")[0])||e.classList.remove("is-active")}navigate(e,t,o){e.preventDefault(),this.routerSrvc.navigateTo(t,o)}listenFromChild(e){console.log("listening in parent component for data from child component: ",e)}enablePersonsRoute(){window.localStorage.setItem("@plumejs/core","now persons route is activated")}disablePersonsRoute(){window.localStorage.removeItem("@plumejs/core")}render(){var e=this;return html`
        <header>
          <nav>
            <a href="#" onclick=${function(t){return e.navigate(t,"/home")}}>Items Route</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/persons")}}>Persons Route</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/form")}}>Sample Form</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/calculator/123",{name:"kiran"})}}>Calculator</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/controls")}}>Controls</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/nested-table")}}>Nested Table</a>
            <a href="#" onclick=${function(t){return e.navigate(t,"/editor")}}>Editor</a>
          </nav>
        </header>
        <fieldset class="fieldset">
          <legend>I'm parent component</legend>
          ${"<div>test</div>"}
          <test-ele
            oncustomoutput="${function(t){e.listenFromChild(t.detail)}}"
          ></test-ele>
          <div
            style="margin-top: 20px;"
            ref="${function(t){e.divRef=t}}"
            class="hello ${this.setClass?"world":""}"
            data-adj="${this.setClass}"
          >
            ${this.greet}
            <input
              value="${this.greet}"
              oninput="${function(e){return console.log(e.target.value)}}"
            />

            ${function(){if(e.setClass)return html`
                  <div>loaded conditionally..</div>
                `}()}
            <ul>
              ${[1,2,3].map((function(e){return html`
                  <li onclick="${function(){return console.log(e)}}">
                    ${e}
                  </li>
                `}))}
            </ul>
          </div>
          <div>
            <button onclick=${this.enablePersonsRoute} title='click persons nav to check persons route'>Enable Persons route</button>
            <button onclick=${this.disablePersonsRoute} title='click persons nav to check persons route'>Disable Persons route</button>
          </div>
          <fieldset class="fieldset">
            <legend>router outlet</legend>
            <router-outlet></router-outlet>
          </fieldset>
        </fieldset>
      `}}Service(TestService),Component({selector:"test-ele",deps:[Renderer]},TestComponent),Component({selector:"app-root",styles,root:!0,deps:[TestService,Router]},AppComponent),render(document.getElementById("test"),html`
    <app-root data-adj="${"hello world"}"></app-root>
  `);