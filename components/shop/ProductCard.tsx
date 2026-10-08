import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { categories, fromPrice, hasPriceRange, productAvailability, type Product } from "@/lib/data/products";
import { cx, formatPrice } from "@/lib/format";
import { Availability } from "./Availability";
import { ProductArt } from "./art/ProductArt";
import { QuickAdd } from "./QuickAdd";
import styles from "./ProductCard.module.css";

export function ProductCard({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  const availability = productAvailability(product);
  const soldOut = availability.state === "sold-out";
  const single = product.variants.length === 1 ? product.variants[0] : null;
  return (
    <article className={cx(styles.card, styles[size], soldOut && styles.soldOut, "art-lift")}>
      <Link href={`/shop/${product.slug}`} className={styles.media} tabIndex={-1} aria-hidden="true">
        <ProductArt product={product} />
      </Link>
      <div className={styles.info}>
        <p className={styles.category}>{categories[product.category].label}</p>
        <h3 className={styles.name}>
          <Link href={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className={styles.tagline}>{product.tagline}</p>
        <div className={styles.row}>
          <p className={styles.price}>
            {hasPriceRange(product) && <span className={styles.from}>From </span>}
            {formatPrice(fromPrice(product))}
          </p>
          <Availability value={availability} />
        </div>
        <div className={styles.cta}>
          {soldOut ? (
            <ButtonLink href={`/shop/${product.slug}`} size="sm" variant="secondary">
              See details
            </ButtonLink>
          ) : single ? (
            <QuickAdd slug={product.slug} variantId={single.id} name={product.name} />
          ) : (
            <ButtonLink href={`/shop/${product.slug}`} size="sm" variant="secondary">
              Choose options
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}
