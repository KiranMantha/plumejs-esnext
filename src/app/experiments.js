import { Component, html, Service } from '../lib';

function SampleComponentDecorator(options) {
  return function (target) {
    Component(options, target);
  };
}

function SampleServiceDecorator() {
  return function (target) {
    Service(target);
  };
}

@SampleServiceDecorator()
class ExpService {
  getText() {
    return 'hello all';
  }
}

@SampleComponentDecorator({ selector: 'app-experiments', deps: [ExpService] })
class Experiments {
  constructor(expService) {}
  render() {
    return html`${this.expService.getText()}`;
  }
}

//Component({ selector: 'app-experiments' }, Experiments);
