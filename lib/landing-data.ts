export type PricingAccent = "muted" | "member" | "vip";

export type PricingTierData = {
  tier: string;
  badge?: string;
  pricePrimary: string;
  priceSecondary?: string;
  valueLine: string;
  savingsLine?: string;
  features: string[];
  ctaLabel: string;
  accent: PricingAccent;
  emphasized?: boolean;
};

export const pricingTiers: PricingTierData[] = [
  {
    tier: "Public",
    pricePrimary: "$24.99",
    priceSecondary: "per drop",
    valueLine: "If it’s still available",
    features: [
      "Access after members",
      "Limited inventory only",
      "No member pricing",
      "No guaranteed box",
    ],
    ctaLabel: "Buy Public Drop",
    accent: "muted",
  },
  {
    tier: "Member",
    badge: "Best entry point",
    pricePrimary: "$1 first month",
    priceSecondary: "then $4.99/month",
    valueLine: "Get drops for $19.99",
    savingsLine: "Save $5 per drop",
    features: [
      "Early access before public",
      "Save instantly on every drop",
      "Member-only drop alerts",
      "Better shot at limited boxes",
    ],
    ctaLabel: "Become a Member",
    accent: "member",
    emphasized: true,
  },
  {
    tier: "VIP",
    badge: "Never miss a drop",
    pricePrimary: "$1 first month",
    priceSecondary: "then $12.99/month",
    valueLine: "Get drops for $17",
    savingsLine: "Save $7.99 per drop",
    features: [
      "Guaranteed access to drops",
      "First priority on limited releases",
      "VIP-only perks",
      "Future event invites",
    ],
    ctaLabel: "Go VIP",
    accent: "vip",
    emphasized: true,
  },
];
