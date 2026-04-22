import { ICardActions } from "./Card";
import { CardWithImage, ICardWithImageData } from "./CardWithImage";

interface ICatalogCardData extends ICardWithImageData {};

export class CatalogCard extends CardWithImage<ICatalogCardData> {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}