import { Component, html, Renderer } from '../../../lib';
import { isOutOfViewPort } from '../helper.js';

const defaultDropdownOptions = {
  options: [],
  multiple: false,
  defaultText: 'Select',
  buttonText: null,
  enableFilter: false,
  disable: false,
  resetDropdown: false
};

@Component({
  selector: 'ui-dropdown',
  styles: import('./dropdown.scss?inline'),
  standalone: true,
  deps: [Renderer]
})
class DropdownComponent {
  static observedProperties = ['dropdownOptions'];

  dropdownOptions = { ...defaultDropdownOptions };
  detailsNode;
  summaryNode;
  optionsContainerNode;
  isMultiSelect = false;
  selectedOptions = [];

  constructor(renderer) {}

  onPropertiesChanged() {
    if (this.dropdownOptions.options.length) {
      this.dropdownOptions = {
        ...defaultDropdownOptions,
        ...this.dropdownOptions
      };
      const { multiple, resetDropdown } = this.dropdownOptions;
      if (!!resetDropdown) {
        this.optionsContainerNode.innerHTML = '';
        this.selectedOptions = [];
        this.dropdownOptions.options = this.dropdownOptions.options.map((option) => {
          option.selected = false;
          return option;
        });
      } else {
        this.selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
      }
      this.isMultiSelect = multiple;
    }
  }

  onOptionSelected(isChecked, selectedOption, index) {
    if (!this.isMultiSelect) {
      this.selectedOptions = [selectedOption];
    } else {
      // update selected options
      this.dropdownOptions.options[index].selected = isChecked;
      this.selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
    }

    //set button text and emit selected options
    this.summaryNode.textContent = this.getSummaryText();
    this.renderer.emitEvent('optionselected', {
      option: !this.isMultiSelect ? selectedOption : this.selectedOptions
    });
  }

  getSummaryText() {
    if (this.isMultiSelect) {
      if (this.selectedOptions.length) {
        return (
          this.dropdownOptions.buttonText?.(this.selectedOptions) ||
          this.selectedOptions.map((item) => item.label).join(',')
        );
      } else {
        return this.dropdownOptions.defaultText;
      }
    } else {
      if (this.selectedOptions.length) {
        return this.selectedOptions[0].label;
      } else {
        this.dropdownOptions.options[0].selected = true;
        return this.dropdownOptions.options[0].label;
      }
    }
  }

  buildItems() {
    const items = this.dropdownOptions.options.map((item, index) => {
      return html`
        <li>
          <input
            name="select"
            id="id-${index}"
            type="${this.isMultiSelect ? 'checkbox' : 'radio'}"
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
            this.filterList(e);
          }}
        />
      </li>`;
      items.unshift(filterNode);
    }
    return items;
  }

  filterList(e) {
    const filterText = e.target.value;
    const labels = this.optionsContainerNode.querySelectorAll('label');
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

  onDropdownToggle() {
    if (this.detailsNode.open) {
      if (isOutOfViewPort(this.optionsContainerNode)) {
        this.detailsNode.classList.add('reverse');
      } else {
        this.detailsNode.classList.remove('reverse');
      }
    } else {
      this.detailsNode.classList.remove('reverse');
    }
  }

  render() {
    if (this.dropdownOptions.options.length) {
      return html`
        <details
          role="dropdown"
          class="${this.dropdownOptions.disable ? 'disabled' : ''}"
          data-preserve-attributes="${this.isMultiSelect}"
          ref=${(node) => {
            this.detailsNode = node;
          }}
          ontoggle=${() => {
            this.onDropdownToggle();
          }}
        >
          <summary
            ref=${(node) => {
              this.summaryNode = node;
            }}
          >
            ${this.getSummaryText()}
          </summary>
          <ul
            ref=${(node) => {
              this.optionsContainerNode = node;
            }}
          >
            ${this.buildItems()}
          </ul>
        </details>
      `;
    } else {
      return html``;
    }
  }
}
