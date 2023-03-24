"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[806],{806:(e,t,o)=>{o.r(t);var n,r,i=o(56),s=o(2735);function a(e,t){return function(o){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),c(o,"An initializer"),e.push(o)}}function l(e,t,o,n,r,i,s,l){var c;switch(r){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var d,u,p={kind:c,name:s?"#"+t:t,static:i,private:s},f={v:!1};0!==r&&(p.addInitializer=a(n,f)),0===r?s?(d=o.get,u=o.set):(d=function(){return this[t]},u=function(e){this[t]=e}):2===r?d=function(){return o.value}:(1!==r&&3!==r||(d=function(){return o.get.call(this)}),1!==r&&4!==r||(u=function(e){o.set.call(this,e)})),p.access=d&&u?{get:d,set:u}:d?{get:d}:{set:u};try{return e(l,p)}finally{f.v=!0}}function c(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function d(e,t){var o=typeof t;if(1===e){if("object"!==o||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&c(t.get,"accessor.get"),void 0!==t.set&&c(t.set,"accessor.set"),void 0!==t.init&&c(t.init,"accessor.init")}else if("function"!==o)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function u(e,t,o,n,r,i,s,a){var c,u,p,f,h,g,v=o[0];if(s?c=0===r||1===r?{get:o[3],set:o[4]}:3===r?{get:o[3]}:4===r?{set:o[3]}:{value:o[3]}:0!==r&&(c=Object.getOwnPropertyDescriptor(t,n)),1===r?p={get:c.get,set:c.set}:2===r?p=c.value:3===r?p=c.get:4===r&&(p=c.set),"function"==typeof v)void 0!==(f=l(v,n,c,a,r,i,s,p))&&(d(r,f),0===r?u=f:1===r?(u=f.init,h=f.get||p.get,g=f.set||p.set,p={get:h,set:g}):p=f);else for(var m=v.length-1;m>=0;m--){var w;void 0!==(f=l(v[m],n,c,a,r,i,s,p))&&(d(r,f),0===r?w=f:1===r?(w=f.init,h=f.get||p.get,g=f.set||p.set,p={get:h,set:g}):p=f,void 0!==w&&(void 0===u?u=w:"function"==typeof u?u=[u,w]:u.push(w)))}if(0===r||1===r){if(void 0===u)u=function(e,t){return t};else if("function"!=typeof u){var b=u;u=function(e,t){for(var o=t,n=0;n<b.length;n++)o=b[n].call(e,o);return o}}else{var y=u;u=function(e,t){return y.call(e,t)}}e.push(u)}0!==r&&(1===r?(c.get=p.get,c.set=p.set):2===r?c.value=p:3===r?c.get=p:4===r&&(c.set=p),s?1===r?(e.push((function(e,t){return p.get.call(e,t)})),e.push((function(e,t){return p.set.call(e,t)}))):2===r?e.push(p):e.push((function(e,t){return p.call(e,t)})):Object.defineProperty(t,n,c))}function p(e,t){for(var o,n,r=[],i=new Map,s=new Map,a=0;a<t.length;a++){var l=t[a];if(Array.isArray(l)){var c,d,p=l[1],h=l[2],g=l.length>3,v=p>=5;if(v?(c=e,0!=(p-=5)&&(d=n=n||[])):(c=e.prototype,0!==p&&(d=o=o||[])),0!==p&&!g){var m=v?s:i,w=m.get(h)||0;if(!0===w||3===w&&4!==p||4===w&&3!==p)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+h);!w&&p>2?m.set(h,p):m.set(h,!0)}u(r,c,l,h,p,v,g,d)}}return f(r,o),f(r,n),r}function f(e,t){t&&e.push((function(e){for(var o=0;o<t.length;o++)t[o].call(e);return e}))}function h(e){return e}const g={options:[],multiple:!1,defaultText:"Select",buttonText:null,enableFilter:!1,disable:!1,resetDropdown:!1};let v;var m,w,b,y;function k(e,t){return function(o){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),x(o,"An initializer"),e.push(o)}}function O(e,t,o,n,r,i,s,a){var l;switch(r){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,d,u={kind:l,name:s?"#"+t:t,static:i,private:s},p={v:!1};0!==r&&(u.addInitializer=k(n,p)),0===r?s?(c=o.get,d=o.set):(c=function(){return this[t]},d=function(e){this[t]=e}):2===r?c=function(){return o.value}:(1!==r&&3!==r||(c=function(){return o.get.call(this)}),1!==r&&4!==r||(d=function(e){o.set.call(this,e)})),u.access=c&&d?{get:c,set:d}:c?{get:c}:{set:d};try{return e(a,u)}finally{p.v=!0}}function x(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function C(e,t){var o=typeof t;if(1===e){if("object"!==o||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&x(t.get,"accessor.get"),void 0!==t.set&&x(t.set,"accessor.set"),void 0!==t.init&&x(t.init,"accessor.init")}else if("function"!==o)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function T(e,t,o,n,r,i,s,a){var l,c,d,u,p,f,h=o[0];if(s?l=0===r||1===r?{get:o[3],set:o[4]}:3===r?{get:o[3]}:4===r?{set:o[3]}:{value:o[3]}:0!==r&&(l=Object.getOwnPropertyDescriptor(t,n)),1===r?d={get:l.get,set:l.set}:2===r?d=l.value:3===r?d=l.get:4===r&&(d=l.set),"function"==typeof h)void 0!==(u=O(h,n,l,a,r,i,s,d))&&(C(r,u),0===r?c=u:1===r?(c=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u);else for(var g=h.length-1;g>=0;g--){var v;void 0!==(u=O(h[g],n,l,a,r,i,s,d))&&(C(r,u),0===r?v=u:1===r?(v=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===r||1===r){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var m=c;c=function(e,t){for(var o=t,n=0;n<m.length;n++)o=m[n].call(e,o);return o}}else{var w=c;c=function(e,t){return w.call(e,t)}}e.push(c)}0!==r&&(1===r?(l.get=d.get,l.set=d.set):2===r?l.value=d:3===r?l.get=d:4===r&&(l.set=d),s?1===r?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===r?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,n,l))}function A(e,t){for(var o,n,r=[],i=new Map,s=new Map,a=0;a<t.length;a++){var l=t[a];if(Array.isArray(l)){var c,d,u=l[1],p=l[2],f=l.length>3,h=u>=5;if(h?(c=e,0!=(u-=5)&&(d=n=n||[])):(c=e.prototype,0!==u&&(d=o=o||[])),0!==u&&!f){var g=h?s:i,v=g.get(p)||0;if(!0===v||3===v&&4!==u||4===v&&3!==u)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!v&&u>2?g.set(p,u):g.set(p,!0)}T(r,c,l,p,u,h,f,d)}}return E(r,o),E(r,n),r}function E(e,t){t&&e.push((function(e){for(var o=0;o<t.length;o++)t[o].call(e);return e}))}function D(e,t,o){return{e:A(e,t),get c(){return function(e,t){if(t.length>0){for(var o=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var a=t[i](n,{kind:"class",name:r,addInitializer:k(o,s)})}finally{s.v=!0}void 0!==a&&(C(10,a),n=a)}return[n,function(){for(var e=0;e<o.length;e++)o[e].call(n)}]}}(e,o)}}}function $(e){return e}function I(){let e;return[new Promise((function(t){e=t})),e]}r=(0,i.wA)({selector:"ui-dropdown",styles:s.Z,standalone:!0,deps:[i.Th]}),new([v,n]=function(e,t,o){return{e:p(e,t),get c(){return function(e,t){if(t.length>0){for(var o=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var l=t[i](n,{kind:"class",name:r,addInitializer:a(o,s)})}finally{s.v=!0}void 0!==l&&(d(10,l),n=l)}return[n,function(){for(var e=0;e<o.length;e++)o[e].call(n)}]}}(e,o)}}}(class{constructor(e){this.dropdownOptions={...g},this.detailsNode=void 0,this.summaryNode=void 0,this.optionsContainerNode=void 0,this.isMultiSelect=!1,this.selectedOptions=[]}onPropertiesChanged(){if(this.dropdownOptions.options.length){this.dropdownOptions={...g,...this.dropdownOptions};const{multiple:e,resetDropdown:t}=this.dropdownOptions;t?(this.optionsContainerNode.innerHTML="",this.selectedOptions=[],this.dropdownOptions.options=this.dropdownOptions.options.map((function(e){return e.selected=!1,e}))):this.selectedOptions=this.dropdownOptions.options.filter((function(e){return!!e.selected})),this.isMultiSelect=e}}onOptionSelected(e,t,o){this.isMultiSelect?(this.dropdownOptions.options[o].selected=e,this.selectedOptions=this.dropdownOptions.options.filter((function(e){return!!e.selected}))):(this.detailsNode.removeAttribute("open"),this.selectedOptions=[t]),this.summaryNode.textContent=this.getSummaryText(),this.renderer.emitEvent("optionselected",{option:this.isMultiSelect?this.selectedOptions:t})}getSummaryText(){var e,t;return this.isMultiSelect?this.selectedOptions.length?(null==(e=(t=this.dropdownOptions).buttonText)?void 0:e.call(t,this.selectedOptions))||this.selectedOptions.map((function(e){return e.label})).join(","):this.dropdownOptions.defaultText:this.selectedOptions.length?this.selectedOptions[0].label:(this.dropdownOptions.options[0].selected=!0,this.dropdownOptions.options[0].label)}buildItems(){var e=this;const t=this.dropdownOptions.options.map((function(t,o){return i.dy`
        <li>
          <input
            name="select"
            id="id-${o}"
            type="${e.isMultiSelect?"checkbox":"radio"}"
            checked=${!!t.selected}
            onchange=${function(n){e.onOptionSelected(n.target.checked,t,o)}}
          />
          <label for="id-${o}"> ${t.label} </label>
        </li>
      `}));if(this.dropdownOptions.enableFilter){const o=i.dy` <li class="filter">
        <input
          type="search"
          oninput=${function(t){e.filterList(t)}}
        />
      </li>`;t.unshift(o)}return t}filterList(e){const t=e.target.value,o=this.optionsContainerNode.querySelectorAll("label");Array.from(o).forEach((function(e){const o=e.textContent||e.innerText;t?-1!==o.toLowerCase().indexOf(t)?e.parentElement.classList.remove("hide-item"):e.parentElement.classList.add("hide-item"):e.parentElement.classList.remove("hide-item")}))}onDropdownToggle(){this.detailsNode.open&&function(e){let t;const o=(((t=document.documentElement)||(t=document.body.parentNode))&&"number"==typeof t.scrollTop?t:document.body).scrollTop;return e.getBoundingClientRect().top-o>window.innerHeight/2}(this.optionsContainerNode)?this.detailsNode.classList.add("reverse"):this.detailsNode.classList.remove("reverse")}render(){var e=this;return this.dropdownOptions.options.length?i.dy`
        <details
          role="dropdown"
          class="${this.dropdownOptions.disable?"disabled":""}"
          ref=${function(t){e.detailsNode||(e.detailsNode=t)}}
          ontoggle=${function(){e.onDropdownToggle()}}
        >
          <summary
            ref=${function(t){e.summaryNode||(e.summaryNode=t)}}
          >
            ${this.getSummaryText()}
          </summary>
          <ul
            ref=${function(t){e.optionsContainerNode||(e.optionsContainerNode=t)}}
          >
            ${this.buildItems()}
          </ul>
        </details>
      `:i.dy``}},[],[r]).c,class extends h{constructor(){super(v),this.observedProperties=["dropdownOptions"],n()}});class M{constructor(){this.dialogRef=void 0,this.userInput=void 0,this.dialogActions=void 0,this.resolveDialogActions=void 0,this.resolveUserInput=void 0,[this.userInput,this.resolveUserInput]=I(),[this.dialogActions,this.resolveDialogActions]=I()}showModal(){return this.dialogRef.showModal(),this.userInput}close(){this.dialogRef.close()}getUserInput(){return this.userInput}getDialogActions(){return this.dialogActions}}let P,j;var z,N;function S(e,t){return function(o){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),R(o,"An initializer"),e.push(o)}}function B(e,t,o,n,r,i,s,a){var l;switch(r){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,d,u={kind:l,name:s?"#"+t:t,static:i,private:s},p={v:!1};0!==r&&(u.addInitializer=S(n,p)),0===r?s?(c=o.get,d=o.set):(c=function(){return this[t]},d=function(e){this[t]=e}):2===r?c=function(){return o.value}:(1!==r&&3!==r||(c=function(){return o.get.call(this)}),1!==r&&4!==r||(d=function(e){o.set.call(this,e)})),u.access=c&&d?{get:c,set:d}:c?{get:c}:{set:d};try{return e(a,u)}finally{p.v=!0}}function R(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function L(e,t){var o=typeof t;if(1===e){if("object"!==o||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&R(t.get,"accessor.get"),void 0!==t.set&&R(t.set,"accessor.set"),void 0!==t.init&&R(t.init,"accessor.init")}else if("function"!==o)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function U(e,t,o,n,r,i,s,a){var l,c,d,u,p,f,h=o[0];if(s?l=0===r||1===r?{get:o[3],set:o[4]}:3===r?{get:o[3]}:4===r?{set:o[3]}:{value:o[3]}:0!==r&&(l=Object.getOwnPropertyDescriptor(t,n)),1===r?d={get:l.get,set:l.set}:2===r?d=l.value:3===r?d=l.get:4===r&&(d=l.set),"function"==typeof h)void 0!==(u=B(h,n,l,a,r,i,s,d))&&(L(r,u),0===r?c=u:1===r?(c=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u);else for(var g=h.length-1;g>=0;g--){var v;void 0!==(u=B(h[g],n,l,a,r,i,s,d))&&(L(r,u),0===r?v=u:1===r?(v=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===r||1===r){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var m=c;c=function(e,t){for(var o=t,n=0;n<m.length;n++)o=m[n].call(e,o);return o}}else{var w=c;c=function(e,t){return w.call(e,t)}}e.push(c)}0!==r&&(1===r?(l.get=d.get,l.set=d.set):2===r?l.value=d:3===r?l.get=d:4===r&&(l.set=d),s?1===r?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===r?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,n,l))}function F(e,t){t&&e.push((function(e){for(var o=0;o<t.length;o++)t[o].call(e);return e}))}let _;var H,q,X,Y,Z;function G(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}w=(0,i.wA)({selector:"app-modal-dialog"}),new([P,m]=D(class extends M{constructor(){super(),this.modalData=void 0,this.modalClosedPromise=void 0,this.resolveModalClose=void 0,[this.modalClosedPromise,this.resolveModalClose]=I()}afterClosed(){return this.modalClosedPromise}onDialogClosed(){this.resolveModalClose(),this.resolveDialogActions(!0)}renderCloseButton(){var e=this;return this.modalData.hideDefaultCloseButton?i.dy``:i.dy`
        <button
          class="btn-close"
          onclick=${function(){e.close()}}
        >
          &times;
        </button>
      `}render(){var e=this;return this.modalData?i.dy`
        <dialog
          ref=${function(t){e.dialogRef=t}}
          onclose=${function(){e.onDialogClosed()}}
        >
          <div>${this.modalData.title} ${this.renderCloseButton()}</div>
          <section>${this.modalData.bodyTemplate}</section>
        </dialog>
      `:i.dy``}},[],[w]).c,class extends ${constructor(){super(P),this.observedProperties=["modalData"],m()}}),y=(0,i.wA)({selector:"app-alert-dialog"}),new([j,b]=D(class extends M{constructor(){super(),this.alertOptions=void 0}onConfirm(){this.resolveUserInput(!0),this.dialogRef.close(),this.resolveDialogActions(!0)}onCancel(){this.resolveUserInput(!1),this.dialogRef.close(),this.resolveDialogActions(!0)}renderActionButtons(){var e=this;return this.alertOptions.isAlert?i.dy`
        <button
          onclick=${function(){e.onConfirm()}}
        >
          Ok
        </button>
      `:i.dy`
        <button
          onclick=${function(){e.onCancel()}}
        >
          Cancel
        </button>
        <button
          onclick=${function(){e.onConfirm()}}
        >
          Ok
        </button>
      `}render(){var e=this;return this.alertOptions?i.dy`
        <dialog
          ref=${function(t){e.dialogRef=t}}
        >
          <section>${this.alertOptions.message}</section>
          <menu> ${this.renderActionButtons()} </menu>
        </dialog>
      `:i.dy``}},[],[y]).c,class extends ${constructor(){super(j),this.observedProperties=["alertOptions"],b()}}),N=(0,i.wA)({selector:"app-tree-view"}),[_,z]=(H=class{render(){return i.dy`tree view control`}},q=[],X=[N],{e:function(e,t){for(var o,n,r=[],i=new Map,s=new Map,a=0;a<t.length;a++){var l=t[a];if(Array.isArray(l)){var c,d,u=l[1],p=l[2],f=l.length>3,h=u>=5;if(h?(c=e,0!=(u-=5)&&(d=n=n||[])):(c=e.prototype,0!==u&&(d=o=o||[])),0!==u&&!f){var g=h?s:i,v=g.get(p)||0;if(!0===v||3===v&&4!==u||4===v&&3!==u)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!v&&u>2?g.set(p,u):g.set(p,!0)}U(r,c,l,p,u,h,f,d)}}return F(r,o),F(r,n),r}(H,q),get c(){return function(e,t){if(t.length>0){for(var o=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var a=t[i](n,{kind:"class",name:r,addInitializer:S(o,s)})}finally{s.v=!0}void 0!==a&&(L(10,a),n=a)}return[n,function(){for(var e=0;e<o.length;e++)o[e].call(n)}]}}(H,X)}}).c,z();var W=0;function J(e){return"__private_"+W+++"_"+e}function K(e,t){return function(o){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),V(o,"An initializer"),e.push(o)}}function Q(e,t,o,n,r,i,s,a){var l;switch(r){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,d,u={kind:l,name:s?"#"+t:t,static:i,private:s},p={v:!1};0!==r&&(u.addInitializer=K(n,p)),0===r?s?(c=o.get,d=o.set):(c=function(){return this[t]},d=function(e){this[t]=e}):2===r?c=function(){return o.value}:(1!==r&&3!==r||(c=function(){return o.get.call(this)}),1!==r&&4!==r||(d=function(e){o.set.call(this,e)})),u.access=c&&d?{get:c,set:d}:c?{get:c}:{set:d};try{return e(a,u)}finally{p.v=!0}}function V(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function ee(e,t){var o=typeof t;if(1===e){if("object"!==o||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&V(t.get,"accessor.get"),void 0!==t.set&&V(t.set,"accessor.set"),void 0!==t.init&&V(t.init,"accessor.init")}else if("function"!==o)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function te(e,t,o,n,r,i,s,a){var l,c,d,u,p,f,h=o[0];if(s?l=0===r||1===r?{get:o[3],set:o[4]}:3===r?{get:o[3]}:4===r?{set:o[3]}:{value:o[3]}:0!==r&&(l=Object.getOwnPropertyDescriptor(t,n)),1===r?d={get:l.get,set:l.set}:2===r?d=l.value:3===r?d=l.get:4===r&&(d=l.set),"function"==typeof h)void 0!==(u=Q(h,n,l,a,r,i,s,d))&&(ee(r,u),0===r?c=u:1===r?(c=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u);else for(var g=h.length-1;g>=0;g--){var v;void 0!==(u=Q(h[g],n,l,a,r,i,s,d))&&(ee(r,u),0===r?v=u:1===r?(v=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===r||1===r){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var m=c;c=function(e,t){for(var o=t,n=0;n<m.length;n++)o=m[n].call(e,o);return o}}else{var w=c;c=function(e,t){return w.call(e,t)}}e.push(c)}0!==r&&(1===r?(l.get=d.get,l.set=d.set):2===r?l.value=d:3===r?l.get=d:4===r&&(l.set=d),s?1===r?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===r?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,n,l))}function oe(e,t){for(var o,n,r=[],i=new Map,s=new Map,a=0;a<t.length;a++){var l=t[a];if(Array.isArray(l)){var c,d,u=l[1],p=l[2],f=l.length>3,h=u>=5;if(h?(c=e,0!=(u-=5)&&(d=n=n||[])):(c=e.prototype,0!==u&&(d=o=o||[])),0!==u&&!f){var g=h?s:i,v=g.get(p)||0;if(!0===v||3===v&&4!==u||4===v&&3!==u)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!v&&u>2?g.set(p,u):g.set(p,!0)}te(r,c,l,p,u,h,f,d)}}return ne(r,o),ne(r,n),r}function ne(e,t){t&&e.push((function(e){for(var o=0;o<t.length;o++)t[o].call(e);return e}))}const re={modalTitle:"",hideDefaultCloseButton:!1,preventBackdropClose:!0,preventEsc:!1,renderTemplate:function(){return html``}};let ie;Z=(0,i.GS)();var se,ae,le,ce,de=J("createComponent"),ue=J("removeComponent"),pe=J("prompt");function fe(e,t){const o=document.createElement(e);return document.body.appendChild(o),o.setProps(t),queueMicrotask((function(){o.getInstance().showModal()})),o}function he(e){document.body.removeChild(e)}function ge(e,t){var o=this;const n=G(this,de)[de]("app-alert-dialog",{alertOptions:{message:e,isAlert:t}}),r=n.getInstance();return r.getDialogActions().then((function(e){e&&G(o,ue)[ue](n)})),{getUserInput:function(){return r.getUserInput()}}}function ve(e,t){return function(o){(function(e,t){if(e.v)throw new Error("attempted to call addInitializer after decoration was finished")})(t),we(o,"An initializer"),e.push(o)}}function me(e,t,o,n,r,i,s,a){var l;switch(r){case 1:l="accessor";break;case 2:l="method";break;case 3:l="getter";break;case 4:l="setter";break;default:l="field"}var c,d,u={kind:l,name:s?"#"+t:t,static:i,private:s},p={v:!1};0!==r&&(u.addInitializer=ve(n,p)),0===r?s?(c=o.get,d=o.set):(c=function(){return this[t]},d=function(e){this[t]=e}):2===r?c=function(){return o.value}:(1!==r&&3!==r||(c=function(){return o.get.call(this)}),1!==r&&4!==r||(d=function(e){o.set.call(this,e)})),u.access=c&&d?{get:c,set:d}:c?{get:c}:{set:d};try{return e(a,u)}finally{p.v=!0}}function we(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function be(e,t){var o=typeof t;if(1===e){if("object"!==o||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&we(t.get,"accessor.get"),void 0!==t.set&&we(t.set,"accessor.set"),void 0!==t.init&&we(t.init,"accessor.init")}else if("function"!==o)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function ye(e,t,o,n,r,i,s,a){var l,c,d,u,p,f,h=o[0];if(s?l=0===r||1===r?{get:o[3],set:o[4]}:3===r?{get:o[3]}:4===r?{set:o[3]}:{value:o[3]}:0!==r&&(l=Object.getOwnPropertyDescriptor(t,n)),1===r?d={get:l.get,set:l.set}:2===r?d=l.value:3===r?d=l.get:4===r&&(d=l.set),"function"==typeof h)void 0!==(u=me(h,n,l,a,r,i,s,d))&&(be(r,u),0===r?c=u:1===r?(c=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u);else for(var g=h.length-1;g>=0;g--){var v;void 0!==(u=me(h[g],n,l,a,r,i,s,d))&&(be(r,u),0===r?v=u:1===r?(v=u.init,p=u.get||d.get,f=u.set||d.set,d={get:p,set:f}):d=u,void 0!==v&&(void 0===c?c=v:"function"==typeof c?c=[c,v]:c.push(v)))}if(0===r||1===r){if(void 0===c)c=function(e,t){return t};else if("function"!=typeof c){var m=c;c=function(e,t){for(var o=t,n=0;n<m.length;n++)o=m[n].call(e,o);return o}}else{var w=c;c=function(e,t){return w.call(e,t)}}e.push(c)}0!==r&&(1===r?(l.get=d.get,l.set=d.set):2===r?l.value=d:3===r?l.get=d:4===r&&(l.set=d),s?1===r?(e.push((function(e,t){return d.get.call(e,t)})),e.push((function(e,t){return d.set.call(e,t)}))):2===r?e.push(d):e.push((function(e,t){return d.call(e,t)})):Object.defineProperty(t,n,l))}function ke(e,t){for(var o,n,r=[],i=new Map,s=new Map,a=0;a<t.length;a++){var l=t[a];if(Array.isArray(l)){var c,d,u=l[1],p=l[2],f=l.length>3,h=u>=5;if(h?(c=e,0!=(u-=5)&&(d=n=n||[])):(c=e.prototype,0!==u&&(d=o=o||[])),0!==u&&!f){var g=h?s:i,v=g.get(p)||0;if(!0===v||3===v&&4!==u||4===v&&3!==u)throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!v&&u>2?g.set(p,u):g.set(p,!0)}ye(r,c,l,p,u,h,f,d)}}return Oe(r,o),Oe(r,n),r}function Oe(e,t){t&&e.push((function(e){for(var o=0;o<t.length;o++)t[o].call(e);return e}))}function xe(e,t,o){return{e:ke(e,t),get c(){return function(e,t){if(t.length>0){for(var o=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var a=t[i](n,{kind:"class",name:r,addInitializer:ve(o,s)})}finally{s.v=!0}void 0!==a&&(be(10,a),n=a)}return[n,function(){for(var e=0;e<o.length;e++)o[e].call(n)}]}}(e,o)}}}let Ce,Te;[ie,Y]=function(e,t,o){return{e:oe(e,[]),get c(){return function(e,t){if(t.length>0){for(var o=[],n=e,r=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var a=t[i](n,{kind:"class",name:r,addInitializer:K(o,s)})}finally{s.v=!0}void 0!==a&&(ee(10,a),n=a)}return[n,function(){for(var e=0;e<o.length;e++)o[e].call(n)}]}}(e,o)}}}(class{constructor(){Object.defineProperty(this,pe,{value:ge}),Object.defineProperty(this,ue,{value:he}),Object.defineProperty(this,de,{value:fe})}alert(e){return G(this,pe)[pe](e,!0)}confirm(e){return G(this,pe)[pe](e,!1)}modal(e){var t=this;const o={...re,...e};console.log(o);const n=G(this,de)[de]("app-modal-dialog",{modalData:{title:o.modalTitle,hideDefaultCloseButton:o.hideDefaultCloseButton,bodyTemplate:o.renderTemplate()}}),r=n.getInstance();if(r.getDialogActions().then((function(e){e&&G(t,ue)[ue](n)})),!o.preventBackdropClose){const e=r.dialogRef.getBoundingClientRect(),t=(0,i.RB)(r.dialogRef,"click",(function(o){e.top<=o.clientY&&o.clientY<=e.top+e.height&&e.left<=o.clientX&&o.clientX<=e.left+e.width||(r.close(),t())}))}return o.preventEsc&&(0,i.RB)(r.dialogRef,"cancel",(function(e){e.preventDefault()})),{close:function(){return r.close()},afterClosed:function(){return r.afterClosed()}}}},0,[Z]).c,Y(),ae=(0,i.wA)({selector:"app-nested-modal",deps:[i.Th]}),[Ce,se]=xe(class{constructor(e){}closeModal(){this.renderer.emitEvent("closenestedmodal")}render(){var e=this;return i.dy`
      i'm in a nested modal.
      <div>
        <button
          onclick=${function(){e.closeModal()}}
        >
          close this modal
        </button>
      </div>
    `}},[],[ae]).c,se(),ce=(0,i.wA)({selector:"app-controls",deps:[ie]}),[Te,le]=xe(class{constructor(e){this.dropdownComp=void 0,this.dropdownOptions={options:[{label:"Option 1",value:"o1"},{label:"Option 2",value:"o2",selected:!0},{label:"Option 3",value:"o3"},{label:"Option 4",value:"o4"}],defaultText:"Select Multiple",buttonText:function(e){return 0===e.length?"None selected":e.length>3?e.length+" selected":e.map((function(e){return e.label})).join(", ")}}}enableMultiselect(e){this.dropdownOptions.multiple=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}disableDropdown(e){this.dropdownOptions.disable=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}enableFilter(e){this.dropdownOptions.enableFilter=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}showAlert(){this.dialogService.alert("hello world").getUserInput().then((function(e){console.log(e)}))}showConfirm(){this.dialogService.confirm("hello world").getUserInput().then((function(e){console.log(e)}))}showModal(){var e=this;this.dialogService.modal({modalTitle:"Hello World",hideDefaultCloseButton:!1,preventEsc:!1,renderTemplate:function(){return i.dy`<p>i'm inside a modal</p>
        <button
          onclick=${function(){e.showNestedModal()}}
        >
          open nested modal
        </button> `}}).afterClosed().then((function(){console.log("modal closed")}))}showNestedModal(){const e=this.dialogService.modal({hideDefaultCloseButton:!0,renderTemplate:function(){return i.dy`<app-nested-modal
          onclosenestedmodal=${function(){e.close()}}
        ></app-nested-modal>`}})}render(){var e=this;return i.dy`
      <fieldset class="fieldset">
        <legend>Dropdown</legend>
        <button onclick=${function(){e.dropdownOptions.resetDropdown=!0,e.dropdownComp.setProps({dropdownOptions:e.dropdownOptions})}}>Reset</button>
        <div style="display: flex; align-items: center;">
          enable multi select: <input type='checkbox' role='switch' onchange=${function(t){return e.enableMultiselect(t.target.checked)}}></input>
        </div>
        <div style="display: flex; align-items: center;">
          disable dropdown: <input type='checkbox' role='switch' onchange=${function(t){return e.disableDropdown(t.target.checked)}}></input>
        </div>
        <div style="display: flex; align-items: center;">
          enable filtering: <input type='checkbox' role='switch' onchange=${function(t){return e.enableFilter(t.target.checked)}}></input>
        </div>
        <ui-dropdown
          class="is-inline-block"
          ref=${function(t){e.dropdownComp=t}}
          onbindprops=${function(){return{dropdownOptions:e.dropdownOptions}}}
          onoptionselected=${function(e){console.log(e.detail)}}>
        </ui-dropdown>
      </fieldset>
      <app-modal-dialog></app-modal-dialog>
      <div style="display: flex; align-items: center;">
        Switch: <input type='checkbox' role='switch'></input>
      </div>
      <div>
        <button onclick=${function(){e.showAlert()}}>show alert</button>
        <button onclick=${function(){e.showConfirm()}}>show confirm</button>
        <button onclick=${function(){e.showModal()}}>show modal</button>
      </div>
      <div>
        <app-tree-view></app-tree-view>
      </div>
    `}},[],[ce]).c,le()},2735:(e,t,o)=>{o.d(t,{Z:()=>h});var n=o(8081),r=o.n(n),i=o(3645),s=o.n(i),a=o(1667),l=o.n(a),c=new URL(o(6240),o.b),d=new URL(o(6035),o.b),u=s()(r()),p=l()(c),f=l()(d);u.push([e.id,'details[role=dropdown]{position:relative}details[role=dropdown].disabled{cursor:not-allowed}details[role=dropdown].disabled>summary{pointer-events:none;color:rgba(16,16,16,.3)}details[role=dropdown]>summary{list-style:none;position:relative;cursor:pointer;padding:.5rem 1rem;color:inherit;border:1px solid #ccc;border-radius:var(--border-radius);margin-bottom:0}details[role=dropdown]>summary::-webkit-details-marker{display:none}details[role=dropdown]>summary::after{content:"";height:1em;width:1em;font-size:26px;pointer-events:none;background-image:url('+p+');background-repeat:no-repeat;background-position:center;float:right}details[role=dropdown][open]>summary{border-bottom-left-radius:0;border-bottom-right-radius:0}details[role=dropdown][open]>summary::before{position:fixed;top:0;right:0;bottom:0;left:0;z-index:80;display:block;cursor:default;content:" ";background:rgba(0,0,0,0)}details[role=dropdown][open]>summary::after{transform:rotate(180deg)}details[role=dropdown] summary+ul{position:absolute;top:auto;left:0px;right:0px;border:1px solid #ccc;border-top:none;border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);background-color:#fff;z-index:100;list-style:none;margin:0;padding:0}details[role=dropdown] summary+ul li{box-sizing:border-box;padding:0;margin:0;color:inherit}details[role=dropdown] summary+ul li::marker{content:""}details[role=dropdown] summary+ul li.filter{padding:.5rem 1rem;background-color:#eee;border-bottom:1px solid #ccc}details[role=dropdown] summary+ul li.filter input[type=search]{width:100%;padding:4px}details[role=dropdown] summary+ul li.hide-item{display:none}details[role=dropdown] summary+ul li input[type=radio],details[role=dropdown] summary+ul li input[type=checkbox]{position:absolute;opacity:0}details[role=dropdown] summary+ul li input[type=radio]:checked+label,details[role=dropdown] summary+ul li input[type=checkbox]:checked+label{border-left-color:#3273dc}details[role=dropdown] summary+ul li input[type=checkbox]+label:before{content:"";margin-right:4px;display:inline-block;width:20px;height:20px;background-color:#fff;border:1px solid;vertical-align:text-bottom}details[role=dropdown] summary+ul li input[type=checkbox]:checked+label:before{background-image:url('+f+");background-repeat:no-repeat;background-position:center;background-size:.8rem auto;background-color:#3273dc;border:1px solid #3273dc}details[role=dropdown] summary+ul li label{cursor:pointer;color:inherit;display:block;position:relative;padding:.5rem 1rem;border-left:3px solid rgba(0,0,0,0);white-space:nowrap;margin:0}details[role=dropdown] summary+ul li label:hover{background-color:#eee}details[role=dropdown][open].reverse>summary{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:2px;border-bottom-right-radius:2px}details[role=dropdown][open].reverse ul{top:auto;bottom:100%;border-bottom:none;border-top:1px solid #ccc;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-left-radius:0;border-bottom-right-radius:0}",""]);const h=u},6035:e=>{e.exports="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23FFF%27 stroke-width=%274%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%2720 6 9 17 4 12%27%3E%3C/polyline%3E%3C/svg%3E"},6240:e=>{e.exports="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgba%2865, 84, 98, 0.999%29%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E"}}]);