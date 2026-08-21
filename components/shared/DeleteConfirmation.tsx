"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteImage } from "@/lib/actions/image.actions";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="h-12 w-full rounded-full border border-red-200/80 bg-red-50/70 px-6 text-sm font-semibold text-red-600 shadow-none transition hover:bg-red-100 hover:text-red-700"
          variant="outline"
        >
          Delete image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-8 rounded-[26px] border-white/70 bg-white/85 shadow-[0_30px_90px_rgba(17,25,33,0.2)] backdrop-blur-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold tracking-[-0.025em] text-[#25282c]">
            Delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm leading-6 text-[#696d73]">
            This action permanently removes the image and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Keep image</AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full border-0 bg-red-600 px-5 text-white hover:bg-red-700"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }>
            {isPending ? "Deleting..." : "Delete permanently"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
