import CartProduct from "../../../../../models/interface/cart-product";
import DeliveryEndItem from "./DeliveryEndItem";
import { FlatList, View } from "react-native";

type DeliveryEndListProps = {
  products: CartProduct[];
  className?: string;
};

export default function DeliveryEndList({
  products,
  className,
}: DeliveryEndListProps) {
  return (
    <View className={className + " flex-1"}>
      <FlatList
        className="w-full px-2"
        data={products}
        keyExtractor={(item) => item.product._id}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <DeliveryEndItem
            key={item.product.name}
            product={item.product}
            quantity={item.quantity}
          />
        )}
      />
    </View>
  );
}
