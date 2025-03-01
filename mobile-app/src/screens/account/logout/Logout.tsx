import { Text, TouchableOpacity, View } from "react-native";
import { logout } from "../../../request/account";
import { accountAction } from "../../../store/account-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store-redux";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(accountAction.logout());
    await logout();
  };
  return (
    <View className="flex h-full w-full justify-center items-center">
      <TouchableOpacity
        onPress={handleLogout}
        className="px-3 py-2 rounded-md bg-darkBgMuted"
      >
        <Text className="text-darkText">Log out.</Text>
      </TouchableOpacity>
    </View>
  );
}
