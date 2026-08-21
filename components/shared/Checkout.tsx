"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.actions";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  featured = false,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
  featured?: boolean;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "bg-green-100 text-green-900",
      });
    }

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "bg-red-100 text-red-900",
      });
    }
  }, [toast]);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST" className="w-full">
      <Button
        type="submit"
        role="link"
        className={cn(
          "h-12 w-full rounded-full bg-[#17191c] px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(17,25,33,0.16)] transition duration-300 hover:bg-[#0876df] hover:shadow-[0_15px_32px_rgba(8,118,223,0.22)]",
          featured && "bg-[#0876df] hover:bg-[#0068c8]",
        )}
      >
        Buy {credits.toLocaleString()} credits
      </Button>
    </form>
  );
};

export default Checkout;
