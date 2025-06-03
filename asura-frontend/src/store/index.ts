import { combineReducers, compose } from "redux";
import { accountReducer } from "./account/reducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  account: accountReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};
//Lỗi vì persistReducer kì vọng tham số thứ 2 là 1 reducer trả về kiểu Partial<{ account: never }>
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as (
    state: Partial<{ account: never }> | undefined,
    action: any
  ) => Partial<{ account: never }>
);
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;
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

const store = configurStore();
const persistedStore = persistStore(store);

export { store, persistedStore };
