import { ArrowRight } from "lucide-react";

import BrandLogo from "@/components/brand/BrandLogo";
import { footerGroups } from "./content";

export default function LandingFooter() {
  return (
    <footer className="bg-[#182044] pb-6 pt-20 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_.65fr_.65fr_.65fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo inverted />
          <p className="mt-4 max-w-[250px] text-xs leading-5 text-[#b7bfde]">
            AI-powered image editing for work that deserves to be seen.
          </p>
          <span className="mt-5 flex items-center gap-2 text-[9px] text-[#aeb8da]">
            <i className="size-2 rounded-full bg-[#5bd39a] shadow-[0_0_0_4px_#5bd39a20]" />
            All systems operational
          </span>
        </div>

        {footerGroups.map(({ title, links }) => (
          <div key={title} className="grid content-start gap-3">
            <strong className="mb-1 text-xs">{title}</strong>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="w-max text-[10px] text-[#aeb8da] transition hover:translate-x-0.5 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        ))}

        <div className="sm:col-span-2 lg:col-span-1">
          <strong className="text-xs">Creative notes, occasionally.</strong>
          <p className="my-3 text-[10px] leading-4 text-[#aeb8da]">
            Product updates and practical AI design ideas.
          </p>
          <form className="flex rounded-full border border-white/15 bg-white/[.05] p-1 backdrop-blur-xl">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              className="min-w-0 flex-1 bg-transparent px-3 text-[10px] outline-none placeholder:text-[#8792b9]"
              placeholder="you@company.com"
            />
            <button
              type="submit"
              aria-label="Subscribe to creative notes"
              className="grid size-9 place-items-center rounded-full bg-white text-[#0876df] transition hover:scale-105 active:scale-95"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1180px] flex-col items-center justify-between gap-4 border-t border-white/10 px-5 pt-6 text-[9px] text-[#8590b8] sm:flex-row sm:px-6">
        <span>© 2026 Imaginify. All rights reserved.</span>
        <div className="flex gap-5">
          <a className="transition hover:text-white" href="#">Privacy</a>
          <a className="transition hover:text-white" href="#">Terms</a>
          <a className="transition hover:text-white" href="#">Cookies</a>
        </div>
        <span>Made for creative momentum.</span>
      </div>
    </footer>
  );
}
