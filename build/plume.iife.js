var kt=Object.defineProperty;var Ot=(u,m,S)=>m in u?kt(u,m,{enumerable:!0,configurable:!0,writable:!0,value:S}):u[m]=S;var g=(u,m,S)=>(Ot(u,typeof m!="symbol"?m+"":m,S),S),K=(u,m,S)=>{if(!m.has(u))throw TypeError("Cannot "+S)};var _=(u,m,S)=>(K(u,m,"read from private field"),S?S.call(u):m.get(u)),M=(u,m,S)=>{if(m.has(u))throw TypeError("Cannot add the same private member more than once");m instanceof WeakSet?m.add(u):m.set(u,S)},H=(u,m,S,N)=>(K(u,m,"write to private field"),N?N.call(u,S):m.set(u,S),S);var Q=(u,m,S)=>(K(u,m,"access private method"),S);var PlumeJS=function(u){var O,ot;"use strict";const m=r=>typeof r=="function",S=Object.create(null);let N=null;function lt(){return Math.random().toString(36).substring(2)}function ut(r,t){const e=N;let s;N=lt(),S[N]={updateFn:r,updates:0};try{t()}finally{s=N,N=e}return s}function X(r){const t=S[N];let e=r;function s(){return e}return s.set=function(o){m(o)?e=o(e):e=o,++t.updates,t.updates===1&&queueMicrotask(()=>{t.updateFn(),t.updates=0})},s}function ht(r,t){const e=ut(r,t);return function(){delete S[e]}}const Z=new(ot=class{constructor(){M(this,O,void 0);H(this,O,new WeakMap)}register(r,t){if(!_(this,O).get(r))_(this,O).set(r,t);else throw console.error(r),"service already exists"}getService(r){const t=_(this,O).get(r);if(t)return t;throw console.error(r),"service is not a registered service."}clear(){H(this,O,new WeakMap)}},O=new WeakMap,ot),dt=r=>!!r&&typeof r.subscribe=="function",ft=r=>!!r&&typeof r.then=="function",tt=r=>{const t=r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return t.length===3?t[1].split(",").map(e=>e.trim()):[]},pt=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),bt=r=>({subscribe:t=>{t(r)}}),gt=r=>({subscribe:t=>{Promise.resolve(r).then(e=>{t(e)})}}),mt=()=>Math.random().toString(36).substring(2);class W{constructor(){g(this,"_callbackCollection",{})}unsubscribe(t){delete this._callbackCollection[t]}asObservable(){return{subscribe:t=>this.subscribe(t)}}subscribe(t){const e=mt();return this._callbackCollection[e]=t,()=>this.unsubscribe(e)}next(t){for(const e in this._callbackCollection)this._callbackCollection[e](t)}}class $ extends W{constructor(e){super();g(this,"_initialValue");this._initialValue=e}subscribe(e){const s=super.subscribe(e);return super.next(this._initialValue),s}next(e){this._initialValue=e,super.next(e)}}class q{constructor(){g(this,"_subcribers",[])}add(t){this._subcribers.push(t)}unsubscribe(){for(const t of this._subcribers)t();this._subcribers=[]}}const J=r=>dt(r)?r:ft(r)?gt(Promise.resolve(r)):bt(r),B=(r,t,e,s=!1)=>(r.addEventListener(t,e,s),()=>{r.removeEventListener(t,e,s)}),yt=r=>{const t=()=>new DOMParser().parseFromString(r,"text/html").body||document.createElement("body"),e=p=>{const w=p.querySelectorAll("script");for(const P of w)P.remove()},s=(p,w)=>{if(w=w.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(p)&&(w.includes("javascript:")||w.includes("data:"))||p.startsWith("on"))return!0},o=p=>{const w=p.attributes;for(const{name:P,value:k}of w)s(P,k)&&p.removeAttribute(P)},h=p=>{const w=p.children;for(const P of w)o(P),h(P)},l=t();return e(l),h(l),l.innerHTML},_t=function(r){r.renderCount===1&&queueMicrotask(()=>{r.update(),r.renderCount=0})},wt=(r,t)=>{const e=tt(t),s=()=>({get(o,h){const l=Object.prototype.toString.call(o[h]);return["[object Object]","[object Array]"].indexOf(l)>-1&&!("__metadata__"in o[h])?new Proxy(o[h],s()):o[h]},set(o,h,l){return o[h]=l,++r.renderCount,_t(r),!0}});return class extends t{constructor(...o){return super(...o),o.forEach((h,l)=>{e[l]&&e[l]!=="undefined"&&(this[e[l]]=h)}),new Proxy(this,s())}}},vt=()=>{let r;return[new Promise(e=>{r=e}),r]},et=(r,t,e)=>{if(t.length>0){const s=[];for(const l of t)l.prototype.__metadata__.name!=="RENDERER"?s.push(Z.getService(l)):s.push(e);const o=tt(r),h=new r(...s);return t.forEach((l,p)=>{h[o[p]]=s[p]}),h}else return new r},j=new class{constructor(){g(this,"globalStyles");g(this,"globalStyleTag");g(this,"style_registry");g(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(r=""){let t=[];const e=new CSSStyleSheet;if(e.insertRule(":host { display: block; }"),t=[this.globalStyles,e],r){const s=new CSSStyleSheet;s.replace(r),t.push(s)}return t}},{html:z,render:rt}=(()=>{const r=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,t=/<[a-z][^>]+$/i,e="attr",s=/^attr([^ ]+)/,o="insertNode",h=/^insertNode([^ ]+)/;let l=[],p=[];const w=a=>{const n={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let d=JSON.stringify(a);const c=f=>n[f]||f;return d=(f=>f.replace(/[&<>\(\)]/g,c))(d),JSON.parse(d)},P=(a,n)=>{const d=a.options,c=Array.isArray(n)?n:[n];let C,f,i=d.length;for(;i--;){f=d[i];const b=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=c.indexOf(b)>-1)&&(C=!0)}C||(a.selectedIndex=-1)},k=a=>{const n=document.createElement("template");return n.innerHTML=a,n.content},V=(a,n,d)=>{const c=()=>{setTimeout(()=>{if(a.isConnected){const C=new CustomEvent("bindprops",{detail:{props:n},bubbles:!1});a.dispatchEvent(C)}})};a[d]=JSON.stringify(n),p.push(c)},v=(a,n)=>{const d=document.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,null);let c=d.nextNode();for(;c;){if(c.hasAttributes()){const C=Array.from(c.attributes).filter(f=>s.test(f.nodeName));for(const{nodeName:f,nodeValue:i}of C){const b=s.exec(f)[1];switch(!0){case/^on+/.test(i):{const y=i.slice(2).toLowerCase();c.removeEventListener(y,n[b]),c.addEventListener(y,n[b]);break}case/ref/.test(i):{const y=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:c,fn:n[b]});l.push(y);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?V(c,n[b],Symbol("input")):c.setAttribute(i,w(n[b]));break}case/class/.test(i):{n[b]?c.classList.add(...n[b].split(" ")):c.setAttribute("class","");break}case/value/.test(i):{c.nodeName.toLowerCase()==="select"?P(c,n[b]):c.value=w(n[b]);break}case/disabled/.test(i):case/checked/.test(i):{n[b]?c.setAttribute(i,n[b]):c.removeAttribute(i);break}default:c.setAttribute(i,w(n[b]))}c.removeAttribute(f)}}c=d.nextNode()}},T=(a,n)=>{const d=document.createTreeWalker(a,NodeFilter.SHOW_COMMENT,null);let c=d.nextNode(),C;for(;c;){if(C=h.exec(c.data)){const f=Array.isArray(n[C[1]])?n[C[1]]:[n[C[1]]];c.replaceWith(...f),d.currentNode=a}c=d.nextNode()}},R=(a,n)=>{if(!a||!n||a.nodeType!==1||n.nodeType!==1)return;const d=a.attributes,c=n.attributes,C=n.getAttribute("data-preserve-attributes"),f=C&&C==="true";for(const{name:i,value:b}of d)(!c[i]||c[i]!==b)&&n.setAttribute(i,b);if(!f)for(const{name:i}of c)d[i]||n.removeAttribute(i);if(n.tagName.toLowerCase()==="input"&&(n.value=a.value),n.tagName.indexOf("-")>-1&&a.tagName.indexOf("-")>-1){const i=Object.getOwnPropertySymbols(a),b=Object.getOwnPropertySymbols(n),y=i.length?a[i[0]]:"",x=b.length?n[b[0]]:"";y&&x&&y!==x&&V(n,JSON.parse(y),b[0])}},A=a=>a.nodeType===3?"text":a.nodeType===8?"comment":a.tagName.toLowerCase(),L=a=>a.childNodes&&a.childNodes.length>0?null:a.textContent,F=(a,n,d)=>{const c=n?Array.from(n.childNodes):[],C=a?Array.from(a.childNodes):[];let f=c.length-C.length;if(f>0)for(;f>0;f--)c[c.length-f].parentNode.removeChild(c[c.length-f]);C.forEach(function(i,b){const y=c[b];if(R(i,y),d&&y&&y.nodeType===1&&y.tagName.indexOf("-")>-1)return;if(!y){n&&n.appendChild(i);return}if(A(i)!==A(y)){y.replaceWith(i);return}const x=L(i);if(x&&x!==L(y)){y.textContent=x;return}if(y.childNodes.length>0&&i.childNodes.length<1){y.innerHTML="";return}if(y.childNodes.length<1&&i.childNodes.length>0){const D=document.createDocumentFragment();F(i,D,!1),y.appendChild(D);return}if(i.childNodes.length>0){F(i,y,!0);return}})};return{html:(a,...n)=>{let d="";const{length:c}=a;for(let f=1;f<c;f++){const i=n[f-1];let b=!1;if(d+=a[f-1],r.test(d)&&t.test(d)&&(d=d.replace(r,(y,x,D)=>`${e}${f-1}=${D||'"'}${x}${D?"":'"'}`),b=!0),!b)switch(!0){case Array.isArray(i):case i instanceof DocumentFragment:{d+=`<!--${o}${f-1}-->`;break}case(typeof i=="object"&&i!==null):{"html"in i&&(d+=i.html);break}default:d+=i||""}}d+=a[c-1];const C=k(d.trim());return v(C,n),T(C,n),C},render:(a,n)=>{a&&!a.children.length?(a.innerHTML="",a.appendChild(n)):F(n,a,!1),l.forEach(d=>{d()}),l=[],p.forEach(d=>{d()}),p=[]}}})();class U{constructor(t,e){g(this,"_shadowRoot");g(this,"_hostElement");g(this,"update");g(this,"emitEvent");this._hostElement=t,this._shadowRoot=e}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const St={selector:"",root:!1,styles:"",deps:[],standalone:!1,encapsulation:"shadowDom"},st=(r,t)=>{const e=document.createElement("style");return e.innerHTML=r,t&&t.appendChild(e),e},Ct=(r,t)=>{var e,s,o,h,l,at,w,ct,k;if(r={...St,...r},r.styles=r.styles.toString(),r.root&&!j.isRootNodeSet)j.isRootNodeSet=!0,r.styles&&(j.globalStyles.replace(r.styles),j.globalStyleTag=st(r.styles,document.head));else if(r.root&&j.isRootNodeSet)throw Error("Cannot register duplicate root component in "+r.selector+" component");window.customElements.define(r.selector,(k=class extends HTMLElement{constructor(){super();M(this,l);M(this,w);M(this,e,void 0);M(this,s,void 0);M(this,o,void 0);g(this,"renderCount",0);M(this,h,new q);if(pt)H(this,s,this.attachShadow({mode:"open"})),_(this,s).adoptedStyleSheets=j.getComputedCss(r.styles,r.standalone);else{H(this,s,this);const v=r.styles.replaceAll(":host",r.selector);H(this,o,st(v,document.head))}Q(this,l,at).call(this),this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this)}static get observedAttributes(){return t.observedAttributes||[]}update(){const v=_(this,e).render();typeof v=="string"?_(this,s).innerHTML=yt(v):rt(_(this,s),v)}setProps(v){var T,R;for(const[A,L]of Object.entries(v))t.observedProperties.find(F=>F===A)&&(_(this,e)[A]=L);(R=(T=_(this,e)).onPropertiesChanged)==null||R.call(T)}getInstance(){return _(this,e)}connectedCallback(){var v,T;_(this,h).add(B(this,"bindprops",R=>{const A=R.detail.props;A&&this.setProps(A)})),_(this,h).add(B(this,"refresh_component",()=>{var R,A;(A=(R=_(this,e)).mount)==null||A.call(R)})),_(this,e).beforeMount&&_(this,h).add(ht(this.update,_(this,e).beforeMount.bind(_(this,e)))),this.update(),(T=(v=_(this,e)).mount)==null||T.call(v)}attributeChangedCallback(v,T,R){var A,L;(L=(A=_(this,e)).onAttributesChanged)==null||L.call(A,v,T,R)}disconnectedCallback(){var v,T,R;this.renderCount=1,(T=(v=_(this,e)).unmount)==null||T.call(v),(R=_(this,o))==null||R.remove(),_(this,h).unsubscribe()}},e=new WeakMap,s=new WeakMap,o=new WeakMap,h=new WeakMap,l=new WeakSet,at=function(){const v=new U(this,_(this,s));v.update=()=>{this.update()},v.emitEvent=(T,R)=>{Q(this,w,ct).call(this,T,R)},H(this,e,et(wt(this,t),r.deps,v))},w=new WeakSet,ct=function(v,T){const R=new CustomEvent(v,{detail:T});this.dispatchEvent(R)},k))},Rt={deps:[]},nt=r=>t=>{if(r.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(r.selector)||Ct(r,t)},Y=(r={})=>t=>{if(r={...Rt,...r},t.prototype.__metadata__={name:"SERVICE"},r.deps.some(s=>s.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const e=et(t,r.deps);Z.register(t,e)},Et=r=>{let t;switch(r.nodeName&&r.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(r.type)?t=r.checked?r.value!==null&&r.value!=="on"?r.value:!0:!1:t=r.value;break}case"select":{const e=r.type==="select-one",o=[...Array.from(r.options)].filter(h=>h.selected).map(h=>h.value??(h.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));t=e?o[0]:o;break}default:{t=r.value;break}}return t};class Tt{constructor(t){g(this,"_initialValues");g(this,"_controls",new Map);g(this,"_errors",new Map);g(this,"_errorCount");this._errorCount=X(0),this._initialValues=t;for(const[e,s]of Object.entries(t)){const o=[...Array.isArray(s)?s:[s]];this._controls.set(e,{value:o[0],validators:o.length>1?o[1]:[]})}}get hasErrors(){return!!this._errorCount()}get errors(){return this._checkValidity(),this._errors}get valid(){return this._checkValidity(),!this._errors.size}get value(){const t={};for(const[e,s]of this._controls)t[e]=s.value;return t}getControl(t){return this._controls.get(t)}changeHandler(t){return e=>{const s=Et(e.target);this.getControl(t).value=s,this._errorCount.set(0)}}reset(){for(const[t,e]of Object.entries(this._initialValues)){const s=[...Array.isArray(e)?e:[e]];this._controls.get(t).value=JSON.parse(JSON.stringify(s))[0]}this._errors.clear(),this._errorCount.set(0)}_checkValidity(){this._errors.clear();for(const[t,{value:e,validators:s}]of this._controls)for(const o of s){const h=o(e);h!==null&&(this._errors.has(t)?this._errors.set(t,{...this._errors.get(t),...h}):this._errors.set(t,h))}this._errorCount.set(this._errors.size)}}class At{static required(t){return t.length?null:{required:!0}}static min(t){return e=>e.length>=t?null:{minLength:{requiredLength:t}}}static max(t){return e=>e.length<=t?null:{maxLength:{requiredLength:t}}}static pattern(t){return e=>new RegExp(t).test(e)?null:{pattern:!0}}}const I=class{static checkParams(t,e){let s=0;const o={},h=e.paramCount;for(let l=0;l<t.length;l++){const p=e.params[l];p.indexOf(":")>=0&&(o[p.split(":")[1]]=t[l].split("?")[0],s+=1)}return s===h?o:{}}static getParamCount(t){let e=0;return t.forEach(s=>{s.indexOf(":")>=0&&(e+=1)}),e}static formatRoute(t){const e={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:t.preload,canActivate:()=>!0};if(e.params=t.path.split("/").filter(s=>s.length>0),e.url=t.path,e.template="",e.redirectTo=t.redirectTo,t.template){if(!t.templatePath)throw Error("templatePath is required in route if template is mentioned.");e.template=t.template,e.templatePath=t.templatePath}t.canActivate&&(e.canActivate=t.canActivate),e.paramCount=I.getParamCount(e.params),I.routeList.push(e)}static preloadRoutes(){for(const t of I.routeList)t.templatePath&&t.templatePath()}static preloadSelectedRoutes(){const t=I.routeList.filter(e=>e.preload===!0);for(const e of t)e.templatePath&&e.templatePath()}};let E=I;g(E,"routeList",[]),g(E,"isHistoryBasedRouting",!0);function Pt(r,t){return r?new RegExp(r.replace(/:[^\s/]+/g,"(.+)")).test(t):!1}class G{constructor(){g(this,"_currentRoute",new $({path:"",routeParams:new Map,queryParams:new Map,state:{}}));g(this,"_template",new $(""));g(this,"_navigationEndEvent",new W);g(this,"_routeStateMap",new Map)}listenRouteChanges(){const t=E.isHistoryBasedRouting?"popstate":"hashchange";return E.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(e,s){var o=e.pushState;e.pushState=function(...h){o.apply(e,h),s()}}(window.history,this._registerOnHashChange.bind(this))),B(window,t,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(t="/",e){let s=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");s=s||"/",this._routeStateMap.clear(),this._routeStateMap.set(t,e),s===t?this._navigateTo(t,e):E.isHistoryBasedRouting?window.history.pushState(e,"",t):window.location.hash="#"+t}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const t=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),e=this._routeStateMap.get(t);this._navigateTo(t,e)}_navigateTo(t,e){const s={},o=t.split("/").filter(p=>p.length>0),h=E.routeList.filter(p=>{if(p.params.length===o.length&&Pt(p.url,t))return p;if(p.url===t)return p}),l=h.length>0?h[0]:null;l&&(s.path=t,s.state={...e||{}},J(l.canActivate()).subscribe(p=>{if(!p)return;const w=E.checkParams(o,l);if(Object.keys(w).length>0||t){s.routeParams=new Map(Object.entries(w));let P=[];E.isHistoryBasedRouting?P=new URLSearchParams(window.location.search).entries():P=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],s.queryParams=new Map(P);const k=V=>{V.isRegistered=!0,this._currentRoute.next(s),this._template.next(V.template),this._navigationEndEvent.next()};l.isRegistered?k(l):l.templatePath?J(l.templatePath()).subscribe(()=>{k(l)}):l.redirectTo&&this.navigateTo(l.redirectTo,e)}else this.navigateTo(l.redirectTo,e)}))}}Y()(G);const Nt=()=>{class r{constructor(e,s){g(this,"_template","");g(this,"_subscriptions",new q)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(e=>{this._template!==e&&(this._template=e)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const e=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(e||"/")}unmount(){this._subscriptions.unsubscribe()}render(){if(this._template){const e=[`${this._template}`];return e.raw=[`${this._template}`],z(e)}else return z``}}nt({selector:"router-outlet",deps:[G,U]})(r)};class it{constructor(t){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(t,e){this.internalRouter.navigateTo(t,e)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(t,e=!1,s=!1){if(s&&(E.isHistoryBasedRouting=!s),Array.isArray(t)){for(const o of t)E.formatRoute(o);e?E.preloadRoutes():E.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}return Y({deps:[G]})(it),u.BehaviourSubjectObs=$,u.Component=nt,u.FormBuilder=Tt,u.Injectable=Y,u.Renderer=U,u.Router=it,u.SubjectObs=W,u.Subscriptions=q,u.Validators=At,u.fromEvent=B,u.html=z,u.promisify=vt,u.registerRouterComponent=Nt,u.render=rt,u.signal=X,u.wrapIntoObservable=J,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({});
