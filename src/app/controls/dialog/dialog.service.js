import { fromEvent, Injectable } from '../../../lib';

const DEFAULT_MODAL_PROPS = {
  modalTitle: '',
  hideDefaultCloseButton: false,
  preventBackdropClose: true,
  preventEsc: false,
  renderTemplate: () => html``
};

@Injectable()
class DialogService {
  alert(message) {
    return this.#prompt(message, true);
  }

  confirm(message) {
    return this.#prompt(message, false);
  }

  modal(props) {
    const _props = { ...DEFAULT_MODAL_PROPS, ...props };
    console.log(_props);
    const element = this.#createComponent('app-modal-dialog', {
        modalData: {
          title: _props.modalTitle,
          hideDefaultCloseButton: _props.hideDefaultCloseButton,
          bodyTemplate: _props.renderTemplate()
        }
      }),
      instance = element.getInstance();
    instance.getDialogActions().then((close) => {
      if (close) {
        this.#removeComponent(element);
      }
    });

    if (!_props.preventBackdropClose) {
      const rect = instance.dialogRef.getBoundingClientRect();
      const unsubscribe = fromEvent(instance.dialogRef, 'click', (event) => {
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          instance.close();
          unsubscribe();
        }
      });
    }

    if (_props.preventEsc) {
      fromEvent(instance.dialogRef, 'cancel', (event) => {
        event.preventDefault();
      });
    }

    return {
      close: () => instance.close(),
      afterClosed: () => instance.afterClosed()
    };
  }

  #createComponent(selector, props) {
    const element = document.createElement(selector);
    document.body.appendChild(element);
    element.setProps(props);
    queueMicrotask(() => {
      element.getInstance().showModal();
    });
    return element;
  }

  #removeComponent(element) {
    document.body.removeChild(element);
  }

  #prompt(message, isAlert) {
    const element = this.#createComponent('app-alert-dialog', {
        alertOptions: { message, isAlert }
      }),
      instance = element.getInstance();
    instance.getDialogActions().then((close) => {
      if (close) {
        this.#removeComponent(element);
      }
    });
    return {
      getUserInput: () => instance.getUserInput()
    };
  }
}

export { DialogService };
