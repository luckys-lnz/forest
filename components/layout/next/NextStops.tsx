import Link from "next/link";
import type { CSSProperties } from "react";
import { FoodSticker } from "@/components/fun/food/FoodSticker";
import { stopsFor, type NextFrom } from "./stops";
import styles from "./NextStops.module.css";

/**
 * "Where to next?": three onward routes at the end of a page, so no page
 * is a dead end. Each card is a sticker you can't help poking.
 */
export function NextStops({ from }: { from: NextFrom }) {
  return (
    <nav className={`on-cream surface ${styles.next}`} aria-labelledby={`next-${from}`}>
      <div className="wrap">
        <h2 id={`next-${from}`} className={`headline ${styles.title}`}>
          Where to <em>next?</em>
        </h2>
        <ul role="list" className={styles.list}>
          {stopsFor(from).map((s, i) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className={styles.card}
                style={{ "--c": s.color, "--tilt": `${[-2, 1.5, -1][i]}deg` } as CSSProperties}
              >
                <FoodSticker kind={s.food} size={56} className={styles.food} />
                <span className={styles.name}>{s.title}</span>
                <span className={styles.line}>{s.line}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
