import axios from "axios";

export const addOrder = async (order) => {
  return (
    await axios.post("http://localhost:3000/order/", order, {
      withCredentials: true,
    })
  ).data;
};
