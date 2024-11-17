import { useContext } from "react";
import { AccountContext } from "../../store/account-context.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLogged } = useContext(AccountContext);
  return isLogged ? children : <Navigate to={"/login"} />;
}
