import type { FoodKind } from "@/components/fun/food/drawings";
import { rankMatches } from "@/lib/discover";

/**
 * The scroll story, as data. Four acts, each owning an equal slice of the
 * scroll track, a backdrop colour and the stickers drifting past the phone.
 */
export type Act = {
  readonly title: string;
  readonly accent: string;
  readonly body: string;
  readonly bg: string;
  readonly stickers: readonly FoodKind[];
};

/** The dinner the story ends on: the real top match for cozy + curious. */
export const PLAN = rankMatches("cozy", "curious")[0].discovery;

export const ACTS: readonly Act[] = [
  {
    title: "Couples log what they",
    accent: "ate.",
    body: "After dinner, each of you answers two questions: would you have it again, and did you both like it? No stars, no essays.",
    bg: "var(--butter)",
    stickers: ["noodles", "egg", "toast"],
  },
  {
    title: "The answers become",
    accent: "signals.",
    body: "Thousands of meals pile up. The dishes couples go back to rise to the top; the ones that split couples sink.",
    bg: "var(--sky)",
    stickers: ["sushi", "pizza", "dumpling"],
  },
  {
    title: "Pip finds the",
    accent: "middle.",
    body: "Your moods pull from opposite sides. Forest looks for the dish that sits well with both of you, not the one that wins for one.",
    bg: "var(--mint)",
    stickers: ["taco", "chili", "noodles"],
  },
  {
    title: "Tonight has a",
    accent: "plan.",
    body: `${PLAN.name}: cozy for one of you, new for the other. ${Math.round(PLAN.signals.again * 100)}% of couples who felt the same would have it again.`,
    bg: "var(--bubble)",
    stickers: ["dumpling", "egg", "pizza"],
  },
];

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Which act is showing, and how far through it (0–1) the reader is. */
export function actAt(p: number) {
  const span = p * ACTS.length;
  const act = Math.min(ACTS.length - 1, Math.floor(span));
  return { act, local: clamp(span - act) } as const;
}
