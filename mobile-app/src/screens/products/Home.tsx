import { ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Product from "../../components/products/Product";
import { getAllProducts } from "../../request/products";

type ProductProp = {
  image: string;
  name: string;
  shortDescription: string;
  _id: string;
  price: number;
  availableQuantity: number;
  isDeleted: boolean;
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  if (isLoading) {
    return <Text>"Loading..."</Text>;
  }

  return (
    <ScrollView className="flex-1 w-full h-screen">
      {data &&
        data.map((product: ProductProp) => (
          <Product key={product._id} product={product} />
        ))}
    </ScrollView>
  );
}
