import axios from "axios";
import { EXPO_BASE_URL } from "@env";

export const getAllCategory = async () => {
  return (
    await axios.get(`${EXPO_BASE_URL}/category/`, {
      withCredentials: true,
    })
  ).data;
};

export const getCategoryById = async (id) => {
  return (
    await axios.get(`${EXPO_BASE_URL}/category/${id}`, {
      withCredentials: true,
    })
  ).data;
};
