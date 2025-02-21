import { animeCard } from "./Anime";
import {
  signupSchema,
  loginSchema,
  resetPasswordConfirmSchema,
  resetPasswordRequestSchema,
} from "./User";

export const userType = {
  signupSchema,
  loginSchema,
  resetPasswordConfirmSchema,
  resetPasswordRequestSchema,
};

export const animeType = {
  animeCard,
};
