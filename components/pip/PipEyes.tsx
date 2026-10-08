import type { CSSProperties } from "react";
import type { PipMood } from "./Pip";

/** Eyes carry most of Pip's expression: dots, happy arcs, or sleepy lids. */
export function PipEyes({ mood, blink, look }: { mood: PipMood; blink: boolean; look: { x: number; y: number } }) {
  const clamp = (v: number) => Math.max(-1, Math.min(1, v));
  const style = { "--lx": `${clamp(look.x) * 5}px`, "--ly": `${clamp(look.y) * 4}px` } as CSSProperties;
  if (mood === "happy" || mood === "sleepy") {
    // Happy eyes curve up (^ ^); sleepy lids curve down.
    const bend = mood === "happy" ? 64 : 76;
    const arc = (cx: number) => `M${cx - 6} 72 Q ${cx} ${bend} ${cx + 6} 72`;
    return (
      <g data-part="eyes" style={style}>
        <path data-part="arc" d={arc(38)} />
        <path data-part="arc" d={arc(62)} />
      </g>
    );
  }
  return (
    <g data-part="eyes" style={style}>
      <ellipse data-part="eye" data-blink={blink || undefined} cx="38" cy="70" rx="4.6" ry="6.2" />
      <ellipse data-part="eye" data-side="right" data-blink={blink || undefined} cx="62" cy="70" rx="4.6" ry="6.2" />
    </g>
  );
}
