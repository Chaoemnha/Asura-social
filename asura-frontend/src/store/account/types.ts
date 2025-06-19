export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOAD_CURRENT_LOGIN_USER_REQUEST =
  "LOAD_CURRENT_LOGIN_USER_REQUEST";
export const LOAD_CURRENT_LOGIN_USER_SUCCESS =
  "LOAD_CURRENT_LOGIN_USER_SUCCESS";
export const LOAD_CURRENT_LOGIN_USER_FAILURE =
  "LOAD CURRENT LOGIN USER FAILURE";
export const LOG_OUT = "LOG_OUT";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";
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
    refreshToken: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: unknown;
  };
}

interface Logout {
  type: typeof LOG_OUT;
}

interface LoadCurrentLoginUserRequest {
  type: typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

interface LoadCurrentLoginUserSuccess {
  type: typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
  payload: {
    user: AuthenticatedUser;
  };
}

interface LoadCurrentLoginUserFailure {
  type: typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
  payload: {
    error: unknown;
  };
}

interface RefreshTokenRequest {
  type: typeof REFRESH_TOKEN_REQUEST;
}

interface RefreshTokenSuccess {
  type: typeof REFRESH_TOKEN_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
  };
}

interface RefreshTokenFailure {
  type: typeof REFRESH_TOKEN_FAILURE;
  payload: {
    error: unknown;
  };
}
//=> 1 action se co 2 p, type la hang so va payload la doi tuong
export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: unknown;
  token: string | null;
  refreshToken: string | null;
}

export type AccountActionTypes =
  | LoginRequest
  | LoginSuccess
  | Logout
  | LoginFailure //De check strong type
  | LoadCurrentLoginUserRequest
  | LoadCurrentLoginUserSuccess
  | LoadCurrentLoginUserFailure
  | RefreshTokenFailure
  | RefreshTokenRequest
  | RefreshTokenSuccess;
