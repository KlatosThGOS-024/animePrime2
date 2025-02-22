import {
  AnimeCardReducerOne,
  AnimeCardReducerTwo,
} from "@/functions/Anime.function";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REHYDRATE } from "redux-persist";
import { combineReducers, Reducer } from "redux";
//@ts-ignore
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
const indexedDBStorage = createIndexedDBStorage("myIndexedDB", "myDataStore");
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: indexedDBStorage,
  whitelist: ["AnimeCardReducerOne"],
};

const rootReducer = combineReducers({
  AnimeCardReducerOne,
  AnimeCardReducerTwo,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer instead of a normal reducer
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", REHYDRATE], // Ignore certain actions for serializable check
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
