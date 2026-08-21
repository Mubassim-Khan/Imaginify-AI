import { Pencil } from "lucide-react";
import Link from "next/link";

import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { Button } from "@/components/ui/button";

type TransformationDetailActionsProps = {
  imageId: string;
};

export default function TransformationDetailActions({
  imageId,
}: TransformationDetailActionsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[22px] bg-white/55 p-4 shadow-[0_18px_45px_rgba(43,54,116,0.07)] ring-1 ring-inset ring-white/80 backdrop-blur-xl sm:flex-row">
      <Button
        asChild
        type="button"
        className="h-12 flex-1 rounded-full bg-[#0876df] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(8,118,223,0.2)] transition duration-300 hover:bg-[#0068c8]"
      >
        <Link href={`/transformations/${imageId}/update`}>
          <Pencil className="mr-2 size-4" aria-hidden="true" />
          Edit transformation
        </Link>
      </Button>
      <div className="flex-1">
        <DeleteConfirmation imageId={imageId} />
      </div>
    </div>
  );
}
