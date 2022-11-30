// @flow
import { Component, html, useFormFields, Renderer, Validators } from '../lib';
import { Router } from '../lib/router';
import axios from 'axios';

class ItemsComponent {
  sheetForm;
  changeHandler;
  resetForm;
  apiUrl = 'https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4';
  table;
  personsList = [];
  errorsRef;

  constructor(renderer, routerSrvc) {}

  beforeMount() {
    [this.sheetForm, this.changeHandler, this.resetForm] = useFormFields({
      name: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  mount() {
    console.table(this.routerSrvc.getCurrentRoute());
    this.getData();
  }

  getErrorSummary() {
    console.log(this.sheetForm.errors);
    this.errorsRef.innerHTML = JSON.stringify(Object.fromEntries(this.sheetForm.errors), null, 4).trim();
  }

  submitForm(e) {
    e.preventDefault();
    this.errorsRef.innerHTML = '';
    if (!this.sheetForm.valid) {
      this.getErrorSummary();
      return;
    }
    axios
      .post(this.apiUrl, this.sheetForm.value)
      .then((response) => response.data)
      .then((persons) => {
        this.personsList.push(...persons);
        this.sheetForm.reset();
        this.renderer.update();
      });
  }

  getData() {
    axios
      .get(this.apiUrl)
      .then((response) => response.data)
      .then((persons) => {
        this.personsList = [...persons];
        this.renderer.update();
      });
  }

  render() {
    return html`
      <section>
        <pre>
          <code ref=${(node) => {
          this.errorsRef = node;
        }}></code>
        </pre>
        <form
          onsubmit=${(e) => {
            this.submitForm(e);
          }}
        >
          <div class="field">
            <label class="label" for="exampleInputEmail1">Name</label>
            <div class="control">
              <input
                type="text"
                class="input"
                id="name"
                value=${this.sheetForm.get('name').value}
                onchange=${this.changeHandler('name')}
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
                value=${this.sheetForm.get('age').value}
                onchange=${this.changeHandler('age')}
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
                value=${this.sheetForm.get('salary').value}
                onchange=${this.changeHandler('salary')}
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
            ${this.personsList.map((item) => {
              return html`
                <tr>
                  <td>${item.name}</td>
                  <td>${item.age}</td>
                  <td>${item.salary}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </section>
    `;
  }
}

Component({ selector: 'app-items', deps: [Renderer, Router] }, ItemsComponent);
