import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
});

const resetPasswordConfirmSchema = z.object({
  token: z.string(), // Reset token sent to email
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
export {
  signupSchema,
  loginSchema,
  resetPasswordConfirmSchema,
  resetPasswordRequestSchema,
};
