import type { CSSProperties } from "react";
import { moodList, type MoodId } from "@/lib/data/moods";
import { cx } from "@/lib/format";
import styles from "./MoodChips.module.css";

type Props = {
  value: MoodId | null;
  onPick: (mood: MoodId, from: HTMLElement) => void;
  /** Which edge the chips lean toward; they slide in from that side. */
  align: "start" | "end";
  detailed?: boolean;
};

/** Six moods as toggle buttons. Exactly one can be pressed per side. */
export function MoodChips({ value, onPick, align, detailed }: Props) {
  return (
    <ul role="list" className={cx(styles.chips, styles[align], detailed && styles.detailed)}>
      {moodList.map((m, i) => {
        const on = value === m.id;
        return (
          <li key={m.id} style={{ "--i": i } as CSSProperties}>
            <button
              type="button"
              className={cx(styles.chip, on && styles.on)}
              aria-pressed={on}
              onClick={(e) => onPick(m.id, e.currentTarget)}
            >
              <span className={styles.label}>{m.label}</span>
              {detailed && <span className={styles.hint}>{m.hint}</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
