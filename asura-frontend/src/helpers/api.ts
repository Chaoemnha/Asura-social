import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn x-auth-token nếu có
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers = config.headers || {};
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // todo
    }
    return Promise.reject(err);
  }
);

export { api };
