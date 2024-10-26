import CartDiv from "../cart/CartDiv.jsx";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../request/order.js";
import { useDispatch, useSelector } from "react-redux";
import ProductInfo from "../products/reusable/ProductInfo.jsx";
import DeliveryEndList from "./DeliveryEndList.jsx";
import { useState } from "react";
import ProductModal from "../products/modal/ProductModal.jsx";
import Button from "./reusable/Button.jsx";
import { useNavigate } from "react-router-dom";
import OrderFinalize from "./OrderFinalize.jsx";
import { deleteCartThunk } from "../../store/cart-redux.jsx";

export default function DeliveryEnd() {
  const { mutateAsync } = useMutation({
    mutationKey: ["order"],
    mutationFn: addOrder,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFinalize, setIsFinalize] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);
  const address = useSelector((state) => state.address);

  const firstTwoProducts = products.slice(0, 2);
  const remainingProducts = products.slice(2);

  const deliverPrice = address.deliveryType === "courier" ? 19.99 : 12.99;

  const calculateTotalPrice = () => {
    if (!products || products.length === 0) return 0;
    return (
      products
        .map(({ product, quantity }) => product.price * quantity)
        .reduce((acc, el) => acc + el, 0) + deliverPrice
    );
  };

  const finalPrice = calculateTotalPrice().toLocaleString("pl-Pl");

  const handleFinalize = async () => {
    await mutateAsync({
      products,
      address,
      totalPrice: Number(calculateTotalPrice()),
    });
    dispatch(deleteCartThunk());
    setIsModalOpen(false);
    setIsFinalize(true);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CartDiv>
      {!isFinalize && (
        <>
          <h1 className="text-3xl text-center font-semibold">Finalize</h1>
          <div className="flex space-x-3 mt-6">
            <DeliveryEndList
              className="space-y-5"
              products={firstTwoProducts}
            />
            <div className="flex flex-col px-2 py-3 w-1/2 justify-between rounded-md border border-formBorder shadow-md bg-white">
              <div>
                <h1 className="text-xl text-center font-semibold">Address</h1>
                <ProductInfo left="City:" right={address.city} />
                <ProductInfo left="Postal code:" right={address.postalCode} />
                <ProductInfo left="Street:" right={address.street} />
                <ProductInfo left="Home number:" right={address.homeNumber} />
                <ProductInfo left="Phone number:" right={address.phoneNumber} />
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-semibold">Total price: </p>
                <p className="text-lg">{finalPrice} zł</p>
              </div>
            </div>
          </div>
          <DeliveryEndList
            className="space-y-5 mt-5"
            products={remainingProducts}
          />
          <div className="flex w-full space-x-3">
            <Button
              className="bg-red-500 hover:bg-red-600 w-1/2"
              onClick={() => navigate("/cart/delivery")}
            >
              Back
            </Button>
            <Button className="w-1/2" onClick={handleOpenModal}>
              Finalize
            </Button>
          </div>
        </>
      )}
      {isModalOpen && (
        <ProductModal
          onClose={handleCloseModal}
          button={<Button onClick={handleFinalize}>Yes</Button>}
        >
          <h2>Are you sure?</h2>
        </ProductModal>
      )}
      {isFinalize && <OrderFinalize />}
    </CartDiv>
  );
}
