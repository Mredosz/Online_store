import { useState } from "react";
import ProductInfo from "./reusable/ProductInfo.jsx";
import Button from "./reusable/Button.jsx";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { addToCartThunk } from "../../store/cart-redux.jsx";
import { useDispatch } from "react-redux";

export default function Product({ product }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = async (product) => {
    dispatch(addToCartThunk(product));
  };

  return (
    <div
      className="bg-gray-100 flex flex-col justify-center w-[300px] h-[540px] rounded-md shadow-md m-3"
      onMouseOver={() => setIsMouseEnter(true)}
      onMouseOut={() => setIsMouseEnter(false)}
    >
      <Link
        to={`/products/details/${product._id}`}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-t-md"
          />
          <h2 className="pt-3 flex justify-center text-xl uppercase font-bold">
            {product.name}
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
          <p className="pt-2">{product.shortDescription}</p>
        </div>
      </Link>
      {isMouseEnter && (
        <div className="relative">
          <Button
            onClick={() => handleAddToCart(product)}
            className="bg-gray-100 absolute bottom-0 right-0 m-3 flex border items-center border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100"
          >
            <FaCartPlus />
            <p className="ml-2">Add to cart</p>
          </Button>
        </div>
      )}
    </div>
  );
}
