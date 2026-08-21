"use server";

import { revalidatePath } from "next/cache";

import AuthIdentity from "../database/models/auth-identity.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import {
  AUTH_PROVIDERS,
  type AuthProvider,
  type ProfileAuthMethod,
  type UserProfileDTO,
} from "@/types/auth";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(userId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(userId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}

// READ A SAFE PROFILE VIEW
export async function getUserProfile(
  userId: string,
): Promise<UserProfileDTO> {
  try {
    await connectToDatabase();

    const [user, identities] = await Promise.all([
      User.findById(userId).select("+password").lean(),
      AuthIdentity.find({ userId })
        .select("provider linkedAt lastUsedAt -_id")
        .sort({ linkedAt: 1 })
        .lean(),
    ]);

    if (!user) throw new Error("User not found");

    const authMethods: ProfileAuthMethod[] = identities.map((identity: any) => ({
      provider: identity.provider as AuthProvider,
      linkedAt: identity.linkedAt?.toISOString?.() || null,
      lastUsedAt: identity.lastUsedAt?.toISOString?.() || null,
      source: "identity",
    }));

    const hasPassword = Boolean(user.password);
    const hasCredentialsIdentity = authMethods.some(
      (method) => method.provider === "credentials",
    );

    if (hasPassword && !hasCredentialsIdentity) {
      authMethods.unshift({
        provider: "credentials",
        linkedAt: null,
        lastUsedAt: null,
        source: "legacy-password",
      });
    }

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    const username = user.username || user.email.split("@")[0];
    const fullName = `${firstName} ${lastName}`.trim() || username;
    const objectIdCreatedAt = user._id.getTimestamp();
    const lastLoginProvider = AUTH_PROVIDERS.includes(
      user.lastLoginProvider as AuthProvider,
    )
      ? (user.lastLoginProvider as AuthProvider)
      : null;

    return {
      id: user._id.toString(),
      email: user.email,
      username,
      firstName,
      lastName,
      fullName,
      photo: user.photo || "",
      planId: Number(user.planId) || 1,
      creditBalance: Number(user.creditBalance) || 0,
      memberSince: (user.createdAt || objectIdCreatedAt).toISOString(),
      lastUpdatedAt: user.updatedAt?.toISOString?.() || null,
      lastLoginProvider,
      authMethods,
      hasUnclassifiedLegacyOAuth:
        identities.length === 0 && !hasPassword,
    };
  } catch (error) {
    handleError(error);
    throw error;
  }
}
