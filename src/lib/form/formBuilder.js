import { signal } from '../augment';

function nodeName(elem, name) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
}

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

export class FormBuilder {
  /**
   * @private
   */
  _initialValues;
  /**
   * @private
   */
  _controls = new Map();
  /**
   * @private
   */
  _errors = new Map();
  /**
   * @private
   */
  _errorCount;

  constructor(initialValues) {
    this._errorCount = signal(0);
    this._initialValues = initialValues;
    for (const [key, value] of Object.entries(initialValues)) {
      const val = [...(Array.isArray(value) ? value : [value])];
      this._controls.set(key, {
        value: val[0],
        validators: val.length > 1 ? val[1] : []
      });
    }
  }

  get hasErrors() {
    return !!this._errorCount();
  }

  /**
   * @type Map
   */
  get errors() {
    this._checkValidity();
    return this._errors;
  }

  /**
   * @type boolean
   */
  get valid() {
    this._checkValidity();
    return this._errors.size ? false : true;
  }

  /**
   * @type Object
   */
  get value() {
    const values = {};
    for (const [key, value] of this._controls) {
      values[key] = value.value;
    }
    return values;
  }

  getControl(controlName) {
    return this._controls.get(controlName);
  }

  changeHandler(key) {
    return (e) => {
      const value = _getTargetValue(e.target);
      this.getControl(key).value = value;
      this._errorCount.set(0);
    };
  }

  reset() {
    for (const [key, value] of Object.entries(this._initialValues)) {
      const val = [...(Array.isArray(value) ? value : [value])];
      this._controls.get(key).value = JSON.parse(JSON.stringify(val))[0];
    }
    this._errors.clear();
    this._errorCount.set(0);
  }

  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [key, { value, validators }] of this._controls) {
      for (const validator of validators) {
        const validity = validator(value);
        if (validity !== null) {
          if (this._errors.has(key)) {
            this._errors.set(key, { ...this._errors.get(key), ...validity });
          } else {
            this._errors.set(key, validity);
          }
        }
      }
    }
    this._errorCount.set(this._errors.size);
  }
}
