import { Schema, model, models } from "mongoose";

import { AUTH_PROVIDERS } from "@/types/auth";

const AuthIdentitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: AUTH_PROVIDERS,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
      select: false,
    },
    linkedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    lastUsedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

AuthIdentitySchema.index(
  { provider: 1, providerAccountId: 1 },
  { unique: true },
);
AuthIdentitySchema.index({ userId: 1, provider: 1 }, { unique: true });

const AuthIdentity =
  models?.AuthIdentity || model("AuthIdentity", AuthIdentitySchema);

export default AuthIdentity;
