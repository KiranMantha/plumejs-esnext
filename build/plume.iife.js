var Ne=Object.defineProperty;var ke=(u,m,S)=>m in u?Ne(u,m,{enumerable:!0,configurable:!0,writable:!0,value:S}):u[m]=S;var g=(u,m,S)=>(ke(u,typeof m!="symbol"?m+"":m,S),S),G=(u,m,S)=>{if(!m.has(u))throw TypeError("Cannot "+S)};var _=(u,m,S)=>(G(u,m,"read from private field"),S?S.call(u):m.get(u)),M=(u,m,S)=>{if(m.has(u))throw TypeError("Cannot add the same private member more than once");m instanceof WeakSet?m.add(u):m.set(u,S)},I=(u,m,S,N)=>(G(u,m,"write to private field"),N?N.call(u,S):m.set(u,S),S);var K=(u,m,S)=>(G(u,m,"access private method"),S);var PlumeJS=function(u){var O,oe;"use strict";const m=r=>typeof r=="function",S=Object.create(null);let N=null;function le(){return Math.random().toString(36).substring(2)}function ue(r,e){const t=N;let s;N=le(),S[N]=r;try{e()}finally{s=N,N=t}return s}function X(r){const e=S[N];let t=r;function s(){return t}return s.set=function(o){m(o)?t=o(t):t=o,e()},s}function he(r,e){const t=ue(r,e);return function(){delete S[t]}}const Z=new(oe=class{constructor(){M(this,O,void 0);I(this,O,new WeakMap)}register(r,e){if(!_(this,O).get(r))_(this,O).set(r,e);else throw console.error(r),"service already exists"}getService(r){const e=_(this,O).get(r);if(e)return e;throw console.error(r),"service is not a registered service."}clear(){I(this,O,new WeakMap)}},O=new WeakMap,oe),de=r=>!!r&&typeof r.subscribe=="function",fe=r=>!!r&&typeof r.then=="function",ee=r=>{const e=r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},pe=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),be=r=>({subscribe:e=>{e(r)}}),ge=r=>({subscribe:e=>{Promise.resolve(r).then(t=>{e(t)})}}),me=()=>Math.random().toString(36).substring(2);class W{constructor(){g(this,"_callbackCollection",{})}unsubscribe(e){delete this._callbackCollection[e]}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){const t=me();return this._callbackCollection[t]=e,()=>this.unsubscribe(t)}next(e){for(const t in this._callbackCollection)this._callbackCollection[t](e)}}class $ extends W{constructor(t){super();g(this,"_initialValue");this._initialValue=t}subscribe(t){const s=super.subscribe(t);return super.next(this._initialValue),s}next(t){this._initialValue=t,super.next(t)}}class q{constructor(){g(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const J=r=>de(r)?r:fe(r)?ge(Promise.resolve(r)):be(r),B=(r,e,t,s=!1)=>(r.addEventListener(e,t,s),()=>{r.removeEventListener(e,t,s)}),ye=r=>{const e=()=>new DOMParser().parseFromString(r,"text/html").body||document.createElement("body"),t=p=>{const w=p.querySelectorAll("script");for(const P of w)P.remove()},s=(p,w)=>{if(w=w.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(p)&&(w.includes("javascript:")||w.includes("data:"))||p.startsWith("on"))return!0},o=p=>{const w=p.attributes;for(const{name:P,value:k}of w)s(P,k)&&p.removeAttribute(P)},h=p=>{const w=p.children;for(const P of w)o(P),h(P)},l=e();return t(l),h(l),l.innerHTML},_e=(r,e)=>{const t=ee(e),s=()=>({get(o,h){const l=Object.prototype.toString.call(o[h]);return["[object Object]","[object Array]"].indexOf(l)>-1&&!("__metadata__"in o[h])?new Proxy(o[h],s()):o[h]},set(o,h,l){return o[h]=l,r(),!0}});return class extends e{constructor(...o){return super(...o),o.forEach((h,l)=>{t[l]&&t[l]!=="undefined"&&(this[t[l]]=h)}),new Proxy(this,s())}}},we=()=>{let r;return[new Promise(t=>{r=t}),r]},te=(r,e,t)=>{if(e.length>0){const s=[];for(const l of e)l.prototype.__metadata__.name!=="RENDERER"?s.push(Z.getService(l)):s.push(t);const o=ee(r),h=new r(...s);return e.forEach((l,p)=>{h[o[p]]=s[p]}),h}else return new r},H=new class{constructor(){g(this,"globalStyles");g(this,"globalStyleTag");g(this,"style_registry");g(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(r=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],r){const s=new CSSStyleSheet;s.replace(r),e.push(s)}return e}},{html:z,render:re}=(()=>{const r=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",s=/^attr([^ ]+)/,o="insertNode",h=/^insertNode([^ ]+)/;let l=[],p=[];const w=a=>{const n={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let d=JSON.stringify(a);const c=f=>n[f]||f;return d=(f=>f.replace(/[&<>\(\)]/g,c))(d),JSON.parse(d)},P=(a,n)=>{const d=a.options,c=Array.isArray(n)?n:[n];let C,f,i=d.length;for(;i--;){f=d[i];const b=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=c.indexOf(b)>-1)&&(C=!0)}C||(a.selectedIndex=-1)},k=a=>{const n=document.createElement("template");return n.innerHTML=a,n.content},V=(a,n,d)=>{const c=()=>{setTimeout(()=>{if(a.isConnected){const C=new CustomEvent("bindprops",{detail:{props:n},bubbles:!1});a.dispatchEvent(C)}})};a[d]=JSON.stringify(n),p.push(c)},v=(a,n)=>{const d=document.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,null);let c=d.nextNode();for(;c;){if(c.hasAttributes()){const C=Array.from(c.attributes).filter(f=>s.test(f.nodeName));for(const{nodeName:f,nodeValue:i}of C){const b=s.exec(f)[1];switch(!0){case/^on+/.test(i):{const y=i.slice(2).toLowerCase();c.removeEventListener(y,n[b]),c.addEventListener(y,n[b]);break}case/ref/.test(i):{const y=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:c,fn:n[b]});l.push(y);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?V(c,n[b],Symbol("input")):c.setAttribute(i,w(n[b]));break}case/class/.test(i):{n[b]?c.classList.add(...n[b].split(" ")):c.setAttribute("class","");break}case/value/.test(i):{c.nodeName.toLowerCase()==="select"?P(c,n[b]):c.value=w(n[b]);break}case/disabled/.test(i):case/checked/.test(i):{n[b]?c.setAttribute(i,n[b]):c.removeAttribute(i);break}default:c.setAttribute(i,w(n[b]))}c.removeAttribute(f)}}c=d.nextNode()}},T=(a,n)=>{const d=document.createTreeWalker(a,NodeFilter.SHOW_COMMENT,null);let c=d.nextNode(),C;for(;c;){if(C=h.exec(c.data)){const f=Array.isArray(n[C[1]])?n[C[1]]:[n[C[1]]];c.replaceWith(...f),d.currentNode=a}c=d.nextNode()}},R=(a,n)=>{if(!a||!n||a.nodeType!==1||n.nodeType!==1)return;const d=a.attributes,c=n.attributes,C=n.getAttribute("data-preserve-attributes"),f=C&&C==="true";for(const{name:i,value:b}of d)(!c[i]||c[i]!==b)&&n.setAttribute(i,b);if(!f)for(const{name:i}of c)d[i]||n.removeAttribute(i);if(n.tagName.toLowerCase()==="input"&&(n.value=a.value),n.tagName.indexOf("-")>-1&&a.tagName.indexOf("-")>-1){const i=Object.getOwnPropertySymbols(a),b=Object.getOwnPropertySymbols(n),y=i.length?a[i[0]]:"",x=b.length?n[b[0]]:"";y&&x&&y!==x&&V(n,JSON.parse(y),b[0])}},A=a=>a.nodeType===3?"text":a.nodeType===8?"comment":a.tagName.toLowerCase(),L=a=>a.childNodes&&a.childNodes.length>0?null:a.textContent,F=(a,n,d)=>{const c=n?Array.from(n.childNodes):[],C=a?Array.from(a.childNodes):[];let f=c.length-C.length;if(f>0)for(;f>0;f--)c[c.length-f].parentNode.removeChild(c[c.length-f]);C.forEach(function(i,b){const y=c[b];if(R(i,y),d&&y&&y.nodeType===1&&y.tagName.indexOf("-")>-1)return;if(!y){n&&n.appendChild(i);return}if(A(i)!==A(y)){y.replaceWith(i);return}const x=L(i);if(x&&x!==L(y)){y.textContent=x;return}if(y.childNodes.length>0&&i.childNodes.length<1){y.innerHTML="";return}if(y.childNodes.length<1&&i.childNodes.length>0){const D=document.createDocumentFragment();F(i,D,!1),y.appendChild(D);return}if(i.childNodes.length>0){F(i,y,!0);return}})};return{html:(a,...n)=>{let d="";const{length:c}=a;for(let f=1;f<c;f++){const i=n[f-1];let b=!1;if(d+=a[f-1],r.test(d)&&e.test(d)&&(d=d.replace(r,(y,x,D)=>`${t}${f-1}=${D||'"'}${x}${D?"":'"'}`),b=!0),!b)switch(!0){case Array.isArray(i):case i instanceof DocumentFragment:{d+=`<!--${o}${f-1}-->`;break}case(typeof i=="object"&&i!==null):{"html"in i&&(d+=i.html);break}default:d+=i||""}}d+=a[c-1];const C=k(d.trim());return v(C,n),T(C,n),C},render:(a,n)=>{a&&!a.children.length?(a.innerHTML="",a.appendChild(n)):F(n,a,!1),l.forEach(d=>{d()}),l=[],p.forEach(d=>{d()}),p=[]}}})();class Q{constructor(e,t){g(this,"_shadowRoot");g(this,"_hostElement");g(this,"update");g(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const ve={selector:"",root:!1,styles:"",deps:[],standalone:!1,encapsulation:"shadowDom"},se=(r,e)=>{const t=document.createElement("style");return t.innerHTML=r,e&&e.appendChild(t),t},Se=(r,e)=>{var t,s,o,h,l,ae,w,ce,k;if(r={...ve,...r},r.styles=r.styles.toString(),r.root&&!H.isRootNodeSet)H.isRootNodeSet=!0,r.styles&&(H.globalStyles.replace(r.styles),H.globalStyleTag=se(r.styles,document.head));else if(r.root&&H.isRootNodeSet)throw Error("Cannot register duplicate root component in "+r.selector+" component");window.customElements.define(r.selector,(k=class extends HTMLElement{constructor(){super();M(this,l);M(this,w);M(this,t,void 0);M(this,s,void 0);M(this,o,void 0);g(this,"renderCount",0);M(this,h,new q);if(pe)I(this,s,this.attachShadow({mode:"open"})),_(this,s).adoptedStyleSheets=H.getComputedCss(r.styles,r.standalone);else{I(this,s,this);const v=r.styles.replaceAll(":host",r.selector);I(this,o,se(v,document.head))}this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),K(this,l,ae).call(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const v=_(this,t).render();typeof v=="string"?_(this,s).innerHTML=ye(v):re(_(this,s),v)}setProps(v){var T,R;for(const[A,L]of Object.entries(v))e.observedProperties.find(F=>F===A)&&(_(this,t)[A]=L);(R=(T=_(this,t)).onPropertiesChanged)==null||R.call(T)}getInstance(){return _(this,t)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var v,T;_(this,h).add(B(this,"bindprops",R=>{const A=R.detail.props;A&&this.setProps(A)})),_(this,h).add(B(this,"refresh_component",()=>{var R,A;(A=(R=_(this,t)).mount)==null||A.call(R)})),_(this,t).beforeMount&&_(this,h).add(he(this.setRenderIntoQueue,_(this,t).beforeMount.bind(_(this,t)))),this.update(),(T=(v=_(this,t)).mount)==null||T.call(v)}attributeChangedCallback(v,T,R){var A,L;(L=(A=_(this,t)).onAttributesChanged)==null||L.call(A,v,T,R)}disconnectedCallback(){var v,T,R;this.renderCount=1,(T=(v=_(this,t)).unmount)==null||T.call(v),(R=_(this,o))==null||R.remove(),_(this,h).unsubscribe()}},t=new WeakMap,s=new WeakMap,o=new WeakMap,h=new WeakMap,l=new WeakSet,ae=function(){const v=new Q(this,_(this,s));v.update=()=>{this.update()},v.emitEvent=(T,R)=>{K(this,w,ce).call(this,T,R)},I(this,t,te(_e(this.setRenderIntoQueue,e),r.deps,v))},w=new WeakSet,ce=function(v,T){const R=new CustomEvent(v,{detail:T});this.dispatchEvent(R)},k))},Ce={deps:[]},ne=r=>e=>{if(r.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(r.selector)||Se(r,e)},U=(r={})=>e=>{if(r={...Ce,...r},e.prototype.__metadata__={name:"SERVICE"},r.deps.some(s=>s.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=te(e,r.deps);Z.register(e,t)},Re=r=>{let e;switch(r.nodeName&&r.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(r.type)?e=r.checked?r.value!==null&&r.value!=="on"?r.value:!0:!1:e=r.value;break}case"select":{const t=r.type==="select-one",o=[...Array.from(r.options)].filter(h=>h.selected).map(h=>h.value??(h.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?o[0]:o;break}default:{e=r.value;break}}return e};class Ee{constructor(e){g(this,"_initialValues");g(this,"_controls",new Map);g(this,"_errors",new Map);g(this,"_errorCount");this._errorCount=X(0),this._initialValues=e;for(const[t,s]of Object.entries(e)){const o=[...Array.isArray(s)?s:[s]];this._controls.set(t,{value:o[0],validators:o.length>1?o[1]:[]})}}get hasErrors(){return!!this._errorCount()}get errors(){return this._checkValidity(),this._errors}get valid(){return this._checkValidity(),!this._errors.size}get value(){const e={};for(const[t,s]of this._controls)e[t]=s.value;return e}getControl(e){return this._controls.get(e)}changeHandler(e){return t=>{const s=Re(t.target);this.getControl(e).value=s,this._errorCount.set(0)}}reset(){for(const[e,t]of Object.entries(this._initialValues)){const s=[...Array.isArray(t)?t:[t]];this._controls.get(e).value=JSON.parse(JSON.stringify(s))[0]}this._errors.clear(),this._errorCount.set(0)}_checkValidity(){this._errors.clear();for(const[e,{value:t,validators:s}]of this._controls)for(const o of s){const h=o(t);h!==null&&(this._errors.has(e)?this._errors.set(e,{...this._errors.get(e),...h}):this._errors.set(e,h))}this._errorCount.set(this._errors.size)}}class Te{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const j=class{static checkParams(e,t){let s=0;const o={},h=t.paramCount;for(let l=0;l<e.length;l++){const p=t.params[l];p.indexOf(":")>=0&&(o[p.split(":")[1]]=e[l].split("?")[0],s+=1)}return s===h?o:{}}static getParamCount(e){let t=0;return e.forEach(s=>{s.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(s=>s.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=j.getParamCount(t.params),j.routeList.push(t)}static preloadRoutes(){for(const e of j.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=j.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let E=j;g(E,"routeList",[]),g(E,"isHistoryBasedRouting",!0);function Ae(r,e){return r?new RegExp(r.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class Y{constructor(){g(this,"_currentRoute",new $({path:"",routeParams:new Map,queryParams:new Map,state:{}}));g(this,"_template",new $(""));g(this,"_navigationEndEvent",new W);g(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=E.isHistoryBasedRouting?"popstate":"hashchange";return E.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,s){var o=t.pushState;t.pushState=function(...h){o.apply(t,h),s()}}(window.history,this._registerOnHashChange.bind(this))),B(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(e="/",t){let s=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");s=s||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),s===e?this._navigateTo(e,t):E.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const s={},o=e.split("/").filter(p=>p.length>0),h=E.routeList.filter(p=>{if(p.params.length===o.length&&Ae(p.url,e))return p;if(p.url===e)return p}),l=h.length>0?h[0]:null;l&&(s.path=e,s.state={...t||{}},J(l.canActivate()).subscribe(p=>{if(!p)return;const w=E.checkParams(o,l);if(Object.keys(w).length>0||e){s.routeParams=new Map(Object.entries(w));let P=[];E.isHistoryBasedRouting?P=new URLSearchParams(window.location.search).entries():P=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],s.queryParams=new Map(P);const k=V=>{V.isRegistered=!0,this._currentRoute.next(s),this._template.next(V.template),this._navigationEndEvent.next()};l.isRegistered?k(l):l.templatePath?J(l.templatePath()).subscribe(()=>{k(l)}):l.redirectTo&&this.navigateTo(l.redirectTo,t)}else this.navigateTo(l.redirectTo,t)}))}}U()(Y);const Pe=()=>{class r{constructor(t,s){g(this,"_template","");g(this,"_subscriptions",new q)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t&&(this._template=t)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}render(){if(this._template){const t=[`${this._template}`];return t.raw=[`${this._template}`],z(t)}else return z``}}ne({selector:"router-outlet",deps:[Y,Q]})(r)};class ie{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,s=!1){if(s&&(E.isHistoryBasedRouting=!s),Array.isArray(e)){for(const o of e)E.formatRoute(o);t?E.preloadRoutes():E.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}return U({deps:[Y]})(ie),u.BehaviourSubjectObs=$,u.Component=ne,u.FormBuilder=Ee,u.Injectable=U,u.Renderer=Q,u.Router=ie,u.SubjectObs=W,u.Subscriptions=q,u.Validators=Te,u.fromEvent=B,u.html=z,u.promisify=we,u.registerRouterComponent=Pe,u.render=re,u.signal=X,u.wrapIntoObservable=J,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({});
