import axios from "axios";

export const getAllUser = async () => {
  return (
    await axios.get("http://localhost:3000/user", {
      withCredentials: true,
    })
  ).data;
};

export const deleteUser = async (id) => {
  return (
    await axios.delete(`http://localhost:3000/user/${id}`, {
      withCredentials: true,
    })
  ).data;
};
