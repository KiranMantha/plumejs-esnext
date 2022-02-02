import { Component, html } from '../lib';

class RowItem {
  ObservedProperties = ['category'];

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
        <tr>
          <td>${this.category.id}</td>
          <td>${this.category.name}</td>
          <td>
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
          ref=${(row) => {
            this.nestedRow = row;
          }}
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
      `;
    } else {
      return html``;
    }
  }
}

class NestedTable {
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
  render() {
    return html`
      <table>
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

Component(
  {
    selector: 'app-row-item',
    styles: `:host {
      display: table-row-group;
    }
    .hide-row {
        display: none;
    }
    :host > tr > td[colspan] table {
        margin: 0;
    }`
  },
  RowItem
);
Component(
  {
    selector: 'app-nested-table'
  },
  NestedTable
);
