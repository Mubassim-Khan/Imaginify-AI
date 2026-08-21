export type PricingPlan = {
  name: string;
  monthlyPrice: number;
  description: string;
  credits: string;
  features: string[];
  featured?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Creator",
    monthlyPrice: 20,
    description: "For individual creators moving from idea to polished image.",
    credits: "500 AI credits / month",
    features: [
      "All transformation tools",
      "High-resolution exports",
      "Commercial usage",
      "30-day version history",
    ],
  },
  {
    name: "Studio",
    monthlyPrice: 60,
    description: "For creative teams producing consistently at higher volume.",
    credits: "2,000 AI credits / month",
    featured: true,
    features: [
      "Everything in Creator",
      "Up to 5 team members",
      "Shared brand presets",
      "Priority processing",
    ],
  },
  {
    name: "Business",
    monthlyPrice: 100,
    description: "For growing organizations with advanced creative workflows.",
    credits: "5,000 AI credits / month",
    features: [
      "Everything in Studio",
      "Up to 15 team members",
      "Central billing and roles",
      "Priority support",
    ],
  },
];
