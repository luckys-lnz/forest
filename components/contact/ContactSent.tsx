import { Pip } from "@/components/pip/Pip";
import { Button } from "@/components/ui/Button";
import styles from "./ContactSent.module.css";

type Props = { reply: string; email: string; reference: string; onAnother: () => void };

export function ContactSent({ reply, email, reference, onAnother }: Props) {
  return (
    <div className={styles.sent} role="status">
      <Pip size={96} mood="happy" tone="on-light" />
      <h2 className={styles.title}>Message sent.</h2>
      <p>
        {reply} We&apos;ll write to <strong>{email}</strong>. Your reference is <strong className="num">{reference}</strong>.
      </p>
      <Button variant="secondary" onClick={onAnother}>
        Send another message
      </Button>
    </div>
  );
}
