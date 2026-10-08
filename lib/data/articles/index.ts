import { aSlowSundayInThreePots } from "./a-slow-sunday-in-three-pots";
import { orderingInWithoutTheArgument } from "./ordering-in-without-the-argument";
import { splitDecisions } from "./split-decisions";
import { theMiddleOfTheMenu } from "./the-middle-of-the-menu";
import type { Article } from "./types";
import { whatCuriousMeansAt9pm } from "./what-curious-means-at-9pm";
import { whyPipDoesntGiveStars } from "./why-pip-doesnt-give-stars";

export * from "./types";

/** Add a new article: create its file, then list it here. */
export const articles: readonly Article[] = [
  theMiddleOfTheMenu,
  splitDecisions,
  aSlowSundayInThreePots,
  whyPipDoesntGiveStars,
  orderingInWithoutTheArgument,
  whatCuriousMeansAt9pm,
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Newest first. */
export function sortedArticles(): Article[] {
  return [...articles].sort((a, b) => b.published.localeCompare(a.published));
}

/** The articles either side of this one in publication order. */
export function neighbours(slug: string): { older: Article | null; newer: Article | null } {
  const all = sortedArticles();
  const i = all.findIndex((a) => a.slug === slug);
  return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}

/** Same category first, then the most recent. */
export function relatedArticles(article: Article, limit = 3): Article[] {
  return sortedArticles()
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, limit);
}
