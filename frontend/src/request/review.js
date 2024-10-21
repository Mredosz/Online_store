import axios from "axios";

export const getAllReview = async () => {
  return (await axios.get("http://localhost:3000/review/all")).data;
};

export const getAllReviewFromProduct = async (id) => {
  return (
    await axios.get(`http://localhost:3000/review?productId=${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addReview = async (id, review) => {
  return (
    await axios.post(`http://localhost:3000/review?productId=${id}`, review, {
      withCredentials: true,
    })
  ).data;
};

export const acceptReview = async (id, value) => {
  return (
    await axios.put(`http://localhost:3000/review?reviewId=${id}`, {
      isAccepted: value,
    })
  ).data;
};
