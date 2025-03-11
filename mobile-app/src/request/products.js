import axios from "axios";
import { EXPO_BASE_URL } from "@env";

export const getAllProducts = async () => {
  return (await axios.get(`${EXPO_BASE_URL}/products`)).data;
};

export const getProductDetails = async (id) => {
  return (await axios.get(`${EXPO_BASE_URL}/products/${id}`)).data;
};

export const getRecommendedProducts = async (id) => {
  return (
    await axios.get(`${EXPO_BASE_URL}/products/recommended/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const filterProducts = async (sort, query) => {
  return (
    await axios.post(`${EXPO_BASE_URL}/products/filter?q=${query}`, sort, {
      withCredentials: true,
    })
  ).data;
};
