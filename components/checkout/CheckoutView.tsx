"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useForm } from "@/components/forms/useForm";
import { Button, ButtonLink } from "@/components/ui/Button";
import { validateCheckout, type CheckoutDetails } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { CheckoutFields } from "./CheckoutFields";
import { OrderConfirmed, type ConfirmedOrder } from "./OrderConfirmed";
import { OrderSummary } from "./OrderSummary";
import styles from "./CheckoutView.module.css";

const blank: CheckoutDetails = { email: "", name: "", address: "", city: "", postcode: "", country: "", note: "", giftEmail: "" };

export function CheckoutView() {
  const { lines, totals, ready, clear } = useCart();
  const purchasable = lines.filter((l) => l.available);
  const gift = purchasable.some((l) => l.variant.stock === null);

  const form = useForm<CheckoutDetails, { order: ConfirmedOrder }>({
    initial: blank,
    validate: (d) => validateCheckout(d, { physical: totals.physical, hasGift: gift }),
    endpoint: "/api/checkout",
    body: (details) => ({ details, items: purchasable.map(({ slug, variantId, qty }) => ({ slug, variantId, qty })) }),
    onDone: () => {
      clear();
      window.scrollTo({ top: 0 });
    },
  });

  if (form.status.kind === "done") return <OrderConfirmed order={form.status.data.order} />;
  if (!ready) return <p className={styles.muted}>Loading your order…</p>;
  if (purchasable.length === 0) {
    return (
      <div className={styles.empty}>
        <p>There&apos;s nothing to check out yet.</p>
        <ButtonLink href="/shop" variant="inverse">
          Browse the shop
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <form ref={form.formRef} className={styles.form} onSubmit={form.submit} noValidate>
        <CheckoutFields field={form.field} physical={totals.physical} gift={gift} />
        <div className={styles.pay}>
          <p className={styles.preview}>
            Forest is in preview: placing an order shows you the full confirmation, but no card is taken and nothing ships.
          </p>
          {form.status.kind === "error" && (
            <p className={styles.error} role="alert">
              {form.status.message}
            </p>
          )}
          <Button type="submit" size="lg" block loading={form.status.kind === "sending"}>
            Place order, {formatPrice(totals.total)}
          </Button>
        </div>
      </form>
      <OrderSummary lines={purchasable} totals={totals} />
    </div>
  );
}
