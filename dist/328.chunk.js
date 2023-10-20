"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[328],{1328:(e,t,i)=>{i.r(t);var a,s,l=i(1993);function o(e,t){return function(i){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),r(i,"An initializer"),e.push(i)}}function n(e,t,i,a,s,l,n,r){var c;switch(s){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,p,d={kind:c,name:n?"#"+t:t,static:l,private:n},f={v:!1};0!==s&&(d.addInitializer=o(a,f)),0===s?n?(u=i.get,p=i.set):(u=function(){return this[t]},p=function(e){this[t]=e}):2===s?u=function(){return i.value}:(1!==s&&3!==s||(u=function(){return i.get.call(this)}),1!==s&&4!==s||(p=function(e){i.set.call(this,e)})),d.access=u&&p?{get:u,set:p}:u?{get:u}:{set:p};try{return e(r,d)}finally{f.v=!0}}function r(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function c(e,t){var i=typeof t;if(1===e){if("object"!==i||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&r(t.get,"accessor.get"),void 0!==t.set&&r(t.set,"accessor.set"),void 0!==t.init&&r(t.init,"accessor.init")}else if("function"!==i)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function u(e,t,i,a,s,l,o,r){var u,p,d,f,v,m,h=i[0];if(o?u=0===s||1===s?{get:i[3],set:i[4]}:3===s?{get:i[3]}:4===s?{set:i[3]}:{value:i[3]}:0!==s&&(u=Object.getOwnPropertyDescriptor(t,a)),1===s?d={get:u.get,set:u.set}:2===s?d=u.value:3===s?d=u.get:4===s&&(d=u.set),"function"==typeof h)void 0!==(f=n(h,a,u,r,s,l,o,d))&&(c(s,f),0===s?p=f:1===s?(p=f.init,v=f.get||d.get,m=f.set||d.set,d={get:v,set:m}):d=f);else for(var g=h.length-1;g>=0;g--){var b;void 0!==(f=n(h[g],a,u,r,s,l,o,d))&&(c(s,f),0===s?b=f:1===s?(b=f.init,v=f.get||d.get,m=f.set||d.set,d={get:v,set:m}):d=f,void 0!==b&&(void 0===p?p=b:"function"==typeof p?p=[p,b]:p.push(b)))}if(0===s||1===s){if(void 0===p)p=function(e,t){return t};else if("function"!=typeof p){var y=p;p=function(e,t){for(var i=t,a=0;a<y.length;a++)i=y[a].call(e,i);return i}}else{var w=p;p=function(e,t){return w.call(e,t)}}e.push(p)}0!==s&&(1===s?(u.get=d.get,u.set=d.set):2===s?u.value=d:3===s?u.get=d:4===s&&(u.set=d),o?1===s?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===s?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,a,u))}function p(e,t){t&&e.push((function(e){for(var i=0;i<t.length;i++)t[i].call(e);return e}))}let d;var f,v,m;s=(0,l.wA)({selector:"app-sample-form"}),[d,a]=(f=class{constructor(){this.sampleform1=void 0,this.createChangeHandler1=void 0,this.formOutputRef1=void 0,this.sampleform2=void 0,this.createChangeHandler2=void 0,this.formOutputRef2=void 0}beforeMount(){[this.sampleform1,this.createChangeHandler1]=(0,l.uA)({email:"test.email@sample.com",password:"1234",checkme:!0,option:"",options:[["2","4"]]}),[this.sampleform2,this.createChangeHandler2]=(0,l.uA)({name:"",age:""})}submitForm1(e){e.preventDefault(),(0,l.sY)(this.formOutputRef1,l.dy` <pre>${JSON.stringify(this.sampleform1.value,null,4)}</pre> `)}submitForm2(e){e.preventDefault(),(0,l.sY)(this.formOutputRef2,l.dy` <pre>${JSON.stringify(this.sampleform2.value,null,4)}</pre> `)}render(){var e=this;return l.dy`
      <h5 class="title is-5">sample form 1</h5>
      <form
        onsubmit=${function(t){e.submitForm1(t)}}
      >
        <div class="field">
          <label class="label" for="exampleInputEmail1">Email address</label>
          <div class="control">
            <input
              type="email"
              class="input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value=${this.sampleform1.get("email").value}
              oninput=${this.createChangeHandler1("email")}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="exampleInputPassword1">Password</label>
          <div class="control">
            <input
              type="password"
              class="input"
              id="exampleInputPassword1"
              placeholder="Password"
              value=${this.sampleform1.get("password").value}
              oninput=${this.createChangeHandler1("password")}
            />
          </div>
        </div>
        <div class="field form-check">
          <div class="control">
            <label class="checkbox" for="exampleCheck1">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                checked=${this.sampleform1.get("checkme").value}
                onchange=${this.createChangeHandler1("checkme")}
              />
              Check me out
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">single select</label>
          <div class="control">
            <div class="select">
              <select value=${this.sampleform1.get("option").value} onchange=${this.createChangeHandler1("option")}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">multi select</label>
          <div class="control">
            <div class="select is-multiple">
              <select
                multiple
                value=${this.sampleform1.get("options").value}
                onchange=${this.createChangeHandler1("options")}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button
              onclick=${function(t){t.preventDefault(),e.sampleform1.reset(),console.log(e.sampleform1)}}
            >
              Reset
            </button>
            <button class="button is-info is-light" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div
        ref="${function(t){e.formOutputRef1=t}}"
      ></div>
      <br />
      <br />
      <h5 class="title is-5">sample form 2</h5>
      <form
        onsubmit="${function(t){e.submitForm2(t)}}"
      >
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input
              class="input"
              id="name"
              value=${this.sampleform2.get("name").value}
              onchange=${this.createChangeHandler2("name")}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="age">Age</label>
          <div class="control">
            <input
              class="input"
              id="age"
              value=${this.sampleform2.get("age").value}
              onchange=${this.createChangeHandler2("age")}
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button  is-info is-light" type="submit">Submit me too</button>
          </div>
        </div>
      </form>
      <div
        ref="${function(t){e.formOutputRef2=t}}"
      ></div>
    `}},v=[],m=[s],{e:function(e,t){for(var i,a,s=[],l=new Map,o=new Map,n=0;n<t.length;n++){var r=t[n];if(Array.isArray(r)){var c,d,f=r[1],v=r[2],m=r.length>3,h=f>=5;if(h?(c=e,0!=(f-=5)&&(d=a=a||[])):(c=e.prototype,0!==f&&(d=i=i||[])),0!==f&&!m){var g=h?o:l,b=g.get(v)||0;if(!0===b||3===b&&4!==f||4===b&&3!==f)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+v);!b&&f>2?g.set(v,f):g.set(v,!0)}u(s,c,r,v,f,h,m,d)}}return p(s,i),p(s,a),s}(f,v),get c(){return function(e,t){if(t.length>0){for(var i=[],a=e,s=e.name,l=t.length-1;l>=0;l--){var n={v:!1};try{var r=t[l](a,{kind:"class",name:s,addInitializer:o(i,n)})}finally{n.v=!0}void 0!==r&&(c(10,r),a=r)}return[a,function(){for(var e=0;e<i.length;e++)i[e].call(a)}]}}(f,m)}}).c,a()}}]);