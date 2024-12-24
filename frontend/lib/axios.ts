import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Update with your API base URL
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;