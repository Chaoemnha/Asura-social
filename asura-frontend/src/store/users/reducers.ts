import {
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  RESET_PAGING,
  SET_USERS_KEYWORD,
  UsersState,
} from "./types";
import { UsersActionTypes } from "./types";
const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  pageSize: 0,
  loading: false,
  deletedCount: 0,
  error: null,
  keyword: "",
};

export const userReducer = (
  state: UsersState = initialState,
  action: UsersActionTypes
): UsersState => {
  switch (action.type) {
    case LOAD_USER_PAGING_REQUEST: {
      return {
        ...state,
        loading: true,
        keyword: action.payload,
      };
    }
    case LOAD_USER_PAGING_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload.items,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      };
    }
    case RESET_PAGING: {
      return {
        ...state,
        keyword: "",
      };
    }
    case SET_USERS_KEYWORD: {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case LOAD_USER_PAGING_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
        keyword: "",
      };
    }
    default:
      return state;
  }
};
