import { Component, Injectable, Renderer, html } from '../lib';

@Injectable()
class ExpService {
  greeting = 'hello world';
}

@Component({
  selector: 'conditional-component'
})
class ConditionalComponent {
  render() {
    return html`<p>rendering conditionally</p>`;
  }
}

@Component({ selector: 'app-experiments', deps: [Renderer, ExpService] })
class Experiments {
  setClass1 = true;
  setClass2 = true;
  constructor(renderer, expService) {}

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
      ${this.setClass1 ? html`<conditional-component></conditional-component>` : ''}
      <button onclick=${() => this.toggleClass1()}>toggle class1</button>
      <button onclick=${() => this.toggleClass2()}>toggle class2</button>`;
  }
}
