import axios from "axios";

export const getCart = async () => {
  return (
    await axios.get("http://localhost:3000/cart", {
      withCredentials: true,
    })
  ).data;
};

export const addToCart = async (cart) => {
  return (
    await axios.post("http://localhost:3000/cart", cart, {
      withCredentials: true,
    })
  ).data;
};

export const deleteFromCart = async (id) => {
  return (
    await axios.delete(`http://localhost:3000/cart?productId=${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const deleteCart = async () => {
  return (
    await axios.delete("http://localhost:3000/cart/delete", {
      withCredentials: true,
    })
  ).data;
};
