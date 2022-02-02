"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[518],{5518:(t,e,o)=>{o.r(e);var s=o(6530);(0,s.wA)({selector:"app-row-item",styles:":host {\n      display: table-row-group;\n    }\n    .hide-row {\n        display: none;\n    }\n    :host > tr > td[colspan] table {\n        margin: 0;\n    }"},class{constructor(){this.ObservedProperties=["category"],this.category=void 0,this.nestedRow=void 0}toggleNestedTable(){this.nestedRow.classList.toggle("hide-row")}populateNestedTable(){return this.category.questions.length?this.category.questions.map((function(t){return s.dy`<tr>
          <td>${t.id}</td>
          <td>${t.name}</td>
          <td>${t.type}</td>
        </tr>`})):s.dy`<tr>
        <td colspan="3">Please add a question</td>
      </tr>`}render(){var t=this;return this.category?s.dy`
        <tr>
          <td>${this.category.id}</td>
          <td>${this.category.name}</td>
          <td>
            <button
              onclick=${function(){t.toggleNestedTable()}}
            >
              toggle
            </button>
          </td>
        </tr>
        <tr
          ref=${function(e){t.nestedRow=e}}
          class="hide-row"
        >
          <td colspan="3">
            <table>
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
      `:s.dy``}}),(0,s.wA)({selector:"app-nested-table"},class{constructor(){this.categories=[{id:1,name:"category 1",questions:[{id:1,name:"how are you",type:"text"},{id:2,name:"what you do",type:"text"}]},{id:2,name:"category 2",questions:[]}]}render(){return s.dy`
      <table>
        <thead>
          <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th></th>
          </tr>
        </thead>
        ${this.categories.map((function(t){return s.dy`<app-row-item
            onbindprops=${function(){return{category:t}}}
          ></app-row-item>`}))}
      </table>
    `}})}}]);