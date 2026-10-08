"use client";

import { useRef, useState } from "react";
import { useForm } from "@/components/forms/useForm";
import { Button } from "@/components/ui/Button";
import { TextArea, TextField } from "@/components/ui/Field";
import { topics, validateContact, type ContactInput, type TopicId } from "@/lib/contact";
import { ContactSent } from "./ContactSent";
import { QuickAnswers } from "./QuickAnswers";
import { TopicPicker } from "./TopicPicker";
import styles from "./ContactForm.module.css";

type Values = Omit<ContactInput, "topic">;
const blank: Values = { name: "", email: "", message: "", nickname: "" };

/** Pick a reason, see quick answers, then write. Fields adapt to the reason. */
export function ContactForm({ initialTopic }: { initialTopic: TopicId | null }) {
  const [topic, setTopic] = useState<TopicId | null>(initialTopic);
  const start = useRef<HTMLDivElement>(null);
  const form = useForm<Values, { reference: string }>({
    initial: blank,
    validate: (v) => validateContact({ ...v, topic: topic ?? "" }),
    endpoint: "/api/contact",
    body: (v) => ({ ...v, topic }),
  });
  const t = topic ? topics[topic] : null;

  function choose(id: TopicId) {
    setTopic(id);
    form.setErrors({});
    requestAnimationFrame(() => start.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  if (form.status.kind === "done" && t) {
    return (
      <ContactSent
        reply={t.reply}
        email={form.values.email}
        reference={form.status.data.reference}
        onAnother={() => form.reset({ name: form.values.name, email: form.values.email })}
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <TopicPicker value={topic} onChange={choose} />
      <div ref={start} className={styles.anchor} />
      {t && topic && (
        <div className={styles.body} key={topic}>
          <QuickAnswers topic={topic} />
          <form ref={form.formRef} className={styles.form} onSubmit={form.submit} noValidate>
            <h2 className={styles.title}>Your message</h2>
            <p className={styles.reply}>{t.reply}</p>
            {form.status.kind === "error" && (
              <p className={styles.formError} role="alert">
                {form.status.message}
              </p>
            )}
            <div className={styles.row}>
              <TextField label="Your name" autoComplete="name" {...form.field("name")} />
              <TextField label="Email" type="email" inputMode="email" autoComplete="email" {...form.field("email")} />
            </div>
            {t.fields.length > 0 && (
              <div className={styles.row}>
                {t.fields.map((f) => (
                  <TextField
                    key={f.name}
                    label={f.label}
                    type={f.type === "url" ? "text" : f.type}
                    inputMode={f.type === "url" ? "url" : undefined}
                    autoComplete={f.autoComplete}
                    hint={f.hint !== "Optional" ? f.hint : undefined}
                    optional={!f.required}
                    {...form.field(f.name)}
                  />
                ))}
              </div>
            )}
            <TextArea label={t.messageLabel} rows={6} hint={`${form.values.message.trim().length} / 4,000`} {...form.field("message")} />
            {/* Honeypot: hidden from people, tempting to bots. */}
            <div className={styles.hp} aria-hidden="true">
              <label>
                Leave this empty
                <input tabIndex={-1} autoComplete="off" value={form.values.nickname ?? ""} onChange={form.field("nickname").onChange} />
              </label>
            </div>
            <Button type="submit" size="lg" loading={form.status.kind === "sending"}>
              Send message
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
