import type { ArtProps } from "./types";
import styles from "./art.module.css";

export function Jar({ surface, accent, label }: ArtProps) {
  return (
    <g>
      <rect x="128" y="168" width="144" height="212" rx="26" fill={surface} />
      <rect x="128" y="168" width="144" height="212" rx="26" fill="url(#jarShine)" opacity="0.5" />
      <defs>
        <linearGradient id="jarShine" x1="0" x2="1">
          <stop offset="0.08" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.95" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* flecks */}
      {[
        [160, 205],
        [228, 220],
        [190, 238],
        [245, 350],
        [150, 352],
        [205, 360],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill={accent} opacity="0.85" />
      ))}
      <rect x="140" y="132" width="120" height="44" rx="8" fill="#000" />
      <rect x="140" y="166" width="120" height="6" fill="#2e2b27" />
      <rect x="128" y="250" width="144" height="84" fill="#EEEAE2" />
      <text x="200" y="285" textAnchor="middle" className={styles.jarWord}>
        forest
      </text>
      <text x="200" y="312" textAnchor="middle" className={styles.jarLabel}>
        {label}
      </text>
    </g>
  );
}
