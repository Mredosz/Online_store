import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../utils/colors";
import DeliveryEnd from "../../screens/cart/delivery/DeliveryEnd";
import Cart from "../../screens/cart/Cart";

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.darkBg },
      }}
    >
      <Stack.Screen name="CartStack" component={Cart} />
      <Stack.Screen name="DeliveryEnd" component={DeliveryEnd} />
    </Stack.Navigator>
  );
}
