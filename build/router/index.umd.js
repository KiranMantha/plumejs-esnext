var Rt=Object.defineProperty;var vt=(f,g,_)=>g in f?Rt(f,g,{enumerable:!0,configurable:!0,writable:!0,value:_}):f[g]=_;var w=(f,g,_)=>(vt(f,typeof g!="symbol"?g+"":g,_),_),J=(f,g,_)=>{if(!g.has(f))throw TypeError("Cannot "+_)};var S=(f,g,_)=>(J(f,g,"read from private field"),_?_.call(f):g.get(f)),I=(f,g,_)=>{if(g.has(f))throw TypeError("Cannot add the same private member more than once");g instanceof WeakSet?g.add(f):g.set(f,_)},j=(f,g,_,$)=>(J(f,g,"write to private field"),$?$.call(f,_):g.set(f,_),_);var z=(f,g,_)=>(J(f,g,"access private method"),_);(function(f,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(f=typeof globalThis<"u"?globalThis:f||self,g(f.plumejs_router={}))})(this,function(f){var L,ot;"use strict";const g=s=>!!s&&typeof s.subscribe=="function",_=s=>!!s&&typeof s.then=="function",$=s=>{const t=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return t.length===3?t[1].split(",").map(e=>e.trim()):[]},lt=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),ut=s=>({subscribe:t=>{t(s)}}),ht=s=>({subscribe:t=>{Promise.resolve(s).then(e=>{t(e)})}}),B=()=>Math.random().toString(36).substring(2);class Y{constructor(){w(this,"_callbackCollection",{})}unsubscribe(t){delete this._callbackCollection[t]}asObservable(){return{subscribe:t=>this.subscribe(t)}}subscribe(t){const e=B();return this._callbackCollection[e]=t,()=>this.unsubscribe(e)}next(t){for(const e in this._callbackCollection)this._callbackCollection[e](t)}}class G extends Y{constructor(e){super();w(this,"_initialValue");this._initialValue=e}subscribe(e){const r=super.subscribe(e);return super.next(this._initialValue),r}next(e){this._initialValue=e,super.next(e)}}class K{constructor(){w(this,"_subcribers",[])}add(t){this._subcribers.push(t)}unsubscribe(){for(const t of this._subcribers)t();this._subcribers=[]}}const X=s=>g(s)?s:_(s)?ht(Promise.resolve(s)):ut(s),q=(s,t,e,r=!1)=>(s.addEventListener(t,e,r),()=>{s.removeEventListener(t,e,r)}),dt=s=>{const t=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),e=p=>{const y=p.querySelectorAll("script");for(const A of y)A.remove()},r=(p,y)=>{if(y=y.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(p)&&(y.includes("javascript:")||y.includes("data:"))||p.startsWith("on"))return!0},l=p=>{const y=p.attributes;for(const{name:A,value:x}of y)r(A,x)&&p.removeAttribute(A)},d=p=>{const y=p.children;for(const A of y)l(A),d(A)},a=t();return e(a),d(a),a.innerHTML},ft=(s,t)=>{const e=$(t),r=()=>({get(l,d){const a=Object.prototype.toString.call(l[d]);return["[object Object]","[object Array]"].indexOf(a)>-1&&!("__metadata__"in l[d])?new Proxy(l[d],r()):l[d]},set(l,d,a){return l[d]=a,s(),!0}});return class extends t{constructor(...l){return super(...l),l.forEach((d,a)=>{e[a]&&e[a]!=="undefined"&&(this[e[a]]=d)}),new Proxy(this,r())}}},Z=Object.create(null);let F=null;function pt(s,t){const e=F;let r;F=B(),Z[F]=s;try{t()}finally{r=F,F=e}return r}function gt(s,t){const e=pt(s,t);return function(){delete Z[e]}}const V=new(ot=class{constructor(){I(this,L,void 0);j(this,L,new WeakMap)}register(s,t){if(!S(this,L).get(s))S(this,L).set(s,t);else throw console.error(s),"service already exists"}getService(s){const t=S(this,L).get(s);if(t)return t;throw console.error(s),"service is not a registered service."}clear(){j(this,L,new WeakMap)}},L=new WeakMap,ot),tt=(s,t,e)=>{if(t.length>0){const r=[];for(const a of t)a.prototype.__metadata__.name!=="RENDERER"?r.push(V.getService(a)):r.push(e);const l=$(s),d=new s(...r);return t.forEach((a,p)=>{d[l[p]]=r[p]}),d}else return new s},D=new class{constructor(){w(this,"globalStyles");w(this,"globalStyleTag");w(this,"style_registry");w(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let t=[];const e=new CSSStyleSheet;if(e.insertRule(":host { display: block; }"),t=[this.globalStyles,e],s){const r=new CSSStyleSheet;r.replace(s),t.push(r)}return t}},{html:Ct,render:bt}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,t=/<[a-z][^>]+$/i,e="attr",r=/^attr([^ ]+)/,l="insertNode",d=/^insertNode([^ ]+)/;let a=[],p=[];const y=n=>{const i={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let o=JSON.stringify(n);const c=u=>i[u]||u;return o=(u=>u.replace(/[&<>\(\)]/g,c))(o),JSON.parse(o)},A=(n,i)=>{const o=n.options,c=Array.isArray(i)?i:[i];let m,u,h=o.length;for(;h--;){u=o[h];const T=u.getAttribute("value")??(u.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(u.selected=c.indexOf(T)>-1)&&(m=!0)}m||(n.selectedIndex=-1)},x=n=>{const i=document.createElement("template");return i.innerHTML=n,i.content},O=(n,i,o)=>{const c=()=>{setTimeout(()=>{if(n.isConnected){const m=new CustomEvent("bindprops",{detail:{props:i},bubbles:!1});n.dispatchEvent(m)}})};n[o]=JSON.stringify(i),p.push(c)},b=(n,i,o)=>{switch(!0){case/attrs/.test(i):{const c=o.attrs;for(const m in c)b(n,m,c[m]);break}case/^on+/.test(i):{const c=i.slice(2).toLowerCase();n.removeEventListener(c,o),n.addEventListener(c,o);break}case/ref/.test(i):{const c=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:n,fn:o});a.push(c);break}case/^data-+/.test(i):case/^aria-+/.test(i):{i==="data-input"?O(n,o,Symbol("input")):n.setAttribute(i,y(o));break}case/class/.test(i):{o?n.classList.add(...o.split(" ")):n.setAttribute("class","");break}case/value/.test(i):{n.nodeName.toLowerCase()==="select"?A(n,o):n.value=y(o);break}case/disabled/.test(i):case/checked/.test(i):{o?n.setAttribute(i,o):n.removeAttribute(i);break}default:n.setAttribute(i,y(o))}},R=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_ELEMENT,null);let c=o.nextNode();for(;c;){if(c.hasAttributes()){const m=Array.from(c.attributes).filter(u=>r.test(u.nodeName));for(const{nodeName:u,nodeValue:h}of m){const T=r.exec(u)[1];b(c,h,i[T]),c.removeAttribute(u)}}c=o.nextNode()}},E=(n,i)=>{const o=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT,null);let c=o.nextNode(),m;for(;c;){if(m=d.exec(c.data)){const u=Array.isArray(i[m[1]])?i[m[1]]:[i[m[1]]];c.replaceWith(...u),o.currentNode=n}c=o.nextNode()}},P=(n,i)=>{if(!n||!i||n.nodeType!==1||i.nodeType!==1)return;const o=n.attributes,c=i.attributes,m=i.getAttribute("data-preserve-attributes"),u=m&&m==="true";for(const{name:h,value:T}of o)(!c[h]||c[h]!==T)&&i.setAttribute(h,T);if(!u)for(const{name:h}of c)o[h]||i.removeAttribute(h);if(["input","textarea"].includes(i.tagName.toLowerCase())&&(i.value=n.value),i.tagName.indexOf("-")>-1&&n.tagName.indexOf("-")>-1){const h=Object.getOwnPropertySymbols(n).find(M=>M.description==="input"),T=Object.getOwnPropertySymbols(i).find(M=>M.description==="input"),v=h?n[h]:"",N=T?i[T]:"";v&&N&&v!==N&&O(i,JSON.parse(v),T)}},k=n=>n.nodeType===3?"text":n.nodeType===8?"comment":n.tagName.toLowerCase(),H=n=>n.childNodes&&n.childNodes.length>0?null:n.textContent,U=(n,i,o)=>{const c=i?Array.from(i.childNodes):[],m=n?Array.from(n.childNodes):[];let u=c.length-m.length;if(u>0)for(;u>0;u--)c[c.length-u].parentNode.removeChild(c[c.length-u]);m.forEach(function(h,T){const v=c[T];if(P(h,v),o&&v&&v.nodeType===1&&v.tagName.indexOf("-")>-1)return;if(!v){i&&i.appendChild(h);return}if(k(h)!==k(v)){v.replaceWith(h);return}const N=H(h);if(N&&N!==H(v)){v.textContent=N;return}if(v.childNodes.length>0&&h.childNodes.length<1){v.innerHTML="";return}if(v.childNodes.length<1&&h.childNodes.length>0){const M=document.createDocumentFragment();U(h,M,!1),v.appendChild(M);return}if(h.childNodes.length>0){U(h,v,!0);return}})};return{html:(n,...i)=>{let o="";const{length:c}=n;for(let u=1;u<c;u++){const h=i[u-1];let T=!1;if(o+=n[u-1],s.test(o)&&t.test(o)&&(o=o.replace(s,(v,N,M)=>`${e}${u-1}=${M||'"'}${N}${M?"":'"'}`),T=!0),!T)switch(!0){case Array.isArray(h):case h instanceof DocumentFragment:{o+=`<!--${l}${u-1}-->`;break}case(typeof h=="object"&&h!==null):{"attrs"in h&&(o+=`${e}${u-1}="attrs"`);break}default:o+=h||""}}o+=n[c-1];const m=x(o.trim());return R(m,i),E(m,i),m},render:(n,i)=>{n&&!n.children.length?(n.innerHTML="",n.appendChild(i)):U(i,n,!1),a.forEach(o=>{o()}),a=[],p.forEach(o=>{o()}),p=[]}}})();class et{constructor(t,e){w(this,"_shadowRoot");w(this,"_hostElement");w(this,"update");w(this,"emitEvent");this._hostElement=t,this._shadowRoot=e}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const mt={selector:"",root:!1,styles:"",deps:[],standalone:!1,shadowDomEncapsulation:!0},st=(s,t)=>{const e=document.createElement("style");return e.innerHTML=s,t&&t.appendChild(e),e},yt=async(s,t)=>{var e,r,l,d,a,at,y,ct,x;if(s={...mt,...s},_(s.styles)){const O=await s.styles;s.styles=O.default.toString()}if(s.styles=s.styles.toString(),s.root&&!D.isRootNodeSet)D.isRootNodeSet=!0,s.styles&&(D.globalStyles.replace(s.styles),D.globalStyleTag=st(s.styles,document.head));else if(s.root&&D.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(x=class extends HTMLElement{constructor(){super();I(this,a);I(this,y);I(this,e,void 0);I(this,r,void 0);I(this,l,void 0);I(this,d,new K);w(this,"renderCount",0);if(s.shadowDomEncapsulation&&lt)j(this,r,this.attachShadow({mode:"open"})),S(this,r).adoptedStyleSheets=D.getComputedCss(s.styles,s.standalone);else{j(this,r,this);const b=B();this.setAttribute("data-did",b);const R=s.styles.replaceAll(":host",`${s.selector}[data-did='${b}']`);!s.root&&R&&j(this,l,st(R,document.head))}this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),z(this,a,at).call(this)}static get observedAttributes(){return t.observedAttributes||[]}update(){const b=S(this,e).render();typeof b=="string"?S(this,r).innerHTML=dt(b):bt(S(this,r),b)}setProps(b){var R,E;for(const[P,k]of Object.entries(b))t.observedProperties.find(H=>H===P)&&(S(this,e)[P]=k);(E=(R=S(this,e)).onPropertiesChanged)==null||E.call(R)}getInstance(){return S(this,e)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var b,R,E,P;S(this,d).add(q(this,"bindprops",k=>{const H=k.detail.props;H&&this.setProps(H)})),S(this,d).add(q(this,"refresh_component",()=>{this.update()})),(R=(b=S(this,e)).beforeMount)==null||R.call(b),this.update(),(P=(E=S(this,e)).mount)==null||P.call(E)}attributeChangedCallback(b,R,E){var P,k;(k=(P=S(this,e)).onAttributesChanged)==null||k.call(P,b,R,E)}disconnectedCallback(){var b,R,E;this.renderCount=0,(R=(b=S(this,e)).unmount)==null||R.call(b),(E=S(this,l))==null||E.remove(),S(this,d).unsubscribe()}},e=new WeakMap,r=new WeakMap,l=new WeakMap,d=new WeakMap,a=new WeakSet,at=function(){const b=new et(this,S(this,r));b.update=()=>{this.update()},b.emitEvent=(R,E)=>{z(this,y,ct).call(this,R,E)},S(this,d).add(gt(this.setRenderIntoQueue,()=>{j(this,e,tt(ft(this.setRenderIntoQueue,t),s.deps,b))}))},y=new WeakSet,ct=function(b,R){const E=new CustomEvent(b,{detail:R});this.dispatchEvent(E)},x))},_t={deps:[]},wt=s=>t=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||yt(s,t)},rt=(s={})=>t=>{if(s={..._t,...s},t.prototype.__metadata__={name:"SERVICE"},s.deps.some(r=>r.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const e=tt(t,s.deps);V.register(t,e)},W=class{static checkParams(t,e){let r=0;const l={},d=e.paramCount;for(let a=0;a<t.length;a++){const p=e.params[a];p.indexOf(":")>=0&&(l[p.split(":")[1]]=t[a].split("?")[0],r+=1)}return r===d?l:{}}static getParamCount(t){let e=0;return t.forEach(r=>{r.indexOf(":")>=0&&(e+=1)}),e}static formatRoute(t){const e={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:t.preload,canActivate:()=>!0};if(e.params=t.path.split("/").filter(r=>r.length>0),e.url=t.path,e.template="",e.redirectTo=t.redirectTo,t.template){if(!t.templatePath)throw Error("templatePath is required in route if template is mentioned.");e.template=t.template,e.templatePath=t.templatePath}t.canActivate&&(e.canActivate=t.canActivate),e.paramCount=W.getParamCount(e.params),W.routeList.push(e)}static preloadRoutes(){for(const t of W.routeList)t.templatePath&&t.templatePath()}static preloadSelectedRoutes(){const t=W.routeList.filter(e=>e.preload===!0);for(const e of t)e.templatePath&&e.templatePath()}};let C=W;w(C,"routeList",[]),w(C,"isHistoryBasedRouting",!0);function nt(s,t){return s?new RegExp(s.replace(/:[^\s/]+/g,"(.+)")).test(t):!1}class Q{constructor(){w(this,"_currentRoute",new G({path:"",routeParams:new Map,queryParams:new Map,state:{}}));w(this,"_template",new G(""));w(this,"_navigationEndEvent",new Y);w(this,"_routeStateMap",new Map)}listenRouteChanges(){const t=C.isHistoryBasedRouting?"popstate":"hashchange";return C.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(e,r){var l=e.pushState;e.pushState=function(...d){l.apply(e,d),r()}}(window.history,this._registerOnHashChange.bind(this))),q(window,t,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(t="/",e){let r=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");r=r||"/",this._routeStateMap.clear(),this._routeStateMap.set(t,e),r===t?this._navigateTo(t,e):C.isHistoryBasedRouting?window.history.pushState(e,"",t):window.location.hash="#"+t}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const t=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),e=this._routeStateMap.get(t);this._navigateTo(t,e)}_navigateTo(t,e){const r={},l=t.split("/").filter(p=>p.length>0),d=C.routeList.filter(p=>{if(p.params.length===l.length&&nt(p.url,t))return p;if(p.url===t)return p}),a=d.length>0?d[0]:null;a&&(r.path=t,r.state={...e||{}},X(a.canActivate()).subscribe(p=>{if(!p)return;const y=C.checkParams(l,a);if(Object.keys(y).length>0||t){r.routeParams=new Map(Object.entries(y));let A=[];C.isHistoryBasedRouting?A=new URLSearchParams(window.location.search).entries():A=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],r.queryParams=new Map(A);const x=O=>{O.isRegistered=!0,this._currentRoute.next(r),this._template.next(O.template),this._navigationEndEvent.next()};a.isRegistered?x(a):a.templatePath?X(a.templatePath()).subscribe(()=>{x(a)}):a.redirectTo&&this.navigateTo(a.redirectTo,e)}else this.navigateTo(a.redirectTo,e)}))}}rt()(Q);const St=()=>{class s{constructor(e,r){w(this,"_template","");w(this,"_subscriptions",new K)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(e=>{this._template!==e&&(this._template=e)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const e=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(e||"/")}unmount(){this._subscriptions.unsubscribe()}render(){return this._template}}wt({selector:"router-outlet",deps:[Q,et]})(s)};class it{constructor(t){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(t,e){this.internalRouter.navigateTo(t,e)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(t,e=!1,r=!1){if(r&&(C.isHistoryBasedRouting=!r),Array.isArray(t)){for(const l of t)C.formatRoute(l);e?C.preloadRoutes():C.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}rt({deps:[Q]})(it),f.Router=it,f.matchPath=nt,f.registerRouterComponent=St,Object.defineProperty(f,Symbol.toStringTag,{value:"Module"})});
