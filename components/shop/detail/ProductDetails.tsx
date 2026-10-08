import type { Product } from "@/lib/data/products";
import { site } from "@/lib/site";
import styles from "./ProductDetails.module.css";

/** The long-form half of a product page: story, facts, delivery and returns. */
export function ProductDetails({ product }: { product: Product }) {
  return (
    <>
      <div className={styles.description}>
        {product.description.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <dl className={styles.facts}>
        {product.details.map((d) => (
          <div key={d.label}>
            <dt>{d.label}</dt>
            <dd>{d.value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.accordions}>
        <details>
          <summary>Delivery</summary>
          <p>
            Free over ${site.freeShippingThreshold}, otherwise ${site.flatShipping} per order. Chilled boxes travel in
            recyclable insulation and stay cold for 48 hours. You&apos;ll get a tracking link the morning your order
            leaves us.
          </p>
        </details>
        <details>
          <summary>Returns</summary>
          <p>
            Food can&apos;t be returned once it&apos;s left us, but if anything arrives damaged or warm, send a photo and
            we&apos;ll replace or refund it. Unopened pantry and table items can be returned within 30 days.
          </p>
        </details>
      </div>
    </>
  );
}
