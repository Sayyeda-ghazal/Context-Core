import API from "../api/axios"

// SIGNUP
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// CURRENT USER (cookie-based)
export const getMe = () => {
  return API.get("/auth/me");
};

// LOGOUT (cookie-based)
export const logoutUser = () => {
  return API.post("/auth/logout");
};

// FORGOT PASSWORD
export const forgotPassword = (email) => {
  return API.post("/auth/forgot-password", { email });
};

// RESET PASSWORD
export const resetPassword = (data) => {
  return API.post("/auth/reset-password", data);
};
