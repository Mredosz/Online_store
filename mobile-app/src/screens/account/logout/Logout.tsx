import { Pressable, Text, View } from "react-native";
import { logout } from "../../../request/account";
import { accountAction } from "../../../store/account-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(accountAction.logout());
    await logout();
    await AsyncStorage.removeItem("token");
  };
  return (
    <View className="flex h-full w-full justify-center items-center">
      <Pressable
        onPress={handleLogout}
        className="px-3 py-2 rounded-md bg-darkBgMuted"
      >
        <Text className="text-darkText">Log out.</Text>
      </Pressable>
    </View>
  );
}
