export const siteConfig = {
  name: "Sunha Care Foundation",
  description:
    "Sunha Care Foundation supports underserved families with education, food, healthcare, emergency relief, and volunteer-driven community action.",
  url: "https://sunhacare.org",
  defaultLocale: "bn",
  locales: ["bn", "en"] as const,
} as const;

export type AppLocale = (typeof siteConfig.locales)[number];
