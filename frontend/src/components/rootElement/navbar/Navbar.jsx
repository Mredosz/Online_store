import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import NavItem from "./NavItem.jsx";
import { logout } from "../../../request/account.js";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../../../request/category.js";
import { productAction } from "../../../store/product-redux.jsx";
import { useNavigate } from "react-router-dom";
import CategoryButton from "./reusable/CategoryButton.jsx";
import { filterProducts } from "../../../request/products.js";
import SearchBar from "./SearchBar.jsx";
import { accountAction } from "../../../store/account-redux.jsx";

export default function Navbar() {
  const isLogged = useSelector((state) => state.account.isLogged);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { sort, minPrice, maxPrice, query } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["products"],
    mutationFn: (filter) => filterProducts(filter, query),
  });

  const handleLogout = async () => {
    dispatch(accountAction.logout());
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
        query,
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
        {isLogged && <SearchBar />}
        <div className="flex items-center space-x-6">
          {isLogged && (
            <NavItem
              to={"/cart"}
              count={totalQuantity > 9 ? "9+" : totalQuantity}
              className="flex items-center space-x-1 relative p-2"
            >
              <FaCartShopping size={28} />
            </NavItem>
          )}
          {isLogged && <button onClick={handleLogout}>Logout</button>}
          {!isLogged && <NavItem to={"/login"}>Login</NavItem>}
          {!isLogged && <NavItem to={"/register"}>Sign In</NavItem>}
        </div>
      </ul>
      {isLogged && (
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
      )}
    </nav>
  );
}
