var Ve=Object.defineProperty;var We=(a,p,v)=>p in a?Ve(a,p,{enumerable:!0,configurable:!0,writable:!0,value:v}):a[p]=v;var N=(a,p,v)=>(We(a,typeof p!="symbol"?p+"":p,v),v),ie=(a,p,v)=>{if(!p.has(a))throw TypeError("Cannot "+v)};var n=(a,p,v)=>(ie(a,p,"read from private field"),v?v.call(a):p.get(a)),w=(a,p,v)=>{if(p.has(a))throw TypeError("Cannot add the same private member more than once");p instanceof WeakSet?p.add(a):p.set(a,v)},_=(a,p,v,D)=>(ie(a,p,"write to private field"),D?D.call(a,v):p.set(a,v),v);var L=(a,p,v)=>(ie(a,p,"access private method"),v);(function(a,p){typeof exports=="object"&&typeof module<"u"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(a=typeof globalThis<"u"?globalThis:a||self,p(a.PlumeJS={}))})(this,function(a){var H,pe,z,U,J,T,P,G,Se,O,W,B,$,K,we,Q,ve,q,Z;"use strict";const p=new(pe=class{constructor(){w(this,H,void 0);_(this,H,new WeakMap)}register(s,e){if(!n(this,H).get(s))n(this,H).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=n(this,H).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){_(this,H,new WeakMap)}},H=new WeakMap,pe),v=s=>typeof s=="function",D=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},ee=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),ae=(s,e,t,r=!1)=>(s.addEventListener(e,t,r),()=>{s.removeEventListener(e,t,r)}),Ce=s=>{const e=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),t=f=>{const C=f.querySelectorAll("script");for(const A of C)A.remove()},r=(f,C)=>{if(C=C.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(f)&&(C.includes("javascript:")||C.includes("data:"))||f.startsWith("on"))return!0},l=f=>{const C=f.attributes;for(const{name:A,value:ne}of C)r(A,ne)&&f.removeAttribute(A)},i=f=>{const C=f.children;for(const A of C)l(A),i(A)},d=e();return t(d),i(d),d.innerHTML},Re=function(s){s.renderCount===1&&queueMicrotask(()=>{s.update(),s.renderCount=0})},Te=(s,e)=>{const t=D(e);return class extends e{constructor(...r){return super(...r),r.forEach((l,i)=>{this[t[i]]=l}),new Proxy(this,{get(l,i,d){return Reflect.get(l,i,d)},set(l,i,d,f){return Reflect.set(l,i,d,f),++s.renderCount,Re(s),!0}})}}},ce=(s,e,t)=>{if(e.length>0){const r=[];for(const d of e)d.__metadata__?r.push(t):r.push(p.getService(d));const l=D(s),i=new s(...r);return e.forEach((d,f)=>{i[l[f]]=r[f]}),i}else return new s},M=new class{constructor(){N(this,"globalStyles");N(this,"globalStyleTag");N(this,"style_registry");N(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const r=new CSSStyleSheet;r.replace(s),e.push(r)}return e}},{html:te,render:le}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",r=/^attr([^ ]+)/,l="insertNode",i=/^insertNode([^ ]+)/;let d=[];const f=c=>{const o={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let m=JSON.stringify(c);const u=h=>o[h]||h;return m=(h=>h.replace(/[&<>\(\)]/g,u))(m),JSON.parse(m)},C=(c,o)=>{const m=c.options,u=Array.isArray(o)?o:[o];let b,h,y=m.length;for(;y--;){h=m[y];const g=h.getAttribute("value")??(h.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(h.selected=u.indexOf(g)>-1)&&(b=!0)}b||(c.selectedIndex=-1)},A=c=>{const o=document.createElement("template");return o.innerHTML=c,o.content},ne=(c,o)=>{const m=document.createTreeWalker(c,NodeFilter.SHOW_ELEMENT,null);let u=m.nextNode();for(;u;){if(u.hasAttributes()){const b=Array.from(u.attributes).filter(h=>r.test(h.nodeName));for(const{nodeName:h,nodeValue:y}of b){const g=r.exec(h)[1];switch(!0){case/^on+/.test(y):{const x=y.slice(2).toLowerCase();u.removeEventListener(x,o[g]),x!=="bindprops"?u.addEventListener(x,o[g]):u.addEventListener(x,j=>{j.detail.setProps(o[g]())});break}case/ref/.test(y):{const x=(j=>{const Y=j;return()=>{Y.isConnected&&o[g](Y)}})(u);d.push(x);break}case/^data-+/.test(y):case/^aria-+/.test(y):{u.setAttribute(y,f(o[g]));break}case/class/.test(y):{o[g]?u.classList.add(...o[g].split(" ")):u.setAttribute("class","");break}case/value/.test(y):{u.nodeName.toLowerCase()==="select"?C(u,o[g]):u.value=f(o[g]);break}case/disabled/.test(y):case/checked/.test(y):{o[g]?u.setAttribute(y,o[g]):u.removeAttribute(y);break}default:u.setAttribute(y,f(o[g]))}u.removeAttribute(h)}}u=m.nextNode()}},X=(c,o)=>{const m=document.createTreeWalker(c,NodeFilter.SHOW_COMMENT,null);let u=m.nextNode(),b;for(;u;){if(b=i.exec(u.data)){const h=Array.isArray(o[b[1]])?o[b[1]]:[o[b[1]]];u.replaceWith(...h),m.currentNode=c}u=m.nextNode()}},ge=(c,o)=>{if(!c||!o||c.nodeType!==1||o.nodeType!==1)return;const m=c.attributes,u=o.attributes;for(const{name:b,value:h}of m)(!u[b]||u[b]!==h)&&o.setAttribute(b,h);for(const{name:b}of u)m[b]||o.removeAttribute(b)},S=c=>c.nodeType===3?"text":c.nodeType===8?"comment":c.tagName.toLowerCase(),R=c=>c.childNodes&&c.childNodes.length>0?null:c.textContent,E=(c,o)=>{const m=o?Array.from(o.childNodes):[],u=c?Array.from(c.childNodes):[];let b=m.length-u.length;if(b>0)for(;b>0;b--)m[m.length-b].parentNode.removeChild(m[m.length-b]);u.forEach(function(h,y){const g=m[y];if(ge(h,g),!g){o&&o.appendChild(h);return}if(S(h)!==S(g)){g.replaceWith(h);return}const x=R(h);if(x&&x!==R(g)){g.textContent=x;return}if(g.childNodes.length>0&&h.childNodes.length<1){g.innerHTML="";return}if(g.childNodes.length<1&&h.childNodes.length>0){const j=document.createDocumentFragment();E(h,j),g.appendChild(j);return}if(h.childNodes.length>0){E(h,g);return}})};return{html:(c,...o)=>{let m="";const{length:u}=c;for(let h=1;h<u;h++){const y=o[h-1];let g=!1;if(m+=c[h-1],s.test(m)&&e.test(m)&&(m=m.replace(s,(x,j,Y)=>`${t}${h-1}=${Y||'"'}${j}${Y?"":'"'}`),g=!0),!g)switch(!0){case Array.isArray(y):case y instanceof DocumentFragment:{m+=`<!--${l}${h-1}-->`;break}case(typeof y=="object"&&y!==null):{"html"in y&&(m+=y.html);break}default:m+=y}}m+=c[u-1];const b=A(m.trim());return ne(b,o),X(b,o),b},render:(c,o)=>{c&&!c.children.length?(c.innerHTML="",c.appendChild(o)):E(o,c),d.forEach(m=>{m()}),d=[]}}})();class ue{constructor(e,t){w(this,z,void 0);w(this,U,void 0);N(this,"update");N(this,"emitEvent");_(this,U,e),_(this,z,t)}static get __metadata__(){return{name:"Renderer"}}get shadowRoot(){return n(this,z)}get hostElement(){return n(this,U)}}z=new WeakMap,U=new WeakMap;const Ae={selector:"",root:!1,styles:"",deps:[],standalone:!1},he=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},Ee=(s,e)=>{var t,r,l,i,be,f,ye,A,oe,X;if(s={...Ae,...s},s.styles=s.styles.toString(),s.root&&!M.isRootNodeSet)M.isRootNodeSet=!0,s.styles&&(M.globalStyles.replace(s.styles),M.globalStyleTag=he(s.styles,document.head));else if(s.root&&M.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(X=class extends HTMLElement{constructor(){super();w(this,i);w(this,f);w(this,A);w(this,t,void 0);w(this,r,void 0);w(this,l,void 0);N(this,"renderCount",0);_(this,r,this.attachShadow({mode:"open"})),ee||(n(this,r).adoptedStyleSheets=M.getComputedCss(s.styles,s.standalone)),L(this,i,be).call(this),this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const S=n(this,t).render();typeof S=="string"?n(this,r).innerHTML=Ce(S):le(n(this,r),S),ee&&(s.styles&&n(this,r).insertBefore(n(this,l),n(this,r).childNodes[0]),M.globalStyleTag&&!s.standalone&&n(this,r).insertBefore(document.importNode(M.globalStyleTag,!0),n(this,r).childNodes[0]))}setProps(S){var R,E;for(const[k,I]of Object.entries(S))e.observedProperties.find(c=>c===k)&&(n(this,t)[k]=I);(E=(R=n(this,t)).onPropertiesChanged)==null||E.call(R)}getInstance(){return n(this,t)}connectedCallback(){var S,R,E,k;L(this,f,ye).call(this),(R=(S=n(this,t)).beforeMount)==null||R.call(S),this.update(),(k=(E=n(this,t)).mount)==null||k.call(E),L(this,A,oe).call(this,"bindprops",{setProps:I=>{this.setProps(I)}},!1)}attributeChangedCallback(S,R,E){var k,I;(I=(k=n(this,t)).onAttributesChanged)==null||I.call(k,S,R,E)}disconnectedCallback(){var S,R;this.renderCount=1,(R=(S=n(this,t)).unmount)==null||R.call(S)}},t=new WeakMap,r=new WeakMap,l=new WeakMap,i=new WeakSet,be=function(){const S=new ue(this,n(this,r));S.update=()=>{this.update()},S.emitEvent=(R,E)=>{L(this,A,oe).call(this,R,E)},_(this,t,ce(Te(this,e),s.deps,S))},f=new WeakSet,ye=function(){ee&&s.styles&&_(this,l,he(s.styles))},A=new WeakSet,oe=function(S,R){const E=new CustomEvent(S,{detail:R});this.dispatchEvent(E)},X))},Ne={deps:[]},de=s=>e=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||Ee(s,e)},se=(s={})=>e=>{if(s={...Ne,...s},s.deps.some(r=>{var l;return((l=r.__metadata__)==null?void 0:l.name)==="Renderer"}))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=ce(e,s.deps);p.register(e,t)},Pe=s=>{let e;switch(s.nodeName&&s.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(s.type)?e=s.checked?s.value!==null&&s.value!=="on"?s.value:!0:!1:e=s.value;break}case"select":{const t=s.type==="select-one",l=[...Array.from(s.options)].filter(i=>i.selected).map(i=>i.value??(i.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?l[0]:l;break}default:{e=s.value;break}}return e};class xe{constructor(e,t){w(this,G);w(this,J,void 0);w(this,T,void 0);w(this,P,new Map);_(this,J,e),_(this,T,t)}get errors(){return n(this,P)}get valid(){return L(this,G,Se).call(this),!n(this,P).size}get value(){const e={};for(const[t,r]of Object.entries(n(this,T)))e[t]=r.value;return e}get(e){return n(this,T)[e]}reset(e={}){for(const t in n(this,T))n(this,T)[t].value=e[t]||n(this,J)[t];n(this,P).clear()}}J=new WeakMap,T=new WeakMap,P=new WeakMap,G=new WeakSet,Se=function(){n(this,P).clear();for(const e in n(this,T)){const t=n(this,T)[e].value,r=n(this,T)[e].validators;n(this,T)[e].errors=null;for(const l of r){const i=l(t);i!==null&&(n(this,P).has(e)?(n(this,P).set(e,{...n(this,P).get(e),...i}),n(this,T)[e].errors={...n(this,T)[e].errors,...i}):(n(this,P).set(e,i),n(this,T)[e].errors=i))}}};const _e=s=>{const e={},t={};for(const[d,f]of Object.entries(s)){const C=Array.isArray(f)?f:[f];e[d]={value:C.shift(),validators:C},t[d]=e[d].value}const r=new xe(t,e);return[r,d=>f=>{const C=Pe(f.target);r.get(d).value=C},()=>{r.reset()}]},Le=s=>{let e=s;return[e,r=>{let l;v(r)?l=r(e):l=r,Object.assign(e,l)}]};class ke{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const Me=s=>!!s&&typeof s.subscribe=="function",Fe=s=>!!s&&typeof s.then=="function",He=s=>({subscribe:e=>{e(s)}}),Oe=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}});class je{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const fe=s=>Me(s)?s:Fe(s)?Oe(Promise.resolve(s)):He(s),V=class{static checkParams(e,t){let r=0;const l={},i=t.paramCount;for(let d=0;d<e.length;d++){const f=t.params[d];f.indexOf(":")>=0&&(l[f.split(":")[1]]=e[d].split("?")[0],r+=1)}return r===i?l:{}}static getParamCount(e){let t=0;return e.forEach(r=>{r.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(r=>r.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=V.getParamCount(t.params),V.routeList.push(t)}static preloadRoutes(){for(const e of V.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=V.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let F=V;N(F,"routeList",[]);class re{constructor(){w(this,K);w(this,Q);w(this,q);w(this,O,{path:"",routeParams:new Map,queryParams:new Map,state:{}});w(this,W,new je);w(this,B,void 0);w(this,$,new Map)}startHashChange(){_(this,B,ae(window,"hashchange",()=>{L(this,K,we).call(this)}))}stopHashChange(){n(this,B).call(this)}getTemplate(){return n(this,W).asObservable()}getCurrentRoute(){return n(this,O)}navigateTo(e="",t){n(this,$).clear(),e?(window.location.hash.replace(/^#/,"")===e&&L(this,q,Z).call(this,e,t),n(this,$).set(e,t),window.location.hash="#"+e):L(this,q,Z).call(this,e,t)}}O=new WeakMap,W=new WeakMap,B=new WeakMap,$=new WeakMap,K=new WeakSet,we=function(){const e=window.location.hash.replace(/^#/,""),t=n(this,$).get(e);L(this,q,Z).call(this,e,t)},Q=new WeakSet,ve=function(e,t){if(e){const r=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return t.match(r)}else return e===t},q=new WeakSet,Z=function(e,t){const r=e.split("/").filter(d=>d.length>0),l=F.routeList.filter(d=>{if(d.params.length===r.length&&L(this,Q,ve).call(this,d.url,e))return d;if(d.url===e)return d}),i=l.length>0?l[0]:null;i&&(n(this,O).path=e,n(this,O).state={...t||{}},fe(i.canActivate()).subscribe(d=>{if(!d)return;const f=F.checkParams(r,i);if(Object.keys(f).length>0||e){n(this,O).routeParams=new Map(Object.entries(f));const C=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];n(this,O).queryParams=new Map(C),i.isRegistered?n(this,W).next(i.template):i.templatePath&&fe(i.templatePath()).subscribe(()=>{i.isRegistered=!0,n(this,W).next(i.template)})}else this.navigateTo(i.redirectTo,t)}))},se()(re);const Ie=()=>{class s{constructor(t){N(this,"template","");N(this,"subscriptions");N(this,"update")}beforeMount(){this.subscriptions=this.internalRouterSrvc.getTemplate().subscribe(t=>{this.template=t}),this.internalRouterSrvc.startHashChange()}mount(){let t=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t)}unmount(){this.subscriptions(),this.internalRouterSrvc.stopHashChange()}render(){if(this.template){const t=[`${this.template}`];return t.raw=[`${this.template}`],te(t)}else return te``}}de({selector:"router-outlet",deps:[re]})(s)};class me{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}registerRoutes(e,t=!1){if(Array.isArray(e)){for(const r of e)F.formatRoute(r);t?F.preloadRoutes():F.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}se({deps:[re]})(me),a.Component=de,a.Injectable=se,a.Renderer=ue,a.Router=me,a.Validators=ke,a.fromEvent=ae,a.html=te,a.registerRouterComponent=Ie,a.render=le,a.useFormFields=_e,a.useState=Le,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
