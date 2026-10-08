import type { CSSProperties } from "react";
import type { Match } from "@/lib/discover";
import styles from "./MoreMatches.module.css";

type Props = { matches: readonly Match[]; current: Match | null; onChoose: (m: Match) => void; limit?: number };

/** The runners-up. Choosing one promotes it to the main card. */
export function MoreMatches({ matches, current, onChoose, limit = 8 }: Props) {
  const rest = matches.slice(0, limit).filter((m) => m !== current);
  if (rest.length === 0) return null;
  return (
    <section className={styles.more} aria-labelledby="more-matches">
      <h2 id="more-matches" className={styles.title}>
        Everything else that works for you both
      </h2>
      <ol className={styles.list}>
        {rest.map((m, i) => {
          const pct = Math.round(m.score * 100);
          return (
            <li key={m.discovery.id} style={{ "--i": i } as CSSProperties}>
              <button type="button" className={styles.item} onClick={() => onChoose(m)}>
                <span className={styles.name}>{m.discovery.name}</span>
                <span className={styles.meta}>
                  {m.discovery.cuisine}, {m.discovery.minutes} min
                </span>
                <span className={styles.fit} role="img" aria-label={`${pct}% fit for you both`}>
                  <span style={{ width: `${pct}%` }} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
