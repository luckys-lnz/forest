"use client";

import { cx } from "@/lib/format";
import { PipCostume, type Costume } from "./PipCostume";
import { PipEyes } from "./PipEyes";
import { useBlink } from "./useBlink";
import base from "./Pip.module.css";
import moods from "./PipMoods.module.css";

export type { Costume };

export type PipMood = "idle" | "curious" | "thinking" | "happy" | "sleepy" | "surprised";

type Props = {
  mood?: PipMood;
  /** Where Pip is looking, each axis -1..1. */
  look?: { x: number; y: number };
  size?: number;
  /** Pass a label when Pip carries meaning; omit when decorative. */
  label?: string;
  className?: string;
  /** Rim colour: soft ash on dark surfaces, black on light ones. */
  tone?: "on-dark" | "on-light";
  /** Something to wear: Pip dresses for the occasion. */
  costume?: Costume;
  /** Die-cut white edge and a hard shadow, for sticker moments. */
  sticker?: boolean;
};

/**
 * Pip: Forest's guide. A small black seed with one shiso leaf. Six
 * expressions, a wardrobe, and no motion without a reason except a blink.
 */
export function Pip({ mood = "idle", look = { x: 0, y: 0 }, size = 96, label, className, tone = "on-dark", costume = "none", sticker }: Props) {
  const blink = useBlink(mood === "sleepy" || mood === "happy");
  return (
    <svg
      viewBox="0 -10 100 126"
      width={size}
      height={size * 1.26}
      className={cx(base.pip, moods[mood], tone === "on-light" && base.onLight, sticker && base.sticker, className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g data-part="figure">
        <g data-part="leaf">
          <path data-part="stem" d="M50 24 C 50 16 52 9 57 4" />
          <path data-part="blade" d="M56 5 C 62 -6 80 -7 88 1 C 80 11 65 14 56 5 Z" />
          <path data-part="vein" d="M57 5 C 66 2 76 1 86 1" />
        </g>
        <path data-part="body" d="M50 21 C 73 21 89 47 89 74 C 89 99 72 115 50 115 C 28 115 11 99 11 74 C 11 47 27 21 50 21 Z" />
        <ellipse data-part="sheen" cx="34" cy="48" rx="9" ry="14" transform="rotate(24 34 48)" />
        <PipEyes mood={mood} blink={blink} look={look} />
        <PipCostume costume={costume} />
      </g>
    </svg>
  );
}
