import { boxes } from "./boxes";
import { gifts } from "./gifts";
import { pantry } from "./pantry";
import type { ProductSlug } from "./slugs";
import { table } from "./table";
import type { Product } from "./types";

export * from "./availability";
export * from "./types";
export { productSlugs, type ProductSlug } from "./slugs";

export const products: readonly Product[] = [...boxes, ...pantry, ...table, ...gifts];

const bySlug = new Map<string, Product>(products.map((p) => [p.slug, p]));

/** Accepts any string (e.g. a route param) and narrows to a known product. */
export function getProduct(slug: ProductSlug | (string & {})): Product | undefined {
  return bySlug.get(slug);
}

/** For slugs known at compile time: fails loudly if the catalog and code drift apart. */
export function requireProduct(slug: ProductSlug): Product {
  const p = bySlug.get(slug);
  if (!p) throw new Error(`Product "${slug}" is declared in slugs.ts but missing from the catalog.`);
  return p;
}
