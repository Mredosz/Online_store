import { createBrowserRouter } from "react-router-dom";
import Home from "../components/homePage/Home.jsx";
import ErrorElement from "../components/errors/ErrorElement.jsx";
import Cart from "../components/cart/Cart.jsx";
import RootElement from "../components/rootElement/RootElement.jsx";
import ProductDetails from "../components/products/ProductDetails.jsx";
import Login from "../components/account/login/Login.jsx";
import Register from "../components/account/regiter/Register.jsx";
import AdminMain from "../components/admin/main/AdminMain.jsx";
import AdminRootElement from "../components/admin/rootElement/AdminRootElement.jsx";
import AllReview from "../components/admin/review/AllReview.jsx";
import Products from "../components/admin/products/Products.jsx";
import EditProduct from "../components/admin/products/EditProduct.jsx";

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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "admin",
    element: <AdminRootElement />,
    children: [
      { index: true, element: <AdminMain /> },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":productId",
            element: <EditProduct />,
          },
        ],
      },
      { path: "review", element: <AllReview /> },
    ],
  },
]);

export default router;
