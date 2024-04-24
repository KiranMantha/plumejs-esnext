"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[682],{682:(t,e,n)=>{n.r(e);var s,r,i,o,a,c,u=n(702);function l(t){return t}function h(t,e){return function(n){(function(t,e){if(t.v)throw new Error("attempted to call addInitializer after decoration was finished")})(e),d(n,"An initializer"),t.push(n)}}function f(t,e,n,s,r,i,o,a){var c;switch(r){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,l,f={kind:c,name:o?"#"+e:e,static:i,private:o},d={v:!1};0!==r&&(f.addInitializer=h(s,d)),0===r?o?(u=n.get,l=n.set):(u=function(){return this[e]},l=function(t){this[e]=t}):2===r?u=function(){return n.value}:(1!==r&&3!==r||(u=function(){return n.get.call(this)}),1!==r&&4!==r||(l=function(t){n.set.call(this,t)})),f.access=u&&l?{get:u,set:l}:u?{get:u}:{set:l};try{return t(a,f)}finally{d.v=!0}}function d(t,e){if("function"!=typeof t)throw new TypeError(e+" must be a function")}function p(t,e){var n=typeof e;if(1===t){if("object"!==n||null===e)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==e.get&&d(e.get,"accessor.get"),void 0!==e.set&&d(e.set,"accessor.set"),void 0!==e.init&&d(e.init,"accessor.init")}else if("function"!==n)throw new TypeError((0===t?"field":10===t?"class":"method")+" decorators must return a function or void 0")}function g(t,e,n,s,r,i,o,a){var c,u,l,h,d,g,v=n[0];if(o?c=0===r||1===r?{get:n[3],set:n[4]}:3===r?{get:n[3]}:4===r?{set:n[3]}:{value:n[3]}:0!==r&&(c=Object.getOwnPropertyDescriptor(e,s)),1===r?l={get:c.get,set:c.set}:2===r?l=c.value:3===r?l=c.get:4===r&&(l=c.set),"function"==typeof v)void 0!==(h=f(v,s,c,a,r,i,o,l))&&(p(r,h),0===r?u=h:1===r?(u=h.init,d=h.get||l.get,g=h.set||l.set,l={get:d,set:g}):l=h);else for(var m=v.length-1;m>=0;m--){var y;void 0!==(h=f(v[m],s,c,a,r,i,o,l))&&(p(r,h),0===r?y=h:1===r?(y=h.init,d=h.get||l.get,g=h.set||l.set,l={get:d,set:g}):l=h,void 0!==y&&(void 0===u?u=y:"function"==typeof u?u=[u,y]:u.push(y)))}if(0===r||1===r){if(void 0===u)u=function(t,e){return e};else if("function"!=typeof u){var b=u;u=function(t,e){for(var n=e,s=0;s<b.length;s++)n=b[s].call(t,n);return n}}else{var w=u;u=function(t,e){return w.call(t,e)}}t.push(u)}0!==r&&(1===r?(c.get=l.get,c.set=l.set):2===r?c.value=l:3===r?c.get=l:4===r&&(c.set=l),o?1===r?(t.push((function(t,e){return l.get.call(t,e)})),t.push((function(t,e){return l.set.call(t,e)}))):2===r?t.push(l):t.push((function(t,e){return l.call(t,e)})):Object.defineProperty(e,s,c))}function v(t,e){for(var n,s,r=[],i=new Map,o=new Map,a=0;a<e.length;a++){var c=e[a];if(Array.isArray(c)){var u,l,h=c[1],f=c[2],d=c.length>3,p=h>=5;if(p?(u=t,0!=(h-=5)&&(l=s=s||[])):(u=t.prototype,0!==h&&(l=n=n||[])),0!==h&&!d){var v=p?o:i,y=v.get(f)||0;if(!0===y||3===y&&4!==h||4===y&&3!==h)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+f);!y&&h>2?v.set(f,h):v.set(f,!0)}g(r,u,c,f,h,p,d,l)}}return m(r,n),m(r,s),r}function m(t,e){e&&t.push((function(t){for(var n=0;n<e.length;n++)e[n].call(t);return t}))}function y(t,e,n){return{e:v(t,e),get c(){return function(t,e){if(e.length>0){for(var n=[],s=t,r=t.name,i=e.length-1;i>=0;i--){var o={v:!1};try{var a=e[i](s,{kind:"class",name:r,addInitializer:h(n,o)})}finally{o.v=!0}void 0!==a&&(p(10,a),s=a)}return[s,function(){for(var t=0;t<n.length;t++)n[t].call(s)}]}}(t,n)}}}let b,w,C;r=(0,u.GS)(),[b,s]=y(class{constructor(){this.greeting="hello world"}},[],[r]).c,s(),o=(0,u.wA)({selector:"conditional-component"}),new([w,i]=y(class{constructor(){this.name=void 0,this.val=(0,u.td)(1)}render(){var t=this;return u.dy` <p>rendering conditionally ${this.name} ${this.val().toString()}</p>
      <button
        onclick=${function(){t.val.set((function(t){return t+1}))}}
      >
        click
      </button>`}},[],[o]).c,class extends l{constructor(){super(w),this.observedProperties=["name"],i()}}),c=(0,u.wA)({selector:"app-experiments",deps:[u.Th,b]}),[C,a]=y(class{constructor(t,e){this.setClass1=!0,this.setClass2=!0,this.state={},this.update=void 0,this.name="test"}beforeMount(){var t;this.update=(t=this.state,function(e){Object.assign(t,e)})}updateService(){this.expService.greeting="hey world",this.renderer.update()}toggleClass1(){this.setClass1=!this.setClass1}toggleClass2(){this.setClass2=!this.setClass2}render(){var t=this;return u.dy` <p
        class="test ${this.setClass1?"class1":""} ${this.setClass2?"class2":""}"
        ${this.setClass1?"hidden":""}
      >
        ${this.expService.greeting}
      </p>
      ${this.setClass1?u.dy`<conditional-component data-input=${{name:this.name}}></conditional-component>`:""}
      <p>${JSON.stringify(this.state,null,2)}</p>
      <button onclick=${function(){return t.toggleClass1()}}>toggle class1</button>
      <button onclick=${function(){return t.toggleClass2()}}>toggle class2</button>
      <button
        onclick=${function(){t.update({a:Math.random()}),t.name="test"+Math.random()}}
      >
        update state
      </button>
      <conditional-component data-input=${{name:this.name}}></conditional-component>`}},[],[c]).c,a()}}]);