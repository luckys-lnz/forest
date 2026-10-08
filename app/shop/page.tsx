import type { Metadata } from "next";
import Link from "next/link";
import { CollectionStrip } from "@/components/shop/catalog/CollectionStrip";
import { ShopToolbar } from "@/components/shop/catalog/ShopToolbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, collections } from "@/lib/data/products";
import { parseShopQuery, queryProducts, shopHref, type ShopQuery } from "@/lib/shop";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description: "Tasting boxes, pantry jars and things for the table, all built from what couples on Forest kept going back for.",
  alternates: { canonical: "/shop" },
};

/** Heading and intro follow the current filter, so a shared link reads correctly. */
function heading(q: ShopQuery) {
  if (q.collection) return collections[q.collection];
  if (q.category) return categories[q.category];
  return {
    label: "The shop",
    line: `Everything here started with something couples kept logging. Free delivery over $${site.freeShippingThreshold}.`,
  };
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const query = parseShopQuery(await props.searchParams);
  const list = queryProducts(query);
  const { label, line } = heading(query);
  const filtered = Boolean(query.category || query.collection || query.inStock);

  return (
    <div className={`on-light surface ${styles.page}`}>
      <div className="wrap">
        <header className={styles.head}>
          <h1 className={`headline ${styles.title}`}>{label}</h1>
          <p className={styles.lead}>{line}</p>
        </header>
        {!filtered && <CollectionStrip query={query} />}
        <ShopToolbar query={query} />
        <p className={styles.count} aria-live="polite">
          {list.length} {list.length === 1 ? "product" : "products"}
          {query.collection && (
            <>
              . <Link href={shopHref(query, { collection: null })}>Show everything</Link>
            </>
          )}
        </p>
        {list.length > 0 ? (
          <ul role="list" className={styles.grid}>
            {list.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nothing in stock here right now.</p>
            <p>Turn off &ldquo;In stock only&rdquo; to see what&apos;s coming back, and when.</p>
            <Link href={shopHref(query, { inStock: false })}>Show sold-out items</Link>
          </div>
        )}
      </div>
    </div>
  );
}
