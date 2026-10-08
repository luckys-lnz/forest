import type { CSSProperties } from "react";
import styles from "./FitTug.module.css";

type Pull = { readonly name: string; readonly mood: string; readonly fit: number };

/** Two people pulling from the middle: how well a dish fits each of them. */
export function FitTug({ a, b }: { a: Pull; b: Pull }) {
  const pct = (n: number) => `${Math.round(n * 100)}%`;
  return (
    <div
      className={styles.tug}
      role="img"
      aria-label={`${a.name} (${a.mood}) fit ${pct(a.fit)}. ${b.name} (${b.mood}) fit ${pct(b.fit)}.`}
      style={{ "--fa": a.fit, "--fb": b.fit } as CSSProperties}
    >
      <span className={styles.label}>
        {a.name}, {a.mood}
      </span>
      <span className={styles.track}>
        <span className={styles.barA} />
        <span className={styles.mid} />
        <span className={styles.barB} />
      </span>
      <span className={styles.label}>
        {b.name}, {b.mood}
      </span>
    </div>
  );
}
