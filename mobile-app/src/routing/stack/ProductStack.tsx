import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../utils/colors";
import Home from "../../screens/products/Home";
import ProductDetails from "../../screens/products/details/ProductDetails";

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.darkBg },
      }}
    >
      <Stack.Screen name="Products" component={Home} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
