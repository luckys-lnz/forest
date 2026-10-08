import Link from "next/link";
import { articleCategories, authors, type Article } from "@/lib/data/articles";
import { formatDate } from "@/lib/format";
import styles from "./ArticleHeader.module.css";

export function ArticleHeader({ article: a }: { article: Article }) {
  const author = authors[a.author];
  return (
    <header className={`wrap ${styles.header}`}>
      <Link href={`/journal?category=${a.category}`} className={styles.cat}>
        {articleCategories[a.category]}
      </Link>
      <h1 className={`headline ${styles.title}`}>{a.title}</h1>
      <p className={styles.dek}>{a.dek}</p>
      <p className={styles.meta}>
        By {author.name}, {author.role.toLowerCase()}. <time dateTime={a.published}>{formatDate(a.published)}</time>.{" "}
        {a.readMinutes} minute read.
      </p>
    </header>
  );
}
