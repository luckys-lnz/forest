/**
 * Notes from couples, shown on the home page. Only add notes that a real
 * couple sent and agreed to have published (keep the consent reference).
 * While this list is empty, the home page asks for the first ones instead
 * of showing invented quotes.
 */
export type TableNote = {
  readonly id: string;
  readonly quote: string;
  /** First names or initials, as the couple asked to be credited. */
  readonly credit: string;
  /** What they ate, if they told us. */
  readonly dish?: string;
  readonly consentRef: string;
};

export const tableNotes: readonly TableNote[] = [];
