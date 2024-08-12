// src/services/apiClient.ts
import axios from "axios";
import authService from "./authService";

// Create a new axios instance
const apiClient = axios.create({
  baseURL: "https://reqres.in",
});

// Interceptor to add the Authorization header if a token is available
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
