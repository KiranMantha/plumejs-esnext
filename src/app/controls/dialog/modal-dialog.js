import { Component, html } from '../../../lib';

class Dialog {
  dialogRef;
  #userInput;
  #dialogActions;
  resolveDialogActions;
  resolveUserInput;

  constructor() {
    this.#userInput = new Promise((resolve) => {
      this.resolveUserInput = resolve;
    });
    this.#dialogActions = new Promise((resolve) => {
      this.resolveDialogActions = resolve;
    });
  }

  showModal() {
    this.dialogRef.showModal();
    return this.userInput;
  }

  getUserInput() {
    return this.#userInput;
  }

  getDialogActions() {
    return this.#dialogActions;
  }
}

class ModalDialog extends Dialog {
  modalData;
  #modalClosedPromise;
  #resolveModalClose;

  constructor() {
    super();
    this.#modalClosedPromise = new Promise((resolve) => {
      this.#resolveModalClose = resolve;
    });
  }

  afterClosed() {
    return this.#modalClosedPromise;
  }

  close() {
    this.dialogRef.close();
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
            this.dialogRef.close();
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

class AlertDialog extends Dialog {
  alert = '';

  constructor() {
    super();
  }

  onConfirm() {
    this.resolveUserInput(true);
    this.dialogRef.close();
    this.resolveDialogActions(true);
  }

  render() {
    if (!this.alert) {
      return html``;
    } else {
      return html`
        <dialog
          ref=${(node) => {
            this.dialogRef = node;
          }}
        >
          <section>${this.alert}</section>
          <menu>
            <button
              onclick=${() => {
                this.onConfirm();
              }}
            >
              Ok
            </button>
          </menu>
        </dialog>
      `;
    }
  }
}

class ConfirmDialog extends Dialog {
  alert;

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

  render() {
    if (!this.alert) {
      return html``;
    } else {
      return html`
        <dialog
          ref=${(node) => {
            this.dialogRef = node;
          }}
        >
          <section>${this.alert}</section>
          <menu>
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
          </menu>
        </dialog>
      `;
    }
  }
}

Component({ selector: 'app-alert-dialog' }, AlertDialog);
Component({ selector: 'app-confirm-dialog' }, ConfirmDialog);
Component({ selector: 'app-modal-dialog' }, ModalDialog);
