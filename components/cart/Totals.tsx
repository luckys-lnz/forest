import { formatPrice } from "@/lib/format";
import type { Cents } from "@/lib/types";
import styles from "./Totals.module.css";

type Props = { subtotal: Cents; shipping: Cents; total: Cents };

/** Subtotal, delivery, total. Shared by the cart and checkout so they always agree. */
export function Totals({ subtotal, shipping, total }: Props) {
  return (
    <dl className={styles.totals}>
      <div>
        <dt>Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div>
        <dt>Delivery</dt>
        <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
      </div>
      <div className={styles.total}>
        <dt>Total</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}
