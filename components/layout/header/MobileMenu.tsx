"use client";

import Link from "next/link";
import type { CSSProperties, Ref } from "react";
import { nav } from "@/lib/site";
import styles from "./MobileMenu.module.css";

const links = [{ href: "/", label: "Home" }, ...nav, { href: "/cart", label: "Cart" }] as const;

/** Full-screen menu for small screens. Big serif links, a short staggered entrance. */
export function MobileMenu({ open, pathname, ref }: { open: boolean; pathname: string; ref?: Ref<HTMLDivElement> }) {
  return (
    <div id="site-menu" ref={ref} className={styles.sheet} hidden={!open}>
      <nav aria-label="Main" className="wrap">
        <ul role="list" className={styles.list}>
          {links.map((item, i) => (
            <li key={item.href} style={{ "--i": i } as CSSProperties}>
              <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.note}>Tonight&apos;s still open. Pick a mood each and see what other couples loved.</p>
      </nav>
    </div>
  );
}
