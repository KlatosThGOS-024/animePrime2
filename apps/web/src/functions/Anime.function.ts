import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnimeCardInterface {
  title: string;
  image: string;
  timeago: string;
  typez: string;
  subDub: string;
}

const initialStateOfAnimeCardInTheseDays: AnimeCardInterface[] = [];
const initialStateOfAnimeCardInPopularOne: AnimeCardInterface[] = [];

const AnimeCardSlicerOne = createSlice({
  name: "AnimeCardFirst",
  initialState: initialStateOfAnimeCardInTheseDays,
  reducers: {
    addCardOne: (state, action: PayloadAction<AnimeCardInterface[]>) => {
      state.push(...action.payload);
    },
  },
});

const AnimeCardSlicerTwo = createSlice({
  name: "AnimeCardSecond",
  initialState: initialStateOfAnimeCardInPopularOne,
  reducers: {
    addCardTwo: (state, action: PayloadAction<AnimeCardInterface[]>) => {
      return [...action.payload];
    },
  },
});

export const { addCardOne } = AnimeCardSlicerOne.actions;
export const { addCardTwo } = AnimeCardSlicerTwo.actions;
export const AnimeCardReducerOne = AnimeCardSlicerOne.reducer;
export const AnimeCardReducerTwo = AnimeCardSlicerTwo.reducer;
