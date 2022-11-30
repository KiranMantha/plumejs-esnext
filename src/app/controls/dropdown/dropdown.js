import { Component, html, Renderer } from '../../../lib';
import { isOutOfViewPort } from '../helper.js';
import dropdownStyles from './dropdown.scss';

const defaultDropdownOptions = {
  options: [],
  multiple: false,
  defaultText: 'Select',
  buttonText: null,
  enableFilter: false,
  disable: false,
  resetDropdown: false
};

class DropdownComponent {
  dropdownOptions = { ...defaultDropdownOptions };
  #detailsNode;
  #summaryNode;
  #optionsContainerNode;
  #summaryText;
  #isMultiSelect = false;
  #selectedOptions = [];

  constructor(renderer) {}

  onPropsChanged() {
    if (this.dropdownOptions.options.length) {
      this.dropdownOptions = {
        ...defaultDropdownOptions,
        ...this.dropdownOptions
      };
      const { multiple, resetDropdown } = this.dropdownOptions;
      if (!!resetDropdown) {
        this._selectedOptions = [];
        this.dropdownOptions.options = this.dropdownOptions.options.map((option) => {
          option.selected = false;
          return option;
        });
      }
      this.#isMultiSelect = multiple;
      this.#getSummaryText();
    }
  }

  onOptionSelected(isChecked, selectedOption, index) {
    let selectedText = '';

    if (!this.#isMultiSelect) {
      //get button text
      selectedText = selectedOption.label;
      this.#detailsNode.removeAttribute('open');
    } else {
      // update selected options
      this.dropdownOptions.options[index].selected = isChecked;
      this.#selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);

      //get button text
      if (this.dropdownOptions.buttonText) {
        selectedText = this.dropdownOptions.buttonText(this.#selectedOptions);
      } else if (this.#selectedOptions.length) {
        selectedText = this.#selectedOptions.map((item) => item.label).join(', ');
      } else {
        selectedText = this.dropdownOptions.defaultText;
      }
    }

    //set button text and emit selected options
    this.#summaryNode.textContent = selectedText;
    this.renderer.emitEvent('optionselected', {
      option: !this.#isMultiSelect ? selectedOption : this.#selectedOptions
    });
  }

  #getSummaryText() {
    this.#selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
    if (this.#isMultiSelect) {
      this.#summaryText = this.#selectedOptions.map((item) => item.label).join(',') || this.dropdownOptions.defaultText;
    } else {
      if (this.#selectedOptions.length) {
        this.#summaryText = this.#selectedOptions[0].label;
      } else {
        this.dropdownOptions.options[0].selected = true;
        this.#summaryText = this.dropdownOptions.options[0].label;
      }
    }
  }

  #buildItems() {
    const items = this.dropdownOptions.options.map((item, index) => {
      return html`
        <li>
          <input
            name="select"
            id="id-${index}"
            type="${this.#isMultiSelect ? 'checkbox' : 'radio'}"
            checked=${!!item.selected}
            onchange=${(e) => {
              this.onOptionSelected(e.target.checked, item, index);
            }}
          />
          <label for="id-${index}"> ${item.label} </label>
        </li>
      `;
    });
    if (this.dropdownOptions.enableFilter) {
      const filterNode = html` <li class="filter">
        <input
          type="search"
          oninput=${(e) => {
            this.#filterList(e);
          }}
        />
      </li>`;
      items.unshift(filterNode);
    }
    return items;
  }

  #filterList(e) {
    const filterText = e.target.value;
    const labels = this.#optionsContainerNode.querySelectorAll('label');
    Array.from(labels).forEach((element) => {
      const itemText = element.textContent || element.innerText;
      if (filterText) {
        if (itemText.toLowerCase().indexOf(filterText) !== -1) {
          element.parentElement.classList.remove('hide-item');
        } else {
          element.parentElement.classList.add('hide-item');
        }
      } else {
        element.parentElement.classList.remove('hide-item');
      }
    });
  }

  #onDropdownToggle() {
    if (this.#detailsNode.open) {
      if (isOutOfViewPort(this.#optionsContainerNode)) {
        this.#detailsNode.classList.add('reverse');
      } else {
        this.#detailsNode.classList.remove('reverse');
      }
    } else {
      this.#detailsNode.classList.remove('reverse');
    }
  }

  render() {
    if (this.dropdownOptions.options.length) {
      return html`
        <details
          role="dropdown"
          class="${this.dropdownOptions.disable ? 'disabled' : ''}"
          ref=${(node) => {
            this.#detailsNode = node;
          }}
          ontoggle=${() => {
            this.#onDropdownToggle();
          }}
        >
          <summary
            ref=${(node) => {
              this.#summaryNode = node;
            }}
          >
            ${this.#summaryText}
          </summary>
          <ul
            ref=${(node) => {
              this.#optionsContainerNode = node;
            }}
          >
            ${this.#buildItems()}
          </ul>
        </details>
      `;
    } else {
      return html`<div></div>`;
    }
  }
}

Component(
  {
    selector: 'ui-dropdown',
    styles: dropdownStyles,
    standalone: true,
    deps: [Renderer]
  },
  DropdownComponent
);
