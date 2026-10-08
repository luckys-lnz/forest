import Image from "next/image";
import { cx, unsplash } from "@/lib/format";
import styles from "./FoodImage.module.css";

type Props = {
  path: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Aspect ratio as w/h, e.g. "4/5". Omit to fill the parent. */
  ratio?: string;
};

/**
 * Food photography with a dark placeholder that matches the brand, so slow
 * images never flash white on black.
 */
export function FoodImage({ path, alt, sizes, priority, className, ratio }: Props) {
  return (
    <span className={cx(styles.frame, !ratio && styles.fill, className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image
        src={unsplash(path)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.img}
      />
    </span>
  );
}
