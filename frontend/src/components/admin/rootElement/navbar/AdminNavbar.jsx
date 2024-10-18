import NavItem from "../../../rootElement/navbar/NavItem.jsx";
import logo from "/logo.png";
import { logout } from "../../../../request/account.js";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await logout();
  };
  return (
    <nav>
      <ul className="flex bg-navbar justify-between px-4 py-1 items-center">
        <NavItem to={""} className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-12" />
          <h1>Capy Shop</h1>
        </NavItem>
        <div className="flex space-x-3">
          <NavItem to={"products"}>Products</NavItem>
          <NavItem to={"review"}>Review</NavItem>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
}
