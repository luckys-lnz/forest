"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { cx } from "@/lib/format";
import { Logo } from "../Logo";
import { CartLink } from "./CartLink";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { useFocusTrap } from "./useFocusTrap";
import { useHideOnScroll } from "./useHideOnScroll";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const { hidden, scrolled } = useHideOnScroll();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(open, sheet, toggle, close);

  // Close the menu whenever the route changes (state derived during render).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  return (
    <header className={cx(styles.header, hidden && !open && styles.hidden, scrolled && styles.scrolled, open && styles.open)}>
      <div className={cx("wrap", styles.bar)}>
        <Link href="/" className={styles.home} aria-label="Forest, home">
          <Logo />
        </Link>
        <DesktopNav pathname={pathname} />
        <div className={styles.tools}>
          <CartLink />
          <button
            ref={toggle}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <MobileMenu ref={sheet} open={open} pathname={pathname} />
    </header>
  );
}
