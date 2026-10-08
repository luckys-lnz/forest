"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { DiscoverState } from "@/lib/discover";
import styles from "./MatchActions.module.css";

type Props = { full: boolean; state: DiscoverState; canShuffle: boolean; onShuffle: () => void };

/** What to do with a match: see another, share it, or open the full tool. */
export function MatchActions({ full, state, canShuffle, onShuffle }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) return await navigator.share({ title: "Our Forest match", url });
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* share sheet dismissed or clipboard blocked */
    }
  }

  return (
    <div className={styles.actions}>
      {canShuffle && (
        <Button variant="secondary" size="sm" onClick={onShuffle}>
          Show another
        </Button>
      )}
      {full ? (
        <Button variant="secondary" size="sm" onClick={share}>
          {copied ? "Link copied" : "Share this match"}
        </Button>
      ) : (
        <ButtonLink href={`/discover?a=${state.a}&b=${state.b}`} size="sm">
          See every match
        </ButtonLink>
      )}
    </div>
  );
}
