import type { Article } from "./data/articles";
import { authors } from "./data/articles";
import { fromPrice, productAvailability, type Product } from "./data/products";
import { unsplash } from "./format";
import { site } from "./site";

/** schema.org JSON-LD builders. Rendered by <JsonLd>. */
export function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.tagline,
    brand: { "@type": "Brand", name: "Forest" },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: (fromPrice(p) / 100).toFixed(2),
      availability: `https://schema.org/${productAvailability(p).state === "sold-out" ? "OutOfStock" : "InStock"}`,
      url: `${site.url}/shop/${p.slug}`,
    },
  } as const;
}

export function articleJsonLd(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.dek,
    datePublished: a.published,
    author: { "@type": "Person", name: authors[a.author].name },
    publisher: { "@type": "Organization", name: "Forest" },
    image: unsplash(a.hero.path, 1200),
    mainEntityOfPage: `${site.url}/journal/${a.slug}`,
  } as const;
}
