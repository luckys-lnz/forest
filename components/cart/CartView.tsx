"use client";

import { lineKey } from "@/lib/cart";
import { CartEmpty } from "./CartEmpty";
import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";
import { CartSummary } from "./CartSummary";
import styles from "./CartView.module.css";

export function CartView() {
  const { lines, totals, ready } = useCart();

  if (!ready) {
    return (
      <div className={styles.loading} aria-busy="true" aria-label="Loading your cart">
        <span />
        <span />
      </div>
    );
  }
  if (lines.length === 0) return <CartEmpty />;

  return (
    <div className={styles.layout}>
      <section aria-labelledby="cart-items">
        <h2 id="cart-items" className="sr-only">
          Items
        </h2>
        <ul role="list">
          {lines.map((l) => (
            <CartLineItem key={lineKey(l)} line={l} />
          ))}
        </ul>
      </section>
      <CartSummary totals={totals} hasUnavailable={lines.some((l) => !l.available)} />
    </div>
  );
}
