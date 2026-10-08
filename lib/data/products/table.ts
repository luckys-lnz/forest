import { cents } from "../../types";
import type { Product } from "./types";

export const table: readonly Product[] = [
  {
    slug: "the-decider",
    name: "The Decider",
    category: "table",
    collections: ["first-try", "gifting"],
    tagline: "52 cards for the nights you can't agree and the app is out of reach.",
    description: [
      "Forest without a screen. Each of you draws a mood card, then a setting card, then flip the answer card that matches both. The pairings come from the same community data that powers Forest.",
      "Also includes six wildcard cards. Couples tell us these cause the most fun and the most arguments.",
    ],
    details: [
      { label: "Inside", value: "52 cards, linen finish, in a rigid box" },
      { label: "Size", value: "Standard playing-card size" },
      { label: "Players", value: "2. Technically more" },
    ],
    variants: [{ id: "one", label: "One deck", price: cents(2400), stock: 85 }],
    art: { kind: "deck", surface: "#000000", accent: "#EEEAE2" },
    pairsWith: [],
    featured: true,
    addedDaysAgo: 20,
  },
  {
    slug: "pair-bowls",
    name: "Pair Bowls",
    category: "table",
    collections: ["date-night", "gifting"],
    tagline: "Two stoneware bowls sized for ramen, noodles, or one shared salad.",
    description: [
      "Thrown by a small pottery studio, glazed in Forest black. Wide enough for a proper bowl of noodles, deep enough not to slop broth on the table.",
      "Choose two blacks, or one black and one rice-white if you like knowing whose is whose.",
    ],
    details: [
      { label: "Size", value: "18 cm wide, 8 cm deep, 900 ml" },
      { label: "Material", value: "Stoneware, food-safe glaze" },
      { label: "Care", value: "Dishwasher and microwave safe" },
    ],
    variants: [
      { id: "black-black", label: "Black & black", price: cents(5800), stock: 12 },
      { id: "black-rice", label: "Black & rice", price: cents(5800), stock: 4 },
    ],
    art: { kind: "bowls", surface: "#D9D3C8", accent: "#000000" },
    pairsWith: ["tonkotsu-ramen", "small-plates-and-a-bottle"],
    featured: true,
    addedDaysAgo: 75,
  },
  {
    slug: "pip-chopstick-rests",
    name: "Pip Chopstick Rests",
    category: "table",
    collections: ["gifting"],
    tagline: "A pair of small ceramic Pips to keep your chopsticks off the table.",
    description: [
      "Pip, lying down, holding your chopsticks. Hand-finished, so each one's leaf sits slightly differently.",
    ],
    details: [
      { label: "Inside", value: "2 rests" },
      { label: "Size", value: "5 cm long" },
      { label: "Material", value: "Glazed porcelain" },
    ],
    variants: [{ id: "pair", label: "Set of two", price: cents(1800), stock: 30 }],
    art: { kind: "rest", surface: "#E9E4DA", accent: "#000000" },
    pairsWith: ["xiao-long-bao", "salmon-sushi"],
    addedDaysAgo: 12,
  },
];
