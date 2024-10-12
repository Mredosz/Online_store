import { createBrowserRouter } from "react-router-dom";
import Home from "../components/homePage/Home.jsx";
import ErrorElement from "../components/errors/ErrorElement.jsx";
import Cart from "../components/cart/Cart.jsx";
import RootElement from "../components/rootElement/RootElement.jsx";
import ProductDetails from "../components/products/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorElement />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductDetails /> },
          { path: "details/:productId", element: <ProductDetails /> },
        ],
      },
    ],
  },
]);

export default router;
