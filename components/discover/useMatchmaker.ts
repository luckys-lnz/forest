"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MoodId } from "@/lib/data/moods";
import { defaultFilters, rankMatches, toDiscoverQuery, type DiscoverState, type Filters } from "@/lib/discover";
import { useReducedMotion } from "@/lib/hooks/motion";

export type Side = "a" | "b";
export type Phase = "waiting" | "thinking" | "ready";

const THINK_MS = 650;
const blank: DiscoverState = { a: null, b: null, nameA: "You", nameB: "Them", filters: defaultFilters };

/**
 * All matchmaking state and transitions, independent of layout.
 * `syncUrl` keeps a shareable /discover URL in step with the state.
 */
export function useMatchmaker(initial: DiscoverState = blank, { syncUrl = false } = {}) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<DiscoverState>(initial);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>(initial.a && initial.b ? "ready" : "waiting");
  const [lastSide, setLastSide] = useState<Side | null>(null);
  const [acted, setActed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { a, b, filters } = state;
  const matches = useMemo(() => (a && b ? rankMatches(a, b, filters) : []), [a, b, filters]);
  const top = matches[index] ?? matches[0] ?? null;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!syncUrl) return;
    const qs = toDiscoverQuery(state);
    // Native history keeps the URL shareable without a server round trip.
    window.history.replaceState(null, "", qs ? `/discover?${qs}` : "/discover");
  }, [syncUrl, state]);

  function think() {
    setActed(true);
    setIndex(0);
    clearTimeout(timer.current);
    if (reduce) return setPhase("ready");
    setPhase("thinking");
    timer.current = setTimeout(() => setPhase("ready"), THINK_MS);
  }

  function pick(side: Side, mood: MoodId) {
    const next: DiscoverState = side === "a" ? { ...state, a: mood } : { ...state, b: mood };
    setState(next);
    setLastSide(side);
    if (next.a && next.b) think();
    else setPhase("waiting");
  }

  function setFilters(change: Partial<Filters>) {
    setState((s) => ({ ...s, filters: { ...s.filters, ...change } }));
    if (a && b) think();
  }

  const rename = (side: Side, name: string) =>
    setState((s) => (side === "a" ? { ...s, nameA: name } : { ...s, nameB: name }));

  const shuffle = () => setIndex((i) => (i + 1) % Math.max(1, Math.min(matches.length, 3)));

  const choose = (match: (typeof matches)[number]) => setIndex(matches.indexOf(match));

  return { state, phase, matches, top, lastSide, acted, reduce, pick, setFilters, rename, shuffle, choose } as const;
}

export type Matchmaker = ReturnType<typeof useMatchmaker>;
