import { Leaf } from "./Leaf";
import styles from "./art.module.css";

export function Deck() {
  return (
    <g>
      <rect x="120" y="170" width="150" height="210" rx="12" fill="#2e2b27" transform="rotate(-10 195 275)" />
      <rect x="128" y="168" width="150" height="210" rx="12" fill="#EEEAE2" transform="rotate(-3 203 273)" />
      <rect x="140" y="160" width="150" height="210" rx="12" fill="#000" transform="rotate(6 215 265)" />
      <g transform="rotate(6 215 265)">
        <text x="215" y="250" textAnchor="middle" className={styles.deckWord}>
          The Decider
        </text>
        <ellipse cx="215" cy="300" rx="16" ry="20" fill="#E7B53C" />
        <ellipse cx="245" cy="300" rx="16" ry="20" fill="#8DB07A" />
        <Leaf x={222} y={186} s={1} />
      </g>
    </g>
  );
}
