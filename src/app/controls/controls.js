import { Component, html, Renderer } from '../../lib';
import { DialogService } from './dialog/dialog.service';

@Component({ selector: 'app-nested-modal', deps: [Renderer] })
class NestedModal {
  constructor(renderer) {}
  closeModal() {
    this.renderer.emitEvent('closenestedmodal');
  }

  render() {
    return html`
      i'm in a nested modal.
      <div>
        <button
          onclick=${() => {
            this.closeModal();
          }}
        >
          close this modal
        </button>
      </div>
    `;
  }
}

@Component({ selector: 'app-controls', deps: [DialogService] })
class ControlsComponent {
  dropdownComp;
  dropdownOptions = {
    options: [
      {
        label: 'Option 1',
        value: 'o1'
      },
      {
        label: 'Option 2',
        value: 'o2',
        selected: true
      },
      {
        label: 'Option 3',
        value: 'o3'
      },
      {
        label: 'Option 4',
        value: 'o4'
      }
    ],
    defaultText: 'Select Multiple',
    buttonText: (options) => {
      if (options.length === 0) {
        return 'None selected';
      } else if (options.length > 3) {
        return options.length + ' selected';
      } else {
        return options.map((item) => item.label).join(', ');
      }
    }
  };

  constructor(dialogService) {}

  enableMultiselect(checked) {
    this.dropdownOptions.multiple = checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownComp.setProps({
      dropdownOptions: this.dropdownOptions
    });
  }

  disableDropdown(checked) {
    this.dropdownOptions.disable = checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownComp.setProps({
      dropdownOptions: this.dropdownOptions
    });
  }

  enableFilter(checked) {
    this.dropdownOptions.enableFilter = checked;
    this.dropdownOptions.resetDropdown = true;
    this.dropdownComp.setProps({
      dropdownOptions: this.dropdownOptions
    });
  }

  showAlert() {
    const _alert = this.dialogService.alert('hello world');
    _alert.getUserInput().then((v) => {
      console.log(v);
    });
  }

  showConfirm() {
    const _confirm = this.dialogService.confirm('hello world');
    _confirm.getUserInput().then((v) => {
      console.log(v);
    });
  }

  showModal() {
    const modal = this.dialogService.modal({
      modalTitle: 'Hello World',
      hideDefaultCloseButton: false,
      preventEsc: false,
      renderTemplate: () => html`<p>i'm inside a modal</p>
        <button
          onclick=${() => {
            this.showNestedModal();
          }}
        >
          open nested modal
        </button> `
    });

    modal.afterClosed().then(() => {
      console.log('modal closed');
    });
  }

  showNestedModal() {
    const modal = this.dialogService.modal({
      hideDefaultCloseButton: true,
      renderTemplate: () =>
        html`<app-nested-modal
          onclosenestedmodal=${() => {
            modal.close();
          }}
        ></app-nested-modal>`
    });
  }

  render() {
    return html`
      <fieldset class="fieldset">
        <legend>Dropdown</legend>
        <button onclick=${() => {
          this.dropdownOptions.resetDropdown = true;
          this.dropdownComp.setProps({
            dropdownOptions: this.dropdownOptions
          });
        }}>Reset</button>
        <div style="display: flex; align-items: center;">
          enable multi select: <input type='checkbox' role='switch' onchange=${(e) =>
            this.enableMultiselect(e.target.checked)}></input>
        </div>
        <div style="display: flex; align-items: center;">
          disable dropdown: <input type='checkbox' role='switch' onchange=${(e) =>
            this.disableDropdown(e.target.checked)}></input>
        </div>
        <div style="display: flex; align-items: center;">
          enable filtering: <input type='checkbox' role='switch' onchange=${(e) =>
            this.enableFilter(e.target.checked)}></input>
        </div>
        <ui-dropdown
          class="is-inline-block"
          ref=${(node) => {
            this.dropdownComp = node;
          }}
          data-input=${{ dropdownOptions: this.dropdownOptions }}
          onoptionselected=${(event) => {
            console.log(event.detail);
          }}>
        </ui-dropdown>
      </fieldset>
      <app-modal-dialog></app-modal-dialog>
      <div style="display: flex; align-items: center;">
        Switch: <input type='checkbox' role='switch'></input>
      </div>
      <div>
        <button onclick=${() => {
          this.showAlert();
        }}>show alert</button>
        <button onclick=${() => {
          this.showConfirm();
        }}>show confirm</button>
        <button onclick=${() => {
          this.showModal();
        }}>show modal</button>
      </div>
      <div>
        <app-tree-view></app-tree-view>
      </div>
    `;
  }
}
