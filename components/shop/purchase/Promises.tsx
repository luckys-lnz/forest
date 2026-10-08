import type { Product, Variant } from "@/lib/data/products";
import { site } from "@/lib/site";
import styles from "./Promises.module.css";

/** Delivery and returns, stated before anyone has to ask. */
export function Promises({ product, variant }: { product: Product; variant: Variant }) {
  const boxed = product.category === "boxes";
  const items =
    variant.stock === null
      ? ["Delivered by email on the date you choose at checkout. Valid for 3 years."]
      : [
          `Free delivery over $${site.freeShippingThreshold}, otherwise $${site.flatShipping}.`,
          boxed ? "Ships chilled on the first Tuesday of the month." : "Ships in 1 to 2 working days.",
          boxed ? "Something not right on arrival? We replace or refund it." : "Unopened items can be returned within 30 days.",
        ];
  return (
    <ul role="list" className={styles.list}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
