import { Component, html, useState } from '../lib';
import { Router } from '../lib/router';
import calculatorStyles from './calculator.scss';

@Component({ selector: 'app-calculator', styles: calculatorStyles, deps: [Router] })
class CalculatorComponent {
  btnValues;
  calc;
  setCalc;
  outputNode;

  constructor(routerSrvc) {}

  beforeMount() {
    this.btnValues = [
      ['C', '+-', '%', '/'],
      [7, 8, 9, 'X'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '.', '=']
    ];
  }

  mount() {
    console.table(this.routerSrvc.getCurrentRoute());
    [this.calc, this.setCalc] = useState({
      sign: '',
      num: 0,
      res: 0
    });
  }

  toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

  removeSpaces = (num) => num.toString().replace(/\s/g, '');

  handleKeyPress(key) {
    switch (key) {
      case 'C': {
        this.setCalc({
          ...this.calc,
          sign: '',
          num: 0,
          res: 0
        });
        break;
      }
      case '+-': {
        this.setCalc({
          ...this.calc,
          res: this.calc.res ? this.toLocaleString(this.removeSpaces(this.calc.res) * -1) : 0,
          num: this.calc.num ? this.toLocaleString(this.removeSpaces(this.calc.num) * -1) : 0,
          sign: ''
        });
        break;
      }
      case '%': {
        let num = this.calc.num ? parseFloat(this.removeSpaces(this.calc.num)) : 0;
        let res = this.calc.res ? parseFloat(this.removeSpaces(this.calc.res)) : 0;

        this.setCalc({
          ...this.calc,
          num: (num /= Math.pow(100, 1)),
          res: (res /= Math.pow(100, 1)),
          sign: ''
        });
        break;
      }
      case '=': {
        if (this.calc.sign && this.calc.num) {
          const math = (a, b, sign) => (sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b);

          this.setCalc({
            ...this.calc,
            res:
              this.calc.num === '0' && this.calc.sign === '/'
                ? 'Cannot divide with 0'
                : this.toLocaleString(
                    math(
                      Number(this.removeSpaces(this.calc.res)),
                      Number(this.removeSpaces(this.calc.num)),
                      this.calc.sign
                    )
                  ),
            sign: '',
            num: 0
          });
        }
        break;
      }
      case '/':
      case 'X':
      case '-':
      case '+': {
        this.setCalc({
          ...this.calc,
          sign: key,
          res: !this.calc.res && this.calc.num ? this.calc.num : this.calc.res,
          num: 0
        });
        break;
      }
      case '.': {
        this.setCalc({
          ...this.calc,
          num: !this.calc.num.toString().includes('.') ? this.calc.num + key : this.calc.num
        });
        break;
      }
      default: {
        if (this.removeSpaces(this.calc.num.length < 16)) {
          this.setCalc({
            ...this.calc,
            num:
              this.calc.num === 0 && key === '0'
                ? '0'
                : this.removeSpaces(this.calc.num) % 1 === 0
                ? this.toLocaleString(Number(this.removeSpaces(this.calc.num + key)))
                : this.toLocaleString(this.calc.num + key),
            res: !this.calc.sign ? 0 : this.calc.res
          });
        }
        break;
      }
    }
    this.outputNode.innerHTML = this.calc.num ? this.calc.num : this.calc.res;
  }

  render() {
    return html`
      <div class="wrapper">
        <div
          class="screen"
          ref=${(node) => {
            this.outputNode = node;
          }}
        >
          0
        </div>
        <div class="button-box">
          ${this.btnValues.flat().map((btn, i) => {
            return html`
              <button
                class="button is-light ${btn === '=' ? 'equals' : ''}"
                onclick=${() => {
                  this.handleKeyPress(btn);
                }}
              >
                ${btn}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}
