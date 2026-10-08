import type { ReactNode } from "react";
import styles from "./template.module.css";

/**
 * Re-mounts on every navigation, so each page arrives with the same short,
 * calm settle-in. Disabled for reduced motion via the global rule.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.page}>{children}</div>;
}
