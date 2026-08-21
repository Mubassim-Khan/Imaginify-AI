"use client";

import { signIn } from "next-auth/react";

const buttonClassName =
  "flex h-12 items-center justify-center gap-2 rounded-lg border border-[#dcd8d2] bg-white text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

export default function SocialLoginButtons() {
  return (
    <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/studio" })}
        className={buttonClassName}
      >
        <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true">
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
        Google
      </button>

      <button
        type="button"
        onClick={() => signIn("github", { callbackUrl: "/studio" })}
        className={buttonClassName}
      >
        <svg className="size-[18px]" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18A10.96 10.96 0 0 1 12 6.11c.98 0 1.96.13 2.87.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.4-5.29 5.68.42.36.79 1.07.79 2.16v3.25c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
          />
        </svg>
        GitHub
      </button>
    </div>
  );
}
