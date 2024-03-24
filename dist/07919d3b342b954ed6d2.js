var _initClass,_dec,_initClass2,_dec2,_initClass3,_dec3;function createAddInitializerMethod(e,t){return function(n){assertNotFinished(t,"addInitializer"),assertCallable(n,"An initializer"),e.push(n)}}function memberDec(e,t,n,i,a,r,o,s){var l;switch(a){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,u,p={kind:l,name:o?"#"+t:t,static:r,private:o},d={v:!1};0!==a&&(p.addInitializer=createAddInitializerMethod(i,d)),0===a?o?(c=n.get,u=n.set):(c=function(){return this[t]},u=function(e){this[t]=e}):2===a?c=function(){return n.value}:(1!==a&&3!==a||(c=function(){return n.get.call(this)}),1!==a&&4!==a||(u=function(e){n.set.call(this,e)})),p.access=c&&u?{get:c,set:u}:c?{get:c}:{set:u};try{return e(s,p)}finally{d.v=!0}}function assertNotFinished(e,t){if(e.v)throw new Error("attempted to call "+t+" after decoration was finished")}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var n=typeof t;if(1===e){if("object"!==n||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==n)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function applyMemberDec(e,t,n,i,a,r,o,s){var l,c,u,p,d,m,h=n[0];if(o?l=0===a||1===a?{get:n[3],set:n[4]}:3===a?{get:n[3]}:4===a?{set:n[3]}:{value:n[3]}:0!==a&&(l=Object.getOwnPropertyDescriptor(t,i)),1===a?u={get:l.get,set:l.set}:2===a?u=l.value:3===a?u=l.get:4===a&&(u=l.set),"function"==typeof h)void 0!==(p=memberDec(h,i,l,s,a,r,o,u))&&(assertValidReturnValue(a,p),0===a?c=p:1===a?(c=p.init,d=p.get||u.get,m=p.set||u.set,u={get:d,set:m}):u=p);else for(var v=h.length-1;v>=0;v--){var f;void 0!==(p=memberDec(h[v],i,l,s,a,r,o,u))&&(assertValidReturnValue(a,p),0===a?f=p:1===a?(f=p.init,d=p.get||u.get,m=p.set||u.set,u={get:d,set:m}):u=p,void 0!==f&&(void 0===c?c=f:"function"==typeof c?c=[c,f]:c.push(f)))}if(0===a||1===a){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var g=c;c=function(e,t){for(var n=t,i=0;i<g.length;i++)n=g[i].call(e,n);return n}}else{var b=c;c=function(e,t){return b.call(e,t)}}e.push(c)}0!==a&&(1===a?(l.get=u.get,l.set=u.set):2===a?l.value=u:3===a?l.get=u:4===a&&(l.set=u),o?1===a?(e.push((function(e,t){return u.get.call(e,t)})),e.push((function(e,t){return u.set.call(e,t)}))):2===a?e.push(u):e.push((function(e,t){return u.call(e,t)})):Object.defineProperty(t,i,l))}function applyMemberDecs(e,t){for(var n,i,a=[],r=new Map,o=new Map,s=0;s<t.length;s++){var l=t[s];if(Array.isArray(l)){var c,u,p=l[1],d=l[2],m=l.length>3,h=p>=5;if(h?(c=e,0!=(p-=5)&&(u=i=i||[])):(c=e.prototype,0!==p&&(u=n=n||[])),0!==p&&!m){var v=h?o:r,f=v.get(d)||0;if(!0===f||3===f&&4!==p||4===f&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!f&&p>2?v.set(d,p):v.set(d,!0)}applyMemberDec(a,c,l,d,p,h,m,u)}}return pushInitializers(a,n),pushInitializers(a,i),a}function pushInitializers(e,t){t&&e.push((function(e){for(var n=0;n<t.length;n++)t[n].call(e);return e}))}function applyClassDecs(e,t){if(t.length>0){for(var n=[],i=e,a=e.name,r=t.length-1;r>=0;r--){var o={v:!1};try{var s=t[r](i,{kind:"class",name:a,addInitializer:createAddInitializerMethod(n,o)})}finally{o.v=!0}void 0!==s&&(assertValidReturnValue(10,s),i=s)}return[i,function(){for(var e=0;e<n.length;e++)n[e].call(i)}]}}function _applyDecs2203R(e,t,n){return{e:applyMemberDecs(e,t),get c(){return applyClassDecs(e,n)}}}import{Observable}from"rxjs";import{Component,html,Injectable,registerRouterComponent,render,Renderer,Subscriptions}from"./lib";import{matchPath,Router}from"./lib/router";let _TestService,_TestComponent,_AppComponent;registerRouterComponent(),_dec=Injectable();class TestService{getGreeting(){return"hello world"}}[_TestService,_initClass]=_applyDecs2203R(TestService,[],[_dec]).c,_initClass(),_dec2=Component({selector:"test-ele",deps:[Renderer]});class TestComponent{constructor(e){this.inputVal=""}emitDataToParent(){this.renderer.emitEvent("customoutput",{greet:"greetings from child"})}handleInput(e){const t=e.target.value;console.log(t),this.inputVal=t}render(){var e=this;return html`
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
    `}}[_TestComponent,_initClass2]=_applyDecs2203R(TestComponent,[],[_dec2]).c,_initClass2(),_dec3=Component({selector:"app-root",styles:import("./base.scss?inline"),root:!0,deps:[_TestService,Router]});class AppComponent{constructor(e,t){var n=this;this.greet=void 0,this.divRef=void 0,this.setClass=!0,this.tabsContainer=void 0,this.routePath="",this.subscriptions=new Subscriptions,this.routes=[{path:"/",redirectTo:"/home"},{path:"/home",template:"<app-items></app-items>",templatePath:function(){return import("./app/items")}},{path:"/persons/:id/:name",template:"<app-persons></app-persons>",templatePath:function(){return import("./app/persons")},canActivate:function(){return new Observable((function(e){setTimeout((function(){localStorage.getItem("@plumejs/core")?e.next(!0):(n.routerSrvc.navigateTo("/home"),e.next(!1)),e.complete()}),10)}))}},{path:"/form",template:"<app-sample-form></app-sample-form>",templatePath:function(){return import("./app/form")}},{path:"/calculator/:id",template:"<app-calculator></app-calculator>",templatePath:function(){return import("./app/calculator")}},{path:"/controls",template:"<app-controls></app-controls>",templatePath:function(){return import("./app/controls")}},{path:"/nested-table",template:'<app-nested-table name="kiran"></app-nested-table>',templatePath:function(){return import("./app/nested-table")}},{path:"/editor",template:"<app-editor></app-editor>",templatePath:function(){return import("./app/editor")}},{path:"/experiments",template:"<app-experiments></app-experiments>",templatePath:function(){return import("./app/experiments")}}],t.registerRoutes(this.routes,!1,!1),this.greet=e.getGreeting()}beforeMount(){var e=this;this.subscriptions.add(this.routerSrvc.onNavigationEnd().subscribe((function(){e.routePath=e.routerSrvc.getCurrentRoute().path,console.log("routePath",e.routePath)})))}toggleActiveTab(){var e;null==(e=this.tabsContainer.querySelectorAll(".is-active")[0])||e.classList.remove("is-active")}navigate(e,t,n){e.preventDefault(),this.routerSrvc.navigateTo(t,n)}listenFromChild(e){console.log("listening in parent component for data from child component: ",e)}enablePersonsRoute(){window.localStorage.setItem("@plumejs/core","now persons route is activated")}disablePersonsRoute(){window.localStorage.removeItem("@plumejs/core")}setNavActive(e){return matchPath(e,this.routePath)?"active":""}render(){var e=this;return html`
      <div class="layout">
        <header class="layout sticky-header">
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/home")}"
                  onclick=${function(t){e.navigate(t,"/home")}}
                  >Items Route</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/persons/:id/:name")}"
                  onclick=${function(t){e.navigate(t,"/persons/123/testuser?a=123",{date:new Date})}}
                  >Persons Route</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/form")}"
                  onclick=${function(t){e.navigate(t,"/form")}}
                  >Sample Form</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/calculator/:id")}"
                  onclick=${function(t){return e.navigate(t,"/calculator/123",{name:"kiran"})}}
                  >Calculator</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/controls")}"
                  onclick=${function(t){return e.navigate(t,"/controls")}}
                  >Controls</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/nested-table")}"
                  onclick=${function(t){return e.navigate(t,"/nested-table")}}
                  >Nested Table</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/editor")}"
                  onclick=${function(t){return e.navigate(t,"/editor")}}
                  >Editor</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="navlink ${this.setNavActive("/experiments")}"
                  onclick=${function(t){return e.navigate(t,"/experiments")}}
                  >Experiments</a
                >
              </li>
              <li>
                <details role="listbox">
                  <summary>dropdown</summary>
                  <ul role="menu">
                    <li role="menuitem">
                      <a>Sub menu 1</a>
                    </li>
                    <li role="menuitem">
                      <a>Sub menu 2</a>
                    </li>
                    <li role="menuitem">
                      <a>Sub menu 3</a>
                    </li>
                  </ul>
                </details>
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
                oninput="${function(t){const n=t.target.value;console.log(n),e.greet=n}}"
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