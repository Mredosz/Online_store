import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../screens/account/login/Login";
import Register from "../../screens/account/register/Register";
import { colors } from "../../utils/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.darkBg },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
