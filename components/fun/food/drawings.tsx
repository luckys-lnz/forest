import type { ReactElement } from "react";

/**
 * Hand-drawn food, all on a 100×100 grid. Shapes carry only their fill; the
 * outline is applied by FoodSticker so every drawing gets the same ink.
 */
export const FOODS = {
  noodles: (
    <>
      <path d="M58 46 L90 12 M64 48 L96 22" />
      <path d="M22 50 C 26 34 34 50 40 36 C 46 26 52 48 58 34 C 64 24 70 46 78 38" fill="none" />
      <path d="M12 50 H88 C 88 72 72 88 50 88 C 28 88 12 72 12 50 Z" fill="var(--tomato)" />
      <path d="M28 66 H72" fill="none" />
    </>
  ),
  dumpling: (
    <>
      <path d="M12 68 C 12 42 32 28 50 28 C 68 28 88 42 88 68 C 70 78 30 78 12 68 Z" fill="var(--cream)" />
      <path d="M38 32 C 40 40 42 44 44 48 M50 29 V 46 M62 32 C 60 40 58 44 56 48" fill="none" />
      <circle cx="40" cy="60" r="3.2" fill="#000" />
      <circle cx="60" cy="60" r="3.2" fill="#000" />
      <path d="M46 65 Q 50 69 54 65" fill="none" />
    </>
  ),
  pizza: (
    <>
      <path d="M50 92 L14 22 Q 50 8 86 22 Z" fill="var(--butter)" />
      <path d="M14 22 Q 50 8 86 22 L 81 32 Q 50 20 19 32 Z" fill="#e7a556" />
      <circle cx="44" cy="44" r="6" fill="var(--tomato)" />
      <circle cx="59" cy="58" r="6" fill="var(--tomato)" />
      <circle cx="48" cy="73" r="5" fill="var(--tomato)" />
    </>
  ),
  taco: (
    <>
      <path d="M8 38 Q 18 22 28 30 Q 36 18 48 26 Q 58 16 68 26 Q 80 20 92 36 C 70 48 30 48 8 38 Z" fill="var(--mint)" />
      <circle cx="34" cy="32" r="5" fill="var(--tomato)" />
      <circle cx="64" cy="29" r="5" fill="var(--tomato)" />
      <path d="M12 36 C 12 68 30 86 50 86 C 70 86 88 68 88 36 C 70 46 30 46 12 36 Z" fill="var(--butter)" />
    </>
  ),
  egg: (
    <>
      <path d="M20 50 C 14 30 36 14 54 20 C 76 12 92 34 84 54 C 92 74 66 90 48 84 C 28 90 12 72 20 50 Z" fill="#fff" />
      <circle cx="52" cy="50" r="16" fill="var(--butter)" />
      <ellipse cx="46" cy="44" rx="4" ry="6" fill="#fff" stroke="none" transform="rotate(30 46 44)" />
    </>
  ),
  chili: (
    <>
      <path d="M30 30 C 50 34 70 50 76 80 C 78 92 68 94 64 84 C 56 60 40 46 22 42 Z" fill="var(--tomato)" />
      <path d="M22 42 C 14 36 18 24 30 30 Z" fill="var(--shiso)" />
      <path d="M24 30 C 22 20 28 12 36 10" fill="none" />
    </>
  ),
  sushi: (
    <>
      <rect x="16" y="52" width="68" height="28" rx="14" fill="#fff" />
      <path d="M12 54 C 20 32 80 32 88 54 C 70 62 30 62 12 54 Z" fill="#ff9a6b" />
      <path d="M34 42 L 39 55 M50 40 L 54 55 M66 42 L 69 55" stroke="#fff" fill="none" />
      <rect x="44" y="40" width="12" height="42" fill="#000" />
    </>
  ),
  toast: (
    <>
      <path d="M20 42 C 8 16 40 8 50 22 C 60 8 92 16 80 42 V 88 H 20 Z" fill="#e7a556" />
      <path d="M28 46 C 20 26 42 20 50 32 C 58 20 80 26 72 46 V 80 H 28 Z" fill="#f8dfa6" />
      <rect x="40" y="46" width="20" height="16" rx="3" fill="var(--butter)" transform="rotate(-12 50 54)" />
    </>
  ),
} as const satisfies Record<string, ReactElement>;

export type FoodKind = keyof typeof FOODS;
export const FOOD_KINDS = Object.keys(FOODS) as FoodKind[];
