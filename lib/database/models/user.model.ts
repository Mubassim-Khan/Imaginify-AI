import { Schema, model, models } from "mongoose";

import { AUTH_PROVIDERS } from "@/types/auth";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    photo: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      select: false,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    planId: {
      type: Number,
      default: 1,
    },
    creditBalance: {
      type: Number,
      default: 10,
    },
    lastLoginProvider: {
      type: String,
      enum: AUTH_PROVIDERS,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = models?.User || model("User", UserSchema);

export default User;
