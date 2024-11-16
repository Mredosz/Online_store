import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../../store/product-redux.jsx";
import { filterProducts } from "../../../request/products.js";
import { useMutation } from "@tanstack/react-query";

export default function ProductToolbar() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);

  const { mutateAsync } = useMutation({
    mutationKey: "products",
    mutationFn: filterProducts,
  });

  const handleFiltrate = async (event) => {
    const sort = JSON.parse(event.target.value);
    const products = await mutateAsync({
      ...sort,
      category,
    });
    dispatch(productAction.fetchProducts({ products, category, sort }));
  };

  return (
    <div className="bg-amber-300 max-h-[30rem]">
      <div className="p-2">
        <div>
          <h1>Filtrate</h1>
        </div>
        <div>
          <h1>Sort</h1>
          <select onChange={handleFiltrate}>
            <option value='{ "sort": "", "type": "" }'>No sort</option>
            <option value='{ "sort": "review", "type": "asc" }'>
              By reviews ascending
            </option>
            <option value='{ "sort": "review", "type": "des" }'>
              By reviews descending
            </option>
            <option value='{ "sort": "price", "type": "asc" }'>
              By price ascending
            </option>
            <option value='{ "sort": "price", "type": "des" }'>
              By price descending
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
