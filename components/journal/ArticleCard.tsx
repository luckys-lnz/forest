import Link from "next/link";
import { FoodImage } from "@/components/ui/FoodImage";
import { articleCategories, authors, type Article } from "@/lib/data/articles";
import { cx, formatDate } from "@/lib/format";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article, size = "md", priority }: { article: Article; size?: "lg" | "md" | "sm"; priority?: boolean }) {
  return (
    <article className={cx(styles.card, styles[size])}>
      <Link href={`/journal/${article.slug}`} className={styles.link}>
        <span className={styles.media}>
          <FoodImage
            path={article.hero.path}
            alt={article.hero.alt}
            priority={priority}
            sizes={size === "lg" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </span>
        <span className={styles.text}>
          <span className={styles.cat}>{articleCategories[article.category]}</span>
          <span className={styles.title}>{article.title}</span>
          {size !== "sm" && <span className={styles.dek}>{article.dek}</span>}
          <span className={styles.meta}>
            {authors[article.author].name}, <time dateTime={article.published}>{formatDate(article.published)}</time>
          </span>
        </span>
      </Link>
    </article>
  );
}
