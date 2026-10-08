"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getProduct } from "@/lib/data/products";
import { centerOf, flySeed } from "@/lib/fly";
import { useCart } from "./CartProvider";
import styles from "./CartFeedback.module.css";

/**
 * Two pieces of feedback when something goes in the cart:
 * 1. A small yolk seed arcs from the button to the cart in the header.
 * 2. A toast confirms what was added, with a way to the cart.
 */
export function CartFeedback() {
  const { lastAdded, dismissAdded } = useCart();
  const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onFlight = (e: Event) => {
      const from = (e as CustomEvent<{ x: number; y: number }>).detail;
      const target = document.querySelector<HTMLElement>("[data-cart-target]");
      if (!target) return;
      flySeed(from, centerOf(target), { className: styles.seed }).then(() => {
        target.classList.remove("cart-bump");
        void target.offsetWidth; // restart the animation
        target.classList.add("cart-bump");
      });
    };
    window.addEventListener("forest:cart-flight", onFlight);
    return () => window.removeEventListener("forest:cart-flight", onFlight);
  }, []);

  useEffect(() => {
    if (!lastAdded) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(dismissAdded, 5000);
    return () => clearTimeout(timer.current);
  }, [lastAdded, dismissAdded]);

  // No toast on the cart page itself.
  const product = lastAdded ? getProduct(lastAdded.slug) : null;
  const variant = product?.variants.find((v) => v.id === lastAdded?.variantId);
  const show = Boolean(product && pathname !== "/cart");

  return (
    <div className={styles.region} aria-live="polite" role="status">
      {show && product && (
        <div
          className={styles.toast}
          key={lastAdded?.at}
          onMouseEnter={() => clearTimeout(timer.current)}
        >
          <p>
            <strong>{product.name}</strong>
            {product.variants.length > 1 && variant ? `, ${variant.label.toLowerCase()}` : ""} is in your cart.
          </p>
          <div className={styles.actions}>
            <Link href="/cart" className={styles.link} onClick={dismissAdded}>
              View cart
            </Link>
            <button type="button" className={styles.close} onClick={dismissAdded} aria-label="Dismiss">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
