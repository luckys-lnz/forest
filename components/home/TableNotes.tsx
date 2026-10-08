import Link from "next/link";
import { tableNotes } from "@/lib/data/notes";
import styles from "./TableNotes.module.css";

/**
 * Social proof that's honest about being early. Shows real, consented notes
 * when there are some; until then, asks beta couples for the first ones.
 */
export function TableNotes() {
  if (tableNotes.length === 0) {
    return (
      <div className={styles.ask}>
        <p className={styles.askTitle}>Notes from the table</p>
        <p className={styles.askBody}>
          Forest is in beta, so we&apos;re still collecting the first stories from couples. Had a good night because of a
          match? We&apos;d love to hear what you ate and how it went.
        </p>
        <Link href="/contact?topic=other" className={styles.askLink}>
          Send us your story
        </Link>
      </div>
    );
  }
  return (
    <ul role="list" className={styles.notes}>
      {tableNotes.map((n) => (
        <li key={n.id} className={styles.note}>
          <blockquote>
            <p>{n.quote}</p>
          </blockquote>
          <p className={styles.credit}>
            {n.credit}
            {n.dish ? `, after ${n.dish.toLowerCase()}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
