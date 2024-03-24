import { Component, html } from '../../../lib';

@Component({
  selector: 'ui-stepper',
  styles: import('./stepper.scss?inline')
})
class Stepper {
  static observedProperties = ['stepperOptions', 'currentStep'];

  currentStep = 1;
  stepperOptions;

  render() {
    if (this.stepperOptions) {
      return html`<div class="stepper" style="--step: ${this.currentStep}">
        ${this.stepperOptions.steps.map(({ title, caption }, index) => {
          return html`<div class="step" data-completed="${this.currentStep > index + 1 ? 'true' : 'false'}">
            <div class="title">${title}</div>
            <div class="caption">${caption}</div>
          </div>`;
        })}
      </div>`;
    } else {
      return '';
    }
  }
}
