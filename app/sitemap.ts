import type { MetadataRoute } from "next";
import { articles } from "@/lib/data/articles";
import { products } from "@/lib/data/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/discover", "/shop", "/journal", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, lastModified: now, priority: 0.7 })),
    ...articles.map((a) => ({ url: `${site.url}/journal/${a.slug}`, lastModified: new Date(a.published), priority: 0.6 })),
  ];
}
