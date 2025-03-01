import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = async (user) => {
  return (await axios.post("http://localhost:3000/account/register", user))
    .data;
};

export const login = async (user) => {
  return await axios.post("http://localhost:3000/account/login", {
    user,
    platform: "mobile",
  });
};

export const logout = async () => {
  return (await axios.get("http://localhost:3000/account/logout")).data;
};

export const protect = async () => {
  await axios.post(
    "http://localhost:3000/protected",
    { platform: "mobile" },
    {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    },
  );
};
