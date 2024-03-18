import { Component, html, signal } from '../lib';

@Component({ selector: 'app-calculator', styles: import('./calculator.scss') })
class CalculatorComponent {
  btnValues;
  calc;
  setCalc;

  beforeMount() {
    this.btnValues = [
      ['C', '+-', '%', '/'],
      [7, 8, 9, 'X'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '.', '=']
    ];
    this.calc = signal({
      sign: '',
      num: 0,
      res: 0
    });
  }

  toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

  removeSpaces = (num) => num.toString().replace(/\s/g, '');

  handleKeyPress(key) {
    const calc = this.calc();
    switch (key) {
      case 'C': {
        this.calc.set({
          ...calc,
          sign: '',
          num: 0,
          res: 0
        });
        break;
      }
      case '+-': {
        this.calc.set({
          ...calc,
          res: calc.res ? this.toLocaleString(this.removeSpaces(calc.res) * -1) : 0,
          num: calc.num ? this.toLocaleString(this.removeSpaces(calc.num) * -1) : 0,
          sign: ''
        });
        break;
      }
      case '%': {
        let num = calc.num ? parseFloat(this.removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(this.removeSpaces(calc.res)) : 0;

        this.calc.set({
          ...calc,
          num: (num /= Math.pow(100, 1)),
          res: (res /= Math.pow(100, 1)),
          sign: ''
        });
        break;
      }
      case '=': {
        if (calc.sign && calc.num) {
          const math = (a, b, sign) => (sign === '+' ? a + b : sign === '-' ? a - b : sign === 'X' ? a * b : a / b);

          this.calc.set({
            ...calc,
            res:
              calc.num === '0' && calc.sign === '/'
                ? 'Cannot divide with 0'
                : this.toLocaleString(
                    math(Number(this.removeSpaces(calc.res)), Number(this.removeSpaces(calc.num)), calc.sign)
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
        this.calc.set({
          ...calc,
          sign: key,
          res: !calc.res && calc.num ? calc.num : calc.res,
          num: 0
        });
        break;
      }
      case '.': {
        this.calc.set({
          ...calc,
          num: !calc.num.toString().includes('.') ? calc.num + key : calc.num
        });
        break;
      }
      default: {
        if (this.removeSpaces(calc.num.length < 16)) {
          this.calc.set({
            ...calc,
            num:
              calc.num === 0 && key === '0'
                ? '0'
                : this.removeSpaces(calc.num) % 1 === 0
                ? this.toLocaleString(Number(this.removeSpaces(calc.num + key)))
                : this.toLocaleString(calc.num + key),
            res: !calc.sign ? 0 : calc.res
          });
        }
        break;
      }
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="screen">${this.calc().num ? this.calc().num : this.calc().res}</div>
        <div class="button-box">
          ${this.btnValues.flat().map((btn, i) => {
            return html`
              <button
                class="button is-light ${btn === '=' ? 'equals' : ''}"
                onclick=${() => {
                  this.handleKeyPress(btn);
                }}
              >
                ${btn.toString()}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }
}
