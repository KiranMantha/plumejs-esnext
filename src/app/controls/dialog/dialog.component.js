import { Component, html } from '../../../lib';

function promisify() {
  let resolver;
  const promise = new Promise((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
}

class BaseDialog {
  dialogRef;
  #userInput;
  #dialogActions;
  resolveDialogActions;
  resolveUserInput;

  constructor() {
    [this.#userInput, this.resolveUserInput] = promisify();
    [this.#dialogActions, this.resolveDialogActions] = promisify();
  }

  showModal() {
    this.dialogRef.showModal();
    return this.userInput;
  }

  close() {
    this.dialogRef.close();
  }

  getUserInput() {
    return this.#userInput;
  }

  getDialogActions() {
    return this.#dialogActions;
  }
}

@Component({ selector: 'app-modal-dialog' })
class ModalDialog extends BaseDialog {
  observedProperties = ['modalData'];

  modalData;
  #modalClosedPromise;
  #resolveModalClose;

  constructor() {
    super();
    [this.#modalClosedPromise, this.#resolveModalClose] = promisify();
  }

  afterClosed() {
    return this.#modalClosedPromise;
  }

  onDialogClosed() {
    this.#resolveModalClose();
    this.resolveDialogActions(true);
  }

  renderCloseButton() {
    if (this.modalData.hideDefaultCloseButton) {
      return html``;
    } else {
      return html`
        <button
          class="btn-close"
          onclick=${() => {
            this.close();
          }}
        >
          &times;
        </button>
      `;
    }
  }

  render() {
    if (this.modalData) {
      return html`
        <dialog
          ref=${(node) => {
            this.dialogRef = node;
          }}
          onclose=${() => {
            this.onDialogClosed();
          }}
        >
          <div>${this.modalData.title} ${this.renderCloseButton()}</div>
          <section>${this.modalData.bodyTemplate}</section>
        </dialog>
      `;
    } else {
      return html``;
    }
  }
}

@Component({ selector: 'app-alert-dialog' })
class AlertDialog extends BaseDialog {
  observedProperties = ['alertOptions'];

  alertOptions;

  constructor() {
    super();
  }

  onConfirm() {
    this.resolveUserInput(true);
    this.dialogRef.close();
    this.resolveDialogActions(true);
  }

  onCancel() {
    this.resolveUserInput(false);
    this.dialogRef.close();
    this.resolveDialogActions(true);
  }

  renderActionButtons() {
    if (this.alertOptions.isAlert) {
      return html`
        <button
          onclick=${() => {
            this.onConfirm();
          }}
        >
          Ok
        </button>
      `;
    } else {
      return html`
        <button
          onclick=${() => {
            this.onCancel();
          }}
        >
          Cancel
        </button>
        <button
          onclick=${() => {
            this.onConfirm();
          }}
        >
          Ok
        </button>
      `;
    }
  }

  render() {
    if (this.alertOptions) {
      return html`
        <dialog
          ref=${(node) => {
            this.dialogRef = node;
          }}
        >
          <section>${this.alertOptions.message}</section>
          <menu> ${this.renderActionButtons()} </menu>
        </dialog>
      `;
    } else {
      return html``;
    }
  }
}
