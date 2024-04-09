"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[551],{6551:(e,t,s)=>{s.r(t);var n,r,i=s(5289);function a(e,t){return function(s){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),o(s,"An initializer"),e.push(s)}}function c(e,t,s,n,r,i,c,o){var u;switch(r){case 1:u="accessor";break;case 2:u="method";break;case 3:u="getter";break;case 4:u="setter";break;default:u="field"}var l,h,f={kind:u,name:c?"#"+t:t,static:i,private:c},p={v:!1};0!==r&&(f.addInitializer=a(n,p)),0===r?c?(l=s.get,h=s.set):(l=function(){return this[t]},h=function(e){this[t]=e}):2===r?l=function(){return s.value}:(1!==r&&3!==r||(l=function(){return s.get.call(this)}),1!==r&&4!==r||(h=function(e){s.set.call(this,e)})),f.access=l&&h?{get:l,set:h}:l?{get:l}:{set:h};try{return e(o,f)}finally{p.v=!0}}function o(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function u(e,t){var s=typeof t;if(1===e){if("object"!==s||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&o(t.get,"accessor.get"),void 0!==t.set&&o(t.set,"accessor.set"),void 0!==t.init&&o(t.init,"accessor.init")}else if("function"!==s)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function l(e,t,s,n,r,i,a,o){var l,h,f,p,g,v,m=s[0];if(a?l=0===r||1===r?{get:s[3],set:s[4]}:3===r?{get:s[3]}:4===r?{set:s[3]}:{value:s[3]}:0!==r&&(l=Object.getOwnPropertyDescriptor(t,n)),1===r?f={get:l.get,set:l.set}:2===r?f=l.value:3===r?f=l.get:4===r&&(f=l.set),"function"==typeof m)void 0!==(p=c(m,n,l,o,r,i,a,f))&&(u(r,p),0===r?h=p:1===r?(h=p.init,g=p.get||f.get,v=p.set||f.set,f={get:g,set:v}):f=p);else for(var d=m.length-1;d>=0;d--){var b;void 0!==(p=c(m[d],n,l,o,r,i,a,f))&&(u(r,p),0===r?b=p:1===r?(b=p.init,g=p.get||f.get,v=p.set||f.set,f={get:g,set:v}):f=p,void 0!==b&&(void 0===h?h=b:"function"==typeof h?h=[h,b]:h.push(b)))}if(0===r||1===r){if(void 0===h)h=function(e,t){return t};else if("function"!=typeof h){var y=h;h=function(e,t){for(var s=t,n=0;n<y.length;n++)s=y[n].call(e,s);return s}}else{var w=h;h=function(e,t){return w.call(e,t)}}e.push(h)}0!==r&&(1===r?(l.get=f.get,l.set=f.set):2===r?l.value=f:3===r?l.get=f:4===r&&(l.set=f),a?1===r?(e.push((function(e,t){return f.get.call(e,t)})),e.push((function(e,t){return f.set.call(e,t)}))):2===r?e.push(f):e.push((function(e,t){return f.call(e,t)})):Object.defineProperty(t,n,l))}function h(e,t){t&&e.push((function(e){for(var s=0;s<t.length;s++)t[s].call(e);return e}))}let f;var p,g,v;r=(0,i.wA)({selector:"app-calculator",styles:s.e(702).then(s.bind(s,9702))}),[f,n]=(p=class{constructor(){this.btnValues=[["C","+-","%","/"],[7,8,9,"X"],[4,5,6,"-"],[1,2,3,"+"],[0,".","="]],this.calc=(0,i.td)({sign:"",num:0,res:0}),this.toLocaleString=function(e){return String(e).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,"$1 ")},this.removeSpaces=function(e){return e.toString().replace(/\s/g,"")}}handleKeyPress(e){const t=this.calc();switch(e){case"C":this.calc.set({...t,sign:"",num:0,res:0});break;case"+-":this.calc.set({...t,res:t.res?this.toLocaleString(-1*this.removeSpaces(t.res)):0,num:t.num?this.toLocaleString(-1*this.removeSpaces(t.num)):0,sign:""});break;case"%":{let e=t.num?parseFloat(this.removeSpaces(t.num)):0,s=t.res?parseFloat(this.removeSpaces(t.res)):0;this.calc.set({...t,num:e/=Math.pow(100,1),res:s/=Math.pow(100,1),sign:""});break}case"=":if(t.sign&&t.num){const e=function(e,t,s){return"+"===s?e+t:"-"===s?e-t:"X"===s?e*t:e/t};this.calc.set({...t,res:"0"===t.num&&"/"===t.sign?"Cannot divide with 0":this.toLocaleString(e(Number(this.removeSpaces(t.res)),Number(this.removeSpaces(t.num)),t.sign)),sign:"",num:0})}break;case"/":case"X":case"-":case"+":this.calc.set({...t,sign:e,res:!t.res&&t.num?t.num:t.res,num:0});break;case".":this.calc.set({...t,num:t.num.toString().includes(".")?t.num:t.num+e});break;default:this.removeSpaces(t.num.length<16)&&this.calc.set({...t,num:0===t.num&&"0"===e?"0":this.removeSpaces(t.num)%1==0?this.toLocaleString(Number(this.removeSpaces(t.num+e))):this.toLocaleString(t.num+e),res:t.sign?t.res:0})}}render(){var e=this;return i.dy`
      <div class="wrapper">
        <div class="screen">${this.calc().num?this.calc().num:this.calc().res}</div>
        <div class="button-box">
          ${this.btnValues.flat().map((function(t,s){return i.dy`
              <button
                class="button is-light ${"="===t?"equals":""}"
                onclick=${function(){e.handleKeyPress(t)}}
              >
                ${t.toString()}
              </button>
            `}))}
        </div>
      </div>
    `}},g=[],v=[r],{e:function(e,t){for(var s,n,r=[],i=new Map,a=new Map,c=0;c<t.length;c++){var o=t[c];if(Array.isArray(o)){var u,f,p=o[1],g=o[2],v=o.length>3,m=p>=5;if(m?(u=e,0!=(p-=5)&&(f=n=n||[])):(u=e.prototype,0!==p&&(f=s=s||[])),0!==p&&!v){var d=m?a:i,b=d.get(g)||0;if(!0===b||3===b&&4!==p||4===b&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+g);!b&&p>2?d.set(g,p):d.set(g,!0)}l(r,u,o,g,p,m,v,f)}}return h(r,s),h(r,n),r}(p,g),get c(){return function(e,t){if(t.length>0){for(var s=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var c={v:!1};try{var o=t[i](n,{kind:"class",name:r,addInitializer:a(s,c)})}finally{c.v=!0}void 0!==o&&(u(10,o),n=o)}return[n,function(){for(var e=0;e<s.length;e++)s[e].call(n)}]}}(p,v)}}).c,n()}}]);