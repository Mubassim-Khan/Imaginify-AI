"use client";

import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const currentQuery = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(() => currentQuery);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (normalizedQuery === currentQuery) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParamsString);

      if (normalizedQuery) {
        params.set("query", normalizedQuery);
      } else {
        params.delete("query");
      }
      params.delete("page");

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [currentQuery, pathname, query, router, searchParamsString]);

  return (
    <div className="group flex h-12 w-full items-center gap-2.5 rounded-full bg-white/65 px-4 shadow-sm ring-1 ring-inset ring-black/[.065] backdrop-blur-xl transition focus-within:bg-white/90 focus-within:ring-2 focus-within:ring-[#0876df]/25 md:max-w-[360px]">
      <SearchIcon
        aria-hidden="true"
        className="shrink-0 text-[#77716a] transition group-focus-within:text-[#0876df]"
        size={18}
      />

      <Input
        type="search"
        value={query}
        aria-label="Search your creations"
        className="h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-sm font-medium text-[#24211e] shadow-none outline-none placeholder:text-[#918b84] focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search your creations"
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQuery("")}
          className="grid size-7 shrink-0 place-items-center rounded-full text-[#77716a] transition hover:bg-[#edf6ff] hover:text-[#0876df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0876df]/35"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
