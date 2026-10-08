/**
 * Every product slug, declared once. Other data (discoveries, collections)
 * references products by this union, so a typo is a compile error.
 */
export const productSlugs = [
  "tasting-box-for-two",
  "night-market-box",
  "slow-sunday-box",
  "ember-chili-crisp",
  "black-garlic-honey",
  "the-decider",
  "pair-bowls",
  "pip-chopstick-rests",
  "gift-card",
] as const;

export type ProductSlug = (typeof productSlugs)[number];
