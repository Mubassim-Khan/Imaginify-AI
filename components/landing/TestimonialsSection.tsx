import { Quote } from "lucide-react";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { testimonials } from "./content";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  return (
    <section id="stories" className="relative scroll-mt-24 overflow-hidden bg-[#213183] py-28 text-white">
      <div className="pointer-events-none absolute -left-32 top-1/2 size-80 -translate-y-1/2 rounded-full bg-[#0876df]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-10 size-72 rounded-full bg-[#765db6]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-6">
        <SectionHeading
          eyebrow="Customer stories"
          title={
            <>
              Creative teams move faster
              <br />
              with Imaginify.
            </>
          }
          className="mb-14"
          inverted
        />

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} delay={index * 100}>
              <article className="group flex min-h-80 flex-col rounded-[20px] border border-white/15 bg-white/[.07] p-7 shadow-inner backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[.1]">
                <Quote
                  className="fill-[#74bdfc]/20 text-[#74bdfc] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                  size={22}
                />
                <p className="my-6 flex-1 text-base leading-7 text-[#f5f7ff]">
                  “{item.quote}”
                </p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className={`grid size-10 place-items-center rounded-full text-[10px] font-bold ${item.color}`}>
                    {item.initials}
                  </span>
                  <div>
                    <strong className="block text-xs">{item.name}</strong>
                    <small className="text-[10px] text-[#bcc4e4]">
                      {item.role}
                    </small>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
