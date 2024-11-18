import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getRecommendedProducts } from "../../../request/products.js";
import Product from "../Product.jsx";
import StateInfo from "../../ui/StateInfo.jsx";

export default function RecommendedProducts() {
  const params = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productsRecommendation", params.productId],
    queryFn: () => getRecommendedProducts(params.productId),
  });

  return (
    <>
      <StateInfo error={error?.message} isLoading={isLoading} />
      {!isLoading && (
        <div className="flex flex-col">
          <h1 className="text-3xl mb-4 mt-3 text-center">
            Recommended products
          </h1>
          <div className="flex flex-wrap">
            {data.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
