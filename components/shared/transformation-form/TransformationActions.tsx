import { Button } from "@/components/ui/button";
import { Coins, Save, WandSparkles } from "lucide-react";

type TransformationActionsProps = {
  action: "Add" | "Update";
  canSave: boolean;
  canTransform: boolean;
  isSubmitting: boolean;
  isTransforming: boolean;
  onTransform: () => void;
};

export default function TransformationActions({
  action,
  canSave,
  canTransform,
  isSubmitting,
  isTransforming,
  onTransform,
}: TransformationActionsProps) {
  return (
    <footer className="flex flex-col gap-4 rounded-[24px] bg-white/55 p-4 shadow-[0_18px_45px_rgba(43,54,116,0.07)] ring-1 ring-inset ring-white/80 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-xs font-medium text-[#777c83]">
        <span className="grid size-8 place-items-center rounded-xl bg-[#eaf5ff] text-[#0876df]">
          <Coins className="size-4" aria-hidden="true" />
        </span>
        Previewing a new transformation uses 1 credit.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="h-12 rounded-full bg-[#0876df] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(8,118,223,0.2)] transition duration-300 hover:bg-[#0068c8] sm:min-w-52"
          disabled={isTransforming || !canTransform}
          type="button"
          onClick={onTransform}
        >
          <WandSparkles className="mr-2 size-4" aria-hidden="true" />
          {isTransforming ? "Creating preview..." : "Apply transformation"}
        </Button>
        <Button
          className="h-12 rounded-full bg-[#17191c] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(17,25,33,0.16)] transition duration-300 hover:bg-[#2b3036] sm:min-w-44"
          disabled={isSubmitting || !canSave}
          type="submit"
        >
          <Save className="mr-2 size-4" aria-hidden="true" />
          {isSubmitting
            ? "Saving..."
            : action === "Update"
              ? "Save changes"
              : "Save to studio"}
        </Button>
      </div>
    </footer>
  );
}
