import { IBuyer, TErrorsBuyer } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Buyer {
  protected buyerData: IBuyer;

  constructor(protected events: IEvents) {
    this.buyerData = {
      payment: '',
      address: '',
      phone: '',
      email: ''
    }
  }

  setData(data: Partial<IBuyer>): void {
    this.buyerData = {...this.buyerData, ...data};
    this.events.emit('buyer:changed');
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
    this.events.emit('buyer:changed');
  }

  validate(): TErrorsBuyer {
    const errors: TErrorsBuyer = {};

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