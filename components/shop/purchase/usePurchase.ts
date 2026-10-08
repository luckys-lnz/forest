"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { maxQtyFor } from "@/lib/cart";
import { variantAvailability, type Product } from "@/lib/data/products";

/** Selected variant and quantity, clamped to what's actually left after the cart. */
export function usePurchase(product: Product) {
  const { add, lines } = useCart();
  const firstAvailable =
    product.variants.find((v) => variantAvailability(product, v).state !== "sold-out") ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const availability = variantAvailability(product, variant);
  const inCart = lines.find((l) => l.slug === product.slug && l.variantId === variant.id)?.qty ?? 0;
  /** How many more of this variant can go in the cart. */
  const room = Math.max(0, maxQtyFor(variant) - inCart);

  function choose(id: string) {
    setVariantId(id);
    setQty(1);
  }

  function addToCart(from: Element) {
    add(product.slug, variant.id, Math.min(qty, room), from);
    setJustAdded(true);
    setQty(1);
    setTimeout(() => setJustAdded(false), 2200);
  }

  return { variant, availability, qty: Math.min(qty, Math.max(1, room)), setQty, room, inCart, justAdded, choose, addToCart };
}
