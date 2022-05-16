// @flow

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
      const options = Array.from(target.options);
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

class Form {
  #controls;
  #errors = new Map();

  constructor(controls) {
    this.#controls = controls;
  }

  get errors() {
    return this.#errors;
  }

  get valid() {
    return this.#errors.size ? false : true;
  }

  get value() {
    const values = {};
    for (const [key, value] of Object.entries(this.#controls)) {
      values[key] = value.value;
    }
    return values;
  }

  get(controlName) {
    return this.#controls[controlName];
  }

  checkValidity() {
    this.#errors.clear();
    for (const key in this.#controls) {
      const value = this.#controls[key].value;
      const validators = this.#controls[key].validators;
      this.#controls[key].errors = null;
      for (const validator of validators) {
        const validity = validator(value);
        if (validity !== null) {
          if (this.#errors.has(key)) {
            this.#errors.set(key, { ...this.#errors.get(key), ...validity });
            this.#controls[key].errors = {
              ...this.#controls[key].errors,
              ...validity
            };
          } else {
            this.#errors.set(key, validity);
            this.#controls[key].errors = validity;
          }
        }
      }
    }
  }

  reset() {
    for (const key in this.#controls) {
      this.#controls[key].value = '';
    }
    this.#errors.clear();
  }
}

/**
 * hook to maintain form state
 * @param {Object} initialValues
 * @returns [ Form, (key) => (event) => void, () => void ]
 */
const useFormFields = (initialValues) => {
  const controls = {};

  for (const [key, value] of Object.entries(initialValues)) {
    const val = Array.isArray(value) ? value : [value];
    controls[key] = {
      value: val.shift(),
      validators: val
    };
  }

  const form = new Form(controls);

  const createChangeHandler = (key) => (e) => {
    const value = _getTargetValue(e.target);
    form.get(key).value = value;
    form.checkValidity();
  };

  const resetFormFields = () => {
    form.reset();
  };

  return [form, createChangeHandler, resetFormFields];
};

export { useFormFields };
