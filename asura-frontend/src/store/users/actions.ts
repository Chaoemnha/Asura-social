import { AnyAction, Dispatch, UnknownAction } from "redux";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
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
import { ThunkDispatch } from "redux-thunk";

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

export const updateUser = (
  id: string,
  user: IUpdateUserRequest,
  navigate: NavigateFunction
) => {
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
export const deleteUsers = (userIds: string[]) => {
  //Dùng thunk thì nó chấp nhận AnyAction, cả Promise<void> ko thì p ép các thứ
  return async (dispatch: ThunkDispatch<any, any, UnknownAction>) => {
    try {
      dispatch({
        type: DELETE_USER_REQUEST,
      });
      await userService.deleteUsers(userIds);
      dispatch({
        type: DELETE_USER_SUCCESS,
      });
      dispatch(loadUsersPaging(1));
      dispatch(alertSuccess("Xóa người dùng thành công!") as UnknownAction);
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: { error: error },
      });
      dispatch(alertError("Xóa người dùng thất bại!") as UnknownAction);
    }
    setTimeout(() => {
      dispatch(clearAlert() as UnknownAction);
    }, 3000);
  };
};
