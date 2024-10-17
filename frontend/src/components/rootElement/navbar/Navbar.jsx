import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import NavItem from "./NavItem.jsx";
import { useContext, useState } from "react";
import Dropdown from "./dropdown/Dropdown.jsx";
import DropdownItem from "./dropdown/DropdownItem.jsx";
import { AccountContext } from "../../../store/account-context.jsx";
import { logout } from "../../../request/account.js";

export default function Navbar() {
  const arr = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  const [open, setOpen] = useState(false);
  const { isLogged, setIsLogged } = useContext(AccountContext);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    setIsLogged(false);
    localStorage.removeItem("is_logged_in");
    await logout();
  };

  return (
    <nav>
      <ul className="flex bg-navbar justify-between px-4 py-1 items-center">
        <div className="flex items-center space-x-6">
          <NavItem to={"/"} className="flex items-center space-x-1">
            <img src={logo} alt="Logo" className="h-12" />
            <h1>Capy Shop</h1>
          </NavItem>
          <Dropdown
            title="Menu"
            className="absolute flex flex-col mt-1 bg-navbar p-4 rounded-md"
            open={open}
            handleClick={handleClick}
          >
            {arr.map((item) => (
              <DropdownItem
                key={item}
                path={`/${item}`}
                open={open}
                handleClick={handleClick}
                className="capitalize py-0.5 "
              >
                {item}
              </DropdownItem>
            ))}
          </Dropdown>
        </div>
        <input
          type={"text"}
          placeholder="Search"
          className="w-96 h-10 rounded-md border-0"
        />
        <div className="flex items-center space-x-6">
          <NavItem
            to={"/cart"}
            count={2}
            className="flex items-center space-x-1 relative p-2"
          >
            <FaCartShopping size={28} />
          </NavItem>
          {isLogged && <button onClick={handleLogout}>Logout</button>}
          {!isLogged && <NavItem to={"/login"}>Login</NavItem>}
          {!isLogged && <NavItem to={"/register"}>Sign In</NavItem>}
        </div>
      </ul>
    </nav>
  );
}
