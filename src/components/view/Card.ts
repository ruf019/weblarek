import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ICardData {
  title: string;
  price: number | null;
}

export interface ICardActions {
  onClick(): void;
}

export abstract class Card<T extends ICardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  get title() {
    return this.titleElement.textContent ?? '';
  }

  set price(value: number | null) {
    this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
  }
}
