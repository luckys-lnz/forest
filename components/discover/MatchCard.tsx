import Link from "next/link";
import { Pip } from "@/components/pip/Pip";
import { FoodImage } from "@/components/ui/FoodImage";
import { moods, type MoodId } from "@/lib/data/moods";
import { getProduct } from "@/lib/data/products";
import { priceLabel, verdictLabel, type Match } from "@/lib/discover";
import { cx, formatCount } from "@/lib/format";
import { FitTug } from "./FitTug";
import styles from "./MatchCard.module.css";

type Props = {
  match: Match;
  moodA: MoodId;
  moodB: MoodId;
  nameA: string;
  nameB: string;
  /** "feature" is the big card; "compact" fits the hero. */
  size?: "feature" | "compact";
  priority?: boolean;
  className?: string;
};

export function MatchCard({ match, moodA, moodB, nameA, nameB, size = "feature", priority, className }: Props) {
  const d = match.discovery;
  const product = d.product ? getProduct(d.product) : undefined;
  return (
    <article className={cx(styles.card, styles[size], className)} aria-labelledby={`match-${d.id}`}>
      <div className={styles.media}>
        <FoodImage
          path={d.image.path}
          alt={d.image.alt}
          sizes={size === "compact" ? "(max-width: 768px) 92vw, 380px" : "(max-width: 768px) 92vw, 560px"}
          priority={priority}
        />
        <p className={styles.verdict}>{verdictLabel(match.verdict, nameA, nameB)}</p>
      </div>

      <div className={styles.body}>
        <p className={styles.kicker}>
          {d.cuisine}
          <span aria-hidden="true"> / </span>
          {d.minutes} min
          <span aria-hidden="true"> / </span>
          {priceLabel(d.price)}
        </p>
        <h3 id={`match-${d.id}`} className={styles.name}>
          {d.name}
        </h3>
        {size === "feature" && <p className={styles.blurb}>{d.blurb}</p>}

        <FitTug
          a={{ name: nameA, mood: moods[moodA].label.toLowerCase(), fit: match.fitA }}
          b={{ name: nameB, mood: moods[moodB].label.toLowerCase(), fit: match.fitB }}
        />

        <p className={styles.crowd}>
          About <strong className="num">{formatCount(Math.max(12, match.likeYou))}</strong> couples who felt{" "}
          {moodA === moodB ? `${moods[moodA].label.toLowerCase()} together` : `${moods[moodA].label.toLowerCase()} and ${moods[moodB].label.toLowerCase()}`}{" "}
          ate this. <strong className="num">{Math.round(d.signals.again * 100)}%</strong> would have it again.
        </p>

        {size === "feature" && (
          <div className={styles.note}>
            <Pip size={30} mood="curious" tone="on-light" />
            <p>{d.pip}</p>
          </div>
        )}

        {size === "feature" && product && (
          <Link href={`/shop/${product.slug}`} className={styles.product}>
            Make it at home with {product.name}
          </Link>
        )}
      </div>
    </article>
  );
}
