"use client";

import { useEffect, type RefObject } from "react";

/**
 * While `active`: lock page scroll, keep Tab inside `container` (plus the
 * toggle), close on Escape, and return focus to the toggle afterwards.
 */
export function useFocusTrap(
  active: boolean,
  container: RefObject<HTMLElement | null>,
  toggle: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const button = toggle.current;
    const focusables = () => [button, ...(container.current?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter((el): el is HTMLElement => !!el);
    document.documentElement.style.overflow = "hidden";
    focusables()[1]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const els = focusables();
      const [first, last] = [els[0], els[els.length - 1]];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [active, container, toggle, onClose]);
}
