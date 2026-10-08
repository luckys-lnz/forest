import type { Discovery } from "../data/discoveries";
import { isMoodId, isSettingId, moodIds, type MoodId } from "../data/moods";
import { firstParam, type SearchParams } from "../types";
import type { Filters } from "./rank";

export type DiscoverState = {
  readonly a: MoodId | null;
  readonly b: MoodId | null;
  readonly nameA: string;
  readonly nameB: string;
  readonly filters: Filters;
};

/** Read discover state from URL search params (shared links). Never trusts input. */
export function parseDiscoverParams(params: SearchParams): DiscoverState {
  const get = (k: string) => firstParam(params[k]);
  const a = get("a");
  const b = get("b");
  const setting = get("setting");
  const price = Number(get("price"));
  return {
    a: isMoodId(a) ? a : null,
    b: isMoodId(b) ? b : null,
    nameA: sanitizeName(get("na")) ?? "You",
    nameB: sanitizeName(get("nb")) ?? "Them",
    filters: {
      setting: isSettingId(setting) ? setting : "any",
      vegetarian: get("veg") === "1",
      maxPrice: price === 1 || price === 2 ? price : 3,
    },
  };
}

/** The inverse: state to a shareable query string. Defaults are omitted. */
export function toDiscoverQuery(s: DiscoverState): string {
  const q = new URLSearchParams();
  if (s.a) q.set("a", s.a);
  if (s.b) q.set("b", s.b);
  if (s.nameA !== "You") q.set("na", s.nameA);
  if (s.nameB !== "Them") q.set("nb", s.nameB);
  if (s.filters.setting !== "any") q.set("setting", s.filters.setting);
  if (s.filters.vegetarian) q.set("veg", "1");
  if (s.filters.maxPrice !== 3) q.set("price", String(s.filters.maxPrice));
  return q.toString();
}

function sanitizeName(v: string | undefined): string | null {
  const clean = v?.replace(/[^\p{L}\p{N} '\-]/gu, "").trim().slice(0, 16);
  return clean || null;
}

/** A /discover link pre-filled with the two moods a dish suits best. */
export function discoverHrefFor(d: Discovery): string {
  const [a, b] = [...moodIds].sort((x, y) => d.affinity[y] - d.affinity[x]);
  return `/discover?a=${a}&b=${b}`;
}
