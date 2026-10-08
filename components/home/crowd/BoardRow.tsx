import Link from "next/link";
import type { CSSProperties } from "react";
import type { BoardRow as Row } from "@/lib/crowd";
import { Sparkline, SplitBar } from "./Signals";
import styles from "./BoardRow.module.css";

/** One signal: the dish, the single number that earns its place, and why. */
export function BoardRow({ row, index, showSplit }: { row: Row; index: number; showSplit: boolean }) {
  return (
    <li className={styles.row} style={{ "--i": index } as CSSProperties}>
      <div className={styles.dish}>
        <h3 className={styles.name}>{row.name}</h3>
        <p className={styles.cuisine}>{row.cuisine}</p>
      </div>
      <div className={styles.figure}>
        <span className={styles.big}>{row.figure}</span>
        <span className={styles.label}>{row.figureLabel}</span>
        {row.weekly && <Sparkline values={row.weekly} />}
        {showSplit && row.split !== undefined && <SplitBar split={row.split} />}
      </div>
      <p className={styles.reason}>{row.reason}</p>
      <Link href={row.href} className={styles.try} aria-label={`Try ${row.name} with your moods`}>
        Try it
      </Link>
    </li>
  );
}
