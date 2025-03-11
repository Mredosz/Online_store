import axios from "axios";
import { EXPO_BASE_URL } from "@env";

export const getAllReview = async () => {
  return (await axios.get(`${EXPO_BASE_URL}/review/`)).data;
};

export const getAllReviewFromProduct = async (id) => {
  return (
    await axios.get(`${EXPO_BASE_URL}/review/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addReview = async (id, review) => {
  return (
    await axios.post(`${EXPO_BASE_URL}/review/${id}`, review, {
      withCredentials: true,
    })
  ).data;
};
