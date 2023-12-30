import axios from 'axios';
import { Component, html, Renderer, Router } from '../lib';

class PersonsService {}

@Component({ selector: 'app-persons', deps: [Router] })
class PersonsComponent {
  users = [];
  selectedPerson;
  routeData = {};

  constructor(router) {}

  mount() {
    this.loadRouteData();
  }

  loadRouteData() {
    this.router.getCurrentRoute().subscribe((route) => {
      this.routeData = {
        path: route.path,
        routeParams: Object.fromEntries(route.routeParams),
        queryParams: Object.fromEntries(route.queryParams),
        state: route.state
      };

      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.data)
        .then((users) => {
          this.users = users;
        });
    });
  }

  onUserClick(person) {
    console.log('data from app-person-details comp: ', person);
  }

  updateUrl() {
    this.router.navigateTo(`/persons/${Math.random()}/testuser?a=${Math.random()}`);
  }

  render() {
    return html`
      <h3>Persons route</h3>
      <span role="tag">sample tag</span>
      <button onclick=${() => {
        this.updateUrl();
      }}>Update url</button>
      <p>${this.routeData?.queryParams?.a}</p>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.routeData, null, 4)}</code></pre>
      </p>
      <ul>
        ${
          this.users.length
            ? this.users.map((user) => {
                return html`
                  <li
                    class="is-clickable"
                    onclick="${() => {
                      this.selectedPerson = user;
                    }}"
                  >
                    ${user.name}
                  </li>
                `;
              })
            : 'loading'
        }
      </ul>
      <app-person-details
        data-input=${{ personDetails: this.selectedPerson }}
        onuserclick="${(e) => {
          this.onUserClick(e.detail);
        }}"
      ></app-person-details>
    `;
  }
}

@Component({ selector: 'app-person-details', deps: [Renderer] })
class PersonDetailsComponent {
  static observedProperties = ['personDetails'];

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
