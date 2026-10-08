"use client";

import { useState, type CSSProperties } from "react";
import { FoodSticker } from "@/components/fun/food/FoodSticker";
import type { FoodKind } from "@/components/fun/food/drawings";
import { cx } from "@/lib/format";
import styles from "./HeroStickers.module.css";

type Spot = {
  readonly kind: FoodKind;
  readonly name: string;
  readonly sound: string;
  readonly top: string;
  readonly left: string;
  readonly tilt: number;
  /** Phones only have room for a few; the rest wait for wider screens. */
  readonly wide?: boolean;
};

const SPOTS: readonly Spot[] = [
  { kind: "noodles", name: "bowl of noodles", sound: "slurp!", top: "2%", left: "62%", tilt: -8, wide: true },
  { kind: "dumpling", name: "dumpling", sound: "squish!", top: "-2%", left: "77%", tilt: 10 },
  { kind: "egg", name: "fried egg", sound: "sizzle!", top: "4%", left: "94%", tilt: 6 },
  { kind: "taco", name: "taco", sound: "crunch!", top: "40%", left: "66%", tilt: 12, wide: true },
  { kind: "pizza", name: "pizza slice", sound: "cheesy!", top: "58%", left: "54%", tilt: -14, wide: true },
  { kind: "chili", name: "chilli", sound: "spicy!", top: "68%", left: "67%", tilt: -18 },
];

/**
 * Food stickers scattered on the cream, like a lunchbox lid. Each one is a
 * button: poke it and it bounces and makes its noise. On phones they line
 * up in a strip above the headline instead of floating over it.
 */
export function HeroStickers() {
  const [poked, setPoked] = useState<Record<string, number>>({});
  return (
    <div className={styles.layer}>
      {SPOTS.map((s) => {
        const n = poked[s.kind] ?? 0;
        return (
          <button
            key={s.kind}
            type="button"
            className={cx(styles.spot, s.wide && styles.wide)}
            style={{ "--top": s.top, "--left": s.left } as CSSProperties}
            aria-label={`Poke the ${s.name}`}
            onClick={() => setPoked((p) => ({ ...p, [s.kind]: n + 1 }))}
          >
            <span key={n} className={cx(styles.body, n > 0 && styles.boing)}>
              <FoodSticker kind={s.kind} tilt={s.tilt} className={styles.food} />
            </span>
            {n > 0 && (
              <span key={`say-${n}`} className={`hand ${styles.say}`} aria-live="polite">
                {s.sound}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
