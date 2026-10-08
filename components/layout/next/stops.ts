import type { FoodKind } from "@/components/fun/food/drawings";
import { getArticle } from "@/lib/data/articles";
import { requireProduct } from "@/lib/data/products";

export type Stop = {
  readonly href: string;
  readonly title: string;
  readonly line: string;
  readonly food: FoodKind;
  readonly color: string;
};

const article = (slug: string) => {
  const a = getArticle(slug);
  if (!a) throw new Error(`Next stop points at a missing article: ${slug}`);
  return a;
};
const box = requireProduct("tasting-box-for-two");
const middle = article("the-middle-of-the-menu");
const stars = article("why-pip-doesnt-give-stars");

/** Every place a "Where to next?" strip can send someone. */
const STOPS = {
  discover: {
    href: "/discover",
    title: "Find tonight's meal",
    line: "Two moods in, one dinner out.",
    food: "noodles",
    color: "var(--butter)",
  },
  shop: { href: "/shop", title: "Visit the shop", line: "Boxes, pantry and things for the table.", food: "toast", color: "var(--sky)" },
  box: {
    href: `/shop/${box.slug}`,
    title: box.name,
    line: "This month's three favourite dinners, measured for two.",
    food: "dumpling",
    color: "var(--mint)",
  },
  journal: { href: "/journal", title: "Read the Journal", line: "What couples ate, and why it worked.", food: "egg", color: "var(--bubble)" },
  howItWorks: { href: `/journal/${middle.slug}`, title: middle.title, line: "How Forest finds the middle.", food: "pizza", color: "var(--butter)" },
  aboutPip: { href: `/journal/${stars.slug}`, title: stars.title, line: "Meet the seed behind the picks.", food: "sushi", color: "var(--sky)" },
  contact: { href: "/contact", title: "Talk to a person", line: "Questions, orders or partnerships.", food: "chili", color: "var(--bubble)" },
} as const satisfies Record<string, Stop>;

export type StopId = keyof typeof STOPS;

/** Which pages suggest what. Each page gets three onward routes, never itself. */
export const NEXT = {
  discover: ["box", "howItWorks", "shop"],
  contact: ["discover", "journal", "aboutPip"],
  cart: ["discover", "box", "journal"],
  checkout: ["shop", "discover", "contact"],
} as const satisfies Record<string, readonly [StopId, StopId, StopId]>;

export type NextFrom = keyof typeof NEXT;

export const stopsFor = (from: NextFrom): readonly Stop[] => NEXT[from].map((id) => STOPS[id]);
