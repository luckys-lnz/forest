"use client";

import { useEffect, useState } from "react";

/** Hide on scroll down, reveal on scroll up; `scrolled` once off the very top. */
export function useHideOnScroll(threshold = 160) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 8);
        if (Math.abs(y - last) < 6) return;
        setHidden(y > last && y > threshold);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return { hidden, scrolled } as const;
}
