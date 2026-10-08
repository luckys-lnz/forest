import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { countries, type CheckoutDetails } from "@/lib/checkout";
import styles from "./CheckoutFields.module.css";

type FieldProps = { value: string; error?: string; onChange: (e: { target: { value: string } }) => void };
type Props = { field: (k: keyof CheckoutDetails & string) => FieldProps; physical: boolean; gift: boolean };

/** Only asks for what this order needs: no address for a gift card alone. */
export function CheckoutFields({ field, physical, gift }: Props) {
  return (
    <>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Contact</legend>
        <TextField label="Email" type="email" autoComplete="email" inputMode="email" {...field("email")} />
        <TextField label="Full name" autoComplete="name" {...field("name")} />
      </fieldset>
      {physical && (
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Delivery</legend>
          <TextField label="Street address" autoComplete="street-address" {...field("address")} />
          <div className={styles.row}>
            <TextField label="Town or city" autoComplete="address-level2" {...field("city")} />
            <TextField label="Postcode or ZIP" autoComplete="postal-code" {...field("postcode")} />
          </div>
          <SelectField label="Country" autoComplete="country-name" {...field("country")}>
            <option value="">Choose a country</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </SelectField>
          <TextArea label="Delivery note" optional rows={3} hint="Where to leave it if you're out. Boxes stay cold for 48 hours." {...field("note")} />
        </fieldset>
      )}
      {gift && (
        <fieldset className={styles.group}>
          <legend className={styles.legend}>Gift card</legend>
          <TextField label="Send the gift card to" type="email" hint="We'll email it with a short note from you." {...field("giftEmail")} />
        </fieldset>
      )}
    </>
  );
}
