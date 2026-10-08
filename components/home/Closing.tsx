import Link from "next/link";
import { Pip } from "@/components/pip/Pip";
import { ProductArt } from "@/components/shop/art/ProductArt";
import { QuickAdd } from "@/components/shop/QuickAdd";
import { requireProduct } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import styles from "./Closing.module.css";
import p from "./ClosingPath.module.css";

/** The last ask: two clear ways to act tonight, side by side. */
export function Closing() {
  const box = requireProduct("tasting-box-for-two");
  const variant = box.variants[0];
  return (
    <section className={styles.closing} aria-labelledby="closing-title">
      <div className="wrap">
        <h2 id="closing-title" className={`headline ${styles.title}`}>
          Tonight&apos;s still <em>open.</em>
        </h2>
        <div className={styles.paths}>
          <div className={p.path}>
            <div className={p.pathArt} aria-hidden="true">
              <span className={p.seedA} />
              <Pip size={92} mood="happy" costume="party" sticker />
              <span className={p.seedB} />
            </div>
            <h3 className={p.pathTitle}>Decide in two minutes</h3>
            <p className={p.pathBody}>Two moods in, one dinner out. Free, no account, works on the sofa.</p>
            <Link href="/discover" className={p.pathLink}>
              Find tonight&apos;s meal
            </Link>
          </div>
          <div className={`${p.path} ${p.pathLight} art-lift`}>
            <div className={p.pathProduct}>
              <ProductArt product={box} />
            </div>
            <h3 className={p.pathTitle}>Or let it come to you</h3>
            <p className={p.pathBody}>
              {box.name}: three of this month&apos;s best-loved dinners, measured for two. {formatPrice(variant.price)}.
            </p>
            <div className={p.pathActions}>
              <QuickAdd slug={box.slug} variantId={variant.id} name={box.name} />
              <Link href={`/shop/${box.slug}`} className={p.pathLinkDark}>
                What&apos;s inside
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
