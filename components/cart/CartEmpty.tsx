import { Pip } from "@/components/pip/Pip";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./CartEmpty.module.css";

/** An empty cart is an invitation, with the two places people usually start. */
export function CartEmpty() {
  return (
    <div className={styles.empty}>
      <Pip size={88} mood="sleepy" tone="on-light" />
      <h2 className={styles.title}>Your cart is empty.</h2>
      <p>Start with what couples go back for most: the Tasting Box, or a jar of Ember Chili Crisp.</p>
      <div className={styles.actions}>
        <ButtonLink href="/shop" variant="inverse">
          Browse the shop
        </ButtonLink>
        <ButtonLink href="/discover" variant="secondary">
          Find tonight&apos;s meal
        </ButtonLink>
      </div>
    </div>
  );
}
