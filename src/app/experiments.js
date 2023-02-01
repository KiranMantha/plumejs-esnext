import { Component, html } from '../lib';

function SampleDecorator(options) {
  console.log(options);
  return function (targetKlass) {
    console.log(targetKlass);
    Component(options, targetKlass);
  };
}

@SampleDecorator({ selector: 'app-experiments' })
class Experiments {
  render() {
    return html`hello all`;
  }
}

//Component({ selector: 'app-experiments' }, Experiments);
