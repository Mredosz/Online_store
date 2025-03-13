import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../../request/order";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store-redux";
import { useState } from "react";
import { deleteCartThunk } from "../../../store/cart-redux";
import Summary from "./reusable/Summary";
import Button from "./reusable/Button";
import ProductModal from "../../../components/products/modal/ProductModal";
import CartView from "../CartView";
import { Text, View } from "react-native";
import CartProduct from "../../../models/interface/cart-product";
import Address from "../../../models/interface/address";
import { Link } from "@react-navigation/native";

export default function DeliveryEnd() {
  const { mutateAsync, error } = useMutation({
    mutationKey: ["order"],
    mutationFn: addOrder,
  });

  const dispatch = useDispatch<AppDispatch>();

  const [isFinalize, setIsFinalize] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = useSelector<RootState, CartProduct[]>(
    (state) => state.cart.products,
  );
  const address = useSelector<RootState, Address>((state) => state.address);

  const deliverPrice = address.deliveryType === "courier" ? 20 : 13;

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
    setIsModalOpen(false);
    if (!error) {
      dispatch(deleteCartThunk());
      setIsFinalize(true);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CartView alert={error?.response.data.errors}>
      {!isFinalize && (
        <>
          <Summary products={products} finalPrice={finalPrice}>
            {/*<ProductInfo left="City:" right={address.city} />*/}
            {/*<ProductInfo left="Postal code:" right={address.postalCode} />*/}
            {/*<ProductInfo left="Street:" right={address.street} />*/}
            {/*<ProductInfo left="Home number:" right={address.homeNumber} />*/}
            {/*<ProductInfo left="Phone number:" right={address.phoneNumber} />*/}
          </Summary>
          <View className="flex flex-row w-full gap-3">
            <Button
              className="bg-red-500 hover:bg-red-600 w-1/2"
              // onClick={() => navigate("/cart/delivery")}
            >
              <Link screen="CartStack">Back</Link>
            </Button>
            <Button className="w-1/2" onPress={handleOpenModal} isValid>
              Finalize
            </Button>
          </View>
        </>
      )}
      {isModalOpen && (
        <ProductModal
          onClose={handleCloseModal}
          button={
            <Button onPress={handleFinalize} isValid>
              Yes
            </Button>
          }
        >
          <Text className="text-3xl text-center">Are you sure?</Text>
        </ProductModal>
      )}
      {/*{isFinalize && <OrderFinalize />}*/}
    </CartView>
  );
}
