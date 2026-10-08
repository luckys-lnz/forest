import { FoodImage } from "@/components/ui/FoodImage";
import { getDiscovery } from "@/lib/data/discoveries";
import s from "./screen.module.css";
import styles from "./LogScreen.module.css";

const dish = getDiscovery("tonkotsu-ramen");

const QUESTIONS = [
  { q: "Have it again?", a: 0.15, b: 0.3 },
  { q: "Did you both like it?", a: 0.45, b: 0.6 },
] as const;

/** Act one: the morning after, two questions, two taps each. */
export function LogScreen({ t }: { t: number }) {
  if (!dish) return null;
  return (
    <>
      <p className={s.bar}>
        Last night <small>Forest</small>
      </p>
      <div className={s.card}>
        <span className={s.photo}>
          <FoodImage path={dish.image.path} alt="" sizes="240px" />
        </span>
        <p className={s.h}>{dish.name}</p>
        <p className={s.small}>{dish.cuisine}, eaten together</p>
      </div>
      {QUESTIONS.map((row) => (
        <div key={row.q} className={styles.question}>
          <p className={styles.q}>{row.q}</p>
          <p className={styles.answers}>
            <span className={`${s.pill} ${s.a}`} data-on={t > row.a}>
              You: yes
            </span>
            <span className={`${s.pill} ${s.b}`} data-on={t > row.b}>
              Them: yes
            </span>
          </p>
        </div>
      ))}
      <p className={styles.stamp} data-on={t > 0.78}>
        Logged! +1 to the crowd
      </p>
    </>
  );
}
