import axios from "axios";

const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as any,
  // timeout: 3000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// request.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error.response.data);
//   }
// );

export default request;
