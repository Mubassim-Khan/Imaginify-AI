import { Check, CircleOff, PackageOpen, Sparkles } from "lucide-react";

import Checkout from "@/components/shared/Checkout";
import { Button } from "@/components/ui/button";
import { plans } from "@/constants";
import { cn } from "@/lib/utils";

type CreditPlan = (typeof plans)[number];

type CreditPackCardProps = {
  buyerId: string;
  featured?: boolean;
  plan: CreditPlan;
};

const formatPkr = (amount: number) =>
  `PKR ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amount)}`;

export default function CreditPackCard({
  buyerId,
  featured = false,
  plan,
}: CreditPackCardProps) {
  const isIncluded = plan.price === 0;

  return (
    <li
      className={cn(
        "relative flex min-h-full flex-col overflow-hidden rounded-[26px] bg-white/65 p-6 shadow-[0_22px_60px_rgba(43,54,116,0.09)] ring-1 ring-inset ring-white/70 backdrop-blur-2xl sm:p-7",
        featured &&
          "bg-gradient-to-b from-[#eef7ff]/90 to-white/70 shadow-[0_26px_70px_rgba(8,118,223,0.16)] ring-[#8fcaff]/45",
      )}
    >
      {featured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[#0876df] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(8,118,223,0.25)]">
          <Sparkles className="size-3" aria-hidden="true" />
          Most popular
        </span>
      )}

      <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf5ff] text-[#0876df] ring-1 ring-inset ring-white">
        <PackageOpen className="size-5" aria-hidden="true" />
      </span>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[#0876df]">{plan.name}</p>
        <p className="mt-2 text-4xl font-bold tracking-[-0.045em] text-[#17191c]">
          {isIncluded ? "Included" : formatPkr(plan.price)}
        </p>
        <p className="mt-2 text-sm text-[#696d73]">
          {plan.credits.toLocaleString()} one-time credits
        </p>
      </div>

      <ul className="my-7 flex flex-1 flex-col gap-3.5">
        {plan.inclusions.map((inclusion) => (
          <li
            key={`${plan.name}-${inclusion.label}`}
            className={cn(
              "flex items-start gap-3 text-sm leading-5",
              inclusion.isIncluded ? "text-[#34373c]" : "text-[#999da3]",
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                inclusion.isIncluded
                  ? "bg-[#e9f7ef] text-[#198754]"
                  : "bg-black/[0.04] text-[#a0a4aa]",
              )}
            >
              {inclusion.isIncluded ? (
                <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
              ) : (
                <CircleOff className="size-3" aria-hidden="true" />
              )}
            </span>
            {inclusion.label}
          </li>
        ))}
      </ul>

      {isIncluded ? (
        <Button
          type="button"
          disabled
          className="h-12 w-full rounded-full bg-black/[0.05] text-sm font-semibold text-[#696d73] disabled:opacity-100"
        >
          Included with your account
        </Button>
      ) : (
        <Checkout
          plan={plan.name}
          amount={plan.price}
          credits={plan.credits}
          buyerId={buyerId}
          featured={featured}
        />
      )}
    </li>
  );
}
