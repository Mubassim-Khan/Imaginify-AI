import { randomUUID } from "node:crypto";

import { isValidObjectId } from "mongoose";

import { connectToDatabase } from "@/lib/database/mongoose";
import AuthIdentity from "@/lib/database/models/auth-identity.model";
import User from "@/lib/database/models/user.model";
import {
  AUTH_PROVIDERS,
  type AuthProvider,
} from "@/types/auth";

type AuthUserInput = {
  id?: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

type AuthAccountInput = {
  provider?: string;
  providerAccountId?: string;
};

const isDuplicateKeyError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === 11000;

export const getAuthProvider = (provider?: string): AuthProvider | null =>
  AUTH_PROVIDERS.includes(provider as AuthProvider)
    ? (provider as AuthProvider)
    : null;

const getUniqueUsername = async (name: string) => {
  const base = name.trim().slice(0, 48) || "Imaginify user";
  if (!(await User.exists({ username: base }))) return base;

  return `${base.slice(0, 41)}-${randomUUID().slice(0, 6)}`;
};

const createOAuthUser = async (user: AuthUserInput, email: string) => {
  const displayName = user.name?.trim() || email.split("@")[0];
  const nameParts = displayName.split(/\s+/).filter(Boolean);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const username =
      attempt === 0
        ? await getUniqueUsername(displayName)
        : `${displayName.slice(0, 41)}-${randomUUID().slice(0, 6)}`;

    try {
      return await User.create({
        email,
        username,
        firstName: nameParts[0] || displayName,
        lastName: nameParts.slice(1).join(" "),
        photo: user.image || "",
      });
    } catch (error) {
      const userWithEmail = await User.findOne({ email });
      if (userWithEmail) return userWithEmail;
      if (!isDuplicateKeyError(error) || attempt === 2) throw error;
    }
  }

  throw new Error("Unable to create an account for this identity.");
};

const attachIdentity = async ({
  userId,
  provider,
  providerAccountId,
}: {
  userId: string;
  provider: AuthProvider;
  providerAccountId: string;
}) => {
  const now = new Date();

  try {
    const identity = await AuthIdentity.findOneAndUpdate(
      { provider, providerAccountId },
      {
        $setOnInsert: { userId, linkedAt: now },
        $set: { lastUsedAt: now },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    if (identity.userId.toString() !== userId) {
      throw new Error("This sign-in identity is linked to another account.");
    }
  } catch (error) {
    if (!isDuplicateKeyError(error)) throw error;

    const identity = await AuthIdentity.findOne({
      provider,
      providerAccountId,
    });

    if (!identity || identity.userId.toString() !== userId) {
      throw new Error("This sign-in identity is linked to another account.");
    }

    await AuthIdentity.updateOne(
      { _id: identity._id },
      { $set: { lastUsedAt: now } },
    );
  }
};

export const registerCredentialsIdentity = async (userId: string) => {
  await connectToDatabase();
  await AuthIdentity.init();
  await attachIdentity({
    userId,
    provider: "credentials",
    providerAccountId: userId,
  });
};

export const resolveAuthUser = async ({
  user,
  account,
}: {
  user: AuthUserInput;
  account: AuthAccountInput;
}) => {
  const provider = getAuthProvider(account.provider);
  const providerAccountId = account.providerAccountId?.trim();

  if (!provider || !providerAccountId) {
    throw new Error("Unsupported or incomplete sign-in identity.");
  }

  await connectToDatabase();
  await AuthIdentity.init();

  const existingIdentity = await AuthIdentity.findOne({
    provider,
    providerAccountId,
  });

  let databaseUser = existingIdentity
    ? await User.findById(existingIdentity.userId)
    : null;

  if (existingIdentity && !databaseUser) {
    throw new Error("The linked user account no longer exists.");
  }

  if (!databaseUser && provider === "credentials") {
    if (!user.id || !isValidObjectId(user.id)) {
      throw new Error("Invalid credentials account identifier.");
    }

    databaseUser = await User.findById(user.id);
  }

  if (!databaseUser && provider !== "credentials") {
    const email = user.email?.trim().toLowerCase();
    if (!email) throw new Error("The social account did not provide an email.");

    databaseUser =
      (await User.findOne({ email })) || (await createOAuthUser(user, email));
  }

  if (!databaseUser) throw new Error("User account not found.");

  const databaseUserId = databaseUser._id.toString();

  if (!existingIdentity) {
    await attachIdentity({ userId: databaseUserId, provider, providerAccountId });
  } else {
    await AuthIdentity.updateOne(
      { _id: existingIdentity._id },
      { $set: { lastUsedAt: new Date() } },
    );
  }

  const missingProfileFields: Record<string, string> = {};
  if (!databaseUser.photo && user.image) missingProfileFields.photo = user.image;
  if (!databaseUser.firstName && user.name) {
    const parts = user.name.trim().split(/\s+/);
    missingProfileFields.firstName = parts[0] || user.name;
    if (!databaseUser.lastName && parts.length > 1) {
      missingProfileFields.lastName = parts.slice(1).join(" ");
    }
  }

  await User.updateOne(
    { _id: databaseUser._id },
    {
      $set: {
        ...missingProfileFields,
        lastLoginProvider: provider,
      },
    },
  );

  return {
    id: databaseUserId,
    provider,
  };
};
