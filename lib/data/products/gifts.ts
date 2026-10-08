import { cents } from "../../types";
import type { Product } from "./types";

export const gifts: readonly Product[] = [
  {
    slug: "gift-card",
    name: "Forest Gift Card",
    category: "gifts",
    collections: ["gifting"],
    tagline: "Let them choose. Sent by email, on the date you pick.",
    description: [
      "Works on anything in the shop, including Tasting Box subscriptions. We'll email it with your note on the day you choose at checkout.",
    ],
    details: [
      { label: "Delivery", value: "Email, on a date you choose" },
      { label: "Valid", value: "3 years" },
    ],
    variants: [
      { id: "25", label: "$25", price: cents(2500), stock: null },
      { id: "50", label: "$50", price: cents(5000), stock: null },
      { id: "100", label: "$100", price: cents(10000), stock: null },
    ],
    art: { kind: "card", surface: "#000000", accent: "#8DB07A" },
    pairsWith: [],
    addedDaysAgo: 120,
  },
];
