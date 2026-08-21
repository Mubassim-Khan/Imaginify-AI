import ScrollReveal from "@/components/motion/ScrollReveal";
import CircularTrustBadge from "./CircularTrustBadge";
import CompanyLogo from "./CompanyLogo";
import { trustedCompanies } from "./content";

export default function TrustedCompaniesSection() {
  const marqueeCompanies = [...trustedCompanies, ...trustedCompanies];

  return (
    <section className="overflow-hidden border-y border-[#ebe7e1] bg-white py-7 md:py-8">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6">
        <div className="grid items-center gap-4 md:grid-cols-[140px_1fr_140px]">
          <ScrollReveal direction="right">
            <CircularTrustBadge />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[1.2px] text-[#928c86]">
              Trusted by creative teams from
            </p>
          </ScrollReveal>

          <div aria-hidden="true" className="hidden md:block" />
        </div>

        <div className="mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
          <div className="flex w-max motion-safe:animate-[marquee_46s_linear_infinite] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-5">
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                aria-hidden={groupIndex === 1}
                className="flex shrink-0 items-center gap-14 pr-14 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 [&:nth-child(2)]:motion-reduce:hidden"
              >
                {marqueeCompanies.map((company, index) => (
                  <span
                    key={`${groupIndex}-${company}-${index}`}
                    className="flex shrink-0 items-center gap-2.5 text-lg font-bold tracking-tight text-[#292725] transition-opacity hover:opacity-60"
                  >
                    <CompanyLogo name={company} />
                    {company}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
