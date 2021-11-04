"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{494:(e,t,s)=>{s.r(t);var a=s(746),i=s(669),l=s.n(i);let r=["Renderer",class{constructor(e){this.sheetFormFields=void 0,this.changeHandler=void 0,this.resetForm=void 0,this.apiUrl="https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4",this.table=void 0,this.personsList=[]}beforeMount(){const{formFields:e,createChangeHandler:t,resetFormFields:s}=(0,a.uA)({name:"",age:"",salary:""});this.sheetFormFields=e,this.changeHandler=t,this.resetForm=s}mount(){this.getData()}submitForm(e){var t=this;e.preventDefault(),l().post(this.apiUrl,this.sheetFormFields).then((function(e){t.personsList.push(...e.data),t.resetForm(),t.renderer.update()}))}getData(){var e=this;l().get(this.apiUrl).then((function(t){e.personsList=[...t.data],e.renderer.update()}))}render(){var e=this;return a.dy`
        <form
          onsubmit=${function(t){e.submitForm(t)}}
        >
        <div class="field">
          <label class="label" for="exampleInputEmail1">Name</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id='name'
              value=${this.sheetFormFields.name}
              onchange=${this.changeHandler("name")}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="exampleInputPassword1">Age</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id='age'
              value=${this.sheetFormFields.age}
              onchange=${this.changeHandler("age")}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="exampleInputPassword1">Salary</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id='salary'
              value=${this.sheetFormFields.salary}
              onchange=${this.changeHandler("salary")}
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button  is-info is-light" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <table class="table is-hoverable">
        <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Salary</td>
            </tr>
        </thead>
        <tbody>
        ${this.personsList.map((function(e){return a.dy`
            <tr>
              <td>${e.name}</td>
              <td>${e.age}</td>
              <td>${e.salary}</td>
            </tr>
          `}))}
        </tbody>
      </table>
      `}}];(0,a.wA)({selector:"app-items"},r)}}]);