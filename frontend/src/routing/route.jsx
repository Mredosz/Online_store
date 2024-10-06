import { createBrowserRouter } from "react-router-dom";
import Home from "../components/homePage/Home.jsx";
import ErrorElement from "../components/errors/ErrorElement.jsx";
import Cart from "../components/cart/Cart.jsx";
import RootElement from "../components/navbar/RootElement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

export default router;
