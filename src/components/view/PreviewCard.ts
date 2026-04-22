import { ensureElement } from "../../utils/utils";
import { ICardActions } from "./Card";
import { CardWithImage, ICardWithImageData } from "./CardWithImage";

interface IPreviewCardData extends ICardWithImageData {
  description: string;
}

export class PreviewCard extends CardWithImage<IPreviewCardData> {
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
}