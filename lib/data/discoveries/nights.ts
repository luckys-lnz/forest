import type { Discovery } from "./types";

/** Not a dish so much as an evening out. PREVIEW DATA: see ./types.ts. */
export const nights = [
  {
    id: "small-plates-and-a-bottle",
    name: "Small plates & a bottle",
    cuisine: "Mediterranean",
    blurb: "Cured meats, sharp cheese, bread, something grilled. Order three, share all of it.",
    image: { path: "photo-1703848937416-1c0e44cb1fb5", alt: "A plate of cured meat and cheese beside a glass of wine" },
    affinity: { cozy: 0.55, curious: 0.7, light: 0.6, fiery: 0.3, indulgent: 0.75, quick: 0.45 },
    settings: ["out"],
    price: 2,
    minutes: 75,
    vegetarian: false,
    signals: { couples: 2770, again: 0.9, split: 0.06 },
    weekly: [250, 262, 281, 279, 300, 318, 322, 340],
    pip: "The lowest disagreement rate of anything on Forest. Hard to fall out over shared plates.",
    product: "pair-bowls",
  },
  {
    id: "night-market-crawl",
    name: "A night market crawl",
    cuisine: "Street food",
    blurb: "Not one dish, a route. Five stalls, small portions, split everything.",
    image: { path: "photo-1552912470-ee2e96439539", alt: "A cook preparing street food at a night stall" },
    affinity: { cozy: 0.3, curious: 0.95, light: 0.4, fiery: 0.6, indulgent: 0.6, quick: 0.5 },
    settings: ["out"],
    price: 1,
    minutes: 90,
    vegetarian: false,
    signals: { couples: 1240, again: 0.94, split: 0.28 },
    weekly: [80, 95, 110, 131, 150, 162, 188, 214],
    pip: "Couples who share every stop rank this their favourite night out. Don't each get your own.",
    product: "night-market-box",
  },
] as const satisfies readonly Discovery[];
