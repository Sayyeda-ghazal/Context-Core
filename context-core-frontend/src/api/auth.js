import API from "../api/axios"

// SIGNUP
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// FORGOT PASSWORD
export const forgotPassword = (email) => {
  return API.post("/auth/forgot-password", { email });
};

// RESET PASSWORD
export const resetPassword = (data) => {
  return API.post("/auth/reset-password", data);
};