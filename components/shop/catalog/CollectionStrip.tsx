import Link from "next/link";
import { ProductArt } from "@/components/shop/art/ProductArt";
import { collections, requireProduct, type CollectionId, type ProductSlug } from "@/lib/data/products";
import { cx } from "@/lib/format";
import { shopHref, type ShopQuery } from "@/lib/shop";
import styles from "./CollectionStrip.module.css";

/** The product that represents each collection on its tile. */
const lead: Record<CollectionId, ProductSlug> = {
  "date-night": "night-market-box",
  "first-try": "ember-chili-crisp",
  gifting: "pip-chopstick-rests",
};

export function CollectionStrip({ query }: { query: ShopQuery }) {
  return (
    <section aria-label="Collections" className={styles.strip}>
      {(Object.keys(collections) as CollectionId[]).map((id) => (
        <Link key={id} href={shopHref(query, { collection: id })} className={cx(styles.tile, "art-lift")}>
          <span className={styles.art}>
            <ProductArt product={requireProduct(lead[id])} />
          </span>
          <span className={styles.text}>
            <span className={styles.name}>{collections[id].label}</span>
            <span className={styles.line}>{collections[id].line}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}
