import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccessData {
  total: number;
}

export class Success extends Component<ISuccessData> {
  protected descriptionElement: HTMLElement;
  protected successButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
  
    this.successButton.addEventListener('click', () => {
      this.events.emit('modal:close');
    })
  }

  set total(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}