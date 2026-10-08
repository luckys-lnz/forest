import { discoveries, type Discovery } from "./data/discoveries";
import { discoverHrefFor } from "./discover/params";

export type BoardId = "again" | "rising" | "split" | "safe";

export type BoardRow = {
  readonly id: string;
  readonly name: string;
  readonly cuisine: string;
  /** The single number that earns this row its place. */
  readonly figure: string;
  readonly figureLabel: string;
  /** Plain-language reason. */
  readonly reason: string;
  readonly weekly?: readonly number[];
  readonly split?: number;
  readonly href: string;
};

export type Board = { readonly id: BoardId; readonly label: string; readonly intro: string; readonly rows: BoardRow[] };

type BoardSpec = {
  readonly label: string;
  readonly intro: string;
  /** Which dishes qualify, best first. */
  readonly pick: (all: readonly Discovery[]) => Discovery[];
  /** What to show for each one. */
  readonly show: (d: Discovery) => Pick<BoardRow, "figure" | "figureLabel" | "reason" | "weekly" | "split">;
};

const pct = (n: number) => `${Math.round(n * 100)}%`;
const growth = (d: Discovery) => d.weekly[d.weekly.length - 1] / d.weekly[0] - 1;
const popular = (all: readonly Discovery[]) => all.filter((d) => d.signals.couples >= 1500);
const by = (f: (d: Discovery) => number) => (x: Discovery, y: Discovery) => f(y) - f(x);
const n = (v: number) => v.toLocaleString("en-US");

/** Each board is a question about the data, and an honest way to show the answer. */
const specs: Record<BoardId, BoardSpec> = {
  again: {
    label: "Going back for",
    intro: "The dishes couples order a second time.",
    pick: (all) => popular(all).sort(by((d) => d.signals.again)),
    show: (d) => ({ figure: pct(d.signals.again), figureLabel: "would have it again", reason: d.pip }),
  },
  rising: {
    label: "Quietly rising",
    intro: "Climbing week on week, before anyone's calling them a trend.",
    pick: (all) => [...all].sort(by(growth)),
    show: (d) => ({
      figure: `+${pct(growth(d))}`,
      figureLabel: "saves in 8 weeks",
      reason: `Saved ${n(d.weekly[d.weekly.length - 1])} times last week, up from ${n(d.weekly[0])}.`,
      weekly: d.weekly,
    }),
  },
  split: {
    label: "Split decisions",
    intro: "Where one of you will love it and the other might not. And how couples fix that.",
    pick: (all) => [...all].sort(by((d) => d.signals.split)),
    show: (d) => ({ figure: pct(d.signals.split), figureLabel: "of couples split on it", reason: d.pip, split: d.signals.split }),
  },
  safe: {
    label: "Safe bets",
    intro: "Lowest disagreement on Forest. Good for a first night using it.",
    pick: (all) => popular(all).sort(by((d) => -d.signals.split)),
    show: (d) => ({ figure: pct(1 - d.signals.split), figureLabel: "of couples both liked it", reason: d.pip }),
  },
};

export function buildBoards(rowsPerBoard = 4): Board[] {
  return (Object.keys(specs) as BoardId[]).map((id) => {
    const { label, intro, pick, show } = specs[id];
    const rows = pick(discoveries)
      .slice(0, rowsPerBoard)
      .map((d) => ({ id: d.id, name: d.name, cuisine: d.cuisine, href: discoverHrefFor(d), ...show(d) }));
    return { id, label, intro, rows };
  });
}
