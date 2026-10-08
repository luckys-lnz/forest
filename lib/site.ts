export const site = {
  name: "Forest",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Forest helps couples decide what to eat together. Tell it how you each feel, and it finds the meal in the middle, drawn from what thousands of couples actually loved.",
  currency: "USD",
  locale: "en-US",
  email: "hello@forest.food",
  /**
   * Forest is in beta. Community figures on the site come from a preview
   * dataset (lib/data/discoveries.ts). While this is true, every surface that
   * shows community numbers says so. Flip to false once figures come from
   * the live signals API.
   */
  previewData: true,
  freeShippingThreshold: 75,
  flatShipping: 8,
} as const;

export const nav = [
  { href: "/discover", label: "Discover" },
  { href: "/shop", label: "Shop" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;
