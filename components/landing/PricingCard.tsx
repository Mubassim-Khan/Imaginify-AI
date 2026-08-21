import { ArrowRight, Check, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedPrice from "./AnimatedPrice";
import GlassAction from "./GlassAction";
import type { PricingPlan } from "./pricingPlans";

type PricingCardProps = {
  plan: PricingPlan;
  yearly: boolean;
};

export default function PricingCard({ plan, yearly }: PricingCardProps) {
  const displayedPrice = yearly
    ? Math.round(plan.monthlyPrice * 0.8)
    : plan.monthlyPrice;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[24px] border p-8 shadow-[0_20px_50px_#332d2510] transition duration-500 hover:-translate-y-1",
        plan.featured
          ? "border-[#8fc5f5] bg-gradient-to-br from-[#f5fbff] to-[#e9f5ff] shadow-[0_25px_60px_#0876df1b]"
          : "border-[#dfdbd5] bg-gradient-to-br from-white to-[#f9f7f3] hover:shadow-[0_25px_60px_#332d2518]",
      )}
    >
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0876df] px-3 py-2 text-[9px] font-bold uppercase tracking-wide text-white">
          <Sparkles size={12} /> Most popular
        </div>
      )}
      <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
      <p className="mt-2 min-h-16 text-xs leading-5 text-[#716b65]">
        {plan.description}
      </p>
      <div className="mt-5 flex items-start">
        <span className="mt-2 text-xl font-semibold">$</span>
        <strong
          className="text-6xl leading-none tracking-[-3px]"
          aria-label={`${displayedPrice} dollars per month`}
        >
          <AnimatedPrice value={displayedPrice} />
        </strong>
        <small className="mb-2 ml-2 self-end text-[11px] text-[#807a74]">
          / month
        </small>
      </div>
      <p className="mt-2 text-[9px] text-[#9a948e]">
        {yearly ? `$${displayedPrice * 12} billed yearly` : "Billed monthly"}
      </p>
      <div
        className={cn(
          "my-5 rounded-lg px-3 py-2.5 text-[10px] font-semibold",
          plan.featured
            ? "bg-[#dceeff] text-[#0b65b9]"
            : "bg-[#f0eeea] text-[#4f4a45]",
        )}
      >
        {plan.credits}
      </div>
      <ul className="mb-7 grid gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-[11px] text-[#514d49]">
            <Check className="rounded-full bg-[#e4f2fe] p-[3px] text-[#0876df]" size={15} />
            {feature}
          </li>
        ))}
      </ul>
      <GlassAction
        href="/sign-up"
        variant={plan.featured ? "primary" : "glass"}
        className="mt-auto w-full text-xs font-bold"
      >
        Start with {plan.name} <ArrowRight size={15} />
      </GlassAction>
    </article>
  );
}
