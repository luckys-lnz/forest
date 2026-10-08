"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { cx } from "@/lib/format";
import styles from "./CartLink.module.css";

/** The cart in the header, and the landing spot for the add-to-cart seed. */
export function CartLink() {
  const { totals, ready } = useCart();
  const count = ready ? totals.count : 0;
  return (
    <Link href="/cart" className={styles.cart} data-cart-target aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}>
      <span aria-hidden="true">Cart</span>
      <span className={cx(styles.count, count > 0 && styles.on)} aria-hidden="true">
        {count}
      </span>
    </Link>
  );
}
