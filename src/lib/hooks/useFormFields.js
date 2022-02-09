// @flow
import { useState } from './useState';

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

/**
 * hook to maintain form state
 * @param {Object} initialValues
 * @returns [ Object, (key) => (event) => void, () => void ]
 */
const useFormFields = (initialValues) => {
  let [formFields, setFormFields] = useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    let target = e.target;
    const value = _getTargetValue(target);
    setFormFields(() => {
      formFields[key] = value;
      return formFields;
    });
  };
  const resetFormFields = () => {
    for (const key of Object.keys(formFields)) {
      formFields[key] = '';
    }
  };
  return [formFields, createChangeHandler, resetFormFields];
};

export { useFormFields };
