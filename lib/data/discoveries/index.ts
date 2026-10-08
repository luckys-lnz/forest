import { bold } from "./bold";
import { fresh } from "./fresh";
import { nights } from "./nights";
import type { Discovery } from "./types";
import { warm } from "./warm";

export type { Discovery, PriceBand } from "./types";

const all = [...warm, ...bold, ...fresh, ...nights] as const satisfies readonly Discovery[];

/** Union of every known discovery id, derived from the data itself. */
export type DiscoveryId = (typeof all)[number]["id"];

/** Widened for consumers: callers work with `Discovery`, not literal types. */
export const discoveries: readonly Discovery[] = all;

const byId = new Map<string, Discovery>(discoveries.map((d) => [d.id, d]));

export function getDiscovery(id: string): Discovery | undefined {
  return byId.get(id);
}
