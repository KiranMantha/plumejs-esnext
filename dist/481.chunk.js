"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(e,t,r)=>{r.r(t);var n,s,o,i,a=r(2956),c=r(1993);function u(e){return e}function l(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),d(r,"An initializer"),e.push(r)}}function p(e,t,r,n,s,o,i,a){var c;switch(s){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,p,d={kind:c,name:i?"#"+t:t,static:o,private:i},f={v:!1};0!==s&&(d.addInitializer=l(n,f)),0===s?i?(u=r.get,p=r.set):(u=function(){return this[t]},p=function(e){this[t]=e}):2===s?u=function(){return r.value}:(1!==s&&3!==s||(u=function(){return r.get.call(this)}),1!==s&&4!==s||(p=function(e){r.set.call(this,e)})),d.access=u&&p?{get:u,set:p}:u?{get:u}:{set:p};try{return e(a,d)}finally{f.v=!0}}function d(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function f(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&d(t.get,"accessor.get"),void 0!==t.set&&d(t.set,"accessor.set"),void 0!==t.init&&d(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function h(e,t,r,n,s,o,i,a){var c,u,l,d,h,v,g=r[0];if(i?c=0===s||1===s?{get:r[3],set:r[4]}:3===s?{get:r[3]}:4===s?{set:r[3]}:{value:r[3]}:0!==s&&(c=Object.getOwnPropertyDescriptor(t,n)),1===s?l={get:c.get,set:c.set}:2===s?l=c.value:3===s?l=c.get:4===s&&(l=c.set),"function"==typeof g)void 0!==(d=p(g,n,c,a,s,o,i,l))&&(f(s,d),0===s?u=d:1===s?(u=d.init,h=d.get||l.get,v=d.set||l.set,l={get:h,set:v}):l=d);else for(var m=g.length-1;m>=0;m--){var y;void 0!==(d=p(g[m],n,c,a,s,o,i,l))&&(f(s,d),0===s?y=d:1===s?(y=d.init,h=d.get||l.get,v=d.set||l.set,l={get:h,set:v}):l=d,void 0!==y&&(void 0===u?u=y:"function"==typeof u?u=[u,y]:u.push(y)))}if(0===s||1===s){if(void 0===u)u=function(e,t){return t};else if("function"!=typeof u){var b=u;u=function(e,t){for(var r=t,n=0;n<b.length;n++)r=b[n].call(e,r);return r}}else{var w=u;u=function(e,t){return w.call(e,t)}}e.push(u)}0!==s&&(1===s?(c.get=l.get,c.set=l.set):2===s?c.value=l:3===s?c.get=l:4===s&&(c.set=l),i?1===s?(e.push((function(e,t){return l.get.call(e,t)})),e.push((function(e,t){return l.set.call(e,t)}))):2===s?e.push(l):e.push((function(e,t){return l.call(e,t)})):Object.defineProperty(t,n,c))}function v(e,t){for(var r,n,s=[],o=new Map,i=new Map,a=0;a<t.length;a++){var c=t[a];if(Array.isArray(c)){var u,l,p=c[1],d=c[2],f=c.length>3,v=p>=5;if(v?(u=e,0!=(p-=5)&&(l=n=n||[])):(u=e.prototype,0!==p&&(l=r=r||[])),0!==p&&!f){var m=v?i:o,y=m.get(d)||0;if(!0===y||3===y&&4!==p||4===y&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!y&&p>2?m.set(d,p):m.set(d,!0)}h(s,u,c,d,p,v,f,l)}}return g(s,r),g(s,n),s}function g(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}function m(e,t,r){return{e:v(e,t),get c(){return function(e,t){if(t.length>0){for(var r=[],n=e,s=e.name,o=t.length-1;o>=0;o--){var i={v:!1};try{var a=t[o](n,{kind:"class",name:s,addInitializer:l(r,i)})}finally{i.v=!0}void 0!==a&&(f(10,a),n=a)}return[n,function(){for(var e=0;e<r.length;e++)r[e].call(n)}]}}(e,r)}}}let y,b;s=(0,c.wA)({selector:"app-persons",deps:[c.F0]}),[y,n]=m(class{constructor(e){this.users=[],this.selectedPerson=void 0}mount(){var e=this;a.Z.get("https://jsonplaceholder.typicode.com/users").then((function(e){return e.data})).then((function(t){e.users=t}))}loadRouteData(){const e=this.router.getCurrentRoute();return{path:e.path,routeParams:Object.fromEntries(e.routeParams),queryParams:Object.fromEntries(e.queryParams),state:e.state}}loadPersonDetails(e){this.personDetailsCompRef.setProps({personDetails:e})}onUserClick(e){console.log("data from app-person-details comp: ",e)}updateUrl(){this.router.navigateTo(`/persons/${Math.random()}/testuser?a=${Math.random()}`)}render(){var e=this;return c.dy`
      <h3>Persons route</h3>
      <span role="tag">sample tag</span><button onclick=${function(){e.updateUrl()}}>Update url</button>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.loadRouteData(),null,4)}</code></pre>
      </p>
      <ul>
        ${this.users.length?this.users.map((function(t){return c.dy`
                  <li
                    class="is-clickable"
                    onclick="${function(){e.selectedPerson=t}}"
                  >
                    ${t.name}
                  </li>
                `})):"loading"}
      </ul>
      <app-person-details
        data-input=${{personDetails:this.selectedPerson}}
        onuserclick="${function(t){e.onUserClick(t.detail)}}"
      ></app-person-details>
    `}},[],[s]).c,n(),i=(0,c.wA)({selector:"app-person-details",deps:[c.Th]}),new([b,o]=m(class{constructor(e){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var e,t=this;return null!=(e=this.personDetails)&&e.name?c.dy`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${function(){t.sendDataToParent()}}"
        >
          click me and check console
        </button>
      `:c.dy` <div></div> `}},[],[i]).c,class extends u{constructor(){super(b),this.observedProperties=["personDetails"],o()}})}}]);