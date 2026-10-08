import { discoveries, type Discovery } from "@/lib/data/discoveries";
import { moodIds, type MoodId } from "@/lib/data/moods";

export type MenuItem = {
  readonly dish: Discovery;
  /** 0–1: how strongly couples in this mood rated it. */
  readonly fit: number;
  /** The mood it pairs with best besides this one, for the matchmaker link. */
  readonly partner: MoodId;
};

/** Sticker colour per mood, so the picker and the board agree. */
export const MOOD_COLOR = {
  cozy: "var(--butter)",
  curious: "var(--sky)",
  light: "var(--mint)",
  fiery: "var(--tomato)",
  indulgent: "var(--bubble)",
  quick: "#ffb36b",
} as const satisfies Record<MoodId, string>;

/** Today's menu for one mood: the six dishes couples in that mood rated highest. */
export function menuFor(mood: MoodId, size = 6): MenuItem[] {
  return [...discoveries]
    .sort((x, y) => y.affinity[mood] - x.affinity[mood] || y.signals.again - x.signals.again)
    .slice(0, size)
    .map((dish) => ({
      dish,
      fit: dish.affinity[mood],
      partner: moodIds
        .filter((m) => m !== mood)
        .reduce<MoodId>((best, m) => (dish.affinity[m] > dish.affinity[best] ? m : best), mood === "cozy" ? "curious" : "cozy"),
    }));
}

export const discoverHref = (mood: MoodId, item: MenuItem) => `/discover?a=${mood}&b=${item.partner}`;
