import axios from "axios";

export const getAllProducts = async () => {
  return (await axios.get("http://localhost:3000/products")).data;
};

export const getProductDetails = async (id) => {
  return (await axios.get(`http://localhost:3000/products/${id}`)).data;
};

export const searchProducts = async (query) => {
  return (
    await axios.get(`http://localhost:3000/products/search?q=${query}`, {
      withCredentials: true,
    })
  ).data;
};

export const filterProducts = async (sort) => {
  return (
    await axios.post("http://localhost:3000/products/filter", sort, {
      withCredentials: true,
    })
  ).data;
};

export const addProduct = async (product) => {
  return (
    await axios.post("http://localhost:3000/products", product, {
      withCredentials: true,
    })
  ).data;
};

export const updateProduct = async (product, id) => {
  return (
    await axios.put(`http://localhost:3000/products/${id}`, product, {
      withCredentials: true,
    })
  ).data;
};

export const deleteProduct = async (id) => {
  return (
    await axios.delete(`http://localhost:3000/products/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export class filterProductsByCategory {}
