import User from "./user";
import CartProduct from "./cart-product";
import Address from "./address";
import { Status } from "../enum/status";

export default interface Order {
  userId: User;
  products: CartProduct[];
  totalPrice: number;
  date: string;
  address: Address;
  status: Status;
}
