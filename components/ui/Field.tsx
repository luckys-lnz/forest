import { useId, type ComponentProps, type ReactNode } from "react";
import { cx } from "@/lib/format";
import styles from "./Field.module.css";

type Base = { label: ReactNode; hint?: ReactNode; error?: string; optional?: boolean; className?: string };

function Wrapper({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: Base & { id: string; children: ReactNode }) {
  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {children}
      <p id={`${id}-error`} className={styles.error} role={error ? "alert" : undefined}>
        {error}
      </p>
    </div>
  );
}

function describedBy(id: string, hint?: ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

export function TextField({ label, hint, error, optional, className, ...input }: Base & ComponentProps<"input">) {
  const auto = useId();
  const id = input.id ?? auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <input
        {...input}
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </Wrapper>
  );
}

export function TextArea({ label, hint, error, optional, className, ...input }: Base & ComponentProps<"textarea">) {
  const auto = useId();
  const id = input.id ?? auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea
        {...input}
        id={id}
        className={cx(styles.control, styles.area)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  className,
  children,
  ...select
}: Base & ComponentProps<"select">) {
  const auto = useId();
  const id = select.id ?? auto;
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <select
        {...select}
        id={id}
        className={cx(styles.control, styles.select)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      >
        {children}
      </select>
    </Wrapper>
  );
}
