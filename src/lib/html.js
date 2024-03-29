/**
 * Useful Links
 * https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * https://www.programmersought.com/article/9331587598/
 * https://medium.com/@trukrs/tagged-template-literal-for-html-templates-4820cf5538f9
 */

const { html, render } = (() => {
  const isAttributeRegex = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  const isNodeRegex = /<[a-z][^>]+$/i;
  const attributePrefix = 'attr';
  const attributeRegex = /^attr([^ ]+)/;
  const insertNodePrefix = 'insertNode';
  const insertNodeRegex = /^insertNode([^ ]+)/;
  let refNodes = [];
  let inputPropsNodes = [];

  const _sanitize = (data) => {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '(': '%28',
      ')': '%29'
    };
    let str = JSON.stringify(data);
    const replaceTag = (tag) => tagsToReplace[tag] || tag;
    const safe_tags_replace = (str) => str.replace(/[&<>\(\)]/g, replaceTag);
    str = safe_tags_replace(str);
    return JSON.parse(str);
  };

  const _setValuesForDropdown = (node, value) => {
    const options = node.options,
      values = Array.isArray(value) ? value : [value];
    let optionSet,
      option,
      i = options.length;

    while (i--) {
      option = options[i];
      const value = option.getAttribute('value') ?? (option.textContent.match(/[^\x20\t\r\n\f]+/g) || []).join(' ');
      if ((option.selected = values.indexOf(value) > -1)) {
        optionSet = true;
      }
    }

    // Force browsers to behave consistently when non-matching value is set
    if (!optionSet) {
      node.selectedIndex = -1;
    }
  };

  const _createFragment = (markup) => {
    const temp = document.createElement('template');
    temp.innerHTML = markup;
    return temp.content;
  };

  const _bindDataInput = (node, val, symbol) => {
    const fn = () => {
      setTimeout(() => {
        if (node.isConnected) {
          const event = new CustomEvent('bindprops', {
            detail: {
              props: val
            },
            bubbles: false
          });
          node.dispatchEvent(event);
        }
      });
    };
    node[symbol] = JSON.stringify(val);
    inputPropsNodes.push(fn);
  };

  const _bindFragments = (fragment, values) => {
    const elementsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT, null);
    let node = elementsWalker.nextNode();
    while (node) {
      if (node.hasAttributes()) {
        const customAttributes = Array.from(node.attributes).filter((attr) => attributeRegex.test(attr.nodeName));
        for (const { nodeName, nodeValue } of customAttributes) {
          const i = attributeRegex.exec(nodeName)[1];
          switch (true) {
            case /^on+/.test(nodeValue): {
              const eventName = nodeValue.slice(2).toLowerCase();
              node.removeEventListener(eventName, values[i]);
              node.addEventListener(eventName, values[i]);
              break;
            }
            case /ref/.test(nodeValue): {
              const closure = function () {
                this.node.isConnected && this.fn(this.node);
              }.bind({ node, fn: values[i] });
              refNodes.push(closure);
              break;
            }
            case /^data-+/.test(nodeValue):
            case /^aria-+/.test(nodeValue): {
              if (nodeValue === 'data-input') {
                _bindDataInput(node, values[i], Symbol('input'));
              } else {
                node.setAttribute(nodeValue, _sanitize(values[i]));
              }
              break;
            }
            case /class/.test(nodeValue): {
              if (values[i]) {
                node.classList.add(...values[i].split(' '));
              } else {
                node.setAttribute('class', '');
              }
              break;
            }
            case /value/.test(nodeValue): {
              if (node.nodeName.toLowerCase() === 'select') {
                _setValuesForDropdown(node, values[i]);
              } else {
                node.value = _sanitize(values[i]);
              }
              break;
            }
            case /disabled/.test(nodeValue):
            case /checked/.test(nodeValue): {
              if (values[i]) {
                node.setAttribute(nodeValue, values[i]);
              } else {
                node.removeAttribute(nodeValue);
              }
              break;
            }
            default: {
              node.setAttribute(nodeValue, _sanitize(values[i]));
            }
          }
          node.removeAttribute(nodeName);
        }
      }
      node = elementsWalker.nextNode();
    }
  };

  const _replaceInsertNodeComments = (fragment, values) => {
    const commentsWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_COMMENT, null);
    let node = commentsWalker.nextNode(),
      match;
    while (node) {
      if ((match = insertNodeRegex.exec(node.data))) {
        const nodesList = Array.isArray(values[match[1]]) ? values[match[1]] : [values[match[1]]];
        node.replaceWith(...nodesList);
        commentsWalker.currentNode = fragment;
      }
      node = commentsWalker.nextNode();
    }
  };

  /**
   * update node attributes y comparing present node and compiled node
   * @param {HTMLElement} templateNode
   * @param {HTMLElement} domNode
   */
  const _diffAttributes = (templateNode, domNode) => {
    if (!templateNode || !domNode || templateNode.nodeType !== 1 || domNode.nodeType !== 1) return;
    const templateAtts = templateNode.attributes;
    const existingAtts = domNode.attributes;
    const preserveAttributesAttr = domNode.getAttribute('data-preserve-attributes');
    const preserveExistingAttributes = preserveAttributesAttr && preserveAttributesAttr === 'true';

    for (const { name, value } of templateAtts) {
      if (!existingAtts[name] || existingAtts[name] !== value) {
        domNode.setAttribute(name, value);
      }
    }

    if (!preserveExistingAttributes) {
      for (const { name } of existingAtts) {
        if (!templateAtts[name]) {
          domNode.removeAttribute(name);
        }
      }
    }

    if (domNode.tagName.toLowerCase() === 'input') {
      domNode.value = templateNode.value;
    }

    if (domNode.tagName.indexOf('-') > -1 && templateNode.tagName.indexOf('-') > -1) {
      const templateInputSymbol = Object.getOwnPropertySymbols(templateNode).find(
        (symbol) => symbol.description === 'input'
      );
      const domInputSymbol = Object.getOwnPropertySymbols(domNode).find((symbol) => symbol.description === 'input');
      const templateInput = templateInputSymbol ? templateNode[templateInputSymbol] : '';
      const domInput = domInputSymbol ? domNode[domInputSymbol] : '';
      if (templateInput && domInput && templateInput !== domInput) {
        _bindDataInput(domNode, JSON.parse(templateInput), domInputSymbol);
      }
    }
  };

  /**
   * Get the type for a node
   * @param  {Node}   node The node
   * @return {String}      The type
   */
  const _getNodeType = (node) => {
    if (node.nodeType === 3) return 'text';
    if (node.nodeType === 8) return 'comment';
    return node.tagName.toLowerCase();
  };

  /**
   * Get the content from a node
   * @param  {Node} node The node
   * @return {String} The type
   */
  const _getNodeContent = (node) => {
    if (node.childNodes && node.childNodes.length > 0) return null;
    return node.textContent;
  };

  /**
   * Compare the template to the UI and make updates
   * @param  {Node} template The template HTML
   * @param  {Node} element The UI HTML
   */
  const _diff = (template, element, isChildDiffing) => {
    // Get arrays of child nodes
    const domNodes = element ? Array.from(element.childNodes) : [];
    const templateNodes = template ? Array.from(template.childNodes) : [];

    // If extra elements in DOM, remove them
    let count = domNodes.length - templateNodes.length;
    if (count > 0) {
      for (; count > 0; count--) {
        domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
      }
    }

    // Diff each item in the templateNodes
    templateNodes.forEach(function (node, index) {
      const domNode = domNodes[index];

      _diffAttributes(node, domNode);

      // Discard diffing of children custom elements
      if (isChildDiffing && domNode && domNode.nodeType === 1 && domNode.tagName.indexOf('-') > -1) {
        return;
      }

      // If element doesn't exist, create it
      if (!domNode) {
        element && element.appendChild(node);
        return;
      }

      // If element is not the same type, replace it with new element
      if (_getNodeType(node) !== _getNodeType(domNode)) {
        domNode.replaceWith(node);
        return;
      }

      // If content is different, update it
      const templateContent = _getNodeContent(node);
      if (templateContent && templateContent !== _getNodeContent(domNode)) {
        domNode.textContent = templateContent;
        return;
      }

      // If target element should be empty, wipe it
      if (domNode.childNodes.length > 0 && node.childNodes.length < 1) {
        domNode.innerHTML = '';
        return;
      }

      // If element is empty and shouldn't be, build it up
      // This uses a document fragment to minimize reflows
      if (domNode.childNodes.length < 1 && node.childNodes.length > 0) {
        const fragment = document.createDocumentFragment();
        _diff(node, fragment, false);
        domNode.appendChild(fragment);
        return;
      }

      // If there are existing child elements that need to be modified, diff them
      if (node.childNodes.length > 0) {
        _diff(node, domNode, true);
        return;
      }
    });
  };

  /**
   * tagged literals which construct dom nodes
   * @param {.*} templates
   * @param {...any[]} values
   * @return DocumentFragment
   */
  const html = (templates, ...values) => {
    let result = '';
    const { length } = templates;

    for (let i = 1; i < length; i++) {
      const variable = values[i - 1];
      let isAttributePart = false;
      result += templates[i - 1];
      if (isAttributeRegex.test(result) && isNodeRegex.test(result)) {
        result = result.replace(
          isAttributeRegex,
          (_, $1, $2) => `${attributePrefix}${i - 1}=${$2 || '"'}${$1}${$2 ? '' : '"'}`
        );
        isAttributePart = true;
      }

      if (!isAttributePart) {
        switch (true) {
          case Array.isArray(variable):
          case variable instanceof DocumentFragment: {
            result += `<!--${insertNodePrefix}${i - 1}-->`;
            break;
          }
          case typeof variable === 'object' && variable !== null: {
            if ('html' in variable) {
              result += variable['html'];
            }
            break;
          }
          default: {
            result += variable || '';
          }
        }
      }
    }

    result += templates[length - 1];
    const fragment = _createFragment(result.trim());
    _bindFragments(fragment, values);
    _replaceInsertNodeComments(fragment, values);
    return fragment;
  };

  /**
   * Renders template literals to target dom node
   * @param {HTMLElement} where
   * @param {(templates: any, ...values: any[]) => DocumentFragment} what
   */
  const render = (where, what) => {
    if (where && !where.children.length) {
      where.innerHTML = '';
      where.appendChild(what);
    } else {
      _diff(what, where, false);
    }
    refNodes.forEach((fn) => {
      fn();
    });
    refNodes = [];

    inputPropsNodes.forEach((fn) => {
      fn();
    });
    inputPropsNodes = [];
  };

  return { html, render };
})();

export { html, render };
