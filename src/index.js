// // Import stylesheets
customElements.forcePolyfill = true;
import "@webcomponents/custom-elements";
import {
    Component,
    Service,
    useRef
} from "./lib/plume";

// // Write Javascript code!
const appDiv = document.getElementById("app");
// appDiv.innerHTML = `<h1>JS Starter</h1>`;

Service(
    "SampleService",
    class {
        log(s) {
            console.log(s);
        }
    }
);

// component("app-root", [
//   "SampleService",
//   "RouterService",
//   class {
//     greet = "hello world";
//     fruits = ["apple", "orange", "grapes"];
//     samplesrvc;
//     routerSrvc;
//     routes = [
//       {
//         path: "/contactus",
//         template: "<app-contactus></app-contactus>",
//         templatePath: () => import("./contact-us"),
//         canActivate: () => {
//           let key = localStorage.getItem("plumejs");
//           if (!key) {
//             this.routerSrvc.navigateTo("/home");
//             return false;
//           }
//           return true;
//         }
//       },
//       {
//         path: "/about/:id",
//         template: "<app-about></app-about>",
//         templatePath: () => import("./about-us")
//       }
//     ];

//     static get observedProperties() { return []; };

//     constructor(_samplesrvc, _routersrvc) {
//       this.samplesrvc = _samplesrvc;
//       this.routerSrvc = _routersrvc;
//       _routersrvc.addRoutes(this.routes);
//     }

//     mount() {
//       console.log("i was mounted");
//     }

//     unmount() {
//       console.log("i was unmounted");
//     }

//     onPropertyChanged(propName, oldValue, newValue) {}

//     enableContactusRoute() {
//       window.localStorage.setItem(
//         "plumejs",
//         "now Contactus route is activated"
//       );
//     }

//     disableContactusRoute() {
//       window.localStorage.removeItem("plumejs");
//     }

//     log(s) {
//       this.samplesrvc.log(s);
//     }
//     render() {
//       return html`
//         <h1>${this.greet}</h1>
//         <button
//           onclick=${this.enableContactusRoute}
//           title="click contactus nav to check contactus route"
//         >
//           Enable contactus route
//         </button>
//         <button
//           onclick=${this.disableContactusRoute}
//           title="click contactus nav to check contactus route"
//         >
//           Disable contactus route
//         </button>
//         <button onclick=${() => this.routerSrvc.navigateTo("/contactus")}>
//           go to contactus
//         </button>
//         <button onclick=${() => this.routerSrvc.navigateTo("/about/123")}>
//           go to about with params
//         </button>
//         <dl>
//           ${this.fruits.map(i => {
//             return html`
//               <dt
//                 onclick=${() => {
//                   this.log(i);
//                 }}
//               >
//                 ${i}
//               </dt>
//             `;
//           })}
//         </dl>
//         <router-outlet></router-outlet>
//       `;
//     }
//   }
// ]);

// render(
//   appDiv,
//   html`
//     <app-root></app-root>
//   `
// );

// class A extends HTMLElement {
//   constructor() {
//     console.log(super());
//     return new Proxy(this, {
//       construct: (target, argumentsList) => {
//         super();
//         let foo = new target(...argumentsList);
//         return foo;
//       },
//       get: (target, key) => {
//         console.log('get property:', key)
//         return target[key]
//       }
//     })
//   }
// }

var C = Component("a-element", [
    "SampleService",
    class {
        props = {};
        inputEl = useRef(null);
        constructor(sampleSrvc, props) {
            console.log(sampleSrvc, props);
            this.props = props;
        }

        mount() {
            console.log('ref', this.inputEl);
        }

        trigger(e) {
            console.log(e);
        }

        render() {
            return (
                <div ref={
                    this.inputEl
                } onclick={this.trigger.bind(this)}> {
                        this.props.name.a
                    } </div>);
        }
    }
]);

class A extends HTMLElement {
    props = {};
    constructor(props) {
        super();
        console.log("props", props);
        this.props = props;
        Object.setPrototypeOf(
            this,
            new Proxy(Object.create(HTMLElement.prototype), {
                set: (target, key, value) => {
                    console.log(target, key, value);
                    return true;
                }
            })
        );
    }

    connectedCallback() {
        this.innerHTML = `
          <h1>${this.props.a}</h1>
        `;
    }

    disconnectedCallback() { }
}

//window.customElements.define("a-element", A);
// const el = new A(1234);
// window.el = el;
// appDiv.appendChild(el);
const k = {
    a: 1234
};
// const el = new A(k);
// window.el = el;
// appDiv.appendChild(el);
// appDiv.innerHTML = `<a-element name="${k}"></a-element>`;
// window.appDiv = appDiv;

const B = props => <div> {props.name.a} </div>;

appDiv.appendChild(
    <C name={k} />
);

Component('app-root', class {
    render() {
        return html`<div class="${'class-name'}">${'test'}</div>`
    }
})