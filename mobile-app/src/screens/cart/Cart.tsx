import { useDispatch, useSelector } from "react-redux";
import { Pressable, Text, View } from "react-native";
import { deleteCartThunk } from "../../store/cart-redux";
import CartView from "./CartView";
import CartItem from "./CartItem";
import { AppDispatch, RootState } from "../../store/store-redux";
import { Link } from "@react-navigation/native";
import CartProduct from "../../models/interface/cart-product";

export default function Cart() {
  const products = useSelector<RootState, CartProduct[]>(
    (state) => state.cart.products,
  );
  const dispatch = useDispatch<AppDispatch>();

  const calculateTotalPrice = (deliverPrice = 0) => {
    if (!products || products.length === 0) return 0;
    return (
      products
        .map(({ product, quantity }) => product.price * quantity)
        .reduce((acc, el) => acc + el, 0) + deliverPrice
    ).toLocaleString("pl-Pl");
  };

  const handleDeleteAll = () => {
    dispatch(deleteCartThunk());
  };

  return (
    <CartView>
      <View className="relative">
        {products.length > 0 && (
          <Pressable
            onPress={handleDeleteAll}
            className="absolute top-0 right-0"
          >
            <Text className="text-darkText">Delete all</Text>
          </Pressable>
        )}
      </View>
      <Text className="text-3xl text-center font-semibold text-darkText">
        Cart
      </Text>
      {products.length > 0 ? (
        <View className="mt-6 gap-6">
          {products.map(({ product, quantity }) => (
            <CartItem key={product._id} product={product} quantity={quantity} />
          ))}
        </View>
      ) : (
        <Text className="text-darkText">Cart is empty</Text>
      )}
      <View className="flex justify-between mt-4 items-center">
        <View className="flex gap-2">
          <View className="flex flex-row gap-3 items-center">
            <Text className="text-lg font-semibold text-darkText">
              Total price:
            </Text>
            <Text className="text-lg text-darkText">
              {calculateTotalPrice()} zł
            </Text>
          </View>
          <View className="flex flex-row gap-3">
            <Text className="text-lg font-semibold text-darkText">
              With delivery price to parcel locker:
            </Text>
            <Text className="text-lg text-darkText">
              {calculateTotalPrice(13)} zł
            </Text>
          </View>
          <View className="flex flex-row gap-3">
            <Text className="text-lg font-semibold text-darkText">
              With delivery price to home:
            </Text>
            <Text className="text-lg text-darkText">
              {calculateTotalPrice(20)} zł
            </Text>
          </View>
        </View>
        <Link
          className="w-full"
          screen="DeliveryEnd"
          disabled={products.length === 0}
        >
          Next
        </Link>
      </View>
    </CartView>
  );
}
