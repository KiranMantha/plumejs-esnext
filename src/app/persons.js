import { Component, html, render } from '../lib';

class PersonsComponent {
  ulRef;
  personDetailsCompRef;

  mount() {
    render(this.ulRef, html` loading `);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        let nodes = users.map((user) => {
          return html`
            <li
              class="is-clickable"
              onclick="${() => {
                this.loadPersonDetails(user);
              }}"
            >
              ${user.name}
            </li>
          `;
        });

        render(this.ulRef, html` ${nodes} `);
      });
  }

  loadPersonDetails(personDetails) {
    this.personDetailsCompRef.setProps({ personDetails });
  }

  onUserClick(person) {
    console.log('data from app-person-details comp: ', person);
  }

  render() {
    return html`
      <h6 class="title is-6">Persons route</h6>
      <ul
        class="block-list is-small"
        ref="${(ref) => {
          this.ulRef = ref;
        }}"
      ></ul>
      <app-person-details
        ref="${(node) => {
          this.personDetailsCompRef = node;
        }}"
        onuserclick="${(e) => {
          this.onUserClick(e.detail);
        }}"
      ></app-person-details>
    `;
  }
}

class PersonDetailsComponent {
  constructor(renderer) {}
  personDetails;

  sendDataToParent() {
    this.renderer.emitEvent('userclick', this.personDetails);
  }

  render() {
    if (this.personDetails?.name) {
      return html`
        <strong>Person Details</strong>
        <div>Name: ${this.personDetails.name}</div>
        <div>Company: ${this.personDetails.company.name}</div>
        <button
          class="button is-info is-light"
          onclick="${() => {
            this.sendDataToParent();
          }}"
        >
          click me and check console
        </button>
      `;
    } else {
      return html` <div></div> `;
    }
  }
}

Component({ selector: 'app-persons' }, PersonsComponent);
Component({ selector: 'app-person-details', deps: ['Renderer'] }, PersonDetailsComponent);
