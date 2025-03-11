import axios from "axios";
import { EXPO_BASE_URL } from "@env";

export const getAllOrders = async () => {
  return (
    await axios.get(`${EXPO_BASE_URL}/order/`, {
      withCredentials: true,
    })
  ).data;
};

export const getOrderById = async (id) => {
  return (
    await axios.get(`${EXPO_BASE_URL}/order/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addOrder = async (order) => {
  return (
    await axios.post(`${EXPO_BASE_URL}/order/`, order, {
      withCredentials: true,
    })
  ).data;
};
