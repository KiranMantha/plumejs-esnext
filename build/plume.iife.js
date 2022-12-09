var Re=Object.defineProperty;var Ee=(c,b,y)=>b in c?Re(c,b,{enumerable:!0,configurable:!0,writable:!0,value:y}):c[b]=y;var _=(c,b,y)=>(Ee(c,typeof b!="symbol"?b+"":b,y),y),X=(c,b,y)=>{if(!b.has(c))throw TypeError("Cannot "+y)};var n=(c,b,y)=>(X(c,b,"read from private field"),y?y.call(c):b.get(c)),w=(c,b,y)=>{if(b.has(c))throw TypeError("Cannot add the same private member more than once");b instanceof WeakSet?b.add(c):b.set(c,y)},A=(c,b,y,R)=>(X(c,b,"write to private field"),R?R.call(c,y):b.set(c,y),y);var H=(c,b,y)=>(X(c,b,"access private method"),y);var PlumeJS=function(c){var L,ie,M,x,$,q,le,U,ce,I,z,V,C,E,D,ue;"use strict";const{html:b,render:y}=(()=>{const r=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,t="attr",s=/^attr([^ ]+)/,u="insertNode",h=/^insertNode([^ ]+)/,f=m=>{const i={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let a=JSON.stringify(m);const o=d=>i[d]||d;return a=(d=>d.replace(/[&<>\(\)]/g,o))(a),JSON.parse(a)},g=(m,i)=>{var p;const a=m.options,o=Array.isArray(i)?i:[i];let S,d,l=a.length;for(;l--;){d=a[l];const N=(p=d.getAttribute("value"))!=null?p:(d.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(d.selected=o.indexOf(N)>-1)&&(S=!0)}S||(m.selectedIndex=-1)},v=m=>{const i=document.createElement("template");return i.innerHTML=m,i.content},P=(m,i)=>{const a=document.createTreeWalker(m,NodeFilter.SHOW_ELEMENT,null);let o=a.nextNode();for(;o;){if(o.hasAttributes()){const S=Array.from(o.attributes).filter(d=>s.test(d.nodeName));for(const{nodeName:d,nodeValue:l}of S){const p=s.exec(d)[1];switch(!0){case/^on+/.test(l):{const N=l.slice(2).toLowerCase();o.removeEventListener(N,i[p]),N!=="bindprops"?o.addEventListener(N,i[p]):o.addEventListener(N,Q=>{Q.detail.setProps(i[p]())});break}case/ref/.test(l):{o.tagName.includes("-")?o.addEventListener("load",N=>{i[p](N.detail)}):i[p](o);break}case/^data-+/.test(l):{o.setAttribute(`data-${l}`,f(i[p]));break}case/^aria-+/.test(l):{o.setAttribute(`aria-${l}`,f(i[p]));break}case/class/.test(l):{i[p]?o.classList.add(...i[p].split(" ")):o.setAttribute("class","");break}case/value/.test(l):{o.nodeName.toLowerCase()==="select"?g(o,i[p]):o.value=f(i[p]);break}case/disabled/.test(l):case/checked/.test(l):{i[p]?o.setAttribute(l,i[p]):o.removeAttribute(l);break}default:o.setAttribute(l,f(i[p]))}o.removeAttribute(d)}}o=a.nextNode()}},k=(m,i)=>{const a=document.createTreeWalker(m,NodeFilter.SHOW_COMMENT,null);let o=a.nextNode(),S;for(;o;){if(S=h.exec(o.data)){const d=Array.isArray(i[S[1]])?i[S[1]]:[i[S[1]]];o.replaceWith(...d),a.currentNode=m}o=a.nextNode()}},T=m=>m.nodeType===3?"text":m.nodeType===8?"comment":m.tagName.toLowerCase(),O=m=>m.childNodes&&m.childNodes.length>0?null:m.textContent,W=(m,i)=>{const a=i?Array.from(i.childNodes):[],o=m?Array.from(m.childNodes):[];let S=a.length-o.length;if(S>0)for(;S>0;S--)a[a.length-S].parentNode.removeChild(a[a.length-S]);o.forEach(function(d,l){if(!a[l]){i&&i.appendChild(d);return}if(T(d)!==T(a[l])){a[l].replaceWith(d);return}const p=O(d);if(p&&p!==O(a[l])){a[l].textContent=p;return}if(a[l].childNodes.length>0&&d.childNodes.length<1){a[l].innerHTML="";return}if(a[l].childNodes.length<1&&d.childNodes.length>0){const N=document.createDocumentFragment();W(d,N),a[l].appendChild(N);return}if(d.childNodes.length>0){W(d,a[l]);return}})};return{html:(m,...i)=>{let a="";const{length:o}=m;for(let d=1;d<o;d++){const l=i[d-1];let p=!1;if(a+=m[d-1],r.test(a)&&e.test(a)&&(a=a.replace(r,(N,Q,oe)=>`${t}${d-1}=${oe||'"'}${Q}${oe?"":'"'}`),p=!0),!p)switch(!0){case Array.isArray(l):case l instanceof DocumentFragment:{a+=`<!--${u}${d-1}-->`;break}case(typeof l=="object"&&l!==null):{"html"in l&&(a+=l.html);break}default:a+=l}}a+=m[o-1];const S=v(a.trim());return P(S,i),k(S,i),S},render:(m,i)=>{m.children.length?W(i,m):(m.innerHTML="",m.appendChild(i))}}})(),R=new class{constructor(){_(this,"globalStyles");_(this,"globalStyleTag");_(this,"style_registry");_(this,"isRootNodeSet");try{this.globalStyles=new CSSStyleSheet}catch{this.globalStyles=""}this.isRootNodeSet=!1,this.globalStyleTag=null}getComputedCss(r=""){let e=[];const t=new CSSStyleSheet;if(t.insertRule(":host { display: block; }"),e=[this.globalStyles,t],r){const s=new CSSStyleSheet;s.replace(r),e.push(s)}return e}},Y=new(ie=class{constructor(){w(this,L,void 0);A(this,L,new WeakMap)}register(r,e){if(!n(this,L).get(r))n(this,L).set(r,e);else throw console.error(r),"service already exists"}getService(r){const e=n(this,L).get(r);if(e)return e;throw console.error(r),"service is not a registered service."}clear(){A(this,L,new WeakMap)}},L=new WeakMap,ie),he=r=>typeof r=="function",de=r=>{const e=r.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(t=>t.trim()):[]},J=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),Z=(r,e,t,s=!1)=>(r.addEventListener(e,t,s),()=>{r.removeEventListener(e,t,s)}),ee=(r,e,t)=>{if(e.length>0){const s=[];for(const f of e)f.__metadata__?s.push(t):s.push(Y.getService(f));const u=de(r),h=new r(...s);return e.forEach((f,g)=>{h[u[g]]=s[g]}),h}else return new r};class B{constructor(){_(this,"shadowRoot");_(this,"update");_(this,"emitEvent")}static get __metadata__(){return{name:"Renderer"}}}const fe={selector:"",root:!1,styles:"",deps:[],standalone:!1},te=(r,e)=>{const t=document.createElement("style");return t.innerHTML=r,e&&e.appendChild(t),t},re=(r,e)=>{var t,s,u,h;if(!window.customElements.get(r.selector)){if(r={...fe,...r},r.styles=r.styles.toString(),r.root&&!R.isRootNodeSet)R.isRootNodeSet=!0,r.styles&&(R.globalStyles.replace(r.styles),R.globalStyleTag=te(r.styles,document.head));else if(r.root&&R.isRootNodeSet)throw Error("Cannot register duplicate root component in "+r.selector+" component");window.customElements.define(r.selector,(h=class extends HTMLElement{constructor(){super();w(this,t,void 0);w(this,s,void 0);w(this,u,void 0);A(this,s,this.attachShadow({mode:"open"})),J||(n(this,s).adoptedStyleSheets=R.getComputedCss(r.styles,r.standalone)),this.getInstance=this.getInstance.bind(this)}static get observedAttributes(){return e.observedAttributes||[]}emulateComponent(){J&&r.styles&&A(this,u,te(r.styles))}connectedCallback(){var g,v,P,k;if(this.isConnected){this.emitEvent("load",this),this.emulateComponent();const T=new B;T.shadowRoot=n(this,s),T.update=()=>{this.update()},T.emitEvent=(O,W)=>{this.emitEvent(O,W)},A(this,t,ee(e,r.deps,T)),(v=(g=n(this,t)).beforeMount)==null||v.call(g),this.update(),(k=(P=n(this,t)).mount)==null||k.call(P),this.emitEvent("bindprops",{setProps:O=>{this.setProps(O)}},!1)}}update(){y(n(this,s),(()=>n(this,t).render())()),J&&(r.styles&&n(this,s).insertBefore(n(this,u),n(this,s).childNodes[0]),R.globalStyleTag&&!r.standalone&&n(this,s).insertBefore(document.importNode(R.globalStyleTag,!0),n(this,s).childNodes[0]))}emitEvent(g,v){const P=new CustomEvent(g,{detail:v});this.dispatchEvent(P)}setProps(g){var v,P;for(const[k,T]of Object.entries(g))n(this,t)[k]=T;(P=(v=n(this,t)).onPropsChanged)==null||P.call(v),this.update()}getInstance(){return n(this,t)}attributeChangedCallback(g,v,P){var k,T;(T=(k=n(this,t)).onNativeAttributeChanges)==null||T.call(k,g,v,P)}disconnectedCallback(){var g,v;(v=(g=n(this,t)).unmount)==null||v.call(g)}},t=new WeakMap,s=new WeakMap,u=new WeakMap,h))}},se={deps:[]},G=(...r)=>{let e={...se},t;if(r[0].hasOwnProperty("deps")?(e={...se,...r[0]},t=r[1]):t=r[0],t){const s=ee(t,e.deps);Y.register(t,s)}else throw new Error("error: Requires constructor to define service")},j=class{static checkParams(e,t){let s=0,u={},h=t.ParamCount;for(let g=0;g<e.length;g++){var f=t.Params[g];f.indexOf(":")>=0&&(u[f.split(":")[1]]=e[g].split("?")[0],s+=1)}return s===h?u:{}}static getParamCount(e){let t=0;return e.forEach(s=>{s.indexOf(":")>=0&&(t+=1)}),t}static formatRoute(e){let t={Params:{},Url:"",Template:"",ParamCount:0,IsRegistered:!1,redirectTo:"",canActivate:()=>!0};if(t.Params=e.path.split("/").filter(s=>s.length>0),t.Url=e.path,t.Template="",t.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");t.Template=e.template,t.TemplatePath=e.templatePath}e.canActivate&&(t.canActivate=e.canActivate),t.ParamCount=j.getParamCount(t.Params),j.routeList.push(t)}static preloadRoutes(){for(const e of j.routeList)e.TemplatePath&&e.TemplatePath()}};let F=j;_(F,"routeList",[]);const me=r=>!!r&&typeof r.subscribe=="function",ge=r=>!!r&&typeof r.then=="function",be=r=>({subscribe:e=>{e(r)}}),pe=r=>({subscribe:e=>{Promise.resolve(r).then(t=>{e(t)})}});class ye{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const ne=r=>me(r)?r:ge(r)?pe(Promise.resolve(r)):be(r);class K{constructor(){w(this,q);w(this,U);w(this,I);w(this,M,{path:"",routeParams:new Map,queryParams:new Map,state:{}});w(this,x,new ye);w(this,$,void 0)}startHashChange(){A(this,$,Z(window,"hashchange",()=>{H(this,q,le).call(this)}))}stopHashChange(){n(this,$).call(this)}getTemplate(){return n(this,x).asObservable()}getCurrentRoute(){return n(this,M)}navigateTo(e="",t){e?(window.location.hash.replace(/^#/,"")===e&&H(this,I,z).call(this,e,t),window.location.hash="#"+e):H(this,I,z).call(this,e,t)}}M=new WeakMap,x=new WeakMap,$=new WeakMap,q=new WeakSet,le=function(){const e=window.location.hash.replace(/^#/,"");H(this,I,z).call(this,e,null)},U=new WeakSet,ce=function(e,t){if(e){let s=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return t.match(s)}else return e===t},I=new WeakSet,z=function(e,t){let s=e.split("/").filter(f=>f.length>0),u=F.routeList.filter(f=>{if(f.Params.length===s.length&&H(this,U,ce).call(this,f.Url,e))return f;if(f.Url===e)return f}),h=u.length>0?u[0]:null;h&&(n(this,M).path=e,n(this,M).state={...t||{}},ne(h.canActivate()).subscribe(f=>{if(!f)return;let g=F.checkParams(s,h);if(Object.keys(g).length>0||e){n(this,M).routeParams=new Map(Object.entries(g));const v=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];n(this,M).queryParams=new Map(v),h.IsRegistered?n(this,x).next(h.Template):h.TemplatePath&&ne(h.TemplatePath()).subscribe(()=>{h.IsRegistered=!0,n(this,x).next(h.Template)})}else this.navigateTo(h.redirectTo)}))},G(K);class ae{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,t){this.internalRouter.navigateTo(e,t)}registerRoutes(e,t=!1){if(Array.isArray(e)){for(let s of e)F.formatRoute(s);t&&F.preloadRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}G({deps:[K]},ae);const ve=()=>{var e,t;class r{constructor(u,h){w(this,e,"");w(this,t,void 0);_(this,"update")}beforeMount(){A(this,t,this.internalRouterSrvc.getTemplate().subscribe(u=>{A(this,e,u),this.renderer.update()})),this.internalRouterSrvc.startHashChange()}mount(){let u=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(u)}unmount(){n(this,t).call(this),this.internalRouterSrvc.stopHashChange()}render(){if(n(this,e)){const u=[`${n(this,e)}`];return u.raw=[`${n(this,e)}`],b(u)}else return b``}}e=new WeakMap,t=new WeakMap,re({selector:"router-outlet",deps:[K,B]},r)},Se=r=>{let e=r;return[e,s=>{let u;he(s)?u=s(e):u=s,Object.assign(e,u)}]},we=r=>{let e;switch(r.nodeName&&r.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(r.type)?e=r.checked?r.value!==null&&r.value!=="on"?r.value:!0:!1:e=r.value;break}case"select":{const t=r.type==="select-one",u=[...Array.from(r.options)].filter(h=>h.selected).map(h=>{var f;return(f=h.value)!=null?f:(h.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ")});e=t?u[0]:u;break}default:{e=r.value;break}}return e};class Ce{constructor(e,t){w(this,D);w(this,V,void 0);w(this,C,void 0);w(this,E,new Map);A(this,V,e),A(this,C,t)}get errors(){return n(this,E)}get valid(){return H(this,D,ue).call(this),!n(this,E).size}get value(){const e={};for(const[t,s]of Object.entries(n(this,C)))e[t]=s.value;return e}get(e){return n(this,C)[e]}reset(e={}){for(const t in n(this,C))n(this,C)[t].value=e[t]||n(this,V)[t];n(this,E).clear()}}V=new WeakMap,C=new WeakMap,E=new WeakMap,D=new WeakSet,ue=function(){n(this,E).clear();for(const e in n(this,C)){const t=n(this,C)[e].value,s=n(this,C)[e].validators;n(this,C)[e].errors=null;for(const u of s){const h=u(t);h!==null&&(n(this,E).has(e)?(n(this,E).set(e,{...n(this,E).get(e),...h}),n(this,C)[e].errors={...n(this,C)[e].errors,...h}):(n(this,E).set(e,h),n(this,C)[e].errors=h))}}};const Te=r=>{const e={},t={};for(const[f,g]of Object.entries(r)){const v=Array.isArray(g)?g:[g];e[f]={value:v.shift(),validators:v},t[f]=e[f].value}const s=new Ce(t,e);return[s,f=>g=>{const v=we(g.target);s.get(f).value=v},()=>{s.reset()}]};class Ne{static required(e){return e.length?null:{required:!0}}static min(e){return t=>t.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return t=>t.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return t=>new RegExp(e).test(t)?null:{pattern:!0}}}return c.Component=re,c.Renderer=B,c.Router=ae,c.Service=G,c.Validators=Ne,c.fromNativeEvent=Z,c.html=b,c.registerRouterComponent=ve,c.render=y,c.useFormFields=Te,c.useState=Se,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),c}({});
