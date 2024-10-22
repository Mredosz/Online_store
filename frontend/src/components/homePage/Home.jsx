import { useQuery } from "@tanstack/react-query";
import Product from "../products/Product.jsx";
import { getAllProducts } from "../../request/products.js";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-center items-center">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
