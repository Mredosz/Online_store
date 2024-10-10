import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Product from "../products/Product.jsx";

export default function Home() {
  const fetchProducts = async () => {
    return (await axios.get("http://localhost:3000/products")).data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" flex justify-center items-center h-screen">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
