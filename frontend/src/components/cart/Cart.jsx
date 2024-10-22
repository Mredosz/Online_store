import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../request/cart.js";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const calculateTotalPrice = (deliverPrice = 0) => {
    return (
      data.products
        .map(({ product, quantity }) => product.price * quantity)
        .reduce((acc, el) => acc + el) + deliverPrice
    ).toLocaleString("pl-Pl");
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-168px)] bg-[url('/cart.png')] bg-cover bg-center">
      <div className="flex flex-col bg-form my-10 p-5 rounded-md shadow-md w-1/2">
        <div className="relative">
          <button className="absolute top-0 right-0">Delete all</button>
        </div>
        <h1 className="text-3xl text-center font-semibold">Cart</h1>
        <ul className="mt-6 space-y-5">
          {data.products.map(({ product, quantity }) => (
            <CartItem key={product._id} product={product} quantity={quantity} />
          ))}
        </ul>
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
