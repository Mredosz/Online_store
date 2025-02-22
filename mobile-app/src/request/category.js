import axios from "axios";

export const getAllCategory = async () => {
  return (
    await axios.get("http://localhost:3000/category/", {
      withCredentials: true,
    })
  ).data;
};

export const getCategoryById = async (id) => {
  return (
    await axios.get(`http://localhost:3000/category/${id}`, {
      withCredentials: true,
    })
  ).data;
};

export const addCategory = async (category) => {
  return (
    await axios.post("http://localhost:3000/category/", category, {
      withCredentials: true,
    })
  ).data;
};

export const updateCategory = async (category, id) => {
  return (
    await axios.put(`http://localhost:3000/category/${id}`, category, {
      withCredentials: true,
    })
  ).data;
};

export const deleteCategory = async (id) => {
  return (
    await axios.delete(`http://localhost:3000/category/${id}`, {
      withCredentials: true,
    })
  ).data;
};
