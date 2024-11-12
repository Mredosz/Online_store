import Product from "../products/Product.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductData } from "../../store/product-redux.jsx";
import StateInfo from "../ui/StateInfo.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.filterProducts);
  const isLoading = useSelector((state) => state.product.isLoading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductData());
    }
  }, [dispatch, products]);

  return (
    <>
      <StateInfo error={error} isLoading={isLoading} />
      <div className="flex flex-wrap justify-center items-center">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
