import { WebLarekApi } from "./components/api/WebLarekApi";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Cart } from "./components/models/Cart";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { CardCatalog } from "./components/view/CardCatalog";
import { CardPreview } from "./components/view/CardPreview";
import { Gallery } from "./components/view/Gallery";
import { Header } from "./components/view/Header";
import { Modal } from "./components/view/Modal";
import "./scss/styles.scss";
import { IProduct } from "./types";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

// API
const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

// Брокер событий
const events = new EventEmitter();

// Модели данных
const productCatalog = new ProductCatalog(events);
const cart = new Cart(events);

// DOM-элементы и шаблоны
const galleryElement = ensureElement<HTMLElement>(".gallery");
const catalogCardTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const previewCardTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const modalElement = ensureElement<HTMLElement>("#modal-container");
const headerElement = ensureElement<HTMLElement>(".header");

// View-компоненты
const gallery = new Gallery(galleryElement);
const modal = new Modal(events, modalElement);
const header = new Header(events, headerElement);

// Подписки на события
events.on("catalog:changed", () => {
  const productCards = productCatalog.getProducts().map((product) => {
    const card = new CardCatalog(cloneTemplate(catalogCardTemplate), {
      onClick: () => events.emit("card:select", product),
    });

    return card.render(product);
  });

  gallery.render({ cards: productCards });
});

events.on<IProduct>("card:select", (product) => {
  productCatalog.setSelectedProduct(product);

  const previewCard = new CardPreview(cloneTemplate(previewCardTemplate), {
    onClick: () => events.emit("card:toggle", product),
  });

  modal.render({
    content: previewCard.render({
      ...product,
      inBasket: cart.hasProduct(product.id),
      available: product.price !== null,
    }),
  });

  modal.open();
});

events.on("modal:close", () => {
  modal.close();
});

events.on<IProduct>("card:toggle", (product) => {
  if (cart.hasProduct(product.id)) {
    cart.removeProduct(product);
  } else {
    cart.addProduct(product);
  }
});

events.on("basket:changed", () => {
  header.render({
    counter: cart.getCount(),
  });

  const selectProduct = productCatalog.getSelectedProduct();

  if (selectProduct) {
    const previewCard = new CardPreview(cloneTemplate(previewCardTemplate), {
      onClick: () => events.emit("card:toggle", selectProduct),
    });

    modal.render({
      content: previewCard.render({
        ...selectProduct,
        inBasket: cart.hasProduct(selectProduct.id),
        available: selectProduct.price !== null,
      }),
    });
  }
});

// Старт приложения
webLarekApi
  .getProducts()
  .then((data) => productCatalog.setProducts(data.items))
  .catch((error) => console.error(error));
