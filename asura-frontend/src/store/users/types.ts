import { IPagination } from "../../helpers/pagination";

export const LOAD_USER_PAGING_REQUEST = "LOAD_USER_PAGING_REQUEST"; //Tao action
export const LOAD_USER_PAGING_SUCCESS = "LOAD_USER_PAGING_SUCCESS";
export const LOAD_USER_PAGING_FAILURE = "LOAD_USER_PAGING_FAILURE";
export const RESET_PAGING = "RESET_PAGING";
export const SET_USERS_KEYWORD = "SET_USERS_KEYWORD";
export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}
interface ResetPaging {
  type: typeof RESET_PAGING;
}

interface SetUsersKeyword {
  type: typeof SET_USERS_KEYWORD;
  payload: string;
}
interface LoadUserPagingRequest {
  type: typeof LOAD_USER_PAGING_REQUEST;
  payload: string;
}

interface LoadUserPagingSuccess {
  type: typeof LOAD_USER_PAGING_SUCCESS;
  payload: IPagination<IUser>; //Mot doi tuong chua nhieu item <IUser>
}

interface LoadUserPagingFailure {
  type: typeof LOAD_USER_PAGING_FAILURE;
  payload: {
    error: unknown;
  };
}

export interface UsersState {
  items: IUser[];
  page: number;
  total: number;
  pageSize: number;
  loading: boolean;
  deletedCount: number;
  error: unknown;
  keyword: string;
}

export type UsersActionTypes =
  | LoadUserPagingRequest
  | LoadUserPagingSuccess
  | LoadUserPagingFailure
  | ResetPaging
  | SetUsersKeyword;
