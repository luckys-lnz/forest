"use client";

import { useEffect, useRef, useState } from "react";

export type Chase =
  | { readonly phase: "idle" }
  | { readonly phase: "running"; readonly lit: number }
  | { readonly phase: "landed"; readonly lit: number };

/**
 * An arcade light chase over `count` tiles: the light runs round, slows
 * down, and stops on a random one. Reduced motion skips straight to the end.
 */
export function useChase(count: number) {
  const [chase, setChase] = useState<Chase>({ phase: "idle" });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function start() {
    if (chase.phase === "running" || count === 0) return;
    clearTimeout(timer.current);
    const target = Math.floor(Math.random() * count);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChase({ phase: "landed", lit: target });
      return;
    }
    // Two full laps, then on to the target; each step a little slower.
    const steps = count * 2 + target + 1;
    let i = 0;
    const tick = () => {
      if (i >= steps) return setChase({ phase: "landed", lit: target });
      setChase({ phase: "running", lit: i % count });
      timer.current = setTimeout(tick, 55 + (i / steps) ** 3 * 320);
      i++;
    };
    tick();
  }

  function reset() {
    clearTimeout(timer.current);
    setChase({ phase: "idle" });
  }

  return { chase, start, reset } as const;
}
