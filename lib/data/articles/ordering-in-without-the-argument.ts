import type { Article } from "./types";

export const orderingInWithoutTheArgument: Article = {
  slug: "ordering-in-without-the-argument",
  title: "Ordering in without the argument",
  dek: "A five-minute ritual for the nights when you're both tired, both hungry, and both saying 'I don't mind'.",
  category: "rituals",
  author: "ama",
  published: "2026-08-14",
  readMinutes: 4,
  hero: { path: "photo-1512058564366-18510be2db19", alt: "A bowl of fried rice" },
  body: [
    { type: "p", text: "Most food arguments aren't about food. They're about being tired and not wanting to be the one who decides. Here's the ritual we've seen work best for couples on Forest, and the one we use ourselves." },
    { type: "list", items: ["Each of you picks a mood, without discussing it first.", "Look at the top three matches together. Not ten. Three.", "Each of you can veto one. Whatever's left, you order.", "If everything gets vetoed, it's kimchi fried rice. No further discussion."] },
    { type: "p", text: "The veto is the important part. It gives each person a way to say no without having to propose an alternative, which is usually where these conversations stall." },
    { type: "pull", text: "If everything gets vetoed, it's kimchi fried rice. No further discussion." },
    { type: "p", text: "The whole thing takes about five minutes, and couples who try it tend to keep using it." },
  ],
};
