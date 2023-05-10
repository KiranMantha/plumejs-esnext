import { Observable } from 'rxjs';
import styles from './base.scss?inline';
import { Component, html, Injectable, registerRouterComponent, render } from './lib';
import { Router } from './lib/router';

registerRouterComponent();

@Injectable()
class TestService {
  getGreeting() {
    return 'hello world';
  }
}

@Component({ selector: 'test-ele' })
class TestComponent {
  inputVal = '';

  emitDataToParent() {
    this.renderer.emitEvent('customoutput', {
      greet: 'greetings from child'
    });
  }

  handleInput(e) {
    const value = e.target.value;
    console.log(value);
    this.inputVal = value;
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
        <div>
          <p>two way data binding</p>
          <p>${this.inputVal}</p>
          <input type="text" value="${this.inputVal}" oninput="${(e) => this.handleInput(e)}" />
        </div>
      </fieldset>
    `;
  }
}

@Component({
  selector: 'app-root',
  styles: styles,
  root: true,
  deps: [TestService, Router]
})
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
      path: '/persons/:id/:name',
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
      template: '<app-nested-table name="kiran"></app-nested-table>',
      templatePath: () => import('./app/nested-table')
    },
    {
      path: '/editor',
      template: '<app-editor></app-editor>',
      templatePath: () => import('./app/editor')
    },
    {
      path: '/experiments',
      template: '<app-experiments></app-experiments>',
      templatePath: () => import('./app/experiments')
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
      <div class="layout">
        <header class="layout sticky-header">
          <nav>
            <ul>
              <li>
                <a href="#/home">Items Route</a>
              </li>
              <li>
                <a href="#/persons/123/testuser?a=123">Persons Route</a>
              </li>
              <li>
                <a href="#/form">Sample Form</a>
              </li>
              <li>
                <a
                  href="#"
                  onclick=${(e) =>
                    this.navigate(e, '/calculator/123', {
                      name: 'kiran'
                    })}
                  >Calculator</a
                >
              </li>
              <li>
                <a href="#/controls">Controls</a>
              </li>
              <li>
                <a href="#/nested-table">Nested Table</a>
              </li>
              <li>
                <a href="#/editor">Editor</a>
              </li>
              <li>
                <a href="#/experiments">Experiments</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
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
              <input
                value="${this.greet}"
                oninput="${(e) => {
                  const value = e.target.value;
                  console.log(value);
                  this.greet = value;
                }}"
              />

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
        </main>
      </div>
    `;
  }
}

render(document.getElementById('test'), html`<app-root data-adj="${'hello world'}"></app-root>`);
