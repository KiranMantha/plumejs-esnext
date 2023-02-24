import { Component, html } from '../lib';

@Component({
  selector: 'app-row-item',
  styles: `:host {
      display: table-row-group;
  }
  .hide-row {
      display: none;
  }
  :host > tr > td[colspan] table {
      margin: 0;
  }
  `
})
class RowItem {
  static observedProperties = ['category'];

  category;
  nestedRow;

  toggleNestedTable() {
    this.nestedRow.classList.toggle('hide-row');
  }

  populateNestedTable() {
    if (this.category.questions.length) {
      return this.category.questions.map((question) => {
        return html`<tr>
          <td>${question.id}</td>
          <td>${question.name}</td>
          <td>${question.type}</td>
        </tr>`;
      });
    } else {
      return html`<tr>
        <td colspan="3">Please add a question</td>
      </tr>`;
    }
  }

  render() {
    if (this.category) {
      return html`
        <tr part="table-row">
          <td part="table-cell">${this.category.id}</td>
          <td part="table-cell">${this.category.name}</td>
          <td part="table-cell">
            <button
              onclick=${() => {
                this.toggleNestedTable();
              }}
            >
              toggle
            </button>
          </td>
        </tr>
        <tr
          part="table-row"
          ref=${(row) => {
            this.nestedRow = row;
          }}
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
      `;
    } else {
      return html``;
    }
  }
}

@Component({
  selector: 'app-nested-table'
})
class NestedTable {
  static observedAttributes = ['name'];

  categories = [
    {
      id: 1,
      name: 'category 1',
      questions: [
        {
          id: 1,
          name: 'how are you',
          type: 'text'
        },
        {
          id: 2,
          name: 'what you do',
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      name: 'category 2',
      questions: []
    }
  ];

  onAttributesChanged(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }

  render() {
    return html`
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
        ${this.categories.map((category) => {
          return html`<app-row-item
            onbindprops=${() => ({
              category
            })}
          ></app-row-item>`;
        })}
      </table>
    `;
  }
}
