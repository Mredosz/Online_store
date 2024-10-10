import { useState } from "react";
import ProductInfo from "./ProductInfo.jsx";
import Button from "./Button.jsx";

export default function Product({ product }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <div
      className="bg-gray-100 flex flex-col justify-center w-[300px] h-[540px] rounded-md shadow-md"
      onMouseOver={() => setIsMouseEnter(true)}
      onMouseOut={() => setIsMouseEnter(false)}
    >
      <div className="flex flex-col">
        <img src={product.image} alt={product.title} className="rounded-t-md" />
        <h2 className="pt-3 flex justify-center text-xl uppercase font-bold">
          {product.title}
        </h2>
      </div>
      <div className="flex flex-col p-3 w-full h-full">
        <ProductInfo left="Price:" right={`${product.price} zł`} />
        <ProductInfo
          left="Price with delivery:"
          right={`${product.deliveryPrice} zł`}
        />
        <ProductInfo
          left="Available products:"
          right={product.availableQuantity}
        />
        {!isMouseEnter && <p className="pt-2">{product.shortDescription}</p>}
        {isMouseEnter && (
          <div className="flex justify-around items-end h-full pb-2">
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              View details
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">Add to cart</Button>
          </div>
        )}
      </div>
    </div>
  );
}
