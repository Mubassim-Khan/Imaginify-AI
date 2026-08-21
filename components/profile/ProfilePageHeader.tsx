import { Shield, UserRound } from "lucide-react";

export default function ProfilePageHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(215,237,255,0.72))] text-[#0876df] shadow-[0_12px_28px_rgba(8,118,223,0.13),inset_0_1px_0_white] ring-1 ring-inset ring-white/80">
          <UserRound aria-hidden="true" size={21} strokeWidth={1.8} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0876df]">
            Account
          </p>
          <h1 className="mt-1.5 text-[30px] font-semibold leading-none tracking-[-0.045em] text-[#142235] sm:text-[38px]">
            Your profile
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#708093]">
            Review your workspace identity, usage, and secure sign-in methods.
          </p>
        </div>
      </div>

      <span className="ml-14 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/52 px-3 py-1.5 text-[11px] font-medium text-[#607084] shadow-[inset_0_1px_0_white] ring-1 ring-inset ring-white/70 backdrop-blur-xl sm:ml-0">
        <Shield aria-hidden="true" size={13} className="text-[#0876df]" />
        Private workspace
      </span>
    </header>
  );
}
