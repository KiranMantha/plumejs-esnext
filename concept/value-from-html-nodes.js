function resolveValue({ target, detail }, setter) {
  let value;

  switch (target.type) {
    case 'radio':
    case 'checkbox':
      value = target.checked && target.value;
      break;
    case 'file':
      value = target.files;
      break;
    default:
      value = detail && hasOwnProperty.call(detail, 'value') ? detail.value : target.value;
  }

  setter(value);
}

const getValue = (el) => {
  if (el.options && el.multiple) {
    return [...el.options].filter((option) => option.selected).map((option) => option.value);
  } else {
    return el.value;
  }
};
