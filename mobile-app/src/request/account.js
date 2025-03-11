import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_BASE_URL } from "@env";

export const register = async (user) => {
  return (await axios.post(`${EXPO_BASE_URL}/account/register`, user)).data;
};

export const login = async (user) => {
  return await axios.post(`${EXPO_BASE_URL}/account/login`, {
    user,
    platform: "mobile",
  });
};

export const logout = async () => {
  return (await axios.get(`${EXPO_BASE_URL}/account/logout`)).data;
};

export const protect = async () => {
  await axios.post(
    `${EXPO_BASE_URL}/protected`,
    { platform: "mobile" },
    {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    },
  );
};
