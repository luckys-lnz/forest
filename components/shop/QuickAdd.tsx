"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";

/** One-tap add for single-option products, with a brief confirmed state. */
export function QuickAdd({ slug, variantId, name }: { slug: string; variantId: string; name: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <Button
      size="sm"
      variant={added ? "secondary" : "primary"}
      aria-label={added ? `${name} added to cart` : `Add ${name} to cart`}
      onClick={(e) => {
        add(slug, variantId, 1, e.currentTarget);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
      }}
    >
      {added ? "Added" : "Add to cart"}
    </Button>
  );
}
