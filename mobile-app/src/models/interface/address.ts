import { DeliveryType } from "../enum/delivery-type";
import { PaymentMethod } from "../enum/payment-method";

export default interface Address {
  street: string;
  city: string;
  postalCode: string;
  homeNumber: string;
  phoneNumber: string;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExpiration: string;
  cvv: string;
}
