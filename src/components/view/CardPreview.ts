import { ensureElement } from "../../utils/utils";
import { ICardActions } from "./Card";
import { CardWithImage, ICardWithImageData } from "./CardWithImage";

interface ICardPreviewData extends ICardWithImageData {
  description: string;
  inBasket: boolean;
  available: boolean;
}

export class CardPreview extends CardWithImage<ICardPreviewData> {
  protected descriptionElement: HTMLElement;
  protected purchaseButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.purchaseButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (actions?.onClick) {
      this.purchaseButton.addEventListener('click', actions.onClick);
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set inBasket(value: boolean) {
    this.purchaseButton.textContent = value ? 'Убрать из корзины' : 'Купить';
  }

  set available(value: boolean) {
    this.purchaseButton.disabled = !value;
    this.purchaseButton.textContent = 'Недоступно';
  }
}