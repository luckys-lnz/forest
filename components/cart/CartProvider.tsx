"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useState, type ReactNode } from "react";
import { cartReducer, resolveLines, totals, type CartLine, type CartTotals, type ResolvedLine } from "@/lib/cart";
import { useCartStorage } from "./useCartStorage";

type Added = { readonly slug: string; readonly variantId: string; readonly qty: number; readonly at: number };

type CartContextValue = {
  readonly lines: ResolvedLine[];
  readonly totals: CartTotals;
  /** False until the saved cart has been read from this device. */
  readonly ready: boolean;
  readonly lastAdded: Added | null;
  add: (slug: string, variantId: string, qty?: number, from?: Element | null) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clear: () => void;
  dismissAdded: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, dispatch] = useReducer(cartReducer, [] as CartLine[]);
  const ready = useCartStorage(raw, dispatch);
  const [lastAdded, setLastAdded] = useState<Added | null>(null);

  const add = useCallback((slug: string, variantId: string, qty = 1, from?: Element | null) => {
    dispatch({ type: "add", slug, variantId, qty });
    setLastAdded({ slug, variantId, qty, at: Date.now() });
    if (!from) return;
    // Let the header animate a seed from the button to the cart.
    const r = from.getBoundingClientRect();
    const detail = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    window.dispatchEvent(new CustomEvent("forest:cart-flight", { detail }));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(raw);
    return {
      lines,
      totals: totals(lines),
      ready,
      lastAdded,
      add,
      setQty: (slug, variantId, qty) => dispatch({ type: "set", slug, variantId, qty }),
      remove: (slug, variantId) => dispatch({ type: "remove", slug, variantId }),
      clear: () => dispatch({ type: "clear" }),
      dismissAdded: () => setLastAdded(null),
    };
  }, [raw, ready, lastAdded, add]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
