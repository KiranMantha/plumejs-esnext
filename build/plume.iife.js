var xe=Object.defineProperty;var Le=(u,_,v)=>_ in u?xe(u,_,{enumerable:!0,configurable:!0,writable:!0,value:v}):u[_]=v;var g=(u,_,v)=>(Le(u,typeof _!="symbol"?_+"":_,v),v),Z=(u,_,v)=>{if(!_.has(u))throw TypeError("Cannot "+v)};var S=(u,_,v)=>(Z(u,_,"read from private field"),v?v.call(u):_.get(u)),I=(u,_,v)=>{if(_.has(u))throw TypeError("Cannot add the same private member more than once");_ instanceof WeakSet?_.add(u):_.set(u,v)},j=(u,_,v,W)=>(Z(u,_,"write to private field"),W?W.call(u,v):_.set(u,v),v);var ee=(u,_,v)=>(Z(u,_,"access private method"),v);var PlumeJS=function(u){var N,ce;"use strict";const _=s=>!!s&&typeof s.subscribe=="function",v=s=>!!s&&typeof s.then=="function",W=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},he=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),de=s=>({subscribe:e=>{e(s)}}),fe=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}}),q=()=>Math.random().toString(36).substring(2);class J{constructor(){g(this,"_callbackCollection",{})}unsubscribe(e){delete this._callbackCollection[e]}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){const t=q();return this._callbackCollection[t]=e,()=>this.unsubscribe(t)}next(e){for(const t in this._callbackCollection)this._callbackCollection[t](e)}}class z extends J{constructor(t){super();g(this,"_initialValue");this._initialValue=t}subscribe(t){const r=super.subscribe(t);return super.next(this._initialValue),r}next(t){this._initialValue=t,super.next(t)}}class Q{constructor(){g(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const U=s=>_(s)?s:v(s)?fe(Promise.resolve(s)):de(s),$=(s,e,t,r=!1)=>(s.addEventListener(e,t,r),()=>{s.removeEventListener(e,t,r)}),pe=s=>{const e=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),t=d=>{const y=d.querySelectorAll("script");for(const A of y)A.remove()},r=(d,y)=>{if(y=y.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(d)&&(y.includes("javascript:")||y.includes("data:"))||d.startsWith("on"))return!0},a=d=>{const y=d.attributes;for(const{name:A,value:k}of y)r(A,k)&&d.removeAttribute(A)},l=d=>{const y=d.children;for(const A of y)a(A),l(A)},c=e();return t(c),l(c),c.innerHTML},ge=(s,e)=>{const t=W(e),r=()=>({get(a,l){const c=Object.prototype.toString.call(a[l]);return["[object Object]","[object Array]"].indexOf(c)>-1&&!("__metadata__"in a[l])?new Proxy(a[l],r()):a[l]},set(a,l,c){return a[l]=c,s(),!0}});return class extends e{constructor(...a){return super(...a),a.forEach((l,c)=>{t[c]&&t[c]!=="undefined"&&(this[t[c]]=l)}),new Proxy(this,r())}}},be=()=>{let s;return[new Promise(t=>{s=t}),s]},me=s=>typeof s=="function",V=Object.create(null);let D=null;function _e(s,e){const t=D;let r;D=q(),V[D]=s;try{e()}finally{r=D,D=t}return r}function te(s){const e=V[D];let t=s;function r(){return t}return r.set=function(a){me(a)?t=a(t):t=a,e()},r}function ye(s,e){const t=_e(s,e);return function(){delete V[t]}}const se=new(ce=class{constructor(){I(this,N,void 0);j(this,N,new WeakMap)}register(s,e){if(!S(this,N).get(s))S(this,N).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=S(this,N).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){j(this,N,new WeakMap)}},N=new WeakMap,ce),re=(s,e,t)=>{if(e.length>0){const r=[];for(const c of e)c.prototype.__metadata__.name!=="RENDERER"?r.push(se.getService(c)):r.push(t);const a=W(s),l=new s(...r);return e.forEach((c,d)=>{l[a[d]]=r[d]}),l}else return new s},F=new class{constructor(){g(this,"globalStyles");g(this,"globalStyleTag");g(this,"style_registry");g(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const r=new CSSStyleSheet;r.replace(s),e.push(r)}return e}},{html:ve,render:ne}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",r=/^attr([^ ]+)/,a="insertNode",l=/^insertNode([^ ]+)/;let c=[],d=[];const y=n=>{const i={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let o=JSON.stringify(n);const h=f=>i[f]||f;return o=(f=>f.replace(/[&<>\(\)]/g,h))(o),JSON.parse(o)},A=(n,i)=>{const o=n.options,h=Array.isArray(i)?i:[i];let m,f,p=o.length;for(;p--;){f=o[p];const T=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=h.indexOf(T)>-1)&&(m=!0)}m||(n.selectedIndex=-1)},k=n=>{const i=document.createElement("template");return i.innerHTML=n,i.content},O=(n,i,o)=>{const h=()=>{setTimeout(()=>{if(n.isConnected){const m=new CustomEvent("bindprops",{detail:{props:i},bubbles:!1});n.dispatchEvent(m)}})};n[o]=JSON.stringify(i),d.push(h)},b=(n,i,o)=>{switch(!0){case/attrs/.test(i):{const h=o.attrs;for(const m in h)b(n,m,h[m]);break}case/^on+/.test(i):{const h=i.slice(2).toLowerCase();n.removeEventListener(h,o),n.addEventListener(h,o);break}case/ref/.test(i):{const h=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:n,fn:o});c.push(h);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?O(n,o,Symbol("input")):n.setAttribute(i,y(o));break}case/class/.test(i):{o?n.classList.add(...o.split(" ")):n.setAttribute("class","");break}case/value/.test(i):{n.nodeName.toLowerCase()==="select"?A(n,o):n.value=y(o);break}case/disabled/.test(i):case/checked/.test(i):{o?n.setAttribute(i,o):n.removeAttribute(i);break}default:n.setAttribute(i,y(o))}},w=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,null);let h=o.nextNode();for(;h;){if(h.hasAttributes()){const m=Array.from(h.attributes).filter(f=>r.test(f.nodeName));for(const{nodeName:f,nodeValue:p}of m){const T=r.exec(f)[1];b(h,p,i[T]),h.removeAttribute(f)}}h=o.nextNode()}},E=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT,null);let h=o.nextNode(),m;for(;h;){if(m=l.exec(h.data)){const f=Array.isArray(i[m[1]])?i[m[1]]:[i[m[1]]];h.replaceWith(...f),o.currentNode=n}h=o.nextNode()}},P=(n,i)=>{if(!n||!i||n.nodeType!==1||i.nodeType!==1)return;const o=n.attributes,h=i.attributes,m=i.getAttribute("data-preserve-attributes"),f=m&&m==="true";for(const{name:p,value:T}of o)(!h[p]||h[p]!==T)&&i.setAttribute(p,T);if(!f)for(const{name:p}of h)o[p]||i.removeAttribute(p);if(["input","textarea"].includes(i.tagName.toLowerCase())&&(i.value=n.value),i.tagName.indexOf("-")>-1&&n.tagName.indexOf("-")>-1){const p=Object.getOwnPropertySymbols(n).find(L=>L.description==="input"),T=Object.getOwnPropertySymbols(i).find(L=>L.description==="input"),C=p?n[p]:"",M=T?i[T]:"";C&&M&&C!==M&&O(i,JSON.parse(C),T)}},x=n=>n.nodeType===3?"text":n.nodeType===8?"comment":n.tagName.toLowerCase(),H=n=>n.childNodes&&n.childNodes.length>0?null:n.textContent,X=(n,i,o)=>{const h=i?Array.from(i.childNodes):[],m=n?Array.from(n.childNodes):[];let f=h.length-m.length;if(f>0)for(;f>0;f--)h[h.length-f].parentNode.removeChild(h[h.length-f]);m.forEach(function(p,T){const C=h[T];if(P(p,C),o&&C&&C.nodeType===1&&C.tagName.indexOf("-")>-1)return;if(!C){i&&i.appendChild(p);return}if(x(p)!==x(C)){C.replaceWith(p);return}const M=H(p);if(M&&M!==H(C)){C.textContent=M;return}if(C.childNodes.length>0&&p.childNodes.length<1){C.innerHTML="";return}if(C.childNodes.length<1&&p.childNodes.length>0){const L=document.createDocumentFragment();X(p,L,!1),C.appendChild(L);return}if(p.childNodes.length>0){X(p,C,!0);return}})};return{html:(n,...i)=>{let o="";const{length:h}=n;for(let f=1;f<h;f++){const p=i[f-1];let T=!1;if(o+=n[f-1],s.test(o)&&e.test(o)&&(o=o.replace(s,(C,M,L)=>`${t}${f-1}=${L||'"'}${M}${L?"":'"'}`),T=!0),!T)switch(!0){case Array.isArray(p):case p instanceof DocumentFragment:{o+=`<!--${a}${f-1}-->`;break}case(typeof p=="object"&&p!==null):{"attrs"in p&&(o+=`${t}${f-1}="attrs"`);break}default:o+=p||""}}o+=n[h-1];const m=k(o.trim());return w(m,i),E(m,i),m},render:(n,i)=>{n&&!n.children.length?(n.innerHTML="",n.appendChild(i)):X(i,n,!1),c.forEach(o=>{o()}),c=[],d.forEach(o=>{o()}),d=[]}}})();class Y{constructor(e,t){g(this,"_shadowRoot");g(this,"_hostElement");g(this,"update");g(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const Se={selector:"",root:!1,styles:"",deps:[],standalone:!1,shadowDomEncapsulation:!0},ie=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},we=async(s,e)=>{var t,r,a,l,c,le,y,ue,k;if(s={...Se,...s},v(s.styles)){const O=await s.styles;s.styles=O.default.toString()}if(s.styles=s.styles.toString(),s.root&&!F.isRootNodeSet)F.isRootNodeSet=!0,s.styles&&(F.globalStyles.replace(s.styles),F.globalStyleTag=ie(s.styles,document.head));else if(s.root&&F.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(k=class extends HTMLElement{constructor(){super();I(this,c);I(this,y);I(this,t,void 0);I(this,r,void 0);I(this,a,void 0);I(this,l,new Q);g(this,"renderCount",0);if(s.shadowDomEncapsulation&&he)j(this,r,this.attachShadow({mode:"open"})),S(this,r).adoptedStyleSheets=F.getComputedCss(s.styles,s.standalone);else{j(this,r,this);const b=q();this.setAttribute("data-did",b);const w=s.styles.replaceAll(":host",`${s.selector}[data-did='${b}']`);!s.root&&w&&j(this,a,ie(w,document.head))}this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),ee(this,c,le).call(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const b=S(this,t).render();typeof b=="string"?S(this,r).innerHTML=pe(b):ne(S(this,r),b)}setProps(b){var w,E;for(const[P,x]of Object.entries(b))e.observedProperties.find(H=>H===P)&&(S(this,t)[P]=x);(E=(w=S(this,t)).onPropertiesChanged)==null||E.call(w)}getInstance(){return S(this,t)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var b,w,E,P;S(this,l).add($(this,"bindprops",x=>{const H=x.detail.props;H&&this.setProps(H)})),S(this,l).add($(this,"refresh_component",()=>{this.update()})),(w=(b=S(this,t)).beforeMount)==null||w.call(b),this.update(),(P=(E=S(this,t)).mount)==null||P.call(E)}attributeChangedCallback(b,w,E){var P,x;(x=(P=S(this,t)).onAttributesChanged)==null||x.call(P,b,w,E)}disconnectedCallback(){var b,w,E;this.renderCount=0,(w=(b=S(this,t)).unmount)==null||w.call(b),(E=S(this,a))==null||E.remove(),S(this,l).unsubscribe()}},t=new WeakMap,r=new WeakMap,a=new WeakMap,l=new WeakMap,c=new WeakSet,le=function(){const b=new Y(this,S(this,r));b.update=()=>{this.update()},b.emitEvent=(w,E)=>{ee(this,y,ue).call(this,w,E)},S(this,l).add(ye(this.setRenderIntoQueue,()=>{j(this,t,re(ge(this.setRenderIntoQueue,e),s.deps,b))}))},y=new WeakSet,ue=function(b,w){const E=new CustomEvent(b,{detail:w});this.dispatchEvent(E)},k))},Ce={deps:[]},oe=s=>e=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||we(s,e)},G=(s={})=>e=>{if(s={...Ce,...s},e.prototype.__metadata__={name:"SERVICE"},s.deps.some(r=>r.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=re(e,s.deps);se.register(e,t)};function Re(s,e){return s.nodeName&&s.nodeName.toLowerCase()===e.toLowerCase()}const Ee=s=>{let e;switch(s.nodeName&&s.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(s.type)?e=s.checked?s.value!==null&&s.value!=="on"?s.value:!0:!1:e=s.value;break}case"select":{const t=s.type==="select-one",a=[...Array.from(s.options).filter(l=>!l.disabled&&(!l.parentNode.disabled||!Re(l.parentNode,"optgroup")))].filter(l=>l.selected).map(l=>l.value??(l.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?a[0]:a;break}default:{e=s.value;break}}return e};class Te{constructor(e){g(this,"_initialValues");g(this,"_controls",new Map);g(this,"_errors",new Map);g(this,"_errorCount");g(this,"_isSubmitted",!1);this._errorCount=te(0),this._initialValues=e;for(const[t,r]of Object.entries(e)){const a=[...Array.isArray(r)?r:[r]];this._controls.set(t,{value:a[0],validators:a.length>1?a[1]:[],isTouched:!1})}}get hasErrors(){return!!this._errorCount()}get errors(){return this._errors}get valid(){return!this._errors.size}get value(){const e={};for(const[t,r]of this._controls)e[t]=r.value;return e}get submitted(){return this._isSubmitted}getControl(e){return this._controls.get(e)}register(e){return{attrs:{name:e,value:this.getControl(e).value,onchange:t=>{const r=Ee(t.target);this.getControl(e).value=r},onblur:()=>{this.getControl(e).isTouched=!0,this._checkValidity(!0)}}}}handleSubmit(e,t){e.preventDefault(),this._isSubmitted=!0,this._checkValidity(!1),t(this.value)}reset(){for(const[e,t]of Object.entries(this._initialValues)){const r=[...Array.isArray(t)?t:[t]];this._controls.get(e).value=JSON.parse(JSON.stringify(r))[0],this._controls.get(e).isTouched=!1}this._isSubmitted=!1,this._errors.clear(),this._errorCount.set(0)}_checkValidity(e){this._errors.clear();for(const[t,{value:r,validators:a,isTouched:l}]of this._controls)if(e&&l||!e&&this._isSubmitted)for(const c of a){const d=c(r);d!==null&&(this._errors.has(t)?this._errors.set(t,{...this._errors.get(t),...d}):this._errors.set(t,d))}this._errorCount.set(this._errors.size)}}class Ae{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const B=class{static checkParams(e,t){let r=0;const a={},l=t.paramCount;for(let c=0;c<e.length;c++){const d=t.params[c];d.indexOf(":")>=0&&(a[d.split(":")[1]]=e[c].split("?")[0],r+=1)}return r===l?a:{}}static getParamCount(e){let t=0;return e.forEach(r=>{r.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(r=>r.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=B.getParamCount(t.params),B.routeList.push(t)}static preloadRoutes(){for(const e of B.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=B.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let R=B;g(R,"routeList",[]),g(R,"isHistoryBasedRouting",!0);function Pe(s,e){return s?new RegExp(s.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class K{constructor(){g(this,"_currentRoute",new z({path:"",routeParams:new Map,queryParams:new Map,state:{}}));g(this,"_template",new z(""));g(this,"_navigationEndEvent",new J);g(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=R.isHistoryBasedRouting?"popstate":"hashchange";return R.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,r){var a=t.pushState;t.pushState=function(...l){a.apply(t,l),r()}}(window.history,this._registerOnHashChange.bind(this))),$(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(e="/",t){let r=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");r=r||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),r===e?this._navigateTo(e,t):R.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const r={},a=e.split("/").filter(d=>d.length>0),l=R.routeList.filter(d=>{if(d.params.length===a.length&&Pe(d.url,e))return d;if(d.url===e)return d}),c=l.length>0?l[0]:null;c&&(r.path=e,r.state={...t||{}},U(c.canActivate()).subscribe(d=>{if(!d)return;const y=R.checkParams(a,c);if(Object.keys(y).length>0||e){r.routeParams=new Map(Object.entries(y));let A=[];R.isHistoryBasedRouting?A=new URLSearchParams(window.location.search).entries():A=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],r.queryParams=new Map(A);const k=O=>{O.isRegistered=!0,this._currentRoute.next(r),this._template.next(O.template),this._navigationEndEvent.next()};c.isRegistered?k(c):c.templatePath?U(c.templatePath()).subscribe(()=>{k(c)}):c.redirectTo&&this.navigateTo(c.redirectTo,t)}else this.navigateTo(c.redirectTo,t)}))}}G()(K);const ke=()=>{class s{constructor(t,r){g(this,"_template","");g(this,"_subscriptions",new Q)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t&&(this._template=t)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=R.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}render(){return this._template}}oe({selector:"router-outlet",deps:[K,Y]})(s)};class ae{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,r=!1){if(r&&(R.isHistoryBasedRouting=!r),Array.isArray(e)){for(const a of e)R.formatRoute(a);t?R.preloadRoutes():R.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}return G({deps:[K]})(ae),u.BehaviourSubjectObs=z,u.Component=oe,u.FormBuilder=Te,u.Injectable=G,u.Renderer=Y,u.Router=ae,u.SubjectObs=J,u.Subscriptions=Q,u.Validators=Ae,u.fromEvent=$,u.html=ve,u.promisify=be,u.registerRouterComponent=ke,u.render=ne,u.signal=te,u.wrapIntoObservable=U,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u}({});
