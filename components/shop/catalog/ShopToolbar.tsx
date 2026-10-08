import Link from "next/link";
import { categories, categoryIds } from "@/lib/data/products";
import { shopHref, type ShopQuery } from "@/lib/shop";
import { SortSelect } from "../SortSelect";
import styles from "./ShopToolbar.module.css";

/** Category links, an in-stock switch and sort. All state lives in the URL. */
export function ShopToolbar({ query }: { query: ShopQuery }) {
  const all = !query.category && !query.collection;
  return (
    <div className={styles.toolbar}>
      <nav aria-label="Categories" className={styles.cats}>
        <Link href={shopHref(query, { category: null, collection: null })} className={styles.cat} aria-current={all ? "page" : undefined}>
          Everything
        </Link>
        {categoryIds.map((c) => (
          <Link
            key={c}
            href={shopHref(query, { category: c, collection: null })}
            className={styles.cat}
            aria-current={query.category === c ? "page" : undefined}
          >
            {categories[c].label}
          </Link>
        ))}
      </nav>
      <div className={styles.tools}>
        <Link href={shopHref(query, { inStock: !query.inStock })} className={styles.stock} role="switch" aria-checked={query.inStock}>
          <span className={styles.switch} aria-hidden="true" />
          In stock only
        </Link>
        <SortSelect query={query} />
      </div>
    </div>
  );
}
