import { Dispatch } from "redux";
import {
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  UsersActionTypes,
} from "./types";
import { userService } from "../../services/user.service";

export const loadUsersPaging = (currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({ type: LOAD_USER_PAGING_REQUEST });
      const res = await userService.getUsersPaging(currentPage);
      dispatch({
        type: LOAD_USER_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({ type: LOAD_USER_PAGING_FAILURE, payload: { error: error } });
    }
  };
};
