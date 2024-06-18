var Ee=Object.defineProperty;var Te=(p,g,y)=>g in p?Ee(p,g,{enumerable:!0,configurable:!0,writable:!0,value:y}):p[g]=y;var w=(p,g,y)=>(Te(p,typeof g!="symbol"?g+"":g,y),y),K=(p,g,y)=>{if(!g.has(p))throw TypeError("Cannot "+y)};var m=(p,g,y)=>(K(p,g,"read from private field"),y?y.call(p):g.get(p)),M=(p,g,y)=>{if(g.has(p))throw TypeError("Cannot add the same private member more than once");g instanceof WeakSet?g.add(p):g.set(p,y)},N=(p,g,y,D)=>(K(p,g,"write to private field"),D?D.call(p,y):g.set(p,y),y);var Y=(p,g,y)=>(K(p,g,"access private method"),y);(function(p,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(p=typeof globalThis<"u"?globalThis:p||self,g(p.plumejs_router={}))})(this,function(p){var L,ce;"use strict";const g=s=>!!s&&typeof s.subscribe=="function",y=s=>!!s&&typeof s.then=="function",D=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},de=(()=>{try{return new CSSStyleSheet,!0}catch{return!1}})(),fe=s=>({subscribe:e=>{e(s)}}),pe=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}}),q=()=>Math.random().toString(36).substring(2);class G{constructor(){w(this,"_callbackCollection",{})}unsubscribe(e){delete this._callbackCollection[e]}asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){const t=q();return this._callbackCollection[t]=e,()=>this.unsubscribe(t)}next(e){for(const t in this._callbackCollection)this._callbackCollection[t](e)}}class X extends G{constructor(t){super();w(this,"_initialValue");this._initialValue=t}subscribe(t){const i=super.subscribe(t);return super.next(this._initialValue),i}next(t){this._initialValue=t,super.next(t)}}class Z{constructor(){w(this,"_subcribers",[])}add(e){this._subcribers.push(e)}unsubscribe(){for(const e of this._subcribers)e();this._subcribers=[]}}const V=s=>g(s)?s:y(s)?pe(Promise.resolve(s)):fe(s),Q=(s,e,t,i=!1)=>(s.addEventListener(e,t,i),()=>{s.removeEventListener(e,t,i)}),ge=s=>{const e=()=>new DOMParser().parseFromString(s,"text/html").body||document.createElement("body"),t=l=>{const R=l.querySelectorAll("script");for(const v of R)v.remove()},i=(l,R)=>{if(R=R.replace(/\s+/g,"").toLowerCase(),["src","href","xlink:href"].includes(l)&&(R.includes("javascript:")||R.includes("data:"))||l.startsWith("on"))return!0},h=l=>{const R=l.attributes;for(const{name:v,value:j}of R)i(v,j)&&l.removeAttribute(v)},f=l=>{const R=l.children;for(const v of R)h(v),f(v)},a=e();return t(a),f(a),a.innerHTML},be=(s,e)=>{const t=D(e),i=()=>({get(h,f){const a=Object.prototype.toString.call(h[f]);return["[object Object]","[object Array]"].indexOf(a)>-1&&!("__metadata__"in h[f])?new Proxy(h[f],i()):h[f]},set(h,f,a){return h[f]=a,s(),!0}});return class extends e{constructor(...h){return super(...h),h.forEach((f,a)=>{t[a]&&t[a]!=="undefined"&&(this[t[a]]=f)}),new Proxy(this,i())}}},ee=Object.create(null);let F=null;function me(s,e){const t=F;let i;F=q(),ee[F]=s;try{e()}finally{i=F,F=t}return i}function ye(s,e){const t=me(s,e);return function(){delete ee[t]}}const te=new(ce=class{constructor(){M(this,L,void 0);N(this,L,new WeakMap)}register(s,e){if(!m(this,L).get(s))m(this,L).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=m(this,L).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){N(this,L,new WeakMap)}},L=new WeakMap,ce),se=(s,e,t)=>{if(e.length>0){const i=[];for(const a of e)a.prototype.__metadata__.name!=="RENDERER"?i.push(te.getService(a)):i.push(t);const h=D(s),f=new s(...i);return e.forEach((a,l)=>{f[h[l]]=i[l]}),f}else return new s},H=new class{constructor(){w(this,"globalStyles");w(this,"globalStyleTag");w(this,"style_registry");w(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const i=new CSSStyleSheet;i.replace(s),e.push(i)}return e}},{html:Ae,render:_e}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",i=/^attr([^ ]+)/,h="insertNode",f=/^insertNode([^ ]+)/;let a=[],l=[];const R=r=>{const n={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let o=JSON.stringify(r);const c=d=>n[d]||d;return o=(d=>d.replace(/[&<>\(\)]/g,c))(o),JSON.parse(o)},v=(r,n)=>{const o=r.options,c=Array.isArray(n)?n:[n];let b,d,u=o.length;for(;u--;){d=o[u];const A=d.getAttribute("value")??(d.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(d.selected=c.indexOf(A)>-1)&&(b=!0)}b||(r.selectedIndex=-1)},j=r=>{const n=document.createElement("template");return n.innerHTML=r,n.content},O=(r,n,o)=>{const c=()=>{setTimeout(()=>{if(r.isConnected){const b=new CustomEvent("bindprops",{detail:{props:n},bubbles:!1});r.dispatchEvent(b)}})};r[o]=JSON.stringify(n),l.push(c)},W=(r,n,o)=>{switch(!0){case/attrs/.test(n):{const c=o.attrs;for(const b in c)W(r,b,c[b]);break}case/^on+/.test(n):{const c=n.slice(2).toLowerCase();r.removeEventListener(c,o),r.addEventListener(c,o);break}case/ref/.test(n):{const c=function(){this.node.isConnected&&this.fn(this.node)}.bind({node:r,fn:o});a.push(c);break}case/key/.test(n):{r[Symbol("key")]=o;break}case/^data-+/.test(n):case/^aria-+/.test(n):{n==="data-input"?O(r,o,Symbol("input")):r.setAttribute(n,R(o));break}case/class/.test(n):{o?r.classList.add(...o.split(" ")):r.setAttribute("class","");break}case/value/.test(n):{r.nodeName.toLowerCase()==="select"?v(r,o):r.value=R(o);break}case/disabled/.test(n):case/checked/.test(n):{o?r.setAttribute(n,o):r.removeAttribute(n);break}default:r.setAttribute(n,R(o))}},_=(r,n)=>{const o=document.createTreeWalker(r,NodeFilter.SHOW_ELEMENT,null);let c=o.nextNode();for(;c;){if(c.hasAttributes()){const b=Array.from(c.attributes).filter(d=>i.test(d.nodeName));for(const{nodeName:d,nodeValue:u}of b){const A=i.exec(d)[1];W(c,u,n[A]),c.removeAttribute(d)}}c=o.nextNode()}},E=(r,n)=>{const o=document.createTreeWalker(r,NodeFilter.SHOW_COMMENT,null);let c=o.nextNode(),b;for(;c;){if(b=f.exec(c.data)){const d=Array.isArray(n[b[1]])?n[b[1]]:[n[b[1]]];c.replaceWith(...d),o.currentNode=r}c=o.nextNode()}},S=(r,n)=>{if(!r)return[null,""];const o=Object.getOwnPropertySymbols(r).find(b=>b.description===n),c=o?r[o]:"";return[o,c]},x=(r,n)=>{if(!r||!n||r.nodeType!==1||n.nodeType!==1)return;const o=r.attributes,c=n.attributes,b=n.getAttribute("data-preserve-attributes"),d=b&&b==="true";for(const{name:u,value:A}of o)(!c[u]||c[u]!==A)&&n.setAttribute(u,A);if(!d)for(const{name:u}of c)o[u]||n.removeAttribute(u);if(["input","textarea"].includes(n.tagName.toLowerCase())&&(n.value=r.value),n.tagName.indexOf("-")>-1&&r.tagName.indexOf("-")>-1){const u=S(r,"input")[1],A=S(n,"input");u&&A[1]&&u!==A[1]&&O(n,JSON.parse(u),A[0])}},P=r=>r.nodeType===3?"text":r.nodeType===8?"comment":r.tagName.toLowerCase(),k=r=>r.childNodes&&r.childNodes.length>0?null:r.textContent,J=(r,n,o)=>{const c=n?Array.from(n.childNodes):[],b=r?Array.from(r.childNodes):[];let d=c.length-b.length;if(d>0)for(;d>0;d--)c[c.length-d].parentNode.removeChild(c[c.length-d]);b.forEach(function(u,A){const T=c[A],B=S(u,"key")[1],$=S(T,"key")[1];if(x(u,T),o&&T&&T.nodeType===1&&T.tagName.indexOf("-")>-1)return;if(!T){n&&n.appendChild(u);return}if(B&&$&&B!==$||P(u)!==P(T)){T.replaceWith(u);return}const z=k(u);if(z&&z!==k(T)){T.textContent=z;return}if(T.childNodes.length>0&&u.childNodes.length<1){T.innerHTML="";return}if(T.childNodes.length<1&&u.childNodes.length>0){const le=document.createDocumentFragment();J(u,le,!1),T.appendChild(le);return}if(u.childNodes.length>0){J(u,T,!0);return}})};return{html:(r,...n)=>{let o="";const{length:c}=r;for(let d=1;d<c;d++){const u=n[d-1];let A=!1;if(o+=r[d-1],s.test(o)&&e.test(o)&&(o=o.replace(s,(T,B,$)=>`${t}${d-1}=${$||'"'}${B}${$?"":'"'}`),A=!0),!A)switch(!0){case Array.isArray(u):case u instanceof DocumentFragment:{o+=`<!--${h}${d-1}-->`;break}case(typeof u=="object"&&u!==null):{"attrs"in u&&(o+=`${t}${d-1}="attrs"`);break}default:o+=u??""}}o+=r[c-1];const b=j(o.trim());return _(b,n),E(b,n),b},render:(r,n)=>{r&&!r.children.length?(r.innerHTML="",r.appendChild(n)):J(n,r,!1),a.forEach(o=>{o()}),a=[],l.forEach(o=>{o()}),l=[]}}})();class re{constructor(e,t){w(this,"_shadowRoot");w(this,"_hostElement");w(this,"update");w(this,"emitEvent");this._hostElement=e,this._shadowRoot=t}get __metadata__(){return{name:"RENDERER"}}get shadowRoot(){return this._shadowRoot}get hostElement(){return this._hostElement}}const we={selector:"",root:!1,styles:"",deps:[],standalone:!1,shadowDomEncapsulation:!0},ne=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},Se=async(s,e)=>{var t,i,h,f,a,l,ue,v,he,O;if(s={...we,...s},y(s.styles)){const W=await s.styles;s.styles=W.default.toString()}if(s.styles=s.styles.toString(),s.root&&!H.isRootNodeSet)H.isRootNodeSet=!0,s.styles&&(H.globalStyles.replace(s.styles),H.globalStyleTag=ne(s.styles,document.head));else if(s.root&&H.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(O=class extends HTMLElement{constructor(){super();M(this,l);M(this,v);M(this,t,void 0);M(this,i,void 0);M(this,h,void 0);M(this,f,new Z);M(this,a,!1);w(this,"renderCount",0);s.shadowDomEncapsulation&&de?(N(this,a,!1),N(this,i,this.attachShadow({mode:"open"})),m(this,i).adoptedStyleSheets=H.getComputedCss(s.styles,s.standalone)):(N(this,a,!0),N(this,i,this)),this.getInstance=this.getInstance.bind(this),this.update=this.update.bind(this),this.setRenderIntoQueue=this.setRenderIntoQueue.bind(this),Y(this,l,ue).call(this)}static get observedAttributes(){return e.observedAttributes||[]}update(){const _=m(this,t).render();typeof _=="string"?m(this,i).innerHTML=ge(_):_e(m(this,i),_)}setProps(_){var E,S;for(const[x,P]of Object.entries(_))e.observedProperties.find(k=>k===x)&&(m(this,t)[x]=P);(S=(E=m(this,t)).onPropertiesChanged)==null||S.call(E)}getInstance(){return m(this,t)}setRenderIntoQueue(){++this.renderCount,this.renderCount===1&&queueMicrotask(()=>{this.update(),this.renderCount=0})}connectedCallback(){var _,E,S,x;if(m(this,a)){const P=q();this.setAttribute("data-did",P);const k=s.styles.replaceAll(":host",`${s.selector}[data-did='${P}']`);!s.root&&k&&N(this,h,ne(k,document.head))}m(this,f).add(Q(this,"bindprops",P=>{const k=P.detail.props;k&&this.setProps(k)})),m(this,f).add(Q(this,"refresh_component",()=>{this.update()})),(E=(_=m(this,t)).beforeMount)==null||E.call(_),this.update(),(x=(S=m(this,t)).mount)==null||x.call(S)}attributeChangedCallback(_,E,S){var x,P;(P=(x=m(this,t)).onAttributesChanged)==null||P.call(x,_,E,S)}disconnectedCallback(){var _,E,S;this.renderCount=0,(E=(_=m(this,t)).unmount)==null||E.call(_),(S=m(this,h))==null||S.remove(),m(this,f).unsubscribe()}},t=new WeakMap,i=new WeakMap,h=new WeakMap,f=new WeakMap,a=new WeakMap,l=new WeakSet,ue=function(){const _=new re(this,m(this,i));_.update=()=>{this.update()},_.emitEvent=(E,S)=>{Y(this,v,he).call(this,E,S)},m(this,f).add(ye(this.setRenderIntoQueue,()=>{N(this,t,se(be(this.setRenderIntoQueue,e),s.deps,_))}))},v=new WeakSet,he=function(_,E){const S=new CustomEvent(_,{detail:E});this.dispatchEvent(S)},O))},Re={deps:[]},ve=s=>e=>{if(s.selector.indexOf("-")<=0)throw new Error("You need at least 1 dash in the custom element name!");window.customElements.get(s.selector)||Se(s,e)},ie=(s={})=>e=>{if(s={...Re,...s},e.prototype.__metadata__={name:"SERVICE"},s.deps.some(i=>i.prototype.__metadata__.name==="RENDERER"))throw Error("Renderer cannot be a dependency for a service. It should be used with component");const t=se(e,s.deps);te.register(e,t)},I=class{static checkParams(e,t){let i=0;const h={},f=t.paramCount;for(let a=0;a<e.length;a++){const l=t.params[a];l.indexOf(":")>=0&&(h[l.split(":")[1]]=e[a].split("?")[0],i+=1)}return i===f?h:{}}static getParamCount(e){let t=0;return e.forEach(i=>{i.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){const t={params:{},url:"",template:"",paramCount:0,isRegistered:!1,redirectTo:"",preload:e.preload,canActivate:()=>!0};if(t.params=e.path.split("/").filter(i=>i.length>0),t.url=e.path,t.template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.template=e.template,t.templatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.paramCount=I.getParamCount(t.params),I.routeList.push(t)}static preloadRoutes(){for(const e of I.routeList)e.templatePath&&e.templatePath()}static preloadSelectedRoutes(){const e=I.routeList.filter(t=>t.preload===!0);for(const t of e)t.templatePath&&t.templatePath()}};let C=I;w(C,"routeList",[]),w(C,"isHistoryBasedRouting",!0);function oe(s,e){return s?new RegExp(s.replace(/:[^\s/]+/g,"(.+)")).test(e):!1}class U{constructor(){w(this,"_currentRoute",new X({path:"",routeParams:new Map,queryParams:new Map,state:{}}));w(this,"_template",new X(""));w(this,"_navigationEndEvent",new G);w(this,"_routeStateMap",new Map)}listenRouteChanges(){const e=C.isHistoryBasedRouting?"popstate":"hashchange";return C.isHistoryBasedRouting&&(window.history.replaceState({},null,""),function(t,i){var h=t.pushState;t.pushState=function(...f){h.apply(t,f),i()}}(window.history,this._registerOnHashChange.bind(this))),Q(window,e,()=>{this._registerOnHashChange()})}getTemplate(){return this._template.asObservable()}getCurrentRoute(){return this._currentRoute.asObservable()}navigateTo(e="/",t){let i=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");i=i||"/",this._routeStateMap.clear(),this._routeStateMap.set(e,t),i===e?this._navigateTo(e,t):C.isHistoryBasedRouting?window.history.pushState(t,"",e):window.location.hash="#"+e}onNavigationEnd(){return this._navigationEndEvent.asObservable()}_registerOnHashChange(){const e=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,""),t=this._routeStateMap.get(e);this._navigateTo(e,t)}_navigateTo(e,t){const i={},h=e.split("/").filter(l=>l.length>0),f=C.routeList.filter(l=>{if(l.params.length===h.length&&oe(l.url,e))return l;if(l.url===e)return l}),a=f.length>0?f[0]:null;a&&(i.path=e,i.state={...t||{}},V(a.canActivate()).subscribe(l=>{if(!l)return;const R=C.checkParams(h,a);if(Object.keys(R).length>0||e){i.routeParams=new Map(Object.entries(R));let v=[];C.isHistoryBasedRouting?v=new URLSearchParams(window.location.search).entries():v=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[],i.queryParams=new Map(v);const j=O=>{O.isRegistered=!0,this._currentRoute.next(i),this._template.next(O.template),this._navigationEndEvent.next()};a.isRegistered?j(a):a.templatePath?V(a.templatePath()).subscribe(()=>{j(a)}):a.redirectTo&&this.navigateTo(a.redirectTo,t)}else this.navigateTo(a.redirectTo,t)}))}}ie()(U);const Ce=()=>{class s{constructor(t,i){w(this,"_template","");w(this,"_subscriptions",new Z)}beforeMount(){this._subscriptions.add(this.internalRouterSrvc.getTemplate().subscribe(t=>{this._template!==t&&(this._template=t)})),this._subscriptions.add(this.internalRouterSrvc.listenRouteChanges())}mount(){const t=C.isHistoryBasedRouting?window.location.pathname:window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(t||"/")}unmount(){this._subscriptions.unsubscribe()}render(){return this._template}}ve({selector:"router-outlet",deps:[U,re]})(s)};class ae{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}onNavigationEnd(){return this.internalRouter.onNavigationEnd()}registerRoutes(e,t=!1,i=!1){if(i&&(C.isHistoryBasedRouting=!i),Array.isArray(e)){for(const h of e)C.formatRoute(h);t?C.preloadRoutes():C.preloadSelectedRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}ie({deps:[U]})(ae),p.Router=ae,p.matchPath=oe,p.registerRouterComponent=Ce,Object.defineProperty(p,Symbol.toStringTag,{value:"Module"})});
