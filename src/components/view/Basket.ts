import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasketData {
  items: HTMLElement[];
  total: number;
  disabled: boolean;
}

export class Basket extends Component<IBasketData> {
  protected listElement: HTMLElement;
  protected placeOrderButton: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.placeOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);

    this.placeOrderButton.addEventListener('click', () => {
      this.events.emit('order:open');
    })
  }

  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set total(value: number) {
    this.priceElement.textContent = `${value} синапсов`
  }

  set disabled(value: boolean) {
    this.placeOrderButton.disabled = value;
  }
}