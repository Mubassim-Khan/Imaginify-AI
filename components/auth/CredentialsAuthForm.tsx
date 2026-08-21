"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import PasswordField from "./PasswordField";

export type AuthMode = "sign-in" | "sign-up";

const inputClassName =
  "h-[50px] w-full rounded-lg border border-[#dad6d0] bg-white px-3.5 text-[13px] text-[#191715] outline-none transition focus:border-[#0876df] focus:ring-4 focus:ring-[#0876df]/10";

export default function CredentialsAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    try {
      if (isSignUp) {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: data.get("name"), email, password }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) throw new Error("Email or password is incorrect.");

      router.push("/studio");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {isSignUp && (
        <label className="grid gap-2 text-[11px] font-semibold text-[#3e3a36]">
          Your name
          <input
            className={inputClassName}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            placeholder="Alex Morgan"
          />
        </label>
      )}

      <label className="grid gap-2 text-[11px] font-semibold text-[#3e3a36]">
        Email address
        <input
          className={inputClassName}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
        />
      </label>

      <PasswordField
        isSignUp={isSignUp}
        inputClassName={inputClassName}
      />

      {error && (
        <div className="rounded-lg bg-[#fff0ed] p-3 text-[11px] text-[#a63d2d]">
          {error}
        </div>
      )}

      <button
        className="mt-1 flex h-[51px] items-center justify-center gap-2 rounded-full bg-[#0876df] text-[13px] font-bold text-white shadow-[0_10px_24px_#0876df32] disabled:opacity-70"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            {isSignUp ? "Create account" : "Sign in"}
            <ArrowRight size={17} />
          </>
        )}
      </button>
    </form>
  );
}
