import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { isLogged, isAdmin } = useSelector((state) => state.account);
  const location = useLocation();

  if (location.pathname.includes("admin")) {
    return isLogged && isAdmin ? children : <Navigate to={"/login"} />;
  }

  if (isLogged && location.pathname === "/login") {
    return <Navigate to={"/"} />;
  } else if (!isLogged && location.pathname === "/login") {
    return children;
  }

  if (isLogged && isAdmin && location.pathname === "/") {
    return <Navigate to={"/admin"} />;
  }

  return isLogged ? children : <Navigate to={"/login"} />;
}
