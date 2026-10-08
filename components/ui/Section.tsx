import type { ComponentProps, ReactNode } from "react";
import { Scribble } from "@/components/fun/Scribble";
import { cx } from "@/lib/format";
import styles from "./Section.module.css";

type Tone = "dark" | "light" | "paper" | "cream";
const toneClass: Record<Tone, string> = { dark: "", light: "on-light", paper: "on-paper", cream: "on-cream grain" };

type Props = Omit<ComponentProps<"section">, "children"> & { tone?: Tone; children: ReactNode };

/** A full-bleed page section: theme, vertical rhythm, and the content column. */
export function Section({ tone = "dark", className, children, ...rest }: Props) {
  return (
    <section {...rest} className={cx("surface", toneClass[tone], styles.section, className)}>
      <div className={cx("wrap", styles.inner)}>{children}</div>
    </section>
  );
}

type HeadProps = {
  /** Wrap one word in <em> for the serif-italic accent. */
  title: ReactNode;
  id: string;
  note?: ReactNode;
  wide?: boolean;
  /** A handwritten aside, scribbled next to the heading. */
  hand?: string;
};

/** A chunky section heading, with an optional note and a margin scribble. */
export function SectionHead({ title, id, note, wide, hand }: HeadProps) {
  return (
    <div className={cx(styles.head, note !== undefined && styles.split)}>
      <div className={styles.titleBox}>
        {hand && (
          <p className={cx("hand", styles.hand)} aria-hidden="true">
            {hand}
            <Scribble kind="arrow" className={styles.handArrow} />
          </p>
        )}
        <h2 id={id} className={cx("headline", styles.h2, wide && styles.wide)}>
          {title}
        </h2>
      </div>
      {note !== undefined && <div className={styles.note}>{note}</div>}
    </div>
  );
}
