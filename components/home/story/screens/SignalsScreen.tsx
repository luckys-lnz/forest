import type { CSSProperties } from "react";
import { discoveries } from "@/lib/data/discoveries";
import { clamp } from "../storyModel";
import s from "./screen.module.css";
import styles from "./SignalsScreen.module.css";

/** The five dishes couples most often go back for, from Forest's data. */
const TOP = discoveries
  .filter((d) => d.signals.couples >= 1000)
  .sort((x, y) => y.signals.again - x.signals.again)
  .slice(0, 5);

/** Act two: answers pile up and the bars grow as you scroll. */
export function SignalsScreen({ t }: { t: number }) {
  return (
    <>
      <p className={s.bar}>
        This week <small>Forest</small>
      </p>
      <p className={s.h}>
        Going back <em>for</em>
      </p>
      <ol className={styles.bars}>
        {TOP.map((d, i) => {
          // Each bar starts a little after the one above it.
          const grow = clamp((t - i * 0.08) / 0.5);
          const value = Math.round(d.signals.again * 100 * grow);
          return (
            <li key={d.id} className={styles.row}>
              <span className={styles.name}>{d.name}</span>
              <span className={styles.track}>
                <span className={styles.fill} style={{ "--w": d.signals.again * grow, "--i": i } as CSSProperties} />
              </span>
              <span className={styles.value}>{value}%</span>
            </li>
          );
        })}
      </ol>
      <p className={s.small}>Share of couples who&apos;d have it again. Preview data while Forest is in beta.</p>
    </>
  );
}
