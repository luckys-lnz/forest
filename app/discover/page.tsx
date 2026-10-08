import type { Metadata } from "next";
import { Matchmaker } from "@/components/discover/Matchmaker";
import { moods } from "@/lib/data/moods";
import { parseDiscoverParams } from "@/lib/discover";
import { NextStops } from "@/components/layout/next/NextStops";
import styles from "./page.module.css";

export async function generateMetadata(props: PageProps<"/discover">): Promise<Metadata> {
  const { a, b } = parseDiscoverParams(await props.searchParams);
  const title = a && b ? `${moods[a].label} meets ${moods[b].label.toLowerCase()}` : "Find tonight's meal";
  return {
    title,
    description: "Pick a mood each. Forest finds the dinner in the middle, from what couples actually loved.",
    alternates: { canonical: "/discover" },
  };
}

export default async function DiscoverPage(props: PageProps<"/discover">) {
  const initial = parseDiscoverParams(await props.searchParams);
  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <header className={styles.head}>
            <h1 className={`headline ${styles.title}`}>
              What are you <em>two</em> in the mood for?
            </h1>
            <p className={styles.lead}>
              Pick one mood each. Rename yourselves if you like, narrow it down if you need to, and share the result with
              the other person when you&apos;re in different rooms.
            </p>
          </header>
          <Matchmaker variant="full" initial={initial} />
        </div>
      </div>
      <NextStops from="discover" />
    </>
  );
}
