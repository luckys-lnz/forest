import Link from "next/link";
import { Pip } from "@/components/pip/Pip";
import { FoodImage } from "@/components/ui/FoodImage";
import { moods } from "@/lib/data/moods";
import type { Match } from "@/lib/discover";
import { cx } from "@/lib/format";
import type { Scenario } from "./scenarios";
import type { Beat } from "./useExchange";
import styles from "./PipAnswer.module.css";

export function PipAnswer({ scenario, match, beat }: { scenario: Scenario; match: Match; beat: Beat }) {
  const d = match.discovery;
  const pair = `${moods[scenario.a].label.toLowerCase()} + ${moods[scenario.b].label.toLowerCase()}`;
  return (
    <div className={cx(styles.answer, beat >= 3 && styles.shown)}>
      <Pip size={52} mood={beat >= 3 ? "happy" : beat === 2 ? "thinking" : "idle"} tone="on-light" />
      <div className={styles.card}>
        <div className={styles.thumb}>
          <FoodImage path={d.image.path} alt={d.image.alt} sizes="120px" />
        </div>
        <div>
          <p className={styles.kicker}>Pip suggests</p>
          <p className={styles.name}>{d.name}</p>
          <p className={styles.why}>{d.pip}</p>
          <Link href={`/discover?a=${scenario.a}&b=${scenario.b}`} className={styles.link}>
            See all matches for {pair}
          </Link>
        </div>
      </div>
    </div>
  );
}
