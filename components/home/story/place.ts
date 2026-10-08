import { ACTS } from "./storyModel";

/** Three lanes that miss the words, the phone and the rail, each with its own drift. */
const LANES = [
  { left: "69%", speed: 1.2, size: 1, tilt: -14 },
  { left: "97%", speed: 0.8, size: 1.3, tilt: 12 },
  { left: "1%", speed: 1.6, size: 0.8, tilt: 20 },
] as const;

export type Placed = {
  readonly key: string;
  readonly kind: (typeof ACTS)[number]["stickers"][number];
  readonly on: boolean;
  readonly left: string;
  /** Vertical drift in vh: below the fold at the start of its act, above it at the end. */
  readonly y: number;
  readonly scale: number;
  readonly spin: number;
};

/** Where every act's stickers are at this point in the story. Pure. */
export function placeStickers(act: number, local: number): Placed[] {
  return ACTS.flatMap((a, i) =>
    a.stickers.map((kind, j) => {
      const lane = LANES[j % LANES.length];
      const t = i === act ? local : i < act ? 1 : 0;
      return {
        key: `${i}-${kind}-${j}`,
        kind,
        on: i === act,
        left: lane.left,
        y: (0.5 - t) * 90 * lane.speed,
        scale: lane.size,
        spin: lane.tilt + t * 40,
      };
    }),
  );
}
