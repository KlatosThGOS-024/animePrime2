import mongoose, { Model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    coverImg: {
      type: String,
    },
    email: {
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
      type: String,
      required: true,
      trim: true,
      unique: true,

      lowercase: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export { User };
