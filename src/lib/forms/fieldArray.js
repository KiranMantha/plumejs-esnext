import { signal } from '../core';
import { FormControl } from './formControl';

const createToken = () => Math.random().toString(36).substring(2);

export class FieldArray {
  /**
   * @private
   */
  _controls = signal([]);
  /**
   * @private
   */
  _initialCollection = [];

  validity = null;

  constructor(itemCollection) {
    this._initialCollection = itemCollection;
    const controls = this._generateControls(itemCollection);
    this._controls.set(controls);
  }

  get value() {
    const valArr = this.controls.map((fields) => {
      const values = {};
      for (const field of fields) {
        values[field.name] = field.control.value;
      }
      return values;
    });
    return valArr;
  }

  get controls() {
    return this._controls();
  }

  validate() {
    const issues = this.controls
      .flatMap((controls) => {
        const ctrlErrors = controls.filter(({ control }) => {
          control.validate();
          if (control.errorMessage) return control.errorMessage;
        });
        if (ctrlErrors.length) return ctrlErrors;
      })
      .filter(Boolean);

    this.validity = issues.length
      ? {
          invalid: true
        }
      : null;
  }

  append(newItem) {
    this._controls.set((prevValue) => [...prevValue, this._generateItemControls(newItem)]);
  }

  remove(index) {
    const controls = [...this.controls];
    controls.splice(index, 1);
    this._controls.set(controls);
  }

  reset() {
    const controls = this._generateControls(this._initialCollection);
    this.validity = null;
    this._controls.set(controls);
  }

  /**
   * @private
   */
  _generateControls(collection) {
    return collection.map((item) => {
      return this._generateItemControls(item);
    });
  }

  /**
   * @private
   */
  _generateItemControls(item) {
    const items = [];
    const token = createToken();
    for (const [key, value] of Object.entries(item)) {
      const control = {
        name: key,
        control: new FormControl(`${key}-${token}`, value),
        indexedName: `${key}-${token}`
      };
      items.push(control);
    }
    return items;
  }
}
