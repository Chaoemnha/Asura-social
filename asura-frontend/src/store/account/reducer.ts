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
} from "./types";
const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
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
        error: action.payload.error,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
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
      return { ...state, user: null, loading: true };
    }
    case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
      return {
        user: action.payload.user ?? {
          _id: "",
          first_name: "",
          last_name: "",
          email: "",
          avatar: "",
        },
        loading: false,
        error: null,
        token: state.token,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default: {
      return state; //Store se tu hung cai return (su thay doi)
    }
  }
};
//=> Reducer nay la 1 pull func, ko lmj ca, chi modifile tuy theo action thoi
