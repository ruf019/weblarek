import './scss/styles.scss';
import { ProductCatalog, } from './components/models/ProductCatalog';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { apiProducts } from './utils/data';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/api/WebLarekApi';
import { API_URL } from './utils/constants';


/* ----- ProductCatalog ----- */
const productsModel = new ProductCatalog();

productsModel.setProducts(apiProducts.items);

console.log('========== Тестирование методов класса ProductCatalog ==========');
console.log('Массив товаров из каталога:', productsModel.getProducts());

const firstProduct = productsModel.getProducts()[0];
const secondProduct = productsModel.getProducts()[1];

console.log('Товар по id:', productsModel.getProductById(firstProduct.id));

productsModel.setSelectedProduct(firstProduct);
console.log('Выбранный товар:', productsModel.getSelectedProduct());


/* ----- Cart ----- */
const cartModel = new Cart();

if (firstProduct) {
  cartModel.addProduct(firstProduct);
}

if (secondProduct) {
  cartModel.addProduct(secondProduct);
}

console.log('========== Тестирование класса Cart ==========');
console.log('Товары в корзине:', cartModel.getProducts());
console.log('Количество товаров в корзине:', cartModel.getCount());
console.log('Общая стоимость корзины:', cartModel.getTotalPrice());


console.log('Есть ли первый товар в корзине:', cartModel.hasProduct(firstProduct.id));

cartModel.removeProduct(firstProduct);
console.log('Корзина после удаления первого товара:', cartModel.getProducts());
console.log('Есть ли первый товар в корзине после удаления:', cartModel.hasProduct(firstProduct.id));

cartModel.clear();
console.log('Корзина после очистки:', cartModel.getProducts());

/* ----- Buyer ----- */
const buyerModel = new Buyer();

console.log('========== Тестирование класса Buyer ==========');
console.log('Начальные данные покупателя:', buyerModel.getData());
console.log('Ошибки валидации при пустых полях:', buyerModel.validate());

buyerModel.setData({
  address: 'Москва, ул. Ленина, д. 10',
});

console.log('После добавления адреса:', buyerModel.getData());
console.log('Ошибки после добавления адреса:', buyerModel.validate());

buyerModel.setData({
  phone: '+79990000000',
  email: 'user@example.com',
});

console.log('После добавления телефона и email:', buyerModel.getData());
console.log('Ошибки после добавления телефона и email:', buyerModel.validate());

buyerModel.setData({
  payment: 'online',
});

console.log('После добавления способа оплаты:', buyerModel.getData());
console.log('Ошибки после полного заполнения:', buyerModel.validate());

buyerModel.clear();
console.log('Данные покупателя после очистки:', buyerModel.getData());
console.log('Ошибки после очистки:', buyerModel.validate());

/* ----- WebLarekApi ----- */
const baseApi = new Api(API_URL);
const webLarekApi = new WebLarekApi(baseApi);

console.log('========== Тестирование WebLarekApi ==========')
webLarekApi.getProducts()
  .then((data) => {
    productsModel.setProducts(data.items);
    console.log('Товары с сервера:', data);
    console.log('Каталог в модели:', productsModel.getProducts());
  })
  .catch((error) => {
    console.error('Ошибка получения товаров:', error);
  });