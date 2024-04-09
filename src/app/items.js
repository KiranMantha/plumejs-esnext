import axios from 'axios';
import { Component, FormBuilder, Validators, html } from '../lib';
import { Router } from '../lib/router';

@Component({ selector: 'app-items', deps: [Router] })
class ItemsComponent {
  sheetForm = new FormBuilder({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    salary: ['', [Validators.required]]
  });
  apiUrl =
    'https://script.google.com/macros/s/AKfycbzCyH7MIo7UFlhbkNWjbIyCp-Rae-CElryGsGM4oWSDeIx0QMOidUSlBEMs78kQZIsLCQ/exec';
  table;
  personsList = [];
  errorsRef;

  constructor(routerSrvc) {}

  mount() {
    console.table(this.routerSrvc.getCurrentRoute());
    this.getData();
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.sheetForm.value);
    if (!this.sheetForm.valid) {
      console.log(this.sheetForm.errors);
    } else {
      this.personsList.push(this.sheetForm.value);
      this.sheetForm.reset();
      axios
        .get(this.apiUrl + `?f=insert&n=${value}`)
        .then((response) => response.data)
        .then((res) => {
          if (res.data.success) {
            this.getData();
          }
        });
    }
  }

  getData() {
    axios
      .get(this.apiUrl)
      .then((response) => response.data)
      .then((persons) => {
        this.personsList = persons.data;
      });
  }

  render() {
    return html`
      <section>
        <pre>
          <code ref=${(node) => {
          this.errorsRef = node;
        }}>${this.sheetForm.hasErrors
          ? JSON.stringify(Object.fromEntries(this.sheetForm.errors), null, 4)
          : null}</code>
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
                value=${this.sheetForm.getControl('name').value}
                onchange=${this.sheetForm.changeHandler('name')}
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
                value=${this.sheetForm.getControl('age').value}
                onchange=${this.sheetForm.changeHandler('age')}
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
                value=${this.sheetForm.getControl('salary').value}
                onchange=${this.sheetForm.changeHandler('salary')}
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
