import styles from "./PipJobs.module.css";

const JOBS = [
  { title: "Pip notices", body: "Patterns in what couples eat, like who goes back for what, and when." },
  { title: "Pip explains", body: "Why a strange-sounding match works for both of you." },
  { title: "Pip stays quiet", body: "No streaks, no badges, no notifications. Leave Pip alone and it naps." },
] as const;

export function PipJobs() {
  return (
    <dl className={styles.jobs}>
      {JOBS.map((j) => (
        <div key={j.title}>
          <dt>{j.title}</dt>
          <dd>{j.body}</dd>
        </div>
      ))}
    </dl>
  );
}
