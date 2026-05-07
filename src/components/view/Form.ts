import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IFormData {
  valid: boolean;
  errors: string;
}

export class Form<T extends IFormData> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);

    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
    })
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}
