import axios from "axios";

export const getAllProducts = async () => {
  return (await axios.get("http://localhost:3000/products")).data;
};

export const getProductDetails = async (id) => {
  return (
    await axios.get(`http://localhost:3000/products/details?productId=${id}`)
  ).data;
};

export const getProductFromCategory = async (id) => {
  return (
    await axios.get(`http://localhost:3000/products/category?categoryId=${id}`)
  ).data;
};

export const addProduct = async (product) => {
  return (
    await axios.post("http://localhost:3000/products/", product, {
      withCredentials: true,
    })
  ).data;
};

export const updateProduct = async (product, id) => {
  return (
    await axios.put(
      `http://localhost:3000/products/?productId=${id}`,
      product,
      { withCredentials: true },
    )
  ).data;
};

export const deleteProduct = async (id) => {
  return (
    await axios.delete(`http://localhost:3000/products/?productId=${id}`, {
      withCredentials: true,
    })
  ).data;
};
