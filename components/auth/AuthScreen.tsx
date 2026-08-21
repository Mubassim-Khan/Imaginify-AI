import Link from "next/link";

import BrandLogo from "@/components/brand/BrandLogo";
import AuthShowcase from "./AuthShowcase";
import CredentialsAuthForm, { type AuthMode } from "./CredentialsAuthForm";
import SocialLoginButtons from "./SocialLoginButtons";

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const isSignUp = mode === "sign-up";

  return (
    <main className="grid min-h-screen bg-[#fbfaf8] text-[#151311] lg:grid-cols-2">
      <AuthShowcase />

      <section className="flex min-h-screen items-start justify-center px-4 py-6 sm:items-center sm:px-12 sm:py-9">
        <div className="w-full max-w-[420px]">
          <BrandLogo className="mb-10 w-fit lg:hidden sm:mb-14" />

          <p className="block text-[10px] font-bold tracking-[1.5px] text-[#0876df]">
            {isSignUp ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
          </p>
          <h2 className="mb-2 mt-3 text-[32px] font-bold leading-[1.05] tracking-[-1.6px] sm:text-4xl sm:tracking-[-2px]">
            {isSignUp ? "Start creating for free." : "Good to see you again."}
          </h2>
          <p className="text-[13px] text-[#746f69]">
            {isSignUp
              ? "Join thousands of teams making better visual work."
              : "Sign in to continue to your creative workspace."}
          </p>

          <SocialLoginButtons />

          <div className="relative my-5 text-center before:absolute before:left-0 before:right-0 before:top-1/2 before:h-px before:bg-[#e5e1dc]">
            <span className="relative bg-[#fbfaf8] px-3 text-[9px] uppercase tracking-wide text-[#a29c96]">
              or continue with email
            </span>
          </div>

          <CredentialsAuthForm mode={mode} />

          <p className="mt-6 text-center text-xs text-[#756f69]">
            {isSignUp ? "Already have an account?" : "New to Imaginify?"}{" "}
            <Link
              className="font-semibold text-[#0876df]"
              href={isSignUp ? "/sign-in" : "/sign-up"}
            >
              {isSignUp ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <small className="mt-4 block text-center text-[9px] text-[#a39e98]">
            By continuing, you agree to our Terms and Privacy Policy.
          </small>
        </div>
      </section>
    </main>
  );
}
