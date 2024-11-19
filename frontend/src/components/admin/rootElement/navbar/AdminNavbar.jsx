import NavItem from "../../../rootElement/navbar/NavItem.jsx";
import logo from "/logo.png";
import { logout } from "../../../../request/account.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AccountContext } from "../../../../store/account-context.jsx";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { setIsLogged } = useContext(AccountContext);

  const handleLogout = async () => {
    navigate("/");
    setIsLogged(false);
    await logout();
  };
  return (
    <nav>
      <ul className="flex flex-wrap bg-navbar justify-between px-4 py-1 items-center">
        <NavItem to={""} className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-12" />
          <h1>Capy Shop</h1>
        </NavItem>
        <div className="flex flex-wrap space-x-3">
          <NavItem to={"products"}>Products</NavItem>
          <NavItem to={"review"}>Review</NavItem>
          <NavItem to={"orders"}>Orders</NavItem>
          <NavItem to={"users"}>Users</NavItem>
          <NavItem to={"category"}>Category</NavItem>
          <NavItem to={"reports"}>Reports</NavItem>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
}
