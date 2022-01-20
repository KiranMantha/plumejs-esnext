"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(e,s,t)=>{t.r(s);var n=t(1746);(0,n.wA)({selector:"app-persons"},class{constructor(){this.ulRef=void 0,this.personDetailsCompRef=void 0}mount(){var e=this;(0,n.sY)(this.ulRef,n.dy`
        loading
      `),fetch("https://jsonplaceholder.typicode.com/users").then((function(e){return e.json()})).then((function(s){let t=s.map((function(s){return n.dy`
            <li class="is-clickable"
              onclick="${function(){e.loadPersonDetails(s)}}"
            >
              ${s.name}
            </li>
          `}));(0,n.sY)(e.ulRef,n.dy`
            ${t}
          `)}))}loadPersonDetails(e){this.personDetailsCompRef.setProps({personDetails:e})}onUserClick(e){console.log("data from app-person-details comp: ",e)}render(){var e=this;return n.dy`
      <h6 class="title is-6">Persons route</h6>
      <ul class="block-list is-small" ref="${function(s){e.ulRef=s}}"></ul>
      <app-person-details
        ref="${function(s){e.personDetailsCompRef=s}}"
        onuserclick="${function(s){e.onUserClick(s.detail)}}"
      ></app-person-details>
    `}}),(0,n.wA)({selector:"app-person-details",deps:["Renderer"]},class{constructor(e){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var e,s=this;return null!=(e=this.personDetails)&&e.name?n.dy`
          <strong>Person Details</strong>
          <div>Name: ${this.personDetails.name}</div>
          <div>Company: ${this.personDetails.company.name}</div>
          <button class="button is-info is-light"
            onclick="${function(){s.sendDataToParent()}}"
          >
            click me and check console
          </button>
        `:n.dy`
          <div></div>
        `}})}}]);