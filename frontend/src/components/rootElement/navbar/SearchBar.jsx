import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { filterProducts } from "../../../request/products.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../../../store/product-redux.jsx";

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const searchBarRef = useRef(null);
  const dispatch = useDispatch();
  const { minPrice, maxPrice, category, sort } = useSelector(
    (state) => state.product,
  );

  const { data } = useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      filterProducts(
        {
          category,
          ...sort,
          minPrice,
          maxPrice,
        },
        query,
      ),
    enabled: query.length > 2,
  });

  const handleClickProduct = (id) => {
    setQuery("");
    navigate(`products/details/${id}`);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleEnterClick = (event) => {
    if (event.key === "Enter") {
      setQuery("");
      dispatch(
        productAction.fetchProducts({
          products: data,
          minPrice,
          maxPrice,
          category,
          sort,
          query,
        }),
      );
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col" ref={searchBarRef}>
      <input
        type={"text"}
        placeholder="Search"
        value={query}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleEnterClick}
        onChange={(event) => setQuery(event.target.value)}
        className="sm:w-96 h-10 rounded-md border-0"
      />
      <div className="relative">
        {data && isOpen && (
          <ul className="absolute bg-navbar w-full rounded-b-md p-2 font-semibold space-y-1">
            {data.map((product) => (
              <li
                key={product._id}
                className="cursor-pointer"
                onClick={() => handleClickProduct(product._id)}
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
