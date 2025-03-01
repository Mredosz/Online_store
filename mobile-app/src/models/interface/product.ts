import Category from "./category";
import Review from "./review";

export default interface Product {
  _id: string;
  name: string;
  price: number;
  shortDescription: string;
  availableQuantity: number;
  image: string;
  category?: Category;
  reviews?: Review[];
  specifications?: { key: string; value: string }[];
  isDeleted?: boolean;
}
