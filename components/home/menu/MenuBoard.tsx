"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { MoodId } from "@/lib/data/moods";
import { moods } from "@/lib/data/moods";
import { site } from "@/lib/site";
import { MenuTile } from "./MenuTile";
import { MOOD_COLOR, menuFor } from "./menu";
import { MoodPicker } from "./MoodPicker";
import { useChase } from "./useChase";
import { useFlip } from "./useFlip";
import styles from "./MenuBoard.module.css";

/**
 * Tonight's menu, by mood. Pick a mood and the board re-ranks itself from
 * real couple data, tiles gliding to their new places. Still stuck?
 * "Pick for us" runs an arcade light over the board and lands on one.
 */
export function MenuBoard() {
  const [mood, setMood] = useState<MoodId>("cozy");
  const items = useMemo(() => menuFor(mood), [mood]);
  const { chase, start, reset } = useChase(items.length);
  const board = useFlip<HTMLOListElement>(mood);
  const picked = chase.phase === "landed" ? items[chase.lit] : null;

  // On narrow screens the board sits below the button: bring it into view for the show.
  function pickForUs() {
    start();
    if (window.matchMedia("(max-width: 63.99rem)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      board.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  }

  return (
    <div className={styles.menu} style={{ "--mood": MOOD_COLOR[mood] } as CSSProperties}>
      <div className={styles.side}>
        <MoodPicker
          value={mood}
          onChange={(m) => {
            reset();
            setMood(m);
          }}
        />
        <button type="button" className={styles.lucky} onClick={pickForUs} aria-disabled={chase.phase === "running"}>
          {chase.phase === "running" ? "Choosing…" : picked ? "Pick again" : "Can't decide? Pick for us"}
        </button>
        <p className={styles.status} aria-live="polite">
          {picked
            ? `Pip picked ${picked.dish.name}. Tap it to check it works for both of you.`
            : `Top six for “${moods[mood].label}”, ranked by how couples in that mood rated them.`}
        </p>
      </div>

      <div className={styles.boardWrap}>
        <ol ref={board} className={styles.board} aria-label={`Tonight's menu for a ${moods[mood].label.toLowerCase()} mood`}>
          {items.map((item, i) => (
            <MenuTile
              key={item.dish.id}
              item={item}
              mood={mood}
              rank={i + 1}
              lit={chase.phase === "running" && chase.lit === i}
              picked={picked === item}
            />
          ))}
        </ol>
        {site.previewData && <p className={styles.note}>Figures come from Forest&apos;s preview dataset while we&apos;re in beta.</p>}
      </div>
    </div>
  );
}
