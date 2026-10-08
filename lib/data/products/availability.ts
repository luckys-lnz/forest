import { cents, type Cents } from "../../types";
import type { Availability, Product, Variant } from "./types";

export const LOW_STOCK = 5;

export function variantAvailability(product: Product, variant: Variant): Availability {
  if (variant.stock === null) return { state: "digital" };
  if (variant.stock <= 0) return { state: "sold-out", restock: product.restock };
  if (variant.stock <= LOW_STOCK) return { state: "low", left: variant.stock };
  return { state: "in-stock" };
}

const rank: Record<Availability["state"], number> = { "in-stock": 0, digital: 0, low: 1, "sold-out": 2 };

/** Product-level availability: the best state across its variants. */
export function productAvailability(product: Product): Availability {
  return product.variants
    .map((v) => variantAvailability(product, v))
    .reduce((best, a) => (rank[a.state] < rank[best.state] ? a : best));
}

export const isSoldOut = (p: Product): boolean => productAvailability(p).state === "sold-out";

export function fromPrice(product: Product): Cents {
  return cents(Math.min(...product.variants.map((v) => v.price)));
}

export function hasPriceRange(product: Product): boolean {
  return new Set(product.variants.map((v) => v.price)).size > 1;
}
