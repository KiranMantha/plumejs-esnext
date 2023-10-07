import axios from 'axios';
import { Component, html, Renderer, Router, useSearchParams } from '../lib';

@Component({ selector: 'app-persons', deps: [Router] })
class PersonsComponent {
  personDetailsCompRef;
  users = [];
  seachParams = {};
  updateSearchParams;

  constructor(router) {
    [this.seachParams, this.updateSearchParams] = useSearchParams(this.seachParams);
  }

  mount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.data)
      .then((users) => {
        this.users = users;
      });
  }

  loadRouteData() {
    const route = this.router.getCurrentRoute();
    return {
      path: route.path,
      routeParams: Object.fromEntries(route.routeParams),
      queryParams: Object.fromEntries(route.queryParams),
      state: route.state
    };
  }

  loadPersonDetails(personDetails) {
    this.personDetailsCompRef.setProps({ personDetails });
  }

  onUserClick(person) {
    console.log('data from app-person-details comp: ', person);
  }

  updateUrl() {
    const updatedSearchParams = new URLSearchParams(this.seachParams.toString());
    updatedSearchParams.set('a', Math.random());
    this.updateSearchParams(updatedSearchParams);
    // this.router.navigateTo(`/persons/${Math.random()}/testuser?a=${Math.random()}`);
  }

  render() {
    return html`
      <h3>Persons route</h3>
      <span role="tag">sample tag</span><button onclick=${() => {
        this.updateUrl();
      }}>Update url</button>
      <p>${this.seachParams.a}</p>
      <p>
        Current route data: <pre><code>${JSON.stringify(this.loadRouteData(), null, 4)}</code></pre>
      </p>
      <ul>
        ${
          this.users.length
            ? this.users.map((user) => {
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
              })
            : 'loading'
        }
      </ul>
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
