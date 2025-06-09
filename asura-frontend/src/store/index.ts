import { combineReducers, compose, Store } from "redux";
import { accountReducer } from "./account/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setAuthToken } from "../helpers/setAuthToken";

const rootReducer = combineReducers({ account: accountReducer });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};
//Lỗi vì persistReducer kì vọng tham số thứ 2 là 1 reducer trả về kiểu Partial<{ account: never }>
const persistedReducer = persistReducer(persistConfig, rootReducer as any);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof accountReducer>;
export type AppStore = ReturnType<typeof configurStore>;
//Tu tim hieu va cai dat thunkmiddleware
const configurStore = () => {
  //   const middlewares = [thunk]; Doan ma cu
  //   const middlewareEnhancer = applyMiddleware(...middlewares);
  //   return configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares) });
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: true, serializableCheck: false }),
  });
};

const store = configurStore() as Store;
const persistedStore = persistStore(store);

let currentState = store.getState();

//Cu moi lan token thay doi thi tu dong set lai bang phuong thuc nay
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (
    previousState?.account &&
    currentState?.account &&
    previousState.account.token !== currentState.account.token
  ) {
    const token = currentState.account.token;
    if (token) {
      setAuthToken(token);
    }
  }
});

export { store, persistedStore };
