import DeliveryEndItem from "./DeliveryEndItem.jsx";

export default function DeliveryEndList({ products, className }) {
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
