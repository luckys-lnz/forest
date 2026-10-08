import { Pip } from "@/components/pip/Pip";
import { ButtonLink } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { Cents } from "@/lib/types";
import styles from "./OrderConfirmed.module.css";

export type ConfirmedOrder = {
  readonly id: string;
  readonly email: string;
  readonly total: Cents;
  readonly items: readonly { name: string; variant: string | null; qty: number }[];
};

/** Confirmation, honest about preview mode: no payment taken, nothing ships. */
export function OrderConfirmed({ order }: { order: ConfirmedOrder }) {
  return (
    <div className={styles.done} role="status">
      <Pip size={96} mood="happy" tone="on-light" />
      <h2 className={styles.title}>Order {order.id} is in.</h2>
      <p className={styles.preview}>
        Forest is in preview, so no payment was taken and nothing will ship. This is exactly what you&apos;ll see once
        payments are switched on.
      </p>
      <ul role="list" className={styles.items}>
        {order.items.map((i) => (
          <li key={`${i.name}-${i.variant}`}>
            {i.qty} × {i.name}
            {i.variant ? `, ${i.variant.toLowerCase()}` : ""}
          </li>
        ))}
      </ul>
      <p>
        Total {formatPrice(order.total)}. A confirmation would go to <strong>{order.email}</strong>.
      </p>
      <div className={styles.actions}>
        <ButtonLink href="/discover" variant="inverse">
          Find tonight&apos;s meal
        </ButtonLink>
        <ButtonLink href="/shop" variant="secondary">
          Back to the shop
        </ButtonLink>
      </div>
    </div>
  );
}
