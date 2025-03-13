import { Text, View } from "react-native";
import { ReactNode } from "react";
import CartProduct from "../../../../models/interface/cart-product";

type SummaryProps = {
  children?: ReactNode;
  first: CartProduct[];
  remaining: CartProduct[];
  finalPrice: string;
};

export default function Summary({
  children,
  first,
  remaining,
  finalPrice,
}: SummaryProps) {
  return (
    <>
      <Text className="text-3xl text-center font-semibold">Finalize</Text>
      <View className="flex space-x-3 mt-6">
        {/*<DeliveryEndList className="space-y-5" products={first} />*/}
        <View className="flex flex-col px-2 py-3 w-1/2 justify-between rounded-md border border-formBorder shadow-md bg-white">
          <View>
            <Text className="text-xl text-center font-semibold">Address</Text>
            {children}
          </View>
          <View className="flex space-x-3">
            <Text className="text-lg font-semibold">Total price: </Text>
            <Text className="text-lg">{finalPrice.toLocaleString()} zł</Text>
          </View>
        </View>
      </View>
      {/*<DeliveryEndList className="space-y-5 mt-5" products={remaining} />*/}
    </>
  );
}
