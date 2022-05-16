var Te=Object.defineProperty;var ie=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable;var z=(a,c,d)=>c in a?Te(a,c,{enumerable:!0,configurable:!0,writable:!0,value:d}):a[c]=d,C=(a,c)=>{for(var d in c||(c={}))Ce.call(c,d)&&z(a,d,c[d]);if(ie)for(var d of ie(c))Re.call(c,d)&&z(a,d,c[d]);return a};var R=(a,c,d)=>(z(a,typeof c!="symbol"?c+"":c,d),d),J=(a,c,d)=>{if(!c.has(a))throw TypeError("Cannot "+d)};var s=(a,c,d)=>(J(a,c,"read from private field"),d?d.call(a):c.get(a)),v=(a,c,d)=>{if(c.has(a))throw TypeError("Cannot add the same private member more than once");c instanceof WeakSet?c.add(a):c.set(a,d)},P=(a,c,d,O)=>(J(a,c,"write to private field"),O?O.call(a,d):c.set(a,d),d);var F=(a,c,d)=>(J(a,c,"access private method"),d);var PlumeJS=function(a){var N,re,_,M,I,$,Pe,j,Ee,x,B,w,T;"use strict";const{html:c,render:d}=(()=>{const t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,r="attr",n=/^attr([^ ]+)/,l="insertNode",o=/^insertNode([^ ]+)/,i=S=>{const u={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let g=JSON.stringify(S);const h=b=>u[b]||b;return g=(b=>b.replace(/[&<>\(\)]/g,h))(g),JSON.parse(g)},m=(S,u)=>{var p;const g=S.options,h=Array.isArray(u)?u:[u];let y,b,f=g.length;for(;f--;){b=g[f];const k=(p=b.getAttribute("value"))!=null?p:(b.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(b.selected=h.indexOf(k)>-1)&&(y=!0)}y||(S.selectedIndex=-1)},E=S=>{const u=document.createElement("template");return u.innerHTML=S,u.content},se=(S,u)=>{const g=document.createTreeWalker(S,NodeFilter.SHOW_ELEMENT,null);let h=g.nextNode();for(;h;){if(h.hasAttributes()){const y=Array.from(h.attributes).filter(b=>n.test(b.nodeName));for(const{nodeName:b,nodeValue:f}of y){const p=n.exec(b)[1];switch(!0){case/^on+/.test(f):{const k=f.slice(2).toLowerCase();h.removeEventListener(k,u[p]),k!=="bindprops"?h.addEventListener(k,u[p]):h.addEventListener(k,D=>{D.detail.setProps(u[p]())});break}case/ref/.test(f):{u[p](h);break}case/^data-+/.test(f):{h.setAttribute(`data-${f}`,i(u[p]));break}case/^aria-+/.test(f):{h.setAttribute(`aria-${f}`,i(u[p]));break}case/class/.test(f):{u[p]?h.classList.add(...u[p].split(" ")):h.setAttribute("class","");break}case/value/.test(f):{h.nodeName.toLowerCase()==="select"?m(h,u[p]):h.value=i(u[p]);break}case/disabled/.test(f):case/checked/.test(f):{u[p]?h.setAttribute(f,u[p]):h.removeAttribute(f);break}default:h.setAttribute(f,i(u[p]))}h.removeAttribute(b)}}h=g.nextNode()}},ye=(S,u)=>{const g=document.createTreeWalker(S,NodeFilter.SHOW_COMMENT,null);let h=g.nextNode(),y;for(;h;){if(y=o.exec(h.data)){const b=Array.isArray(u[y[1]])?u[y[1]]:[u[y[1]]];h.replaceWith(...b),g.currentNode=S}h=g.nextNode()}};return{html:(S,...u)=>{let g="";const{length:h}=S;for(let b=1;b<h;b++){const f=u[b-1];let p=!1;if(g+=S[b-1],t.test(g)&&e.test(g)&&(g=g.replace(t,(k,D,ne)=>`${r}${b-1}=${ne||'"'}${D}${ne?"":'"'}`),p=!0),!p)switch(!0){case Array.isArray(f):case f instanceof DocumentFragment:{g+=`<!--${l}${b-1}-->`;break}case(typeof f=="object"&&f!==null):{"html"in f&&(g+=f.html);break}default:g+=f}}g+=S[h-1];const y=E(g.trim());return se(y,u),ye(y,u),y},render:(S,u)=>{S.innerHTML="",S.appendChild(u)}}})(),O=new(re=class{constructor(){v(this,N,void 0);P(this,N,new WeakMap)}register(t,e){if(!s(this,N).get(t))s(this,N).set(t,e);else throw console.error(t),"service already exists"}getService(t){const e=s(this,N).get(t);if(e)return e;throw console.error(t),"service is not a registered service."}clear(){P(this,N,new WeakMap)}},N=new WeakMap,re),ae=t=>typeof t=="function",oe=t=>{const e=t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(r=>r.trim()):[]},V=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),G=(t,e,r,n=!1)=>(t.addEventListener(e,r,n),()=>{t.removeEventListener(e,r,n)}),K=(t,e,r)=>{if(e.length>0){const n=[];for(const i of e)i.__metadata__?n.push(r):n.push(O.getService(i));const l=oe(t),o=new t(...n);return e.forEach((i,m)=>{o[l[m]]=n[m]}),o}else return new t},A=new class{constructor(){R(this,"globalStyles");R(this,"globalStyleTag");R(this,"style_registry");R(this,"isRootNodeSet");this.globalStyles=new CSSStyleSheet,this.isRootNodeSet=!1}getComputedCss(t=""){let e=[];const r=new CSSStyleSheet;if(r.insertRule(":host { display: block; }"),e=[this.globalStyles,r],t){const n=new CSSStyleSheet;n.replace(t),e.push(n)}return e}};class W{constructor(){R(this,"shadowRoot");R(this,"update");R(this,"emitEvent")}static get __metadata__(){return{name:"Renderer"}}}const Q="data-compid",le={selector:"",root:!1,styles:"",useShadow:!0,deps:[]},ce=(t,e)=>(t&&(t=e+" "+t.replace("}",` } ${e} `)),t),X=(t,e)=>{const r=document.createElement("style");return r.innerHTML=t,e&&e.appendChild(r),r},Y=(t,e)=>{var r,n,l,o;if(!window.customElements.get(t.selector)){if(t=C(C({},le),t),t.styles=t.styles.toString(),t.root&&!A.isRootNodeSet)A.isRootNodeSet=!0,t.styles&&(A.globalStyles.replace(t.styles),A.globalStyleTag=X(t.styles,document.head));else if(t.root&&A.isRootNodeSet)throw Error("Cannot register duplicate root component in "+t.selector+" component");window.customElements.define(t.selector,(o=class extends HTMLElement{constructor(){super();v(this,r,void 0);v(this,n,void 0);v(this,l,void 0);P(this,n,this.attachShadow({mode:"open"})),V||(s(this,n).adoptedStyleSheets=A.getComputedCss(t.styles)),this.getInstance=this.getInstance.bind(this)}emulateComponent(){if(V&&t.styles){const i=new Date().getTime()+Math.floor(Math.random()*1e3+1),m=ce(t.styles,`[${Q}="${i.toString()}"]`);P(this,l,X(m)),this.setAttribute(Q,i.toString())}}connectedCallback(){this.emulateComponent();const i=new W;i.shadowRoot=s(this,n),i.update=()=>{this.update()},i.emitEvent=(m,E)=>{this.emitEvent(m,E)},P(this,r,K(e,t.deps,i)),s(this,r).beforeMount&&s(this,r).beforeMount(),this.update(),s(this,r).mount&&s(this,r).mount(),this.emitEvent("bindprops",{setProps:m=>{this.setProps(m)}},!1)}update(){d(s(this,n),(()=>s(this,r).render())()),V&&(t.styles&&s(this,n).insertBefore(s(this,l),s(this,n).childNodes[0]),A.globalStyleTag&&s(this,n).insertBefore(document.importNode(A.globalStyleTag,!0),s(this,n).childNodes[0]))}emitEvent(i,m){const E=new CustomEvent(i,{detail:m});this.dispatchEvent(E)}setProps(i){for(const[m,E]of Object.entries(i))s(this,r)[m]=E;s(this,r).onPropsChanged&&s(this,r).onPropsChanged(),this.update()}getInstance(){return s(this,r)}disconnectedCallback(){s(this,r).unmount&&s(this,r).unmount()}},r=new WeakMap,n=new WeakMap,l=new WeakMap,o))}},Z={deps:[]},q=(...t)=>{let e=C({},Z),r;if(t[0].hasOwnProperty("deps")?(e=C(C({},Z),t[0]),r=t[1]):r=t[0],r){const n=K(r,e.deps);O.register(r,n)}else throw new Error("error: Requires constructor to define service")},H=class{static checkParams(e,r){let n=0,l={},o=r.ParamCount;for(let m=0;m<e.length;m++){var i=r.Params[m];i.indexOf(":")>=0&&(l[i.split(":")[1]]=e[m],n+=1)}return n===o?l:{}}static getParamCount(e){let r=0;return e.forEach(n=>{n.indexOf(":")>=0&&(r+=1)}),r}static formatRoute(e){let r={Params:{},Url:"",Template:"",ParamCount:0,IsRegistered:!1,redirectTo:"",canActivate:()=>!0};if(r.Params=e.path.split("/").filter(n=>n.length>0),r.Url=e.path,r.Template="",r.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");r.Template=e.template,r.TemplatePath=e.templatePath}e.canActivate&&(r.canActivate=e.canActivate),r.ParamCount=H.getParamCount(r.Params),H.routeList.push(r)}static preloadRoutes(){for(const e of H.routeList)e.TemplatePath&&e.TemplatePath()}};let L=H;R(L,"routeList",[]);const ue=t=>!!t&&typeof t.subscribe=="function",he=t=>!!t&&typeof t.then=="function",de=t=>({subscribe:e=>{e(t)}}),me=t=>({subscribe:e=>{Promise.resolve(t).then(r=>{e(r)})}});class fe{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const ee=t=>ue(t)?t:he(t)?me(Promise.resolve(t)):de(t);class U{constructor(){v(this,$);v(this,j);v(this,x);v(this,_,{path:"",routeParams:new Map,queryParams:new Map,state:{}});v(this,M,new fe);v(this,I,void 0)}startHashChange(){P(this,I,G(window,"hashchange",()=>{F(this,$,Pe).call(this)}))}stopHashChange(){s(this,I).call(this)}getTemplate(){return s(this,M).asObservable()}getCurrentRoute(){return s(this,_)}navigateTo(e="",r){e?(window.location.hash.replace(/^#/,"")===e&&F(this,x,B).call(this,e,r),window.location.hash="#"+e):F(this,x,B).call(this,e,r)}}_=new WeakMap,M=new WeakMap,I=new WeakMap,$=new WeakSet,Pe=function(){const e=window.location.hash.replace(/^#/,"");F(this,x,B).call(this,e,null)},j=new WeakSet,Ee=function(e,r){if(e){let n=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return r.match(n)}else return e===r},x=new WeakSet,B=function(e,r){let n=e.split("/").filter(i=>i.length>0),l=L.routeList.filter(i=>{if(i.Params.length===n.length&&F(this,j,Ee).call(this,i.Url,e))return i;if(i.Url===e)return i}),o=l.length>0?l[0]:null;o&&(s(this,_).path=e,s(this,_).state=C({},r||{}),ee(o.canActivate()).subscribe(i=>{if(!i)return;let m=L.checkParams(n,o);if(Object.keys(m).length>0||e){s(this,_).routeParams=new Map(Object.entries(m));const E=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];s(this,_).queryParams=new Map(E),o.IsRegistered?s(this,M).next(o.Template):o.TemplatePath&&ee(o.TemplatePath()).subscribe(se=>{o.IsRegistered=!0,s(this,M).next(o.Template)})}else this.navigateTo(o.redirectTo)}))},q(U);class te{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,r){this.internalRouter.navigateTo(e,r)}registerRoutes(e,r=!1){if(Array.isArray(e)){for(let n of e)L.formatRoute(n);r&&L.preloadRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}q({deps:[U]},te);const ge=()=>{var e,r;class t{constructor(l,o){v(this,e,"");v(this,r,void 0);R(this,"update")}beforeMount(){P(this,r,this.internalRouterSrvc.getTemplate().subscribe(l=>{P(this,e,l),this.renderer.update()})),this.internalRouterSrvc.startHashChange()}mount(){let l=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(l)}unmount(){s(this,r).call(this),this.internalRouterSrvc.stopHashChange()}render(){if(s(this,e)){const l=[`${s(this,e)}`];return l.raw=[`${s(this,e)}`],c(l)}else return c``}}e=new WeakMap,r=new WeakMap,Y({selector:"router-outlet",deps:[U,W]},t)},be=t=>{let e=t;return[e,n=>{let l;ae(n)?l=n(e):l=n,Object.assign(e,l)}]},pe=t=>{let e;switch(t.nodeName&&t.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(t.type)?e=t.checked?t.value!==null&&t.value!=="on"?t.value:!0:!1:e=t.value;break}case"select":{const r=t.type==="select-one",l=[...Array.from(t.options)].filter(o=>o.selected).map(o=>{var i;return(i=o.value)!=null?i:(o.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ")});e=r?l[0]:l;break}default:{e=t.value;break}}return e};class Se{constructor(e){v(this,w,void 0);v(this,T,new Map);P(this,w,e)}get errors(){return s(this,T)}get valid(){return!s(this,T).size}get value(){const e={};for(const[r,n]of Object.entries(s(this,w)))e[r]=n.value;return e}get(e){return s(this,w)[e]}checkValidity(){s(this,T).clear();for(const e in s(this,w)){const r=s(this,w)[e].value,n=s(this,w)[e].validators;s(this,w)[e].errors=null;for(const l of n){const o=l(r);o!==null&&(s(this,T).has(e)?(s(this,T).set(e,C(C({},s(this,T).get(e)),o)),s(this,w)[e].errors=C(C({},s(this,w)[e].errors),o)):(s(this,T).set(e,o),s(this,w)[e].errors=o))}}}reset(){for(const e in s(this,w))s(this,w)[e].value="";s(this,T).clear()}}w=new WeakMap,T=new WeakMap;const we=t=>{const e={};for(const[o,i]of Object.entries(t)){const m=Array.isArray(i)?i:[i];e[o]={value:m.shift(),validators:m}}const r=new Se(e);return[r,o=>i=>{const m=pe(i.target);r.get(o).value=m,r.checkValidity()},()=>{r.reset()}]};class ve{static required(e){return e.length?null:{required:!0}}static min(e){return r=>r.length>=e?null:{minLength:{requiredLength:e}}}static max(e){return r=>r.length<=e?null:{maxLength:{requiredLength:e}}}static pattern(e){return r=>new RegExp(e).test(r)?null:{pattern:!0}}}return a.Component=Y,a.Renderer=W,a.Router=te,a.Service=q,a.Validators=ve,a.fromNativeEvent=G,a.html=c,a.registerRouterComponent=ge,a.render=d,a.useFormFields=we,a.useState=be,Object.defineProperty(a,"__esModule",{value:!0}),a[Symbol.toStringTag]="Module",a}({});
