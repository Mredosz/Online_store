import { RouterProvider } from "react-router-dom";
import router from "./routing/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AccountContext } from "./store/account-context.jsx";
import { useDispatch } from "react-redux";
import { cartActions, fetchCartData } from "./store/cart-redux.jsx";
import { useContext, useLayoutEffect } from "react";
import { protect } from "./request/account.js";

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();

  const { isLogged, setIsLogged, setIsAdmin } = useContext(AccountContext);

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
        if (e.response && e.response.status === 307) {
          setIsLogged(false);
          setIsAdmin(false);
        }
      }
    };

    checkAuthAndFetchCart();
  }, [isLogged, setIsLogged, dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
