import type { CSSProperties } from "react";
import { FoodSticker } from "@/components/fun/food/FoodSticker";
import { cx } from "@/lib/format";
import { placeStickers } from "./place";
import styles from "./StoryStickers.module.css";

/**
 * Each act's food drifts up past the phone at a different speed per lane,
 * driven by scroll, so the backdrop has depth. Decorative.
 */
export function StoryStickers({ act, local }: { act: number; local: number }) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {placeStickers(act, local).map((s) => (
        <span
          key={s.key}
          className={cx(styles.sticker, s.on && styles.on)}
          style={
            {
              "--left": s.left,
              "--y": `${s.y}vh`,
              "--s": s.scale,
              "--spin": `${s.spin}deg`,
            } as CSSProperties
          }
        >
          <FoodSticker kind={s.kind} size={96} />
        </span>
      ))}
    </div>
  );
}
