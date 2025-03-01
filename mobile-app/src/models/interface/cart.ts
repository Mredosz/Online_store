import CartProduct from "./cart-product";
import User from "./user";

export default interface Cart {
  products: CartProduct[];
  userId: User;
}
