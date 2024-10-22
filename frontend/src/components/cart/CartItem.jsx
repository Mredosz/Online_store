import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-redux.jsx";

export default function CartItem({ product, quantity }) {
  const [actualQuantity, setActualQuantity] = useState();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.totalQuantity);

  const changeHandler = (event) => {
    const quantity = event.target.value;
    if (quantity > product.availableQuantity) {
      setActualQuantity(product.availableQuantity);
    } else {
      setActualQuantity(quantity);
    }
    dispatch(cartActions.addProduct(product));
  };
  console.log(total);
  return (
    <li className="w-full flex items-center justify-between rounded-md border border-formBorder shadow-md bg-white">
      <div className="flex items-center space-x-5">
        <img
          className="h-1/4 w-1/4 rounded-l-md"
          alt={product.name}
          src={product.image}
        />
        <h3 className="text-xl">{product.name}</h3>
      </div>
      <div className="flex items-center justify-around w-1/2">
        <p className="text-lg">{product.price}</p>
        <input
          type={"number"}
          className="rounded-md h-10 w-20 text-xl border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
          defaultValue={quantity}
          min={1}
          value={actualQuantity}
          max={product.availableQuantity}
          onChange={changeHandler}
        />
        <FaRegTrashAlt size={25} />
      </div>
    </li>
  );
}
