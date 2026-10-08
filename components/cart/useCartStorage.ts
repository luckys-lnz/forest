"use client";

import { useEffect, useState, type Dispatch } from "react";
import { isCartLines, type CartAction, type CartLine } from "@/lib/cart";

const KEY = "forest.cart.v1";

function read(raw: string | null): CartLine[] | null {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return isCartLines(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Persist the cart on this device and keep open tabs in sync. Storage can be
 * unavailable (private mode, blocked); the cart then works for this visit only.
 * Returns `ready` once the saved cart has been read, so the UI never flashes empty.
 */
export function useCartStorage(lines: CartLine[], dispatch: Dispatch<CartAction>): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = read(window.localStorage.getItem(KEY));
      if (saved) dispatch({ type: "hydrate", lines: saved });
    } catch {
      /* storage blocked */
    }
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      const next = read(e.newValue);
      if (next) dispatch({ type: "hydrate", lines: next });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage blocked */
    }
  }, [lines, ready]);

  return ready;
}
