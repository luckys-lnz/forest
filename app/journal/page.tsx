import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { articleCategories, sortedArticles, type ArticleCategory } from "@/lib/data/articles";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "What couples eat, why it works, and how to cook it for two. Notes from the Forest team.",
  alternates: { canonical: "/journal" },
};

export default async function JournalPage(props: PageProps<"/journal">) {
  const { category } = await props.searchParams;
  const c = (Array.isArray(category) ? category[0] : category) as ArticleCategory | undefined;
  const active = c && c in articleCategories ? c : null;

  const all = sortedArticles();
  const featured = all.find((a) => a.featured) ?? all[0];
  const list = active ? all.filter((a) => a.category === active) : all.filter((a) => a !== featured);

  return (
    <div className={`on-paper surface ${styles.page}`}>
      <div className="wrap">
        <header className={styles.masthead}>
          <h1 className={`headline ${styles.title}`}>
            The <em>Journal</em>
          </h1>
          <p className={styles.lead}>What couples eat, why it works, and how to cook it for two.</p>
        </header>

        <nav aria-label="Journal sections" className={styles.cats}>
          <Link href="/journal" aria-current={!active ? "page" : undefined}>
            Everything
          </Link>
          {(Object.keys(articleCategories) as ArticleCategory[]).map((k) => (
            <Link key={k} href={`/journal?category=${k}`} aria-current={active === k ? "page" : undefined}>
              {articleCategories[k]}
            </Link>
          ))}
        </nav>

        {!active && (
          <section aria-label="Featured" className={styles.featured}>
            <ArticleCard article={featured} size="lg" priority />
          </section>
        )}

        {list.length > 0 ? (
          <ul role="list" className={styles.grid}>
            {list.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            Nothing in {articleCategories[active!]} yet. <Link href="/journal">See everything</Link>
          </p>
        )}

        <section className={styles.letter} aria-labelledby="letter-title">
          <div>
            <h2 id="letter-title" className={styles.letterTitle}>
              The Sunday letter
            </h2>
            <p className={styles.letterBody}>
              One email a week: what couples ate, one thing worth cooking, and whatever Pip noticed. Five minutes, with
              coffee.
            </p>
          </div>
          <NewsletterForm source="journal" tone="light" />
        </section>
      </div>
    </div>
  );
}
