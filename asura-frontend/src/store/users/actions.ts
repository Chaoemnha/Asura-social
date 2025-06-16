import { Dispatch } from "redux";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUserRequest,
  IUpdateUserRequest,
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
} from "./types";
import { userService } from "../../services/user.service";
import { NavigateFunction } from "react-router";
import { urlConstants } from "../../constants/url-constants";
import { alertError, alertSuccess, clearAlert } from "../alert/actions";
import { AlertActionTypes } from "../alert/types";

export const loadUsersPaging = (currentPage: number, keyword: string = "") => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({ type: LOAD_USER_PAGING_REQUEST, payload: keyword });
      const res = await userService.getUsersPaging(currentPage, keyword);
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
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      await userService.addUser(user);
      dispatch({ type: ADD_USER_SUCCESS });
      dispatch(alertSuccess("Thêm mới người dùng thành công!"));
      navigate(urlConstants.USER_LIST);
    } catch (error) {
      dispatch({ type: ADD_USER_FAILURE, payload: { error: error } });
      dispatch(alertError("Thêm mới người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const updateUser = (id: string, user: IUpdateUserRequest, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });
      await userService.updateUser(id, user);
      dispatch({ type: UPDATE_USER_SUCCESS });
      dispatch(alertSuccess("Cập nhật người dùng thành công"));
      navigate(urlConstants.USER_LIST);
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAILURE, payload: { error: error } });
      dispatch(alertError("Thêm mới người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const getUserById = (id: string) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({ type: GET_USER_BY_ID_REQUEST });
      const res = await userService.getUserById(id);
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: { user: res } });
    } catch (error) {
      dispatch({ type: GET_USER_BY_ID_FAILURE, payload: { error: error } });
    }
  };
};
