import { Component, html, useFormFields } from '../lib';
import axios from 'axios';

class ItemsComponent {
  sheetFormFields;
  changeHandler;
  resetForm;
  apiUrl = 'https://sheet.best/api/sheets/d406eddb-4e35-4496-a526-34fb27c763e4';
  table;
  personsList = [];

  constructor(renderer) {}

  beforeMount() {
    const { formFields, createChangeHandler, resetFormFields } = useFormFields({
      name: '',
      age: '',
      salary: '',
    });
    this.sheetFormFields = formFields;
    this.changeHandler = createChangeHandler;
    this.resetForm = resetFormFields;
  }

  mount() {
    this.getData();
  }

  submitForm(e) {
    e.preventDefault();
    axios.post(this.apiUrl, this.sheetFormFields).then((response) => {
      this.personsList.push(...response.data);
      this.resetForm();
      this.renderer.update();
    });
  }

  getData() {
    axios.get(this.apiUrl).then((response) => {
      this.personsList = [...response.data];
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
              id='name'
              value=${this.sheetFormFields.name}
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
              id='age'
              value=${this.sheetFormFields.age}
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
              id='salary'
              value=${this.sheetFormFields.salary}
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

Component({ selector: 'app-items', deps: ['Renderer'] }, ItemsComponent);
