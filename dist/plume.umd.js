var Se=Object.defineProperty;var re=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable;var V=(n,o,d)=>o in n?Se(n,o,{enumerable:!0,configurable:!0,writable:!0,value:d}):n[o]=d,N=(n,o)=>{for(var d in o||(o={}))we.call(o,d)&&V(n,d,o[d]);if(re)for(var d of re(o))ye.call(o,d)&&V(n,d,o[d]);return n};var T=(n,o,d)=>(V(n,typeof o!="symbol"?o+"":o,d),d),q=(n,o,d)=>{if(!o.has(n))throw TypeError("Cannot "+d)};var a=(n,o,d)=>(q(n,o,"read from private field"),d?d.call(n):o.get(n)),y=(n,o,d)=>{if(o.has(n))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(n):o.set(n,d)},v=(n,o,d,x)=>(q(n,o,"write to private field"),x?x.call(n,d):o.set(n,d),d);var F=(n,o,d)=>(q(n,o,"access private method"),d);(function(n,o){typeof exports=="object"&&typeof module!="undefined"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(n=typeof globalThis!="undefined"?globalThis:n||self,o(n.PlumeJS={}))})(this,function(n){var R,ee,E,k,H,O,Te,I,Ce,M,J;"use strict";const{html:o,render:d}=(()=>{const t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,e=/<[a-z][^>]+$/i,s="attr",r=/^attr([^ ]+)/,c="insertNode",h=/^insertNode([^ ]+)/,i=S=>{const l={"&":"&amp;","<":"&lt;",">":"&gt;","(":"%28",")":"%29"};let f=JSON.stringify(S);const u=b=>l[b]||b;return f=(b=>b.replace(/[&<>\(\)]/g,u))(f),JSON.parse(f)},p=(S,l)=>{var g;const f=S.options,u=Array.isArray(l)?l:[l];let w,b,m=f.length;for(;m--;){b=f[m];const A=(g=b.getAttribute("value"))!=null?g:(b.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ");(b.selected=u.indexOf(A)>-1)&&(w=!0)}w||(S.selectedIndex=-1)},C=S=>{const l=document.createElement("template");return l.innerHTML=S,l.content},te=(S,l)=>{const f=document.createTreeWalker(S,NodeFilter.SHOW_ELEMENT,null);let u=f.nextNode();for(;u;){if(u.hasAttributes()){const w=Array.from(u.attributes).filter(b=>r.test(b.nodeName));for(const{nodeName:b,nodeValue:m}of w){const g=r.exec(b)[1];switch(!0){case/^on+/.test(m):{const A=m.slice(2).toLowerCase();u.removeEventListener(A,l[g]),A!=="bindprops"?u.addEventListener(A,l[g]):u.addEventListener(A,D=>{D.detail.setProps(l[g]())});break}case/ref/.test(m):{l[g](u);break}case/^data-+/.test(m):{u.setAttribute(`data-${m}`,i(l[g]));break}case/^aria-+/.test(m):{u.setAttribute(`aria-${m}`,i(l[g]));break}case/class/.test(m):{l[g]?u.classList.add(...l[g].split(" ")):u.setAttribute("class","");break}case/value/.test(m):{u.nodeName.toLowerCase()==="select"?p(u,l[g]):u.value=i(l[g]);break}case/disabled/.test(m):case/checked/.test(m):{l[g]?u.setAttribute(m,l[g]):u.removeAttribute(m);break}default:u.setAttribute(m,i(l[g]))}u.removeAttribute(b)}}u=f.nextNode()}},ge=(S,l)=>{const f=document.createTreeWalker(S,NodeFilter.SHOW_COMMENT,null);let u=f.nextNode(),w;for(;u;){if(w=h.exec(u.data)){const b=Array.isArray(l[w[1]])?l[w[1]]:[l[w[1]]];u.replaceWith(...b),f.currentNode=S}u=f.nextNode()}};return{html:(S,...l)=>{let f="";const{length:u}=S;for(let b=1;b<u;b++){const m=l[b-1];let g=!1;if(f+=S[b-1],t.test(f)&&e.test(f)&&(f=f.replace(t,(A,D,se)=>`${s}${b-1}=${se||'"'}${D}${se?"":'"'}`),g=!0),!g)switch(!0){case Array.isArray(m):case m instanceof DocumentFragment:{f+=`<!--${c}${b-1}-->`;break}case(typeof m=="object"&&m!==null):{"html"in m&&(f+=m.html);break}default:f+=m}}f+=S[u-1];const w=C(f.trim());return te(w,l),ge(w,l),w},render:(S,l)=>{S.innerHTML="",S.appendChild(l)}}})(),x=new(ee=class{constructor(){y(this,R,void 0);v(this,R,new WeakMap)}register(t,e){if(!a(this,R).get(t))a(this,R).set(t,e);else throw console.error(t),"service already exists"}getService(t){const e=a(this,R).get(t);if(e)return e;throw console.error(t),"service is not a registered service."}clear(){v(this,R,new WeakMap)}},R=new WeakMap,ee),ne=t=>typeof t=="function",ie=t=>{const e=t.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);return e.length===3?e[1].split(",").map(s=>s.trim()):[]},$=(()=>{try{return new CSSStyleSheet,!1}catch{return!0}})(),z=(t,e,s,r=!1)=>(t.addEventListener(e,s,r),()=>{t.removeEventListener(e,s,r)}),B=(t,e,s)=>{if(e.length>0){const r=[];for(const i of e)i.__metadata__?r.push(s):r.push(x.getService(i));const c=ie(t),h=new t(...r);return e.forEach((i,p)=>{h[c[p]]=r[p]}),h}else return new t},P=new class{constructor(){T(this,"globalStyles");T(this,"globalStyleTag");T(this,"style_registry");T(this,"isRootNodeSet");this.globalStyles=new CSSStyleSheet,this.isRootNodeSet=!1}getComputedCss(t=""){let e=[];const s=new CSSStyleSheet;if(s.insertRule(":host { display: block; }"),e=[this.globalStyles,s],t){const r=new CSSStyleSheet;r.replace(t),e.push(r)}return e}};class j{constructor(){T(this,"shadowRoot");T(this,"update");T(this,"emitEvent")}static get __metadata__(){return{name:"Renderer"}}}const G="data-compid",oe={selector:"",root:!1,styles:"",useShadow:!0,deps:[]},ae=(t,e)=>(t&&(t=e+" "+t.replace("}",` } ${e} `)),t),K=(t,e)=>{const s=document.createElement("style");return s.innerHTML=t,e&&e.appendChild(s),s},Q=(t,e)=>{var s,r,c,h;if(!window.customElements.get(t.selector)){if(t=N(N({},oe),t),t.styles=t.styles.toString(),t.root&&!P.isRootNodeSet)P.isRootNodeSet=!0,t.styles&&(P.globalStyles.replace(t.styles),P.globalStyleTag=K(t.styles,document.head));else if(t.root&&P.isRootNodeSet)throw Error("Cannot register duplicate root component in "+t.selector+" component");window.customElements.define(t.selector,(h=class extends HTMLElement{constructor(){super();y(this,s,void 0);y(this,r,void 0);y(this,c,void 0);v(this,r,this.attachShadow({mode:"open"})),$||(a(this,r).adoptedStyleSheets=P.getComputedCss(t.styles)),this.update=this.update.bind(this),this.emitEvent=this.emitEvent.bind(this),this.setProps=this.setProps.bind(this),this.getInstance=this.getInstance.bind(this)}emulateComponent(){if($&&t.styles){const i=new Date().getTime()+Math.floor(Math.random()*1e3+1),p=ae(t.styles,`[${G}="${i.toString()}"]`);v(this,c,K(p)),this.setAttribute(G,i.toString())}}connectedCallback(){this.emulateComponent();const i=new j;i.shadowRoot=a(this,r),i.update=this.update,i.emitEvent=this.emitEvent,v(this,s,B(e,t.deps,i)),a(this,s).beforeMount&&a(this,s).beforeMount(),this.update(),a(this,s).mount&&a(this,s).mount(),this.emitEvent("bindprops",{setProps:this.setProps},!1)}update(){d(a(this,r),a(this,s).render.bind(a(this,s))()),$&&(t.styles&&a(this,r).insertBefore(a(this,c),a(this,r).childNodes[0]),P.globalStyleTag&&a(this,r).insertBefore(document.importNode(P.globalStyleTag,!0),a(this,r).childNodes[0]))}emitEvent(i,p){const C=new CustomEvent(i,{detail:p});this.dispatchEvent(C)}setProps(i){for(const[p,C]of Object.entries(i))a(this,s)[p]=C;a(this,s).onPropsChanged&&a(this,s).onPropsChanged(),this.update()}getInstance(){return a(this,s)}disconnectedCallback(){a(this,s).unmount&&a(this,s).unmount()}},s=new WeakMap,r=new WeakMap,c=new WeakMap,h))}},X={deps:[]},W=(...t)=>{let e=N({},X),s;if(t[0].hasOwnProperty("deps")?(e=N(N({},X),t[0]),s=t[1]):s=t[0],s){const r=B(s,e.deps);x.register(s,r)}else throw new Error("error: Requires constructor to define service")},L=class{static checkParams(e,s){let r=0,c={},h=s.ParamCount;for(let p=0;p<e.length;p++){var i=s.Params[p];i.indexOf(":")>=0&&(c[i.split(":")[1]]=e[p],r+=1)}return r===h?c:{}}static getParamCount(e){let s=0;return e.forEach(r=>{r.indexOf(":")>=0&&(s+=1)}),s}static formatRoute(e){let s={Params:{},Url:"",Template:"",ParamCount:0,IsRegistered:!1,redirectTo:"",canActivate:()=>!0};if(s.Params=e.path.split("/").filter(r=>r.length>0),s.Url=e.path,s.Template="",s.redirectTo=e.redirectTo,e.template){if(!e.templatePath)throw Error("templatePath is required in route if template is mentioned.");s.Template=e.template,s.TemplatePath=e.templatePath}e.canActivate&&(s.canActivate=e.canActivate),s.ParamCount=L.getParamCount(s.Params),L.routeList.push(s)}static preloadRoutes(){for(const e of L.routeList)e.TemplatePath&&e.TemplatePath()}};let _=L;T(_,"routeList",[]);const ce=t=>!!t&&typeof t.subscribe=="function",le=t=>!!t&&typeof t.then=="function",ue=t=>({subscribe:e=>{e(t)}}),he=t=>({subscribe:e=>{Promise.resolve(t).then(s=>{e(s)})}});class de{asObservable(){return{subscribe:e=>this.subscribe(e)}}subscribe(e){return this.internalFn=e,this.unsubscribe}unsubscribe(){this._internalFn=null}next(e){this.internalFn(e)}}const Y=t=>ce(t)?t:le(t)?he(Promise.resolve(t)):ue(t);class U{constructor(){y(this,O);y(this,I);y(this,M);y(this,E,{path:"",routeParams:new Map,queryParams:new Map,state:{}});y(this,k,new de);y(this,H,void 0)}startHashChange(){v(this,H,z(window,"hashchange",()=>{F(this,O,Te).call(this)}))}stopHashChange(){a(this,H).call(this)}getTemplate(){return a(this,k).asObservable()}getCurrentRoute(){return a(this,E)}navigateTo(e="",s){e?(window.location.hash.replace(/^#/,"")===e&&F(this,M,J).call(this,e,s),window.location.hash="#"+e):F(this,M,J).call(this,e,s)}}E=new WeakMap,k=new WeakMap,H=new WeakMap,O=new WeakSet,Te=function(){const e=window.location.hash.replace(/^#/,"");F(this,M,J).call(this,e,null)},I=new WeakSet,Ce=function(e,s){if(e){let r=new RegExp(e.replace(/:[^\s/]+/g,"([\\w-]+)"));return s.match(r)}else return e===s},M=new WeakSet,J=function(e,s){let r=e.split("/").filter(i=>i.length>0),c=_.routeList.filter(i=>{if(i.Params.length===r.length&&F(this,I,Ce).call(this,i.Url,e))return i;if(i.Url===e)return i}),h=c.length>0?c[0]:null;h&&(a(this,E).path=e,a(this,E).state=N({},s||{}),Y(h.canActivate()).subscribe(i=>{if(!i)return;let p=_.checkParams(r,h);if(Object.keys(p).length>0||e){a(this,E).routeParams=new Map(Object.entries(p));const C=window.location.hash.split("?")[1]?new URLSearchParams(window.location.hash.split("?")[1]).entries():[];a(this,E).queryParams=new Map(C),h.IsRegistered?a(this,k).next(h.Template):h.TemplatePath&&Y(h.TemplatePath()).subscribe(te=>{h.IsRegistered=!0,a(this,k).next(h.Template)})}else this.navigateTo(h.redirectTo)}))},W(U);class me{constructor(e){}getCurrentRoute(){return this.internalRouter.getCurrentRoute()}navigateTo(e,s){this.internalRouter.navigateTo(e,s)}registerRoutes(e,s=!1){if(Array.isArray(e)){for(let r of e)_.formatRoute(r);s&&_.preloadRoutes()}else throw Error("router.addRoutes: the parameter must be an array")}}W({deps:[U]},me);const fe=()=>{var e,s;class t{constructor(c,h){y(this,e,"");y(this,s,void 0);T(this,"update")}beforeMount(){v(this,s,this.internalRouterSrvc.getTemplate().subscribe(c=>{v(this,e,c),this.renderer.update()})),this.internalRouterSrvc.startHashChange()}mount(){let c=window.location.hash.replace(/^#/,"");this.internalRouterSrvc.navigateTo(c)}unmount(){a(this,s).call(this),this.internalRouterSrvc.stopHashChange()}render(){if(a(this,e)){const c=[`${a(this,e)}`];return c.raw=[`${a(this,e)}`],o(c)}else return o``}}e=new WeakMap,s=new WeakMap,Q({selector:"router-outlet",deps:[U,j]},t)},Z=t=>{let e=t;return[e,r=>{let c;ne(r)?c=r(e):c=r,Object.assign(e,c)}]},be=t=>{let e;switch(t.nodeName&&t.nodeName.toLowerCase()){case"input":case"textarea":{["radio","checkbox"].includes(t.type)?e=t.checked?t.value!==null&&t.value!=="on"?t.value:!0:!1:e=t.value;break}case"select":{const s=t.type==="select-one",c=[...Array.from(t.options)].filter(h=>h.selected).map(h=>{var i;return(i=h.value)!=null?i:(h.textContent.match(/[^\x20\t\r\n\f]+/g)||[]).join(" ")});e=s?c[0]:c;break}default:{e=t.value;break}}return e},pe=t=>{let[e,s]=Z(t);return[e,h=>i=>{let p=i.target;const C=be(p);s(()=>(e[h]=C,e))},()=>{for(const h of Object.keys(e))e[h]=""}]};n.Component=Q,n.Renderer=j,n.Service=W,n.fromNativeEvent=z,n.html=o,n.registerRouterComponent=fe,n.render=d,n.useFormFields=pe,n.useState=Z,Object.defineProperty(n,"__esModule",{value:!0}),n[Symbol.toStringTag]="Module"});
