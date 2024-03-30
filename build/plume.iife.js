var Pe=Object.defineProperty;var ke=(h,m,C)=>m in h?Pe(h,m,{enumerable:!0,configurable:!0,writable:!0,value:C}):h[m]=C;var g=(h,m,C)=>(ke(h,typeof m!="symbol"?m+"":m,C),C),Z=(h,m,C)=>{if(!m.has(h))throw TypeError("Cannot "+C)};var v=(h,m,C)=>(Z(h,m,"read from private field"),C?C.call(h):m.get(h)),M=(h,m,C)=>{if(m.has(h))throw TypeError("Cannot add the same private member more than once");m instanceof WeakSet?m.add(h):m.set(h,C)},H=(h,m,C,F)=>(Z(h,m,"write to private field"),F?F.call(h,C):m.set(h,C),C);var ee=(h,m,C)=>(Z(h,m,"access private method"),C);var PlumeJS=function(h){var x,ce;"use strict";const m=r=>!!r&&typeof r.subscribe=="function",C=r=>!!r&&typeof r.then=="function",F=r=>{const e=r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},he=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),de=r=>({subscribe:e=>{e(r)}}),fe=r=>({subscribe:e=>{Promise.resolve(r).then(t=>{e(t)})}}),$=()=>Math.random().toString(36).substring(2);class q{constructor(){g(this,"_callbackCollection",{})}unsubscribe(e){delete this._callbackCollection[e]}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){const t=$();return this._callbackCollection[t]=e,()=>this.unsubscribe(t)}next(e){for(const t in this._callbackCollection)this._callbackCollection[t](e)}}class J extends q{constructor(t){super();g(this,"_initialValue");this._initialValue=t}subscribe(t){const s=super.subscribe(t);return super.next(this._initialValue),s}next(t){this._initialValue=t,super.next(t)}}class z{constructor(){g(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const Q=r=>m(r)?r:C(r)?fe(Promise.resolve(r)):de(r),W=(r,e,t,s=!1)=>(r.addEventListener(e,t,s),()=>{r.removeEventListener(e,t,s)}),pe=r=>{const e=()=>new DOMParser().parseFromString(r,"text/html").body||document.createElement("body"),t=p=>{const w=p.querySelectorAll("script");for(const A of w)A.remove()},s=(p,w)=>{if(w=w.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(p)&&(w.includes("javascript:")||w.includes("data:"))||p.startsWith("on"))return!0},o=p=>{const w=p.attributes;for(const{name:A,value:P}of w)s(A,P)&&p.removeAttribute(A)},a=p=>{const w=p.children;for(const A of w)o(A),a(A)},u=e();return t(u),a(u),u.innerHTML},be=(r,e)=>{const t=F(e),s=()=>({get(o,a){const u=Object.prototype.toString.call(o[a]);return["[object Object]","[object Array]"].indexOf(u)>-1&&!("__metadata__"in o[a])?new Proxy(o[a],s()):o[a]},set(o,a,u){return o[a]=u,r(),!0}});return class extends e{constructor(...o){return super(...o),o.forEach((a,u)=>{t[u]&&t[u]!=="undefined"&&(this[t[u]]=a)}),new Proxy(this,s())}}},ge=()=>{let r;return[new Promise(t=>{r=t}),r]},me=r=>typeof r=="function",U=Object.create(null);let j=null;function ye(r,e){const t=j;let s;j=$(),U[j]=r;try{e()}finally{s=j,j=t}return s}function te(r){const e=U[j];let t=r;function s(){return t}return s.set=function(o){me(o)?t=o(t):t=o,e()},s}function _e(r,e){const t=ye(r,e);return function(){delete U[t]}}const re=new(ce=class{constructor(){M(this,x,void 0);H(this,x,new WeakMap)}register(r,e){if(!v(this,x).get(r))v(this,x).set(r,e);else throw console.error(r),"service already exists"}getService(r){const e=v(this,x).get(r);if(e)return e;throw console.error(r),"service is not a registered service."}clear(){H(this,x,new WeakMap)}},x=new WeakMap,ce),se=(r,e,t)=>{if(e.length>0){const s=[];for(const u of e)u.prototype.__metadata__.name!=="RENDERER"?s.push(re.getService(u)):s.push(t);const o=F(r),a=new r(...s);return e.forEach((u,p)=>{a[o[p]]=s[p]}),a}else return new r},V=new class{constructor(){g(this,"globalStyles");g(this,"globalStyleTag");g(this,"style_registry");g(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(r=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],r){const s=new CSSStyleSheet;s.replace(r),e.push(s)}return e}},{html:Y,render:ne}=(()=>{const r=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",s=/^attr([^ ]+)/,o="insertNode",a=/^insertNode([^ ]+)/;let u=[],p=[];const w=c=>{const n={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let d=JSON.stringify(c);const l=f=>n[f]||f;return d=(f=>f.replace(/[&<>\(\)]/g,l))(d),JSON.parse(d)},A=(c,n)=>{const d=c.options,l=Array.isArray(n)?n:[n];let S,f,i=d.length;for(;i--;){f=d[i];const b=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=l.indexOf(b)>-1)&&(S=!0)}S||(c.selectedIndex=-1)},P=c=>{const n=document.createElement("template");return n.innerHTML=c,n.content},L=(c,n,d)=>{const l=()=>{setTimeout(()=>{if(c.isConnected){const S=new CustomEvent("bindprops",{detail:{props:n},bubbles:!1});c.dispatchEvent(S)}})};c[d]=JSON.stringify(n),p.push(l)},y=(c,n)=>{const d=document.createTreeWalker(c,NodeFilter.SHOW_ELEMENT,null);let l=d.nextNode();for(;l;){if(l.hasAttributes()){const S=Array.from(l.attributes).filter(f=>s.test(f.nodeName));for(const{nodeName:f,nodeValue:i}of S){const b=s.exec(f)[1];switch(!0){case/^on+/.test(i):{const _=i.slice(2).toLowerCase();l.removeEventListener(_,n[b]),l.addEventListener(_,n[b]);break}case/ref/.test(i):{const _=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:l,fn:n[b]});u.push(_);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?L(l,n[b],Symbol("input")):l.setAttribute(i,w(n[b]));break}case/class/.test(i):{n[b]?l.classList.add(...n[b].split(" ")):l.setAttribute("class","");break}case/value/.test(i):{l.nodeName.toLowerCase()==="select"?A(l,n[b]):l.value=w(n[b]);break}case/disabled/.test(i):case/checked/.test(i):{n[b]?l.setAttribute(i,n[b]):l.removeAttribute(i);break}default:l.setAttribute(i,w(n[b]))}l.removeAttribute(f)}}l=d.nextNode()}},R=(c,n)=>{const d=document.createTreeWalker(c,NodeFilter.SHOW_COMMENT,null);let l=d.nextNode(),S;for(;l;){if(S=a.exec(l.data)){const f=Array.isArray(n[S[1]])?n[S[1]]:[n[S[1]]];l.replaceWith(...f),d.currentNode=c}l=d.nextNode()}},T=(c,n)=>{if(!c||!n||c.nodeType!==1||n.nodeType!==1)return;const d=c.attributes,l=n.attributes,S=n.getAttribute("data-preserve-attributes"),f=S&&S==="true";for(const{name:i,value:b}of d)(!l[i]||l[i]!==b)&&n.setAttribute(i,b);if(!f)for(const{name:i}of l)d[i]||n.removeAttribute(i);if(n.tagName.toLowerCase()==="input"&&(n.value=c.value),n.tagName.indexOf("-")>-1&&c.tagName.indexOf("-")>-1){const i=Object.getOwnPropertySymbols(c).find(k=>k.description==="input"),b=Object.getOwnPropertySymbols(n).find(k=>k.description==="input"),_=i?c[i]:"",O=b?n[b]:"";_&&O&&_!==O&&L(n,JSON.parse(_),b)}},N=c=>c.nodeType===3?"text":c.nodeType===8?"comment":c.tagName.toLowerCase(),I=c=>c.childNodes&&c.childNodes.length>0?null:c.textContent,B=(c,n,d)=>{const l=n?Array.from(n.childNodes):[],S=c?Array.from(c.childNodes):[];let f=l.length-S.length;if(f>0)for(;f>0;f--)l[l.length-f].parentNode.removeChild(l[l.length-f]);S.forEach(function(i,b){const _=l[b];if(T(i,_),d&&_&&_.nodeType===1&&_.tagName.indexOf("-")>-1)return;if(!_){n&&n.appendChild(i);return}if(N(i)!==N(_)){_.replaceWith(i);return}const O=I(i);if(O&&O!==I(_)){_.textContent=O;return}if(_.childNodes.length>0&&i.childNodes.length<1){_.innerHTML="";return}if(_.childNodes.length<1&&i.childNodes.length>0){const k=document.createDocumentFragment();B(i,k,!1),_.appendChild(k);return}if(i.childNodes.length>0){B(i,_,!0);return}})};return{html:(c,...n)=>{let d="";const{length:l}=c;for(let f=1;f<l;f++){const i=n[f-1];let b=!1;if(d+=c[f-1],r.test(d)&&e.test(d)&&(d=d.replace(r,(_,O,k)=>`${t}${f-1}=${k||'"'}${O}${k?"":'"'}`),b=!0),!b)switch(!0){case Array.isArray(i):case i instanceof DocumentFragment:{d+=`<!--${o}${f-1}-->`;break}case(typeof i=="object"&&i!==null):{"html"in i&&(d+=i.html);break}default:d+=i||""}}d+=c[l-1];const S=P(d.trim());return y(S,n),R(S,n),S},render:(c,n)=>{c&&!c.children.length?(c.innerHTML="",c.appendChild(n)):B(n,c,!1),u.forEach(d=>{d()}),u=[],p.forEach(d=>{d()}),p=[]}}})();class G{constructor(e,t){g(this,"_shadowRoot");g(this,"_hostElement");g(this,"update");g(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const we={selector:"",root:!1,styles:"",deps:[],standalone:!1,shadowDomEncapsulation:!0},ie=(r,e)=>{const t=document.createElement("style");return t.innerHTML=r,e&&e.appendChild(t),t},ve=async(r,e)=>{var t,s,o,a,u,le,w,ue,P;if(r={...we,...r},C(r.styles)){const L=await r.styles;r.styles=L.default.toString()}if(r.styles=r.styles.toString(),r.root&&!V.isRootNodeSet)V.isRootNodeSet=!0,r.styles&&(V.globalStyles.replace(r.styles),V.globalStyleTag=ie(r.styles,document.head));else if(r.root&&V.isRootNodeSet)throw Error("Cannot register duplicate root component in "+r.selector+" component");window.customElements.define(r.selector,(P=class extends HTMLElement{constructor(){super();M(this,u);M(this,w);M(this,t,void 0);M(this,s,void 0);M(this,o,void 0);M(this,a,new z);g(this,"renderCount",0);if(r.shadowDomEncapsulation&&he)H(this,s,this.attachShadow({mode:"open"})),v(this,s).adoptedStyleSheets=V.getComputedCss(r.styles,r.standalone);else{H(this,s,this);const y=$();this.setAttribute("data-did",y);const R=r.styles.replaceAll(":host",`${r.selector}[data-did='${y}']`);!r.root&&R&&H(this,o,ie(R,document.head))}this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),ee(this,u,le).call(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const y=v(this,t).render();typeof y=="string"?v(this,s).innerHTML=pe(y):ne(v(this,s),y)}setProps(y){var R,T;for(const[N,I]of Object.entries(y))e.observedProperties.find(B=>B===N)&&(v(this,t)[N]=I);(T=(R=v(this,t)).onPropertiesChanged)==null||T.call(R)}getInstance(){return v(this,t)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var y,R;v(this,a).add(W(this,"bindprops",T=>{const N=T.detail.props;N&&this.setProps(N)})),v(this,a).add(W(this,"refresh_component",()=>{this.update()})),v(this,t).beforeMount&&v(this,a).add(_e(this.setRenderIntoQueue,v(this,t).beforeMount.bind(v(this,t)))),this.update(),(R=(y=v(this,t)).mount)==null||R.call(y)}attributeChangedCallback(y,R,T){var N,I;(I=(N=v(this,t)).onAttributesChanged)==null||I.call(N,y,R,T)}disconnectedCallback(){var y,R,T;this.renderCount=0,(R=(y=v(this,t)).unmount)==null||R.call(y),(T=v(this,o))==null||T.remove(),v(this,a).unsubscribe()}},t=new WeakMap,s=new WeakMap,o=new WeakMap,a=new WeakMap,u=new WeakSet,le=function(){const y=new G(this,v(this,s));y.update=()=>{this.update()},y.emitEvent=(R,T)=>{ee(this,w,ue).call(this,R,T)},H(this,t,se(be(this.setRenderIntoQueue,e),r.deps,y))},w=new WeakSet,ue=function(y,R){const T=new CustomEvent(y,{detail:R});this.dispatchEvent(T)},P))},Se={deps:[]},oe=r=>e=>{if(r.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(r.selector)||ve(r,e)},K=(r={})=>e=>{if(r={...Se,...r},e.prototype.__metadata__={name:"SERVICE"},r.deps.some(s=>s.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=se(e,r.deps);re.register(e,t)};function Ce(r,e){return r.nodeName&&r.nodeName.toLowerCase()===e.toLowerCase()}const Re=r=>{let e;switch(r.nodeName&&r.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(r.type)?e=r.checked?r.value!==null&&r.value!=="on"?r.value:!0:!1:e=r.value;break}case"select":{const t=r.type==="select-one",o=[...Array.from(r.options).filter(a=>!a.disabled&&(!a.parentNode.disabled||!Ce(a.parentNode,"optgroup")))].filter(a=>a.selected).map(a=>a.value??(a.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?o[0]:o;break}default:{e=r.value;break}}return e};class Ee{constructor(e){g(this,"_initialValues");g(this,"_controls",new Map);g(this,"_errors",new Map);g(this,"_errorCount");this._errorCount=te(0),this._initialValues=e;for(const[t,s]of Object.entries(e)){const o=[...Array.isArray(s)?s:[s]];this._controls.set(t,{value:o[0],validators:o.length>1?o[1]:[]})}}get hasErrors(){return!!this._errorCount()}get errors(){return this._checkValidity(),this._errors}get valid(){return this._checkValidity(),!this._errors.size}get value(){const e={};for(const[t,s]of this._controls)e[t]=s.value;return e}getControl(e){return this._controls.get(e)}changeHandler(e){return t=>{const s=Re(t.target);this.getControl(e).value=s,this._errorCount.set(0)}}reset(){for(const[e,t]of Object.entries(this._initialValues)){const s=[...Array.isArray(t)?t:[t]];this._controls.get(e).value=JSON.parse(JSON.stringify(s))[0]}this._errors.clear(),this._errorCount.set(0)}_checkValidity(){this._errors.clear();for(const[e,{value:t,validators:s}]of this._controls)for(const o of s){const a=o(t);a!==null&&(this._errors.has(e)?this._errors.set(e,{...this._errors.get(e),...a}):this._errors.set(e,a))}this._errorCount.set(this._errors.size)}}class Te{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const D=class{static checkParams(e,t){let s=0;const o={},a=t.paramCount;for(let u=0;u<e.length;u++){const p=t.params[u];p.indexOf(":")>=0&&(o[p.split(":")[1]]=e[u].split("?")[0],s+=1)}return s===a?o:{}}static getParamCount(e){let t=0;return e.forEach(s=>{s.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(s=>s.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=D.getParamCount(t.params),D.routeList.push(t)}static preloadRoutes(){for(const e of D.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=D.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let E=D;g(E,"routeList",[]),g(E,"isHistoryBasedRouting",!0);function Ae(r,e){return r?new RegExp(r.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class X{constructor(){g(this,"_currentRoute",new J({path:"",routeParams:new Map,queryParams:new Map,state:{}}));g(this,"_template",new J(""));g(this,"_navigationEndEvent",new q);g(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=E.isHistoryBasedRouting?"popstate":"hashchange";return E.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,s){var o=t.pushState;t.pushState=function(...a){o.apply(t,a),s()}}(window.history,this._registerOnHashChange.bind(this))),W(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(e="/",t){let s=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");s=s||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),s===e?this._navigateTo(e,t):E.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const s={},o=e.split("/").filter(p=>p.length>0),a=E.routeList.filter(p=>{if(p.params.length===o.length&&Ae(p.url,e))return p;if(p.url===e)return p}),u=a.length>0?a[0]:null;u&&(s.path=e,s.state={...t||{}},Q(u.canActivate()).subscribe(p=>{if(!p)return;const w=E.checkParams(o,u);if(Object.keys(w).length>0||e){s.routeParams=new Map(Object.entries(w));let A=[];E.isHistoryBasedRouting?A=new URLSearchParams(window.location.search).entries():A=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],s.queryParams=new Map(A);const P=L=>{L.isRegistered=!0,this._currentRoute.next(s),this._template.next(L.template),this._navigationEndEvent.next()};u.isRegistered?P(u):u.templatePath?Q(u.templatePath()).subscribe(()=>{P(u)}):u.redirectTo&&this.navigateTo(u.redirectTo,t)}else this.navigateTo(u.redirectTo,t)}))}}K()(X);const Ne=()=>{class r{constructor(t,s){g(this,"_template","");g(this,"_subscriptions",new z)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t&&(this._template=t)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}render(){if(this._template){const t=[`${this._template}`];return t.raw=[`${this._template}`],Y(t)}else return Y``}}oe({selector:"router-outlet",deps:[X,G]})(r)};class ae{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,s=!1){if(s&&(E.isHistoryBasedRouting=!s),Array.isArray(e)){for(const o of e)E.formatRoute(o);t?E.preloadRoutes():E.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}return K({deps:[X]})(ae),h.BehaviourSubjectObs=J,h.Component=oe,h.FormBuilder=Ee,h.Injectable=K,h.Renderer=G,h.Router=ae,h.SubjectObs=q,h.Subscriptions=z,h.Validators=Te,h.fromEvent=W,h.html=Y,h.promisify=ge,h.registerRouterComponent=Ne,h.render=ne,h.signal=te,h.wrapIntoObservable=Q,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"}),h}({});
