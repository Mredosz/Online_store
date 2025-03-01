import Product from "./product";
import User from "./user";

export default interface Review {
  productId: Product;
  userId: User;
  rating: number;
  review: string;
  date: string;
  isAccepted: boolean;
}
