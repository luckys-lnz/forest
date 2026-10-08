import type { Ref } from "react";
import { Button } from "@/components/ui/Button";
import type { MoodId } from "@/lib/data/moods";
import type { Match } from "@/lib/discover";
import { cx } from "@/lib/format";
import { MatchCard } from "./MatchCard";
import styles from "./MatchStage.module.css";
import type { Phase } from "./useMatchmaker";

type Props = {
  phase: Phase;
  top: Match | null;
  a: MoodId | null;
  b: MoodId | null;
  nameA: string;
  nameB: string;
  size: "feature" | "compact";
  onClearFilters: () => void;
  ref?: Ref<HTMLDivElement>;
};

/**
 * The middle of the table. Four states, each with its own picture:
 * two empty plates, Pip thinking, a dealt card, or nothing fits.
 */
export function MatchStage({ phase, top, a, b, nameA, nameB, size, onClearFilters, ref }: Props) {
  return (
    <div ref={ref} className={cx(styles.stage, styles[size])} data-phase={phase}>
      {phase === "ready" && top && a && b ? (
        <div className={styles.deal} key={`${top.discovery.id}-${a}-${b}`}>
          <MatchCard match={top} moodA={a} moodB={b} nameA={nameA} nameB={nameB} size={size} />
        </div>
      ) : phase === "thinking" ? (
        <div className={styles.thinking} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : phase === "ready" ? (
        <Button variant="secondary" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : (
        <div className={styles.plates} aria-hidden="true">
          <span className={cx(styles.plate, a && styles.plateA)} />
          <span className={cx(styles.plate, b && styles.plateB)} />
        </div>
      )}
    </div>
  );
}
