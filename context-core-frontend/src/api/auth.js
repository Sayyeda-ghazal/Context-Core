import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);

  return res.data;
};