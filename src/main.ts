import { WebLarekApi } from "./components/api/WebLarekApi";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Cart } from "./components/models/Cart";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { Basket } from "./components/view/Basket";
import { CardBasket } from "./components/view/CardBasket";
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
const productCatalogModel = new ProductCatalog(events);
const cartModel = new Cart(events);

// DOM-элементы и шаблоны
const galleryElement = ensureElement<HTMLElement>(".gallery");
const catalogCardTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const previewCardTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const modalElement = ensureElement<HTMLElement>("#modal-container");
const headerElement = ensureElement<HTMLElement>(".header");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const basketCardTemplate = ensureElement<HTMLTemplateElement>("#card-basket");

// View-компоненты
const galleryView = new Gallery(galleryElement);
const modalView = new Modal(events, modalElement);
const headerView = new Header(events, headerElement);
const basketView = new Basket(events, cloneTemplate(basketTemplate));
const previewCard = new CardPreview(cloneTemplate(previewCardTemplate), {
  onClick: () => events.emit("card:toggle"),
});

// Рендер корзины
function renderBasketContent() {
  const cardsInBasket = cartModel.getProducts().map((product, index) => {
    const card = new CardBasket(cloneTemplate(basketCardTemplate), {
      onClick: () => events.emit("basket:cardDelete", product),
    });

    return card.render({
      ...product,
      index: index + 1,
    });
  });

  return basketView.render({
    items: cardsInBasket,
    total: cartModel.getTotalPrice(),
    disabled: cartModel.getCount() === 0
  })
}

// Подписки на события
events.on("catalog:changed", () => {
  const productCards = productCatalogModel.getProducts().map((product) => {
    const card = new CardCatalog(cloneTemplate(catalogCardTemplate), {
      onClick: () => events.emit("card:select", product),
    });

    return card.render(product);
  });

  galleryView.render({ cards: productCards });
});

events.on<IProduct>("card:select", (product) => {
  productCatalogModel.setSelectedProduct(product);
});

events.on('selectedProduct:changed', () => {
  const selectedProduct = productCatalogModel.getSelectedProduct();
  if (!selectedProduct) return;

  modalView.render({
    content: previewCard.render({
      ...selectedProduct,
      inBasket: cartModel.hasProduct(selectedProduct.id),
      available: selectedProduct.price !== null,
    }),
  });

  modalView.open();
})

events.on("modal:close", () => {
  modalView.close();
});

events.on("card:toggle", () => {
  const selectedProduct = productCatalogModel.getSelectedProduct();
  if (!selectedProduct) return;

  if (cartModel.hasProduct(selectedProduct.id)) {
    cartModel.removeProduct(selectedProduct);
  } else {
    cartModel.addProduct(selectedProduct);
  }

  modalView.close()
});

events.on("basket:changed", () => {
  headerView.render({
    counter: cartModel.getCount(),
  });

  renderBasketContent(); 
});

events.on("basket:open", () => {
  modalView.render({
    content: renderBasketContent(),
  })
  modalView.open();
});

events.on<IProduct>("basket:cardDelete", (product) => {
  cartModel.removeProduct(product);
});

// Старт приложения
webLarekApi
  .getProducts()
  .then((data) => {
    productCatalogModel.setProducts(data.items)
    console.log(productCatalogModel.getProducts())
  })
  .catch((error) => console.error(error));
