var je=Object.defineProperty;var Ie=(c,g,v)=>g in c?je(c,g,{enumerable:!0,configurable:!0,writable:!0,value:v}):c[g]=v;var P=(c,g,v)=>(Ie(c,typeof g!="symbol"?g+"":g,v),v),ne=(c,g,v)=>{if(!g.has(c))throw TypeError("Cannot "+v)};var n=(c,g,v)=>(ne(c,g,"read from private field"),v?v.call(c):g.get(c)),w=(c,g,v)=>{if(g.has(c))throw TypeError("Cannot add the same private member more than once");g instanceof WeakSet?g.add(c):g.set(c,v)},k=(c,g,v,D)=>(ne(c,g,"write to private field"),D?D.call(c,v):g.set(c,v),v);var M=(c,g,v)=>(ne(c,g,"access private method"),v);(function(c,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(c=typeof globalThis<"u"?globalThis:c||self,g(c.PlumeJS={}))})(this,function(c){var O,me,z,U,J,R,L,G,be,j,W,B,K,ye,Q,ve,$,Z;"use strict";const g=new(me=class{constructor(){w(this,O,void 0);k(this,O,new WeakMap)}register(t,e){if(!n(this,O).get(t))n(this,O).set(t,e);else throw console.error(t),"service already exists"}getService(t){const e=n(this,O).get(t);if(e)return e;throw console.error(t),"service is not a registered service."}clear(){k(this,O,new WeakMap)}},O=new WeakMap,me),v=t=>typeof t=="function",D=t=>{const e=t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(s=>s.trim()):[]},ee=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),oe=(t,e,s,r=!1)=>(t.addEventListener(e,s,r),()=>{t.removeEventListener(e,s,r)}),Se=t=>{const e=()=>new DOMParser().parseFromString(t,"text/html").body||document.createElement("body"),s=h=>{const S=h.querySelectorAll("script");for(const A of S)A.remove()},r=(h,S)=>{if(S=S.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(h)&&(S.includes("javascript:")||S.includes("data:"))||h.startsWith("on"))return!0},u=h=>{const S=h.attributes;for(const{name:A,value:X}of S)r(A,X)&&h.removeAttribute(A)},o=h=>{const S=h.children;for(const A of S)u(A),o(A)},f=e();return s(f),o(f),f.innerHTML},we=function(t){t.renderCount===1&&queueMicrotask(()=>{t.update(),t.renderCount=0})},Ce=(t,e)=>{const s=D(e);return class extends e{constructor(...r){return super(...r),r.forEach((u,o)=>{this[s[o]]=u}),new Proxy(this,{get(u,o,f){return Reflect.get(u,o,f)},set(u,o,f,h){return Reflect.set(u,o,f,h),++t.renderCount,we(t),!0}})}}},ae=(t,e,s)=>{if(e.length>0){const r=[];for(const f of e)f.__metadata__?r.push(s):r.push(g.getService(f));const u=D(t),o=new t(...r);return e.forEach((f,h)=>{o[u[h]]=r[h]}),o}else return new t},F=new class{constructor(){P(this,"globalStyles");P(this,"globalStyleTag");P(this,"style_registry");P(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(t=""){let e=[];const s=new CSSStyleSheet;if(s.insertRule(":host { display: block; }"),e=[this.globalStyles,s],t){const r=new CSSStyleSheet;r.replace(t),e.push(r)}return e}},{html:te,render:ce}=(()=>{const t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,s="attr",r=/^attr([^ ]+)/,u="insertNode",o=/^insertNode([^ ]+)/;let f=[];const h=l=>{const i={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let m=JSON.stringify(l);const d=a=>i[a]||a;return m=(a=>a.replace(/[&<>\(\)]/g,d))(m),JSON.parse(m)},S=(l,i)=>{const m=l.options,d=Array.isArray(i)?i:[i];let p,a,b=m.length;for(;b--;){a=m[b];const y=a.getAttribute("value")??(a.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(a.selected=d.indexOf(y)>-1)&&(p=!0)}p||(l.selectedIndex=-1)},A=l=>{const i=document.createElement("template");return i.innerHTML=l,i.content},X=(l,i)=>{const m=document.createTreeWalker(l,NodeFilter.SHOW_ELEMENT,null);let d=m.nextNode();for(;d;){if(d.hasAttributes()){const p=Array.from(d.attributes).filter(a=>r.test(a.nodeName));for(const{nodeName:a,nodeValue:b}of p){const y=r.exec(a)[1];switch(!0){case/^on+/.test(b):{const x=b.slice(2).toLowerCase();d.removeEventListener(x,i[y]),x!=="bindprops"?d.addEventListener(x,i[y]):d.addEventListener(x,I=>{I.detail.setProps(i[y]())});break}case/ref/.test(b):{const x=(I=>{const Y=I;return()=>{Y.isConnected&&i[y](Y)}})(d);f.push(x);break}case/^data-+/.test(b):case/^aria-+/.test(b):{d.setAttribute(b,h(i[y]));break}case/class/.test(b):{i[y]?d.classList.add(...i[y].split(" ")):d.setAttribute("class","");break}case/value/.test(b):{d.nodeName.toLowerCase()==="select"?S(d,i[y]):d.value=h(i[y]);break}case/disabled/.test(b):case/checked/.test(b):{i[y]?d.setAttribute(b,i[y]):d.removeAttribute(b);break}default:d.setAttribute(b,h(i[y]))}d.removeAttribute(a)}}d=m.nextNode()}},C=(l,i)=>{const m=document.createTreeWalker(l,NodeFilter.SHOW_COMMENT,null);let d=m.nextNode(),p;for(;d;){if(p=o.exec(d.data)){const a=Array.isArray(i[p[1]])?i[p[1]]:[i[p[1]]];d.replaceWith(...a),m.currentNode=l}d=m.nextNode()}},T=(l,i)=>{if(!l||!i||l.nodeType!==1||i.nodeType!==1)return;const m=l.attributes,d=i.attributes;for(const{name:p,value:a}of m)/class/.test(p)?Array.from(l.classList).every(b=>{i.classList.contains(b)||i.classList.add(b)}):(!d[p]||d[p]!==a)&&i.setAttribute(p,a);for(const{name:p}of d)/class/.test(p)?Array.from(i.classList).every(a=>{l.classList.contains(a)||i.classList.remove(a)}):m[p]||i.removeAttribute(p)},E=l=>l.nodeType===3?"text":l.nodeType===8?"comment":l.tagName.toLowerCase(),N=l=>l.childNodes&&l.childNodes.length>0?null:l.textContent,_=(l,i)=>{const m=i?Array.from(i.childNodes):[],d=l?Array.from(l.childNodes):[];let p=m.length-d.length;if(p>0)for(;p>0;p--)m[m.length-p].parentNode.removeChild(m[m.length-p]);d.forEach(function(a,b){const y=m[b];if(T(a,y),!y){i&&i.appendChild(a);return}if(E(a)!==E(y)){y.replaceWith(a);return}const x=N(a);if(x&&x!==N(y)){y.textContent=x;return}if(y.childNodes.length>0&&a.childNodes.length<1){y.innerHTML="";return}if(y.childNodes.length<1&&a.childNodes.length>0){const I=document.createDocumentFragment();_(a,I),y.appendChild(I);return}if(a.childNodes.length>0){_(a,y);return}})};return{html:(l,...i)=>{let m="";const{length:d}=l;for(let a=1;a<d;a++){const b=i[a-1];let y=!1;if(m+=l[a-1],t.test(m)&&e.test(m)&&(m=m.replace(t,(x,I,Y)=>`${s}${a-1}=${Y||'"'}${I}${Y?"":'"'}`),y=!0),!y)switch(!0){case Array.isArray(b):case b instanceof DocumentFragment:{m+=`<!--${u}${a-1}-->`;break}case(typeof b=="object"&&b!==null):{"html"in b&&(m+=b.html);break}default:m+=b}}m+=l[d-1];const p=A(m.trim());return X(p,i),C(p,i),p},render:(l,i)=>{l&&!l.children.length?(l.innerHTML="",l.appendChild(i)):_(i,l),f.forEach(m=>{m()}),f=[]}}})();class le{constructor(e,s){w(this,z,void 0);w(this,U,void 0);P(this,"update");P(this,"emitEvent");k(this,U,e),k(this,z,s)}static get __metadata__(){return{name:"Renderer"}}get shadowRoot(){return n(this,z)}get hostElement(){return n(this,U)}}z=new WeakMap,U=new WeakMap;const Re={selector:"",root:!1,styles:"",deps:[],standalone:!1},ue=(t,e)=>{const s=document.createElement("style");return s.innerHTML=t,e&&e.appendChild(s),s},Te=(t,e)=>{var s,r,u,o,pe,h,ie,A;if(t={...Re,...t},t.styles=t.styles.toString(),t.root&&!F.isRootNodeSet)F.isRootNodeSet=!0,t.styles&&(F.globalStyles.replace(t.styles),F.globalStyleTag=ue(t.styles,document.head));else if(t.root&&F.isRootNodeSet)throw Error("Cannot register duplicate root component in "+t.selector+" component");window.customElements.define(t.selector,(A=class extends HTMLElement{constructor(){super();w(this,o);w(this,h);w(this,s,void 0);w(this,r,void 0);w(this,u,void 0);P(this,"renderCount",0);k(this,r,this.attachShadow({mode:"open"})),ee||(n(this,r).adoptedStyleSheets=F.getComputedCss(t.styles,t.standalone)),this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const C=n(this,s).render();typeof C=="string"?n(this,r).innerHTML=Se(C):ce(n(this,r),C),ee&&(t.styles&&n(this,r).insertBefore(n(this,u),n(this,r).childNodes[0]),F.globalStyleTag&&!t.standalone&&n(this,r).insertBefore(document.importNode(F.globalStyleTag,!0),n(this,r).childNodes[0]))}setProps(C){var T,E;for(const[N,_]of Object.entries(C))e.observedProperties.find(q=>q===N)&&(n(this,s)[N]=_);(E=(T=n(this,s)).onPropertiesChanged)==null||E.call(T)}getInstance(){return n(this,s)}connectedCallback(){var T,E,N,_;M(this,o,pe).call(this);const C=new le(this,n(this,r));C.update=()=>{this.update()},C.emitEvent=(q,ge)=>{M(this,h,ie).call(this,q,ge)},k(this,s,ae(Ce(this,e),t.deps,C)),(E=(T=n(this,s)).beforeMount)==null||E.call(T),this.update(),(_=(N=n(this,s)).mount)==null||_.call(N),M(this,h,ie).call(this,"bindprops",{setProps:q=>{this.setProps(q)}},!1)}attributeChangedCallback(C,T,E){var N,_;(_=(N=n(this,s)).onAttributesChanged)==null||_.call(N,C,T,E)}disconnectedCallback(){var C,T;this.renderCount=1,(T=(C=n(this,s)).unmount)==null||T.call(C)}},s=new WeakMap,r=new WeakMap,u=new WeakMap,o=new WeakSet,pe=function(){ee&&t.styles&&k(this,u,ue(t.styles))},h=new WeakSet,ie=function(C,T){const E=new CustomEvent(C,{detail:T});this.dispatchEvent(E)},A))},Ae={deps:[]},he=t=>e=>{if(t.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(t.selector)||Te(t,e)},se=(t={})=>e=>{if(t={...Ae,...t},t.deps.some(r=>{var u;return((u=r.__metadata__)==null?void 0:u.name)==="Renderer"}))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const s=ae(e,t.deps);g.register(e,s)},Ee=t=>{let e;switch(t.nodeName&&t.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(t.type)?e=t.checked?t.value!==null&&t.value!=="on"?t.value:!0:!1:e=t.value;break}case"select":{const s=t.type==="select-one",u=[...Array.from(t.options)].filter(o=>o.selected).map(o=>o.value??(o.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=s?u[0]:u;break}default:{e=t.value;break}}return e};class Pe{constructor(e,s){w(this,G);w(this,J,void 0);w(this,R,void 0);w(this,L,new Map);k(this,J,e),k(this,R,s)}get errors(){return n(this,L)}get valid(){return M(this,G,be).call(this),!n(this,L).size}get value(){const e={};for(const[s,r]of Object.entries(n(this,R)))e[s]=r.value;return e}get(e){return n(this,R)[e]}reset(e={}){for(const s in n(this,R))n(this,R)[s].value=e[s]||n(this,J)[s];n(this,L).clear()}}J=new WeakMap,R=new WeakMap,L=new WeakMap,G=new WeakSet,be=function(){n(this,L).clear();for(const e in n(this,R)){const s=n(this,R)[e].value,r=n(this,R)[e].validators;n(this,R)[e].errors=null;for(const u of r){const o=u(s);o!==null&&(n(this,L).has(e)?(n(this,L).set(e,{...n(this,L).get(e),...o}),n(this,R)[e].errors={...n(this,R)[e].errors,...o}):(n(this,L).set(e,o),n(this,R)[e].errors=o))}}};const Le=t=>{const e={},s={};for(const[f,h]of Object.entries(t)){const S=Array.isArray(h)?h:[h];e[f]={value:S.shift(),validators:S},s[f]=e[f].value}const r=new Pe(s,e);return[r,f=>h=>{const S=Ee(h.target);r.get(f).value=S},()=>{r.reset()}]},Ne=t=>{let e=t;return[e,r=>{let u;v(r)?u=r(e):u=r,Object.assign(e,u)}]};class _e{static required(e){return e.length?null:{required:!0}}static min(e){return s=>s.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return s=>s.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return s=>new RegExp(e).test(s)?null:{pattern:!0}}}const xe=t=>!!t&&typeof t.subscribe=="function",ke=t=>!!t&&typeof t.then=="function",Me=t=>({subscribe:e=>{e(t)}}),Fe=t=>({subscribe:e=>{Promise.resolve(t).then(s=>{e(s)})}});class He{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const de=t=>xe(t)?t:ke(t)?Fe(Promise.resolve(t)):Me(t),V=class{static checkParams(e,s){let r=0;const u={},o=s.paramCount;for(let f=0;f<e.length;f++){const h=s.params[f];h.indexOf(":")>=0&&(u[h.split(":")[1]]=e[f].split("?")[0],r+=1)}return r===o?u:{}}static getParamCount(e){let s=0;return e.forEach(r=>{r.indexOf(":")>=0&&(s+=1)}),s}static formatRoute(e){const s={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(s.params=e.path.split("/").filter(r=>r.length>0),s.url=e.path,s.template="",s.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");s.template=e.template,s.templatePath=e.templatePath}e.canActivate&&(s.canActivate=e.canActivate),s.paramCount=V.getParamCount(s.params),V.routeList.push(s)}static preloadRoutes(){for(const e of V.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=V.routeList.filter(s=>s.preload===!0);for(const s of e)s.templatePath&&s.templatePath()}};let H=V;P(H,"routeList",[]);class re{constructor(){w(this,K);w(this,Q);w(this,$);w(this,j,{path:"",routeParams:new Map,queryParams:new Map,state:{}});w(this,W,new He);w(this,B,void 0)}startHashChange(){k(this,B,oe(window,"hashchange",()=>{M(this,K,ye).call(this)}))}stopHashChange(){n(this,B).call(this)}getTemplate(){return n(this,W).asObservable()}getCurrentRoute(){return n(this,j)}navigateTo(e="",s){e?(window.location.hash.replace(/^#/,"")===e&&M(this,$,Z).call(this,e,s),window.location.hash="#"+e):M(this,$,Z).call(this,e,s)}}j=new WeakMap,W=new WeakMap,B=new WeakMap,K=new WeakSet,ye=function(){const e=window.location.hash.replace(/^#/,"");M(this,$,Z).call(this,e,null)},Q=new WeakSet,ve=function(e,s){if(e){const r=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return s.match(r)}else return e===s},$=new WeakSet,Z=function(e,s){const r=e.split("/").filter(f=>f.length>0),u=H.routeList.filter(f=>{if(f.params.length===r.length&&M(this,Q,ve).call(this,f.url,e))return f;if(f.url===e)return f}),o=u.length>0?u[0]:null;o&&(n(this,j).path=e,n(this,j).state={...s||{}},de(o.canActivate()).subscribe(f=>{if(!f)return;const h=H.checkParams(r,o);if(Object.keys(h).length>0||e){n(this,j).routeParams=new Map(Object.entries(h));const S=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];n(this,j).queryParams=new Map(S),o.isRegistered?n(this,W).next(o.template):o.templatePath&&de(o.templatePath()).subscribe(()=>{o.isRegistered=!0,n(this,W).next(o.template)})}else this.navigateTo(o.redirectTo,s)}))},se()(re);const Oe=()=>{class t{constructor(s){P(this,"template","");P(this,"subscriptions");P(this,"update")}beforeMount(){this.subscriptions=this.internalRouterSrvc.getTemplate().subscribe(s=>{this.template=s}),this.internalRouterSrvc.startHashChange()}mount(){let s=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(s)}unmount(){this.subscriptions(),this.internalRouterSrvc.stopHashChange()}render(){if(this.template){const s=[`${this.template}`];return s.raw=[`${this.template}`],te(s)}else return te``}}he({selector:"router-outlet",deps:[re]})(t)};class fe{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,s){this.internalRouter.navigateTo(e,s)}registerRoutes(e,s=!1){if(Array.isArray(e)){for(const r of e)H.formatRoute(r);s?H.preloadRoutes():H.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}se({deps:[re]})(fe),c.Component=he,c.Injectable=se,c.Renderer=le,c.Router=fe,c.Validators=_e,c.fromEvent=oe,c.html=te,c.registerRouterComponent=Oe,c.render=ce,c.useFormFields=Le,c.useState=Ne,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
