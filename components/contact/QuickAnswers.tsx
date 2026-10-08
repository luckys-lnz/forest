import { faqs, type TopicId } from "@/lib/contact";
import styles from "./QuickAnswers.module.css";

/** Answer the common questions before asking someone to write in. */
export function QuickAnswers({ topic }: { topic: TopicId }) {
  const list = faqs.filter((f) => f.topic === topic);
  if (list.length === 0) return null;
  return (
    <section className={styles.faq} aria-labelledby="faq-title">
      <h2 id="faq-title" className={styles.title}>
        Quick answers first
      </h2>
      {list.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
