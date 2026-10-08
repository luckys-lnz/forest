import type { Availability as A } from "@/lib/data/products";
import { cx } from "@/lib/format";
import styles from "./Availability.module.css";

const restockFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" });

export function availabilityText(a: A) {
  switch (a.state) {
    case "in-stock":
      return "In stock";
    case "low":
      return `Only ${a.left} left`;
    case "sold-out":
      return a.restock ? `Sold out. Back ${restockFmt.format(new Date(a.restock))}` : "Sold out";
    case "digital":
      return "Sent by email";
  }
}

export function Availability({ value, className }: { value: A; className?: string }) {
  return (
    <span className={cx(styles.badge, styles[value.state], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {availabilityText(value)}
    </span>
  );
}
