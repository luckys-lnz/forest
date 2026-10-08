"use client";

import type { CSSProperties } from "react";
import { useScrollProgress } from "@/lib/hooks/motion";
import { StoryStage } from "./StoryStage";
import { StorySteps } from "./StorySteps";
import { StoryRail } from "./StoryRail";
import { StoryStickers } from "./StoryStickers";
import { ACTS, actAt } from "./storyModel";
import styles from "./StoryScroll.module.css";

/**
 * How Forest works, told on a phone. The section pins for four screens'
 * worth of scrolling: the backdrop changes colour per act, the giant number
 * rolls over, the phone plays that act's screen and food drifts past.
 */
export function StoryScroll() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const { act, local } = actAt(p);

  function jump(i: number) {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + span * ((i + 0.15) / ACTS.length), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section
      ref={ref}
      className={styles.story}
      aria-labelledby="story-title"
      style={{ "--act-bg": ACTS[act].bg } as CSSProperties}
    >
      <div className={styles.sticky}>
        <StoryStickers act={act} local={local} />
        <div className={`wrap ${styles.grid}`}>
          <StorySteps act={act} />
          <StoryStage act={act} local={local} />
          <StoryRail act={act} local={local} onJump={jump} />
        </div>
      </div>
    </section>
  );
}
