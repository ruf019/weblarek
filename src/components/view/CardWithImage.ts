import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICardData } from "./Card";

export interface ICardWithImageData extends ICardData {
  category: string;
  image: string;
}

type CategoryKey = keyof typeof categoryMap;

export abstract class CardWithImage<T extends ICardWithImageData> extends Card<T> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      )
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}${value}`, this.title)
  }
}