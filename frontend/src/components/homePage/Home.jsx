import Product from "../products/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productAction } from "../../store/product-redux.jsx";
import StateInfo from "../ui/StateInfo.jsx";
import ProductToolbar from "./filterBox/ProductToolbar.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../request/products.js";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (data && products.length === 0) {
      dispatch(productAction.fetchProducts({ products: data }));
    }
  }, [dispatch, products, data]);

  return (
    <>
      <StateInfo error={error} isLoading={isLoading} />
      <div className="flex space-x-2">
        <ProductToolbar />
        <div className="flex flex-wrap justify-center items-center">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
