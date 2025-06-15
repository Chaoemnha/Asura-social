import { Dispatch } from "redux";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  IAddUserRequest,
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  UsersActionTypes,
} from "./types";
import { userService } from "../../services/user.service";
import { NavigateFunction } from "react-router";
import { urlConstants } from "../../url-constants/url-constants";

export const loadUsersPaging = (currentPage: number, keyword: string = "") => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      console.log(keyword);
      dispatch({ type: LOAD_USER_PAGING_REQUEST, payload: keyword });
      const res = await userService.getUsersPaging(currentPage, keyword);
      console.log(res);
      dispatch({
        type: LOAD_USER_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({ type: LOAD_USER_PAGING_FAILURE, payload: { error: error } });
    }
  };
};

export const addUser = (user: IAddUserRequest, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      await userService.addUser(user);
      dispatch({ type: ADD_USER_SUCCESS });
      navigate(urlConstants.USER_LIST);
      console.log("object");
    } catch (error) {
      dispatch({ type: ADD_USER_FAILURE, payload: { error: error } });
    }
  };
};
