"use client";

import { useRouter } from "next/navigation";
import { useId, useTransition } from "react";
import { shopHref, sorts, type ShopQuery, type SortId } from "@/lib/shop";
import styles from "./SortSelect.module.css";

export function SortSelect({ query }: { query: ShopQuery }) {
  const router = useRouter();
  const id = useId();
  const [pending, start] = useTransition();
  return (
    <div className={styles.sort} data-pending={pending || undefined}>
      <label htmlFor={id}>Sort</label>
      <select
        id={id}
        value={query.sort}
        onChange={(e) => start(() => router.push(shopHref(query, { sort: e.target.value as SortId }), { scroll: false }))}
      >
        {Object.entries(sorts).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
