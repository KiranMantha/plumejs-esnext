var _initClass,_dec,_initClass2,_dec2,_initClass3,_dec3;function createAddInitializerMethod(e,t){return function(r){assertNotFinished(t,"addInitializer"),assertCallable(r,"An initializer"),e.push(r)}}function memberDec(e,t,r,n,a,o,i,s){var l;switch(a){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,p,u={kind:l,name:i?"#"+t:t,static:o,private:i},d={v:!1};0!==a&&(u.addInitializer=createAddInitializerMethod(n,d)),0===a?i?(c=r.get,p=r.set):(c=function(){return this[t]},p=function(e){this[t]=e}):2===a?c=function(){return r.value}:(1!==a&&3!==a||(c=function(){return r.get.call(this)}),1!==a&&4!==a||(p=function(e){r.set.call(this,e)})),u.access=c&&p?{get:c,set:p}:c?{get:c}:{set:p};try{return e(s,u)}finally{d.v=!0}}function assertNotFinished(e,t){if(e.v)throw new Error("attempted to call "+t+" after decoration was finished")}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function applyMemberDec(e,t,r,n,a,o,i,s){var l,c,p,u,d,m,h=r[0];if(i?l=0===a||1===a?{get:r[3],set:r[4]}:3===a?{get:r[3]}:4===a?{set:r[3]}:{value:r[3]}:0!==a&&(l=Object.getOwnPropertyDescriptor(t,n)),1===a?p={get:l.get,set:l.set}:2===a?p=l.value:3===a?p=l.get:4===a&&(p=l.set),"function"==typeof h)void 0!==(u=memberDec(h,n,l,s,a,o,i,p))&&(assertValidReturnValue(a,u),0===a?c=u:1===a?(c=u.init,d=u.get||p.get,m=u.set||p.set,p={get:d,set:m}):p=u);else for(var f=h.length-1;f>=0;f--){var v;void 0!==(u=memberDec(h[f],n,l,s,a,o,i,p))&&(assertValidReturnValue(a,u),0===a?v=u:1===a?(v=u.init,d=u.get||p.get,m=u.set||p.set,p={get:d,set:m}):p=u,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===a||1===a){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var g=c;c=function(e,t){for(var r=t,n=0;n<g.length;n++)r=g[n].call(e,r);return r}}else{var b=c;c=function(e,t){return b.call(e,t)}}e.push(c)}0!==a&&(1===a?(l.get=p.get,l.set=p.set):2===a?l.value=p:3===a?l.get=p:4===a&&(l.set=p),i?1===a?(e.push((function(e,t){return p.get.call(e,t)})),e.push((function(e,t){return p.set.call(e,t)}))):2===a?e.push(p):e.push((function(e,t){return p.call(e,t)})):Object.defineProperty(t,n,l))}function applyMemberDecs(e,t){for(var r,n,a=[],o=new Map,i=new Map,s=0;s<t.length;s++){var l=t[s];if(Array.isArray(l)){var c,p,u=l[1],d=l[2],m=l.length>3,h=u>=5;if(h?(c=e,0!=(u-=5)&&(p=n=n||[])):(c=e.prototype,0!==u&&(p=r=r||[])),0!==u&&!m){var f=h?i:o,v=f.get(d)||0;if(!0===v||3===v&&4!==u||4===v&&3!==u)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!v&&u>2?f.set(d,u):f.set(d,!0)}applyMemberDec(a,c,l,d,u,h,m,p)}}return pushInitializers(a,r),pushInitializers(a,n),a}function pushInitializers(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}function applyClassDecs(e,t){if(t.length>0){for(var r=[],n=e,a=e.name,o=t.length-1;o>=0;o--){var i={v:!1};try{var s=t[o](n,{kind:"class",name:a,addInitializer:createAddInitializerMethod(r,i)})}finally{i.v=!0}void 0!==s&&(assertValidReturnValue(10,s),n=s)}return[n,function(){for(var e=0;e<r.length;e++)r[e].call(n)}]}}function _applyDecs2203R(e,t,r){return{e:applyMemberDecs(e,t),get c(){return applyClassDecs(e,r)}}}import{Observable}from"rxjs";import styles from"./base.scss?inline";import{Component,html,Injectable,registerRouterComponent,render,Renderer}from"./lib";import{Router}from"./lib/router";let _TestService,_TestComponent,_AppComponent;registerRouterComponent(),_dec=Injectable();class TestService{getGreeting(){return"hello world"}}[_TestService,_initClass]=_applyDecs2203R(TestService,[],[_dec]).c,_initClass(),_dec2=Component({selector:"test-ele",deps:[Renderer]});class TestComponent{constructor(e){this.inputVal=""}emitDataToParent(){this.renderer.emitEvent("customoutput",{greet:"greetings from child"})}handleInput(e){const t=e.target.value;console.log(t),this.inputVal=t}render(){var e=this;return html`
      <fieldset class="fieldset">
        <legend>I'm child component</legend>
        <button
          class="button  is-info is-light"
          onclick="${function(){e.emitDataToParent()}}"
        >
          emit data from child to parent
        </button>
        <div>
          <p>two way data binding</p>
          <p>${this.inputVal}</p>
          <input type="text" value="${this.inputVal}" oninput="${function(t){return e.handleInput(t)}}" />
        </div>
      </fieldset>
    `}}[_TestComponent,_initClass2]=_applyDecs2203R(TestComponent,[],[_dec2]).c,_initClass2(),_dec3=Component({selector:"app-root",styles,root:!0,deps:[_TestService,Router]});class AppComponent{constructor(e,t){var r=this;this.greet=void 0,this.divRef=void 0,this.setClass=!0,this.tabsContainer=void 0,this.routePath="",this.routes=[{path:"",redirectTo:"/home"},{path:"/home",template:"<app-items></app-items>",templatePath:function(){return import("./app/items")}},{path:"/persons/:id/:name",template:"<app-persons></app-persons>",templatePath:function(){return import("./app/persons")},canActivate:function(){return new Observable((function(e){setTimeout((function(){localStorage.getItem("@plumejs/core")?e.next(!0):(r.routerSrvc.navigateTo("/home"),e.next(!1)),e.complete()}),10)}))}},{path:"/form",template:"<app-sample-form></app-sample-form>",templatePath:function(){return import("./app/form")}},{path:"/calculator/:id",template:"<app-calculator></app-calculator>",templatePath:function(){return import("./app/calculator")}},{path:"/controls",template:"<app-controls></app-controls>",templatePath:function(){return import("./app/controls")}},{path:"/nested-table",template:'<app-nested-table name="kiran"></app-nested-table>',templatePath:function(){return import("./app/nested-table")}},{path:"/editor",template:"<app-editor></app-editor>",templatePath:function(){return import("./app/editor")}},{path:"/experiments",template:"<app-experiments></app-experiments>",templatePath:function(){return import("./app/experiments")}}],t.registerRoutes(this.routes,!1),this.greet=e.getGreeting()}beforeMount(){this.routePath=this.routerSrvc.getCurrentRoute().path,console.log("routePath",this.routePath)}toggleActiveTab(){var e;null==(e=this.tabsContainer.querySelectorAll(".is-active")[0])||e.classList.remove("is-active")}navigate(e,t,r){e.preventDefault(),this.routerSrvc.navigateTo(t,r)}listenFromChild(e){console.log("listening in parent component for data from child component: ",e)}enablePersonsRoute(){window.localStorage.setItem("@plumejs/core","now persons route is activated")}disablePersonsRoute(){window.localStorage.removeItem("@plumejs/core")}render(){var e=this;return html`
      <div class="layout">
        <header class="layout sticky-header">
          <nav>
            <ul>
              <li>
                <a href="#/home">Items Route</a>
              </li>
              <li>
                <a href="#/persons/123/testuser?a=123">Persons Route</a>
              </li>
              <li>
                <a href="#/form">Sample Form</a>
              </li>
              <li>
                <a
                  href="#"
                  onclick=${function(t){return e.navigate(t,"/calculator/123",{name:"kiran"})}}
                  >Calculator</a
                >
              </li>
              <li>
                <a href="#/controls">Controls</a>
              </li>
              <li>
                <a href="#/nested-table">Nested Table</a>
              </li>
              <li>
                <a href="#/editor">Editor</a>
              </li>
              <li>
                <a href="#/experiments">Experiments</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
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
                oninput="${function(t){const r=t.target.value;console.log(r),e.greet=r}}"
              />

              ${function(){if(e.setClass)return html` <div>loaded conditionally..</div> `}()}
              <ul>
                ${[1,2,3].map((function(e){return html` <li onclick="${function(){return console.log(e)}}">${e}</li> `}))}
              </ul>
            </div>
            <div>
              <button onclick=${this.enablePersonsRoute} title="click persons nav to check persons route">
                Enable Persons route
              </button>
              <button onclick=${this.disablePersonsRoute} title="click persons nav to check persons route">
                Disable Persons route
              </button>
            </div>
            <fieldset class="fieldset">
              <legend>router outlet</legend>
              <router-outlet></router-outlet>
            </fieldset>
          </fieldset>
        </main>
      </div>
    `}}[_AppComponent,_initClass3]=_applyDecs2203R(AppComponent,[],[_dec3]).c,_initClass3(),render(document.getElementById("test"),html`<app-root data-adj="${"hello world"}"></app-root>`);