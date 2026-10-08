"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { PipMood } from "@/components/pip/Pip";

const NAP_AFTER_MS = 9000;

/**
 * Pip's attention: follows the pointer inside `area`, reacts when asked,
 * and naps when nobody needs it. Returns what Pip should look like.
 */
export function usePipPresence(area: RefObject<HTMLElement | null>, eyes: RefObject<HTMLElement | null>) {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState<PipMood>("idle");
  const nap = useRef<ReturnType<typeof setTimeout>>(undefined);
  const react = useRef<ReturnType<typeof setTimeout>>(undefined);

  const wake = useRef(() => {
    clearTimeout(nap.current);
    setMood((m) => (m === "sleepy" ? "surprised" : m));
    nap.current = setTimeout(() => setMood("sleepy"), NAP_AFTER_MS);
  }).current;

  useEffect(() => {
    wake();
    const el = area.current;
    const onMove = (e: PointerEvent) => {
      const box = eyes.current?.getBoundingClientRect();
      if (!box) return;
      const x = (e.clientX - (box.left + box.width / 2)) / (window.innerWidth / 3);
      const y = (e.clientY - (box.top + box.height / 2)) / (window.innerHeight / 3);
      setLook({ x, y });
      wake();
    };
    el?.addEventListener("pointermove", onMove);
    return () => {
      el?.removeEventListener("pointermove", onMove);
      clearTimeout(nap.current);
      clearTimeout(react.current);
    };
  }, [area, eyes, wake]);

  /** A small surprise, then delight: Pip has something to tell you. */
  function perk() {
    wake();
    setMood("surprised");
    clearTimeout(react.current);
    react.current = setTimeout(() => setMood("happy"), 380);
  }

  return { look, mood, perk } as const;
}
