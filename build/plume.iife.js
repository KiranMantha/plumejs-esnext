var xe=Object.defineProperty;var Le=(u,y,v)=>y in u?xe(u,y,{enumerable:!0,configurable:!0,writable:!0,value:v}):u[y]=v;var m=(u,y,v)=>(Le(u,typeof y!="symbol"?y+"":y,v),v),ee=(u,y,v)=>{if(!y.has(u))throw TypeError("Cannot "+v)};var w=(u,y,v)=>(ee(u,y,"read from private field"),v?v.call(u):y.get(u)),I=(u,y,v)=>{if(y.has(u))throw TypeError("Cannot add the same private member more than once");y instanceof WeakSet?y.add(u):y.set(u,v)},j=(u,y,v,B)=>(ee(u,y,"write to private field"),B?B.call(u,v):y.set(u,v),v);var te=(u,y,v)=>(ee(u,y,"access private method"),v);var PlumeJS=function(u){var N,le;"use strict";const y=s=>!!s&&typeof s.subscribe=="function",v=s=>!!s&&typeof s.then=="function",B=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},de=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),fe=s=>({subscribe:e=>{e(s)}}),pe=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}}),q=()=>Math.random().toString(36).substring(2);class J{constructor(){m(this,"_callbackCollection",{})}unsubscribe(e){delete this._callbackCollection[e]}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){const t=q();return this._callbackCollection[t]=e,()=>this.unsubscribe(t)}next(e){for(const t in this._callbackCollection)this._callbackCollection[t](e)}}class V extends J{constructor(t){super();m(this,"_initialValue");this._initialValue=t}subscribe(t){const r=super.subscribe(t);return super.next(this._initialValue),r}next(t){this._initialValue=t,super.next(t)}}class z{constructor(){m(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const Q=s=>y(s)?s:v(s)?pe(Promise.resolve(s)):fe(s),W=(s,e,t,r=!1)=>(s.addEventListener(e,t,r),()=>{s.removeEventListener(e,t,r)}),ge=s=>{const e=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),t=p=>{const _=p.querySelectorAll("script");for(const T of _)T.remove()},r=(p,_)=>{if(_=_.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(p)&&(_.includes("javascript:")||_.includes("data:"))||p.startsWith("on"))return!0},a=p=>{const _=p.attributes;for(const{name:T,value:k}of _)r(T,k)&&p.removeAttribute(T)},c=p=>{const _=p.children;for(const T of _)a(T),c(T)},l=e();return t(l),c(l),l.innerHTML},be=(s,e)=>{const t=B(e),r=()=>({get(a,c){const l=Object.prototype.toString.call(a[c]);return["[object Object]","[object Array]"].indexOf(l)>-1&&!("__metadata__"in a[c])?new Proxy(a[c],r()):a[c]},set(a,c,l){return a[c]=l,s(),!0}});return class extends e{constructor(...a){return super(...a),a.forEach((c,l)=>{t[l]&&t[l]!=="undefined"&&(this[t[l]]=c)}),new Proxy(this,r())}}},me=()=>{let s;return[new Promise(t=>{s=t}),s]},ye=s=>typeof s=="function",U=Object.create(null);let D=null;function _e(s,e){const t=D;let r;D=q(),U[D]=s;try{e()}finally{r=D,D=t}return r}function se(s){const e=U[D];let t=s;function r(){return t}return r.set=function(a){ye(a)?t=a(t):t=a,e()},r}function ve(s,e){const t=_e(s,e);return function(){delete U[t]}}const re=new(le=class{constructor(){I(this,N,void 0);j(this,N,new WeakMap)}register(s,e){if(!w(this,N).get(s))w(this,N).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=w(this,N).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){j(this,N,new WeakMap)}},N=new WeakMap,le),ne=(s,e,t)=>{if(e.length>0){const r=[];for(const l of e)l.prototype.__metadata__.name!=="RENDERER"?r.push(re.getService(l)):r.push(t);const a=B(s),c=new s(...r);return e.forEach((l,p)=>{c[a[p]]=r[p]}),c}else return new s},F=new class{constructor(){m(this,"globalStyles");m(this,"globalStyleTag");m(this,"style_registry");m(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const r=new CSSStyleSheet;r.replace(s),e.push(r)}return e}},{html:Y,render:ie}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",r=/^attr([^ ]+)/,a="insertNode",c=/^insertNode([^ ]+)/;let l=[],p=[];const _=n=>{const i={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let o=JSON.stringify(n);const h=f=>i[f]||f;return o=(f=>f.replace(/[&<>\(\)]/g,h))(o),JSON.parse(o)},T=(n,i)=>{const o=n.options,h=Array.isArray(i)?i:[i];let b,f,d=o.length;for(;d--;){f=o[d];const A=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=h.indexOf(A)>-1)&&(b=!0)}b||(n.selectedIndex=-1)},k=n=>{const i=document.createElement("template");return i.innerHTML=n,i.content},O=(n,i,o)=>{const h=()=>{setTimeout(()=>{if(n.isConnected){const b=new CustomEvent("bindprops",{detail:{props:i},bubbles:!1});n.dispatchEvent(b)}})};n[o]=JSON.stringify(i),p.push(h)},g=(n,i,o)=>{switch(!0){case/attrs/.test(i):{const h=o.attrs;for(const b in h)g(n,b,h[b]);break}case/^on+/.test(i):{const h=i.slice(2).toLowerCase();n.removeEventListener(h,o),n.addEventListener(h,o);break}case/ref/.test(i):{const h=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:n,fn:o});l.push(h);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?O(n,o,Symbol("input")):n.setAttribute(i,_(o));break}case/class/.test(i):{o?n.classList.add(...o.split(" ")):n.setAttribute("class","");break}case/value/.test(i):{n.nodeName.toLowerCase()==="select"?T(n,o):n.value=_(o);break}case/disabled/.test(i):case/checked/.test(i):{o?n.setAttribute(i,o):n.removeAttribute(i);break}default:n.setAttribute(i,_(o))}},S=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,null);let h=o.nextNode();for(;h;){if(h.hasAttributes()){const b=Array.from(h.attributes).filter(f=>r.test(f.nodeName));for(const{nodeName:f,nodeValue:d}of b){const A=r.exec(f)[1];g(h,d,i[A]),h.removeAttribute(f)}}h=o.nextNode()}},E=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT,null);let h=o.nextNode(),b;for(;h;){if(b=c.exec(h.data)){const f=Array.isArray(i[b[1]])?i[b[1]]:[i[b[1]]];h.replaceWith(...f),o.currentNode=n}h=o.nextNode()}},P=(n,i)=>{if(!n||!i||n.nodeType!==1||i.nodeType!==1)return;const o=n.attributes,h=i.attributes,b=i.getAttribute("data-preserve-attributes"),f=b&&b==="true";for(const{name:d,value:A}of o)(!h[d]||h[d]!==A)&&i.setAttribute(d,A);if(!f)for(const{name:d}of h)o[d]||i.removeAttribute(d);if(i.tagName.toLowerCase()==="input"&&(i.value=n.value),i.tagName.indexOf("-")>-1&&n.tagName.indexOf("-")>-1){const d=Object.getOwnPropertySymbols(n).find(L=>L.description==="input"),A=Object.getOwnPropertySymbols(i).find(L=>L.description==="input"),C=d?n[d]:"",M=A?i[A]:"";C&&M&&C!==M&&O(i,JSON.parse(C),A)}},x=n=>n.nodeType===3?"text":n.nodeType===8?"comment":n.tagName.toLowerCase(),H=n=>n.childNodes&&n.childNodes.length>0?null:n.textContent,Z=(n,i,o)=>{const h=i?Array.from(i.childNodes):[],b=n?Array.from(n.childNodes):[];let f=h.length-b.length;if(f>0)for(;f>0;f--)h[h.length-f].parentNode.removeChild(h[h.length-f]);b.forEach(function(d,A){const C=h[A];if(P(d,C),o&&C&&C.nodeType===1&&C.tagName.indexOf("-")>-1)return;if(!C){i&&i.appendChild(d);return}if(x(d)!==x(C)){C.replaceWith(d);return}const M=H(d);if(M&&M!==H(C)){C.textContent=M;return}if(C.childNodes.length>0&&d.childNodes.length<1){C.innerHTML="";return}if(C.childNodes.length<1&&d.childNodes.length>0){const L=document.createDocumentFragment();Z(d,L,!1),C.appendChild(L);return}if(d.childNodes.length>0){Z(d,C,!0);return}})};return{html:(n,...i)=>{let o="";const{length:h}=n;for(let f=1;f<h;f++){const d=i[f-1];let A=!1;if(o+=n[f-1],s.test(o)&&e.test(o)&&(o=o.replace(s,(C,M,L)=>`${t}${f-1}=${L||'"'}${M}${L?"":'"'}`),A=!0),!A)switch(!0){case Array.isArray(d):case d instanceof DocumentFragment:{o+=`<!--${a}${f-1}-->`;break}case(typeof d=="object"&&d!==null):{"html"in d&&(o+=d.html),"attrs"in d&&(o+=`${t}${f-1}="attrs"`);break}default:o+=d||""}}o+=n[h-1];const b=k(o.trim());return S(b,i),E(b,i),b},render:(n,i)=>{n&&!n.children.length?(n.innerHTML="",n.appendChild(i)):Z(i,n,!1),l.forEach(o=>{o()}),l=[],p.forEach(o=>{o()}),p=[]}}})();class G{constructor(e,t){m(this,"_shadowRoot");m(this,"_hostElement");m(this,"update");m(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const we={selector:"",root:!1,styles:"",deps:[],standalone:!1,shadowDomEncapsulation:!0},oe=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},Se=async(s,e)=>{var t,r,a,c,l,ue,_,he,k;if(s={...we,...s},v(s.styles)){const O=await s.styles;s.styles=O.default.toString()}if(s.styles=s.styles.toString(),s.root&&!F.isRootNodeSet)F.isRootNodeSet=!0,s.styles&&(F.globalStyles.replace(s.styles),F.globalStyleTag=oe(s.styles,document.head));else if(s.root&&F.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(k=class extends HTMLElement{constructor(){super();I(this,l);I(this,_);I(this,t,void 0);I(this,r,void 0);I(this,a,void 0);I(this,c,new z);m(this,"renderCount",0);if(s.shadowDomEncapsulation&&de)j(this,r,this.attachShadow({mode:"open"})),w(this,r).adoptedStyleSheets=F.getComputedCss(s.styles,s.standalone);else{j(this,r,this);const g=q();this.setAttribute("data-did",g);const S=s.styles.replaceAll(":host",`${s.selector}[data-did='${g}']`);!s.root&&S&&j(this,a,oe(S,document.head))}this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),te(this,l,ue).call(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const g=w(this,t).render();typeof g=="string"?w(this,r).innerHTML=ge(g):ie(w(this,r),g)}setProps(g){var S,E;for(const[P,x]of Object.entries(g))e.observedProperties.find(H=>H===P)&&(w(this,t)[P]=x);(E=(S=w(this,t)).onPropertiesChanged)==null||E.call(S)}getInstance(){return w(this,t)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var g,S,E,P;w(this,c).add(W(this,"bindprops",x=>{const H=x.detail.props;H&&this.setProps(H)})),w(this,c).add(W(this,"refresh_component",()=>{this.update()})),(S=(g=w(this,t)).beforeMount)==null||S.call(g),this.update(),(P=(E=w(this,t)).mount)==null||P.call(E)}attributeChangedCallback(g,S,E){var P,x;(x=(P=w(this,t)).onAttributesChanged)==null||x.call(P,g,S,E)}disconnectedCallback(){var g,S,E;this.renderCount=0,(S=(g=w(this,t)).unmount)==null||S.call(g),(E=w(this,a))==null||E.remove(),w(this,c).unsubscribe()}},t=new WeakMap,r=new WeakMap,a=new WeakMap,c=new WeakMap,l=new WeakSet,ue=function(){const g=new G(this,w(this,r));g.update=()=>{this.update()},g.emitEvent=(S,E)=>{te(this,_,he).call(this,S,E)},w(this,c).add(ve(this.setRenderIntoQueue,()=>{j(this,t,ne(be(this.setRenderIntoQueue,e),s.deps,g))}))},_=new WeakSet,he=function(g,S){const E=new CustomEvent(g,{detail:S});this.dispatchEvent(E)},k))},Ce={deps:[]},ae=s=>e=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||Se(s,e)},K=(s={})=>e=>{if(s={...Ce,...s},e.prototype.__metadata__={name:"SERVICE"},s.deps.some(r=>r.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=ne(e,s.deps);re.register(e,t)};function Re(s,e){return s.nodeName&&s.nodeName.toLowerCase()===e.toLowerCase()}const Ee=s=>{let e;switch(s.nodeName&&s.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(s.type)?e=s.checked?s.value!==null&&s.value!=="on"?s.value:!0:!1:e=s.value;break}case"select":{const t=s.type==="select-one",a=[...Array.from(s.options).filter(c=>!c.disabled&&(!c.parentNode.disabled||!Re(c.parentNode,"optgroup")))].filter(c=>c.selected).map(c=>c.value??(c.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?a[0]:a;break}default:{e=s.value;break}}return e};class Ae{constructor(e){m(this,"_initialValues");m(this,"_controls",new Map);m(this,"_errors",new Map);m(this,"_errorCount");this._errorCount=se(0),this._initialValues=e;for(const[t,r]of Object.entries(e)){const a=[...Array.isArray(r)?r:[r]];this._controls.set(t,{value:a[0],validators:a.length>1?a[1]:[]})}}get hasErrors(){return!!this._errorCount()}get errors(){return this._checkValidity(),this._errors}get valid(){return this._checkValidity(),!this._errors.size}get value(){const e={};for(const[t,r]of this._controls)e[t]=r.value;return e}getControl(e){return this._controls.get(e)}register(e){return{attrs:{onchange:t=>{const r=Ee(t.target);this.getControl(e).value=r},onblur:()=>{this._checkValidity()},name:e,value:this.getControl(e).value}}}reset(){for(const[e,t]of Object.entries(this._initialValues)){const r=[...Array.isArray(t)?t:[t]];this._controls.get(e).value=JSON.parse(JSON.stringify(r))[0]}this._errors.clear(),this._errorCount.set(0)}_checkValidity(){this._errors.clear();for(const[e,{value:t,validators:r}]of this._controls)for(const a of r){const c=a(t);c!==null&&(this._errors.has(e)?this._errors.set(e,{...this._errors.get(e),...c}):this._errors.set(e,c))}this._errorCount.set(this._errors.size)}}class Te{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const $=class{static checkParams(e,t){let r=0;const a={},c=t.paramCount;for(let l=0;l<e.length;l++){const p=t.params[l];p.indexOf(":")>=0&&(a[p.split(":")[1]]=e[l].split("?")[0],r+=1)}return r===c?a:{}}static getParamCount(e){let t=0;return e.forEach(r=>{r.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(r=>r.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=$.getParamCount(t.params),$.routeList.push(t)}static preloadRoutes(){for(const e of $.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=$.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let R=$;m(R,"routeList",[]),m(R,"isHistoryBasedRouting",!0);function Pe(s,e){return s?new RegExp(s.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class X{constructor(){m(this,"_currentRoute",new V({path:"",routeParams:new Map,queryParams:new Map,state:{}}));m(this,"_template",new V(""));m(this,"_navigationEndEvent",new J);m(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=R.isHistoryBasedRouting?"popstate":"hashchange";return R.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,r){var a=t.pushState;t.pushState=function(...c){a.apply(t,c),r()}}(window.history,this._registerOnHashChange.bind(this))),W(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(e="/",t){let r=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");r=r||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),r===e?this._navigateTo(e,t):R.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const r={},a=e.split("/").filter(p=>p.length>0),c=R.routeList.filter(p=>{if(p.params.length===a.length&&Pe(p.url,e))return p;if(p.url===e)return p}),l=c.length>0?c[0]:null;l&&(r.path=e,r.state={...t||{}},Q(l.canActivate()).subscribe(p=>{if(!p)return;const _=R.checkParams(a,l);if(Object.keys(_).length>0||e){r.routeParams=new Map(Object.entries(_));let T=[];R.isHistoryBasedRouting?T=new URLSearchParams(window.location.search).entries():T=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],r.queryParams=new Map(T);const k=O=>{O.isRegistered=!0,this._currentRoute.next(r),this._template.next(O.template),this._navigationEndEvent.next()};l.isRegistered?k(l):l.templatePath?Q(l.templatePath()).subscribe(()=>{k(l)}):l.redirectTo&&this.navigateTo(l.redirectTo,t)}else this.navigateTo(l.redirectTo,t)}))}}K()(X);const ke=()=>{class s{constructor(t,r){m(this,"_template","");m(this,"_subscriptions",new z)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t&&(this._template=t)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}render(){if(this._template){const t=[`${this._template}`];return t.raw=[`${this._template}`],Y(t)}else return Y``}}ae({selector:"router-outlet",deps:[X,G]})(s)};class ce{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,r=!1){if(r&&(R.isHistoryBasedRouting=!r),Array.isArray(e)){for(const a of e)R.formatRoute(a);t?R.preloadRoutes():R.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}return K({deps:[X]})(ce),u.BehaviourSubjectObs=V,u.Component=ae,u.FormBuilder=Ae,u.Injectable=K,u.Renderer=G,u.Router=ce,u.SubjectObs=J,u.Subscriptions=z,u.Validators=Te,u.fromEvent=W,u.html=Y,u.promisify=me,u.registerRouterComponent=ke,u.render=ie,u.signal=se,u.wrapIntoObservable=Q,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({});
