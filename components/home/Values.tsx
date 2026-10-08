import type { CSSProperties } from "react";
import { Pip, type Costume } from "@/components/pip/Pip";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/Section";
import styles from "./Values.module.css";

type Value = { readonly statement: string; readonly body: string; readonly color: string; readonly costume: Costume };

const VALUES: readonly Value[] = [
  {
    statement: "Deciding together is the meal before the meal.",
    body: "The ten minutes before dinner set the tone for the evening. We want them to be fun, not a stand-off.",
    color: "var(--butter)",
    costume: "party",
  },
  {
    statement: "The crowd is wiser than a critic, as long as it's honest.",
    body: "Forest learns from what couples actually ate and whether they'd go back. We show where every number comes from, and no restaurant can pay to rank higher.",
    color: "var(--sky)",
    costume: "shades",
  },
  {
    statement: "Good technology leaves the table.",
    body: "Pick, decide, put the phone face down. Forest is built to be used for two minutes, not two hours.",
    color: "var(--mint)",
    costume: "bib",
  },
  {
    statement: "Trying beats rating.",
    body: "A new dish you half-liked together makes a better night than a perfect one you've had forty times.",
    color: "var(--bubble)",
    costume: "chef",
  },
];

/** Our values, written on recipe cards and pinned to the fridge. */
export function Values() {
  return (
    <>
      <SectionHead
        id="values-title"
        hand="our values"
        title={
          <>
            What we <em>believe</em> at the table
          </>
        }
      />
      <ol className={styles.cards} role="list">
        {VALUES.map((v, i) => (
          <Reveal
            as="li"
            key={v.statement}
            index={i}
            className={styles.card}
          >
            <div className={styles.inner} style={{ "--card": v.color, "--tilt": `${i % 2 ? 2 : -2}deg` } as CSSProperties}>
              <p className={styles.no} aria-hidden="true">
                No. {i + 1}
              </p>
              <h3 className={`headline ${styles.statement}`}>{v.statement}</h3>
              <p className={styles.body}>{v.body}</p>
              <Pip size={64} mood="happy" costume={v.costume} tone="on-light" sticker className={styles.pip} />
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
