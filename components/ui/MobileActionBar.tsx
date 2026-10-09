"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";
import { cx } from "@/lib/format";
import styles from "./MobileActionBar.module.css";

type Props = {
  /** The bar appears once this element (the page's main action) scrolls out of view. */
  watch: RefObject<HTMLElement | null>;
  /** "passed": only after scrolling past it. "away": whenever it's off screen (e.g. still below). */
  when?: "passed" | "away";
  children: ReactNode;
};

/**
 * Phones only: keeps the page's primary action within thumb reach once the
 * original button has scrolled away. Hidden from 48rem up via CSS.
 */
export function MobileActionBar({ watch, when = "passed", children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = watch.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) =>
      setShow(!e.isIntersecting && (when === "away" || e.boundingClientRect.top < 0)),
    );
    io.observe(el);
    return () => io.disconnect();
  }, [watch, when]);

  // Let other bottom-anchored UI (the cart toast) sit above the bar.
  useEffect(() => {
    document.body.style.setProperty("--action-bar", show ? "4.75rem" : "0px");
    return () => {
      document.body.style.removeProperty("--action-bar");
    };
  }, [show]);

  return (
    <div className={cx(styles.bar, show && styles.shown)} aria-hidden={!show} inert={!show}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
