"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import type { CartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { Totals } from "./Totals";
import styles from "./CartSummary.module.css";

/** Totals, progress toward free delivery, and the way forward. */
export function CartSummary({ totals, hasUnavailable }: { totals: CartTotals; hasUnavailable: boolean }) {
  const progress = totals.physical ? Math.min(1, totals.subtotal / (site.freeShippingThreshold * 100)) : 1;
  const empty = totals.subtotal === 0;
  const cta = useRef<HTMLAnchorElement>(null);
  return (
    <aside className={styles.summary} aria-labelledby="summary-title">
      <h2 id="summary-title" className={styles.title}>
        Summary
      </h2>
      {totals.physical && (
        <div className={styles.ship}>
          <p>{totals.toFreeShipping > 0 ? `${formatPrice(totals.toFreeShipping)} away from free delivery.` : "Delivery is on us."}</p>
          <span className={styles.bar} aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
        </div>
      )}
      <Totals {...totals} />
      {hasUnavailable && <p className={styles.warn}>Sold-out items stay here so you can find them later, but they aren&apos;t included.</p>}
      <ButtonLink ref={cta} href="/checkout" size="lg" block aria-disabled={empty || undefined} className={empty ? styles.disabled : undefined}>
        Go to checkout
      </ButtonLink>
      <p className={styles.small}>You&apos;ll add delivery details on the next step.</p>
      {!empty && (
        <MobileActionBar watch={cta} when="away">
          <span className={styles.barTotal}>
            <span className={styles.small}>Total</span>
            {formatPrice(totals.total)}
          </span>
          <ButtonLink href="/checkout">Go to checkout</ButtonLink>
        </MobileActionBar>
      )}
    </aside>
  );
}
