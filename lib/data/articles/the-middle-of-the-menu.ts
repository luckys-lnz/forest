import type { Article } from "./types";

export const theMiddleOfTheMenu: Article = {
  slug: "the-middle-of-the-menu",
  title: "The middle of the menu",
  dek: "When two people choose dinner, they rarely land on either person's first choice. What they land on instead is more interesting.",
  category: "signals",
  author: "theo",
  published: "2026-09-29",
  readMinutes: 6,
  hero: { path: "photo-1703848937416-1c0e44cb1fb5", alt: "Cured meat, cheese and a glass of wine on a table" },
  featured: true,
  body: [
    { type: "p", text: "Ask one person what they want for dinner and you'll usually get an answer. Ask two people, at the same time, and you get a negotiation. Most of the couples using Forest describe this the same way: a polite back-and-forth of 'I don't mind, what do you fancy?' that can run for twenty minutes and end in toast." },
    { type: "p", text: "When we started looking at what couples actually logged after those negotiations, one pattern kept showing up. The meal they chose was almost never either person's top pick. It was something both of them rated as good, and neither rated as perfect." },
    { type: "h2", text: "Good for both beats great for one" },
    { type: "p", text: "That sounds like settling. The data says otherwise. Meals that sat in the middle of a couple's two moods were more likely to be marked 'we'd do this again' than meals that one partner loved and the other tolerated. The person who got their first choice enjoyed it a little more. The other person enjoyed it a lot less. On balance, the night was worse." },
    { type: "pull", text: "The meal they chose was almost never either person's top pick. It was something both of them rated as good." },
    { type: "p", text: "This is why Forest doesn't simply average your moods. If one of you says 'cozy' and the other says 'curious', the dish that scores high for one and near zero for the other drops down the list. What rises is the soup dumpling, the jollof, the plate of small things to share: dishes that read as comfort to one of you and adventure to the other." },
    { type: "h2", text: "Where the middle is" },
    { type: "p", text: "Some mood pairs have an obvious middle. 'Starving' and 'cozy' meet at kimchi fried rice or a pizza, quickly. Others are harder. 'Light' and 'indulgent' pull in opposite directions, and the best answer there tends to be sushi, or small plates, where each person can steer their own half of the table." },
    { type: "list", items: ["Cozy + curious: soup dumplings, jollof, adobo", "Fiery + light: nigiri with a side of something hot", "Indulgent + starving: birria tacos, Neapolitan pizza", "Light + cozy: trofie al pesto, a good grain bowl"] },
    { type: "p", text: "None of this is a rule. It's a starting point that thousands of other couples have already tested for you, which is the whole idea." },
  ],
};
