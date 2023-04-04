import axios from "axios";

export const request = axios.create({
  baseURL: "",
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
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