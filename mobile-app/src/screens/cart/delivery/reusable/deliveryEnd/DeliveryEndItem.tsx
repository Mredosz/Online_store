import { Image, Text, View } from "react-native";
import Product from "../../../../../models/interface/product";

type DeliveryEndItemProps = {
  product: Product;
  quantity: number;
};

export default function DeliveryEndItem({
  product,
  quantity,
}: DeliveryEndItemProps) {
  return (
    <View className="flex-1 p-3 flex-row mt-3 items-center justify-between rounded-md shadow-md bg-darkBgMuted">
      <Image
        source={{ uri: product.image }}
        accessibilityLabel={product.name}
        className="h-40 w-[42%] rounded-md"
      />
      <View className="flex items-center justify-around w-1/2">
        <Text className="text-xl text-darkText">{product.name}</Text>
        <Text className="text-lg text-darkText">{product.price}</Text>
        <Text className="text-lg text-darkText">{quantity}</Text>
      </View>
    </View>
  );
}
