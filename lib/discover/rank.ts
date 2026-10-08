import { discoveries, type Discovery, type PriceBand } from "../data/discoveries";
import type { MoodId, SettingId } from "../data/moods";
import { assertNever } from "../types";

export type Filters = {
  readonly setting: SettingId | "any";
  readonly vegetarian: boolean;
  readonly maxPrice: PriceBand;
};
export const defaultFilters: Filters = { setting: "any", vegetarian: false, maxPrice: 3 };

export type Verdict = "both" | "middle" | "leansA" | "leansB";

export type Match = {
  readonly discovery: Discovery;
  /** 0–1 overall rank score */
  readonly score: number;
  readonly fitA: number;
  readonly fitB: number;
  readonly verdict: Verdict;
  /** Estimated couples with this exact mood pair who logged the dish. */
  readonly likeYou: number;
};

const MAX_COUPLES = Math.max(...discoveries.map((d) => d.signals.couples));

const passes = (d: Discovery, f: Filters): boolean =>
  (f.setting === "any" || d.settings.includes(f.setting)) && (!f.vegetarian || d.vegetarian) && d.price <= f.maxPrice;

/**
 * Rank discoveries for two moods.
 * - Fit is the geometric mean of both partners' affinity, so a dish one of
 *   you loves and the other can't stand ranks below one you both like.
 * - Crowd confidence nudges by repeat rate and penalises dishes couples split on.
 * - Popularity is a light tiebreaker only, so niche finds can still win.
 */
export function rankMatches(a: MoodId, b: MoodId, filters: Filters = defaultFilters): Match[] {
  return discoveries
    .filter((d) => passes(d, filters))
    .map((d): Match => {
      const fitA = d.affinity[a];
      const fitB = d.affinity[b];
      const confidence = (0.75 + 0.25 * d.signals.again) * (1 - 0.25 * d.signals.split);
      const popularity = 0.92 + 0.08 * (Math.log10(d.signals.couples) / Math.log10(MAX_COUPLES));
      return {
        discovery: d,
        score: Math.sqrt(fitA * fitB) * confidence * popularity,
        fitA,
        fitB,
        verdict: verdictFor(fitA, fitB),
        likeYou: Math.round(d.signals.couples * fitA * fitB * 0.12),
      };
    })
    .sort((x, y) => y.score - x.score);
}

function verdictFor(fitA: number, fitB: number): Verdict {
  if (fitA >= 0.7 && fitB >= 0.7) return "both";
  if (Math.abs(fitA - fitB) < 0.2) return "middle";
  return fitA > fitB ? "leansA" : "leansB";
}

/** "You" → "your", "Them" → "their", "Sam" → "Sam's". */
export function possessive(name: string): string {
  const n = name.trim().toLowerCase();
  if (n === "you") return "your";
  if (n === "them") return "their";
  return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

export function verdictLabel(v: Verdict, nameA: string, nameB: string): string {
  switch (v) {
    case "both":
      return "You both want this";
    case "middle":
      return "Right in the middle";
    case "leansA":
      return `Leans ${possessive(nameA)} way`;
    case "leansB":
      return `Leans ${possessive(nameB)} way`;
    default:
      return assertNever(v);
  }
}

export function priceLabel(p: PriceBand): string {
  return p === 1 ? "Under $20 for two" : p === 2 ? "$20–60 for two" : "$60+ for two";
}
