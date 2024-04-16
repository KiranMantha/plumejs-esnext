"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{1494:(t,e,r)=>{r.r(e);var s,i,n=r(1257),a=r(5289),o=r(1863);function l(t,e){return function(r){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),u(r,"An initializer"),t.push(r)}}function c(t,e,r,s,i,n,a,o){var c;switch(i){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,h,d={kind:c,name:a?"#"+e:e,static:n,private:a},f={v:!1};0!==i&&(d.addInitializer=l(s,f)),0===i?a?(u=r.get,h=r.set):(u=function(){return this[e]},h=function(t){this[e]=t}):2===i?u=function(){return r.value}:(1!==i&&3!==i||(u=function(){return r.get.call(this)}),1!==i&&4!==i||(h=function(t){r.set.call(this,t)})),d.access=u&&h?{get:u,set:h}:u?{get:u}:{set:h};try{return t(o,d)}finally{f.v=!0}}function u(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function h(t,e){var r=typeof e;if(1===t){if("object"!==r||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&u(e.get,"accessor.get"),void 0!==e.set&&u(e.set,"accessor.set"),void 0!==e.init&&u(e.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function d(t,e,r,s,i,n,a,o){var l,u,d,f,p,v,g=r[0];if(a?l=0===i||1===i?{get:r[3],set:r[4]}:3===i?{get:r[3]}:4===i?{set:r[3]}:{value:r[3]}:0!==i&&(l=Object.getOwnPropertyDescriptor(e,s)),1===i?d={get:l.get,set:l.set}:2===i?d=l.value:3===i?d=l.get:4===i&&(d=l.set),"function"==typeof g)void 0!==(f=c(g,s,l,o,i,n,a,d))&&(h(i,f),0===i?u=f:1===i?(u=f.init,p=f.get||d.get,v=f.set||d.set,d={get:p,set:v}):d=f);else for(var m=g.length-1;m>=0;m--){var b;void 0!==(f=c(g[m],s,l,o,i,n,a,d))&&(h(i,f),0===i?b=f:1===i?(b=f.init,p=f.get||d.get,v=f.set||d.set,d={get:p,set:v}):d=f,void 0!==b&&(void 0===u?u=b:"function"==typeof u?u=[u,b]:u.push(b)))}if(0===i||1===i){if(void 0===u)u=function(t,e){return e};else if("function"!=typeof u){var y=u;u=function(t,e){for(var r=e,s=0;s<y.length;s++)r=y[s].call(t,r);return r}}else{var w=u;u=function(t,e){return w.call(t,e)}}t.push(u)}0!==i&&(1===i?(l.get=d.get,l.set=d.set):2===i?l.value=d:3===i?l.get=d:4===i&&(l.set=d),a?1===i?(t.push((function(t,e){return d.get.call(t,e)})),t.push((function(t,e){return d.set.call(t,e)}))):2===i?t.push(d):t.push((function(t,e){return d.call(t,e)})):Object.defineProperty(e,s,l))}function f(t,e){e&&t.push((function(t){for(var r=0;r<e.length;r++)e[r].call(t);return t}))}let p;var v,g,m;i=(0,a.wA)({selector:"app-items",deps:[o.F0]}),[p,s]=(v=class{constructor(t){this.sheetForm=new a.qu({name:["",[a.kI.required]],age:["",[a.kI.required]],salary:["",[a.kI.required]]}),this.apiUrl="https://script.google.com/macros/s/AKfycbzCyH7MIo7UFlhbkNWjbIyCp-Rae-CElryGsGM4oWSDeIx0QMOidUSlBEMs78kQZIsLCQ/exec",this.table=void 0,this.personsList=[],this.errorsRef=void 0}mount(){console.table(this.routerSrvc.getCurrentRoute()),this.getData()}submitForm(t){var e=this;t.preventDefault(),console.log(this.sheetForm.value),this.sheetForm.valid?(this.personsList.push(this.sheetForm.value),this.sheetForm.reset(),n.Z.get(this.apiUrl+`?f=insert&n=${value}`).then((function(t){return t.data})).then((function(t){t.data.success&&e.getData()}))):console.log(this.sheetForm.errors)}getData(){var t=this;n.Z.get(this.apiUrl).then((function(t){return t.data})).then((function(e){t.personsList=e.data}))}render(){var t=this;return a.dy`
      <section>
        <pre>
          <code ref=${function(e){t.errorsRef=e}}>${this.sheetForm.hasErrors?JSON.stringify(Object.fromEntries(this.sheetForm.errors),null,4):null}</code>
        </pre>
        <form
          onsubmit=${function(e){t.sheetForm.handleSubmit(e,t.submitForm)}}
        >
          <div class="field">
            <label class="label" for="exampleInputEmail1">Name</label>
            <div class="control">
              <input type="text" class="input" id="name" ${this.sheetForm.register("name")} />
            </div>
          </div>
          <div class="field">
            <label class="label" for="exampleInputPassword1">Age</label>
            <div class="control">
              <input type="text" class="input" id="age" ${this.sheetForm.register("age")} />
            </div>
          </div>
          <div class="field">
            <label class="label" for="exampleInputPassword1">Salary</label>
            <div class="control">
              <input type="text" class="input" id="salary" ${this.sheetForm.register("salary")} />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button  is-info is-light" type="submit">Submit</button>
            </div>
          </div>
        </form>
        <table class="table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            ${this.personsList.map((function(t){return a.dy`
                <tr>
                  <td>${t.name}</td>
                  <td>${t.age}</td>
                  <td>${t.salary}</td>
                </tr>
              `}))}
          </tbody>
        </table>
      </section>
    `}},g=[],m=[i],{e:function(t,e){for(var r,s,i=[],n=new Map,a=new Map,o=0;o<e.length;o++){var l=e[o];if(Array.isArray(l)){var c,u,h=l[1],p=l[2],v=l.length>3,g=h>=5;if(g?(c=t,0!=(h-=5)&&(u=s=s||[])):(c=t.prototype,0!==h&&(u=r=r||[])),0!==h&&!v){var m=g?a:n,b=m.get(p)||0;if(!0===b||3===b&&4!==h||4===b&&3!==h)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!b&&h>2?m.set(p,h):m.set(p,!0)}d(i,c,l,p,h,g,v,u)}}return f(i,r),f(i,s),i}(v,g),get c(){return function(t,e){if(e.length>0){for(var r=[],s=t,i=t.name,n=e.length-1;n>=0;n--){var a={v:!1};try{var o=e[n](s,{kind:"class",name:i,addInitializer:l(r,a)})}finally{a.v=!0}void 0!==o&&(h(10,o),s=o)}return[s,function(){for(var t=0;t<r.length;t++)r[t].call(s)}]}}(v,m)}}).c,s()}}]);