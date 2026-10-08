"use client";

import { useId } from "react";
import type { MoodId } from "@/lib/data/moods";
import { cx } from "@/lib/format";
import { MoodChips } from "./MoodChips";
import styles from "./MoodSide.module.css";

type Props = {
  side: "a" | "b";
  name: string;
  value: MoodId | null;
  onPick: (mood: MoodId, from: HTMLElement) => void;
  /** Lets each partner rename their side ("You" → "Sam"). */
  onRename?: (name: string) => void;
  /** Show each mood's one-line meaning under its name. */
  detailed?: boolean;
};

const fallbackName = { a: "You", b: "Them" } as const;

/** One partner's side of the table: their name and their mood. */
export function MoodSide({ side, name, value, onPick, onRename, detailed }: Props) {
  const headingId = useId();
  const inputId = useId();
  return (
    <div className={cx(styles.side, styles[side])} role="group" aria-labelledby={headingId}>
      <div className={styles.head}>
        {onRename && (
          <>
            <label htmlFor={inputId} className="sr-only">
              {side === "a" ? "First person's name" : "Second person's name"}
            </label>
            <input
              id={inputId}
              className={styles.nameInput}
              value={name}
              maxLength={16}
              onChange={(e) => onRename(e.target.value)}
              onBlur={(e) => !e.target.value.trim() && onRename(fallbackName[side])}
            />
          </>
        )}
        <p id={headingId} className={cx(styles.label, onRename && "sr-only")}>
          {name}
        </p>
      </div>
      <MoodChips value={value} onPick={onPick} align={side === "a" ? "end" : "start"} detailed={detailed} />
    </div>
  );
}
