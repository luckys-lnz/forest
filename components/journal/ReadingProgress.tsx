"use client";

import { useEffect, useRef } from "react";
import styles from "./ReadingProgress.module.css";

/** A thin yolk line under the header that fills as you read the article body. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !bar.current) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = target.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      bar.current?.style.setProperty("transform", `scaleX(${p})`);
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(frame);
    };
  }, [targetId]);
  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={bar} className={styles.bar} />
    </div>
  );
}
