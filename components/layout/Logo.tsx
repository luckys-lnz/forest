import { cx } from "@/lib/format";
import styles from "./Logo.module.css";

/** Wordmark: lowercase serif with Pip's leaf sprouting from the t. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx(styles.logo, className)}>
      <span className={styles.word}>forest</span>
      <svg className={styles.leaf} viewBox="0 0 34 16" aria-hidden="true" focusable="false">
        <path d="M1 15 C 2 10 4 6 8 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 5 C 12 -2 26 -2 33 4 C 26 11 14 12 7 5 Z" fill="var(--shiso)" />
      </svg>
    </span>
  );
}
