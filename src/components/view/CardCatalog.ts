import { ICardActions } from "./Card";
import { CardWithImage, ICardWithImageData } from "./CardWithImage";

interface ICardCatalogData extends ICardWithImageData {};

export class CatalogCard extends CardWithImage<ICardCatalogData> {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}