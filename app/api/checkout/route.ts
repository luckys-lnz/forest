import { NextResponse } from "next/server";
import { priceOrder, validateCheckout, type CheckoutDetails } from "@/lib/checkout";
import { readJson } from "@/lib/server/forward";
import { hasErrors } from "@/lib/types";

type Body = { items: unknown; details: CheckoutDetails };

/**
 * Checkout. CHECKOUT_MODE decides what happens after validation and
 * server-side pricing:
 *  - "preview" (default): returns a confirmation without taking payment. The
 *    UI says so plainly. Use until a payment provider is connected.
 *  - "live": create the provider's payment session here. Not wired yet, so
 *    it returns 503 and a misconfigured deploy can never pretend to charge.
 */
export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body.ok) return NextResponse.json({ error: body.error }, { status: 400 });

  const priced = priceOrder(body.value.items);
  if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 409 });
  const { lines, totals, hasGift } = priced.value;

  const details = (body.value.details ?? {}) as CheckoutDetails;
  const errors = validateCheckout(details, { physical: totals.physical, hasGift });
  if (hasErrors(errors)) return NextResponse.json({ error: "Check the highlighted fields.", errors }, { status: 422 });

  if ((process.env.CHECKOUT_MODE ?? "preview") === "live") {
    return NextResponse.json({ error: "Card payments aren't switched on yet. Nothing has been charged." }, { status: 503 });
  }

  return NextResponse.json({
    mode: "preview",
    order: {
      id: `FR-${Math.floor(10000 + Math.random() * 89999)}`,
      email: details.email.trim(),
      total: totals.total,
      items: lines.map((l) => ({
        name: l.product.name,
        variant: l.product.variants.length > 1 ? l.variant.label : null,
        qty: l.qty,
      })),
    },
  });
}
