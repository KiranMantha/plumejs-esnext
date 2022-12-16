"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[481],{7481:(e,t,s)=>{s.r(t);var n=s(8648),o=s(8975);(0,o.wA)({selector:"app-persons",deps:[o.F0]},class{constructor(e){this.ulRef=void 0,this.personDetailsCompRef=void 0}mount(){var e=this;(0,o.sY)(this.ulRef,o.dy` loading `),n.Z.get("https://jsonplaceholder.typicode.com/users").then((function(e){return e.data})).then((function(t){let s=t.map((function(t){return o.dy`
            <li
              class="is-clickable"
              onclick="${function(){e.loadPersonDetails(t)}}"
            >
              ${t.name}
            </li>
          `}));(0,o.sY)(e.ulRef,o.dy` ${s} `)}))}loadRouteData(){const e=this.router.getCurrentRoute();return{path:e.path,routeParams:Object.fromEntries(e.routeParams),queryParams:Object.fromEntries(e.queryParams),state:e.state}}loadPersonDetails(e){this.personDetailsCompRef.setProps({personDetails:e})}onUserClick(e){console.log("data from app-person-details comp: ",e)}render(){var e=this;return o.dy`
      <h3>Persons route</h3>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.loadRouteData(),null,4)}</code></pre>
      </p>
      <ul ref="${function(t){e.ulRef=t}}"></ul>
      <app-person-details
        ref="${function(t){e.personDetailsCompRef=t}}"
        onuserclick="${function(t){e.onUserClick(t.detail)}}"
      ></app-person-details>
    `}}),(0,o.wA)({selector:"app-person-details",deps:[o.Th]},class{constructor(e){this.personDetails=void 0}sendDataToParent(){this.renderer.emitEvent("userclick",this.personDetails)}render(){var e,t=this;return null!=(e=this.personDetails)&&e.name?o.dy`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${function(){t.sendDataToParent()}}"
        >
          click me and check console
        </button>
      `:o.dy` <div></div> `}})}}]);