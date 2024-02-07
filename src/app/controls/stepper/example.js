import { Component, html } from '../../../lib';
import exampleStyles from './example.scss?inline';
import './stepper';

@Component({
  selector: 'app-example-stepper',
  styles: exampleStyles
})
class ExampleStepper {
  currentStep = 1;
  stepperOptions = {
    steps: [
      {
        title: 'Step 1',
        caption: 'caption 1'
      },
      {
        title: 'Step 2',
        caption: 'caption 2'
      },
      {
        title: 'Step 3',
        caption: 'caption 3'
      }
    ]
  };

  changeStep(direction) {
    if (direction === 'next') {
      this.currentStep++;
    } else {
      this.currentStep--;
    }
  }

  generateForm() {
    switch (this.currentStep) {
      case 1:
        return html` <form
          onsubmit=${(e) => {
            e.preventDefault();
            this.changeStep('next');
          }}
        >
          <div class="form-control">
            <label>Field1</label>
            <input type="text" />
          </div>
          <button type="submit">Next</button>
        </form>`;
      case 2:
        return html` <form
          onsubmit=${(e) => {
            e.preventDefault();
            this.changeStep('next');
          }}
        >
          <div class="form-control">
            <label>Field2</label>
            <input type="text" />
          </div>
          <span
            role="button"
            onclick=${() => {
              this.changeStep('previous');
            }}
            >Previous</span
          >
          <button type="submit">Next</button>
        </form>`;
      case 3:
        return html` <form onsubmit=${(e) => e.preventDefault()}>
          <div class="form-control">
            <label>Field3</label>
            <input type="text" />
          </div>

          <span
            role="button"
            onclick=${() => {
              this.changeStep('previous');
            }}
            >Previous</span
          >
          <button class="${this.currentStep === 3 ? 'disabled' : ''}" type="submit">Submit</button>
        </form>`;
    }
  }

  render() {
    return html`current step: ${this.currentStep}
      <button class="${this.currentStep === 1 ? 'disabled' : ''}" onclick=${() => this.changeStep('previous')}>
        previous</button
      ><button class="${this.currentStep === 3 ? 'disabled' : ''}" onclick=${() => this.changeStep('next')}>
        next
      </button>
      <div class="form-details">
        <ui-stepper
          class="ui-stepper"
          data-input=${{ stepperOptions: this.stepperOptions, currentStep: this.currentStep }}
        ></ui-stepper>
        <section class="stepper-content">${this.generateForm()}</section>
      </div> `;
  }
}
