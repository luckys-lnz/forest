"use client";

import { useInView } from "@/lib/hooks/motion";
import { cx } from "@/lib/format";
import styles from "./Scribble.module.css";

/** Hand-drawn marks, as if someone went over the menu with a marker. */
const MARKS = {
  underline: { viewBox: "0 0 300 24", d: "M4 16 C 60 6 130 4 200 9 C 240 12 270 14 296 8" },
  circle: {
    viewBox: "0 0 300 120",
    d: "M150 8 C 60 6 8 30 10 62 C 12 98 90 114 168 110 C 246 106 292 82 290 52 C 288 22 220 6 120 14",
  },
  arrow: { viewBox: "0 0 120 90", d: "M8 10 C 30 60 60 76 104 70 M88 56 L 106 70 L 86 84" },
  squiggle: { viewBox: "0 0 300 30", d: "M4 18 Q 24 2 44 16 T 84 16 T 124 16 T 164 16 T 204 16 T 244 16 T 296 14" },
  star: { viewBox: "0 0 60 60", d: "M30 4 L 36 24 L 56 26 L 40 38 L 46 56 L 30 45 L 14 56 L 20 38 L 4 26 L 24 24 Z" },
} as const;

export type ScribbleKind = keyof typeof MARKS;

type Props = {
  kind: ScribbleKind;
  className?: string;
  /** Stroke colour; defaults to the current text colour. */
  color?: string;
  delay?: number;
};

/** Draws itself the first time it scrolls into view. Purely decorative. */
export function Scribble({ kind, className, color = "currentColor", delay = 0 }: Props) {
  const [ref, inView] = useInView<SVGSVGElement>({ threshold: 0.6 });
  const mark = MARKS[kind];
  return (
    <svg
      ref={ref}
      viewBox={mark.viewBox}
      className={cx(styles.scribble, inView && styles.drawn, className)}
      style={{ transitionDelay: `${delay}ms` }}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path d={mark.d} pathLength={1} stroke={color} style={{ transitionDelay: `${delay}ms` }} />
    </svg>
  );
}
