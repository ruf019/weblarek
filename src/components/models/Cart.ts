import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Cart {
  protected selectedProducts: IProduct[];

  constructor(protected events: IEvents) {
    this.selectedProducts = [];
  }

  getProducts(): IProduct[] {
    return this.selectedProducts;
  }

  addProduct(product: IProduct): void {
    this.selectedProducts.push(product);
    this.events.emit('basket:changed');
  }

  removeProduct(product: IProduct): void {
    this.selectedProducts = this.selectedProducts.filter(item => item.id !== product.id);
    this.events.emit('basket:changed');
  }

  clear(): void {
    this.selectedProducts = [];
  }

  getTotalPrice(): number {
    return this.selectedProducts.reduce((acc, item) => acc + (item.price ?? 0), 0)
  }

  getCount(): number {
    return this.selectedProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.selectedProducts.some(product => product.id === id);
  }
}