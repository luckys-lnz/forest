import type { Cents } from "../../types";
import type { DiscoveryId } from "../discoveries";
import type { ProductSlug } from "./slugs";

export const categories = {
  boxes: { label: "Tasting boxes", line: "Dinners for two, chosen by the community" },
  pantry: { label: "Pantry", line: "The jars couples kept asking about" },
  table: { label: "For the table", line: "Things that make sharing easier" },
  gifts: { label: "Gifts", line: "For two people you like" },
} as const satisfies Record<string, { label: string; line: string }>;
export type CategoryId = keyof typeof categories;
export const categoryIds = Object.keys(categories) as CategoryId[];

export const collections = {
  "date-night": { label: "Date night in", line: "Everything for a night you'd usually book a table for." },
  "first-try": { label: "First things to try", line: "Where couples new to Forest usually start." },
  gifting: { label: "For gifting", line: "Arrives wrapped, with a note from you." },
} as const satisfies Record<string, { label: string; line: string }>;
export type CollectionId = keyof typeof collections;

export type ArtKind = "box" | "jar" | "deck" | "bowls" | "rest" | "card";

export type Variant = {
  readonly id: string;
  readonly label: string;
  readonly price: Cents;
  /** null = not stock-limited (digital) */
  readonly stock: number | null;
};

export type Product = {
  readonly slug: ProductSlug;
  readonly name: string;
  readonly category: CategoryId;
  readonly collections: readonly CollectionId[];
  readonly tagline: string;
  readonly description: readonly string[];
  readonly details: readonly { readonly label: string; readonly value: string }[];
  /** At least one variant, enforced by the type. */
  readonly variants: readonly [Variant, ...Variant[]];
  /** ISO date if sold out with a known restock date */
  readonly restock?: string;
  readonly art: { readonly kind: ArtKind; readonly surface: string; readonly accent: string; readonly label?: string };
  /** Discovery ids this product brings home. Checked against the dataset. */
  readonly pairsWith: readonly DiscoveryId[];
  readonly featured?: boolean;
  /** Days since it was added, for "new" sorting. */
  readonly addedDaysAgo: number;
};

/** Discriminated union: each state carries only what it needs. */
export type Availability =
  | { readonly state: "in-stock" }
  | { readonly state: "low"; readonly left: number }
  | { readonly state: "sold-out"; readonly restock?: string }
  | { readonly state: "digital" };
