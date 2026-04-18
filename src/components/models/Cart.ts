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
    return this.selectedProducts.reduce((acc, item) => acc + (item.price ?? 0), 0)
  }

  getCount(): number {
    return this.selectedProducts.length;
  }

  hasProduct(id: string): boolean {
    return this.selectedProducts.some(product => product.id === id);
  }
}