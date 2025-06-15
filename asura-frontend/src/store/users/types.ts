import { IPagination } from "../../helpers/pagination";

export const LOAD_USER_PAGING_REQUEST = "LOAD_USER_PAGING_REQUEST"; //Tao action
export const LOAD_USER_PAGING_SUCCESS = "LOAD_USER_PAGING_SUCCESS";
export const LOAD_USER_PAGING_FAILURE = "LOAD_USER_PAGING_FAILURE";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface IAddUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
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
interface AddUserRequest {
  type: typeof ADD_USER_REQUEST;
}
interface AddUserSuccess {
  type: typeof ADD_USER_SUCCESS;
}
interface AddUserFailure {
  type: typeof ADD_USER_FAILURE;
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
}

export type UsersActionTypes =
  | LoadUserPagingRequest
  | LoadUserPagingSuccess
  | LoadUserPagingFailure
  | AddUserRequest
  | AddUserSuccess
  | AddUserFailure;
