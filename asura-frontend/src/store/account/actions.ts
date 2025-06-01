import { Dispatch } from "react";
import {
  AccountActionTypes,
  LOG_OUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "./types";
import { userService } from "../../services/user.service";
import { AccountState } from "./types";
import { history } from "../../helpers/history";

export const login = (email: string, password: string, from: string) => {
  //Khi gui action cai thi no se dispatch ra loginRequest
  return (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    userService.login(email, password).then(
      (res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res,
        });
        //Day no di trang khac
        history.push(from, {
          user: "",
          loading: false,
          error: "",
          token: "",
        });
      },
      (error) => {
        dispatch({
          type: LOGIN_FAILURE,
          payload: {
            error: error.toString(),
          },
        });
      }
    );
  };
  //Oke, nhu vay thi khi co request phat thi no day len, thanh cong thi no dispatch success, fail thi dispatch phan fail
};

export const logout = (): AccountActionTypes => {
  return {
    type: LOG_OUT,
  };
};
