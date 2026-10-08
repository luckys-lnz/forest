"use client";

import { useSyncExternalStore } from "react";

/** Live result of a CSS media query. Server render assumes `serverValue`. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Matches the CSS breakpoint used for phone layouts (below 48rem). */
export const useIsPhone = () => useMediaQuery("(max-width: 47.99rem)");
