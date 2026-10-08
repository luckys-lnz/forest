export const articleCategories = {
  signals: "Signals",
  rituals: "Rituals",
  cooking: "Cooking for two",
  studio: "From the studio",
} as const;
export type ArticleCategory = keyof typeof articleCategories;

export type Author = { readonly id: string; readonly name: string; readonly role: string };
export const authors = {
  ama: { id: "ama", name: "Ama Owusu", role: "Editor" },
  theo: { id: "theo", name: "Theo Lindqvist", role: "Data lead" },
  mariana: { id: "mariana", name: "Mariana Ruiz", role: "Food director" },
} as const satisfies Record<string, Author>;
export type AuthorId = keyof typeof authors;

/** Article bodies are structured blocks, not HTML: safe to render, easy to restyle. */
export type Block =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly text: string }
  | { readonly type: "pull"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] }
  | { readonly type: "figure"; readonly path: string; readonly alt: string; readonly caption: string };

export type Article = {
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly category: ArticleCategory;
  readonly author: AuthorId;
  /** ISO date */
  readonly published: `${number}-${number}-${number}`;
  readonly readMinutes: number;
  readonly hero: { readonly path: string; readonly alt: string };
  readonly body: readonly Block[];
  readonly featured?: boolean;
};
