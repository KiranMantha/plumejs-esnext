var _initClass,_dec,_initClass2,_dec2,_initClass3,_dec3;function createAddInitializerMethod(e,t){return function(n){assertNotFinished(t,"addInitializer"),assertCallable(n,"An initializer"),e.push(n)}}function memberDec(e,t,n,r,i,a,o,s){var l;switch(i){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,u,p={kind:l,name:o?"#"+t:t,static:a,private:o},d={v:!1};0!==i&&(p.addInitializer=createAddInitializerMethod(r,d)),0===i?o?(c=n.get,u=n.set):(c=function(){return this[t]},u=function(e){this[t]=e}):2===i?c=function(){return n.value}:(1!==i&&3!==i||(c=function(){return n.get.call(this)}),1!==i&&4!==i||(u=function(e){n.set.call(this,e)})),p.access=c&&u?{get:c,set:u}:c?{get:c}:{set:u};try{return e(s,p)}finally{d.v=!0}}function assertNotFinished(e,t){if(e.v)throw new Error("attempted to call "+t+" after decoration was finished")}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var n=typeof t;if(1===e){if("object"!==n||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==n)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function applyMemberDec(e,t,n,r,i,a,o,s){var l,c,u,p,d,m,h=n[0];if(o?l=0===i||1===i?{get:n[3],set:n[4]}:3===i?{get:n[3]}:4===i?{set:n[3]}:{value:n[3]}:0!==i&&(l=Object.getOwnPropertyDescriptor(t,r)),1===i?u={get:l.get,set:l.set}:2===i?u=l.value:3===i?u=l.get:4===i&&(u=l.set),"function"==typeof h)void 0!==(p=memberDec(h,r,l,s,i,a,o,u))&&(assertValidReturnValue(i,p),0===i?c=p:1===i?(c=p.init,d=p.get||u.get,m=p.set||u.set,u={get:d,set:m}):u=p);else for(var f=h.length-1;f>=0;f--){var v;void 0!==(p=memberDec(h[f],r,l,s,i,a,o,u))&&(assertValidReturnValue(i,p),0===i?v=p:1===i?(v=p.init,d=p.get||u.get,m=p.set||u.set,u={get:d,set:m}):u=p,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===i||1===i){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var g=c;c=function(e,t){for(var n=t,r=0;r<g.length;r++)n=g[r].call(e,n);return n}}else{var b=c;c=function(e,t){return b.call(e,t)}}e.push(c)}0!==i&&(1===i?(l.get=u.get,l.set=u.set):2===i?l.value=u:3===i?l.get=u:4===i&&(l.set=u),o?1===i?(e.push((function(e,t){return u.get.call(e,t)})),e.push((function(e,t){return u.set.call(e,t)}))):2===i?e.push(u):e.push((function(e,t){return u.call(e,t)})):Object.defineProperty(t,r,l))}function applyMemberDecs(e,t){for(var n,r,i=[],a=new Map,o=new Map,s=0;s<t.length;s++){var l=t[s];if(Array.isArray(l)){var c,u,p=l[1],d=l[2],m=l.length>3,h=p>=5;if(h?(c=e,0!=(p-=5)&&(u=r=r||[])):(c=e.prototype,0!==p&&(u=n=n||[])),0!==p&&!m){var f=h?o:a,v=f.get(d)||0;if(!0===v||3===v&&4!==p||4===v&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!v&&p>2?f.set(d,p):f.set(d,!0)}applyMemberDec(i,c,l,d,p,h,m,u)}}return pushInitializers(i,n),pushInitializers(i,r),i}function pushInitializers(e,t){t&&e.push((function(e){for(var n=0;n<t.length;n++)t[n].call(e);return e}))}function applyClassDecs(e,t){if(t.length>0){for(var n=[],r=e,i=e.name,a=t.length-1;a>=0;a--){var o={v:!1};try{var s=t[a](r,{kind:"class",name:i,addInitializer:createAddInitializerMethod(n,o)})}finally{o.v=!0}void 0!==s&&(assertValidReturnValue(10,s),r=s)}return[r,function(){for(var e=0;e<n.length;e++)n[e].call(r)}]}}function _applyDecs2203R(e,t,n){return{e:applyMemberDecs(e,t),get c(){return applyClassDecs(e,n)}}}import{Observable}from"rxjs";import styles from"./base.scss?inline";import{Component,html,Injectable,registerRouterComponent,render,Renderer}from"./lib";import{Router}from"./lib/router";let _TestService,_TestComponent,_AppComponent;registerRouterComponent(),_dec=Injectable();class TestService{getGreeting(){return"hello world"}}[_TestService,_initClass]=_applyDecs2203R(TestService,[],[_dec]).c,_initClass(),_dec2=Component({selector:"test-ele",deps:[Renderer]});class TestComponent{constructor(e){this.inputVal=""}emitDataToParent(){this.renderer.emitEvent("customoutput",{greet:"greetings from child"})}handleInput(e){const t=e.target.value;console.log(t),this.inputVal=t}render(){var e=this;return html`
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
    `}}[_TestComponent,_initClass2]=_applyDecs2203R(TestComponent,[],[_dec2]).c,_initClass2(),_dec3=Component({selector:"app-root",styles,root:!0,deps:[_TestService,Router]});class AppComponent{constructor(e,t){var n=this;this.greet=void 0,this.divRef=void 0,this.setClass=!0,this.tabsContainer=void 0,this.routePath="",this.routes=[{path:"/",redirectTo:"/home"},{path:"/home",template:"<app-items></app-items>",templatePath:function(){return import("./app/items")}},{path:"/persons/:id/:name",template:"<app-persons></app-persons>",templatePath:function(){return import("./app/persons")},canActivate:function(){return new Observable((function(e){setTimeout((function(){localStorage.getItem("@plumejs/core")?e.next(!0):(n.routerSrvc.navigateTo("/home"),e.next(!1)),e.complete()}),10)}))}},{path:"/form",template:"<app-sample-form></app-sample-form>",templatePath:function(){return import("./app/form")}},{path:"/calculator/:id",template:"<app-calculator></app-calculator>",templatePath:function(){return import("./app/calculator")}},{path:"/controls",template:"<app-controls></app-controls>",templatePath:function(){return import("./app/controls")}},{path:"/nested-table",template:'<app-nested-table name="kiran"></app-nested-table>',templatePath:function(){return import("./app/nested-table")}},{path:"/editor",template:"<app-editor></app-editor>",templatePath:function(){return import("./app/editor")}},{path:"/experiments",template:"<app-experiments></app-experiments>",templatePath:function(){return import("./app/experiments")}}],t.registerRoutes(this.routes,!1,!1),this.greet=e.getGreeting()}beforeMount(){this.routePath=this.routerSrvc.getCurrentRoute().path,console.log("routePath",this.routePath)}toggleActiveTab(){var e;null==(e=this.tabsContainer.querySelectorAll(".is-active")[0])||e.classList.remove("is-active")}navigate(e,t,n){e.preventDefault(),this.routerSrvc.navigateTo(t,n)}listenFromChild(e){console.log("listening in parent component for data from child component: ",e)}enablePersonsRoute(){window.localStorage.setItem("@plumejs/core","now persons route is activated")}disablePersonsRoute(){window.localStorage.removeItem("@plumejs/core")}render(){var e=this;return html`
      <div class="layout">
        <header class="layout sticky-header">
          <nav>
            <ul>
              <li>
                <a
                  href="#"
                  onclick=${function(t){e.navigate(t,"/home")}}
                  >Items Route</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick=${function(t){e.navigate(t,"/persons/123/testuser?a=123",{date:new Date})}}
                  >Persons Route</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick=${function(t){e.navigate(t,"/form")}}
                  >Sample Form</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick=${function(t){return e.navigate(t,"/calculator/123",{name:"kiran"})}}
                  >Calculator</a
                >
              </li>
              <li>
                <a href="#" onclick=${function(t){return e.navigate(t,"/controls")}}>Controls</a>
              </li>
              <li>
                <a href="#" onclick=${function(t){return e.navigate(t,"/nested-table")}}>Nested Table</a>
              </li>
              <li>
                <a href="#" onclick=${function(t){return e.navigate(t,"/editor")}}>Editor</a>
              </li>
              <li>
                <a href="#" onclick=${function(t){return e.navigate(t,"/experiments")}}>Experiments</a>
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