"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[518],{5518:(t,e,a)=>{a.r(e);var r=a(8975);class o{constructor(){this.categories=[{id:1,name:"category 1",questions:[{id:1,name:"how are you",type:"text"},{id:2,name:"what you do",type:"text"}]},{id:2,name:"category 2",questions:[]}]}onNativeAttributeChanges(t,e,a){console.log(t,e,a)}render(){return r.dy`
      <table class="table-bordered table-hover">
        <caption>
          Nested Table / Table with expandable rows
        </caption>
        <thead>
          <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th></th>
          </tr>
        </thead>
        ${this.categories.map((function(t){return r.dy`<app-row-item
            onbindprops=${function(){return{category:t}}}
          ></app-row-item>`}))}
      </table>
    `}}o.observedAttributes=["name"],(0,r.wA)({selector:"app-row-item",styles:":host {\n      display: table-row-group;\n  }\n  .hide-row {\n      display: none;\n  }\n  :host > tr > td[colspan] table {\n      margin: 0;\n  }\n  "},class{constructor(){this.ObservedProperties=["category"],this.category=void 0,this.nestedRow=void 0}toggleNestedTable(){this.nestedRow.classList.toggle("hide-row")}populateNestedTable(){return this.category.questions.length?this.category.questions.map((function(t){return r.dy`<tr>
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.type}</td>
        </tr>`})):r.dy`<tr>
        <td colspan="3">Please add a question</td>
      </tr>`}render(){var t=this;return this.category?r.dy`
        <tr part="table-row">
          <td part="table-cell">${this.category.id}</td>
          <td part="table-cell">${this.category.name}</td>
          <td part="table-cell">
            <button
              onclick=${function(){t.toggleNestedTable()}}
            >
              toggle
            </button>
          </td>
        </tr>
        <tr
          part="table-row"
          ref=${function(e){t.nestedRow=e}}
          class="hide-row"
        >
          <td colspan="3">
            <table class="table-bordered">
              <thead>
                <tr>
                  <th>Question Id</th>
                  <th>Question</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                ${this.populateNestedTable()}
              </tbody>
            </table>
          </td>
        </tr>
      `:r.dy``}}),(0,r.wA)({selector:"app-nested-table"},o)}}]);