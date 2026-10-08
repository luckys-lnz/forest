import { moods } from "@/lib/data/moods";
import type { Match } from "@/lib/discover";
import { cx } from "@/lib/format";
import { PipAnswer } from "./PipAnswer";
import type { Scenario } from "./scenarios";
import type { Beat } from "./useExchange";
import styles from "./Exchange.module.css";

/** The conversation: one bubble each, a pause, then Pip. */
export function Exchange({ scenario, match, beat }: { scenario: Scenario; match: Match; beat: Beat }) {
  return (
    <div className={styles.stage} aria-live="polite">
      <p className={cx(styles.bubble, styles.fromA, beat >= 1 && styles.shown)}>
        <span className="sr-only">Partner one: </span>
        {scenario.sayA}
        <span className={styles.mood}>{moods[scenario.a].label}</span>
      </p>
      <p className={cx(styles.bubble, styles.fromB, beat >= 2 && styles.shown)}>
        <span className="sr-only">Partner two: </span>
        {scenario.sayB}
        <span className={styles.mood}>{moods[scenario.b].label}</span>
      </p>
      <PipAnswer scenario={scenario} match={match} beat={beat} />
      <span className={cx(styles.typing, beat === 2 && styles.typingOn)} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}
