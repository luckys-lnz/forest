import { isCartLines, resolveLines, totals, type CartTotals, type ResolvedLine } from "./cart";
import { err, ok, type FieldErrors, type Result } from "./types";
import { EMAIL_HINT, isEmail } from "./validation";

export type CheckoutDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  note?: string;
  /** Required when the order contains a gift card. */
  giftEmail?: string;
};

export type CheckoutErrors = FieldErrors<CheckoutDetails>;

export type PricedOrder = {
  readonly lines: ResolvedLine[];
  readonly totals: CartTotals;
  readonly hasGift: boolean;
};

export function validateCheckout(d: CheckoutDetails, opts: { physical: boolean; hasGift: boolean }): CheckoutErrors {
  const e: CheckoutErrors = {};
  if (!isEmail(d.email)) e.email = EMAIL_HINT;
  if (!d.name?.trim()) e.name = "Enter the name for the order.";
  if (opts.physical) {
    if (!d.address?.trim()) e.address = "Enter the street address.";
    if (!d.city?.trim()) e.city = "Enter the town or city.";
    if (!d.postcode?.trim()) e.postcode = "Enter the postcode or ZIP.";
    if (!d.country?.trim()) e.country = "Choose a country.";
  }
  if (opts.hasGift && !isEmail(d.giftEmail))
    e.giftEmail = "Enter the email address the gift card should go to.";
  if ((d.note?.length ?? 0) > 300) e.note = "Keep delivery notes under 300 characters.";
  return e;
}

/**
 * Re-price a cart on the server from the catalog. Client prices are never
 * trusted; sold-out and unknown items are reported back, not silently charged.
 */
export function priceOrder(items: unknown): Result<PricedOrder> {
  if (!isCartLines(items) || items.length === 0) return err("Your cart is empty.");
  const lines = resolveLines(items);
  const problems = lines
    .filter((l) => !l.available || l.qty > l.maxQty)
    .map((l) => `${l.product.name} (${l.variant.label}) ${l.available ? `only has ${l.maxQty} left` : "has sold out"}.`);
  if (problems.length) return err(problems.join(" "));
  return ok({ lines, totals: totals(lines), hasGift: lines.some((l) => l.variant.stock === null) });
}

export const countries = ["United States", "United Kingdom", "Canada", "Ireland", "Portugal", "Ghana"] as const;
