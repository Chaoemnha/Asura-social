import {
  LOAD_USER_PAGING_FAILURE,
  LOAD_USER_PAGING_REQUEST,
  LOAD_USER_PAGING_SUCCESS,
  UsersState,
} from "./types";
import { UsersActionTypes } from "./types";
const initialState: UsersState = {
  items: [],
  page: 1,
  total: 0,
  loading: false,
  deletedCount: 0,
  error: null,
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
      };
    }
    case LOAD_USER_PAGING_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    default:
      return state;
  }
};
