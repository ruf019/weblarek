import { IProduct } from "../../types/index.ts";

export class Cart {
  protected selectedProducts: IProduct[];

  constructor() {
    this.selectedProducts = [];
  }

  getProducts(): IProduct[] {
    return this.selectedProducts;
  }

  addProduct(product: IProduct): void {
    this.selectedProducts.push(product);
  }

  removeProduct(product: IProduct): void {
    this.selectedProducts = this.selectedProducts.filter(item => item.id !== product.id);
  }

  clear(): void {
    this.selectedProducts = [];
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.selectedProducts.forEach(product => {
      totalPrice += (product.price ?? 0);
    })
    return totalPrice
  }

  getCount(): number {
    return this.selectedProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.selectedProducts.some(product => product.id === id);
  }
}