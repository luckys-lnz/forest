import { variantAvailability, type Product } from "@/lib/data/products";
import { cx, formatPrice } from "@/lib/format";
import styles from "./VariantPicker.module.css";

type Props = { product: Product; selected: string; onSelect: (id: string) => void };

/** Native radios, styled as tiles: keyboard and screen readers work for free. */
export function VariantPicker({ product, selected, onSelect }: Props) {
  if (product.variants.length < 2) return null;
  return (
    <fieldset className={styles.picker}>
      <legend className={styles.legend}>{product.category === "gifts" ? "Amount" : "Choose"}</legend>
      <div className={styles.options}>
        {product.variants.map((v) => {
          const a = variantAvailability(product, v);
          const out = a.state === "sold-out";
          return (
            <label key={v.id} className={cx(styles.option, v.id === selected && styles.on, out && styles.out)}>
              <input
                type="radio"
                name={`variant-${product.slug}`}
                value={v.id}
                checked={v.id === selected}
                onChange={() => onSelect(v.id)}
                className="sr-only"
              />
              <span className={styles.label}>{v.label}</span>
              <span className={styles.meta}>
                {formatPrice(v.price)}
                {out ? ", sold out" : a.state === "low" ? `, ${a.left} left` : ""}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
