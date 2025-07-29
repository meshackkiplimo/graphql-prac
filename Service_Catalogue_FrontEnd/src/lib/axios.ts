import axios from "axios";
// Commented out mock adapter to use real backend
// import MockAdapter from "axios-mock-adapter";
// import { MockEndPoints } from "__server__";

// Axios instance configured for Vendure backend
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// Remove mock adapter usage
// export const Mock = new MockAdapter(axiosInstance);
// MockEndPoints(Mock);

export default axiosInstance;
