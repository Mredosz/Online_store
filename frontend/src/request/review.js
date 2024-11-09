import axios from "axios";

export const getAllReview = async () => {
  return (await axios.get("http://localhost:3000/review/")).data;
};

export const getAllReviewFromProduct = async (id) => {
  return (
    await axios.get(`http://localhost:3000/review/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addReview = async (id, review) => {
  return (
    await axios.post(`http://localhost:3000/review/${id}`, review, {
      withCredentials: true,
    })
  ).data;
};

export const acceptReview = async (id, value) => {
  return (
    await axios.put(`http://localhost:3000/review/${id}`, {
      isAccepted: value,
    })
  ).data;
};
