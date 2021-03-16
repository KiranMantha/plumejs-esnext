// https://medium.com/@KevinBGreene/adventures-in-the-virtual-dom-part-2-the-diff-render-loop-dac7f879bb21
const h = (tag, props, ...children) => {
  if (typeof tag === "function") {
    if (tag.name !== 'hF') {
      return new tag(props, ...children);
    } else {
      return tag(props, ...children);
    }
  }
  const element = document.createElement(tag);

  for (let name in (props || {})) {
    const value = props[name];
    switch (name) {
      case 'ref': {
        value.current = element;
        break;
      }
      case 'aria': {
        aria(element, value);
        break;
      }
      case 'data': {
        data(element, value);
        break;
      }
      default: {
        if (name.startsWith("on")) {
          element.addEventListener(name.toLowerCase().substr(2), value);
        } else {
          element.setAttribute(name, value.toString());
        }
      }
    }
  }

  children.forEach(child => {
    appendChild(element, child);
  });

  return element;
};

const aria = (ref, values) => {
  for (var key in values) {
    var name = key === 'role' ? key : "aria-".concat(key);
    var value = values[key];
    if (value == null) {
      ref.removeAttribute(name);
    } else {
      ref.setAttribute(name, value);
    }
  }
}

const data = (ref, values) => {
  var dataset = ref.dataset;
  for (var key in values) {
    var value = values[key];
    if (value == null) {
      delete dataset[key];
    } else {
      dataset[key] = value;
    }
  }
}

const appendChild = (parent, child) => {
  if (Array.isArray(child)) {
    child.forEach(nestedChild => appendChild(parent, nestedChild));
  } else {
    parent.appendChild(child.nodeType ? child : document.createTextNode(child));
  }
};

const hF = (props, ...children) => {
  return children;
};

const runtime = {
  h,
  hF
}

export default runtime;