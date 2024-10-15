import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../request/products.js";
import AllProducts from "../products/AllProducts.jsx";
import AddProduct from "../products/AddProduct.jsx";

export default function AdminMain() {
  const { data, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AllProducts products={data} />
      <AddProduct />
    </div>
  );
}
