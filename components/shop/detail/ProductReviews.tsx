import styles from "./ProductReviews.module.css";

/**
 * Review architecture with an honest empty state. When reviews exist they
 * come from verified buyers only; until then we say so instead of faking it.
 */
export function ProductReviews() {
  return (
    <section className={styles.section} aria-labelledby="reviews-title">
      <h2 id="reviews-title" className={styles.title}>
        Reviews
      </h2>
      <div className={styles.empty}>
        <p className={styles.headline}>No reviews yet.</p>
        <p>
          Reviews open to customers once their order has arrived, so everything you read here comes from someone who
          actually cooked or used it.
        </p>
      </div>
    </section>
  );
}
