import { Component, html } from '../../lib';
import { DialogService } from './dialog/modal-dialog.service';

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
    multiple: true,
    enableFilter: true,
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

  mount() {
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
      preventBackdropClose: false,
      preventEsc: false,
      renderTemplate: () => html`<p>i'm inside a modal</p>`
    });

    modal.afterClosed().then(() => {
      console.log('modal closed');
    });
  }

  render() {
    return html`
      <button onclick=${() => {
        this.dropdownOptions.resetDropdown = true;
        this.dropdownComp.setProps({
          dropdownOptions: this.dropdownOptions
        });
      }}>reset</button>
      <ui-dropdown 
        class="is-inline-block"
        ref=${(node) => {
          this.dropdownComp = node;
        }} 
        onoptionselected=${(event) => {
          console.log(event.detail);
        }}>
      </ui-dropdown>
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
    `;
  }
}

Component({ selector: 'app-controls', deps: [DialogService] }, ControlsComponent);
