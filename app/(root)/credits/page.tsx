import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import CreditBalanceCard from "@/components/credits/CreditBalanceCard";
import CreditPackCard from "@/components/credits/CreditPackCard";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";

const Credits = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  return (
    <div className="space-y-10 pb-10">
      <CreditBalanceCard balance={user.creditBalance} />

      <section aria-labelledby="credit-packs-title">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0876df]">
              One-time purchase
            </p>
            <h2
              id="credit-packs-title"
              className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#17191c]"
            >
              Choose a credit pack
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#696d73]">
              No recurring subscription. Buy only when your workspace needs
              more transformations.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/60 px-3.5 py-2 text-xs font-medium text-[#585d63] ring-1 ring-inset ring-white/80 backdrop-blur-xl">
            <ShieldCheck className="size-4 text-[#0876df]" aria-hidden="true" />
            Secure checkout with Stripe
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <CreditPackCard
              key={plan.name}
              plan={plan}
              buyerId={user._id}
              featured={index === 1}
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Credits;
