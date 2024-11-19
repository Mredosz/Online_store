import axios from "axios";

export const getAllOrders = async () => {
  return (
    await axios.get("http://localhost:3000/order/", {
      withCredentials: true,
    })
  ).data;
};

export const getOrderById = async (id) => {
  return (
    await axios.get(`http://localhost:3000/order/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addOrder = async (order) => {
  return (
    await axios.post("http://localhost:3000/order/", order, {
      withCredentials: true,
    })
  ).data;
};

export const changeOrderStatus = async (id, status) => {
  return (
    await axios.put(
      `http://localhost:3000/order/${id}`,
      { status },
      {
        withCredentials: true,
      },
    )
  ).data;
};

export const getReports = async () => {
  return (
    await axios.get("http://localhost:3000/order/reports", {
      withCredentials: true,
    })
  ).data;
};
