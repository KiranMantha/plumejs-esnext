"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[328],{1328:(e,t,i)=>{i.r(t);var s,a,l=i(702);function o(e,t){return function(i){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),r(i,"An initializer"),e.push(i)}}function n(e,t,i,s,a,l,n,r){var c;switch(a){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,d,p={kind:c,name:n?"#"+t:t,static:l,private:n},f={v:!1};0!==a&&(p.addInitializer=o(s,f)),0===a?n?(u=i.get,d=i.set):(u=function(){return this[t]},d=function(e){this[t]=e}):2===a?u=function(){return i.value}:(1!==a&&3!==a||(u=function(){return i.get.call(this)}),1!==a&&4!==a||(d=function(e){i.set.call(this,e)})),p.access=u&&d?{get:u,set:d}:u?{get:u}:{set:d};try{return e(r,p)}finally{f.v=!0}}function r(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function c(e,t){var i=typeof t;if(1===e){if("object"!==i||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&r(t.get,"accessor.get"),void 0!==t.set&&r(t.set,"accessor.set"),void 0!==t.init&&r(t.init,"accessor.init")}else if("function"!==i)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function u(e,t,i,s,a,l,o,r){var u,d,p,f,v,m,h=i[0];if(o?u=0===a||1===a?{get:i[3],set:i[4]}:3===a?{get:i[3]}:4===a?{set:i[3]}:{value:i[3]}:0!==a&&(u=Object.getOwnPropertyDescriptor(t,s)),1===a?p={get:u.get,set:u.set}:2===a?p=u.value:3===a?p=u.get:4===a&&(p=u.set),"function"==typeof h)void 0!==(f=n(h,s,u,r,a,l,o,p))&&(c(a,f),0===a?d=f:1===a?(d=f.init,v=f.get||p.get,m=f.set||p.set,p={get:v,set:m}):p=f);else for(var g=h.length-1;g>=0;g--){var b;void 0!==(f=n(h[g],s,u,r,a,l,o,p))&&(c(a,f),0===a?b=f:1===a?(b=f.init,v=f.get||p.get,m=f.set||p.set,p={get:v,set:m}):p=f,void 0!==b&&(void 0===d?d=b:"function"==typeof d?d=[d,b]:d.push(b)))}if(0===a||1===a){if(void 0===d)d=function(e,t){return t};else if("function"!=typeof d){var y=d;d=function(e,t){for(var i=t,s=0;s<y.length;s++)i=y[s].call(e,i);return i}}else{var w=d;d=function(e,t){return w.call(e,t)}}e.push(d)}0!==a&&(1===a?(u.get=p.get,u.set=p.set):2===a?u.value=p:3===a?u.get=p:4===a&&(u.set=p),o?1===a?(e.push((function(e,t){return p.get.call(e,t)})),e.push((function(e,t){return p.set.call(e,t)}))):2===a?e.push(p):e.push((function(e,t){return p.call(e,t)})):Object.defineProperty(t,s,u))}function d(e,t){t&&e.push((function(e){for(var i=0;i<t.length;i++)t[i].call(e);return e}))}let p;var f,v,m;a=(0,l.wA)({selector:"app-sample-form"}),[p,s]=(f=class{constructor(){this.sampleform1=void 0,this.createChangeHandler1=void 0,this.formOutputRef1=void 0,this.sampleform2=void 0,this.createChangeHandler2=void 0,this.formOutputRef2=void 0}beforeMount(){[this.sampleform1,this.createChangeHandler1]=(0,l.useFormFields)({email:"test.email@sample.com",password:"1234",checkme:!0,option:"",options:[["2","4"]]}),[this.sampleform2,this.createChangeHandler2]=(0,l.useFormFields)({name:"",age:""})}submitForm1(e){e.preventDefault(),(0,l.sY)(this.formOutputRef1,l.dy` <pre>${JSON.stringify(this.sampleform1.value,null,4)}</pre> `)}submitForm2(e){e.preventDefault(),(0,l.sY)(this.formOutputRef2,l.dy` <pre>${JSON.stringify(this.sampleform2.value,null,4)}</pre> `)}render(){var e=this;return l.dy`
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
    `}},v=[],m=[a],{e:function(e,t){for(var i,s,a=[],l=new Map,o=new Map,n=0;n<t.length;n++){var r=t[n];if(Array.isArray(r)){var c,p,f=r[1],v=r[2],m=r.length>3,h=f>=5;if(h?(c=e,0!=(f-=5)&&(p=s=s||[])):(c=e.prototype,0!==f&&(p=i=i||[])),0!==f&&!m){var g=h?o:l,b=g.get(v)||0;if(!0===b||3===b&&4!==f||4===b&&3!==f)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+v);!b&&f>2?g.set(v,f):g.set(v,!0)}u(a,c,r,v,f,h,m,p)}}return d(a,i),d(a,s),a}(f,v),get c(){return function(e,t){if(t.length>0){for(var i=[],s=e,a=e.name,l=t.length-1;l>=0;l--){var n={v:!1};try{var r=t[l](s,{kind:"class",name:a,addInitializer:o(i,n)})}finally{n.v=!0}void 0!==r&&(c(10,r),s=r)}return[s,function(){for(var e=0;e<i.length;e++)i[e].call(s)}]}}(f,m)}}).c,s()}}]);