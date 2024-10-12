import axios from "axios";

export const getAllProducts = async () => {
  return (await axios.get("http://localhost:3000/products")).data;
};

export const getProductDetails = async (id) => {
  return (
    await axios.get(`http://localhost:3000/products/details?productId=${id}`)
  ).data;
};
