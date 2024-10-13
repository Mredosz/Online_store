import axios from "axios";

export const register = async (user) => {
  return (await axios.post("http://localhost:3000/account/register", user))
    .data;
};

export const login = async (user) => {
  return (await axios.post("http://localhost:3000/account/login", user)).data;
};
