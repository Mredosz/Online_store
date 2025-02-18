import { Image, Text, View } from "react-native";

type ProductProp = {
  product: {
    image: string;
    name: string;
    shortDescription: string;
    price: number;
  };
};

export default function Product({ product }: ProductProp) {
  return (
    <View className="bg-darkBgMuted flex flex-row items-center rounded-md shadow-md m-3 p-3">
      <Image
        source={{ uri: product.image }}
        accessibilityLabel={product.name}
        className="w-2/5 h-full rounded-md aspect-square"
      />
      <View className="w-full flex-1 gap-4">
        <Text className="text-lg text-center uppercase font-bold text-darkText">
          {product.name}
        </Text>
        <Text className="ml-2 text-darkText">{product.shortDescription}</Text>
        <Text className="ml-2 font-semibold text-darkText">
          {product.price + "zł"}
        </Text>
      </View>
    </View>
  );
}
