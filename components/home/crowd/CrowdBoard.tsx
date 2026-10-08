"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Board } from "@/lib/crowd";
import { cx } from "@/lib/format";
import { useInView } from "@/lib/hooks/motion";
import { BoardRow } from "./BoardRow";
import styles from "./CrowdBoard.module.css";

const KEYS: Record<string, (i: number, last: number) => number> = {
  ArrowRight: (i, last) => (i === last ? 0 : i + 1),
  ArrowLeft: (i, last) => (i === 0 ? last : i - 1),
  Home: () => 0,
  End: (_, last) => last,
};

/** Community signals as WAI-ARIA tabs. Rows animate in once, on first view. */
export function CrowdBoard({ boards }: { boards: readonly Board[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const base = useId();
  const board = boards[active];

  function onKey(e: KeyboardEvent) {
    const move = KEYS[e.key];
    if (!move) return;
    e.preventDefault();
    const next = move(active, boards.length - 1);
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div ref={ref} className={cx(styles.board, "board", inView && "board-in")}>
      <div role="tablist" aria-label="Community signals" className={styles.tabs} onKeyDown={onKey}>
        {boards.map((b, i) => (
          <button
            key={b.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${base}-tab-${b.id}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={cx(styles.tab, i === active && styles.on)}
            onClick={() => setActive(i)}
          >
            {b.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${board.id}`}
        className={styles.panel}
        key={board.id}
        tabIndex={0}
      >
        <p className={styles.intro}>{board.intro}</p>
        <ol className={styles.rows}>
          {board.rows.map((r, i) => (
            <BoardRow key={r.id} row={r} index={i} showSplit={board.id === "split"} />
          ))}
        </ol>
      </div>
    </div>
  );
}
