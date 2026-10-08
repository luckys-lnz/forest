"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type Look = { readonly x: number; readonly y: number };
const CENTER: Look = { x: 0, y: 0 };

/**
 * Where on screen the pointer is, relative to an element's centre, as -1..1
 * on each axis. Lets a character's eyes follow the visitor around. Stays at
 * rest for reduced motion; on touch it follows the last tap.
 */
export function useLookAt<T extends Element>(reach = 480): [RefObject<T | null>, Look] {
  const ref = useRef<T>(null);
  const [look, setLook] = useState<Look>(CENTER);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let last = { x: 0, y: 0 };
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const x = clamp((last.x - (r.left + r.width / 2)) / reach);
      const y = clamp((last.y - (r.top + r.height / 2)) / reach);
      setLook((prev) => (Math.abs(prev.x - x) + Math.abs(prev.y - y) > 0.04 ? { x, y } : prev));
    };
    const onMove = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reach]);

  return [ref, look];
}
