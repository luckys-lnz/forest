import type { PipMood } from "@/components/pip/Pip";
import { moods } from "@/lib/data/moods";
import { possessive, type DiscoverState, type Match } from "@/lib/discover";
import type { Phase, Side } from "./useMatchmaker";

type Voice = { readonly line: string; readonly mood: PipMood; readonly look: { x: number; y: number } };

const natural = (name: string, fallback: "you" | "them") => (name.toLowerCase() === fallback ? fallback : name);

/** What Pip says and how Pip looks, as a pure function of the state. */
export function pipVoice(s: DiscoverState, phase: Phase, top: Match | null, lastSide: Side | null): Voice {
  const look =
    phase === "ready" && top
      ? { x: 0, y: 0.8 }
      : lastSide === "a"
        ? { x: -1, y: 0.2 }
        : lastSide === "b"
          ? { x: 1, y: 0.2 }
          : { x: 0, y: 0 };

  if (!s.a && !s.b) return { line: "Pick a mood each. I'll find where you meet.", mood: "idle", look };
  if (s.a && !s.b) return { line: `${moods[s.a].label}, noted. Now ${natural(s.nameB, "them")}.`, mood: "curious", look };
  if (!s.a && s.b)
    return { line: `${moods[s.b].label} for ${s.nameB}. And ${natural(s.nameA, "you")}?`, mood: "curious", look };
  if (phase === "thinking") return { line: "Checking what couples like you loved…", mood: "thinking", look };
  if (!top) return { line: "Nothing fits all of that. Loosen one filter and I'll look again.", mood: "sleepy", look };

  const line =
    top.verdict === "both"
      ? "Easy one. You both want this."
      : top.verdict === "middle"
        ? "Found the middle."
        : `It leans ${possessive(top.verdict === "leansA" ? s.nameA : s.nameB)} way, but it's the best fit for both of you.`;
  return { line, mood: "happy", look };
}
