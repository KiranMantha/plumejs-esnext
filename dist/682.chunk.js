"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[682],{682:(e,t,r)=>{r.r(t);var n,i,o,s,a=r(56);function c(e,t){return function(r){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),l(r,"An initializer"),e.push(r)}}function u(e,t,r,n,i,o,s,a){var u;switch(i){case 1:u="accessor";break;case 2:u="method";break;case 3:u="getter";break;case 4:u="setter";break;default:u="field"}var l,f,p={kind:u,name:s?"#"+t:t,static:o,private:s},h={v:!1};0!==i&&(p.addInitializer=c(n,h)),0===i?s?(l=r.get,f=r.set):(l=function(){return this[t]},f=function(e){this[t]=e}):2===i?l=function(){return r.value}:(1!==i&&3!==i||(l=function(){return r.get.call(this)}),1!==i&&4!==i||(f=function(e){r.set.call(this,e)})),p.access=l&&f?{get:l,set:f}:l?{get:l}:{set:f};try{return e(a,p)}finally{h.v=!0}}function l(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function f(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&l(t.get,"accessor.get"),void 0!==t.set&&l(t.set,"accessor.set"),void 0!==t.init&&l(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function p(e,t,r,n,i,o,s,a){var c,l,p,h,v,d,g=r[0];if(s?c=0===i||1===i?{get:r[3],set:r[4]}:3===i?{get:r[3]}:4===i?{set:r[3]}:{value:r[3]}:0!==i&&(c=Object.getOwnPropertyDescriptor(t,n)),1===i?p={get:c.get,set:c.set}:2===i?p=c.value:3===i?p=c.get:4===i&&(p=c.set),"function"==typeof g)void 0!==(h=u(g,n,c,a,i,o,s,p))&&(f(i,h),0===i?l=h:1===i?(l=h.init,v=h.get||p.get,d=h.set||p.set,p={get:v,set:d}):p=h);else for(var y=g.length-1;y>=0;y--){var w;void 0!==(h=u(g[y],n,c,a,i,o,s,p))&&(f(i,h),0===i?w=h:1===i?(w=h.init,v=h.get||p.get,d=h.set||p.set,p={get:v,set:d}):p=h,void 0!==w&&(void 0===l?l=w:"function"==typeof l?l=[l,w]:l.push(w)))}if(0===i||1===i){if(void 0===l)l=function(e,t){return t};else if("function"!=typeof l){var m=l;l=function(e,t){for(var r=t,n=0;n<m.length;n++)r=m[n].call(e,r);return r}}else{var b=l;l=function(e,t){return b.call(e,t)}}e.push(l)}0!==i&&(1===i?(c.get=p.get,c.set=p.set):2===i?c.value=p:3===i?c.get=p:4===i&&(c.set=p),s?1===i?(e.push((function(e,t){return p.get.call(e,t)})),e.push((function(e,t){return p.set.call(e,t)}))):2===i?e.push(p):e.push((function(e,t){return p.call(e,t)})):Object.defineProperty(t,n,c))}function h(e,t){for(var r,n,i=[],o=new Map,s=new Map,a=0;a<t.length;a++){var c=t[a];if(Array.isArray(c)){var u,l,f=c[1],h=c[2],d=c.length>3,g=f>=5;if(g?(u=e,0!=(f-=5)&&(l=n=n||[])):(u=e.prototype,0!==f&&(l=r=r||[])),0!==f&&!d){var y=g?s:o,w=y.get(h)||0;if(!0===w||3===w&&4!==f||4===w&&3!==f)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+h);!w&&f>2?y.set(h,f):y.set(h,!0)}p(i,u,c,h,f,g,d,l)}}return v(i,r),v(i,n),i}function v(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}function d(e,t,r){return{e:h(e,t),get c(){return function(e,t){if(t.length>0){for(var r=[],n=e,i=e.name,o=t.length-1;o>=0;o--){var s={v:!1};try{var a=t[o](n,{kind:"class",name:i,addInitializer:c(r,s)})}finally{s.v=!0}void 0!==a&&(f(10,a),n=a)}return[n,function(){for(var e=0;e<r.length;e++)r[e].call(n)}]}}(e,r)}}}let g,y;i=(0,a.GS)(),[g,n]=d(class{getText(){return"hello all"}},[],[i]).c,n(),s=(0,a.wA)({selector:"app-experiments",deps:[g]}),[y,o]=d(class{constructor(e){}render(){return a.dy`${this.expService.getText()}`}},[],[s]).c,o()}}]);