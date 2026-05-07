import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, IFormData } from "./Form";

interface IFormContactsData extends IFormData {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContactsData> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLFormElement) {
    super(events, container);

    this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
  
    this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts.email:changed', {email: this.emailInput.value});
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts.phone:changed', {phone: this.phoneInput.value});
    })
  }

  set email(value: string) {
    this.emailInput.value = value;
  }

  set phone(value: string) {
    this.phoneInput.value = value;
  }
}