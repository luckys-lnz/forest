import { assertNever } from "../types";
import { lineKey, resolveLines, type CartLine } from "./lines";

type LineRef = { readonly slug: string; readonly variantId: string };

export type CartAction =
  | { readonly type: "hydrate"; readonly lines: CartLine[] }
  | ({ readonly type: "add"; readonly qty: number } & LineRef)
  | ({ readonly type: "set"; readonly qty: number } & LineRef)
  | ({ readonly type: "remove" } & LineRef)
  | { readonly type: "clear" };

export function cartReducer(lines: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return sanitize(action.lines);
    case "add": {
      const key = lineKey(action);
      const existing = lines.find((l) => lineKey(l) === key);
      const next = existing
        ? lines.map((l) => (lineKey(l) === key ? { ...l, qty: l.qty + action.qty } : l))
        : [...lines, { slug: action.slug, variantId: action.variantId, qty: action.qty }];
      return sanitize(next);
    }
    case "set":
      return sanitize(
        lines.map((l) => (lineKey(l) === lineKey(action) ? { ...l, qty: action.qty } : l)),
      );
    case "remove":
      return lines.filter((l) => lineKey(l) !== lineKey(action));
    case "clear":
      return [];
    default:
      return assertNever(action);
  }
}

/** Clamp quantities to stock and drop anything that no longer exists. */
function sanitize(lines: CartLine[]): CartLine[] {
  return resolveLines(lines)
    .map((l) => ({ slug: l.slug, variantId: l.variantId, qty: Math.max(1, Math.min(l.qty, l.maxQty || 1)) }))
    .filter((l) => Number.isFinite(l.qty));
}

export function isCartLines(v: unknown): v is CartLine[] {
  return (
    Array.isArray(v) &&
    v.every(
      (l) =>
        l &&
        typeof l.slug === "string" &&
        typeof l.variantId === "string" &&
        typeof l.qty === "number" &&
        Number.isInteger(l.qty),
    )
  );
}
