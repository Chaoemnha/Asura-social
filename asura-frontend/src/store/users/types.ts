import { IPagination } from "../../helpers/pagination";

export const LOAD_USER_PAGING_REQUEST = "LOAD_USER_PAGING_REQUEST"; //Tao action
export const LOAD_USER_PAGING_SUCCESS = "LOAD_USER_PAGING_SUCCESS";
export const LOAD_USER_PAGING_FAILURE = "LOAD_USER_PAGING_FAILURE";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const GET_USER_BY_ID_REQUEST = "GET_USER_BY_ID_REQUEST";
export const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAILURE = "GET_USER_BY_ID_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

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
export interface IUpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
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
interface GetUserByIdRequest {
  type: typeof GET_USER_BY_ID_REQUEST;
}

interface GetUserByIdSuccess {
  type: typeof GET_USER_BY_ID_SUCCESS;
  payload: {
    user: IUser;
  };
}

interface GetUserByIdFailure {
  type: typeof GET_USER_BY_ID_FAILURE;
  payload: {
    error: unknown;
  };
}
interface UpdateUserRequest {
  type: typeof UPDATE_USER_REQUEST;
}
interface UpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
}
interface UpdateUserFailure {
  type: typeof UPDATE_USER_FAILURE;
  payload: {
    error: unknown;
  };
}
interface DeleteUserRequest {
  type: typeof DELETE_USER_REQUEST;
}
interface DeleteUserSuccess {
  type: typeof DELETE_USER_SUCCESS;
}
interface DeleteUserFailure {
  type: typeof DELETE_USER_FAILURE;
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
  editUser: IUser | null;
}

export type UsersActionTypes =
  | LoadUserPagingRequest
  | LoadUserPagingSuccess
  | LoadUserPagingFailure
  | AddUserRequest
  | AddUserSuccess
  | AddUserFailure
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure
  | GetUserByIdRequest
  | GetUserByIdSuccess
  | GetUserByIdFailure
  | DeleteUserFailure
  | DeleteUserRequest
  | DeleteUserSuccess;
