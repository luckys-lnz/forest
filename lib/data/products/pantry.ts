import { cents } from "../../types";
import type { Product } from "./types";

export const pantry: readonly Product[] = [
  {
    slug: "ember-chili-crisp",
    name: "Ember Chili Crisp",
    category: "pantry",
    collections: ["first-try"],
    tagline: "Crunchy, smoky, more fragrant than hot. Goes on nearly everything.",
    description: [
      "The condiment couples most often added to their logs as 'what made it'. Fried shallot, garlic and three chillies in rapeseed oil, with a little fermented black bean for depth.",
      "Medium heat: if one of you likes it hot and the other doesn't, this is usually where you meet.",
    ],
    details: [
      { label: "Size", value: "190 g jar" },
      { label: "Heat", value: "Medium" },
      { label: "Diet", value: "Vegan. Contains soy" },
      { label: "Keeps", value: "6 months unopened, 3 months once open" },
    ],
    variants: [
      { id: "one", label: "One jar", price: cents(1400), stock: 120 },
      { id: "three", label: "Three jars", price: cents(3600), stock: 40 },
    ],
    art: { kind: "jar", surface: "#2A1410", accent: "#C8452C", label: "Ember" },
    pairsWith: ["birria-tacos", "kimchi-fried-rice", "sichuan-hot-pot"],
    featured: true,
    addedDaysAgo: 90,
  },
  {
    slug: "black-garlic-honey",
    name: "Black Garlic Honey",
    category: "pantry",
    collections: ["gifting"],
    tagline: "Wildflower honey, slow-aged black garlic. Sweet, savoury, a little strange.",
    description: [
      "Black garlic is garlic aged for weeks until it turns soft, dark and tastes almost like balsamic. Stirred into honey, it's a glaze for chicken, a drizzle on cheese, and very good on vanilla ice cream.",
    ],
    details: [
      { label: "Size", value: "220 g jar" },
      { label: "Diet", value: "Vegetarian" },
      { label: "Keeps", value: "12 months" },
    ],
    variants: [{ id: "one", label: "One jar", price: cents(1600), stock: 60 }],
    art: { kind: "jar", surface: "#1A120A", accent: "#E7B53C", label: "Black Garlic" },
    pairsWith: ["chicken-adobo", "dark-chocolate-cake"],
    addedDaysAgo: 45,
  },
];
