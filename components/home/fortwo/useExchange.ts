"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/motion";

/** 0: nothing yet, 1: first partner spoke, 2: second spoke, 3: Pip answered. */
export type Beat = 0 | 1 | 2 | 3;
const TIMELINE: readonly [Beat, number][] = [
  [1, 150],
  [2, 950],
  [3, 2000],
];

/** Plays a short exchange beat by beat whenever `key` changes while `active`. */
export function useExchange(key: string, active: boolean): Beat {
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState<Beat>(0);
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setBeat(3);
      return;
    }
    setBeat(0);
    const timers = TIMELINE.map(([b, ms]) => setTimeout(() => setBeat(b), ms));
    return () => timers.forEach(clearTimeout);
  }, [key, active, reduce]);
  return beat;
}
