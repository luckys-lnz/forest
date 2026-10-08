import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { products } from "@/lib/data/products";
import styles from "./ShopPreview.module.css";

/** One lead product and four more, then a clear way into the shop. */
export function ShopPreview() {
  const featured = products.filter((p) => p.featured).slice(0, 5);
  return (
    <Section tone="light" aria-labelledby="shop-title">
      <SectionHead
        id="shop-title"
        hand="made for two"
        title={
          <>
            Bring it <em>home</em>
          </>
        }
        note={
          <>
            <p>Every product starts with something couples kept logging. Boxes ship the first Tuesday of the month.</p>
            <Link href="/shop" className={styles.shopLink}>
              Visit the shop
            </Link>
          </>
        }
      />
      <ul role="list" className={styles.grid}>
        {featured.map((p, i) => (
          <Reveal as="li" key={p.slug} index={i} className={i === 0 ? styles.lead : undefined}>
            <ProductCard product={p} size={i === 0 ? "lg" : "md"} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
