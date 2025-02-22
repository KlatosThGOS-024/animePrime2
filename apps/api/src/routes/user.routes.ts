import { Router } from "express";
import {
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/User.controller";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const userRouter = Router();
// userRouter.route("/sign").get(userRegiste3r);

userRouter
  .route("/signUp")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), userRegister);
userRouter.route("/login").post(userLogin);
userRouter.route("/logout").delete(userLogout);
export default userRouter;
