"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  isSignUp: boolean;
  inputClassName: string;
};

export default function PasswordField({
  isSignUp,
  inputClassName,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="grid gap-2 text-[11px] font-semibold text-[#3e3a36]">
      Password
      <div className="relative">
        <input
          className={`${inputClassName} pr-12`}
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={isSignUp ? "new-password" : "current-password"}
          required
          minLength={8}
          placeholder="At least 8 characters"
        />
        <button
          type="button"
          onClick={() => setShowPassword((visible) => !visible)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b857f]"
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </label>
  );
}
