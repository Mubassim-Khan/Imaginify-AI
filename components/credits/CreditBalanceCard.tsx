import { Coins, Sparkles } from "lucide-react";

type CreditBalanceCardProps = {
  balance: number;
};

export default function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#172963] via-[#173d78] to-[#0876df] p-6 text-white shadow-[0_26px_70px_rgba(18,48,103,0.2)] sm:p-8">
      <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100 ring-1 ring-inset ring-white/15 backdrop-blur-xl">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Creative balance
          </span>
          <h1 className="mt-5 max-w-xl text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            Keep your ideas moving.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-blue-100/80 sm:text-base">
            Add a one-time credit pack whenever you need more transformations.
          </p>
        </div>

        <div className="min-w-48 rounded-3xl bg-white/10 p-5 ring-1 ring-inset ring-white/15 backdrop-blur-2xl">
          <div className="flex items-center gap-3 text-blue-100/80">
            <span className="grid size-10 place-items-center rounded-2xl bg-white/15">
              <Coins className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium">Available now</span>
          </div>
          <p className="mt-4 text-4xl font-bold tracking-[-0.04em]">
            {balance.toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-medium text-blue-100/70">credits</p>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full bg-[#62aef0]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 left-1/3 size-64 rounded-full bg-[#d6b6f6]/15 blur-3xl" />
    </section>
  );
}
