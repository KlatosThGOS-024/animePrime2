"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = require("../controllers/User.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const userRouter = (0, express_1.Router)();
userRouter.route("/sign").get(User_controller_1.userRegiste3r);
userRouter
    .route("/signUp")
    .post(upload.fields([{ name: "avatar", maxCount: 1 }]), User_controller_1.userRegister);
userRouter.route("/login").post(User_controller_1.userLogin);
userRouter.route("/logout").delete(User_controller_1.userLogout);
exports.default = userRouter;
