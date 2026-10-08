"use client";

import { useEffect, useState } from "react";
import { Pip, type Costume } from "@/components/pip/Pip";
import { useLookAt } from "@/lib/hooks/useLookAt";
import styles from "../Hero.module.css";

const WARDROBE: readonly Costume[] = ["chef", "party", "shades", "bib"];

/**
 * Pip sits inside the headline and watches the cursor. Tap Pip and it
 * changes outfit: a small reward for curiosity, nothing more.
 */
export function HeroPip() {
  const [ref, look] = useLookAt<HTMLButtonElement>();
  const [outfit, setOutfit] = useState(0);
  const [glad, setGlad] = useState(false);
  const costume = WARDROBE[outfit % WARDROBE.length];

  // A happy squint for a moment after each change, then back to watching you.
  useEffect(() => {
    if (!outfit) return;
    const t = setTimeout(() => setGlad(false), 900);
    return () => clearTimeout(t);
  }, [outfit]);

  return (
    <button
      ref={ref}
      type="button"
      className={styles.pip}
      onClick={() => {
        setOutfit((n) => n + 1);
        setGlad(true);
      }}
      aria-label={`Pip, Forest's guide, wearing a ${costume === "bib" ? "napkin" : costume === "shades" ? "pair of shades" : `${costume} hat`}. Tap for another outfit.`}
    >
      <span key={outfit} className={styles.pipPop}>
        <Pip size={120} mood={glad ? "happy" : "curious"} look={look} costume={costume} sticker tone="on-light" />
      </span>
    </button>
  );
}
