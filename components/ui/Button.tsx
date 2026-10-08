import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/format";
import styles from "./Button.module.css";
import variants from "./ButtonVariants.module.css";

type Variant = "primary" | "secondary" | "quiet" | "inverse";
type Size = "md" | "lg" | "sm";

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string; block?: boolean };

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  loading,
  children,
  ...rest
}: Common & ComponentProps<"button"> & { loading?: boolean }) {
  return (
    <button
      {...rest}
      aria-busy={loading || undefined}
      disabled={rest.disabled || loading}
      className={cx(styles.btn, variants[variant], styles[size], block && styles.block, loading && styles.loading, className)}
    >
      <span className={styles.label}>{children}</span>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  block,
  className,
  children,
  ...rest
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link {...rest} className={cx(styles.btn, variants[variant], styles[size], block && styles.block, className)}>
      <span className={styles.label}>{children}</span>
    </Link>
  );
}
