//https://gist.github.com/WebReflection/d3aad260ac5007344a0731e797c8b1a4
//https://stackblitz.com/edit/template-literal-engine
import { domdiff } from "./domdiff";

class Node {
  constructor(template, values, count) {
    this.template = template;
    this.values = values;
    this.placeholderCount = count;
  }
}

const core = () => {
  const attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  const empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  const node = /<[a-z][^>]+$/i;
  const notNode = />[^<>]*$/;
  const selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi;
  const trimEnd = /\s+$/;
  const createTreeWalker = document.createTreeWalker;
  const PREFIX = "ip";
  const weakMap = new WeakMap();
  const cache = {
    get: (key) => {
      return weakMap.get(key);
    },
    set: (key, val) => {
      weakMap.set(key, val);
      return val;
    }
  };

  const isNode = (template, i) => {
    return (
      0 < i-- &&
      (node.test(template[i]) ||
        (!notNode.test(template[i]) && isNode(template, i)))
    );
  };

  const regular = (original, name, extra) => {
    return empty.test(name)
      ? original
      : "<"
          .concat(name)
          .concat(extra.replace(trimEnd, ""), "></")
          .concat(name, ">");
  };

  const createPlaceholders = (template, prefix) => {
    let text = [];
    const length = template.length;

    const _loop = i => {
      const chunk = template[i - 1];
      text.push(
        attr.test(chunk) && isNode(template, i)
          ? chunk.replace(attr, (_, $1, $2) => {
              return ""
                .concat(prefix)
                .concat(i - 1, "=")
                .concat($2 || '"')
                .concat($1)
                .concat($2 ? "" : '"');
            })
          : ""
              .concat(chunk, "<!--")
              .concat(prefix)
              .concat(i - 1, "-->")
      );
    };

    for (let i = 1; i < length; i++) {
      _loop(i);
    }

    text.push(template[length - 1]);
    const output = text.join("").trim();
    return output.replace(selfClosing, regular);
  };

  const createTemplate = template => {
    const div = document.createElement("div");
    div.innerHTML = template;
    return document.importNode(div, true);
    // return div;
  };

  const createFragment = template => {
    return document.createDocumentFragment();
  };

  const createWalker = fragment => {
    return createTreeWalker.call(document, fragment, 1 | 128);
  };

  const event = (node, name) => {
    let oldEvent = null;
    return fn => {
      if (oldEvent !== fn && oldEvent) {
        node.removeEventListener(name, oldEvent, false);
      }
      if ((oldEvent = fn)) {
        node.addEventListener(name, oldEvent, false);
      }
    };
  };

  const ref = node => {
    return value => {
      if (typeof value === "function") value(node);
      else value.current = node;
    };
  };

  const handleAnything = node => {
    let oldValue,
      text,
      nodes = [];
    return newValue => {
      switch (typeof newValue) {
        // primitives are handled as text content
        case "string":
        case "number":
        case "boolean": {
          if (oldValue !== newValue) {
            oldValue = newValue;
            if (text) text.textContent = newValue;
            else text = document.createTextNode(newValue);
            node.parentNode.appendChild(text);
            //nodes = diff(comment, nodes, [text]);
          }
          break;
        }
      }
    };
  };

  const handleAttr = (node, name) => {
    if (name === "ref") return ref(node);
    if (name.slice(0, 2) === "on")
      return event(node, name.slice(2).toLowerCase());
  };

  const appendNodes = (where, nodes) => {
    for (const node of nodes) {
      where.appendChild(node);
    }
  };

  const mapNodes = (template, what) => {
    const values = what.values;
    const tmpl = createTemplate(template);
    const tw = createWalker(tmpl);
    const updates = [];
    const nodes = [];
    const length = what.template.length - 1;
    let i = 0;
    let search = "".concat(PREFIX).concat(i);
    while (i < length) {
      let node = tw.nextNode();
      if (node) {
        if (node.nodeType === 8 && node.textContent === PREFIX + i) {
          updates.push(handleAnything(node));
          search = "".concat(PREFIX).concat(++i);
        } else if (node.nodeType === 1) {
          while (node.hasAttribute(search)) {
            let attrVal = node.getAttribute(search);
            updates.push(handleAttr(node, attrVal));
            node.removeAttribute(search);
            search = "".concat(PREFIX).concat(++i);
          }
        }
        nodes.push(node);
      } else {
        i = length;
      }
    }
    for (let i = 0; i < values.length; i++) {
      updates[i](values[i]);
    }
    if(!nodes.length) nodes = tmpl.childNodes;
    return nodes;
  }

  const html = (...args) => {
    let len = args.length;
    let values = [];
    for (let key = 1; key < len; key++) {
      values[key - 1] = args[key];
    }    
    return new Node(args[0], values);
  };

  const render = (where, what) => {
    const template = cache.get(what.template) || cache.set(what.template, createPlaceholders(what.template, PREFIX));    
    appendNodes(where, mapNodes(template, what));
  };

  return { render, html };
};

const { render, html } = core();

export { render, html };
