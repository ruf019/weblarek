import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IFormData } from "./Form";

interface IFormOrderData extends IFormData {
  payment: TPayment;
  address: string;
}

export class FormOrder extends Form<IFormOrderData> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.cardButton.addEventListener('click', () => {
      this.events.emit('order.payment:changed', {payment: 'online'});
    });

    this.cashButton.addEventListener('click', () => {
      this.events.emit('order.payment:changed', {payment: 'cash'});
    });
  
    this.addressInput.addEventListener('input', () => {
      this.events.emit('order.address:changed', {address: this.addressInput.value})
    });
  }

  set payment(value: TPayment) {
    this.cardButton.classList.toggle('button_alt-active', value === 'online');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}