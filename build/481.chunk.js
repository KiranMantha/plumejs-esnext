"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(e,s,n)=>{n.r(s);var t=n(8975),o=n(9669),i=n.n(o);(0,t.wA)({selector:"app-persons"},class{constructor(){this.ulRef=void 0,this.personDetailsCompRef=void 0}mount(){var e=this;(0,t.sY)(this.ulRef,t.dy` loading `),i().get("https://jsonplaceholder.typicode.com/users").then((function(e){return e.data})).then((function(s){let n=s.map((function(s){return t.dy`
            <li
              class="is-clickable"
              onclick="${function(){e.loadPersonDetails(s)}}"
            >
              ${s.name}
            </li>
          `}));(0,t.sY)(e.ulRef,t.dy` ${n} `)}))}loadPersonDetails(e){this.personDetailsCompRef.setProps({personDetails:e})}onUserClick(e){console.log("data from app-person-details comp: ",e)}render(){var e=this;return t.dy`
      <h3>Persons route</h3>
      <ul
        ref="${function(s){e.ulRef=s}}"
      ></ul>
      <app-person-details
        ref="${function(s){e.personDetailsCompRef=s}}"
        onuserclick="${function(s){e.onUserClick(s.detail)}}"
      ></app-person-details>
    `}}),(0,t.wA)({selector:"app-person-details",deps:[t.Th]},class{constructor(e){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var e,s=this;return null!=(e=this.personDetails)&&e.name?t.dy`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${function(){s.sendDataToParent()}}"
        >
          click me and check console
        </button>
      `:t.dy` <div></div> `}})}}]);