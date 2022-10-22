/**
 * Store, Wrapper 생성
 * @author K_Junyyy
 */
import modal from "./modules/modal";
import page from "./modules/page";
import user from "./modules/user";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

let initialRootState;

const rootReducer = combineReducers({
  page: page.reducer,
  user: user.reducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const initStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),

    devTools: process.env.NEXT_PUBLIC_MODE === "development",
  });
  initialRootState = store.getState();
  store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper(initStore, { debug: false });
export default initStore;
