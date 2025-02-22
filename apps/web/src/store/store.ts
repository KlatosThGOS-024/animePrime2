import {
  AnimeCardReducerOne,
  AnimeCardReducerTwo,
} from "@/functions/Anime.function";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    AnimeCardOne: AnimeCardReducerOne,
    AnimeCardTwo: AnimeCardReducerTwo,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
