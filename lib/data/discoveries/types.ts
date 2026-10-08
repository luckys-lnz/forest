import type { MoodId, SettingId } from "../moods";
import type { ProductSlug } from "../products/slugs";

/**
 * A discovery is a meal (or a night) that couples have logged on Forest.
 *
 * PREVIEW DATA: `signals` and `weekly` are a preview dataset used while
 * Forest is in beta (see `site.previewData`). In production these fields are
 * filled from the community signals API; the shape stays the same.
 */
export type Discovery = {
  readonly id: string;
  readonly name: string;
  readonly cuisine: string;
  readonly blurb: string;
  readonly image: { readonly path: string; readonly alt: string };
  /** 0–1: how strongly couples who felt each mood rated this. */
  readonly affinity: Readonly<Record<MoodId, number>>;
  readonly settings: readonly SettingId[];
  /** 1 = under $20 for two, 2 = $20–60, 3 = $60+ */
  readonly price: PriceBand;
  readonly minutes: number;
  readonly vegetarian: boolean;
  readonly signals: {
    /** Couples who logged it together. */
    readonly couples: number;
    /** Share of those couples who said they'd have it again. */
    readonly again: number;
    /** Share of couples where one partner loved it and the other didn't. */
    readonly split: number;
  };
  /** Saves per week, oldest first (last 8 weeks). */
  readonly weekly: readonly number[];
  /** Pip's note: the one thing worth knowing. */
  readonly pip: string;
  /** A shop product that brings this home, if there is one. */
  readonly product?: ProductSlug;
};

export type PriceBand = 1 | 2 | 3;
