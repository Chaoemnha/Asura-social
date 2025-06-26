import { Dispatch } from "react";
import {
  AccountActionTypes,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOG_OUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "./types";
import { userService } from "../../services/user.service";
import { NavigateFunction } from "react-router";

export const login = (
  email: string,
  password: string,
  from: string,
  navigate: NavigateFunction
) => {
  //Khi gui action cai thi no se dispatch ra loginRequest
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    try {
      const response = await userService.login(email, password);
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
      navigate(from);
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error },
      });
    }
  };
  //Oke, nhu vay thi khi co request phat thi no day len, thanh cong thi no dispatch success, fail thi dispatch phan fail
};

export const logout = (): AccountActionTypes => {
  return {
    type: LOG_OUT,
  };
};

export const getCurrentLoginUser = () => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOAD_CURRENT_LOGIN_USER_REQUEST,
    });
    try {
      const response = await userService.getCurrentLoginUser();
      console.log(response);
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
        payload: { user: response },
      });
    } catch (error) {
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_FAILURE,
        payload: { error: error },
      });
    }
  };
};
