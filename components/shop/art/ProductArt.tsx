import type { ComponentType } from "react";
import type { ArtKind, Product } from "@/lib/data/products";
import { cx } from "@/lib/format";
import { Box } from "./Box";
import { Deck } from "./Deck";
import { GiftCard } from "./GiftCard";
import { Jar } from "./Jar";
import { Bowls, Rests } from "./Tableware";
import type { ArtProps } from "./types";
import styles from "./art.module.css";

/** Every art kind must have a renderer; adding a kind without one fails to compile. */
const renderers = {
  box: Box,
  jar: Jar,
  deck: Deck,
  bowls: Bowls,
  rest: Rests,
  card: GiftCard,
} satisfies Record<ArtKind, ComponentType<ArtProps>>;

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255) < 110;
}

/**
 * Packaging renders in the Forest visual language, used until product
 * photography exists: object, floor shadow, flat backdrop.
 */
export function ProductArt({ product, className }: { product: Product; className?: string }) {
  const { kind, surface, accent, label } = product.art;
  const dark = isDark(surface);
  const Shape = renderers[kind];
  return (
    <svg
      viewBox="0 0 400 500"
      className={cx(styles.art, className)}
      role="img"
      aria-label={`${product.name}, illustrated`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill={dark ? "#141311" : "#E4DED3"} />
      <rect y="330" width="400" height="170" fill={dark ? "#0C0B0A" : "#D9D3C8"} />
      <ellipse cx="200" cy="390" rx="130" ry="18" className={styles.shadow} />
      <g className={styles.object}>
        <Shape surface={surface} accent={accent} ink={dark ? "#EEEAE2" : "#000000"} label={label} />
      </g>
    </svg>
  );
}
