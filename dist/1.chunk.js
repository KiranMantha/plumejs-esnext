"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[1],{7001:(e,t,r)=>{r.r(t);var i,n,o=r(9980),s=r.n(o),a=r(1993),c=r(6512);function d(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),l(r,"An initializer"),e.push(r)}}function u(e,t,r,i,n,o,s,a){var c;switch(n){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var u,l,f={kind:c,name:s?"#"+t:t,static:o,private:s},h={v:!1};0!==n&&(f.addInitializer=d(i,h)),0===n?s?(u=r.get,l=r.set):(u=function(){return this[t]},l=function(e){this[t]=e}):2===n?u=function(){return r.value}:(1!==n&&3!==n||(u=function(){return r.get.call(this)}),1!==n&&4!==n||(l=function(e){r.set.call(this,e)})),f.access=u&&l?{get:u,set:l}:u?{get:u}:{set:l};try{return e(a,f)}finally{h.v=!0}}function l(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function f(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&l(t.get,"accessor.get"),void 0!==t.set&&l(t.set,"accessor.set"),void 0!==t.init&&l(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function h(e,t,r,i,n,o,s,a){var c,d,l,h,p,v,g=r[0];if(s?c=0===n||1===n?{get:r[3],set:r[4]}:3===n?{get:r[3]}:4===n?{set:r[3]}:{value:r[3]}:0!==n&&(c=Object.getOwnPropertyDescriptor(t,i)),1===n?l={get:c.get,set:c.set}:2===n?l=c.value:3===n?l=c.get:4===n&&(l=c.set),"function"==typeof g)void 0!==(h=u(g,i,c,a,n,o,s,l))&&(f(n,h),0===n?d=h:1===n?(d=h.init,p=h.get||l.get,v=h.set||l.set,l={get:p,set:v}):l=h);else for(var w=g.length-1;w>=0;w--){var y;void 0!==(h=u(g[w],i,c,a,n,o,s,l))&&(f(n,h),0===n?y=h:1===n?(y=h.init,p=h.get||l.get,v=h.set||l.set,l={get:p,set:v}):l=h,void 0!==y&&(void 0===d?d=y:"function"==typeof d?d=[d,y]:d.push(y)))}if(0===n||1===n){if(void 0===d)d=function(e,t){return t};else if("function"!=typeof d){var b=d;d=function(e,t){for(var r=t,i=0;i<b.length;i++)r=b[i].call(e,r);return r}}else{var m=d;d=function(e,t){return m.call(e,t)}}e.push(d)}0!==n&&(1===n?(c.get=l.get,c.set=l.set):2===n?c.value=l:3===n?c.get=l:4===n&&(c.set=l),s?1===n?(e.push((function(e,t){return l.get.call(e,t)})),e.push((function(e,t){return l.set.call(e,t)}))):2===n?e.push(l):e.push((function(e,t){return l.call(e,t)})):Object.defineProperty(t,i,c))}function p(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}let v;var g,w,y;n=(0,a.wA)({selector:"app-editor",styles:c.Z}),[v,i]=(g=class{constructor(){this.editorNode=void 0,this.previewNode=void 0,this.md=void 0,this.inEditMode=!0}beforeMount(){this.md=new(s())}editOrPreview(){if(this.editorNode.classList.toggle("show"),this.previewNode.classList.toggle("show"),this.inEditMode=!this.inEditMode,!this.inEditMode){const e=this.md.render(this.editorNode.value);this.previewNode.innerHTML=e}}render(){var e=this;return a.dy`
      <button
        onclick=${function(){e.editOrPreview()}}
      >
        Edit / Preview
      </button>
      <textarea
        ref=${function(t){e.editorNode=t}}
        class="editor show"
        placeholder="write your post here.."
      ></textarea>
      <div
        ref=${function(t){e.previewNode=t}}
        class="preview"
      ></div>
    `}},w=[],y=[n],{e:function(e,t){for(var r,i,n=[],o=new Map,s=new Map,a=0;a<t.length;a++){var c=t[a];if(Array.isArray(c)){var d,u,l=c[1],f=c[2],v=c.length>3,g=l>=5;if(g?(d=e,0!=(l-=5)&&(u=i=i||[])):(d=e.prototype,0!==l&&(u=r=r||[])),0!==l&&!v){var w=g?s:o,y=w.get(f)||0;if(!0===y||3===y&&4!==l||4===y&&3!==l)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+f);!y&&l>2?w.set(f,l):w.set(f,!0)}h(n,d,c,f,l,g,v,u)}}return p(n,r),p(n,i),n}(g,w),get c(){return function(e,t){if(t.length>0){for(var r=[],i=e,n=e.name,o=t.length-1;o>=0;o--){var s={v:!1};try{var a=t[o](i,{kind:"class",name:n,addInitializer:d(r,s)})}finally{s.v=!0}void 0!==a&&(f(10,a),i=a)}return[i,function(){for(var e=0;e<r.length;e++)r[e].call(i)}]}}(g,y)}}).c,i()},6512:(e,t,r)=>{r.d(t,{Z:()=>a});var i=r(8081),n=r.n(i),o=r(3645),s=r.n(o)()(n());s.push([e.id,".actions{display:flex}.actions button{width:auto;margin-left:10px}.editor,.preview{display:none;height:500px;font-size:100%;overflow:auto;border:1px solid #ccc;border-radius:10px;padding:20px}.editor.show,.preview.show{display:block}.editor{resize:none;width:100%}",""]);const a=s}}]);