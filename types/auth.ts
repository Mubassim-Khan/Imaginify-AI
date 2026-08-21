export const AUTH_PROVIDERS = ["credentials", "google", "github"] as const;

export type AuthProvider = (typeof AUTH_PROVIDERS)[number];

export type ProfileAuthMethod = {
  provider: AuthProvider;
  linkedAt: string | null;
  lastUsedAt: string | null;
  source: "identity" | "legacy-password";
};

export type UserProfileDTO = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  planId: number;
  creditBalance: number;
  memberSince: string;
  lastUpdatedAt: string | null;
  lastLoginProvider: AuthProvider | null;
  authMethods: ProfileAuthMethod[];
  hasUnclassifiedLegacyOAuth: boolean;
};
