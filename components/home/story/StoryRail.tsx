import type { CSSProperties } from "react";
import { cx } from "@/lib/format";
import { ACTS } from "./storyModel";
import styles from "./StoryRail.module.css";

type Props = { act: number; local: number; onJump: (i: number) => void };

/**
 * The four acts as a list you can click to jump to. Each one fills up as
 * you scroll through it, like a progress bar per chapter. On phones it
 * collapses to four bars under the phone.
 */
export function StoryRail({ act, local, onJump }: Props) {
  return (
    <nav className={styles.rail} aria-label="How Forest works, step by step">
      <ol>
        {ACTS.map((a, i) => {
          const fill = i < act ? 1 : i === act ? local : 0;
          return (
            <li key={a.title}>
              <button
                type="button"
                className={cx(styles.item, i === act && styles.on)}
                aria-current={i === act ? "step" : undefined}
                onClick={() => onJump(i)}
              >
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.label}>
                  {a.title} {a.accent}
                </span>
                <span className={styles.bar} style={{ "--fill": fill } as CSSProperties} />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
