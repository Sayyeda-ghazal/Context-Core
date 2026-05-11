import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Backend runs on port 8000
});

// Add request and response interceptors for debugging
API.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    console.log('Request Headers:', config.headers);
    if (config.data) {
      console.log('Request Data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data, error.config.url);
    return Promise.reject(error);
  }
);

// 🔥 Interceptor (runs BEFORE every request)
API.interceptors.request.use((config) => {
    const token=localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;