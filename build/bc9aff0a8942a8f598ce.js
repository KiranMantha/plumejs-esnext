import{Component,Service,html,render,registerRouterComponent}from"./lib";import styles from"./base.scss";registerRouterComponent();class TestService{getGreeting(){return"hello world"}}class TestComponent{constructor(e){}emitDataToParent(){this.renderer.emitEvent("customoutput",{greet:"greetings from child"})}render(){var e=this;return html`
      <fieldset class="fieldset">
        <legend>I'm child component</legend>
        <button
          class="button  is-info is-light"
          onclick="${function(){e.emitDataToParent()}}"
        >
          emit data from child to parent
        </button>
      </fieldset>
    `}}class AppComponent{constructor(e,t){this.greet=void 0,this.divRef=void 0,this.setClass=!0,this.tabsContainer=void 0,this.routePath="",this.routes=[{path:"",redirectTo:"/home"},{path:"/home",template:"<app-items></app-items>",templatePath:function(){return import("./app/items")}},{path:"/persons",template:"<app-persons></app-persons>",templatePath:function(){return import("./app/persons")}},{path:"/form",template:"<app-sample-form></app-sample-form>",templatePath:function(){return import("./app/form")}},{path:"/calculator/:id",template:"<app-calculator></app-calculator>",templatePath:function(){return import("./app/calculator")}},{path:"/editor",template:"<app-editor></app-editor>",templatePath:function(){return import("./app/editor")}}],t.registerRoutes(this.routes),this.greet=e.getGreeting()}toggleActiveTab(){this.tabsContainer.querySelectorAll(".is-active")[0].classList.remove("is-active")}navigate(e,t){e.preventDefault(),this.routerSrvc.navigateTo(t)}listenFromChild(e){console.log("listening in parent component for data from child component: ",e)}render(){var e=this;return html`
      <header>
        <nav>
          <a href="#" onclick=${function(t){return e.navigate(t,"/home")}}>Items Route</a>
          <a href="#" onclick=${function(t){return e.navigate(t,"/persons")}}>Persons Route</a>
          <a href="#" onclick=${function(t){return e.navigate(t,"/form")}}>Sample Form</a>
          <a
            href="#"
            onclick=${function(t){return e.navigate(t,"/calculator/123",{name:"kiran"})}}
            >Calculator</a
          >
          <a href="#" onclick=${function(t){return e.navigate(t,"/editor")}}>Editor</a>
        </nav>
      </header>
      <fieldset class="fieldset">
        <legend>I'm parent component</legend>
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
          <input value="${this.greet}" oninput="${function(e){return console.log(e.target.value)}}" />

          ${function(){if(e.setClass)return html` <div>loaded conditionally..</div> `}()}
          <ul>
            ${[1,2,3].map((function(e){return html` <li onclick="${function(){return console.log(e)}}">${e}</li> `}))}
          </ul>
        </div>
        <fieldset class="fieldset">
          <legend>router outlet</legend>
          <router-outlet></router-outlet>
        </fieldset>
      </fieldset>
    `}}Service({name:"testService"},TestService),Component({selector:"test-ele",deps:["Renderer"]},TestComponent),Component({selector:"app-root",styles,root:!0,deps:["testService","Router"]},AppComponent),render(document.getElementById("test"),html` <app-root data-adj="${"hello world"}"></app-root> `);