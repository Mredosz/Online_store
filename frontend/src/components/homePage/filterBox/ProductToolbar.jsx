import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../../store/product-redux.jsx";
import { filterProducts } from "../../../request/products.js";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce.jsx";
import Input from "../../account/reusable/Input.jsx";

const optionSortArr = [
  { value: '{ "sort": "", "type": "" }', text: "No sort" },
  {
    value: '{ "sort": "review", "type": "asc" }',
    text: "By reviews ascending",
  },
  {
    value: '{ "sort": "review", "type": "des" }',
    text: "By reviews descending",
  },
  { value: '{ "sort": "price", "type": "asc" }', text: "By price ascending" },
  { value: '{ "sort": "price", "type": "des" }', text: "By price descending" },
];

export default function ProductToolbar() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);
  const sort = useSelector((state) => state.product.sort);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const debouncedMinPrice = useDebounce(minPrice, 500);
  const debouncedMaxPrice = useDebounce(maxPrice, 500);

  const { mutateAsync } = useMutation({
    mutationKey: "products",
    mutationFn: filterProducts,
  });

  useEffect(() => {
    const fetchData = async () => {
      await handleFiltratePrice();
    };

    fetchData();
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const handleFiltrate = async (event) => {
    const sort = JSON.parse(event.target.value);
    const products = await mutateAsync({
      ...sort,
      category,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
    });
    dispatch(
      productAction.fetchProducts({
        products,
        category,
        sort,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  };

  const handleFiltratePrice = async () => {
    const products = await mutateAsync({
      ...sort,
      category,
      minPrice: debouncedMinPrice,
      maxPrice: debouncedMaxPrice,
    });

    dispatch(
      productAction.fetchProducts({
        products,
        category,
        sort,
        minPrice: debouncedMinPrice,
        maxPrice: debouncedMaxPrice,
      }),
    );
  };

  return (
    <div className="h-56 w-64 border border-gray-200 rounded-md shadow-md mt-10 ml-5">
      <div className="p-2 space-y-2">
        <div>
          <h1 className="text-2xl font-semibold">Filtrate</h1>
          <div className="flex space-x-1">
            <Input
              id="from"
              label="from"
              className="w-full"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
            <Input
              id="to"
              label="to"
              className="w-full"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sort</h1>
          <select
            className="rounded-md w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500"
            onChange={handleFiltrate}
          >
            {optionSortArr.map((o) => (
              <option value={o.value} key={o.text}>
                {o.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
