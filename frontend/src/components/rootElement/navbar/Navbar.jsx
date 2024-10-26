import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import NavItem from "./NavItem.jsx";
import { useContext } from "react";
import { AccountContext } from "../../../store/account-context.jsx";
import { logout } from "../../../request/account.js";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { isLogged, setIsLogged } = useContext(AccountContext);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleLogout = async () => {
    setIsLogged(false);
    await logout();
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
    </nav>
  );
}
