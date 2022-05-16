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
  }

  submitForm(e) {
    e.preventDefault();
    if (!this.sheetForm.valid) {
      this.getErrorSummary();
      return;
    }
    axios
      .post(this.apiUrl, this.sheetForm.value)
      .then((response) => response.data)
      .then((persons) => {
        this.personsList.push(...persons);
        this.resetForm();
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
      <table class="table is-hoverable">
        <thead>
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Salary</td>
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
    `;
  }
}

Component({ selector: 'app-items', deps: [Renderer, Router] }, ItemsComponent);
