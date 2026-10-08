import { topicIds, topics, type TopicId } from "@/lib/contact";
import { cx } from "@/lib/format";
import styles from "./TopicPicker.module.css";

/** Why you're getting in touch decides who reads it and what we ask. */
export function TopicPicker({ value, onChange }: { value: TopicId | null; onChange: (t: TopicId) => void }) {
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>What&apos;s it about?</legend>
      <div className={styles.grid}>
        {topicIds.map((id) => (
          <label key={id} className={cx(styles.topic, value === id && styles.on)}>
            <input type="radio" name="topic" value={id} checked={value === id} onChange={() => onChange(id)} className="sr-only" />
            <span className={styles.label}>{topics[id].label}</span>
            <span className={styles.line}>{topics[id].line}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
