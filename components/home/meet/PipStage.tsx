"use client";

import { useRef, useState, type RefObject } from "react";
import { Pip, type Costume } from "@/components/pip/Pip";
import { Button } from "@/components/ui/Button";
import { discoveries } from "@/lib/data/discoveries";
import { PipWardrobe } from "./PipWardrobe";
import { usePipPresence } from "./usePipPresence";
import styles from "./PipStage.module.css";

const NOTES = discoveries.map((d) => ({ dish: d.name, note: d.pip }));

/** Big Pip with a speech bubble. Ask, and Pip shares something couples noticed. */
export function PipStage({ area }: { area: RefObject<HTMLElement | null> }) {
  const eyes = useRef<HTMLDivElement>(null);
  const { look, mood, perk } = usePipPresence(area, eyes);
  const [i, setI] = useState(-1);
  const [costume, setCostume] = useState<Costume>("none");
  const current = i >= 0 ? NOTES[i] : null;

  function ask() {
    perk();
    setI((n) => (n + 1) % NOTES.length);
  }

  return (
    <div className={styles.stage}>
      <div ref={eyes} className={styles.pipBox}>
        <button type="button" className={styles.pipButton} onClick={ask} aria-label="Ask Pip for something worth knowing">
          <Pip mood={mood} look={look} size={180} costume={costume} sticker />
        </button>
        <span className={styles.zz} data-on={mood === "sleepy"} aria-hidden="true">
          z
        </span>
      </div>
      <div className={styles.bubble} aria-live="polite">
        {current ? (
          <p key={i} className={styles.note}>
            <span className={styles.dish}>{current.dish}</span>
            {current.note}
          </p>
        ) : (
          <p className={styles.note}>Ask me something about tonight&apos;s food. I&apos;ll tell you what other couples noticed.</p>
        )}
      </div>
      <Button variant="secondary" onClick={ask}>
        {current ? "Tell me another" : "Ask Pip"}
      </Button>
      <PipWardrobe
        value={costume}
        onChange={(c) => {
          setCostume(c);
          perk();
        }}
      />
    </div>
  );
}
