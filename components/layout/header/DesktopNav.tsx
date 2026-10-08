import Link from "next/link";
import { nav } from "@/lib/site";
import styles from "./DesktopNav.module.css";

export function DesktopNav({ pathname }: { pathname: string }) {
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav aria-label="Main" className={styles.nav}>
      <ul role="list">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link} aria-current={active(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
