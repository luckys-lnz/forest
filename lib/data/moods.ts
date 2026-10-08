import { isOneOf } from "../types";

export const moodIds = ["cozy", "curious", "light", "fiery", "indulgent", "quick"] as const;
export type MoodId = (typeof moodIds)[number];

export type Mood = {
  readonly id: MoodId;
  readonly label: string;
  /** What the mood means, in the words couples used most when logging it. */
  readonly hint: string;
};

export const moods = {
  cozy: { id: "cozy", label: "Cozy", hint: "Warm, familiar, a bit of a hug" },
  curious: { id: "curious", label: "Curious", hint: "Something neither of us has had" },
  light: { id: "light", label: "Light", hint: "Fresh, clean, no food coma" },
  fiery: { id: "fiery", label: "Fiery", hint: "Heat. Proper heat." },
  indulgent: { id: "indulgent", label: "Indulgent", hint: "Rich, a treat, worth it" },
  quick: { id: "quick", label: "Starving", hint: "Fast. We needed food ten minutes ago" },
} as const satisfies Record<MoodId, Mood>;

export const moodList: readonly Mood[] = moodIds.map((id) => moods[id]);
export const isMoodId = (v: unknown): v is MoodId => isOneOf(moodIds, v);

export const settingIds = ["cook", "out", "order"] as const;
export type SettingId = (typeof settingIds)[number];
export const settings = { cook: "Cook in", out: "Go out", order: "Order in" } as const satisfies Record<SettingId, string>;
export const isSettingId = (v: unknown): v is SettingId => isOneOf(settingIds, v);
