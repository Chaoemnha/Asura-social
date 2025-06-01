import { combineReducers } from "redux";
import { accountReducer } from "./account/reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  account: accountReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
//Tu tim hieu va cai dat thunkmiddleware
export default function configurStore() {
  //   const middlewares = [thunk]; Doan ma cu
  //   const middlewareEnhancer = applyMiddleware(...middlewares);
  //   return configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares) });
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
  });
}
