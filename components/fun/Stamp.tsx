import { useId, type ReactNode } from "react";
import { cx } from "@/lib/format";
import styles from "./Stamp.module.css";

type Props = {
  /** Text that runs around the ring; it repeats to fill the circle. */
  text: string;
  children?: ReactNode;
  size?: number;
  className?: string;
};

/** A spinning round badge, like the stamp on an old bakery box. */
export function Stamp({ text, children, size = 160, className }: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <span className={cx(styles.stamp, className)} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={styles.ring} focusable="false">
        <defs>
          <path id={`ring-${id}`} d="M100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0" />
        </defs>
        <circle cx="100" cy="100" r="97" className={styles.disc} />
        <circle cx="100" cy="100" r="56" className={styles.inner} />
        <text className={styles.text}>
          <textPath href={`#ring-${id}`} textLength="460" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children && <span className={styles.center}>{children}</span>}
    </span>
  );
}
