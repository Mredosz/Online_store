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
import Delivery from "../components/delivery/Delivery.jsx";
import DeliveryEnd from "../components/delivery/DeliveryEnd.jsx";
import Categories from "../components/admin/category/Categories.jsx";
import EditCategory from "../components/admin/category/EditCategory.jsx";
import AllUsers from "../components/admin/users/AllUsers.jsx";
import AllOrders from "../components/admin/orders/AllOrders.jsx";
import OrderDetails from "../components/admin/orders/OrderDetails.jsx";
import ProtectedRoute from "../components/ui/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            ),
          },
          {
            path: "delivery",
            element: (
              <ProtectedRoute>
                <Delivery />
              </ProtectedRoute>
            ),
          },
          {
            path: "end",
            element: (
              <ProtectedRoute>
                <DeliveryEnd />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "details/:productId",
            element: (
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminRootElement />
      </ProtectedRoute>
    ),
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
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <AllOrders />,
          },
          {
            path: ":orderId",
            element: <OrderDetails />,
          },
        ],
      },
      { path: "users", element: <AllUsers /> },
      {
        path: "category",
        children: [
          {
            index: true,
            element: <Categories />,
          },
          {
            path: ":categoryId",
            element: <EditCategory />,
          },
        ],
      },
    ],
  },
]);

export default router;
