export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOG_OUT = "LOG_OUT";
//Chuan bi khai bao cac req va res
export interface AuthenticatedUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface LoginRequest {
  //Kieu action
  type: typeof LOGIN_REQUEST;
  payload: {
    //Cac tham so dau vao cua action
    email: string;
    password: string;
  };
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

interface Logout {
  type: typeof LOG_OUT;
}
//=> 1 action se co 2 p, type la hang so va payload la doi tuong
export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

export type AccountActionTypes =
  | LoginRequest
  | LoginSuccess
  | Logout
  | LoginFailure; //De check strong type
