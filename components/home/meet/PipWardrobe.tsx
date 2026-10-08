import type { Costume } from "@/components/pip/Pip";
import { cx } from "@/lib/format";
import styles from "./PipWardrobe.module.css";

const OUTFITS = [
  { id: "none", label: "Just Pip" },
  { id: "chef", label: "Chef's hat" },
  { id: "party", label: "Party hat" },
  { id: "shades", label: "Shades" },
  { id: "bib", label: "Napkin" },
] as const satisfies readonly { id: Costume; label: string }[];

/** Dress Pip up. Pure play; it's the bit people show each other. */
export function PipWardrobe({ value, onChange }: { value: Costume; onChange: (c: Costume) => void }) {
  return (
    <fieldset className={styles.wardrobe}>
      <legend className={`hand ${styles.legend}`}>Dress Pip up</legend>
      <div className={styles.row}>
        {OUTFITS.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            className={cx(styles.chip, value === o.id && styles.on)}
            onClick={() => onChange(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
