import { isOneOf } from "../types";

export const topicIds = ["general", "order", "partnership", "press", "other"] as const;
export type TopicId = (typeof topicIds)[number];

export type ExtraFieldName = "orderNumber" | "company" | "website" | "outlet" | "deadline";

export type ExtraField = {
  name: ExtraFieldName;
  label: string;
  required: boolean;
  type: "text" | "url" | "date";
  hint?: string;
  autoComplete?: string;
};

export const topics: Record<
  TopicId,
  { label: string; line: string; reply: string; fields: ExtraField[]; messageLabel: string }
> = {
  general: {
    label: "A question about Forest",
    line: "How it works, where we are, what's next.",
    reply: "We reply within two working days.",
    fields: [],
    messageLabel: "Your question",
  },
  order: {
    label: "An order or subscription",
    line: "Delivery, changes, something not right.",
    reply: "Order questions get an answer within one working day.",
    fields: [
      {
        name: "orderNumber",
        label: "Order number",
        required: false,
        type: "text",
        hint: "Starts with FR-, in your confirmation email. Leave it blank if you can't find it.",
      },
    ],
    messageLabel: "What happened?",
  },
  partnership: {
    label: "Working with us",
    line: "Restaurants, producers, brands, venues.",
    reply: "Our partnerships team reads everything and replies within a week.",
    fields: [
      { name: "company", label: "Company or venue", required: true, type: "text", autoComplete: "organization" },
      { name: "website", label: "Website", required: false, type: "url", hint: "Optional", autoComplete: "url" },
    ],
    messageLabel: "What do you have in mind?",
  },
  press: {
    label: "Press",
    line: "Interviews, images, data requests.",
    reply: "If you're on deadline, tell us and we'll prioritise it.",
    fields: [
      { name: "outlet", label: "Publication", required: true, type: "text" },
      { name: "deadline", label: "Deadline", required: false, type: "date", hint: "Optional" },
    ],
    messageLabel: "What are you working on?",
  },
  other: {
    label: "Something else",
    line: "Stories, ideas, things that don't fit a box.",
    reply: "We reply within two working days.",
    fields: [],
    messageLabel: "Message",
  },
};

export const isTopicId = (v: unknown): v is TopicId => isOneOf(topicIds, v);
