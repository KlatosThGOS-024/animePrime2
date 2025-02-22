import { animeCard } from "./Anime";
import {
  signupSchema,
  loginSchema,
  resetPasswordConfirmSchema,
  resetPasswordRequestSchema,
} from "./User";

const userType = {
  signupSchema,
  loginSchema,
  resetPasswordConfirmSchema,
  resetPasswordRequestSchema,
};

const animeType = {
  animeCard,
};
export { userType, animeType };
