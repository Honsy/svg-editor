import axios from "axios";

export const service = axios.create({
  baseURL: "",
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response;
    if (res.status === 200) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const errMsg = error.response?.data?.msg;
    return Promise.reject(error);
  }
);