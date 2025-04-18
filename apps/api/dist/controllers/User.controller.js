"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const common_1 = require("@repo/common");
const db_1 = require("@repo/db");
const userRegister = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = common_1.userType.signupSchema.safeParse(req.body);
    if (!userDetails.success) {
        throw ApiError_1.ApiError.badRequest("Please provide correct credentials", userDetails.error);
    }
    const userExist = yield db_1.User.findById({ userDetails });
    if (userExist) {
        throw ApiError_1.ApiError.badRequest("User already present by this email");
    }
    const user = yield db_1.User.create({
        data: {
            username: userDetails.data.username,
            email: userDetails.data.email,
            password: userDetails.data.password,
        },
    });
    res.status(201).send(ApiResponse_1.ApiResponse.success("success", user));
}));
exports.userRegister = userRegister;
const userLogin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = common_1.userType.loginSchema.safeParse(req.body);
    if (!userDetails.success) {
        throw ApiError_1.ApiError.badRequest("Please provide correct credentials", userDetails.error);
    }
    const userExist = yield db_1.User.findOne({
        where: {
            email: userDetails.data.email,
        },
    });
    if (!userExist) {
        throw ApiError_1.ApiError.unauthorized("User Doesnt existed email");
    }
    res.status(200).send(ApiResponse_1.ApiResponse.success("success", userExist));
}));
exports.userLogin = userLogin;
// const getProfile = asyncHandler(async (req: Request, res: Response) => {
//   const user = req.user;
//   res
//     .status(200)
//     .send(ApiResponse.success("successfully get the profile", user));
// });
const userLogout = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie("accessToken")
        .status(200)
        .send(ApiResponse_1.ApiResponse.success("successfully logout"));
}));
exports.userLogout = userLogout;
