import { site } from "./site";
import type { Cents } from "./types";

const money = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Prices are stored as integer cents everywhere. */
export function formatPrice(value: Cents): string {
  return money.format(value / 100);
}

const count = new Intl.NumberFormat(site.locale);
export function formatCount(n: number) {
  return count.format(n);
}

const longDate = new Intl.DateTimeFormat(site.locale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});
export function formatDate(iso: string) {
  return longDate.format(new Date(iso));
}

export function cx(...parts: ReadonlyArray<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function unsplash(path: string, width = 1600) {
  return `https://images.unsplash.com/${path}?auto=format&fit=crop&w=${width}&q=80`;
}
