import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from "../../screens/Test";
import Icon from "react-native-vector-icons/FontAwesome5";
import Cart from "../../screens/cart/Cart";
import Search from "../../screens/search/Search";
import { colors } from "../../utils/colors";
import Login from "../../screens/account/login/Login";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Search":
              iconName = "search";
              break;
            case "Cart":
              iconName = "shopping-cart";
              break;
            case "Account":
              iconName = "user";
              break;
            default:
              iconName = "circle";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.darkBgSoft },
        headerStyle: { backgroundColor: colors.darkBgSoft },
        headerTitleStyle: { color: colors.darkText },
        sceneStyle: { backgroundColor: colors.darkBg },
        tabBarActiveTintColor: colors.darkText,
        tabBarInactiveTintColor: colors.darkBorder,
      })}
    >
      <Tab.Screen name="Home" component={Test} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Account" component={Login} />
    </Tab.Navigator>
  );
}
