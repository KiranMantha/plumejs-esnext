"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(t,e,r)=>{r.r(e);var n,s,o,a,i=r(1257),c=r(3597);function u(t){return t}function l(t,e){return function(r){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),d(r,"An initializer"),t.push(r)}}function p(t,e,r,n,s,o,a,i){var c;switch(s){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,p,d={kind:c,name:a?"#"+e:e,static:o,private:a},f={v:!1};0!==s&&(d.addInitializer=l(n,f)),0===s?a?(u=r.get,p=r.set):(u=function(){return this[e]},p=function(t){this[e]=t}):2===s?u=function(){return r.value}:(1!==s&&3!==s||(u=function(){return r.get.call(this)}),1!==s&&4!==s||(p=function(t){r.set.call(this,t)})),d.access=u&&p?{get:u,set:p}:u?{get:u}:{set:p};try{return t(i,d)}finally{f.v=!0}}function d(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function f(t,e){var r=typeof e;if(1===t){if("object"!==r||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&d(e.get,"accessor.get"),void 0!==e.set&&d(e.set,"accessor.set"),void 0!==e.init&&d(e.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function h(t,e,r,n,s,o,a,i){var c,u,l,d,h,v,g=r[0];if(a?c=0===s||1===s?{get:r[3],set:r[4]}:3===s?{get:r[3]}:4===s?{set:r[3]}:{value:r[3]}:0!==s&&(c=Object.getOwnPropertyDescriptor(e,n)),1===s?l={get:c.get,set:c.set}:2===s?l=c.value:3===s?l=c.get:4===s&&(l=c.set),"function"==typeof g)void 0!==(d=p(g,n,c,i,s,o,a,l))&&(f(s,d),0===s?u=d:1===s?(u=d.init,h=d.get||l.get,v=d.set||l.set,l={get:h,set:v}):l=d);else for(var m=g.length-1;m>=0;m--){var y;void 0!==(d=p(g[m],n,c,i,s,o,a,l))&&(f(s,d),0===s?y=d:1===s?(y=d.init,h=d.get||l.get,v=d.set||l.set,l={get:h,set:v}):l=d,void 0!==y&&(void 0===u?u=y:"function"==typeof u?u=[u,y]:u.push(y)))}if(0===s||1===s){if(void 0===u)u=function(t,e){return e};else if("function"!=typeof u){var b=u;u=function(t,e){for(var r=e,n=0;n<b.length;n++)r=b[n].call(t,r);return r}}else{var w=u;u=function(t,e){return w.call(t,e)}}t.push(u)}0!==s&&(1===s?(c.get=l.get,c.set=l.set):2===s?c.value=l:3===s?c.get=l:4===s&&(c.set=l),a?1===s?(t.push((function(t,e){return l.get.call(t,e)})),t.push((function(t,e){return l.set.call(t,e)}))):2===s?t.push(l):t.push((function(t,e){return l.call(t,e)})):Object.defineProperty(e,n,c))}function v(t,e){for(var r,n,s=[],o=new Map,a=new Map,i=0;i<e.length;i++){var c=e[i];if(Array.isArray(c)){var u,l,p=c[1],d=c[2],f=c.length>3,v=p>=5;if(v?(u=t,0!=(p-=5)&&(l=n=n||[])):(u=t.prototype,0!==p&&(l=r=r||[])),0!==p&&!f){var m=v?a:o,y=m.get(d)||0;if(!0===y||3===y&&4!==p||4===y&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+d);!y&&p>2?m.set(d,p):m.set(d,!0)}h(s,u,c,d,p,v,f,l)}}return g(s,r),g(s,n),s}function g(t,e){e&&t.push((function(t){for(var r=0;r<e.length;r++)e[r].call(t);return t}))}function m(t,e,r){return{e:v(t,e),get c(){return function(t,e){if(e.length>0){for(var r=[],n=t,s=t.name,o=e.length-1;o>=0;o--){var a={v:!1};try{var i=e[o](n,{kind:"class",name:s,addInitializer:l(r,a)})}finally{a.v=!0}void 0!==i&&(f(10,i),n=i)}return[n,function(){for(var t=0;t<r.length;t++)r[t].call(n)}]}}(t,r)}}}let y,b;s=(0,c.wA)({selector:"app-persons",deps:[c.F0]}),[y,n]=m(class{constructor(t){this.users=[],this.selectedPerson=void 0,this.routeData={}}mount(){this.loadRouteData()}loadRouteData(){var t=this;this.router.getCurrentRoute().subscribe((function(e){t.routeData={path:e.path,routeParams:Object.fromEntries(e.routeParams),queryParams:Object.fromEntries(e.queryParams),state:e.state},i.Z.get("https://jsonplaceholder.typicode.com/users").then((function(t){return t.data})).then((function(e){t.users=e}))}))}onUserClick(t){console.log("data from app-person-details comp: ",t)}updateUrl(){this.router.navigateTo(`/persons/${Math.random()}/testuser?a=${Math.random()}`)}render(){var t,e,r=this;return c.dy`
      <h3>Persons route</h3>
      <span role="tag">sample tag</span>
      <button onclick=${function(){r.updateUrl()}}>Update url</button>
      <p>${null==(t=this.routeData)||null==(e=t.queryParams)?void 0:e.a}</p>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.routeData,null,4)}</code></pre>
      </p>
      <ul>
        ${this.users.length?this.users.map((function(t){return c.dy`
                  <li
                    class="is-clickable"
                    onclick="${function(){r.selectedPerson=t}}"
                  >
                    ${t.name}
                  </li>
                `})):"loading"}
      </ul>
      <app-person-details
        data-input=${{personDetails:this.selectedPerson}}
        onuserclick="${function(t){r.onUserClick(t.detail)}}"
      ></app-person-details>
    `}},[],[s]).c,n(),a=(0,c.wA)({selector:"app-person-details",deps:[c.Th]}),new([b,o]=m(class{constructor(t){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var t,e=this;return null!=(t=this.personDetails)&&t.name?c.dy`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${function(){e.sendDataToParent()}}"
        >
          click me and check console
        </button>
      `:c.dy` <div></div> `}},[],[a]).c,class extends u{constructor(){super(b),this.observedProperties=["personDetails"],o()}})}}]);