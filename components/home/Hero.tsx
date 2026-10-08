import Link from "next/link";
import { Matchmaker } from "@/components/discover/Matchmaker";
import { Stamp } from "@/components/fun/Stamp";
import { HeroKicker } from "./hero/HeroKicker";
import { HeroPip } from "./hero/HeroPip";
import { HeroStickers } from "./hero/HeroStickers";
import styles from "./Hero.module.css";
import ticket from "./hero/Ticket.module.css";

/**
 * Intrigue, then interact: the question everybody knows gets crossed out,
 * Pip pops up inside the headline, and the table is set right below.
 */
export function Hero() {
  return (
    <section className={`surface on-cream grain ${styles.hero}`} aria-labelledby="hero-title">
      <div className="wrap">
        <div className={styles.head}>
          <HeroStickers />
          <HeroKicker className={styles.kicker} />
          <h1 id="hero-title" className={`headline ${styles.title}`}>
            <span className={styles.row}>Dinner,</span>
            <span className={styles.row}>
              <em>decided</em>
              <HeroPip />
            </span>
            <span className={styles.row}>together.</span>
          </h1>

          <div className={styles.stamp}>
            <Stamp text="Dinner, decided ✺ for two ✺ every night ✺ " size={176}>
              <span className={`hand ${styles.stampNote}`}>for two</span>
            </Stamp>
          </div>

          <p className={styles.lead}>
            Each of you picks a mood. Forest finds the dinner in the middle, using what thousands of couples actually ate
            and loved.
          </p>
        </div>

        <div className={ticket.ticket}>
          <p className={ticket.head}>
            <span className="hand">Table for two</span>
            <span aria-hidden="true">No. 0042</span>
          </p>
          <Matchmaker variant="hero" />
        </div>

        <p className={ticket.aside}>
          Rather cook in tonight? <Link href="/shop/tasting-box-for-two">The Tasting Box</Link> brings this month&apos;s
          three favourite dinners to your door, measured for two.
        </p>
      </div>
    </section>
  );
}
