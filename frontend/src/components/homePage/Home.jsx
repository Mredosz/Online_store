import Product from "../products/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productAction } from "../../store/product-redux.jsx";
import StateInfo from "../ui/StateInfo.jsx";
import ProductToolbar from "./filterBox/ProductToolbar.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../request/products.js";
import ErrorBanner from "../ui/ErrorBanner.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (data) {
      dispatch(productAction.fetchProducts({ products: data }));
    }
  }, [dispatch, data]);

  return (
    <>
      <StateInfo error={error} isLoading={isLoading} />
      <div className="flex sm:flex-nowrap flex-wrap space-x-2 justify-center">
        <ProductToolbar />
        <div className="flex flex-wrap justify-center items-center w-full">
          {data && products?.length === 0 && (
            <ErrorBanner error="No products" />
          )}
          {products?.length > 0 &&
            products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}
