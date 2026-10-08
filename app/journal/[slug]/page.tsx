import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { ArticleBody } from "@/components/journal/article/ArticleBody";
import { ArticleHeader } from "@/components/journal/article/ArticleHeader";
import { ArticlePager } from "@/components/journal/article/ArticlePager";
import { ReadingProgress } from "@/components/journal/ReadingProgress";
import { ShareBar } from "@/components/journal/ShareBar";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { FoodImage } from "@/components/ui/FoodImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { articles, authors, getArticle, neighbours, relatedArticles } from "@/lib/data/articles";
import { unsplash } from "@/lib/format";
import { articleJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const a = getArticle((await props.params).slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/journal/${a.slug}` },
    authors: [{ name: authors[a.author].name }],
    openGraph: { type: "article", title: a.title, description: a.dek, publishedTime: a.published, images: [{ url: unsplash(a.hero.path, 1200), alt: a.hero.alt }] },
  };
}

export default async function ArticlePage(props: PageProps<"/journal/[slug]">) {
  const article = getArticle((await props.params).slug);
  if (!article) notFound();
  const { older, newer } = neighbours(article.slug);

  return (
    <article className={`on-paper surface ${styles.page}`}>
      <JsonLd data={articleJsonLd(article)} />
      <ReadingProgress targetId="article-body" />
      <ArticleHeader article={article} />
      <div className={styles.hero}>
        <FoodImage path={article.hero.path} alt={article.hero.alt} priority sizes="100vw" />
      </div>
      <div className={`wrap ${styles.bodyWrap}`}>
        <ArticleBody id="article-body" blocks={article.body} />
        <aside className={styles.aside}>
          <ShareBar title={article.title} path={`/journal/${article.slug}`} />
        </aside>
      </div>
      <ArticlePager older={older} newer={newer} />
      <section className={`wrap ${styles.more}`} aria-labelledby="more-title">
        <h2 id="more-title" className={styles.h2}>
          Keep reading
        </h2>
        <ul role="list" className={styles.grid}>
          {relatedArticles(article).map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>
      <section className={`wrap ${styles.letter}`} aria-labelledby="article-letter">
        <h2 id="article-letter" className={styles.h2}>
          Get the next one on Sunday.
        </h2>
        <NewsletterForm source={`article:${article.slug}`} tone="light" />
      </section>
    </article>
  );
}
