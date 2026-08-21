"use client";

import { ArrowRight, Coins, X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InsufficientCreditsModal = () => {
  const router = useRouter();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="overflow-hidden rounded-[28px] border-white/70 bg-white/88 p-0 shadow-[0_30px_90px_rgba(17,25,33,0.2)] backdrop-blur-2xl">
        <div className="relative bg-gradient-to-br from-[#172963] to-[#0876df] px-6 py-8 text-white sm:px-8">
          <AlertDialogCancel className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border-white/10 bg-white/10 p-0 text-white shadow-none hover:bg-white/20 hover:text-white">
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
          <span className="grid size-12 place-items-center rounded-2xl bg-white/12 ring-1 ring-inset ring-white/15">
            <Coins className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100/75">
            Credit balance
          </p>
          <AlertDialogTitle className="mt-2 text-2xl font-bold tracking-[-0.035em] text-white">
            You need more credits
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-3 max-w-md text-sm leading-6 text-blue-100/75">
            Each new preview uses one credit. Add a one-time pack to continue
            creating transformations.
          </AlertDialogDescription>
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-48 rounded-full bg-[#62aef0]/25 blur-3xl" />
        </div>

        <AlertDialogFooter className="gap-3 p-5 sm:p-6">
          <AlertDialogCancel className="mt-0 h-11 rounded-full border-white/80 bg-black/[0.04] px-5 text-sm font-semibold text-[#555a60] hover:bg-black/[0.07]">
            Maybe later
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-11 rounded-full bg-[#0876df] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(8,118,223,0.2)] hover:bg-[#0068c8]"
            onClick={() => router.push("/credits")}
          >
            Choose a credit pack
            <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
