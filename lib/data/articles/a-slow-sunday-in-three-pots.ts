import type { Article } from "./types";

export const aSlowSundayInThreePots: Article = {
  slug: "a-slow-sunday-in-three-pots",
  title: "A slow Sunday, in three pots",
  dek: "One braise, one pot of rice, one pudding. A plan for an afternoon that cooks itself while you do very little.",
  category: "cooking",
  author: "mariana",
  published: "2026-09-08",
  readMinutes: 7,
  hero: { path: "photo-1570275239925-4af0aa93a0dc", alt: "Steamed rice topped with braised adobo" },
  body: [
    { type: "p", text: "The best Sunday dinners are the ones you start at lunchtime and barely think about again. This is a plan for two people and three pots, built around chicken adobo, which couples on Forest rate highly for cozy nights and almost never disagree about." },
    { type: "h2", text: "Pot one: the adobo" },
    { type: "p", text: "Brown eight chicken thighs, skin side down, until deeply golden. Pour off most of the fat. Add a whole head of garlic, smashed, then 120 ml each of cane vinegar and soy sauce, four bay leaves, a spoon of black peppercorns and enough water to come halfway up the chicken. Simmer, lid on, for forty minutes, then lid off for twenty, until the sauce is sticky." },
    { type: "h2", text: "Pot two: rice, plenty of it" },
    { type: "p", text: "Make twice as much rice as you think. Adobo is better the next day, and you'll want rice for lunch tomorrow too." },
    { type: "h2", text: "Pot three: something sweet" },
    { type: "p", text: "While the adobo simmers, warm 400 ml of coconut milk with sugar and a pinch of salt, and stir in cooked sticky rice. Top with mango if it's good, or with a drizzle of black garlic honey if you're feeling odd." },
    { type: "pull", text: "Make enough for two lunches and thank yourselves tomorrow." },
    { type: "p", text: "Who does what: one of you on browning, one of you on garlic. Then sit down. The pots don't need you for a while." },
  ],
};
