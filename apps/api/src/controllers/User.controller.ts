import type { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { userType } from "@repo/common";
import { User } from "@repo/db";

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const userDetails = userType.signupSchema.safeParse(req.body);
  if (!userDetails.success) {
    throw ApiError.badRequest(
      "Please provide correct credentials",
      userDetails.error
    );
  }
  const userExist = await User.findById({ userDetails });
  if (userExist) {
    throw ApiError.badRequest("User already present by this email");
  }
  const user = await User.create({
    data: {
      username: userDetails.data.username,
      email: userDetails.data.email,
      password: userDetails.data.password,
    },
  });
  res.status(201).send(ApiResponse.success("success", user));
});

const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const userDetails = userType.loginSchema.safeParse(req.body);
  if (!userDetails.success) {
    throw ApiError.badRequest(
      "Please provide correct credentials",
      userDetails.error
    );
  }
  const userExist = await User.findOne({
    where: {
      email: userDetails.data.email,
    },
  });
  if (!userExist) {
    throw ApiError.unauthorized("User Doesnt existed email");
  }

  res.status(200).send(ApiResponse.success("success", userExist));
});
// const getProfile = asyncHandler(async (req: Request, res: Response) => {
//   const user = req.user;
//   res
//     .status(200)
//     .send(ApiResponse.success("successfully get the profile", user));
// });
const userLogout = asyncHandler(async (req: Request, res: Response) => {
  res
    .clearCookie("accessToken")
    .status(200)
    .send(ApiResponse.success("successfully logout"));
});
export { userRegister, userLogin, userLogout };
