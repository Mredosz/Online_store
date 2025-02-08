import { StatusBar, Text, View } from "react-native";
import "../global.css";
import Test from "./screens/Test";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <StatusBar />
      <Text className="text-white text-lg font-bold">
        Hello, NativeWind! 🚀
      </Text>
      <Test text="hgyh" number={3} />
    </View>
  );
}
