import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./routing/bottom-tabs/BottomTabs";
import "../global.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar />
        <BottomTabs />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
