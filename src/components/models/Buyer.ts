import { IBuyer } from "../../types/index.ts";

export class Buyer {
  protected buyerData: IBuyer;

  constructor() {
    this.buyerData = {
      payment: '',
      address: '',
      phone: '',
      email: ''
    }
  }

  setData(data: Partial<IBuyer>): void {
    this.buyerData = {...this.buyerData, ...data}
  }
  
  getData(): IBuyer {
    return this.buyerData;
  }

  clear(): void {
    this.buyerData = {
      payment: '',
      address: '',
      phone: '',
      email: ''
    }
  }

  validate(): Partial<Record<keyof IBuyer, string>> {
    /* объект, у которого ключами могут быть поля из IBuyer,
      а значениями — строки, но не все ключи обязаны присутствовать */
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.buyerData.payment) {
      errors.payment = 'Не выбран вид оплаты';
    }

    if (!this.buyerData.address) {
      errors.address = 'Укажите адрес';
    }

    if (!this.buyerData.phone) {
      errors.phone = 'Укажите телефон';
    }

    if (!this.buyerData.email) {
      errors.email = 'Укажите email';
    }

    return errors;
  }
}