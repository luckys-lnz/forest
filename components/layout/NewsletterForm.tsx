"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/format";
import styles from "./NewsletterForm.module.css";
import { EMAIL_HINT, isEmail } from "@/lib/validation";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

/** One field, one promise: what you get and how often. */
export function NewsletterForm({ source, tone = "dark" }: { source: string; tone?: "dark" | "light" }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setStatus({ kind: "error", message: EMAIL_HINT });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "We couldn't sign you up just now. Try again in a minute.");
      setStatus({ kind: "done" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.kind === "done") {
    return (
      <p className={cx(styles.done, tone === "light" && styles.light)} role="status">
        You&apos;re on the list. The first letter arrives on Sunday morning.
      </p>
    );
  }

  return (
    <form className={cx(styles.form, tone === "light" && styles.light)} onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className={styles.row}>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          className={styles.input}
          aria-invalid={status.kind === "error" || undefined}
          aria-describedby={`${id}-msg`}
        />
        <Button type="submit" loading={status.kind === "sending"} variant={tone === "light" ? "inverse" : "primary"}>
          Subscribe
        </Button>
      </div>
      <p id={`${id}-msg`} className={cx(styles.msg, status.kind === "error" && styles.err)} role={status.kind === "error" ? "alert" : undefined}>
        {status.kind === "error" ? status.message : "One letter on Sundays: what couples ate this week. Unsubscribe in one click."}
      </p>
    </form>
  );
}
