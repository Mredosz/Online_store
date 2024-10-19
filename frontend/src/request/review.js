import axios from "axios";

export const getAllReview = async () => {
  return (await axios.get("http://localhost:3000/review/all")).data;
};

export const getAllFromProduct = async (user) => {
  return (
    await axios.get("http://localhost:3000/review", {
      withCredentials: true,
    })
  ).data;
};

export const addReview = async (review) => {
  return (
    await axios.post("http://localhost:3000/review", review, {
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
