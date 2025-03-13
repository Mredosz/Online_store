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
    <View className="flex items-center justify-between rounded-md border border-formBorder shadow-md bg-white">
      <View className="flex items-center space-x-5">
        <Image
          source={{ uri: product.image }}
          accessibilityLabel={product.name}
          className="h-1/2 w-1/2 rounded-l-md"
        />
        <Text className="text-xl">{product.name}</Text>
      </View>
      <View className="flex items-center justify-around w-1/2">
        <Text className="text-lg">{product.price}</Text>
        <Text className="text-lg">{quantity}</Text>
      </View>
    </View>
  );
}
