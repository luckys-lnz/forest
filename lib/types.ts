/**
 * Shared type utilities. Small, strict, and used everywhere so the domain
 * can't mix up a price with a count or a slug with any old string.
 */

declare const brand: unique symbol;

/** Nominal typing on top of a structural type. */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

/** Money is always integer cents. Never a float, never a bare number. */
export type Cents = Brand<number, "Cents">;
export const cents = (n: number): Cents => Math.round(n) as Cents;
export const sumCents = (values: readonly Cents[]): Cents => cents(values.reduce((s, v) => s + v, 0));

/** A URL-safe identifier for a given kind of record. */
export type Slug<Kind extends string> = Brand<string, `Slug:${Kind}`>;

/** Explicit success/failure without throwing across boundaries. */
export type Result<T, E = string> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E };
export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

/** Compile-time exhaustiveness for switch statements over unions. */
export function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

export type ValueOf<T> = T[keyof T];
export type NonEmptyArray<T> = readonly [T, ...T[]];

/** Narrow an unknown value to a member of a readonly tuple of literals. */
export function isOneOf<const T extends readonly string[]>(list: T, value: unknown): value is T[number] {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}

/** Next.js search params, and a helper for single values. */
export type SearchParams = Record<string, string | string[] | undefined>;
export const firstParam = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v);

/** Field-level form errors keyed by the form's own fields. */
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const hasErrors = <T>(e: FieldErrors<T>): boolean => Object.values(e).some(Boolean);
