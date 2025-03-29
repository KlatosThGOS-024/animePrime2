import {
  AnimeCardReducerOne,
  AnimeCardReducerTwo,
} from "@/functions/Anime.function";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  REHYDRATE,
  PERSIST,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AnimeCardReducerOne", "AnimeCardReducerTwo"],
};

const rootReducer = combineReducers({
  AnimeCardReducerOne,
  AnimeCardReducerTwo,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
