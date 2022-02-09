import { Service, fromNativeEvent, html } from '../../../lib';

const DEFAULT_MODAL_PROPS = {
  modalTitle: '',
  hideDefaultCloseButton: false,
  preventBackdropClose: true,
  preventEsc: false,
  renderTemplate: () => html``
};

export class DialogService {
  alert(message) {
    return this.#prompt('app-alert-dialog', message);
  }

  confirm(message) {
    return this.#prompt('app-confirm-dialog', message);
  }

  modal(props) {
    const _props = { ...DEFAULT_MODAL_PROPS, ...props };
    const element = this.#createComponent('app-modal-dialog', {
        modalData: {
          title: _props.modalTitle,
          hideDefaultCloseButton: _props.hideDefaultCloseButton,
          bodyTemplate: _props.renderTemplate()
        }
      }),
      instance = element.getInstance();
    instance.showModal();
    instance.dialogActions.then((close) => {
      if (close) {
        this.#removeComponent(element);
      }
    });

    if (!_props.preventBackdropClose) {
      const unsubscribe = fromNativeEvent(
        element,
        'click',
        (event) => {
          const rect = element.getBoundingClientRect();
          const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            instance.close();
            unsubscribe();
          }
        },
        { once: true }
      );
    }

    if (_props.preventEsc) {
      fromNativeEvent(instance.dialogRef, 'cancel', (event) => {
        event.preventDefault();
      });
    }

    return {
      close: instance.close.bind(instance),
      afterClosed: instance.afterClosed.bind(instance)
    };
  }

  #createComponent(selector, props) {
    const element = document.createElement(selector);
    document.body.appendChild(element);
    element.setProps(props);
    return element;
  }

  #removeComponent(element) {
    document.body.removeChild(element);
  }

  #prompt(selector, message) {
    const element = this.#createComponent(selector, {
        alert: message
      }),
      instance = element.getInstance();
    instance.showModal();
    instance.dialogActions.then((close) => {
      if (close) {
        this.#removeComponent(element);
      }
    });
    return {
      getUserInput: () => {
        return instance.userInput;
      }
    };
  }
}

Service(DialogService);
