import { signal } from '../core';

const isFunction = (value) => typeof value === 'function';

const nodeName = (elem, name) => {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
};

const _getTargetValue = (target) => {
  let targetValue;
  switch (target.nodeName && target.nodeName.toLowerCase()) {
    case 'input':
    case 'textarea': {
      let nonTextElements = ['radio', 'checkbox'];
      if (nonTextElements.includes(target.type)) {
        targetValue = target.checked ? (target.value !== null && target.value !== 'on' ? target.value : true) : false;
      } else {
        targetValue = target.value;
      }
      break;
    }
    case 'select': {
      const one = target.type === 'select-one';
      const options = Array.from(target.options).filter(
        (option) => !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, 'optgroup'))
      );
      const value = [...options]
        .filter((option) => option.selected)
        .map((option) => option.value ?? (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(' '));
      targetValue = one ? value[0] : value;
      break;
    }
    default: {
      targetValue = target.value;
      break;
    }
  }
  return targetValue;
};

export class FormControl {
  name;
  validators;
  isTouched = false;
  validity = null;

  /**
   * @private */
  _initialValue;

  /**
   * @private */
  _value;

  /**
   * @private
   */
  _errorMessage = signal('');

  /**
   * @private
   */
  _parent;

  constructor(name, controlValue, parent) {
    const val = [...(Array.isArray(controlValue) ? controlValue : [controlValue])];
    this.name = name;
    this._initialValue = val[0];
    this._value = val[0];
    this.validators = val.length > 1 ? val[1] : [];
    this._parent = parent;
  }

  get value() {
    return this._value;
  }

  get errorMessage() {
    return this._errorMessage();
  }

  register() {
    return {
      attrs: {
        name: this.name,
        value: this.value,
        onchange: (e) => {
          this._value = _getTargetValue(e.target);
        },
        onblur: () => {
          this.isTouched = true;
          this.validate();
        }
      }
    };
  }

  validate() {
    let errorMessage = '';
    for (const validator of this.validators) {
      this.validity = isFunction(validator) ? validator(this.value) : validator.rule(this.value);
      if (this.validity !== null) {
        errorMessage = !isFunction(validator) ? validator.message : 'error';
        this._parent?.setError(this.name, this.validity);
        break;
      }
    }
    this._errorMessage.set(errorMessage);
  }

  reset() {
    this._value = this._initialValue;
    this.isTouched = false;
    this.validity = null;
    this._errorMessage.set('');
  }
}
