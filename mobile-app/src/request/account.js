import axios from "axios";

export const register = async (user) => {
  return (await axios.post("http://localhost:3000/account/register", user))
    .data;
};

export const login = async (user) => {
  return (
    await axios.post("http://localhost:3000/account/login", user, {
      withCredentials: true,
    })
  ).data;
};

export const logout = async () => {
  return (
    await axios.get("http://localhost:3000/account/logout", {
      withCredentials: true,
    })
  ).data;
};

export const protect = async () => {
  await axios.get("http://localhost:3000/protected", {
    withCredentials: true,
  });
};
