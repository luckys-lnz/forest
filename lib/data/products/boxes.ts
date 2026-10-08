import { cents } from "../../types";
import type { Product } from "./types";

export const boxes: readonly Product[] = [
  {
    slug: "tasting-box-for-two",
    name: "The Tasting Box",
    category: "boxes",
    collections: ["date-night", "first-try"],
    tagline: "Three dinners for two, picked from what couples loved this month.",
    description: [
      "Every month we look at what couples on Forest went back for, and turn the top three into dinners you can cook at home. Each recipe is measured for two, so there's no half-bag of anything left in the fridge.",
      "Pip's cards come with each dinner: who does what, what to talk about while it simmers, and the one step people usually get wrong.",
    ],
    details: [
      { label: "Serves", value: "2 people, 3 dinners" },
      { label: "Ships", value: "First Tuesday of each month" },
      { label: "Storage", value: "Chilled. Cook within 5 days" },
      { label: "This month", value: "Cacio e pepe, jollof with grilled fish, trofie al pesto" },
    ],
    variants: [
      { id: "single", label: "One box", price: cents(6400), stock: 40 },
      { id: "monthly", label: "Monthly, cancel any time", price: cents(5800), stock: 40 },
    ],
    art: { kind: "box", surface: "#E7B53C", accent: "#000000", label: "Tasting" },
    pairsWith: ["cacio-e-pepe", "jollof-grilled-fish", "pesto-trofie"],
    featured: true,
    addedDaysAgo: 30,
  },
  {
    slug: "night-market-box",
    name: "Night Market Box",
    category: "boxes",
    collections: ["date-night", "first-try"],
    tagline: "Five small dishes to split, inspired by Forest's most-loved night out.",
    description: [
      "The night market crawl has the highest repeat rate on Forest, so we built it for your kitchen table: five small plates, each for two, cooked in the order you'd walk the stalls.",
      "This is a limited run. When it's gone, it's gone until the next one.",
    ],
    details: [
      { label: "Serves", value: "2 people, 1 long evening" },
      { label: "Inside", value: "Dumplings, skewers, broth, noodles, something sweet" },
      { label: "Time", value: "About 90 minutes, mostly together" },
      { label: "Storage", value: "Frozen. Keeps 3 months" },
    ],
    variants: [{ id: "single", label: "One box", price: cents(7200), stock: 3 }],
    art: { kind: "box", surface: "#1E1C19", accent: "#E7B53C", label: "Night Market" },
    pairsWith: ["night-market-crawl", "xiao-long-bao", "tonkotsu-ramen"],
    featured: true,
    addedDaysAgo: 6,
  },
  {
    slug: "slow-sunday-box",
    name: "Slow Sunday Box",
    category: "boxes",
    collections: ["date-night"],
    tagline: "One long braise, one loaf, one bottle's worth of afternoon.",
    description: [
      "Built for the days you don't need to be anywhere. A braise that takes four hours and about ten minutes of actual work, bread to tear, and a pudding you make while the braise does its thing.",
    ],
    details: [
      { label: "Serves", value: "2 people, with leftovers" },
      { label: "Time", value: "4 hours, mostly waiting" },
      { label: "Storage", value: "Chilled. Cook within 4 days" },
    ],
    variants: [{ id: "single", label: "One box", price: cents(6800), stock: 0 }],
    restock: "2026-11-03",
    art: { kind: "box", surface: "#EEEAE2", accent: "#000000", label: "Slow Sunday" },
    pairsWith: ["chicken-adobo", "cacio-e-pepe"],
    addedDaysAgo: 60,
  },
];
