import { Component, Injectable, Renderer, html, signal } from '../lib';

const useState = (obj) => {
  const update = (newObj) => {
    Object.assign(obj, newObj);
  };

  return update;
};

@Injectable()
class ExpService {
  greeting = 'hello world';
}

@Component({
  selector: 'conditional-component'
})
class ConditionalComponent {
  static observedProperties = ['name'];
  name;
  val = signal(1);
  render() {
    return html` <p>rendering conditionally ${this.name} ${this.val().toString()}</p>
      <button
        onclick=${() => {
          this.val.set((initialValue) => initialValue + 1);
        }}
      >
        click
      </button>`;
  }
}

@Component({ selector: 'app-experiments', deps: [Renderer, ExpService] })
class Experiments {
  setClass1 = true;
  setClass2 = true;
  state = {};
  update;
  name = 'test';
  constructor(renderer, expService) {}

  beforeMount() {
    this.update = useState(this.state);
  }

  updateService() {
    this.expService.greeting = 'hey world';
    this.renderer.update();
  }

  toggleClass1() {
    this.setClass1 = !this.setClass1;
  }

  toggleClass2() {
    this.setClass2 = !this.setClass2;
  }

  render() {
    return html` <p
        class="test ${this.setClass1 ? 'class1' : ''} ${this.setClass2 ? 'class2' : ''}"
        ${this.setClass1 ? 'hidden' : ''}
      >
        ${this.expService.greeting}
      </p>
      ${this.setClass1 ? html`<conditional-component data-input=${{ name: this.name }}></conditional-component>` : ''}
      <p>${JSON.stringify(this.state, null, 2)}</p>
      <button onclick=${() => this.toggleClass1()}>toggle class1</button>
      <button onclick=${() => this.toggleClass2()}>toggle class2</button>
      <button
        onclick=${() => {
          this.update({ a: Math.random() });
          this.name = 'test' + Math.random();
        }}
      >
        update state
      </button>
      <conditional-component data-input=${{ name: this.name }}></conditional-component>`;
  }
}
