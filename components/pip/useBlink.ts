"use client";

import { useEffect, useState } from "react";

/** An occasional, irregular blink. Off while `paused` (eyes already closed or arced). */
export function useBlink(paused: boolean): boolean {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (paused) return;
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        setBlink(true);
        t = setTimeout(() => {
          setBlink(false);
          schedule();
        }, 140);
      }, 3500 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(t);
  }, [paused]);
  return blink;
}
