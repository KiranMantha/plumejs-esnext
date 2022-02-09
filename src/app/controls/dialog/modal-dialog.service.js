import { Service } from '../../../lib';

export class DialogService {
  alert(message) {
    return this.#prompt('app-alert-dialog', message);
  }

  confirm(message) {
    return this.#prompt('app-confirm-dialog', message);
  }

  modal(props) {
    const element = this.#createComponent('app-modal-dialog', {
        modalData: {
          title: props.modalTitle,
          hideDefaultCloseButton: props.hideDefaultCloseButton,
          bodyTemplate: props.renderTemplate()
        }
      }),
      instance = element.getInstance();
    instance.showModal();
    instance.dialogActions.then((close) => {
      if (close) {
        this.#removeComponent(element);
      }
    });

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
