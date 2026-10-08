"use client";

import { useState } from "react";
import styles from "./ShareBar.module.css";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => `${window.location.origin}${path}`;
  const enc = encodeURIComponent;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked; the other options still work */
    }
  }

  function open(href: string) {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=540");
  }

  return (
    <div className={styles.bar} role="group" aria-label="Share this article">
      <span className={styles.label}>Share</span>
      <button type="button" onClick={copy} className={styles.btn}>
        {copied ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => open(`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url())}`)}
      >
        X
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url())}`)}
      >
        LinkedIn
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          window.location.href = `mailto:?subject=${enc(title)}&body=${enc(url())}`;
        }}
      >
        Email
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
