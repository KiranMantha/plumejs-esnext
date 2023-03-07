import axios from 'axios';
import { Component, html, Renderer } from '../lib';

@Component({
  selector: 'app-editable-table',
  deps: [Renderer]
})
class EditableTable {
  constructor(renderer) {}
  users = [];

  mount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.data)
      .then((users) => {
        this.users = users;
        this.renderer.update();
      });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(JSON.stringify(Object.fromEntries(formData), null, 4));
  }

  render() {
    if (!this.users.length) {
      return 'Loading';
    }

    return html`
      <table class="table-bordered">
        <caption>
          Editable table. Edit any row, click on save and check console
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.users.map(({ id, name, email }) => {
            return html`
              <tr>
                <td>
                  <form method="GET" id="inline-form-${id}" onsubmit=${this.onFormSubmit}></form>
                  <input type="hidden" name="id" value="${id}" form="inline-form-${id}" />
                  <input type="text" name="username" value="${name}" form="inline-form-${id}" />
                </td>
                <td>
                  <input type="text" name="email" value="${email}" form="inline-form-${id}" />
                </td>
                <td>
                  <button form="inline-form-${id}">save</button>
                </td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }
}
