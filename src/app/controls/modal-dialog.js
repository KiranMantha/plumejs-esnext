import { Component, html, Renderer } from '../../lib';

export class ModalDialog {
  render() {
    return html`
      <details>
        <summary>i want to be a modal</summary>
        <div>Message</div>
      </details>
    `;
  }
}

Component({ selector: 'app-modal-dialog' }, ModalDialog);
