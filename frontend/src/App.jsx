import { RouterProvider } from "react-router-dom";
import router from "./routing/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, fetchCartData } from "./store/cart-redux.jsx";
import { useLayoutEffect } from "react";
import { protect } from "./request/account.js";
import { accountAction } from "./store/account-redux.jsx";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.account.isLogged);

  useLayoutEffect(() => {
    const checkAuthAndFetchCart = async () => {
      try {
        if (isLogged) {
          await protect();
          dispatch(fetchCartData());
        } else {
          dispatch(cartActions.deleteCart());
        }
      } catch (e) {
        if (e.response && e.response.status === 401) {
          dispatch(accountAction.logout());
        }
      }
    };

    checkAuthAndFetchCart();
  }, [isLogged, dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
