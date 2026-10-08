import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/format";
import { LogScreen } from "./screens/LogScreen";
import { MiddleScreen } from "./screens/MiddleScreen";
import { PlanScreen } from "./screens/PlanScreen";
import { SignalsScreen } from "./screens/SignalsScreen";
import styles from "./StoryStage.module.css";

type Screen = (props: { t: number }) => ReactNode;
const SCREENS: readonly Screen[] = [LogScreen, SignalsScreen, MiddleScreen, PlanScreen];

/**
 * A phone running Forest. Each act has its own screen; the active one is
 * driven by how far through the act the reader has scrolled (t, 0–1), so
 * scrolling back plays it in reverse. Decorative: the words carry the story.
 */
export function StoryStage({ act, local }: { act: number; local: number }) {
  return (
    <div className={styles.phone} aria-hidden="true">
      <span className={styles.notch} />
      <div className={styles.screen}>
        {SCREENS.map((Screen, i) => {
          const t = i === act ? local : i < act ? 1 : 0;
          return (
            <div
              key={i}
              className={cx(styles.view, i === act && styles.on, i < act && styles.past)}
              style={{ "--t": t } as CSSProperties}
            >
              <Screen t={t} />
            </div>
          );
        })}
      </div>
      <span className={styles.home} />
    </div>
  );
}
