import { Leaf } from "./Leaf";
import type { ArtProps } from "./types";
import styles from "./art.module.css";

export function GiftCard({ accent }: ArtProps) {
  return (
    <g>
      <rect x="70" y="190" width="260" height="164" rx="14" fill="#000" stroke="#2e2b27" strokeWidth="2" transform="rotate(-6 200 272)" />
      <g transform="rotate(-6 200 272)">
        <text x="96" y="236" className={styles.cardWord}>
          forest
        </text>
        <Leaf x={168} y={210} s={0.8} fill={accent} />
        <text x="96" y="330" className={styles.cardLabel}>
          Gift card
        </text>
        <ellipse cx="282" cy="310" rx="18" ry="22" fill="#1e1c19" stroke="#3a3631" strokeWidth="1.5" />
        <ellipse cx="276" cy="312" rx="2.6" ry="3.6" fill="#EEEAE2" />
        <ellipse cx="288" cy="312" rx="2.6" ry="3.6" fill="#EEEAE2" />
      </g>
    </g>
  );
}
