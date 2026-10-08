import type { FieldErrors as Errors } from "../types";
import { isTopicId, topics, type ExtraFieldName } from "./topics";
import { EMAIL_HINT, isEmail } from "../validation";

/** Core fields every topic shares, plus the optional per-topic extras. */
export type ContactInput = {
  topic: string;
  name: string;
  email: string;
  message: string;
  /** Honeypot. Real people never fill this in. */
  nickname?: string;
} & Partial<Record<ExtraFieldName, string>>;

export type FieldErrors = Errors<ContactInput>;

/** Shared by the form (instant feedback) and the API route (source of truth). */
export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!isTopicId(input.topic)) errors.topic = "Choose what this is about.";
  if (!input.name?.trim()) errors.name = "Enter your name.";
  else if (input.name.length > 80) errors.name = "Keep your name under 80 characters.";
  if (!input.email?.trim()) errors.email = "Enter your email so we can reply.";
  else if (!isEmail(input.email)) errors.email = EMAIL_HINT;
  const msg = input.message?.trim() ?? "";
  if (msg.length < 10) errors.message = "Tell us a little more: at least 10 characters.";
  else if (msg.length > 4000) errors.message = "Keep your message under 4,000 characters.";

  if (isTopicId(input.topic)) {
    for (const f of topics[input.topic].fields) {
      const value = input[f.name]?.trim() ?? "";
      if (f.required && !value) errors[f.name] = `Enter your ${f.label.toLowerCase()}.`;
      if (value && f.name === "orderNumber" && !/^FR-\d{5,}$/i.test(value))
        errors.orderNumber = "Order numbers look like FR-10482.";
      if (value && f.type === "url") {
        try {
          new URL(value.startsWith("http") ? value : `https://${value}`);
        } catch {
          errors[f.name] = "Enter a web address like example.com.";
        }
      }
    }
  }
  return errors;
}

