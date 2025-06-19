import axios from "axios";
import { AppState, store } from "../store";
import { useNavigate } from "react-router";
import { urlConstants } from "../constants/url-constants";
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "../store/account/types";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn x-auth-token nếu có
api.interceptors.request.use(
  (config) => {
    const currentState = store.getState() as AppState;
    const token = currentState.account.token;
    if (token) {
      config.headers = config.headers || {};
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      const originalRequest = err.config; //Lay url dang bi loi
      const currentState = store.getState() as AppState;
      const refreshToken = currentState.account.refreshToken;
      console.log("41", refreshToken);
      //Neu RT ma loi nua thi ra login luon
      if (
        err.response.status === 401 &&
        originalRequest.url ===
          `${process.env.REACT_APP_API_URL}/auth/refresh-token/`
      ) {
        const navigate = useNavigate();
        navigate(urlConstants.LOGIN);
        return Promise.reject(err);
      }
      if (refreshToken) {
        store.dispatch({
          type: REFRESH_TOKEN_REQUEST,
        });
        return api
          .post("/auth/refresh-token", { refreshToken: refreshToken })
          .then((response) => {
            store.dispatch({
              type: REFRESH_TOKEN_SUCCESS,
              payload: {
                token: response.data.token,
                refreshToken: response.data.refreshToken,
              },
            });
            //Ngay sau do set lai header dung cho viec request lan tiep
            api.defaults.headers.common["x-auth-token"] = response.data.token;
            originalRequest.headers["x-auth-token"] = response.data.token;
            return api(originalRequest);
          })
          .catch((err) => {
            store.dispatch({
              type: REFRESH_TOKEN_FAILURE,
              payload: { error: err },
            });
            console.log(err);
          });
      } else {
        console.log("Refresh token not available");
        const navigate = useNavigate();
        navigate(urlConstants.LOGIN);
      }
    }
    return Promise.reject(err);
  }
);

export { api };
