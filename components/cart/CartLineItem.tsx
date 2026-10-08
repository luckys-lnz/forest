"use client";

import Link from "next/link";
import { ProductArt } from "@/components/shop/art/ProductArt";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import type { ResolvedLine } from "@/lib/cart";
import { cx, formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import styles from "./CartLineItem.module.css";

/** One line: what it is, how many, what it costs, and any stock problem in words. */
export function CartLineItem({ line: l }: { line: ResolvedLine }) {
  const { setQty, remove } = useCart();
  const atLimit = l.available && l.variant.stock !== null && l.qty >= l.maxQty;
  return (
    <li className={cx(styles.line, !l.available && styles.out)}>
      <Link href={`/shop/${l.slug}`} className={styles.thumb} tabIndex={-1} aria-hidden="true">
        <ProductArt product={l.product} />
      </Link>
      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link href={`/shop/${l.slug}`}>{l.product.name}</Link>
        </h3>
        {l.product.variants.length > 1 && <p className={styles.sub}>{l.variant.label}</p>}
        <p className={styles.sub}>{formatPrice(l.variant.price)} each</p>
        {!l.available && <p className={styles.warn}>Sold out since you added it. It won&apos;t be charged.</p>}
        {atLimit && <p className={styles.sub}>That&apos;s all we have in stock.</p>}
      </div>
      <div className={styles.controls}>
        <QuantityStepper
          size="sm"
          value={l.qty}
          max={l.maxQty}
          onChange={(n) => setQty(l.slug, l.variantId, n)}
          label={`Quantity of ${l.product.name}`}
          disabled={!l.available}
        />
        <button type="button" className={styles.remove} onClick={() => remove(l.slug, l.variantId)}>
          Remove<span className="sr-only"> {l.product.name}</span>
        </button>
      </div>
      <p className={styles.total}>{formatPrice(l.lineTotal)}</p>
    </li>
  );
}
