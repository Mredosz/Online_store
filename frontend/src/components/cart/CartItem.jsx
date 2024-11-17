import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeQuantityThunk,
  deleteProductThunk,
} from "../../store/cart-redux.jsx";
import useDebounce from "../../hooks/useDebounce.jsx";

export default function CartItem({ product, quantity }) {
  const dispatch = useDispatch();
  const [actualQuantity, setActualQuantity] = useState(quantity);
  const debouncingQuantity = useDebounce(actualQuantity, 500);

  const changeHandler = (event) => {
    const quantity = Math.floor(event.target.value);
    if (quantity > product.availableQuantity) {
      setActualQuantity(product.availableQuantity);
    } else {
      setActualQuantity(quantity);
    }
  };

  useEffect(() => {
    if (debouncingQuantity !== quantity) {
      dispatch(changeQuantityThunk({ product, quantity: debouncingQuantity }));
    }
  }, [debouncingQuantity, dispatch, product, quantity]);

  const handleDelete = () => {
    dispatch(deleteProductThunk(product));
  };

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
          min={1}
          value={actualQuantity}
          max={product.availableQuantity}
          onChange={changeHandler}
        />
        <FaRegTrashAlt size={25} onClick={handleDelete} />
      </div>
    </li>
  );
}
