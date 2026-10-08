import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt } from "@/components/shop/art/ProductArt";
import { PairsWith } from "@/components/shop/detail/PairsWith";
import { ProductDetails } from "@/components/shop/detail/ProductDetails";
import { ProductReviews } from "@/components/shop/detail/ProductReviews";
import { RelatedProducts } from "@/components/shop/detail/RelatedProducts";
import { PurchasePanel } from "@/components/shop/purchase/PurchasePanel";
import { JsonLd } from "@/components/ui/JsonLd";
import { categories, getProduct, products } from "@/lib/data/products";
import { productJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const product = getProduct((await props.params).slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: `${product.name} · Forest`, description: product.tagline },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const product = getProduct((await props.params).slug);
  if (!product) notFound();

  return (
    <div className={`on-light surface ${styles.page}`}>
      <JsonLd data={productJsonLd(product)} />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href={`/shop?category=${product.category}`}>{categories[product.category].label}</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className={styles.main}>
          <div className={`${styles.gallery} art-lift`}>
            <ProductArt product={product} />
          </div>
          <div className={styles.info}>
            <h1 className={`headline ${styles.name}`}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <PurchasePanel product={product} />
            <ProductDetails product={product} />
          </div>
        </div>

        <PairsWith product={product} />
        <ProductReviews />
        <RelatedProducts product={product} />
      </div>
    </div>
  );
}
