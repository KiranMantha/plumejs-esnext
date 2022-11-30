var Re=Object.defineProperty;var Pe=(a,d,b)=>d in a?Re(a,d,{enumerable:!0,configurable:!0,writable:!0,value:b}):a[d]=b;var E=(a,d,b)=>(Pe(a,typeof d!="symbol"?d+"":d,b),b),X=(a,d,b)=>{if(!d.has(a))throw TypeError("Cannot "+b)};var n=(a,d,b)=>(X(a,d,"read from private field"),b?b.call(a):d.get(a)),w=(a,d,b)=>{if(d.has(a))throw TypeError("Cannot add the same private member more than once");d instanceof WeakSet?d.add(a):d.set(a,b)},P=(a,d,b,O)=>(X(a,d,"write to private field"),O?O.call(a,b):d.set(a,b),b);var F=(a,d,b)=>(X(a,d,"access private method"),b);var PlumeJS=function(a){var k,ae,_,H,$,W,oe,q,le,I,z,V,S,T,U,ce;"use strict";const{html:d,render:b}=(()=>{const s=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",r=/^attr([^ ]+)/,i="insertNode",o=/^insertNode([^ ]+)/,u=v=>{const c={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let f=JSON.stringify(v);const h=g=>c[g]||g;return f=(g=>g.replace(/[&<>\(\)]/g,h))(f),JSON.parse(f)},l=(v,c)=>{var y;const f=v.options,h=Array.isArray(c)?c:[c];let C,g,m=f.length;for(;m--;){g=f[m];const M=(y=g.getAttribute("value"))!=null?y:(g.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(g.selected=h.indexOf(M)>-1)&&(C=!0)}C||(v.selectedIndex=-1)},p=v=>{const c=document.createElement("template");return c.innerHTML=v,c.content},R=(v,c)=>{const f=document.createTreeWalker(v,NodeFilter.SHOW_ELEMENT,null);let h=f.nextNode();for(;h;){if(h.hasAttributes()){const C=Array.from(h.attributes).filter(g=>r.test(g.nodeName));for(const{nodeName:g,nodeValue:m}of C){const y=r.exec(g)[1];switch(!0){case/^on+/.test(m):{const M=m.slice(2).toLowerCase();h.removeEventListener(M,c[y]),M!=="bindprops"?h.addEventListener(M,c[y]):h.addEventListener(M,Q=>{Q.detail.setProps(c[y]())});break}case/ref/.test(m):{c[y](h);break}case/^data-+/.test(m):{h.setAttribute(`data-${m}`,u(c[y]));break}case/^aria-+/.test(m):{h.setAttribute(`aria-${m}`,u(c[y]));break}case/class/.test(m):{c[y]?h.classList.add(...c[y].split(" ")):h.setAttribute("class","");break}case/value/.test(m):{h.nodeName.toLowerCase()==="select"?l(h,c[y]):h.value=u(c[y]);break}case/disabled/.test(m):case/checked/.test(m):{c[y]?h.setAttribute(m,c[y]):h.removeAttribute(m);break}default:h.setAttribute(m,u(c[y]))}h.removeAttribute(g)}}h=f.nextNode()}},A=(v,c)=>{const f=document.createTreeWalker(v,NodeFilter.SHOW_COMMENT,null);let h=f.nextNode(),C;for(;h;){if(C=o.exec(h.data)){const g=Array.isArray(c[C[1]])?c[C[1]]:[c[C[1]]];h.replaceWith(...g),f.currentNode=v}h=f.nextNode()}};return{html:(v,...c)=>{let f="";const{length:h}=v;for(let g=1;g<h;g++){const m=c[g-1];let y=!1;if(f+=v[g-1],s.test(f)&&e.test(f)&&(f=f.replace(s,(M,Q,ie)=>`${t}${g-1}=${ie||'"'}${Q}${ie?"":'"'}`),y=!0),!y)switch(!0){case Array.isArray(m):case m instanceof DocumentFragment:{f+=`<!--${i}${g-1}-->`;break}case(typeof m=="object"&&m!==null):{"html"in m&&(f+=m.html);break}default:f+=m}}f+=v[h-1];const C=p(f.trim());return R(C,c),A(C,c),C},render:(v,c)=>{v.innerHTML="",v.appendChild(c)}}})(),O=new(ae=class{constructor(){w(this,k,void 0);P(this,k,new WeakMap)}register(s,e){if(!n(this,k).get(s))n(this,k).set(s,e);else throw console.error(s),"service already exists"}getService(s){const e=n(this,k).get(s);if(e)return e;throw console.error(s),"service is not a registered service."}clear(){P(this,k,new WeakMap)}},k=new WeakMap,ae),ue=s=>typeof s=="function",he=s=>{const e=s.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},J=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),Y=(s,e,t,r=!1)=>(s.addEventListener(e,t,r),()=>{s.removeEventListener(e,t,r)}),Z=(s,e,t)=>{if(e.length>0){const r=[];for(const u of e)u.__metadata__?r.push(t):r.push(O.getService(u));const i=he(s),o=new s(...r);return e.forEach((u,l)=>{o[i[l]]=r[l]}),o}else return new s},N=new class{constructor(){E(this,"globalStyles");E(this,"globalStyleTag");E(this,"style_registry");E(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(s=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],s){const r=new CSSStyleSheet;r.replace(s),e.push(r)}return e}};class B{constructor(){E(this,"shadowRoot");E(this,"update");E(this,"emitEvent")}static get __metadata__(){return{name:"Renderer"}}}const de={selector:"",root:!1,styles:"",deps:[],standalone:!1},ee=(s,e)=>{const t=document.createElement("style");return t.innerHTML=s,e&&e.appendChild(t),t},te=(s,e)=>{var t,r,i,o;if(!window.customElements.get(s.selector)){if(s={...de,...s},s.styles=s.styles.toString(),s.root&&!N.isRootNodeSet)N.isRootNodeSet=!0,s.styles&&(N.globalStyles.replace(s.styles),N.globalStyleTag=ee(s.styles,document.head));else if(s.root&&N.isRootNodeSet)throw Error("Cannot register duplicate root component in "+s.selector+" component");window.customElements.define(s.selector,(o=class extends HTMLElement{constructor(){super();w(this,t,void 0);w(this,r,void 0);w(this,i,void 0);P(this,r,this.attachShadow({mode:"open"})),J||(n(this,r).adoptedStyleSheets=N.getComputedCss(s.styles,s.standalone)),this.getInstance=this.getInstance.bind(this)}static get observedAttributes(){return e.observedAttributes||[]}emulateComponent(){J&&s.styles&&P(this,i,ee(s.styles))}connectedCallback(){var p,R,A,L;this.emulateComponent();const l=new B;l.shadowRoot=n(this,r),l.update=()=>{this.update()},l.emitEvent=(D,v)=>{this.emitEvent(D,v)},P(this,t,Z(e,s.deps,l)),(R=(p=n(this,t)).beforeMount)==null||R.call(p),this.update(),(L=(A=n(this,t)).mount)==null||L.call(A),this.emitEvent("bindprops",{setProps:D=>{this.setProps(D)}},!1)}update(){b(n(this,r),(()=>n(this,t).render())()),J&&(s.styles&&n(this,r).insertBefore(n(this,i),n(this,r).childNodes[0]),N.globalStyleTag&&!s.standalone&&n(this,r).insertBefore(document.importNode(N.globalStyleTag,!0),n(this,r).childNodes[0]))}emitEvent(l,p){const R=new CustomEvent(l,{detail:p});this.dispatchEvent(R)}setProps(l){var p,R;for(const[A,L]of Object.entries(l))n(this,t)[A]=L;(R=(p=n(this,t)).onPropsChanged)==null||R.call(p),this.update()}getInstance(){return n(this,t)}attributeChangedCallback(l,p,R){var A,L;(L=(A=n(this,t)).onNativeAttributeChanges)==null||L.call(A,l,p,R)}disconnectedCallback(){var l,p;(p=(l=n(this,t)).unmount)==null||p.call(l)}},t=new WeakMap,r=new WeakMap,i=new WeakMap,o))}},se={deps:[]},G=(...s)=>{let e={...se},t;if(s[0].hasOwnProperty("deps")?(e={...se,...s[0]},t=s[1]):t=s[0],t){const r=Z(t,e.deps);O.register(t,r)}else throw new Error("error: Requires constructor to define service")},j=class{static checkParams(e,t){let r=0,i={},o=t.ParamCount;for(let l=0;l<e.length;l++){var u=t.Params[l];u.indexOf(":")>=0&&(i[u.split(":")[1]]=e[l].split("?")[0],r+=1)}return r===o?i:{}}static getParamCount(e){let t=0;return e.forEach(r=>{r.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){let t={Params:{},Url:"",Template:"",ParamCount:0,IsRegistered:!1,redirectTo:"",canActivate:()=>!0};if(t.Params=e.path.split("/").filter(r=>r.length>0),t.Url=e.path,t.Template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.Template=e.template,t.TemplatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.ParamCount=j.getParamCount(t.Params),j.routeList.push(t)}static preloadRoutes(){for(const e of j.routeList)e.TemplatePath&&e.TemplatePath()}};let x=j;E(x,"routeList",[]);const me=s=>!!s&&typeof s.subscribe=="function",fe=s=>!!s&&typeof s.then=="function",ge=s=>({subscribe:e=>{e(s)}}),be=s=>({subscribe:e=>{Promise.resolve(s).then(t=>{e(t)})}});class pe{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const re=s=>me(s)?s:fe(s)?be(Promise.resolve(s)):ge(s);class K{constructor(){w(this,W);w(this,q);w(this,I);w(this,_,{path:"",routeParams:new Map,queryParams:new Map,state:{}});w(this,H,new pe);w(this,$,void 0)}startHashChange(){P(this,$,Y(window,"hashchange",()=>{F(this,W,oe).call(this)}))}stopHashChange(){n(this,$).call(this)}getTemplate(){return n(this,H).asObservable()}getCurrentRoute(){return n(this,_)}navigateTo(e="",t){e?(window.location.hash.replace(/^#/,"")===e&&F(this,I,z).call(this,e,t),window.location.hash="#"+e):F(this,I,z).call(this,e,t)}}_=new WeakMap,H=new WeakMap,$=new WeakMap,W=new WeakSet,oe=function(){const e=window.location.hash.replace(/^#/,"");F(this,I,z).call(this,e,null)},q=new WeakSet,le=function(e,t){if(e){let r=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return t.match(r)}else return e===t},I=new WeakSet,z=function(e,t){let r=e.split("/").filter(u=>u.length>0),i=x.routeList.filter(u=>{if(u.Params.length===r.length&&F(this,q,le).call(this,u.Url,e))return u;if(u.Url===e)return u}),o=i.length>0?i[0]:null;o&&(n(this,_).path=e,n(this,_).state={...t||{}},re(o.canActivate()).subscribe(u=>{if(!u)return;let l=x.checkParams(r,o);if(Object.keys(l).length>0||e){n(this,_).routeParams=new Map(Object.entries(l));const p=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];n(this,_).queryParams=new Map(p),o.IsRegistered?n(this,H).next(o.Template):o.TemplatePath&&re(o.TemplatePath()).subscribe(()=>{o.IsRegistered=!0,n(this,H).next(o.Template)})}else this.navigateTo(o.redirectTo)}))},G(K);class ne{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}registerRoutes(e,t=!1){if(Array.isArray(e)){for(let r of e)x.formatRoute(r);t&&x.preloadRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}G({deps:[K]},ne);const ve=()=>{var e,t;class s{constructor(i,o){w(this,e,"");w(this,t,void 0);E(this,"update")}beforeMount(){P(this,t,this.internalRouterSrvc.getTemplate().subscribe(i=>{P(this,e,i),this.renderer.update()})),this.internalRouterSrvc.startHashChange()}mount(){let i=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(i)}unmount(){n(this,t).call(this),this.internalRouterSrvc.stopHashChange()}render(){if(n(this,e)){const i=[`${n(this,e)}`];return i.raw=[`${n(this,e)}`],d(i)}else return d``}}e=new WeakMap,t=new WeakMap,te({selector:"router-outlet",deps:[K,B]},s)},ye=s=>{let e=s;return[e,r=>{let i;ue(r)?i=r(e):i=r,Object.assign(e,i)}]},we=s=>{let e;switch(s.nodeName&&s.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(s.type)?e=s.checked?s.value!==null&&s.value!=="on"?s.value:!0:!1:e=s.value;break}case"select":{const t=s.type==="select-one",i=[...Array.from(s.options)].filter(o=>o.selected).map(o=>{var u;return(u=o.value)!=null?u:(o.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ")});e=t?i[0]:i;break}default:{e=s.value;break}}return e};class Se{constructor(e,t){w(this,U);w(this,V,void 0);w(this,S,void 0);w(this,T,new Map);P(this,V,e),P(this,S,t)}get errors(){return n(this,T)}get valid(){return F(this,U,ce).call(this),!n(this,T).size}get value(){const e={};for(const[t,r]of Object.entries(n(this,S)))e[t]=r.value;return e}get(e){return n(this,S)[e]}reset(e={}){for(const t in n(this,S))n(this,S)[t].value=e[t]||n(this,V)[t];n(this,T).clear()}}V=new WeakMap,S=new WeakMap,T=new WeakMap,U=new WeakSet,ce=function(){n(this,T).clear();for(const e in n(this,S)){const t=n(this,S)[e].value,r=n(this,S)[e].validators;n(this,S)[e].errors=null;for(const i of r){const o=i(t);o!==null&&(n(this,T).has(e)?(n(this,T).set(e,{...n(this,T).get(e),...o}),n(this,S)[e].errors={...n(this,S)[e].errors,...o}):(n(this,T).set(e,o),n(this,S)[e].errors=o))}}};const Ce=s=>{const e={},t={};for(const[u,l]of Object.entries(s)){const p=Array.isArray(l)?l:[l];e[u]={value:p.shift(),validators:p},t[u]=e[u].value}const r=new Se(t,e);return[r,u=>l=>{const p=we(l.target);r.get(u).value=p},()=>{r.reset()}]};class Te{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}return a.Component=te,a.Renderer=B,a.Router=ne,a.Service=G,a.Validators=Te,a.fromNativeEvent=Y,a.html=d,a.registerRouterComponent=ve,a.render=b,a.useFormFields=Ce,a.useState=ye,Object.defineProperties(a,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),a}({});
