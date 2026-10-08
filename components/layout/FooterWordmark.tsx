"use client";

import { Pip } from "@/components/pip/Pip";
import { useInView } from "@/lib/hooks/motion";
import { useLookAt } from "@/lib/hooks/useLookAt";
import { cx } from "@/lib/format";
import styles from "./FooterWordmark.module.css";

/**
 * The name, as big as the page allows, with Pip popping up from behind the
 * last letter to see you off. Decorative: the real name is in the logo.
 */
export function FooterWordmark() {
  const [box, seen] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [eyes, look] = useLookAt<HTMLSpanElement>(600);
  return (
    <div ref={box} className={cx(styles.mark, seen && styles.seen)} aria-hidden="true">
      <span className={styles.word}>forest</span>
      <span ref={eyes} className={styles.pip}>
        <Pip size={160} mood={seen ? "curious" : "sleepy"} look={look} costume="bib" sticker />
      </span>
      <span className={`hand ${styles.bye}`}>see you at dinner!</span>
    </div>
  );
}
