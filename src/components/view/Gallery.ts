import { Component } from "../base/Component";

interface IGalleryData {
  cards: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
  constructor(container: HTMLElement) {
    super(container);
  }

  set cards(items: HTMLElement[]) {
    this.container.replaceChildren(...items)
  }
}