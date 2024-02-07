"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[536],{8536:(t,e,r)=>{r.r(e);var n,o,a=r(5289),i=r(1257);function s(t,e){return function(r){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),u(r,"An initializer"),t.push(r)}}function c(t,e,r,n,o,a,i,c){var u;switch(o){case 1:u="accessor";break;case 2:u="method";break;case 3:u="getter";break;case 4:u="setter";break;default:u="field"}var l,d,f={kind:u,name:i?"#"+e:e,static:a,private:i},h={v:!1};0!==o&&(f.addInitializer=s(n,h)),0===o?i?(l=r.get,d=r.set):(l=function(){return this[e]},d=function(t){this[e]=t}):2===o?l=function(){return r.value}:(1!==o&&3!==o||(l=function(){return r.get.call(this)}),1!==o&&4!==o||(d=function(t){r.set.call(this,t)})),f.access=l&&d?{get:l,set:d}:l?{get:l}:{set:d};try{return t(c,f)}finally{h.v=!0}}function u(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function l(t,e){var r=typeof e;if(1===t){if("object"!==r||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&u(e.get,"accessor.get"),void 0!==e.set&&u(e.set,"accessor.set"),void 0!==e.init&&u(e.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function d(t,e,r,n,o,a,i,s){var u,d,f,h,p,g,v=r[0];if(i?u=0===o||1===o?{get:r[3],set:r[4]}:3===o?{get:r[3]}:4===o?{set:r[3]}:{value:r[3]}:0!==o&&(u=Object.getOwnPropertyDescriptor(e,n)),1===o?f={get:u.get,set:u.set}:2===o?f=u.value:3===o?f=u.get:4===o&&(f=u.set),"function"==typeof v)void 0!==(h=c(v,n,u,s,o,a,i,f))&&(l(o,h),0===o?d=h:1===o?(d=h.init,p=h.get||f.get,g=h.set||f.set,f={get:p,set:g}):f=h);else for(var y=v.length-1;y>=0;y--){var b;void 0!==(h=c(v[y],n,u,s,o,a,i,f))&&(l(o,h),0===o?b=h:1===o?(b=h.init,p=h.get||f.get,g=h.set||f.set,f={get:p,set:g}):f=h,void 0!==b&&(void 0===d?d=b:"function"==typeof d?d=[d,b]:d.push(b)))}if(0===o||1===o){if(void 0===d)d=function(t,e){return e};else if("function"!=typeof d){var m=d;d=function(t,e){for(var r=e,n=0;n<m.length;n++)r=m[n].call(t,r);return r}}else{var w=d;d=function(t,e){return w.call(t,e)}}t.push(d)}0!==o&&(1===o?(u.get=f.get,u.set=f.set):2===o?u.value=f:3===o?u.get=f:4===o&&(u.set=f),i?1===o?(t.push((function(t,e){return f.get.call(t,e)})),t.push((function(t,e){return f.set.call(t,e)}))):2===o?t.push(f):t.push((function(t,e){return f.call(t,e)})):Object.defineProperty(e,n,u))}function f(t,e){e&&t.push((function(t){for(var r=0;r<e.length;r++)e[r].call(t);return t}))}let h;var p,g,v,y,b,m,w;function $(t,e){return function(r){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),T(r,"An initializer"),t.push(r)}}function k(t,e,r,n,o,a,i,s){var c;switch(o){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,l,d={kind:c,name:i?"#"+e:e,static:a,private:i},f={v:!1};0!==o&&(d.addInitializer=$(n,f)),0===o?i?(u=r.get,l=r.set):(u=function(){return this[e]},l=function(t){this[e]=t}):2===o?u=function(){return r.value}:(1!==o&&3!==o||(u=function(){return r.get.call(this)}),1!==o&&4!==o||(l=function(t){r.set.call(this,t)})),d.access=u&&l?{get:u,set:l}:u?{get:u}:{set:l};try{return t(s,d)}finally{f.v=!0}}function T(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function E(t,e){var r=typeof e;if(1===t){if("object"!==r||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&T(e.get,"accessor.get"),void 0!==e.set&&T(e.set,"accessor.set"),void 0!==e.init&&T(e.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function A(t,e,r,n,o,a,i,s){var c,u,l,d,f,h,p=r[0];if(i?c=0===o||1===o?{get:r[3],set:r[4]}:3===o?{get:r[3]}:4===o?{set:r[3]}:{value:r[3]}:0!==o&&(c=Object.getOwnPropertyDescriptor(e,n)),1===o?l={get:c.get,set:c.set}:2===o?l=c.value:3===o?l=c.get:4===o&&(l=c.set),"function"==typeof p)void 0!==(d=k(p,n,c,s,o,a,i,l))&&(E(o,d),0===o?u=d:1===o?(u=d.init,f=d.get||l.get,h=d.set||l.set,l={get:f,set:h}):l=d);else for(var g=p.length-1;g>=0;g--){var v;void 0!==(d=k(p[g],n,c,s,o,a,i,l))&&(E(o,d),0===o?v=d:1===o?(v=d.init,f=d.get||l.get,h=d.set||l.set,l={get:f,set:h}):l=d,void 0!==v&&(void 0===u?u=v:"function"==typeof u?u=[u,v]:u.push(v)))}if(0===o||1===o){if(void 0===u)u=function(t,e){return e};else if("function"!=typeof u){var y=u;u=function(t,e){for(var r=e,n=0;n<y.length;n++)r=y[n].call(t,r);return r}}else{var b=u;u=function(t,e){return b.call(t,e)}}t.push(u)}0!==o&&(1===o?(c.get=l.get,c.set=l.set):2===o?c.value=l:3===o?c.get=l:4===o&&(c.set=l),i?1===o?(t.push((function(t,e){return l.get.call(t,e)})),t.push((function(t,e){return l.set.call(t,e)}))):2===o?t.push(l):t.push((function(t,e){return l.call(t,e)})):Object.defineProperty(e,n,c))}function j(t,e){for(var r,n,o=[],a=new Map,i=new Map,s=0;s<e.length;s++){var c=e[s];if(Array.isArray(c)){var u,l,d=c[1],f=c[2],h=c.length>3,p=d>=5;if(p?(u=t,0!=(d-=5)&&(l=n=n||[])):(u=t.prototype,0!==d&&(l=r=r||[])),0!==d&&!h){var g=p?i:a,v=g.get(f)||0;if(!0===v||3===v&&4!==d||4===v&&3!==d)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+f);!v&&d>2?g.set(f,d):g.set(f,!0)}A(o,u,c,f,d,p,h,l)}}return x(o,r),x(o,n),o}function x(t,e){e&&t.push((function(t){for(var r=0;r<e.length;r++)e[r].call(t);return t}))}function z(t,e,r){return{e:j(t,e),get c(){return function(t,e){if(e.length>0){for(var r=[],n=t,o=t.name,a=e.length-1;a>=0;a--){var i={v:!1};try{var s=e[a](n,{kind:"class",name:o,addInitializer:$(r,i)})}finally{i.v=!0}void 0!==s&&(E(10,s),n=s)}return[n,function(){for(var t=0;t<r.length;t++)r[t].call(n)}]}}(t,r)}}}function I(t){return t}let N,O;o=(0,a.wA)({selector:"app-editable-table"}),[h,n]=(p=class{constructor(){this.users=[]}mount(){var t=this;i.Z.get("https://jsonplaceholder.typicode.com/users").then((function(t){return t.data})).then((function(e){t.users=e}))}onFormSubmit(t){t.preventDefault();const e=new FormData(t.currentTarget);console.log(JSON.stringify(Object.fromEntries(e),null,4))}render(){var t=this;return this.users.length?a.dy`
      <table class="table-bordered">
        <caption>
          Editable table. Edit any row, click on save and check console
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.users.map((function(e){let{id:r,name:n,email:o}=e;return a.dy`
              <tr>
                <td>
                  <form method="GET" id="inline-form-${r}" onsubmit=${t.onFormSubmit}></form>
                  <input type="hidden" name="id" value="${r}" form="inline-form-${r}" />
                  <input type="text" name="username" value="${n}" form="inline-form-${r}" />
                </td>
                <td>
                  <input type="text" name="email" value="${o}" form="inline-form-${r}" />
                </td>
                <td>
                  <button form="inline-form-${r}">save</button>
                </td>
              </tr>
            `}))}
        </tbody>
      </table>
    `:"Loading"}},g=[],v=[o],{e:function(t,e){for(var r,n,o=[],a=new Map,i=new Map,s=0;s<e.length;s++){var c=e[s];if(Array.isArray(c)){var u,l,h=c[1],p=c[2],g=c.length>3,v=h>=5;if(v?(u=t,0!=(h-=5)&&(l=n=n||[])):(u=t.prototype,0!==h&&(l=r=r||[])),0!==h&&!g){var y=v?i:a,b=y.get(p)||0;if(!0===b||3===b&&4!==h||4===b&&3!==h)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!b&&h>2?y.set(p,h):y.set(p,!0)}d(o,u,c,p,h,v,g,l)}}return f(o,r),f(o,n),o}(p,g),get c(){return function(t,e){if(e.length>0){for(var r=[],n=t,o=t.name,a=e.length-1;a>=0;a--){var i={v:!1};try{var c=e[a](n,{kind:"class",name:o,addInitializer:s(r,i)})}finally{i.v=!0}void 0!==c&&(l(10,c),n=c)}return[n,function(){for(var t=0;t<r.length;t++)r[t].call(n)}]}}(p,v)}}).c,n(),b=(0,a.wA)({selector:"app-row-item",styles:":host {\n      display: table-row-group;\n  }\n  .hide-row {\n      display: none;\n  }\n  :host > tr > td[colspan] table {\n      margin: 0;\n  }\n  "}),new([N,y]=z(class{constructor(){this.category=void 0,this.nestedRow=void 0}toggleNestedTable(){this.nestedRow.classList.toggle("hide-row")}populateNestedTable(){return this.category.questions.length?this.category.questions.map((function(t){return a.dy`<tr>
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.type}</td>
        </tr>`})):a.dy`<tr>
        <td colspan="3">Please add a question</td>
      </tr>`}render(){var t=this;return this.category?a.dy`
        <tr part="table-row">
          <td part="table-cell">${this.category.id}</td>
          <td part="table-cell">${this.category.name}</td>
          <td part="table-cell">
            <button
              onclick=${function(){t.toggleNestedTable()}}
            >
              toggle
            </button>
          </td>
        </tr>
        <tr
          part="table-row"
          ref=${function(e){t.nestedRow=e}}
          class="hide-row"
        >
          <td colspan="3">
            <table class="table-bordered">
              <thead>
                <tr>
                  <th>Question Id</th>
                  <th>Question</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                ${this.populateNestedTable()}
              </tbody>
            </table>
          </td>
        </tr>
      `:a.dy``}},[],[b]).c,class extends I{constructor(){super(N),this.observedProperties=["category"],y()}}),w=(0,a.wA)({selector:"app-nested-table"}),new([O,m]=z(class{constructor(){this.categories=[{id:1,name:"category 1",questions:[{id:1,name:"how are you",type:"text"},{id:2,name:"what you do",type:"text"}]},{id:2,name:"category 2",questions:[]}]}onAttributesChanged(t,e,r){console.log(t,e,r)}render(){return a.dy`
      <table class="table-bordered table-hover">
        <caption>
          Nested Table / Table with expandable rows
        </caption>
        <thead>
          <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th></th>
          </tr>
        </thead>
        ${this.categories.map((function(t){return a.dy`<app-row-item
            data-input=${{category:t}}
          ></app-row-item>`}))}
      </table>
      <br />
      <br />
      <app-editable-table></app-editable-table>
    `}},[],[w]).c,class extends I{constructor(){super(O),this.observedAttributes=["name"],m()}})}}]);