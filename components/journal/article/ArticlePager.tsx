import Link from "next/link";
import type { Article } from "@/lib/data/articles";
import styles from "./ArticlePager.module.css";

/** Previous (older) and next (newer) articles. */
export function ArticlePager({ older, newer }: { older: Article | null; newer: Article | null }) {
  return (
    <nav aria-label="More articles" className={`wrap ${styles.pager}`}>
      {older ? (
        <Link href={`/journal/${older.slug}`} className={styles.link} rel="prev">
          <span className={styles.label}>Previous</span>
          <span className={styles.title}>{older.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {newer && (
        <Link href={`/journal/${newer.slug}`} className={`${styles.link} ${styles.next}`} rel="next">
          <span className={styles.label}>Next</span>
          <span className={styles.title}>{newer.title}</span>
        </Link>
      )}
    </nav>
  );
}
