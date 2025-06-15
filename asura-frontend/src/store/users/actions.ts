import { Dispatch } from "redux";
import {
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  RESET_PAGING,
  SET_USERS_KEYWORD,
  UsersActionTypes,
} from "./types";
import { userService } from "../../services/user.service";

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

export const resetPaging = (): UsersActionTypes => {
  return {
    type: RESET_PAGING,
  };
};

export const setUsersKeyword = (keyword: string) => {
  return {
    type: SET_USERS_KEYWORD,
    payload: keyword,
  };
};
