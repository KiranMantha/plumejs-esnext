"use strict";(self.webpackChunkplumejs_esnext=self.webpackChunkplumejs_esnext||[]).push([[494],{1494:(e,t,s)=>{s.r(t);var r=s(8648),a=s(8975),i=s(1019);(0,a.wA)({selector:"app-items",deps:[a.Th,i.F]},class{constructor(e,t){this.sheetForm=void 0,this.changeHandler=void 0,this.resetForm=void 0,this.apiUrl="https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4",this.table=void 0,this.personsList=[],this.errorsRef=void 0}beforeMount(){[this.sheetForm,this.changeHandler,this.resetForm]=(0,a.uA)({name:["",a.kI.required],age:["",a.kI.required],salary:["",a.kI.required]})}mount(){console.table(this.routerSrvc.getCurrentRoute()),this.getData()}getErrorSummary(){console.log(this.sheetForm.errors),this.errorsRef.innerHTML=JSON.stringify(Object.fromEntries(this.sheetForm.errors),null,4).trim()}submitForm(e){var t=this;e.preventDefault(),this.errorsRef.innerHTML="",this.sheetForm.valid?r.Z.post(this.apiUrl,this.sheetForm.value).then((function(e){return e.data})).then((function(e){t.personsList.push(...e),t.sheetForm.reset(),t.renderer.update()})):this.getErrorSummary()}getData(){var e=this;r.Z.get(this.apiUrl).then((function(e){return e.data})).then((function(t){e.personsList=[...t],e.renderer.update()}))}render(){var e=this;return a.dy`
      <section>
        <pre>
          <code ref=${function(t){e.errorsRef=t}}></code>
        </pre>
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
        <table class="table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
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
      </section>
    `}})}}]);