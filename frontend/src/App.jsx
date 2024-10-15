import { RouterProvider } from "react-router-dom";
import router from "./routing/route.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AccountProvider from "./store/account-context.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <AccountProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AccountProvider>
  );
}

export default App;
