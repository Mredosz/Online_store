import { useState } from "react";
import AddCategory from "./AddCategory.jsx";
import AllCategories from "./AllCategories.jsx";

export default function Categories() {
  const [isAddCategory, setIsAddCategory] = useState(true);
  const handleClick = () => {
    setIsAddCategory((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <button
        onClick={handleClick}
        className="py-2 mb-5 w-1/2 text-2xl font-semibold rounded-md bg-green-300 hover:bg-green-500"
      >
        {isAddCategory ? "Add new" : "Show all"}
      </button>
      {isAddCategory && <AllCategories />}
      {!isAddCategory && <AddCategory />}
    </div>
  );
}
