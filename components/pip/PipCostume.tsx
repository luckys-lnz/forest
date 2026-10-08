export type Costume = "none" | "chef" | "party" | "bib" | "shades";

const ink = { stroke: "#000", strokeWidth: 2.6, strokeLinejoin: "round", strokeLinecap: "round" } as const;

/**
 * Things Pip wears. Drawn in Pip's own 100-unit grid, inside the figure so
 * they hop and tilt with every expression.
 */
export function PipCostume({ costume }: { costume: Costume }) {
  switch (costume) {
    case "none":
      return null;
    case "chef":
      return (
        <g data-part="costume">
          <path d="M30 18 C 16 14 18 -6 34 -2 C 36 -16 58 -18 62 -4 C 78 -10 88 8 70 18 Z" fill="#fff" {...ink} />
          <rect x="30" y="15" width="40" height="11" rx="2" fill="#fff" {...ink} />
          <path d="M40 4 C 41 9 41 12 40 15 M56 4 C 55 9 55 12 56 15" fill="none" {...ink} strokeWidth={1.6} />
        </g>
      );
    case "party":
      return (
        <g data-part="costume" transform="rotate(-14 48 26)">
          <path d="M33 27 L 47 -16 L 63 25 Z" fill="var(--tomato)" {...ink} />
          <path d="M38 12 L 57 9 M42 0 L 52 -2" fill="none" stroke="var(--butter)" strokeWidth={4} strokeLinecap="round" />
          <circle cx="47" cy="-18" r="5.5" fill="var(--butter)" {...ink} />
        </g>
      );
    case "bib":
      return (
        <g data-part="costume">
          <path d="M22 88 Q 50 96 78 88 L 50 114 Z" fill="#fff" {...ink} />
          <path d="M34 92 L 46 104 M50 94 L 56 102 M64 92 L 54 104" fill="none" stroke="var(--tomato)" strokeWidth={3} />
          <circle cx="24" cy="88" r="4" fill="#fff" {...ink} />
          <circle cx="76" cy="88" r="4" fill="#fff" {...ink} />
        </g>
      );
    case "shades":
      return (
        <g data-part="costume">
          <path d="M22 64 H 78" fill="none" stroke="var(--butter)" strokeWidth={3} />
          <rect x="24" y="61" width="23" height="16" rx="6" fill="#1c1a17" stroke="var(--butter)" strokeWidth={3} />
          <rect x="53" y="61" width="23" height="16" rx="6" fill="#1c1a17" stroke="var(--butter)" strokeWidth={3} />
          <path d="M29 66 L 35 66 M58 66 L 64 66" stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
        </g>
      );
  }
}
