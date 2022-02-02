//https://codeburst.io/angular-2-simple-infinite-scroller-directive-with-rxjs-observables-a989b12d4fb1
//https://medium.com/@sgroff04/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213
// @flow

import { Component, Service, html, render, registerRouterComponent, Renderer } from './lib';
import { Router } from './lib/router';
import { Observable } from 'rxjs';
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
      templatePath: () => import('./app/persons'),
      canActivate: () => {
        return new Observable((observer) => {
          setTimeout(() => {
            let key = localStorage.getItem('@plumejs/core');
            if (!key) {
              this.routerSrvc.navigateTo('/home');
              observer.next(false);
            } else {
              observer.next(true);
            }
            observer.complete();
          }, 10);
        });
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     let key = localStorage.getItem('@plumejs/core');
        //     if (!key) {
        //       this.routerSrvc.navigateTo('/home');
        //       resolve(false);
        //     }
        //     resolve(true);
        //   }, 10);
        // });
        // let key = localStorage.getItem('@plumejs/core');
        // if (!key) {
        //   this.router.navigateTo('/home');
        //   return false;
        // }
        // return true;
      }
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
      path: '/controls',
      template: '<app-controls></app-controls>',
      templatePath: () => import('./app/controls')
    },
    {
      path: '/nested-table',
      template: '<app-nested-table></app-nested-table>',
      templatePath: () => import('./app/nested-table')
    },
    {
      path: '/editor',
      template: '<app-editor></app-editor>',
      templatePath: () => import('./app/editor')
    }
  ];

  /**
   * @param {any} testService
   * @param {Router} routerSrvc
   */
  constructor(testService, routerSrvc) {
    routerSrvc.registerRoutes(this.routes, false);
    this.greet = testService.getGreeting();
  }

  beforeMount() {
    this.routePath = this.routerSrvc.getCurrentRoute().path;
    console.log('routePath', this.routePath);
  }

  toggleActiveTab() {
    this.tabsContainer.querySelectorAll('.is-active')[0]?.classList.remove('is-active');
  }

  navigate(e, path, state) {
    e.preventDefault();
    //this.toggleActiveTab();
    //e.target.parentElement.classList.add('is-active');
    this.routerSrvc.navigateTo(path, state);
  }

  listenFromChild(data) {
    console.log('listening in parent component for data from child component: ', data);
  }

  enablePersonsRoute() {
    window.localStorage.setItem('@plumejs/core', 'now persons route is activated');
  }

  disablePersonsRoute() {
    window.localStorage.removeItem('@plumejs/core');
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
          <a href="#" onclick=${(e) => this.navigate(e, '/controls')}>Controls</a>
          <a href="#" onclick=${(e) => this.navigate(e, '/nested-table')}>Nested Table</a>
          <a href="#" onclick=${(e) => this.navigate(e, '/editor')}>Editor</a>
        </nav>
      </header>
      <fieldset class="fieldset">
        <legend>I'm parent component</legend>
        ${'<div>test</div>'}
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
        <div>
          <button onclick=${this.enablePersonsRoute} title="click persons nav to check persons route">
            Enable Persons route
          </button>
          <button onclick=${this.disablePersonsRoute} title="click persons nav to check persons route">
            Disable Persons route
          </button>
        </div>
        <fieldset class="fieldset">
          <legend>router outlet</legend>
          <router-outlet></router-outlet>
        </fieldset>
      </fieldset>
    `;
  }
}

Service(TestService);
Component({ selector: 'test-ele', deps: [Renderer] }, TestComponent);
Component(
  {
    selector: 'app-root',
    styles: styles,
    root: true,
    deps: [TestService, Router]
  },
  AppComponent
);

render(document.getElementById('test'), html` <app-root data-adj="${'hello world'}"></app-root> `);
