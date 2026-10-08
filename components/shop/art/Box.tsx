import { Leaf } from "./Leaf";
import type { ArtProps } from "./types";
import styles from "./art.module.css";

export function Box({ surface, accent, ink, label }: ArtProps) {
  return (
    <g>
      {/* top */}
      <path d="M90 170 L200 125 L320 160 L210 210 Z" fill={surface} style={{ filter: "brightness(1.12)" }} />
      {/* front */}
      <path d="M90 170 L210 210 L210 385 L90 340 Z" fill={surface} />
      {/* side */}
      <path d="M210 210 L320 160 L320 330 L210 385 Z" fill={surface} style={{ filter: "brightness(0.78)" }} />
      {/* band */}
      <path d="M140 150 L250 196 L250 370 L238 376 L238 202 L128 156 Z" fill={accent} opacity="0.9" />
      <text x="104" y="250" className={styles.boxWord} fill={ink} transform="skewY(18) translate(0 -38)">
        forest
      </text>
      {label && (
        <text x="104" y="282" className={styles.boxLabel} fill={ink} transform="skewY(18) translate(0 -38)">
          {label}
        </text>
      )}
      <Leaf x={168} y={226} s={0.9} />
    </g>
  );
}
