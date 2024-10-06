import logo from "../../../public/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import NavItem from "./NavItem.jsx";
import { useState } from "react";
import Dropdown from "./dropdown/Dropdown.jsx";
import DropdownItem from "./dropdown/DropdownItem.jsx";

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

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <nav>
      <ul className="flex bg-navbar justify-between px-4 py-1 items-center">
        <NavItem to={"/"} className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-12" />
          <h1>Capy Shop</h1>
        </NavItem>
        <input
          type={"text"}
          placeholder="Search"
          className="w-96 h-10 rounded-md border-0"
        />
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
        <NavItem to={"/cart"}>
          <FaCartShopping size={28} />
        </NavItem>
      </ul>
    </nav>
  );
}
