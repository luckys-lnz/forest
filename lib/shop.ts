import {
  categoryIds,
  collections,
  fromPrice,
  productAvailability,
  products,
  type CategoryId,
  type CollectionId,
  type Product,
} from "./data/products";

export const sorts = {
  featured: "Featured",
  new: "Newest",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
} as const;
export type SortId = keyof typeof sorts;

export type ShopQuery = {
  category: CategoryId | null;
  collection: CollectionId | null;
  sort: SortId;
  inStock: boolean;
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseShopQuery(params: Record<string, string | string[] | undefined>): ShopQuery {
  const category = one(params.category);
  const collection = one(params.collection);
  const sort = one(params.sort);
  return {
    category: categoryIds.includes(category as CategoryId) ? (category as CategoryId) : null,
    collection: collection && collection in collections ? (collection as CollectionId) : null,
    sort: sort && sort in sorts ? (sort as SortId) : "featured",
    inStock: one(params.stock) === "1",
  };
}

export function queryProducts(q: ShopQuery): Product[] {
  const list = products
    .filter((p) => (q.category ? p.category === q.category : true))
    .filter((p) => (q.collection ? p.collections.includes(q.collection) : true))
    .filter((p) => (q.inStock ? productAvailability(p).state !== "sold-out" : true));

  const soldOutLast = (a: Product, b: Product) =>
    Number(productAvailability(a).state === "sold-out") - Number(productAvailability(b).state === "sold-out");

  return [...list].sort((a, b) => {
    switch (q.sort) {
      case "new":
        return a.addedDaysAgo - b.addedDaysAgo;
      case "price-asc":
        return fromPrice(a) - fromPrice(b);
      case "price-desc":
        return fromPrice(b) - fromPrice(a);
      default:
        return soldOutLast(a, b) || Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    }
  });
}

/** Build a shop URL from the current query plus changes. */
export function shopHref(q: ShopQuery, change: Partial<ShopQuery>) {
  const next = { ...q, ...change };
  const s = new URLSearchParams();
  if (next.category) s.set("category", next.category);
  if (next.collection) s.set("collection", next.collection);
  if (next.sort !== "featured") s.set("sort", next.sort);
  if (next.inStock) s.set("stock", "1");
  const qs = s.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

/** Products that belong with this one: same category first, then shared collections. */
export function relatedTo(product: Product, limit = 3): Product[] {
  const score = (p: Product) =>
    (p.category === product.category ? 2 : 0) + p.collections.filter((c) => product.collections.includes(c)).length;
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
