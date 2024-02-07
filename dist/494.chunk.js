"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{1494:(e,t,r)=>{r.r(t);var s,n,a=r(1257),i=r(5289),o=r(1863);function l(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),u(r,"An initializer"),e.push(r)}}function c(e,t,r,s,n,a,i,o){var c;switch(n){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,h,d={kind:c,name:i?"#"+t:t,static:a,private:i},f={v:!1};0!==n&&(d.addInitializer=l(s,f)),0===n?i?(u=r.get,h=r.set):(u=function(){return this[t]},h=function(e){this[t]=e}):2===n?u=function(){return r.value}:(1!==n&&3!==n||(u=function(){return r.get.call(this)}),1!==n&&4!==n||(h=function(e){r.set.call(this,e)})),d.access=u&&h?{get:u,set:h}:u?{get:u}:{set:h};try{return e(o,d)}finally{f.v=!0}}function u(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function h(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&u(t.get,"accessor.get"),void 0!==t.set&&u(t.set,"accessor.set"),void 0!==t.init&&u(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function d(e,t,r,s,n,a,i,o){var l,u,d,f,v,p,g=r[0];if(i?l=0===n||1===n?{get:r[3],set:r[4]}:3===n?{get:r[3]}:4===n?{set:r[3]}:{value:r[3]}:0!==n&&(l=Object.getOwnPropertyDescriptor(t,s)),1===n?d={get:l.get,set:l.set}:2===n?d=l.value:3===n?d=l.get:4===n&&(d=l.set),"function"==typeof g)void 0!==(f=c(g,s,l,o,n,a,i,d))&&(h(n,f),0===n?u=f:1===n?(u=f.init,v=f.get||d.get,p=f.set||d.set,d={get:v,set:p}):d=f);else for(var m=g.length-1;m>=0;m--){var b;void 0!==(f=c(g[m],s,l,o,n,a,i,d))&&(h(n,f),0===n?b=f:1===n?(b=f.init,v=f.get||d.get,p=f.set||d.set,d={get:v,set:p}):d=f,void 0!==b&&(void 0===u?u=b:"function"==typeof u?u=[u,b]:u.push(b)))}if(0===n||1===n){if(void 0===u)u=function(e,t){return t};else if("function"!=typeof u){var y=u;u=function(e,t){for(var r=t,s=0;s<y.length;s++)r=y[s].call(e,r);return r}}else{var w=u;u=function(e,t){return w.call(e,t)}}e.push(u)}0!==n&&(1===n?(l.get=d.get,l.set=d.set):2===n?l.value=d:3===n?l.get=d:4===n&&(l.set=d),i?1===n?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===n?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,s,l))}function f(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}let v;var p,g,m;n=(0,i.wA)({selector:"app-items",deps:[o.F0]}),[v,s]=(p=class{constructor(e){this.sheetForm=void 0,this.apiUrl="https://script.google.com/macros/s/AKfycbzCyH7MIo7UFlhbkNWjbIyCp-Rae-CElryGsGM4oWSDeIx0QMOidUSlBEMs78kQZIsLCQ/exec",this.table=void 0,this.personsList=[],this.errorsRef=void 0}beforeMount(){this.sheetForm=new i.qu({name:["",[i.kI.required]],age:["",[i.kI.required]],salary:["",[i.kI.required]]})}mount(){console.table(this.routerSrvc.getCurrentRoute()),this.getData()}submitForm(e){var t=this;e.preventDefault(),console.log(this.sheetForm.value),this.sheetForm.valid?(this.personsList.push(this.sheetForm.value),this.sheetForm.reset(),a.Z.get(this.apiUrl+`?f=insert&n=${value}`).then((function(e){return e.data})).then((function(e){e.data.success&&t.getData()}))):console.log(this.sheetForm.errors)}getData(){var e=this;a.Z.get(this.apiUrl).then((function(e){return e.data})).then((function(t){e.personsList=t.data}))}render(){var e=this;return i.dy`
      <section>
        <pre>
          <code ref=${function(t){e.errorsRef=t}}>${this.sheetForm.hasErrors?JSON.stringify(Object.fromEntries(this.sheetForm.errors),null,4):null}</code>
        </pre>
        <form
          onsubmit=${function(t){e.submitForm(t)}}
        >
          <div class="field">
            <label class="label" for="exampleInputEmail1">Name</label>
            <div class="control">
              <input
                type="text"
                class="input"
                id="name"
                value=${this.sheetForm.getControl("name").value}
                onchange=${this.sheetForm.changeHandler("name")}
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="exampleInputPassword1">Age</label>
            <div class="control">
              <input
                type="text"
                class="input"
                id="age"
                value=${this.sheetForm.getControl("age").value}
                onchange=${this.sheetForm.changeHandler("age")}
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="exampleInputPassword1">Salary</label>
            <div class="control">
              <input
                type="text"
                class="input"
                id="salary"
                value=${this.sheetForm.getControl("salary").value}
                onchange=${this.sheetForm.changeHandler("salary")}
              />
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
            ${this.personsList.map((function(e){return i.dy`
                <tr>
                  <td>${e.name}</td>
                  <td>${e.age}</td>
                  <td>${e.salary}</td>
                </tr>
              `}))}
          </tbody>
        </table>
      </section>
    `}},g=[],m=[n],{e:function(e,t){for(var r,s,n=[],a=new Map,i=new Map,o=0;o<t.length;o++){var l=t[o];if(Array.isArray(l)){var c,u,h=l[1],v=l[2],p=l.length>3,g=h>=5;if(g?(c=e,0!=(h-=5)&&(u=s=s||[])):(c=e.prototype,0!==h&&(u=r=r||[])),0!==h&&!p){var m=g?i:a,b=m.get(v)||0;if(!0===b||3===b&&4!==h||4===b&&3!==h)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+v);!b&&h>2?m.set(v,h):m.set(v,!0)}d(n,c,l,v,h,g,p,u)}}return f(n,r),f(n,s),n}(p,g),get c(){return function(e,t){if(t.length>0){for(var r=[],s=e,n=e.name,a=t.length-1;a>=0;a--){var i={v:!1};try{var o=t[a](s,{kind:"class",name:n,addInitializer:l(r,i)})}finally{i.v=!0}void 0!==o&&(h(10,o),s=o)}return[s,function(){for(var e=0;e<r.length;e++)r[e].call(s)}]}}(p,m)}}).c,s()}}]);