import Link from "next/link";
import { Totals } from "@/components/cart/Totals";
import type { CartTotals, ResolvedLine } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import styles from "./OrderSummary.module.css";

type Props = { lines: readonly ResolvedLine[]; totals: CartTotals };

export function OrderSummary({ lines, totals }: Props) {
  return (
    <aside className={styles.summary} aria-labelledby="order-summary">
      <h2 id="order-summary" className={styles.title}>
        Your order
      </h2>
      <ul role="list" className={styles.items}>
        {lines.map((l) => (
          <li key={`${l.slug}-${l.variantId}`}>
            <span>
              {l.qty} × {l.product.name}
              {l.product.variants.length > 1 && <span className={styles.variant}>{l.variant.label}</span>}
            </span>
            <span className="num">{formatPrice(l.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <Totals {...totals} />
      <Link href="/cart" className={styles.edit}>
        Edit cart
      </Link>
    </aside>
  );
}
