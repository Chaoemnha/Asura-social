import { IPagination } from "../../helpers/pagination";

export const LOAD_USER_PAGING_REQUEST = "LOAD_USER_PAGING_REQUEST"; //Tao action
export const LOAD_USER_PAGING_SUCCESS = "LOAD_USER_PAGING_SUCCESS";
export const LOAD_USER_PAGING_FAILURE = "LOAD_USER_PAGING_FAILURE";

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

interface LoadUserPagingRequest {
  type: typeof LOAD_USER_PAGING_REQUEST;
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
}

export type UsersActionTypes =
  | LoadUserPagingRequest
  | LoadUserPagingSuccess
  | LoadUserPagingFailure;
