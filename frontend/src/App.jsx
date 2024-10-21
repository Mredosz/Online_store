import { RouterProvider } from "react-router-dom";
import router from "./routing/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AccountProvider from "./store/account-context.jsx";
import { Provider } from "react-redux";
import cartStore from "./store/cart-redux.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={cartStore}>
      <AccountProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AccountProvider>
    </Provider>
  );
}

export default App;
