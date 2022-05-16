"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{1494:(e,t,s)=>{s.r(t);var a=s(8975),r=s(1019),i=s(9669),l=s.n(i);(0,a.wA)({selector:"app-items",deps:[a.Th,r.F]},class{constructor(e,t){this.sheetForm=void 0,this.changeHandler=void 0,this.resetForm=void 0,this.apiUrl="https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4",this.table=void 0,this.personsList=[]}beforeMount(){[this.sheetForm,this.changeHandler,this.resetForm]=(0,a.uA)({name:["",a.kI.required],age:["",a.kI.required],salary:["",a.kI.required]})}mount(){console.table(this.routerSrvc.getCurrentRoute()),this.getData()}getErrorSummary(){console.log(this.sheetForm.errors)}submitForm(e){var t=this;e.preventDefault(),this.sheetForm.valid?l().post(this.apiUrl,this.sheetForm.value).then((function(e){return e.data})).then((function(e){t.personsList.push(...e),t.resetForm(),t.renderer.update()})):this.getErrorSummary()}getData(){var e=this;l().get(this.apiUrl).then((function(e){return e.data})).then((function(t){e.personsList=[...t],e.renderer.update()}))}render(){var e=this;return a.dy`
      <form
        onsubmit=${function(t){e.submitForm(t)}}
      >
        <div class="field">
          <label class="label" for="exampleInputEmail1">Name</label>
          <div class="control">
            <input
              type="text"
              class="input"
              id="name"
              value=${this.sheetForm.get("name").value}
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
              id="age"
              value=${this.sheetForm.get("age").value}
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
              id="salary"
              value=${this.sheetForm.get("salary").value}
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
    `}})}}]);