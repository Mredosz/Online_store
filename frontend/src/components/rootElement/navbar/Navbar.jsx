import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import NavItem from "./NavItem.jsx";
import { useContext } from "react";
import { AccountContext } from "../../../store/account-context.jsx";
import { logout } from "../../../request/account.js";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../request/category.js";
import { productAction } from "../../../store/product-redux.jsx";
import { useNavigate } from "react-router-dom";
import CategoryButton from "./reusable/CategoryButton.jsx";
import { filterProducts } from "../../../request/products.js";

export default function Navbar() {
  const { isLogged, setIsLogged } = useContext(AccountContext);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const sort = useSelector((state) => state.product.sort);
  const minPrice = useSelector((state) => state.product.minPrice);
  const maxPrice = useSelector((state) => state.product.maxPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["products"],
    mutationFn: filterProducts,
  });

  const handleLogout = async () => {
    setIsLogged(false);
    await logout();
  };

  const handleChangeCategory = async (category) => {
    const products = await mutateAsync({
      category,
      ...sort,
      minPrice,
      maxPrice,
    });
    dispatch(
      productAction.fetchProducts({
        products,
        category,
        sort,
        minPrice,
        maxPrice,
      }),
    );
  };

  return (
    <nav className="">
      <ul className="flex flex-wrap bg-navbar justify-between px-4 py-1 items-center">
        <NavItem to={"/"} className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-12" />
          <h1>Capy Shop</h1>
        </NavItem>
        <input
          type={"text"}
          placeholder="Search"
          className="w-96 h-10 rounded-md border-0"
        />
        <div className="flex items-center space-x-6">
          <NavItem
            to={"/cart"}
            count={totalQuantity > 9 ? "9+" : totalQuantity}
            className="flex items-center space-x-1 relative p-2"
          >
            <FaCartShopping size={28} />
          </NavItem>
          {isLogged && <button onClick={handleLogout}>Logout</button>}
          {!isLogged && <NavItem to={"/login"}>Login</NavItem>}
          {!isLogged && <NavItem to={"/register"}>Sign In</NavItem>}
        </div>
      </ul>
      <div className="flex flex-wrap bg-navbar justify-center space-x-5 font-semibold py-2 text-lg">
        <CategoryButton
          onClick={() => {
            navigate("/");
            handleChangeCategory("all");
          }}
        >
          All
        </CategoryButton>
        {data?.map((category) => (
          <CategoryButton
            key={category.name}
            onClick={() => {
              navigate("/");
              handleChangeCategory(category.name);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
    </nav>
  );
}
