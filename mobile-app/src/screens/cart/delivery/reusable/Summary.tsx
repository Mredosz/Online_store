import { Text, View } from "react-native";
import { ReactNode } from "react";
import CartProduct from "../../../../models/interface/cart-product";
import DeliveryEndList from "./deliveryEnd/DeliveryEndList";

type SummaryProps = {
  children?: ReactNode;
  products: CartProduct[];
  finalPrice: string;
};

export default function Summary({
  children,
  products,
  finalPrice,
}: SummaryProps) {
  return (
    <>
      <Text className="text-3xl text-center font-semibold text-darkText">
        Finalize
      </Text>
      <View className="flex flex-row space-x-3 mt-6">
        <View className="flex-1 px-2 py-3 justify-between rounded-md shadow-md bg-darkBgMuted">
          <View>
            <Text className="text-xl text-center font-semibold text-darkText">
              Address
            </Text>
            {children}
          </View>
          <View className="flex gap-3">
            <Text className="text-lg font-semibold text-darkText">
              Total price:
            </Text>
            <Text className="text-lg text-darkText">
              {finalPrice.toLocaleString()} zł
            </Text>
          </View>
        </View>
      </View>
      <DeliveryEndList className="mt-5" products={products} />
    </>
  );
}
