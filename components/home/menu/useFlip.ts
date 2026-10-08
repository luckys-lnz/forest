"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * FLIP reordering: when `key` changes, every child marked with
 * data-flip="<id>" glides from where it was to where it now is, so a
 * re-ranked list visibly shuffles instead of jumping.
 */
export function useFlip<T extends HTMLElement>(key: string) {
  const ref = useRef<T>(null);
  const last = useRef(new Map<string, { x: number; y: number }>());

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-flip]")];
    // Positions relative to the board, so scrolling between changes doesn't count as movement.
    const origin = root.getBoundingClientRect();
    const at = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - origin.left, y: r.top - origin.top };
    };
    // First paint: just remember where everything is.
    const reduce = last.current.size === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    for (const el of items) {
      const id = el.dataset.flip ?? "";
      const before = last.current.get(id);
      const now = at(el);
      if (reduce) continue;
      if (!before) {
        // New arrivals drop onto the board.
        el.animate(
          [{ transform: "translateY(-24px) rotate(-4deg) scale(0.9)", opacity: 0 }, { transform: "none", opacity: 1 }],
          { duration: 460, easing: "cubic-bezier(0.3, 1.6, 0.5, 1)" },
        );
        continue;
      }
      const dx = before.x - now.x;
      const dy = before.y - now.y;
      if (!dx && !dy) continue;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
        duration: 560,
        easing: "cubic-bezier(0.3, 1.3, 0.5, 1)",
      });
    }
    last.current = new Map(items.map((el) => [el.dataset.flip ?? "", at(el)]));
  }, [key]);

  return ref;
}
