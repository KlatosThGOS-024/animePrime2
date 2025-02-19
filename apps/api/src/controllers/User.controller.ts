import type { Request, Response } from "express";

import { ApiError } from "../utils/ApiError";
import prisma from "db";
import { ApiResponse } from "../utils/ApiResponse";
import { userType } from "common";
import { asyncHandler } from "../utils/asyncHandler";

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const userDetails = userType.signupSchema.safeParse(req.body);
  if (!userDetails.success) {
    throw ApiError.badRequest(
      "Please provide correct credentials",
      userDetails.error
    );
  }
  const userExist = await prisma.user.findFirst({});
  if (userExist) {
    throw ApiError.badRequest("User already present by this email");
  }
  const user = await prisma.user.create({
    data: {
      username: userDetails.data.username,
      email: userDetails.data.email,
      password: userDetails.data.password,
    },
  });
  res.status(201).send(ApiResponse.success("success", user));
});
const userRegiste3r = asyncHandler(async (req: Request, res: Response) => {
  const helo = "jel";
  res.status(201).send(ApiResponse.success("success", helo));
});
const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const userDetails = userType.loginSchema.safeParse(req.body);
  if (!userDetails.success) {
    throw ApiError.badRequest(
      "Please provide correct credentials",
      userDetails.error
    );
  }
  const userExist = await prisma.user.findFirst({
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
export { userRegister, userRegiste3r, userLogin, userLogout };
