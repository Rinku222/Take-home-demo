import axios from 'axios';
import { showError } from '../utils/toast';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log("API Error:", error);
    const message =
      error?.data?.message ||
      error?.response?.data?.result?.message ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong';

    showError(message);

    return Promise.reject(error);
  }
);

export default api;
