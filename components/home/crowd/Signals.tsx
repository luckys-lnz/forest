import type { CSSProperties } from "react";
import styles from "./Signals.module.css";

/** Eight weeks of saves as a line that draws itself when the board scrolls in. */
export function Sparkline({ values }: { values: readonly number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${28 - ((v - min) / (max - min || 1)) * 24}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" className={styles.spark} aria-hidden="true" preserveAspectRatio="none">
      <polyline points={pts} pathLength={1} />
    </svg>
  );
}

/** How often couples split: shiso where they agreed, yolk where they didn't. */
export function SplitBar({ split }: { split: number }) {
  return (
    <span className={styles.split} aria-hidden="true" style={{ "--s": split } as CSSProperties}>
      <span className={styles.agree} />
      <span className={styles.disagree} />
    </span>
  );
}
