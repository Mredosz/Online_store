import CartItem from "./CartItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-redux.jsx";

export default function Cart() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const calculateTotalPrice = (deliverPrice = 0) => {
    if (!products || products.length === 0) return 0;
    return (
      products
        .map(({ product, quantity }) => product.price * quantity)
        .reduce((acc, el) => acc + el) + deliverPrice
    ).toLocaleString("pl-Pl");
  };

  const handleDeleteAll = () => {
    dispatch(cartActions.deleteCart());
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-168px)] bg-[url('/cart.png')] bg-cover bg-center">
      <div className="flex flex-col bg-form my-10 p-5 rounded-md shadow-md w-1/2">
        <div className="relative">
          <button onClick={handleDeleteAll} className="absolute top-0 right-0">
            Delete all
          </button>
        </div>
        <h1 className="text-3xl text-center font-semibold">Cart</h1>
        {products ? (
          <ul className="mt-6 space-y-5">
            {products.map(({ product, quantity }) => (
              <CartItem
                key={product._id}
                product={product}
                quantity={quantity}
              />
            ))}
          </ul>
        ) : (
          <p>Cart is empty</p>
        )}
        <div className="flex justify-between mt-4 items-center">
          <div className="flex flex-col space-y-2 w-3/4">
            <div className="flex space-x-3 items-center">
              <p className="text-lg font-semibold">Total price: </p>
              <p className="text-lg">{calculateTotalPrice()} zł</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-lg font-semibold">
                With delivery price to parcel locker:
              </p>
              <p className="text-lg">{calculateTotalPrice(12.99)} zł</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-lg font-semibold">
                With delivery price to home:
              </p>
              <p className="text-lg">{calculateTotalPrice(19.99)} zł</p>
            </div>
          </div>
          <button className="py-2 px-4 rounded-md bg-green-500 hover:bg-green-700 w-[60%]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
