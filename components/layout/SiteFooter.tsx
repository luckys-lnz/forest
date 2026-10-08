import Link from "next/link";
import { site } from "@/lib/site";
import { FooterWordmark } from "./FooterWordmark";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./SiteFooter.module.css";

const columns = [
  {
    title: "Eat",
    links: [
      { href: "/discover", label: "Find tonight's meal" },
      { href: "/discover?a=cozy&b=curious", label: "Cozy meets curious" },
      { href: "/discover?a=quick&b=quick", label: "We're both starving" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/shop?category=boxes", label: "Tasting boxes" },
      { href: "/shop?category=pantry", label: "Pantry" },
      { href: "/shop?category=table", label: "For the table" },
      { href: "/shop/gift-card", label: "Gift cards" },
    ],
  },
  {
    title: "Forest",
    links: [
      { href: "/journal", label: "Journal" },
      { href: "/journal/why-pip-doesnt-give-stars", label: "About Pip" },
      { href: "/contact", label: "Contact" },
      { href: "/contact?topic=partnership", label: "Partner with us" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.letter}>
          <h2 className={`headline ${styles.title}`}>What couples ate this week, every Sunday.</h2>
          <NewsletterForm source="footer" />
        </div>
        <nav aria-label="Footer" className={styles.cols}>
          {columns.map((c) => (
            <div key={c.title}>
              <h3 className={styles.colTitle}>{c.title}</h3>
              <ul role="list">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={`wrap ${styles.bottom}`}>
        <Link href="/" aria-label="Forest, home" className={styles.logo}>
          <Logo />
        </Link>
        <p className={styles.small}>
          © {new Date().getFullYear()} Forest Food Co.{" "}
          {site.previewData && "Community figures on this site come from a preview dataset while Forest is in beta."}
        </p>
      </div>
      <FooterWordmark />
    </footer>
  );
}
