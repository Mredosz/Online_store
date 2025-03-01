import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store/store-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

export default function Main() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </NavigationContainer>
  );
}
