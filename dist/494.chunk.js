"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{1494:(e,t,r)=>{r.r(t);var s,i,n=r(2956),a=r(1993),o=r(1863);function l(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),u(r,"An initializer"),e.push(r)}}function c(e,t,r,s,i,n,a,o){var c;switch(i){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,h,d={kind:c,name:a?"#"+t:t,static:n,private:a},f={v:!1};0!==i&&(d.addInitializer=l(s,f)),0===i?a?(u=r.get,h=r.set):(u=function(){return this[t]},h=function(e){this[t]=e}):2===i?u=function(){return r.value}:(1!==i&&3!==i||(u=function(){return r.get.call(this)}),1!==i&&4!==i||(h=function(e){r.set.call(this,e)})),d.access=u&&h?{get:u,set:h}:u?{get:u}:{set:h};try{return e(o,d)}finally{f.v=!0}}function u(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function h(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&u(t.get,"accessor.get"),void 0!==t.set&&u(t.set,"accessor.set"),void 0!==t.init&&u(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function d(e,t,r,s,i,n,a,o){var l,u,d,f,v,p,g=r[0];if(a?l=0===i||1===i?{get:r[3],set:r[4]}:3===i?{get:r[3]}:4===i?{set:r[3]}:{value:r[3]}:0!==i&&(l=Object.getOwnPropertyDescriptor(t,s)),1===i?d={get:l.get,set:l.set}:2===i?d=l.value:3===i?d=l.get:4===i&&(d=l.set),"function"==typeof g)void 0!==(f=c(g,s,l,o,i,n,a,d))&&(h(i,f),0===i?u=f:1===i?(u=f.init,v=f.get||d.get,p=f.set||d.set,d={get:v,set:p}):d=f);else for(var m=g.length-1;m>=0;m--){var b;void 0!==(f=c(g[m],s,l,o,i,n,a,d))&&(h(i,f),0===i?b=f:1===i?(b=f.init,v=f.get||d.get,p=f.set||d.set,d={get:v,set:p}):d=f,void 0!==b&&(void 0===u?u=b:"function"==typeof u?u=[u,b]:u.push(b)))}if(0===i||1===i){if(void 0===u)u=function(e,t){return t};else if("function"!=typeof u){var y=u;u=function(e,t){for(var r=t,s=0;s<y.length;s++)r=y[s].call(e,r);return r}}else{var w=u;u=function(e,t){return w.call(e,t)}}e.push(u)}0!==i&&(1===i?(l.get=d.get,l.set=d.set):2===i?l.value=d:3===i?l.get=d:4===i&&(l.set=d),a?1===i?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===i?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,s,l))}function f(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}let v;var p,g,m;i=(0,a.wA)({selector:"app-items",deps:[o.F0]}),[v,s]=(p=class{constructor(e){this.sheetForm=void 0,this.changeHandler=void 0,this.resetForm=void 0,this.apiUrl="https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4",this.table=void 0,this.personsList=[],this.errorsRef=void 0}beforeMount(){[this.sheetForm,this.changeHandler,this.resetForm]=(0,a.uA)({name:["",a.kI.required],age:["",a.kI.required],salary:["",a.kI.required]})}mount(){console.table(this.routerSrvc.getCurrentRoute()),this.getData()}getErrorSummary(){console.log(this.sheetForm.errors),this.errorsRef.innerHTML=JSON.stringify(Object.fromEntries(this.sheetForm.errors),null,4).trim()}submitForm(e){var t=this;e.preventDefault(),this.errorsRef.innerHTML="",this.sheetForm.valid?n.Z.post(this.apiUrl,this.sheetForm.value).then((function(e){return e.data})).then((function(e){t.personsList.push(...e),t.sheetForm.reset()})):this.getErrorSummary()}getData(){var e=this;n.Z.get(this.apiUrl).then((function(e){return e.data})).then((function(t){e.personsList=t,setTimeout((function(){e.personsList.push({name:"test",age:"20",salary:"30000"})}),2e3)}))}render(){var e=this;return a.dy`
      <section>
        <pre>
          <code ref=${function(t){e.errorsRef=t}}></code>
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
                value=${this.sheetForm.get("name").value}
                onchange=${this.changeHandler("name")}
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
                value=${this.sheetForm.get("age").value}
                onchange=${this.changeHandler("age")}
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
                value=${this.sheetForm.get("salary").value}
                onchange=${this.changeHandler("salary")}
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
            ${this.personsList.map((function(e){return a.dy`
                <tr>
                  <td>${e.name}</td>
                  <td>${e.age}</td>
                  <td>${e.salary}</td>
                </tr>
              `}))}
          </tbody>
        </table>
      </section>
    `}},g=[],m=[i],{e:function(e,t){for(var r,s,i=[],n=new Map,a=new Map,o=0;o<t.length;o++){var l=t[o];if(Array.isArray(l)){var c,u,h=l[1],v=l[2],p=l.length>3,g=h>=5;if(g?(c=e,0!=(h-=5)&&(u=s=s||[])):(c=e.prototype,0!==h&&(u=r=r||[])),0!==h&&!p){var m=g?a:n,b=m.get(v)||0;if(!0===b||3===b&&4!==h||4===b&&3!==h)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+v);!b&&h>2?m.set(v,h):m.set(v,!0)}d(i,c,l,v,h,g,p,u)}}return f(i,r),f(i,s),i}(p,g),get c(){return function(e,t){if(t.length>0){for(var r=[],s=e,i=e.name,n=t.length-1;n>=0;n--){var a={v:!1};try{var o=t[n](s,{kind:"class",name:i,addInitializer:l(r,a)})}finally{a.v=!0}void 0!==o&&(h(10,o),s=o)}return[s,function(){for(var e=0;e<r.length;e++)r[e].call(s)}]}}(p,m)}}).c,s()}}]);