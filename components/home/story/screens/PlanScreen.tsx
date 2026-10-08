import { FoodSticker } from "@/components/fun/food/FoodSticker";
import { FoodImage } from "@/components/ui/FoodImage";
import { PLAN } from "../storyModel";
import s from "./screen.module.css";
import styles from "./PlanScreen.module.css";

const pct = (n: number) => `${Math.round(n * 100)}%`;

/** Act four: the dinner, the numbers behind it, and the button you both press. */
export function PlanScreen({ t }: { t: number }) {
  const booked = t > 0.5;
  return (
    <>
      <p className={s.bar}>
        Tonight <small>Forest</small>
      </p>
      <div className={`${s.card} ${styles.card}`}>
        <span className={`${s.photo} ${styles.photo}`}>
          <FoodImage path={PLAN.image.path} alt="" sizes="260px" />
        </span>
        <p className={s.h}>{PLAN.name}</p>
        <p className={s.small}>{PLAN.cuisine}</p>
        <dl className={styles.stats}>
          <div>
            <dt>would go again</dt>
            <dd>{pct(PLAN.signals.again)}</dd>
          </div>
          <div>
            <dt>couples logged it</dt>
            <dd>{PLAN.signals.couples.toLocaleString("en-US")}</dd>
          </div>
        </dl>
      </div>
      <p className={styles.button} data-on={booked}>
        {booked ? "It's a plan ✓" : "Make it tonight's plan"}
      </p>
      <span className={styles.confetti} data-on={t > 0.6}>
        <FoodSticker kind="dumpling" size={40} tilt={-14} />
        <FoodSticker kind="egg" size={34} tilt={10} />
        <FoodSticker kind="chili" size={36} tilt={20} />
      </span>
    </>
  );
}
