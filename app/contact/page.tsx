import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { isTopicId } from "@/lib/contact";
import { site } from "@/lib/site";
import { NextStops } from "@/components/layout/next/NextStops";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, orders, partnerships and press. Pick what it's about and the right person reads it.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const { topic } = await props.searchParams;
  const t = Array.isArray(topic) ? topic[0] : topic;
  return (
    <>
      <div className={`on-light surface ${styles.page}`}>
        <div className={`wrap ${styles.grid}`}>
          <header className={styles.head}>
            <h1 className={`headline ${styles.title}`}>
              Talk to a <em>person.</em>
            </h1>
            <p className={styles.lead}>
              Every message is read by someone on the Forest team, not a bot. Tell us what it&apos;s about and it goes
              straight to the right person.
            </p>
            <dl className={styles.direct}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday to Friday, 9 to 6 GMT</dd>
              </div>
            </dl>
          </header>
          <ContactForm initialTopic={isTopicId(t) ? t : null} />
        </div>
      </div>
      <NextStops from="contact" />
    </>
  );
}
