"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[518],{5518:(t,e,r)=>{r.r(e);var n,o,a,s,i=r(56);function c(t,e){return function(r){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),u(r,"An initializer"),t.push(r)}}function l(t,e,r,n,o,a,s,i){var l;switch(o){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var u,d,h={kind:l,name:s?"#"+e:e,static:a,private:s},p={v:!1};0!==o&&(h.addInitializer=c(n,p)),0===o?s?(u=r.get,d=r.set):(u=function(){return this[e]},d=function(t){this[e]=t}):2===o?u=function(){return r.value}:(1!==o&&3!==o||(u=function(){return r.get.call(this)}),1!==o&&4!==o||(d=function(t){r.set.call(this,t)})),h.access=u&&d?{get:u,set:d}:u?{get:u}:{set:d};try{return t(i,h)}finally{p.v=!0}}function u(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function d(t,e){var r=typeof e;if(1===t){if("object"!==r||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&u(e.get,"accessor.get"),void 0!==e.set&&u(e.set,"accessor.set"),void 0!==e.init&&u(e.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function h(t,e,r,n,o,a,s,i){var c,u,h,p,f,g,y=r[0];if(s?c=0===o||1===o?{get:r[3],set:r[4]}:3===o?{get:r[3]}:4===o?{set:r[3]}:{value:r[3]}:0!==o&&(c=Object.getOwnPropertyDescriptor(e,n)),1===o?h={get:c.get,set:c.set}:2===o?h=c.value:3===o?h=c.get:4===o&&(h=c.set),"function"==typeof y)void 0!==(p=l(y,n,c,i,o,a,s,h))&&(d(o,p),0===o?u=p:1===o?(u=p.init,f=p.get||h.get,g=p.set||h.set,h={get:f,set:g}):h=p);else for(var b=y.length-1;b>=0;b--){var v;void 0!==(p=l(y[b],n,c,i,o,a,s,h))&&(d(o,p),0===o?v=p:1===o?(v=p.init,f=p.get||h.get,g=p.set||h.set,h={get:f,set:g}):h=p,void 0!==v&&(void 0===u?u=v:"function"==typeof u?u=[u,v]:u.push(v)))}if(0===o||1===o){if(void 0===u)u=function(t,e){return e};else if("function"!=typeof u){var w=u;u=function(t,e){for(var r=e,n=0;n<w.length;n++)r=w[n].call(t,r);return r}}else{var m=u;u=function(t,e){return m.call(t,e)}}t.push(u)}0!==o&&(1===o?(c.get=h.get,c.set=h.set):2===o?c.value=h:3===o?c.get=h:4===o&&(c.set=h),s?1===o?(t.push((function(t,e){return h.get.call(t,e)})),t.push((function(t,e){return h.set.call(t,e)}))):2===o?t.push(h):t.push((function(t,e){return h.call(t,e)})):Object.defineProperty(e,n,c))}function p(t,e){for(var r,n,o=[],a=new Map,s=new Map,i=0;i<e.length;i++){var c=e[i];if(Array.isArray(c)){var l,u,d=c[1],p=c[2],g=c.length>3,y=d>=5;if(y?(l=t,0!=(d-=5)&&(u=n=n||[])):(l=t.prototype,0!==d&&(u=r=r||[])),0!==d&&!g){var b=y?s:a,v=b.get(p)||0;if(!0===v||3===v&&4!==d||4===v&&3!==d)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!v&&d>2?b.set(p,d):b.set(p,!0)}h(o,l,c,p,d,y,g,u)}}return f(o,r),f(o,n),o}function f(t,e){e&&t.push((function(t){for(var r=0;r<e.length;r++)e[r].call(t);return t}))}function g(t,e,r){return{e:p(t,e),get c(){return function(t,e){if(e.length>0){for(var r=[],n=t,o=t.name,a=e.length-1;a>=0;a--){var s={v:!1};try{var i=e[a](n,{kind:"class",name:o,addInitializer:c(r,s)})}finally{s.v=!0}void 0!==i&&(d(10,i),n=i)}return[n,function(){for(var t=0;t<r.length;t++)r[t].call(n)}]}}(t,r)}}}function y(t){return t}let b,v;o=(0,i.wA)({selector:"app-row-item",styles:":host {\n      display: table-row-group;\n  }\n  .hide-row {\n      display: none;\n  }\n  :host > tr > td[colspan] table {\n      margin: 0;\n  }\n  "}),new([b,n]=g(class{constructor(){this.category=void 0,this.nestedRow=void 0}toggleNestedTable(){this.nestedRow.classList.toggle("hide-row")}populateNestedTable(){return this.category.questions.length?this.category.questions.map((function(t){return i.dy`<tr>
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.type}</td>
        </tr>`})):i.dy`<tr>
        <td colspan="3">Please add a question</td>
      </tr>`}render(){var t=this;return this.category?i.dy`
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
      `:i.dy``}},[],[o]).c,class extends y{constructor(){super(b),this.observedProperties=["category"],n()}}),s=(0,i.wA)({selector:"app-nested-table"}),new([v,a]=g(class{constructor(){this.categories=[{id:1,name:"category 1",questions:[{id:1,name:"how are you",type:"text"},{id:2,name:"what you do",type:"text"}]},{id:2,name:"category 2",questions:[]}]}onAttributesChanged(t,e,r){console.log(t,e,r)}render(){return i.dy`
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
        ${this.categories.map((function(t){return i.dy`<app-row-item
            onbindprops=${function(){return{category:t}}}
          ></app-row-item>`}))}
      </table>
    `}},[],[s]).c,class extends y{constructor(){super(v),this.observedAttributes=["name"],a()}})}}]);