import { IProduct } from '../../types/index.ts'
import { IEvents } from '../base/Events.ts';

export class ProductCatalog {
  protected products: IProduct[];
  protected selectedProduct: IProduct | null;

  constructor(protected events: IEvents) {
    this.products = [];
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('catalog:changed')
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit('selectedProduct:changed');
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}