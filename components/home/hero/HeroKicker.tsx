import { Scribble } from "@/components/fun/Scribble";
import { cx } from "@/lib/format";
import styles from "./HeroKicker.module.css";

/** The question every couple knows, crossed out, with a note in the margin. */
export function HeroKicker({ className }: { className?: string }) {
  return (
    <p className={cx(styles.kicker, className)}>
      <span className={styles.question}>
        <span>&ldquo;What do you want to eat?&rdquo;</span>
        <Scribble kind="underline" className={styles.strike} color="var(--tomato)" delay={500} />
      </span>
      <span className={`hand ${styles.never}`}>
        never again
        <Scribble kind="arrow" className={styles.arrow} delay={900} />
      </span>
    </p>
  );
}
