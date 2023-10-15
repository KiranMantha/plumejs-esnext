"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(e,t,r)=>{r.r(t);var s,n,a,o,i=r(2956),c=r(6178);function u(e){return e}function l(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),d(r,"An initializer"),e.push(r)}}function p(e,t,r,s,n,a,o,i){var c;switch(n){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,p,d={kind:c,name:o?"#"+t:t,static:a,private:o},h={v:!1};0!==n&&(d.addInitializer=l(s,h)),0===n?o?(u=r.get,p=r.set):(u=function(){return this[t]},p=function(e){this[t]=e}):2===n?u=function(){return r.value}:(1!==n&&3!==n||(u=function(){return r.get.call(this)}),1!==n&&4!==n||(p=function(e){r.set.call(this,e)})),d.access=u&&p?{get:u,set:p}:u?{get:u}:{set:p};try{return e(i,d)}finally{h.v=!0}}function d(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function h(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&d(t.get,"accessor.get"),void 0!==t.set&&d(t.set,"accessor.set"),void 0!==t.init&&d(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function f(e,t,r,s,n,a,o,i){var c,u,l,d,f,v,m=r[0];if(o?c=0===n||1===n?{get:r[3],set:r[4]}:3===n?{get:r[3]}:4===n?{set:r[3]}:{value:r[3]}:0!==n&&(c=Object.getOwnPropertyDescriptor(t,s)),1===n?l={get:c.get,set:c.set}:2===n?l=c.value:3===n?l=c.get:4===n&&(l=c.set),"function"==typeof m)void 0!==(d=p(m,s,c,i,n,a,o,l))&&(h(n,d),0===n?u=d:1===n?(u=d.init,f=d.get||l.get,v=d.set||l.set,l={get:f,set:v}):l=d);else for(var g=m.length-1;g>=0;g--){var y;void 0!==(d=p(m[g],s,c,i,n,a,o,l))&&(h(n,d),0===n?y=d:1===n?(y=d.init,f=d.get||l.get,v=d.set||l.set,l={get:f,set:v}):l=d,void 0!==y&&(void 0===u?u=y:"function"==typeof u?u=[u,y]:u.push(y)))}if(0===n||1===n){if(void 0===u)u=function(e,t){return t};else if("function"!=typeof u){var b=u;u=function(e,t){for(var r=t,s=0;s<b.length;s++)r=b[s].call(e,r);return r}}else{var w=u;u=function(e,t){return w.call(e,t)}}e.push(u)}0!==n&&(1===n?(c.get=l.get,c.set=l.set):2===n?c.value=l:3===n?c.get=l:4===n&&(c.set=l),o?1===n?(e.push((function(e,t){return l.get.call(e,t)})),e.push((function(e,t){return l.set.call(e,t)}))):2===n?e.push(l):e.push((function(e,t){return l.call(e,t)})):Object.defineProperty(t,s,c))}function v(e,t){for(var r,s,n=[],a=new Map,o=new Map,i=0;i<t.length;i++){var c=t[i];if(Array.isArray(c)){var u,l,p=c[1],d=c[2],h=c.length>3,v=p>=5;if(v?(u=e,0!=(p-=5)&&(l=s=s||[])):(u=e.prototype,0!==p&&(l=r=r||[])),0!==p&&!h){var g=v?o:a,y=g.get(d)||0;if(!0===y||3===y&&4!==p||4===y&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!y&&p>2?g.set(d,p):g.set(d,!0)}f(n,u,c,d,p,v,h,l)}}return m(n,r),m(n,s),n}function m(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}function g(e,t,r){return{e:v(e,t),get c(){return function(e,t){if(t.length>0){for(var r=[],s=e,n=e.name,a=t.length-1;a>=0;a--){var o={v:!1};try{var i=t[a](s,{kind:"class",name:n,addInitializer:l(r,o)})}finally{o.v=!0}void 0!==i&&(h(10,i),s=i)}return[s,function(){for(var e=0;e<r.length;e++)r[e].call(s)}]}}(e,r)}}}let y,b;n=(0,c.wA)({selector:"app-persons",deps:[c.F0]}),[y,s]=g(class{constructor(e){this.personDetailsCompRef=void 0,this.users=[],this.seachParams={},this.updateSearchParams=void 0,[this.seachParams,this.updateSearchParams]=(0,c.lr)()}mount(){var e=this;i.Z.get("https://jsonplaceholder.typicode.com/users").then((function(e){return e.data})).then((function(t){e.users=t}))}loadRouteData(){const e=this.router.getCurrentRoute();return{path:e.path,routeParams:Object.fromEntries(e.routeParams),queryParams:Object.fromEntries(e.queryParams),state:e.state}}loadPersonDetails(e){this.personDetailsCompRef.setProps({personDetails:e})}onUserClick(e){console.log("data from app-person-details comp: ",e)}updateUrl(){const e=new URLSearchParams(this.seachParams.toString());e.set("a",Math.random()),this.updateSearchParams(e)}render(){var e=this;return c.dy`
      <h3>Persons route</h3>
      <span role="tag">sample tag</span><button onclick=${function(){e.updateUrl()}}>Update url</button>
      <p>${this.seachParams.a}</p>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.loadRouteData(),null,4)}</code></pre>
      </p>
      <ul>
        ${this.users.length?this.users.map((function(t){return c.dy`
                  <li
                    class="is-clickable"
                    onclick="${function(){e.loadPersonDetails(t)}}"
                  >
                    ${t.name}
                  </li>
                `})):"loading"}
      </ul>
      <app-person-details
        ref="${function(t){e.personDetailsCompRef=t}}"
        onuserclick="${function(t){e.onUserClick(t.detail)}}"
      ></app-person-details>
    `}},[],[n]).c,s(),o=(0,c.wA)({selector:"app-person-details",deps:[c.Th]}),new([b,a]=g(class{constructor(e){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var e,t=this;return null!=(e=this.personDetails)&&e.name?c.dy`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${function(){t.sendDataToParent()}}"
        >
          click me and check console
        </button>
      `:c.dy` <div></div> `}},[],[o]).c,class extends u{constructor(){super(b),this.observedProperties=["personDetails"],a()}})}}]);