"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[806],{806:(e,t,o)=>{o.r(t);var n=o(8975),i=o(34);function r(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var s=0;function l(e){return"__private_"+s+++"_"+e}const d={options:[],multiple:!1,defaultText:"Select",buttonText:null,enableFilter:!1,disable:!1,resetDropdown:!1};var a=l("detailsNode"),p=l("summaryNode"),c=l("optionsContainerNode"),u=l("isMultiSelect"),h=l("selectedOptions"),m=l("getSummaryText"),b=l("buildItems"),f=l("filterList"),w=l("onDropdownToggle");function g(){var e,t;return r(this,u)[u]?r(this,h)[h].length?(null==(e=(t=this.dropdownOptions).buttonText)?void 0:e.call(t,r(this,h)[h]))||r(this,h)[h].map((function(e){return e.label})).join(","):this.dropdownOptions.defaultText:r(this,h)[h].length?r(this,h)[h][0].label:(this.dropdownOptions.options[0].selected=!0,this.dropdownOptions.options[0].label)}function v(){var e=this;const t=this.dropdownOptions.options.map((function(t,o){return n.dy`
        <li>
          <input
            name="select"
            id="id-${o}"
            type="${r(e,u)[u]?"checkbox":"radio"}"
            checked=${!!t.selected}
            onchange=${function(n){e.onOptionSelected(n.target.checked,t,o)}}
          />
          <label for="id-${o}"> ${t.label} </label>
        </li>
      `}));if(this.dropdownOptions.enableFilter){const o=n.dy` <li class="filter">
        <input
          type="search"
          oninput=${function(t){r(e,f)[f](t)}}
        />
      </li>`;t.unshift(o)}return t}function y(e){const t=e.target.value,o=r(this,c)[c].querySelectorAll("label");Array.from(o).forEach((function(e){const o=e.textContent||e.innerText;t?-1!==o.toLowerCase().indexOf(t)?e.parentElement.classList.remove("hide-item"):e.parentElement.classList.add("hide-item"):e.parentElement.classList.remove("hide-item")}))}function O(){r(this,a)[a].open&&function(e){let t;const o=(((t=document.documentElement)||(t=document.body.parentNode))&&"number"==typeof t.scrollTop?t:document.body).scrollTop;return e.getBoundingClientRect().top-o>window.innerHeight/2}(r(this,c)[c])?r(this,a)[a].classList.add("reverse"):r(this,a)[a].classList.remove("reverse")}function k(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}(0,n.wA)({selector:"ui-dropdown",styles:i.Z,standalone:!0,deps:[n.Th]},class{constructor(e){Object.defineProperty(this,w,{value:O}),Object.defineProperty(this,f,{value:y}),Object.defineProperty(this,b,{value:v}),Object.defineProperty(this,m,{value:g}),this.dropdownOptions={...d},Object.defineProperty(this,a,{writable:!0,value:void 0}),Object.defineProperty(this,p,{writable:!0,value:void 0}),Object.defineProperty(this,c,{writable:!0,value:void 0}),Object.defineProperty(this,u,{writable:!0,value:!1}),Object.defineProperty(this,h,{writable:!0,value:[]})}onPropsChanged(){if(this.dropdownOptions.options.length){this.dropdownOptions={...d,...this.dropdownOptions};const{multiple:e,resetDropdown:t}=this.dropdownOptions;t?(r(this,c)[c].innerHTML="",r(this,h)[h]=[],this.dropdownOptions.options=this.dropdownOptions.options.map((function(e){return e.selected=!1,e}))):r(this,h)[h]=this.dropdownOptions.options.filter((function(e){return!!e.selected})),r(this,u)[u]=e}}onOptionSelected(e,t,o){r(this,u)[u]?(this.dropdownOptions.options[o].selected=e,r(this,h)[h]=this.dropdownOptions.options.filter((function(e){return!!e.selected}))):(r(this,a)[a].removeAttribute("open"),r(this,h)[h]=[t]),r(this,p)[p].textContent=r(this,m)[m](),this.renderer.emitEvent("optionselected",{option:r(this,u)[u]?r(this,h)[h]:t})}render(){var e=this;return this.dropdownOptions.options.length?n.dy`
        <details
          role="dropdown"
          class="${this.dropdownOptions.disable?"disabled":""}"
          ref=${function(t){r(e,a)[a]||(r(e,a)[a]=t)}}
          ontoggle=${function(){r(e,w)[w]()}}
        >
          <summary
            ref=${function(t){r(e,p)[p]||(r(e,p)[p]=t)}}
          >
            ${r(this,m)[m]()}
          </summary>
          <ul
            ref=${function(t){r(e,c)[c]||(r(e,c)[c]=t)}}
          >
            ${r(this,b)[b]()}
          </ul>
        </details>
      `:n.dy``}});var x=0;function C(e){return"__private_"+x+++"_"+e}function $(){let e;return[new Promise((function(t){e=t})),e]}var D=C("userInput"),P=C("dialogActions");class T{constructor(){this.dialogRef=void 0,Object.defineProperty(this,D,{writable:!0,value:void 0}),Object.defineProperty(this,P,{writable:!0,value:void 0}),this.resolveDialogActions=void 0,this.resolveUserInput=void 0,[k(this,D)[D],this.resolveUserInput]=$(),[k(this,P)[P],this.resolveDialogActions]=$()}showModal(){return this.dialogRef.showModal(),this.userInput}close(){this.dialogRef.close()}getUserInput(){return k(this,D)[D]}getDialogActions(){return k(this,P)[P]}}var j=C("modalClosedPromise"),A=C("resolveModalClose");function E(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}(0,n.wA)({selector:"app-alert-dialog"},class extends T{constructor(){super(),this.ObservedProperties=["alertOptions"],this.alertOptions=void 0}onConfirm(){this.resolveUserInput(!0),this.dialogRef.close(),this.resolveDialogActions(!0)}onCancel(){this.resolveUserInput(!1),this.dialogRef.close(),this.resolveDialogActions(!0)}renderActionButtons(){var e=this;return this.alertOptions.isAlert?n.dy`
        <button
          onclick=${function(){e.onConfirm()}}
        >
          Ok
        </button>
      `:n.dy`
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
      `}render(){var e=this;return this.alertOptions?n.dy`
        <dialog
          ref=${function(t){e.dialogRef=t}}
        >
          <section>${this.alertOptions.message}</section>
          <menu> ${this.renderActionButtons()} </menu>
        </dialog>
      `:n.dy``}}),(0,n.wA)({selector:"app-modal-dialog"},class extends T{constructor(){super(),this.ObservedProperties=["modalData"],this.modalData=void 0,Object.defineProperty(this,j,{writable:!0,value:void 0}),Object.defineProperty(this,A,{writable:!0,value:void 0}),[k(this,j)[j],k(this,A)[A]]=$()}afterClosed(){return k(this,j)[j]}onDialogClosed(){k(this,A)[A](),this.resolveDialogActions(!0)}renderCloseButton(){var e=this;return this.modalData.hideDefaultCloseButton?n.dy``:n.dy`
        <button
          class="btn-close"
          onclick=${function(){e.close()}}
        >
          &times;
        </button>
      `}render(){var e=this;return this.modalData?n.dy`
        <dialog
          ref=${function(t){e.dialogRef=t}}
          onclose=${function(){e.onDialogClosed()}}
        >
          <div>${this.modalData.title} ${this.renderCloseButton()}</div>
          <section>${this.modalData.bodyTemplate}</section>
        </dialog>
      `:n.dy``}}),(0,n.wA)({selector:"app-tree-view"},class{render(){return n.dy`tree view control`}});var B=0;function M(e){return"__private_"+B+++"_"+e}const R={modalTitle:"",hideDefaultCloseButton:!1,preventBackdropClose:!0,preventEsc:!1,renderTemplate:function(){return html``}};var I=M("createComponent"),_=M("removeComponent"),S=M("prompt");class U{constructor(){Object.defineProperty(this,S,{value:N}),Object.defineProperty(this,_,{value:F}),Object.defineProperty(this,I,{value:L})}alert(e){return E(this,S)[S](e,!0)}confirm(e){return E(this,S)[S](e,!1)}modal(e){var t=this;const o={...R,...e};console.log(o);const i=E(this,I)[I]("app-modal-dialog",{modalData:{title:o.modalTitle,hideDefaultCloseButton:o.hideDefaultCloseButton,bodyTemplate:o.renderTemplate()}}),r=i.getInstance();if(r.showModal(),r.getDialogActions().then((function(e){e&&E(t,_)[_](i)})),!o.preventBackdropClose){const e=r.dialogRef.getBoundingClientRect(),t=(0,n.b9)(r.dialogRef,"click",(function(o){e.top<=o.clientY&&o.clientY<=e.top+e.height&&e.left<=o.clientX&&o.clientX<=e.left+e.width||(r.close(),t())}))}return o.preventEsc&&(0,n.b9)(r.dialogRef,"cancel",(function(e){e.preventDefault()})),{close:function(){return r.close()},afterClosed:function(){return r.afterClosed()}}}}function L(e,t){const o=document.createElement(e);return document.body.appendChild(o),o.setProps(t),o}function F(e){document.body.removeChild(e)}function N(e,t){var o=this;const n=E(this,I)[I]("app-alert-dialog",{alertOptions:{message:e,isAlert:t}}),i=n.getInstance();return i.showModal(),i.getDialogActions().then((function(e){e&&E(o,_)[_](n)})),{getUserInput:function(){return i.getUserInput()}}}(0,n.t6)(U),(0,n.wA)({selector:"app-nested-modal",deps:[n.Th]},class{constructor(e){}closeModal(){this.renderer.emitEvent("closenestedmodal")}render(){var e=this;return n.dy`
      i'm in a nested modal.
      <div>
        <button
          onclick=${function(){e.closeModal()}}
        >
          close this modal
        </button>
      </div>
    `}}),(0,n.wA)({selector:"app-controls",deps:[U]},class{constructor(e){this.dropdownComp=void 0,this.dropdownOptions={options:[{label:"Option 1",value:"o1"},{label:"Option 2",value:"o2",selected:!0},{label:"Option 3",value:"o3"},{label:"Option 4",value:"o4"}],defaultText:"Select Multiple",buttonText:function(e){return 0===e.length?"None selected":e.length>3?e.length+" selected":e.map((function(e){return e.label})).join(", ")}}}enableMultiselect(e){this.dropdownOptions.multiple=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}disableDropdown(e){this.dropdownOptions.disable=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}enableFilter(e){this.dropdownOptions.enableFilter=e,this.dropdownOptions.resetDropdown=!0,this.dropdownComp.setProps({dropdownOptions:this.dropdownOptions})}showAlert(){this.dialogService.alert("hello world").getUserInput().then((function(e){console.log(e)}))}showConfirm(){this.dialogService.confirm("hello world").getUserInput().then((function(e){console.log(e)}))}showModal(){var e=this;this.dialogService.modal({modalTitle:"Hello World",hideDefaultCloseButton:!1,preventEsc:!1,renderTemplate:function(){return n.dy`<p>i'm inside a modal</p>
        <button
          onclick=${function(){e.showNestedModal()}}
        >
          open nested modal
        </button> `}}).afterClosed().then((function(){console.log("modal closed")}))}showNestedModal(){const e=this.dialogService.modal({hideDefaultCloseButton:!0,renderTemplate:function(){return n.dy`<app-nested-modal
          onclosenestedmodal=${function(){e.close()}}
        ></app-nested-modal>`}})}render(){var e=this;return n.dy`
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
    `}})},34:(e,t,o)=>{o.d(t,{Z:()=>m});var n=o(8081),i=o.n(n),r=o(3645),s=o.n(r),l=o(1667),d=o.n(l),a=new URL(o(6240),o.b),p=new URL(o(6035),o.b),c=s()(i()),u=d()(a),h=d()(p);c.push([e.id,'details[role=dropdown]{position:relative}details[role=dropdown].disabled{cursor:not-allowed}details[role=dropdown].disabled>summary{pointer-events:none;color:rgba(16,16,16,.3)}details[role=dropdown]>summary{list-style:none;position:relative;cursor:pointer;padding:.5rem 1rem;color:inherit;border:1px solid #ccc;border-radius:var(--border-radius);margin-bottom:0}details[role=dropdown]>summary::-webkit-details-marker{display:none}details[role=dropdown]>summary::after{content:"";height:1em;width:1em;font-size:26px;pointer-events:none;background-image:url('+u+');background-repeat:no-repeat;background-position:center;float:right}details[role=dropdown][open]>summary{border-bottom-left-radius:0;border-bottom-right-radius:0}details[role=dropdown][open]>summary::before{position:fixed;top:0;right:0;bottom:0;left:0;z-index:80;display:block;cursor:default;content:" ";background:rgba(0,0,0,0)}details[role=dropdown][open]>summary::after{transform:rotate(180deg)}details[role=dropdown] summary+ul{position:absolute;top:auto;left:0px;right:0px;border:1px solid #ccc;border-top:none;border-bottom-left-radius:var(--border-radius);border-bottom-right-radius:var(--border-radius);background-color:#fff;z-index:100;list-style:none;margin:0;padding:0}details[role=dropdown] summary+ul li{box-sizing:border-box;padding:0;margin:0;color:inherit}details[role=dropdown] summary+ul li::marker{content:""}details[role=dropdown] summary+ul li.filter{padding:.5rem 1rem;background-color:#eee;border-bottom:1px solid #ccc}details[role=dropdown] summary+ul li.filter input[type=search]{width:100%;padding:4px}details[role=dropdown] summary+ul li.hide-item{display:none}details[role=dropdown] summary+ul li input[type=radio],details[role=dropdown] summary+ul li input[type=checkbox]{position:absolute;opacity:0}details[role=dropdown] summary+ul li input[type=radio]:checked+label,details[role=dropdown] summary+ul li input[type=checkbox]:checked+label{border-left-color:#3273dc}details[role=dropdown] summary+ul li input[type=checkbox]+label:before{content:"";margin-right:4px;display:inline-block;width:20px;height:20px;background-color:#fff;border:1px solid;vertical-align:text-bottom}details[role=dropdown] summary+ul li input[type=checkbox]:checked+label:before{background-image:url('+h+");background-repeat:no-repeat;background-position:center;background-size:.8rem auto;background-color:#3273dc;border:1px solid #3273dc}details[role=dropdown] summary+ul li label{cursor:pointer;color:inherit;display:block;position:relative;padding:.5rem 1rem;border-left:3px solid rgba(0,0,0,0);white-space:nowrap;margin:0}details[role=dropdown] summary+ul li label:hover{background-color:#eee}details[role=dropdown][open].reverse>summary{border-top-left-radius:0;border-top-right-radius:0;border-bottom-left-radius:2px;border-bottom-right-radius:2px}details[role=dropdown][open].reverse ul{top:auto;bottom:100%;border-bottom:none;border-top:1px solid #ccc;border-top-left-radius:2px;border-top-right-radius:2px;border-bottom-left-radius:0;border-bottom-right-radius:0}",""]);const m=c},6035:e=>{e.exports="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23FFF%27 stroke-width=%274%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%2720 6 9 17 4 12%27%3E%3C/polyline%3E%3C/svg%3E"},6240:e=>{e.exports="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgba%2865, 84, 98, 0.999%29%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E"}}]);