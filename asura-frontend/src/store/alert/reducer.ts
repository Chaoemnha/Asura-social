import { AlertActionTypes, AlertState } from "./types";

const initialState: AlertState = {
  type: null,
  message: null,
};

export const alertReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes
): AlertState => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return { type: "ALERT_SUCCESS", message: action.payload.message };
    case "ALERT_ERROR":
      return { type: "ALERT_ERROR", message: action.payload.message };
    case "CLEAR_ALERT":
      return { type: null, message: null };
    default:
      return state;
  }
};
