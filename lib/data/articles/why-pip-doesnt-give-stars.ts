import type { Article } from "./types";

export const whyPipDoesntGiveStars: Article = {
  slug: "why-pip-doesnt-give-stars",
  title: "Why Pip doesn't give stars",
  dek: "Forest has a mascot and no ratings. Both decisions were deliberate.",
  category: "studio",
  author: "ama",
  published: "2026-08-27",
  readMinutes: 4,
  hero: { path: "photo-1563245372-f21724e3856d", alt: "Dumplings in a bamboo steamer" },
  body: [
    { type: "p", text: "People ask two questions about Forest more than any others. Why is there a little black seed on everything? And where are the star ratings?" },
    { type: "h2", text: "Stars measure the wrong thing" },
    { type: "p", text: "A five-star rating tells you how one person felt about a meal. Forest is for two people, so we ask two different questions after every meal: would you have it again, and did you both like it? That gives us the repeat rate and the split rate, which together say far more about whether a dish will work for you as a couple." },
    { type: "pull", text: "A star rating tells you how one person felt. We wanted to know how two people felt, together." },
    { type: "h2", text: "Pip is there to notice things" },
    { type: "p", text: "Pip started as a sketch on a whiteboard: a seed, because Forest grows from what everyone plants in it. We kept Pip because data needs a voice that isn't a dashboard. When something in the numbers is worth knowing, like that couples rate ramen higher when they skip the small talk for the first five minutes, Pip is the one who tells you." },
    { type: "p", text: "Pip doesn't do much else. No pop-ups, no streaks, no badges. A guide, not a mascot that wants your attention." },
  ],
};
