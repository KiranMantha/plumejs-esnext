import { Component, html, render, Renderer, useFormFields } from '../lib';

@Component({ selector: 'app-sample-form', deps: [Renderer] })
class FormComponent {
  sampleform1;
  createChangeHandler1;
  formOutputRef1;

  sampleform2;
  createChangeHandler2;
  formOutputRef2;

  constructor(renderer) {}

  beforeMount() {
    [this.sampleform1, this.createChangeHandler1] = useFormFields({
      email: 'test.email@sample.com',
      password: '1234',
      checkme: true,
      option: '',
      options: [['2', '4']]
    });
    [this.sampleform2, this.createChangeHandler2] = useFormFields({
      name: '',
      age: ''
    });
  }

  submitForm1(e) {
    e.preventDefault();
    render(this.formOutputRef1, html` <pre>${JSON.stringify(this.sampleform1.value, null, 4)}</pre> `);
  }

  submitForm2(e) {
    e.preventDefault();
    render(this.formOutputRef2, html` <pre>${JSON.stringify(this.sampleform2.value, null, 4)}</pre> `);
  }

  render() {
    return html`
      <h5 class="title is-5">sample form 1</h5>
      <form
        onsubmit=${(e) => {
          this.submitForm1(e);
        }}
      >
        <div class="field">
          <label class="label" for="exampleInputEmail1">Email address</label>
          <div class="control">
            <input
              type="email"
              class="input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value=${this.sampleform1.get('email').value}
              oninput=${this.createChangeHandler1('email')}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="exampleInputPassword1">Password</label>
          <div class="control">
            <input
              type="password"
              class="input"
              id="exampleInputPassword1"
              placeholder="Password"
              value=${this.sampleform1.get('password').value}
              oninput=${this.createChangeHandler1('password')}
            />
          </div>
        </div>
        <div class="field form-check">
          <div class="control">
            <label class="checkbox" for="exampleCheck1">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                checked=${this.sampleform1.get('checkme').value}
                onchange=${this.createChangeHandler1('checkme')}
              />
              Check me out
            </label>
          </div>
        </div>
        <div class="field">
          <label class="label">single select</label>
          <div class="control">
            <div class="select">
              <select value=${this.sampleform1.get('option').value} onchange=${this.createChangeHandler1('option')}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">multi select</label>
          <div class="control">
            <div class="select is-multiple">
              <select
                multiple
                value=${this.sampleform1.get('options').value}
                onchange=${this.createChangeHandler1('options')}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button
              onclick=${(e) => {
                e.preventDefault();
                this.sampleform1.reset();
                console.log(this.sampleform1);
                this.renderer.update();
              }}
            >
              Reset
            </button>
            <button class="button is-info is-light" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div
        ref="${(node) => {
          this.formOutputRef1 = node;
        }}"
      ></div>
      <br />
      <br />
      <h5 class="title is-5">sample form 2</h5>
      <form
        onsubmit="${(e) => {
          this.submitForm2(e);
        }}"
      >
        <div class="field">
          <label class="label" for="name">Name</label>
          <div class="control">
            <input
              class="input"
              id="name"
              value=${this.sampleform2.get('name').value}
              onchange=${this.createChangeHandler2('name')}
            />
          </div>
        </div>
        <div class="field">
          <label class="label" for="age">Age</label>
          <div class="control">
            <input
              class="input"
              id="age"
              value=${this.sampleform2.get('age').value}
              onchange=${this.createChangeHandler2('age')}
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button  is-info is-light" type="submit">Submit me too</button>
          </div>
        </div>
      </form>
      <div
        ref="${(node) => {
          this.formOutputRef2 = node;
        }}"
      ></div>
    `;
  }
}
