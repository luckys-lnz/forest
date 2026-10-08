import { FoodImage } from "@/components/ui/FoodImage";
import type { Block } from "@/lib/data/articles";
import { assertNever } from "@/lib/types";
import styles from "./ArticleBody.module.css";

/** Render one structured block. Exhaustive: a new block type won't compile until handled. */
function BlockView({ block: b }: { block: Block }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2>{b.text}</h2>;
    case "pull":
      return (
        <blockquote className={styles.pull}>
          <p>{b.text}</p>
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "figure":
      return (
        <figure className={styles.figure}>
          <FoodImage path={b.path} alt={b.alt} ratio="3/2" sizes="(max-width: 768px) 100vw, 720px" />
          <figcaption>{b.caption}</figcaption>
        </figure>
      );
    default:
      return assertNever(b);
  }
}

export function ArticleBody({ id, blocks }: { id: string; blocks: readonly Block[] }) {
  return (
    <div id={id} className={styles.body}>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
