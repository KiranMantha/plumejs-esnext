var Re=Object.defineProperty;var Ee=(u,p,R)=>p in u?Re(u,p,{enumerable:!0,configurable:!0,writable:!0,value:R}):u[p]=R;var y=(u,p,R)=>(Ee(u,typeof p!="symbol"?p+"":p,R),R),G=(u,p,R)=>{if(!p.has(u))throw TypeError("Cannot "+R)};var S=(u,p,R)=>(G(u,p,"read from private field"),R?R.call(u):p.get(u)),M=(u,p,R)=>{if(p.has(u))throw TypeError("Cannot add the same private member more than once");p instanceof WeakSet?p.add(u):p.set(u,R)},H=(u,p,R,V)=>(G(u,p,"write to private field"),V?V.call(u,R):p.set(u,R),R);var K=(u,p,R)=>(G(u,p,"access private method"),R);(function(u,p){typeof exports=="object"&&typeof module<"u"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(u=typeof globalThis<"u"?globalThis:u||self,p(u.PlumeJS={}))})(this,function(u){var k,ne;"use strict";const p=new(ne=class{constructor(){M(this,k,void 0);H(this,k,new WeakMap)}register(s,e){if(!S(this,k).get(s))S(this,k).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=S(this,k).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){H(this,k,new WeakMap)}},k=new WeakMap,ne),R=s=>!!s&&typeof s.subscribe=="function",V=s=>!!s&&typeof s.then=="function",Q=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},ae=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),ce=s=>({subscribe:e=>{e(s)}}),le=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}});class W{constructor(){y(this,"_callbacks",[])}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this._callbacks.push(e),this.unsubscribe}unsubscribe(){this._callbacks=[]}next(e){for(const t of this._callbacks)t(e)}}class X extends W{constructor(t){super();y(this,"_initialValue");this._initialValue=t}subscribe(t){const r=super.subscribe(t);return this.next(this._initialValue),r}}class B{constructor(){y(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const $=s=>R(s)?s:V(s)?le(Promise.resolve(s)):ce(s),D=(s,e,t,r=!1)=>(s.addEventListener(e,t,r),()=>{s.removeEventListener(e,t,r)}),ue=s=>{const e=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),t=m=>{const b=m.querySelectorAll("script");for(const A of b)A.remove()},r=(m,b)=>{if(b=b.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(m)&&(b.includes("javascript:")||b.includes("data:"))||m.startsWith("on"))return!0},h=m=>{const b=m.attributes;for(const{name:A,value:O}of b)r(A,O)&&m.removeAttribute(A)},n=m=>{const b=m.children;for(const A of b)h(A),n(A)},a=e();return t(a),n(a),a.innerHTML},he=function(s){s.renderCount===1&&queueMicrotask(()=>{s.update(),s.renderCount=0})},de=(s,e)=>{const t=Q(e),r=()=>({get(h,n){const a=Object.prototype.toString.call(h[n]);return["[object Object]","[object Array]"].indexOf(a)>-1&&!("__metadata__"in h[n])?new Proxy(h[n],r()):h[n]},set(h,n,a){return h[n]=a,++s.renderCount,he(s),!0}});return class extends e{constructor(...h){return super(...h),h.forEach((n,a)=>{t[a]&&t[a]!=="undefined"&&(this[t[a]]=n)}),new Proxy(this,r())}}},fe=()=>{let s;return[new Promise(t=>{s=t}),s]},Z=(s,e,t)=>{if(e.length>0){const r=[];for(const a of e)a.prototype.__metadata__.name!=="RENDERER"?r.push(p.getService(a)):r.push(t);const h=Q(s),n=new s(...r);return e.forEach((a,m)=>{n[h[m]]=r[m]}),n}else return new s},j=new class{constructor(){y(this,"globalStyles");y(this,"globalStyleTag");y(this,"style_registry");y(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const r=new CSSStyleSheet;r.replace(s),e.push(r)}return e}},{html:q,render:ee}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",r=/^attr([^ ]+)/,h="insertNode",n=/^insertNode([^ ]+)/;let a=[],m=[];const b=c=>{const o={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let d=JSON.stringify(c);const l=f=>o[f]||f;return d=(f=>f.replace(/[&<>\(\)]/g,l))(d),JSON.parse(d)},A=(c,o)=>{const d=c.options,l=Array.isArray(o)?o:[o];let v,f,i=d.length;for(;i--;){f=d[i];const g=f.getAttribute("value")??(f.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(f.selected=l.indexOf(g)>-1)&&(v=!0)}v||(c.selectedIndex=-1)},O=c=>{const o=document.createElement("template");return o.innerHTML=c,o.content},Y=(c,o,d)=>{const l=()=>{if(c.isConnected){const v=new CustomEvent("bindprops",{detail:{props:o},bubbles:!1});c.dispatchEvent(v)}};c[d]=JSON.stringify(o),m.push(l)},w=(c,o)=>{const d=document.createTreeWalker(c,NodeFilter.SHOW_ELEMENT,null);let l=d.nextNode();for(;l;){if(l.hasAttributes()){const v=Array.from(l.attributes).filter(f=>r.test(f.nodeName));for(const{nodeName:f,nodeValue:i}of v){const g=r.exec(f)[1];switch(!0){case/^on+/.test(i):{const _=i.slice(2).toLowerCase();l.removeEventListener(_,o[g]),l.addEventListener(_,o[g]);break}case/ref/.test(i):{const _=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:l,fn:o[g]});a.push(_);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?Y(l,o[g],Symbol("input")):l.setAttribute(i,b(o[g]));break}case/class/.test(i):{o[g]?l.classList.add(...o[g].split(" ")):l.setAttribute("class","");break}case/value/.test(i):{l.nodeName.toLowerCase()==="select"?A(l,o[g]):l.value=b(o[g]);break}case/disabled/.test(i):case/checked/.test(i):{o[g]?l.setAttribute(i,o[g]):l.removeAttribute(i);break}default:l.setAttribute(i,b(o[g]))}l.removeAttribute(f)}}l=d.nextNode()}},C=(c,o)=>{const d=document.createTreeWalker(c,NodeFilter.SHOW_COMMENT,null);let l=d.nextNode(),v;for(;l;){if(v=n.exec(l.data)){const f=Array.isArray(o[v[1]])?o[v[1]]:[o[v[1]]];l.replaceWith(...f),d.currentNode=c}l=d.nextNode()}},T=(c,o)=>{if(!c||!o||c.nodeType!==1||o.nodeType!==1)return;const d=c.attributes,l=o.attributes,v=o.getAttribute("data-preserve-attributes"),f=v&&v==="true";for(const{name:i,value:g}of d)(!l[i]||l[i]!==g)&&o.setAttribute(i,g);if(!f)for(const{name:i}of l)d[i]||o.removeAttribute(i);if(o.tagName.indexOf("-")>-1&&c.tagName.indexOf("-")>-1){const i=Object.getOwnPropertySymbols(c),g=Object.getOwnPropertySymbols(o),_=i.length?c[i[0]]:"",L=g.length?o[g[0]]:"";_&&L&&_!==L&&Y(o,JSON.parse(_),g[0])}},N=c=>c.nodeType===3?"text":c.nodeType===8?"comment":c.tagName.toLowerCase(),P=c=>c.childNodes&&c.childNodes.length>0?null:c.textContent,x=(c,o,d)=>{const l=o?Array.from(o.childNodes):[],v=c?Array.from(c.childNodes):[];let f=l.length-v.length;if(f>0)for(;f>0;f--)l[l.length-f].parentNode.removeChild(l[l.length-f]);v.forEach(function(i,g){const _=l[g];if(T(i,_),d&&_&&_.nodeType===1&&_.tagName.indexOf("-")>-1)return;if(!_){o&&o.appendChild(i);return}if(N(i)!==N(_)){_.replaceWith(i);return}const L=P(i);if(L&&L!==P(_)){_.textContent=L;return}if(_.childNodes.length>0&&i.childNodes.length<1){_.innerHTML="";return}if(_.childNodes.length<1&&i.childNodes.length>0){const I=document.createDocumentFragment();x(i,I,!1),_.appendChild(I);return}if(i.childNodes.length>0){x(i,_,!0);return}})};return{html:(c,...o)=>{let d="";const{length:l}=c;for(let f=1;f<l;f++){const i=o[f-1];let g=!1;if(d+=c[f-1],s.test(d)&&e.test(d)&&(d=d.replace(s,(_,L,I)=>`${t}${f-1}=${I||'"'}${L}${I?"":'"'}`),g=!0),!g)switch(!0){case Array.isArray(i):case i instanceof DocumentFragment:{d+=`<!--${h}${f-1}-->`;break}case(typeof i=="object"&&i!==null):{"html"in i&&(d+=i.html);break}default:d+=i}}d+=c[l-1];const v=O(d.trim());return w(v,o),C(v,o),v},render:(c,o)=>{c&&!c.children.length?(c.innerHTML="",c.appendChild(o)):x(o,c,!1),a.forEach(d=>{d()}),a=[],m.forEach(d=>{d()}),m=[]}}})();class J{constructor(e,t){y(this,"_shadowRoot");y(this,"_hostElement");y(this,"update");y(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const pe={selector:"",root:!1,styles:"",deps:[],standalone:!1,encapsulation:"shadowDom"},te=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},me=(s,e)=>{var t,r,h,n,a,oe,b,ie,O;if(s={...pe,...s},s.styles=s.styles.toString(),s.root&&!j.isRootNodeSet)j.isRootNodeSet=!0,s.styles&&(j.globalStyles.replace(s.styles),j.globalStyleTag=te(s.styles,document.head));else if(s.root&&j.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(O=class extends HTMLElement{constructor(){super();M(this,a);M(this,b);M(this,t,void 0);M(this,r,void 0);M(this,h,void 0);y(this,"renderCount",0);M(this,n,new B);if(ae)H(this,r,this.attachShadow({mode:"open"})),S(this,r).adoptedStyleSheets=j.getComputedCss(s.styles,s.standalone);else{H(this,r,this);const w=s.styles.replaceAll(":host",s.selector);H(this,h,te(w,document.head))}K(this,a,oe).call(this),this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const w=S(this,t).render();typeof w=="string"?S(this,r).innerHTML=ue(w):ee(S(this,r),w)}setProps(w){var C,T;for(const[N,P]of Object.entries(w))e.observedProperties.find(x=>x===N)&&(S(this,t)[N]=P);(T=(C=S(this,t)).onPropertiesChanged)==null||T.call(C)}getInstance(){return S(this,t)}connectedCallback(){var w,C,T,N;S(this,n).add(D(this,"bindprops",P=>{const x=P.detail.props;x&&this.setProps(x)})),S(this,n).add(D(this,"refresh_component",()=>{var P,x;(x=(P=S(this,t)).mount)==null||x.call(P)})),(C=(w=S(this,t)).beforeMount)==null||C.call(w),this.update(),(N=(T=S(this,t)).mount)==null||N.call(T)}attributeChangedCallback(w,C,T){var N,P;(P=(N=S(this,t)).onAttributesChanged)==null||P.call(N,w,C,T)}disconnectedCallback(){var w,C,T;this.renderCount=1,(C=(w=S(this,t)).unmount)==null||C.call(w),(T=S(this,h))==null||T.remove(),S(this,n).unsubscribe()}},t=new WeakMap,r=new WeakMap,h=new WeakMap,n=new WeakMap,a=new WeakSet,oe=function(){const w=new J(this,S(this,r));w.update=()=>{this.update()},w.emitEvent=(C,T)=>{K(this,b,ie).call(this,C,T)},H(this,t,Z(de(this,e),s.deps,w))},b=new WeakSet,ie=function(w,C){const T=new CustomEvent(w,{detail:C});this.dispatchEvent(T)},O))},be={deps:[]},se=s=>e=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||me(s,e)},U=(s={})=>e=>{if(s={...be,...s},e.prototype.__metadata__={name:"SERVICE"},s.deps.some(r=>r.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=Z(e,s.deps);p.register(e,t)},ge=s=>{let e;switch(s.nodeName&&s.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(s.type)?e=s.checked?s.value!==null&&s.value!=="on"?s.value:!0:!1:e=s.value;break}case"select":{const t=s.type==="select-one",h=[...Array.from(s.options)].filter(n=>n.selected).map(n=>n.value??(n.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" "));e=t?h[0]:h;break}default:{e=s.value;break}}return e};class _e{constructor(e,t){y(this,"_initialValues");y(this,"_controls");y(this,"_errors",new Map);this._initialValues=e,this._controls=t}get errors(){return this._errors}get valid(){return this._checkValidity(),!this._errors.size}get value(){const e={};for(const[t,r]of Object.entries(this._controls))e[t]=r.value;return e}get(e){return this._controls[e]}reset(e={}){for(const t in this._controls)this._controls[t].value=e[t]||this._initialValues[t];return this._errors.clear(),this}_checkValidity(){this._errors.clear();for(const e in this._controls){const t=this._controls[e].value,r=this._controls[e].validators;this._controls[e].errors=null;for(const h of r){const n=h(t);n!==null&&(this._errors.has(e)?(this._errors.set(e,{...this._errors.get(e),...n}),this._controls[e].errors={...this._controls[e].errors,...n}):(this._errors.set(e,n),this._controls[e].errors=n))}}}}const ye=s=>{const e={},t={};for(const[a,m]of Object.entries(s)){const b=Array.isArray(m)?m:[m];e[a]={value:b.shift(),validators:b},t[a]=e[a].value}const r=new _e(t,e);return[r,a=>m=>{const b=ge(m.target);r.get(a).value=b},()=>r.reset()]};class we{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}const F=class{static checkParams(e,t){let r=0;const h={},n=t.paramCount;for(let a=0;a<e.length;a++){const m=t.params[a];m.indexOf(":")>=0&&(h[m.split(":")[1]]=e[a].split("?")[0],r+=1)}return r===n?h:{}}static getParamCount(e){let t=0;return e.forEach(r=>{r.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(r=>r.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=F.getParamCount(t.params),F.routeList.push(t)}static preloadRoutes(){for(const e of F.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=F.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let E=F;y(E,"routeList",[]),y(E,"isHistoryBasedRouting",!0);function ve(s,e){return s?new RegExp(s.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class z{constructor(){y(this,"_currentRoute",{path:"",routeParams:new Map,queryParams:new Map,state:{}});y(this,"_template",new X(""));y(this,"_navigationEndEvent",new W);y(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=E.isHistoryBasedRouting?"popstate":"hashchange";return E.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,r){var h=t.pushState;t.pushState=function(...n){h.apply(t,n),r()}}(window.history,this._registerOnHashChange.bind(this))),D(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute}navigateTo(e="/",t){let r=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");r=r||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),r===e?this._navigateTo(e,t):E.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const r=e.split("/").filter(a=>a.length>0),h=E.routeList.filter(a=>{if(a.params.length===r.length&&ve(a.url,e))return a;if(a.url===e)return a}),n=h.length>0?h[0]:null;n&&(this._currentRoute.path=e,this._currentRoute.state={...t||{}},$(n.canActivate()).subscribe(a=>{if(!a)return;const m=E.checkParams(r,n);if(Object.keys(m).length>0||e){this._currentRoute.routeParams=new Map(Object.entries(m));let b=[];E.isHistoryBasedRouting?b=new URLSearchParams(window.location.search).entries():b=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],this._currentRoute.queryParams=new Map(b);const A=O=>{O.isRegistered=!0,this._template.next(O.template),this._navigationEndEvent.next()};n.isRegistered?A(n):n.templatePath?$(n.templatePath()).subscribe(()=>{A(n)}):n.redirectTo&&this.navigateTo(n.redirectTo,t)}else this.navigateTo(n.redirectTo,t)}))}}U()(z);const Se=()=>{class s{constructor(t,r){y(this,"_template","");y(this,"_subscriptions",new B)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t?this._template=t:this.refreshRouterOutletComponent()})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=E.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}refreshRouterOutletComponent(){if(this.renderer.shadowRoot.children.length){const t=new CustomEvent("refresh_component",{detail:{},bubbles:!1,cancelable:!1,composed:!1});this.renderer.shadowRoot.children[0].dispatchEvent(t)}}render(){if(this._template){const t=[`${this._template}`];return t.raw=[`${this._template}`],q(t)}else return q``}}se({selector:"router-outlet",deps:[z,J]})(s)};class re{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,r=!1){if(r&&(E.isHistoryBasedRouting=!r),Array.isArray(e)){for(const h of e)E.formatRoute(h);t?E.preloadRoutes():E.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}U({deps:[z]})(re),u.BehaviourSubjectObs=X,u.Component=se,u.Injectable=U,u.Renderer=J,u.Router=re,u.SubjectObs=W,u.Subscriptions=B,u.Validators=we,u.fromEvent=D,u.html=q,u.promisify=fe,u.registerRouterComponent=Se,u.render=ee,u.useFormFields=ye,u.wrapIntoObservable=$,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});
