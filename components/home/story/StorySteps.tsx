import type { CSSProperties } from "react";
import { cx } from "@/lib/format";
import { ACTS } from "./storyModel";
import styles from "./StorySteps.module.css";

/**
 * A giant act number that rolls over like a flip clock, then the act's
 * words. Every act stays in the DOM for screen readers; only one shows.
 */
export function StorySteps({ act }: { act: number }) {
  return (
    <div className={styles.copy}>
      <h2 id="story-title" className={`hand ${styles.kicker}`}>
        How Forest works
      </h2>
      <p className={styles.number} aria-hidden="true">
        <span className={styles.zero}>0</span>
        <span className={styles.roll}>
          <span className={styles.digits} style={{ "--act": act } as CSSProperties}>
            {ACTS.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </span>
        </span>
        <span className={styles.of}>/0{ACTS.length}</span>
      </p>
      <ol className={styles.acts}>
        {ACTS.map((a, i) => (
          <li key={a.title} className={cx(styles.act, i === act && styles.on)} aria-current={i === act ? "step" : undefined}>
            <h3 className={`headline ${styles.title}`}>
              {a.title} <em>{a.accent}</em>
            </h3>
            <p className={styles.body}>{a.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
