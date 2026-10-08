import { cx } from "@/lib/format";
import type { Scenario } from "./scenarios";
import styles from "./ScenarioList.module.css";

type Props = { scenarios: readonly Scenario[]; active: number; onSelect: (i: number) => void };

export function ScenarioList({ scenarios, active, onSelect }: Props) {
  return (
    <ul role="list" className={styles.list} aria-label="Situations">
      {scenarios.map((sc, i) => (
        <li key={sc.id}>
          <button
            type="button"
            className={cx(styles.item, i === active && styles.on)}
            aria-pressed={i === active}
            onClick={() => onSelect(i)}
          >
            <span className={styles.pair} aria-hidden="true">
              <span className={styles.seedA} />
              <span className={styles.seedB} />
            </span>
            {sc.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
