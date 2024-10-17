import { useState } from "react";
import AllProducts from "./AllProducts.jsx";
import AddProduct from "./AddProduct.jsx";

export default function Products() {
  const [isAddProduct, setIsAddProduct] = useState(true);
  const handleClick = () => {
    setIsAddProduct((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <button
        onClick={handleClick}
        className="py-2 mb-5 w-1/2 text-2xl font-semibold rounded-md bg-green-300 hover:bg-green-500"
      >
        {isAddProduct ? "Add new" : "Show all"}
      </button>
      {isAddProduct && <AllProducts />}
      {!isAddProduct && <AddProduct />}
    </div>
  );
}
