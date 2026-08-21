"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Images, Sparkles } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { getStudioTool } from "@/components/dashboard/studio/transformationTools";
import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";

import { Search } from "./Search";

export const Collection = ({
  description,
  emptyDescription = "Start with one of the creative tools to add your first image.",
  emptyTitle = "No creations yet",
  hasSearch = false,
  heading = "Recent edits",
  images = [],
  totalPages = 1,
  page,
}: {
  description?: string;
  emptyDescription?: string;
  emptyTitle?: string;
  heading?: string;
  images: IImage[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasActiveSearch = Boolean(searchParams.get("query")?.trim());

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[#0876df]">
            Creative library
          </p>
          <h2 className="mt-2 text-[28px] font-bold leading-[1.05] tracking-[-1.1px] text-[#171513] md:text-[34px]">
            {heading}
          </h2>
          {description && (
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#6b6660]">
              {description}
            </p>
          )}
        </div>
        {hasSearch && <Search key={searchParams.get("query") ?? ""} />}
      </div>

      {images.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <Card image={image} key={image._id.toString()} />
          ))}
        </ul>
      ) : (
        <div className="flex min-h-72 w-full flex-col items-center justify-center rounded-[20px] bg-white/35 px-6 text-center ring-1 ring-inset ring-black/[.055]">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf5ff] text-[#0876df] shadow-[0_10px_30px_rgba(8,118,223,.12)]">
            {hasActiveSearch ? <Sparkles size={21} /> : <Images size={21} />}
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-[-.3px] text-[#1c1917]">
            {hasActiveSearch ? "No matching creations" : emptyTitle}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#716c66]">
            {hasActiveSearch
              ? "Try a different title or clear the search to see your full workspace."
              : emptyDescription}
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full items-center justify-between gap-3">
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                disabled={Number(page) <= 1}
                className="h-11 rounded-full border-0 bg-white/65 px-4 text-sm font-semibold text-[#383430] shadow-sm ring-1 ring-inset ring-black/[.06] backdrop-blur-xl transition hover:bg-white hover:text-[#0876df]"
                onClick={() => onPageChange("prev")}
              >
                <ArrowLeft size={15} />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            </PaginationItem>

            <PaginationItem>
              <p className="rounded-full bg-white/50 px-4 py-2 text-xs font-semibold text-[#68625c] ring-1 ring-inset ring-black/[.05]">
                Page {page} of {totalPages}
              </p>
            </PaginationItem>

            <PaginationItem>
              <Button
                type="button"
                className="h-11 rounded-full bg-[#0876df] px-4 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(8,118,223,.22)] transition hover:bg-[#0068c7]"
                onClick={() => onPageChange("next")}
                disabled={Number(page) >= totalPages}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={15} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

const Card = ({ image }: { image: IImage }) => {
  const tool = getStudioTool(image.transformationType);
  const Icon = tool?.icon ?? Sparkles;
  const savedAt = image.updatedAt
    ? new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
        year: "numeric",
      }).format(new Date(image.updatedAt))
    : "Saved creation";

  return (
    <li className="h-full">
      <Link
        href={`/transformations/${image._id}`}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white/[.67] p-3.5 shadow-[0_14px_35px_rgba(46,40,34,.07)] ring-1 ring-inset ring-black/[.055] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_22px_45px_rgba(34,50,76,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0876df]/50"
      >
        <div className="relative overflow-hidden rounded-[14px] bg-[#eeece8]">
          <CldImage
            src={image.publicId}
            alt={image.title}
            width={image.width}
            height={image.height}
            {...image.config}
            loading="lazy"
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1.5 text-[10px] font-semibold text-[#185f9f] shadow-sm ring-1 ring-inset ring-white/60 backdrop-blur-xl">
            <Icon size={12} />
            {tool?.label ?? image.transformationType}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 px-1 pb-1 pt-4">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-base font-semibold tracking-[-.25px] text-[#1b1917]">
              {image.title}
            </h3>
            <p className="mt-1 text-xs text-[#7a746e]">{savedAt}</p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#edf6ff] text-[#0876df] transition duration-300 group-hover:bg-[#0876df] group-hover:text-white">
            <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </li>
  );
};
