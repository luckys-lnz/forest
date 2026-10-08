import { getProduct, variantAvailability, type Product, type Variant } from "../data/products";
import { site } from "../site";
import { cents, sumCents, type Cents } from "../types";

export type CartLine = { slug: string; variantId: string; qty: number };

export type ResolvedLine = CartLine & {
  product: Product;
  variant: Variant;
  lineTotal: Cents;
  maxQty: number;
  available: boolean;
};

export const MAX_PER_LINE = 10;

export function lineKey(l: Pick<CartLine, "slug" | "variantId">) {
  return `${l.slug}::${l.variantId}`;
}

export function maxQtyFor(variant: Variant) {
  return variant.stock === null ? MAX_PER_LINE : Math.min(variant.stock, MAX_PER_LINE);
}

/** Resolve stored lines against the catalog. Unknown products are dropped. */
export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  const out: ResolvedLine[] = [];
  for (const l of lines) {
    const product = getProduct(l.slug);
    const variant = product?.variants.find((v) => v.id === l.variantId);
    if (!product || !variant) continue;
    const available = variantAvailability(product, variant).state !== "sold-out";
    const maxQty = maxQtyFor(variant);
    out.push({ ...l, product, variant, maxQty, available, lineTotal: cents(variant.price * l.qty) });
  }
  return out;
}

export function totals(lines: ResolvedLine[]) {
  const purchasable = lines.filter((l) => l.available);
  const subtotal = sumCents(purchasable.map((l) => l.lineTotal));
  const physical = purchasable.some((l) => l.variant.stock !== null);
  const threshold = cents(site.freeShippingThreshold * 100);
  const shipping = cents(!physical || subtotal === 0 || subtotal >= threshold ? 0 : site.flatShipping * 100);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return {
    subtotal,
    shipping,
    total: sumCents([subtotal, shipping]),
    count,
    physical,
    toFreeShipping: cents(physical && subtotal < threshold ? threshold - subtotal : 0),
  };
}

export type CartTotals = ReturnType<typeof totals>;
