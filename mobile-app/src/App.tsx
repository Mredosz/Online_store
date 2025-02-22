import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./routing/bottom-tabs/BottomTabs";
import "../global.css";
import { Provider } from "react-redux";
import store from "./store/store-redux";

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar />
          <BottomTabs />
        </QueryClientProvider>
      </Provider>
    </NavigationContainer>
  );
}
