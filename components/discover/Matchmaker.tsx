"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Pip } from "@/components/pip/Pip";
import type { MoodId } from "@/lib/data/moods";
import { defaultFilters, type DiscoverState } from "@/lib/discover";
import { centerOf, flySeed } from "@/lib/fly";
import { cx } from "@/lib/format";
import { site } from "@/lib/site";
import { DiscoverFilters } from "./DiscoverFilters";
import { MatchActions } from "./MatchActions";
import { MatchStage } from "./MatchStage";
import { MoodSide } from "./MoodSide";
import { MoreMatches } from "./MoreMatches";
import { pipVoice } from "./pipVoice";
import { useMatchmaker, type Side } from "./useMatchmaker";
import styles from "./Matchmaker.module.css";

type Props = { variant: "hero" | "full"; initial?: DiscoverState };

/** Two sides of a table, Pip in the middle. Layout only; logic lives in useMatchmaker. */
export function Matchmaker({ variant, initial }: Props) {
  const full = variant === "full";
  const m = useMatchmaker(initial, { syncUrl: full });
  const { state, phase, top } = m;
  const pipRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const voice = pipVoice(state, phase, top, m.lastSide);

  // On narrow screens the result lands below the moods; bring it into view.
  useEffect(() => {
    if (phase !== "ready" || !m.acted || window.matchMedia("(min-width: 64rem)").matches) return;
    stageRef.current?.scrollIntoView({ behavior: m.reduce ? "auto" : "smooth", block: "center" });
  }, [phase, m.acted, m.reduce]);

  function pick(side: Side, mood: MoodId, from: HTMLElement) {
    const color = side === "a" ? "var(--yolk)" : "var(--shiso)";
    if (pipRef.current) flySeed(centerOf(from), centerOf(pipRef.current), { color });
    m.pick(side, mood);
  }

  const side = (s: Side) => (
    <MoodSide
      side={s}
      name={s === "a" ? state.nameA : state.nameB}
      value={state[s]}
      onPick={(mood, el) => pick(s, mood, el)}
      onRename={full ? (n) => m.rename(s, n) : undefined}
      detailed={full}
    />
  );

  return (
    <div className={cx(styles.maker, full && styles.full)}>
      <div className={styles.table}>
        {side("a")}
        <div className={styles.center}>
          <div className={styles.pipRow}>
            <div ref={pipRef} className={styles.pipWrap}>
              <Pip mood={voice.mood} look={voice.look} size={full ? 84 : 72} label="Pip, Forest's guide" />
            </div>
            <p className={styles.line} aria-live="polite">
              {voice.line}
            </p>
          </div>
          <MatchStage
            ref={stageRef}
            phase={phase}
            top={top}
            a={state.a}
            b={state.b}
            nameA={state.nameA}
            nameB={state.nameB}
            size={full ? "feature" : "compact"}
            onClearFilters={() => m.setFilters(defaultFilters)}
          />
          {phase === "ready" && top && (
            <MatchActions full={full} state={state} canShuffle={m.matches.length > 1} onShuffle={m.shuffle} />
          )}
        </div>
        {side("b")}
      </div>

      {full && <DiscoverFilters value={state.filters} onChange={m.setFilters} />}
      {full && phase === "ready" && <MoreMatches matches={m.matches} current={top} onChoose={m.choose} />}
      {full && site.previewData && (
        <p className={styles.notice}>
          Forest is in beta. Couple counts and repeat rates here come from a preview dataset, not live signals yet.{" "}
          <Link href="/journal/the-middle-of-the-menu">How matching works</Link>
        </p>
      )}
    </div>
  );
}
