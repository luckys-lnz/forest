import type { CSSProperties } from "react";
import { Pip } from "@/components/pip/Pip";
import { rankMatches } from "@/lib/discover";
import { ease, lerp } from "../storyModel";
import s from "./screen.module.css";
import styles from "./MiddleScreen.module.css";

/** Real ranking for one cozy partner and one curious one. */
const MATCHES = rankMatches("cozy", "curious").slice(0, 5);
/** 0 = all cozy, 1 = all curious: where each dish sits between the two moods. */
const rawLean = (m: (typeof MATCHES)[number]) => m.fitB / (m.fitA + m.fitB);
const leans = MATCHES.map(rawLean);
const [lo, hi] = [Math.min(...leans), Math.max(...leans)];
/** Spread the candidates across the track so their labels have room. */
const lean = (m: (typeof MATCHES)[number]) => 0.12 + ((rawLean(m) - lo) / (hi - lo || 1)) * 0.76;
/** Neighbours on the line take turns: above, below, further above, further below. */
const SLOT = new Map([...MATCHES].sort((x, y) => rawLean(x) - rawLean(y)).map((m, i) => [m.discovery.id, i % 4]));
const TOP = MATCHES[0];
const MEET = lean(TOP);

/** Act three: two moods pull from either end and meet at the best dish. */
export function MiddleScreen({ t }: { t: number }) {
  const k = ease(Math.min(1, t / 0.7));
  const found = t > 0.72;
  return (
    <>
      <p className={s.bar}>
        Tonight <small>Forest</small>
      </p>
      <p className={s.h}>
        Where you <em>meet</em>
      </p>
      <p className={styles.moods}>
        <span className={`${s.pill} ${s.a}`} data-on="true">
          You: Cozy
        </span>
        <span className={`${s.pill} ${s.b}`} data-on="true">
          Them: Curious
        </span>
      </p>
      <div className={styles.track}>
        {MATCHES.map((m) => (
          <span
            key={m.discovery.id}
            className={styles.dish}
            data-top={m === TOP && found}
            data-slot={SLOT.get(m.discovery.id)}
            style={{ "--x": lean(m) } as CSSProperties}
          >
            <span className={styles.label}>{m.discovery.name}</span>
          </span>
        ))}
        <span className={`${styles.seed} ${styles.seedA}`} style={{ "--x": lerp(0, MEET, k) } as CSSProperties} />
        <span className={`${styles.seed} ${styles.seedB}`} style={{ "--x": lerp(1, MEET, k) } as CSSProperties} />
      </div>
      <div className={styles.pick} data-on={found}>
        <Pip size={44} mood="happy" tone="on-light" />
        <p>
          <span className={s.small}>Pip&apos;s pick</span>
          <strong>{TOP.discovery.name}</strong>
        </p>
      </div>
    </>
  );
}
