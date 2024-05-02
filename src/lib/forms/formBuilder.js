import { FieldArray } from './fieldArray';
import { FormControl } from './formControl';

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
  _errorCount = 0;
  /**
   * @private
   */
  _isSubmitted = false;

  constructor(initialValues) {
    this._initialValues = initialValues;
    for (const [key, value] of Object.entries(initialValues)) {
      if (value instanceof FieldArray) {
        this._controls.set(key, value);
      } else {
        this._controls.set(key, new FormControl(key, value, { setError: this._setError.bind(this) }));
      }
    }
  }

  get hasErrors() {
    return !!this._errorCount;
  }

  /**
   * @type Map
   */
  get errors() {
    return this._errors;
  }

  /**
   * @type boolean
   */
  get valid() {
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

  /**
   * @type boolean
   */
  get submitted() {
    return this._isSubmitted;
  }

  /**
   *
   * @param {string} controlName
   * @returns {value: string; validators: []; isTouched: boolean; errorMessage: string}
   */
  getControl(controlName) {
    return this._controls.get(controlName);
  }

  /**
   *
   * @param {string} key
   * @returns {{ attrs: { name: string; value: string; onchange: (e: Event) => void; onblur: (e: Event) => void }}
   */
  register(key) {
    return this.getControl(key).register();
  }

  /**
   *
   * @param {Event} e
   * @param {(values: Object) => void} fn
   */
  handleSubmit(e, fn) {
    e.preventDefault();
    this._isSubmitted = true;
    this._checkValidity();
    fn(this.value);
  }

  reset() {
    this._controls.forEach((ctrl) => {
      ctrl.reset();
    });
    this._isSubmitted = false;
    this._errors.clear();
    this._errorCount = 0;
  }

  /**
   * @private
   */
  _setError(key, validity) {
    if (validity) {
      this._errors.set(key, validity);
    } else {
      this._errors.delete(key);
    }
    this._errorCount = this._errors.size;
  }

  /**
   * @private
   */
  _checkValidity() {
    this._errors.clear();
    for (const [key] of this._controls) {
      this._executeValidators(key);
    }
    this._errorCount = this._errors.size;
  }

  /**
   * @private
   */
  _executeValidators(controlName) {
    const control = this.getControl(controlName);
    control.validate();
    if (control.validity !== null) {
      this._errors.set(controlName, { ...(this._errors.get(controlName) || {}), ...control.validity });
    } else {
      this._errors.delete(controlName);
    }
  }
}
