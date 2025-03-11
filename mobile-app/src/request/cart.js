import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_BASE_URL } from "@env";

export const getCart = async () => {
  return (
    await axios.get(`${EXPO_BASE_URL}/cart`, {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    })
  ).data;
};

export const addToCart = async (cart) => {
  return (
    await axios.post(`${EXPO_BASE_URL}/cart`, cart, {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    })
  ).data;
};

export const deleteFromCart = async (id) => {
  return (
    await axios.delete(`${EXPO_BASE_URL}/cart/${id}`, {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    })
  ).data;
};

export const deleteCart = async () => {
  return (
    await axios.delete(`${EXPO_BASE_URL}/cart/`, {
      headers: {
        Authorization: await AsyncStorage.getItem("token"),
      },
    })
  ).data;
};
