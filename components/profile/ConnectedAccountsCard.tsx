import { Info, KeyRound, Mail, ShieldCheck } from "lucide-react";

import type {
  AuthProvider,
  ProfileAuthMethod,
} from "@/types/auth";

const providerLabels: Record<AuthProvider, string> = {
  credentials: "Email & password",
  google: "Google",
  github: "GitHub",
};

const formatDate = (value: string | null) => {
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
};

export default function ConnectedAccountsCard({
  methods,
  lastLoginProvider,
  hasUnclassifiedLegacyOAuth,
}: {
  methods: ProfileAuthMethod[];
  lastLoginProvider: AuthProvider | null;
  hasUnclassifiedLegacyOAuth: boolean;
}) {
  return (
    <article className="rounded-[28px] bg-white/58 p-5 shadow-[0_24px_70px_rgba(24,45,73,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-inset ring-white/65 backdrop-blur-3xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-[-0.025em] text-[#17263a]">
            Sign-in methods
          </p>
          <p className="mt-1 text-xs leading-5 text-[#748294]">
            Accounts currently connected to this workspace.
          </p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#e6f3ff]/75 text-[#0876df] shadow-[inset_0_1px_0_white] ring-1 ring-inset ring-white/75">
          <ShieldCheck aria-hidden="true" size={19} />
        </span>
      </div>

      <div className="mt-5 grid gap-2.5">
        {methods.map((method) => {
          const linkedAt = formatDate(method.linkedAt);
          const lastUsedAt = formatDate(method.lastUsedAt);
          const isLastUsed = lastLoginProvider === method.provider;

          return (
            <div
              key={method.provider}
              className="flex items-center gap-3 rounded-2xl bg-white/56 p-3.5 ring-1 ring-inset ring-[#d9e7f4]/70"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/85 text-[#243449] shadow-[0_8px_20px_rgba(31,53,80,0.08),inset_0_1px_0_white]">
                <ProviderIcon provider={method.provider} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-[#26374c]">
                    {providerLabels[method.provider]}
                  </p>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                    Connected
                  </span>
                  {isLastUsed && (
                    <span className="rounded-full bg-[#eaf4fe] px-2 py-0.5 text-[10px] font-semibold text-[#0876df]">
                      Last used
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-[11px] text-[#8591a0]">
                  {method.source === "legacy-password"
                    ? "Confirmed from your existing password account"
                    : lastUsedAt
                      ? `Last used ${lastUsedAt}`
                      : linkedAt
                        ? `Connected ${linkedAt}`
                        : "Connected securely"}
                </p>
              </div>
            </div>
          );
        })}

        {hasUnclassifiedLegacyOAuth && (
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50/70 p-3.5 text-amber-950 ring-1 ring-inset ring-amber-200/70">
            <Info aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
            <div>
              <p className="text-xs font-semibold">Legacy social sign-in</p>
              <p className="mt-1 text-[11px] leading-5 text-amber-900/70">
                This account predates provider tracking. Google or GitHub will be
                identified the next time you sign in.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 flex items-center gap-2 text-[10px] leading-4 text-[#8a96a4]">
        <KeyRound aria-hidden="true" size={13} />
        Provider identifiers and access credentials stay private.
      </p>
    </article>
  );
}

function ProviderIcon({ provider }: { provider: AuthProvider }) {
  if (provider === "github") {
    return (
      <svg className="size-[19px]" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.11c.98 0 1.96.13 2.87.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.4-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
        />
      </svg>
    );
  }

  if (provider === "google") {
    return (
      <svg className="size-[19px]" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M21.35 12.27c0-.73-.07-1.43-.19-2.1H12v3.97h5.24a4.48 4.48 0 0 1-1.94 2.94v2.58h3.14c1.84-1.69 2.91-4.19 2.91-7.39Z"
        />
        <path
          fill="#34A853"
          d="M12 21.78c2.63 0 4.83-.87 6.44-2.36l-3.14-2.58c-.87.58-1.98.93-3.3.93-2.53 0-4.68-1.71-5.45-4.01H3.31v2.66A9.73 9.73 0 0 0 12 21.78Z"
        />
        <path
          fill="#FBBC05"
          d="M6.55 13.76A5.84 5.84 0 0 1 6.25 12c0-.61.11-1.2.3-1.76V7.58H3.31A9.77 9.77 0 0 0 2.22 12c0 1.58.38 3.07 1.09 4.42l3.24-2.66Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.23c1.43 0 2.72.49 3.73 1.45l2.79-2.79A9.35 9.35 0 0 0 12 2.22a9.73 9.73 0 0 0-8.69 5.36l3.24 2.66c.77-2.3 2.92-4.01 5.45-4.01Z"
        />
      </svg>
    );
  }

  return <Mail aria-hidden="true" size={19} />;
}
