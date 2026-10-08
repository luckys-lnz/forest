"use client";

import { useRef, useState, type FormEvent } from "react";
import { hasErrors, type FieldErrors } from "@/lib/types";

/** Every state a submitting form can be in. The UI renders each one. */
export type FormStatus<D> =
  | { readonly kind: "idle" }
  | { readonly kind: "sending" }
  | { readonly kind: "error"; readonly message: string }
  | { readonly kind: "done"; readonly data: D };

type Options<V, D> = {
  initial: V;
  /** Same rules the server runs; instant feedback before a round trip. */
  validate: (values: V) => FieldErrors<V>;
  endpoint: string;
  /** Shape the request body; defaults to the values themselves. */
  body?: (values: V) => unknown;
  onDone?: (data: D) => void;
};

/**
 * Controlled form state, client + server validation, focus management and
 * submission, for any JSON endpoint that returns `{ error, errors }` on failure.
 */
export function useForm<V extends Record<string, string | undefined>, D>(opts: Options<V, D>) {
  const [values, setValues] = useState<V>(opts.initial);
  const [errors, setErrors] = useState<FieldErrors<V>>({});
  const [status, setStatus] = useState<FormStatus<D>>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const focusFirstError = () =>
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());

  /** Bind a field: `<input {...field("email")} />` style, without the spread magic. */
  const field = <K extends keyof V & string>(name: K) => ({
    value: values[name] ?? "",
    error: errors[name],
    onChange: (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }));
    },
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    const found = opts.validate(values);
    setErrors(found);
    if (hasErrors(found)) {
      setStatus({ kind: "error", message: "Check the highlighted fields." });
      return focusFirstError();
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(opts.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(opts.body ? opts.body(values) : values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error ?? "That didn't go through. Check your connection and try again.");
      }
      setStatus({ kind: "done", data: data as D });
      opts.onDone?.(data as D);
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
      focusFirstError();
    }
  }

  const reset = (next: Partial<V> = {}) => {
    setValues({ ...opts.initial, ...next });
    setErrors({});
    setStatus({ kind: "idle" });
  };

  return { values, errors, status, field, submit, reset, setErrors, formRef } as const;
}
