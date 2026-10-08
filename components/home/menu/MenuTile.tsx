import Link from "next/link";
import type { CSSProperties } from "react";
import { FoodImage } from "@/components/ui/FoodImage";
import { Pip } from "@/components/pip/Pip";
import { cx } from "@/lib/format";
import type { MoodId } from "@/lib/data/moods";
import { discoverHref, type MenuItem } from "./menu";
import m from "./MenuMeter.module.css";
import styles from "./MenuTile.module.css";

type Props = { item: MenuItem; mood: MoodId; rank: number; lit: boolean; picked: boolean };

const pct = (n: number) => `${Math.round(n * 100)}%`;

/** One dish on the board: its photo, how well it fits the mood, and the crowd's verdict. */
export function MenuTile({ item, mood, rank, lit, picked }: Props) {
  const { dish, fit } = item;
  return (
    <li data-flip={dish.id} className={cx(styles.tile, lit && styles.lit, picked && styles.picked)}>
      <span className={styles.rank} aria-hidden="true">
        {rank}
      </span>
      <span className={styles.photo}>
        <FoodImage path={dish.image.path} alt={dish.image.alt} sizes="(min-width: 64rem) 28vw, 45vw" />
      </span>
      <div className={styles.info}>
        <h3 className={styles.name}>
          <Link href={discoverHref(mood, item)} className={styles.link}>
            {dish.name}
          </Link>
        </h3>
        <p className={styles.cuisine}>{dish.cuisine}</p>
        <p className={m.meter}>
          <span className={m.track} aria-hidden="true">
            <span style={{ "--fit": fit } as CSSProperties} />
          </span>
          <span>
            <strong>{pct(fit)}</strong> mood fit
          </span>
        </p>
        <p className={styles.crowd}>
          {pct(dish.signals.again)} would go again · {dish.signals.couples.toLocaleString("en-US")} couples
        </p>
      </div>
      {picked && (
        <span className={m.pick}>
          <Pip size={40} mood="happy" costume="party" tone="on-light" sticker />
          <span className="hand">Pip&apos;s pick!</span>
        </span>
      )}
    </li>
  );
}
