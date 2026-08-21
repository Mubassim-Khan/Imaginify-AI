"use client";

import { useState } from "react";

import ScrollReveal from "@/components/motion/ScrollReveal";
import BillingToggle from "./BillingToggle";
import PricingCard from "./PricingCard";
import { pricingPlans } from "./pricingPlans";
import SectionHeading from "./SectionHeading";

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-[1180px] scroll-mt-24 px-5 py-28 sm:px-6 sm:py-32">
      <SectionHeading
        eyebrow="Simple pricing"
        title={
          <>
            More creative momentum.
            <br />
            No surprise costs.
          </>
        }
        description="Choose a plan that fits the way you create. Upgrade, downgrade, or cancel whenever you need."
        className="mb-8"
      />

      <ScrollReveal delay={80} className="mb-11">
        <BillingToggle yearly={yearly} onChange={setYearly} />
      </ScrollReveal>

      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {pricingPlans.map((plan, index) => (
          <ScrollReveal key={plan.name} delay={100 + index * 90}>
            <PricingCard plan={plan} yearly={yearly} />
          </ScrollReveal>
        ))}
      </div>

      <p className="mt-6 text-center text-[10px] text-[#8b857f]">
        All plans include 20 free credits. No credit card required to start.
      </p>
    </section>
  );
}
