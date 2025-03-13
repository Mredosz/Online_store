import CartProduct from "../../../../../models/interface/cart-product";
import DeliveryEndItem from "./DeliveryEndItem";

type DeliveryEndListProps = {
  products: CartProduct[];
  className: string;
};

export default function DeliveryEndList({
  products,
  className,
}: DeliveryEndListProps) {
  return (
    <ul className={className}>
      {products.map(({ product, quantity }) => (
        <DeliveryEndItem
          key={product.name}
          product={product}
          quantity={quantity}
        />
      ))}
    </ul>
  );
}
