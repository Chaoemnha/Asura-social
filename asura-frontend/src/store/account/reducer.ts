import {
  AccountActionTypes,
  AccountState,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOG_OUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "./types";
const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  refreshToken: null,
};

export const accountReducer = (
  state: AccountState = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        token: null,
        refreshToken: null,
        error: action.payload.error,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        token: null,
        error: null,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    }
    default: {
      return state;
    }
  }
};
//=> Reducer nay la 1 pull func, ko lmj ca, chi modifile tuy theo action thoi
