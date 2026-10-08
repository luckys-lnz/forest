import type { CSSProperties } from "react";
import { FoodSticker } from "@/components/fun/food/FoodSticker";
import type { FoodKind } from "@/components/fun/food/drawings";
import { moodList, type MoodId } from "@/lib/data/moods";
import { cx } from "@/lib/format";
import { MOOD_COLOR } from "./menu";
import styles from "./MoodPicker.module.css";

const ICON: Record<MoodId, FoodKind> = {
  cozy: "noodles",
  curious: "dumpling",
  light: "sushi",
  fiery: "chili",
  indulgent: "pizza",
  quick: "taco",
};

/** Six mood stickers. Pressing one re-sets the whole board. */
export function MoodPicker({ value, onChange }: { value: MoodId; onChange: (m: MoodId) => void }) {
  return (
    <div className={styles.picker} role="group" aria-label="Pick a mood">
      {moodList.map((m, i) => (
        <button
          key={m.id}
          type="button"
          aria-pressed={value === m.id}
          className={cx(styles.mood, value === m.id && styles.on)}
          style={{ "--c": MOOD_COLOR[m.id], "--tilt": `${i % 2 ? 3 : -3}deg` } as CSSProperties}
          onClick={() => onChange(m.id)}
        >
          <FoodSticker kind={ICON[m.id]} size={34} className={styles.icon} />
          <span className={styles.text}>
            <span className={styles.label}>{m.label}</span>
            <span className={styles.hint}>{m.hint}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
