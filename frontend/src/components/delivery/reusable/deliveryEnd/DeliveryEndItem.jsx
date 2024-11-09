export default function DeliveryEndItem({ product, quantity }) {
  return (
    <li className="flex items-center justify-between rounded-md border border-formBorder shadow-md bg-white">
      <div className="flex items-center space-x-5">
        <img
          className="h-1/2 w-1/2 rounded-l-md"
          alt={product.name}
          src={product.image}
        />
        <h3 className="text-xl">{product.name}</h3>
      </div>
      <div className="flex items-center justify-around w-1/2">
        <p className="text-lg">{product.price}</p>
        <p className="text-lg">{quantity}</p>
      </div>
    </li>
  );
}
