import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import HeroSection from "@/components/landing/HeroSection";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingNavbar from "@/components/landing/LandingNavbar";
import PricingSection from "@/components/landing/PricingSection";
import ScrollExpandShowcase from "@/components/landing/ScrollExpandShowcase";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustedCompaniesSection from "@/components/landing/TrustedCompaniesSection";
import WorkflowSection from "@/components/landing/WorkflowSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbfaf8] text-[#11100f]">
      <LandingNavbar />
      <HeroSection />
      <ScrollExpandShowcase />
      <TrustedCompaniesSection />
      <FeaturesSection />
      <WorkflowSection />
      <PricingSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <LandingFooter />
    </main>
  );
}
