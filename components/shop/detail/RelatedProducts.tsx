import type { Product } from "@/lib/data/products";
import { relatedTo } from "@/lib/shop";
import { ProductCard } from "../ProductCard";
import styles from "./RelatedProducts.module.css";

export function RelatedProducts({ product }: { product: Product }) {
  return (
    <section className={styles.section} aria-labelledby="related-title">
      <h2 id="related-title" className={styles.title}>
        Goes well with
      </h2>
      <ul role="list" className={styles.grid}>
        {relatedTo(product).map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
