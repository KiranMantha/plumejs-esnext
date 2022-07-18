// @flow
import { Component, html, render, Renderer, Router } from '../lib';
import axios from 'axios';

class PersonsComponent {
  ulRef;
  personDetailsCompRef;

  constructor(router) {}

  mount() {
    render(this.ulRef, html` loading `);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.data)
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

  render() {
    return html`
      <h3>Persons route</h3>
      <p>Current route data: <code>${JSON.stringify(this.loadRouteData(), null, 2)}</code></p>
      <ul
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

Component({ selector: 'app-persons', deps: [Router] }, PersonsComponent);
Component({ selector: 'app-person-details', deps: [Renderer] }, PersonDetailsComponent);
