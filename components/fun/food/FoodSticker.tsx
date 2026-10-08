import { useId, type CSSProperties } from "react";
import { cx } from "@/lib/format";
import { FOODS, type FoodKind } from "./drawings";
import styles from "./FoodSticker.module.css";

type Props = {
  kind: FoodKind;
  size?: number;
  tilt?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * One food drawing, die-cut: a fat white edge drawn under the black ink,
 * then a hard shadow. Always decorative; meaning lives in nearby text.
 */
export function FoodSticker({ kind, size = 96, tilt = 0, className, style }: Props) {
  const id = `food-${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="-8 -8 116 116"
      width={size}
      height={size}
      className={cx(styles.food, className)}
      style={{ "--tilt": `${tilt}deg`, ...style } as CSSProperties}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id={id}>{FOODS[kind]}</g>
      </defs>
      <use href={`#${id}`} className={styles.edge} />
      <use href={`#${id}`} className={styles.ink} />
    </svg>
  );
}
