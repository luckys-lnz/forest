import { settings, type SettingId } from "@/lib/data/moods";
import type { PriceBand } from "@/lib/data/discoveries";
import type { Filters } from "@/lib/discover";
import { cx } from "@/lib/format";
import styles from "./DiscoverFilters.module.css";

type Option<V> = { readonly value: V; readonly label: string };

const where: readonly Option<SettingId | "any">[] = [
  { value: "any", label: "Anywhere" },
  ...(Object.keys(settings) as SettingId[]).map((value) => ({ value, label: settings[value] })),
];
const budget: readonly Option<PriceBand>[] = [
  { value: 3, label: "Any budget" },
  { value: 2, label: "Up to $60" },
  { value: 1, label: "Under $20" },
];

/** A segmented single-choice control, accessible as a radio group. */
function Segmented<V extends string | number>(props: {
  label: string;
  options: readonly Option<V>[];
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <div className={styles.group} role="radiogroup" aria-label={props.label}>
      {props.options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={props.value === o.value}
          className={cx(styles.toggle, props.value === o.value && styles.on)}
          onClick={() => props.onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function DiscoverFilters({ value, onChange }: { value: Filters; onChange: (f: Partial<Filters>) => void }) {
  return (
    <fieldset className={styles.filters}>
      <legend className={styles.legend}>Narrow it down</legend>
      <Segmented label="Where you'll eat" options={where} value={value.setting} onChange={(setting) => onChange({ setting })} />
      <Segmented label="Budget for two" options={budget} value={value.maxPrice} onChange={(maxPrice) => onChange({ maxPrice })} />
      <button
        type="button"
        aria-pressed={value.vegetarian}
        className={cx(styles.toggle, styles.single, value.vegetarian && styles.on)}
        onClick={() => onChange({ vegetarian: !value.vegetarian })}
      >
        Vegetarian
      </button>
    </fieldset>
  );
}
