import Link from "next/link";
import { FoodImage } from "@/components/ui/FoodImage";
import { getDiscovery, type Discovery } from "@/lib/data/discoveries";
import type { Product } from "@/lib/data/products";
import { discoverHrefFor } from "@/lib/discover";
import styles from "./PairsWith.module.css";

/** Social proof from the community data: the dishes this product brings home. */
export function PairsWith({ product }: { product: Product }) {
  const dishes = product.pairsWith.map(getDiscovery).filter((d): d is Discovery => d !== undefined);
  if (dishes.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="pairs-title">
      <h2 id="pairs-title" className={styles.title}>
        Built from what couples loved
      </h2>
      <ul role="list" className={styles.list}>
        {dishes.map((d) => (
          <li key={d.id}>
            <Link href={discoverHrefFor(d)} className={styles.dish}>
              <span className={styles.img}>
                <FoodImage path={d.image.path} alt={d.image.alt} sizes="(max-width: 768px) 40vw, 200px" />
              </span>
              <span className={styles.name}>{d.name}</span>
              <span className={styles.meta}>{Math.round(d.signals.again * 100)}% would have it again</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
