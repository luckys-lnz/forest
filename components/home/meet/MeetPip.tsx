"use client";

import { useRef } from "react";
import { PipJobs } from "./PipJobs";
import { PipStage } from "./PipStage";
import styles from "./MeetPip.module.css";

/** Introduces Pip by letting you meet Pip, not by describing a mascot. */
export function MeetPip() {
  const area = useRef<HTMLDivElement>(null);
  return (
    <div ref={area} className={styles.area}>
      <div>
        <h2 className={`headline ${styles.title}`}>
          This is <em>Pip.</em>
        </h2>
        <p className={styles.lead}>
          Pip is a seed, because Forest grows from what everyone plants in it. Pip reads the community&apos;s signals so you
          don&apos;t have to, and tells you the one thing worth knowing.
        </p>
        <PipJobs />
      </div>
      <PipStage area={area} />
    </div>
  );
}
