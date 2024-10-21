import axios from "axios";

export const getCart = async (cart) => {
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

export const deleteFromCart = async (cart) => {
  return (
    await axios.delete("http://localhost:3000/cart", {
      withCredentials: true,
    })
  ).data;
};
