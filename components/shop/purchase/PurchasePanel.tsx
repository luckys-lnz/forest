"use client";

import Link from "next/link";
import { useRef } from "react";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { Button } from "@/components/ui/Button";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { cents } from "@/lib/types";
import { Availability } from "../Availability";
import { QuantityStepper } from "../QuantityStepper";
import { Promises } from "./Promises";
import { usePurchase } from "./usePurchase";
import { VariantPicker } from "./VariantPicker";
import styles from "./PurchasePanel.module.css";

export function PurchasePanel({ product }: { product: Product }) {
  const p = usePurchase(product);
  const soldOut = p.availability.state === "sold-out";
  const full = p.room === 0;
  const buyRef = useRef<HTMLDivElement>(null);
  const label = full ? "You have all we've got" : p.justAdded ? "Added to cart" : "Add to cart";

  return (
    <div className={styles.panel}>
      <p className={styles.price} aria-live="polite">
        {formatPrice(cents(p.variant.price * p.qty))}
        {p.qty > 1 && <span className={styles.each}> ({formatPrice(p.variant.price)} each)</span>}
      </p>
      <VariantPicker product={product} selected={p.variant.id} onSelect={p.choose} />
      <Availability value={p.availability} />

      {soldOut ? (
        <div className={styles.soldOut}>
          <Button disabled block size="lg">
            Sold out
          </Button>
          <p className={styles.note}>We tell the Sunday letter first when it comes back. Subscribe to hear before anyone else.</p>
          <NewsletterForm source={`restock:${product.slug}`} tone="light" />
        </div>
      ) : (
        <div ref={buyRef} className={styles.buy}>
          <QuantityStepper value={p.qty} max={Math.max(1, p.room)} onChange={p.setQty} label="Quantity" disabled={full} />
          <Button size="lg" block disabled={full} onClick={(e) => p.addToCart(e.currentTarget)}>
            {label}
          </Button>
        </div>
      )}

      {p.inCart > 0 && (
        <p className={styles.inCart}>
          {p.inCart} already in your cart. <Link href="/cart">Go to cart</Link>
        </p>
      )}
      <Promises product={product} variant={p.variant} />
      {!soldOut && (
        <MobileActionBar watch={buyRef}>
          <span className={styles.barText}>
            <span className={styles.barName}>{product.name}</span>
            {formatPrice(cents(p.variant.price * p.qty))}
          </span>
          <Button disabled={full} onClick={(e) => p.addToCart(e.currentTarget)}>
            {label}
          </Button>
        </MobileActionBar>
      )}
    </div>
  );
}
