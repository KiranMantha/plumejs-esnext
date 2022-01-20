//https://codeburst.io/angular-2-simple-infinite-scroller-directive-with-rxjs-observables-a989b12d4fb1

import { Component, Service, html, render, registerRouterComponent } from './lib';

import styles from './base.scss';

registerRouterComponent();

class TestService {
  getGreeting() {
    return 'hello world';
  }
}

class TestComponent {
  constructor(renderer) {}

  emitDataToParent() {
    this.renderer.emitEvent('customoutput', {
      greet: 'greetings from child'
    });
  }

  render() {
    return html`
      <fieldset class="fieldset">
        <legend>I'm child component</legend>
        <button
          class="button  is-info is-light"
          onclick="${() => {
            this.emitDataToParent();
          }}"
        >
          emit data from child to parent
        </button>
      </fieldset>
    `;
  }
}

class AppComponent {
  greet;
  divRef;
  setClass = true;
  tabsContainer;
  routePath = '';

  routes = [
    {
      path: '',
      redirectTo: '/home'
    },
    {
      path: '/home',
      template: '<app-items></app-items>',
      templatePath: () => import('./app/items')
    },
    {
      path: '/persons',
      template: '<app-persons></app-persons>',
      templatePath: () => import('./app/persons')
    },
    {
      path: '/form',
      template: '<app-sample-form></app-sample-form>',
      templatePath: () => import('./app/form')
    },
    {
      path: '/calculator/:id',
      template: '<app-calculator></app-calculator>',
      templatePath: () => import('./app/calculator')
    },
    {
      path: '/editor',
      template: '<app-editor></app-editor>',
      templatePath: () => import('./app/editor')
    }
  ];

  constructor(testService, routerSrvc) {
    routerSrvc.registerRoutes(this.routes);
    this.greet = testService.getGreeting();
  }

  toggleActiveTab() {
    this.tabsContainer.querySelectorAll('.is-active')[0].classList.remove('is-active');
  }

  navigate(e, path) {
    e.preventDefault();
    //this.toggleActiveTab();
    //e.target.parentElement.classList.add('is-active');
    this.routerSrvc.navigateTo(path);
  }

  listenFromChild(data) {
    console.log('listening in parent component for data from child component: ', data);
  }

  render() {
    return html`
      <header>
        <nav>
          <a href="#" onclick=${(e) => this.navigate(e, '/home')}>Items Route</a>
          <a href="#" onclick=${(e) => this.navigate(e, '/persons')}>Persons Route</a>
          <a href="#" onclick=${(e) => this.navigate(e, '/form')}>Sample Form</a>
          <a
            href="#"
            onclick=${(e) =>
              this.navigate(e, '/calculator/123', {
                name: 'kiran'
              })}
            >Calculator</a
          >
          <a href="#" onclick=${(e) => this.navigate(e, '/editor')}>Editor</a>
        </nav>
      </header>
      <fieldset class="fieldset">
        <legend>I'm parent component</legend>
        <test-ele
          oncustomoutput="${(e) => {
            this.listenFromChild(e.detail);
          }}"
        ></test-ele>
        <div
          style="margin-top: 20px;"
          ref="${(node) => {
            this.divRef = node;
          }}"
          class="hello ${this.setClass ? 'world' : ''}"
          data-adj="${this.setClass}"
        >
          ${this.greet}
          <input value="${this.greet}" oninput="${(e) => console.log(e.target.value)}" />

          ${(() => {
            if (this.setClass) {
              return html` <div>loaded conditionally..</div> `;
            }
          })()}
          <ul>
            ${[1, 2, 3].map((item) => {
              return html` <li onclick="${() => console.log(item)}">${item}</li> `;
            })}
          </ul>
        </div>
        <fieldset class="fieldset">
          <legend>router outlet</legend>
          <router-outlet></router-outlet>
        </fieldset>
      </fieldset>
    `;
  }
}

Service({ name: 'testService' }, TestService);
Component({ selector: 'test-ele', deps: ['Renderer'] }, TestComponent);
Component(
  {
    selector: 'app-root',
    styles: styles,
    root: true,
    deps: ['testService', 'Router']
  },
  AppComponent
);

render(document.getElementById('test'), html` <app-root data-adj="${'hello world'}"></app-root> `);
