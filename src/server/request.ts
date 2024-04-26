import axios from "axios";
import swal from 'sweetalert2';

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

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    swal.fire("請求失敗", "網路規則資料被拒絕", "error")
    return Promise.reject(error.response.data);
  }
);

export default request;
